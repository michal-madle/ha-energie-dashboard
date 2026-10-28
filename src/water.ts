/* The hot water panel: the boiler and tank tiles, the targets and the mixing capsule. */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { isOn, mixingState, sourceText } from "./model";
import type { FlowModel, Mixing } from "./model";
import { arcSvg } from "./gauge";
import type { Settings } from "./types";
import { entityState, formatNumber, formatPower, powerUnit, readNumber } from "./utils";
import type { PowerUnit } from "./utils";
import type { SegmentOption } from "ha-dashboard-kit/controls";
import { ICON } from "./icons";
import { state } from "lit/decorators.js";
import type { Controlled } from "./controls";
import { NO_DATA, attribute, mix } from "./view";
import type { Constructor } from "./view";

export const withWater = <T extends Constructor<Controlled>>(Base: T) =>
  class extends Base {
    renderWater(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const e = s.entities;
      const flows = s.num.flows;
      const heating = isOn(model.boil, flows.idle_threshold);
      const src = sourceText(model.share, flows, t);
      const srcColor = this.sourceColor(src);
      const boost = this.shown(e.boiler.boost);
      const boostOn = boost === "on";
      const unit = powerUnit([heating ? model.boil : undefined], flows.kw_from);

      let stateText: string | undefined;
      if (heating) stateText = `${t.water.boilerHeats(src.text)}${boostOn ? ` · ${t.boostOptions.on}` : ""}`;
      else if (model.boil !== undefined) stateText = t.water.noHeating;

      return html`<section class="panel" aria-labelledby="h-water">
        <div class="head"><h2 id="h-water">${s.titles.water ?? t.titles.water}</h2>${this.stateLine(stateText, heating ? srcColor : undefined)}</div>
        <div class="water">
          ${this.renderBoilerTile(s, model, heating, srcColor, unit)} ${this.renderMixing(s)} ${this.renderTankTile(s)}
        </div>
      </section>`;
    }

    /** The common frame of a water tile: the gauge on the left, name, state and main control on the right. */
    gauge(value: number | undefined, min: number, max: number, s: Settings, label: string): TemplateResult {
      return html`<div class="arc" role="img" aria-label=${label}>
        ${arcSvg(value, min, max, s.tempScale)}
        <div class="arc-num"><b>${value === undefined ? NO_DATA : formatNumber(value)}</b>${value === undefined ? html`<span class="sr-only">${this.t.noData}</span>` : html`<span>°C</span>`}</div>
        <span class="arc-min" aria-hidden="true">${formatNumber(min)}</span><span class="arc-max" aria-hidden="true">${formatNumber(max)}</span>
      </div>`;
    }

    renderBoilerTile(s: Settings, model: FlowModel, heating: boolean, srcColor: string, unit: PowerUnit): TemplateResult {
      const tt = this.t;
      const b = s.entities.boiler;
      const nb = s.num.boiler;
      const boost = this.shown(b.boost);
      const boostOn = boost === "on";
      const flowTarget = readNumber(this.hass, b.target_temperature);
      const boostTarget = readNumber(this.hass, b.boost_target_temperature);
      const target = boostOn ? boostTarget : flowTarget;
      const gMin = s.num.water.gauge_min;
      const gMax = Math.max(s.num.water.gauge_max, flowTarget ?? 0);
      const t = model.boilTemp;
      const open = !!this._open.targets;
      const hasTargets = !!(b.target_temperature || b.boost_target_temperature);
      const label = tt.water.boilerLabel(
        t === undefined ? tt.noData : `${formatNumber(t)} °C`,
        heating ? tt.water.heatingWith(formatPower(model.boil!, unit)) : tt.water.notHeating,
        target === undefined ? undefined : `${formatNumber(target)} °C`,
        formatNumber(gMin),
        `${formatNumber(gMax)} °C`,
      );
      return html`<div class="source">
        <div class="source-top">
          ${this.gauge(t, gMin, gMax, s, label)}
          <div class="source-body">
            <div>
              <div class="source-title">${tt.water.boilerTitle}</div>
              <div class="source-line">
                <span class="src" style="--c:${heating ? srcColor : "var(--ed-secondary)"}">${heating ? formatPower(model.boil!, unit) : model.boil === undefined ? NO_DATA : tt.water.notHeating}</span>${target === undefined ? nothing : html` <span class="dim">· ${tt.water.target(`${formatNumber(target)} °C`)}</span>`}
              </div>
            </div>
            ${b.boost
              ? html`<ed-segmented
                  compact guarded .options=${this.boostOptions} .value=${boost ?? ""} label=${tt.water.boostMode} .hint=${tt.hint.holdDragOrDouble} ?disabled=${boost === undefined}
                  .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
                  @hdk-select=${(event: CustomEvent<{ value: string }>) => this.setBoost("boiler", event.detail.value === "on")}
                ></ed-segmented>`
              : nothing}
          </div>
        </div>
        ${hasTargets
          ? html`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${open ? "true" : "false"} @click=${() => this.toggle("targets")}>
                <span class="rowbtn-title">${tt.water.targets}</span>
                <span class="rowbtn-value">${tt.water.targetFlow} <b>${flowTarget === undefined ? NO_DATA : formatNumber(flowTarget)}</b> · ${tt.water.targetBoost} <b>${boostTarget === undefined ? NO_DATA : `${formatNumber(boostTarget)} °C`}</b></span>
                <svg class="chevron ${open ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>
              </button>
              <div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>${this.renderTargets(s, flowTarget, boostTarget)}</div></div>
            </div>`
          : nothing}
      </div>`;
    }

    /** The two targets of the boiler: Přetoky may not be below Boost (CURRENT_SPEC.md, Cíle ohřevu). */
    renderTargets(s: Settings, flowTarget: number | undefined, boostTarget: number | undefined): TemplateResult {
      const tt = this.t;
      const b = s.entities.boiler;
      const nb = s.num.boiler;
      const field = (id: string | undefined, value: number | undefined, title: string, sub: string, low: number | undefined, high: number | undefined) => {
        if (!id) return nothing;
        const entity = entityState(this.hass, id);
        let min = nb.target_min;
        let max = nb.target_max;
        const entityMin = attribute(entity, "min");
        const entityMax = attribute(entity, "max");
        if (entityMin !== undefined) min = Math.max(min, entityMin);
        if (entityMax !== undefined) max = Math.min(max, entityMax);
        if (low !== undefined) min = Math.max(min, low);
        if (high !== undefined) max = Math.min(max, high);
        return html`<div class="field">
          <span class="field-label">${title}<span class="hint">${sub}</span></span><span class="field-value">${value === undefined ? NO_DATA : formatNumber(value)}<small> °C</small></span>
          <ed-slider
            .min=${min} .max=${max} .step=${nb.target_step} .value=${value ?? min}
            label=${tt.water.targetSliderLabel(title)} valueText=${value === undefined ? tt.noData : tt.water.targetSliderSpoken(`${value} °C`, title)}
            minLabel="${formatNumber(min)} °C" maxLabel="${formatNumber(max)} °C"
            ?disabled=${value === undefined}
            @hdk-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, event.detail.value, tt.water.targetWhat(title))}
          ></ed-slider>
        </div>`;
      };
      return html`<div class="detail">
        ${field(b.target_temperature, flowTarget, tt.water.targetFlow, tt.water.targetFlowHint, boostTarget, undefined)}
        ${field(b.boost_target_temperature, boostTarget, tt.water.targetBoost, tt.water.targetBoostHint, undefined, flowTarget)}
        <p class="hint">${tt.water.targetsRule}</p>
      </div>`;
    }

    /** Mixing: a capsule between the two tiles, joined to them by lines (solid when on, dotted when off). */
    renderMixing(s: Settings): TemplateResult | typeof nothing {
      const m = s.entities.mixing;
      if (!m.valve_c1 && !m.valve_c2) return nothing;
      const state = mixingState(this.shown(m.valve_c1), this.shown(m.valve_c2));
      const on = state === "on";
      const canSwitch = !!(m.valve_c1 && m.valve_c2);
      const note = state === "unclear" ? this.t.water.mixingUnclear : state === undefined ? this.t.noData : "";
      return html`
        <div class="link ${on ? "on" : ""}" aria-hidden="true"></div>
        <div class="mixcap" role="group" aria-labelledby="l-mix">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M12 2.5 C12 2.5 5.5 10 5.5 15 A6.5 6.5 0 0 0 12 21.5 Z" fill=${on ? s.colors.cold : "var(--ed-off)"}></path>
            <path d="M12 2.5 C12 2.5 18.5 10 18.5 15 A6.5 6.5 0 0 1 12 21.5 Z" fill=${on ? s.colors.hot : "var(--ed-off)"}></path>
          </svg>
          <span class="mixcap-text"><span id="l-mix" style=${on ? "" : "color:var(--ed-secondary)"}>${this.t.water.mixing}</span>${note ? html`<span class="mixcap-note">${note}</span>` : nothing}</span>
          <ed-switch
            guarded hintPlacement="above" label=${this.t.water.mixing} .hint=${this.t.hint.holdOrDouble} .checked=${on} ?disabled=${state === undefined || !canSwitch}
            .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
            @hdk-toggle=${(event: CustomEvent<{ checked: boolean }>) => this.setMixing(event.detail.checked ? "on" : "off")}
          ></ed-switch>
        </div>
        <div class="link ${on ? "on" : ""}" aria-hidden="true"></div>`;
    }

    renderTankTile(s: Settings): TemplateResult {
      const tt = this.t;
      const t = s.entities.tank;
      const nt = s.num.tank;
      const id = t.water_heater;
      const entity = entityState(this.hass, id);
      const mode = this.shown(id);
      const off = mode === "off";
      const manual = mode === "heat";
      const reported = attribute(entity, "temperature");
      const chosen = this._tankTemp;
      const set = chosen && chosen.id === id ? chosen.value : reported;
      const gMin = s.num.water.gauge_min;
      const gMax = Math.max(s.num.water.gauge_max, readNumber(this.hass, s.entities.boiler.target_temperature) ?? 0);
      // The tank has no measured temperature: the gauge shows the set value (Off: the minimum the boiler keeps).
      const shownTemp = off ? nt.temp_min : set;
      const list = Array.isArray(entity?.attributes?.operation_list) ? (entity!.attributes.operation_list as string[]) : Object.keys(tt.tank.modes);
      const options: SegmentOption[] = Object.keys(tt.tank.modes).filter((value) => list.includes(value)).map((value) => ({ value, label: tt.tank.modes[value] }));
      const open = !!this._open.tank;
      const { min, max } = this.tankRange(s);
      const modeName = mode === undefined ? NO_DATA : (tt.tank.modes[mode] ?? mode);
      const plan = off ? tt.tank.keepsMinimum : manual ? tt.tank.setManually : tt.tank.byPlan;
      const summary = shownTemp === undefined ? NO_DATA : off ? tt.tank.summaryOff(`${formatNumber(nt.temp_min)} °C`) : (manual ? tt.tank.summaryManual : tt.tank.summaryPlan)(`${formatNumber(shownTemp)} °C`);
      const label = tt.tank.label(
        shownTemp === undefined ? tt.tank.settingNoData : off ? tt.tank.settingOff(`${formatNumber(nt.temp_min)} °C`) : tt.tank.settingSet(`${formatNumber(shownTemp)} °C`),
        modeName,
        formatNumber(gMin),
        `${formatNumber(gMax)} °C`,
      );
      return html`<div class="source">
        <div class="source-top">
          ${this.gauge(shownTemp, gMin, gMax, s, label)}
          <div class="source-body">
            <div>
              <div class="source-title">${tt.tank.title}</div>
              <div class="source-line"><span class="src" style="--c:${manual ? "var(--ed-text)" : "var(--ed-secondary)"}">${modeName}</span>${mode === undefined ? nothing : html` <span class="dim">· ${plan}</span>`}</div>
            </div>
            ${id
              ? html`<ed-segmented compact .options=${options} .value=${mode ?? ""} label=${tt.tank.modeLabel} ?disabled=${mode === undefined} @hdk-select=${(event: CustomEvent<{ value: string }>) => this.setTank(id, event.detail.value)}></ed-segmented>`
              : nothing}
          </div>
        </div>
        ${id
          ? html`<div class="subrow">
              <button type="button" class="rowbtn" aria-expanded=${open ? "true" : "false"} @click=${() => this.toggle("tank")}>
                <span class="rowbtn-title">${tt.tank.temperature}</span>
                <span class="rowbtn-value">${summary}</span>
                <svg class="chevron ${open ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>
              </button>
              <div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
                <div class="detail">
                  <div class="field ${off ? "off" : ""}">
                    <span class="field-label">${tt.tank.temperature}<span class="hint">${off ? tt.tank.hintOff : manual ? tt.tank.hintManual : tt.tank.hintPlan}</span></span>
                    <span class="field-value">${shownTemp === undefined ? NO_DATA : formatNumber(shownTemp)}<small> °C</small></span>
                    <ed-slider
                      .min=${min} .max=${max} .step=${nt.temp_step} .tickStep=${5} .value=${shownTemp ?? min}
                      label=${tt.tank.sliderLabel} valueText=${set === undefined ? tt.noData : tt.tank.sliderSpoken(`${set} °C`)}
                      minLabel="${formatNumber(min)} °C" maxLabel="${formatNumber(max)} °C"
                      ?disabled=${set === undefined || off}
                      @hdk-change=${(event: CustomEvent<{ value: number }>) => this.setTankTemperature(id, event.detail.value, mode)}
                    ></ed-slider>
                  </div>
                </div>
              </div></div>
            </div>`
          : nothing}
      </div>`;
    }
  };
