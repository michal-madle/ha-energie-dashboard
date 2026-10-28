/* Choosing, service calls and the settings of the card: what the controls do (CURRENT_SPEC.md, Ovládání a pojistky). */
import { html } from "lit";
import type { TemplateResult } from "lit";
import type { Settings } from "./types";
import { entityState, readText } from "./utils";
import { state } from "lit/decorators.js";
import { CardBase } from "./base";
import { NO_DATA, attribute, clamp } from "./view";
import type { Constructor, Panel } from "./view";

export const withControls = <T extends Constructor<CardBase>>(Base: T) =>
  class extends Base {
    /** The state shown: a just chosen value, until Home Assistant reports it. */
    shown(id: string | undefined): string | undefined {
      if (!id) return undefined;
      return this._optimistic[id] ?? readText(this.hass, id);
    }

    toggle(panel: Panel): void {
      this._open = { ...this._open, [panel]: !this._open[panel] };
    }

    switchRow(title: string, id: string, hint: string, warn: boolean): TemplateResult {
      const value = this.shown(id);
      return html`<div class="switch-row">
        <span class="switch-text"><span class="switch-title" id="l-${id.replace(/\W/g, "-")}">${title}</span><span class="hint ${warn ? "warn" : ""}">${value === undefined ? NO_DATA : hint}</span></span>
        <ed-switch
          label=${title} .checked=${value === "on"} ?disabled=${value === undefined}
          @hdk-toggle=${(event: CustomEvent<{ checked: boolean }>) => this.setSwitch(id, event.detail.checked, title)}
        ></ed-switch>
      </div>`;
    }

    // ---------------------------------------------------------------- actions

    choose(id: string, value: string): void {
      this._optimistic = { ...this._optimistic, [id]: value };
      window.clearTimeout(this._timers.get(id));
      // If Home Assistant never reports it, fall back to the real state after the configured time.
      this._timers.set(id, window.setTimeout(() => {
        const next = { ...this._optimistic };
        delete next[id];
        this._optimistic = next;
      }, (this._config?.num.ui.revert_after ?? 6) * 1000));
    }

    /** Calls a service on an entity that is reported; never on a missing or unavailable one (CURRENT_SPEC.md, Pojistky). */
    async call(domain: string, service: string, data: Record<string, unknown>, id: string, what: string): Promise<boolean> {
      if (!this.hass || readText(this.hass, id) === undefined) {
        this._feedback = this.t.feedback.noData(what);
        return false;
      }
      try {
        await this.hass.callService(domain, service, data);
        return true;
      } catch {
        this._feedback = this.t.feedback.rejected(what);
        return false;
      }
    }

    async setSwitch(id: string, on: boolean, what: string): Promise<void> {
      this._feedback = "";
      this.choose(id, on ? "on" : "off");
      await this.call("switch", on ? "turn_on" : "turn_off", { entity_id: id }, id, what);
    }

    async setBoost(kind: "wallbox" | "boiler", on: boolean): Promise<void> {
      const e = this._config!.entities;
      const id = kind === "wallbox" ? e.wallbox.boost : e.boiler.boost;
      if (!id) return;
      this._feedback = "";
      // Boost with blocked charging would switch itself off at once: unblock first and say so.
      if (kind === "wallbox" && on && e.wallbox.block_charging && readText(this.hass, e.wallbox.block_charging) === "on") {
        await this.setSwitch(e.wallbox.block_charging, false, this.t.wallbox.block);
        this._feedback = this.t.feedback.unblocked;
      }
      this.choose(id, on ? "on" : "off");
      await this.call("switch", on ? "turn_on" : "turn_off", { entity_id: id }, id, kind === "wallbox" ? this.t.alerts.boostWallbox.title : this.t.alerts.boostBoiler.title);
    }

    async setNumber(id: string, value: number, what: string): Promise<void> {
      this._feedback = "";
      await this.call("number", "set_value", { entity_id: id, value }, id, what);
    }

    async setTank(id: string, mode: string): Promise<void> {
      this._feedback = "";
      this.choose(id, mode);
      if (!(await this.call("water_heater", "set_operation_mode", { entity_id: id, operation_mode: mode }, id, this.t.tank.modeLabel))) return;
      // Manual must start inside the range of the card (the tank may report 30 °C, the lowest it knows): set the nearest allowed temperature.
      if (mode === "heat") {
        const { min, max } = this.tankRange(this._config!);
        const current = attribute(entityState(this.hass, id), "temperature");
        if (current === undefined || current < min || current > max) await this.setTemperature(id, clamp(current ?? min, min, max));
      }
    }

    /** The range of the tank temperature: the configured one, narrowed by what the entity allows. */
    tankRange(s: Settings): { min: number; max: number } {
      const entity = entityState(this.hass, s.entities.tank.water_heater);
      return {
        min: Math.max(s.num.tank.temp_min, attribute(entity, "min_temp") ?? s.num.tank.temp_min),
        max: Math.min(s.num.tank.temp_max, attribute(entity, "max_temp") ?? s.num.tank.temp_max),
      };
    }

    async setTemperature(id: string, temperature: number): Promise<boolean> {
      // Shown at once; if Home Assistant does not report it in time, the real value comes back.
      this._tankTemp = { id, value: temperature };
      window.clearTimeout(this._timers.get("tank-temp"));
      this._timers.set("tank-temp", window.setTimeout(() => (this._tankTemp = undefined), (this._config?.num.ui.revert_after ?? 6) * 1000));
      return this.call("water_heater", "set_temperature", { entity_id: id, temperature }, id, this.t.tank.sliderLabel);
    }

    /** Moving the temperature in Auto switches the tank to Manual first (CURRENT_SPEC.md, Zásobník). */
    async setTankTemperature(id: string, temperature: number, mode: string | undefined): Promise<void> {
      this._feedback = "";
      if (mode !== "heat") {
        this.choose(id, "heat");
        if (!(await this.call("water_heater", "set_operation_mode", { entity_id: id, operation_mode: "heat" }, id, this.t.tank.modeLabel))) return;
      }
      await this.setTemperature(id, temperature);
    }

    /**
     * Manual mixing switches both valves directly and at once (mixing = C1 off + C2 on, not mixing = C1 on + C2 off),
     * so it works from any valve state, even an unclear one. Automations are not touched.
     */
    async setMixing(wanted: "on" | "off"): Promise<void> {
      const { valve_c1: c1, valve_c2: c2 } = this._config!.entities.mixing;
      if (!c1 || !c2) return;
      this._feedback = "";
      const c1State = wanted === "on" ? "off" : "on";
      const c2State = wanted === "on" ? "on" : "off";
      this.choose(c1, c1State);
      this.choose(c2, c2State);
      const sent = await Promise.all([
        this.call("switch", `turn_${c1State}`, { entity_id: c1 }, c1, this.t.water.mixing),
        this.call("switch", `turn_${c2State}`, { entity_id: c2 }, c2, this.t.water.mixing),
      ]);
      if (!sent.every(Boolean)) this._feedback = this._feedback || this.t.feedback.mixingNotSent;
    }
  };

/** The instance type of the controls, for the parts that use them. */
export type Controlled = InstanceType<ReturnType<typeof withControls>>;
