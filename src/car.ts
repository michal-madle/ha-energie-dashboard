/* The car panel: the picture with its link, the charge level, the sources, the mode and the wallbox. */
import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import { SOURCES, isOn, sourceText } from "./model";
import type { FlowModel, Source } from "./model";
import type { Settings } from "./types";
import { ago, entityState, formatClock, formatNumber, formatPercent, formatPower, powerUnit, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { HoldOrDoubleTap } from "ha-dashboard-kit/gesture";
import { ICON } from "./icons";
import type { Controlled } from "./controls";
import { NO_DATA, SOURCE_VAR, attribute, clamp, meterPosition, mix, percentages, segments } from "./view";
import type { Constructor } from "./view";
import { joined, joinedText } from "ha-dashboard-kit/joined";

export const withCar = <T extends Constructor<Controlled>>(Base: T) =>
  class extends Base {
    disconnectedCallback(): void {
      super.disconnectedCallback();
      this._carGesture.dispose();
    }

    // ---- the car picture: double tap or long press opens the car dashboard (car.link)
    readonly _carGesture = new HoldOrDoubleTap(() => ({
      holdMs: this._config?.num.ui.hold_ms ?? 550,
      doubleTapMs: this._config?.num.ui.double_tap_ms ?? 400,
    }));

    carDown = (): void => {
      this._carGesture.start(() => this.openCarLink());
    };

    carRelease = (): void => {
      this._carGesture.release();
    };

    carCancel = (): void => {
      this._carGesture.cancel();
    };

    carClick = (event: MouseEvent): void => {
      const s = this._config;
      if (!s) return;
      // The keyboard (click without a pointer, detail 0) opens at once, like the other protected controls.
      if (event.detail === 0) {
        this._carGesture.cancel();
        this.openCarLink();
        return;
      }
      const tap = this._carGesture.tap("car", event.timeStamp);
      if (tap === "double") {
        this.openCarLink();
      } else if (tap === "single") {
        this._carHint = true;
        window.clearTimeout(this._timers.get("carhint"));
        this._timers.set("carhint", window.setTimeout(() => (this._carHint = false), s.num.ui.hint_seconds * 1000));
      }
    };

    openCarLink(): void {
      const link = this._config?.carLink;
      if (!link) return;
      this._carHint = false;
      if (link.startsWith("/")) {
        // The Home Assistant frontend listens for this event and changes its view without a reload.
        window.history.pushState(null, "", link);
        window.dispatchEvent(new CustomEvent("location-changed", { detail: { replace: false } }));
      } else {
        window.open(link, "_blank", "noopener");
      }
    }

    renderCar(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const e = s.entities;
      const flows = s.num.flows;
      const link = model.carLink;
      // Mode Přetoky | Auto | Boost (wallbox.mode, helper of Home Assistant); without the key the Boost switch is the mode.
      const chargeMode = this.chargeMode(s);
      const step = chargeMode === "Auto" ? readText(this.hass, e.wallbox.step) : undefined;
      const targetId = this.targetId(s, chargeMode);
      const target = targetId ? Number(this.shown(targetId)) : NaN;
      const limit = Number.isFinite(target) ? target : 100;
      const charging = isOn(model.car, flows.idle_threshold) && link !== "disconnected";
      const src = sourceText(model.loadShare.car, flows, t);
      const blocked = readText(this.hass, e.wallbox.block_charging) === "on";
      const boost = this.shown(e.wallbox.boost);
      // Boost is chosen on purpose, so its grid share is no deviation: the colour of the source, not orange (uživatel 3. 11. 2026).
      const srcColor = boost === "on" ? `var(${SOURCE_VAR[src.main]})` : this.sourceColor(src);

      let stateText: string | unknown[] | undefined;
      let stateColor: string | undefined;
      // Boost on: an orange „Boost“ in the state, the rest in the colour of the source (uživatel 12. 11. 2026: „Q137 A ale neco
      // oranzoveho by tam melo byt … nejaky indikator je jede boost bych chtel. Kdekoliv“; 3. 11.: barva zdroje i u boostu).
      // With wallbox.mode only the Boost chosen by the user is orange; the Boost the house started is „· Auto“ in grey
      // (uživatel 15. 11. 2026: „Q269 auto“).
      const manualBoost = chargeMode ? chargeMode === "Boost" : boost === "on";
      const boostMark = manualBoost ? [this.boostMark()] : [];
      const autoMark = html`<span class="auto-mark">${t.car.autoMark}</span>`;
      const why = step ? t.car.step[step] : undefined;
      if (step === "konci" && link !== "disconnected") {
        stateText = t.car.ending;
      } else if (charging) {
        stateText = [t.car.charging(src.text), ...(step === "nabiji" ? [autoMark] : boostMark)];
        stateColor = srcColor;
      } else if (link === "connected" || link === "charging") {
        // Every state of a connected car says why it does not charge (uživatel 15. 11. 2026: „Všechny takový stavy musí být
        // v nějakém stavu - pro neco jede auto nebo proc nejede.“).
        stateText = why ? [t.car.connected, why] : [t.car.connectedIdle, ...boostMark];
      } else if (link === "disconnected") {
        stateText = t.car.disconnected;
      }
      const glow = mix(stateColor ?? "#d8d8dc", stateColor ? 42 : 28);
      const picture = entityState(this.hass, e.car.image)?.attributes?.entity_picture;
      const soc = model.carSoc;
      const unit = powerUnit([isOn(model.car, flows.idle_threshold) ? model.car : undefined], flows.kw_from);
      const hasLimit = limit < 100;
      const meterLabel = t.car.chargeLevel(soc === undefined ? t.noData : formatPercent(soc), hasLimit ? formatPercent(limit) : undefined);
      const w = e.wallbox;
      const control = this.modeControl(s, chargeMode, boost);

      return html`<section class="panel car-panel" aria-labelledby="h-car">
        <div class="car-top" style="height:${Math.round(168 + 40 * Math.max(0, s.num.car.image_scale - 1))}px">
          <div class="car-art" aria-hidden="true" style="transform:scale(${s.num.car.image_scale})">
            <div class="glow" style="background:radial-gradient(closest-side, ${glow}, transparent)"></div><div class="shadow"></div>
            ${typeof picture === "string" && picture ? html`<img src=${picture} alt="" />` : nothing}
          </div>
          ${s.carLink
            ? html`<div class="car-art car-hitbox" style="transform:scale(${s.num.car.image_scale})">
                <button type="button" class="car-hit" aria-label=${t.car.openDashboard} @pointerdown=${this.carDown} @pointerup=${this.carRelease} @pointercancel=${this.carCancel} @pointerleave=${this.carRelease} @contextmenu=${(event: Event) => event.preventDefault()} @click=${this.carClick}></button>
              </div>
              ${this._carHint ? html`<div class="car-hint" aria-hidden="true">${t.hint.holdOrDouble}</div>` : nothing}`
            : nothing}
          <div class="head"><h2 id="h-car">${this.pickText(s.titles.car) ?? t.titles.car}</h2>${this.stateLine(stateText, stateColor)}</div>
          <div class="car-soc">
            <span class="soc">${soc === undefined ? NO_DATA : formatNumber(soc)}<small>${this._i18n.percent("")}</small>${soc === undefined ? html`<span class="sr-only">${t.noData}</span>` : nothing}</span>
            <span class="range">${t.car.range} <b>${model.carRange === undefined ? NO_DATA : `${formatNumber(model.carRange)} km`}</b></span>
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${meterLabel}>
            ${segments(clamp(soc ?? 0, 0, 100)).map((fill) => html`<span><i style="width:${fill.toFixed(1)}%"></i></span>`)}
            ${hasLimit ? html`<div class="limit" style="left:${meterPosition(limit)}"></div>` : nothing}
          </div>
          ${hasLimit ? html`<div class="meter-label" aria-hidden="true"><span style="left:${meterPosition(limit)}">${t.car.limit(formatPercent(limit))}</span></div>` : nothing}
        </div>
        ${charging ? this.renderCarSources(model, flows, formatPower(model.car ?? 0, unit), boost === "on") : nothing}
        ${w.boost
          ? html`<div class="mode">
              <div class="mode-head"><span id="mode-l">${t.car.mode}</span><span class="mode-sub">${control.value
                ? // All descriptions in one place, the others invisible: the tallest sets the height, so switching moves nothing (CURRENT_SPEC.md, Klidné přepínání režimů).
                  control.subs.map((text, i) => html`<span class=${control.options[i].value === control.value ? "shown" : "spare"}>${joinedText(text)}</span>`)
                : NO_DATA}</span></div>
              <ed-segmented
                guarded .options=${control.options} .value=${control.value} .pending=${this.isPending(control.id)} label=${t.car.modeLabel} .hint=${t.hint.holdDragOrDouble} ?disabled=${!control.value}
                .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
                @hdk-select=${(event: CustomEvent<{ value: string }>) =>
                  e.wallbox.mode ? this.setChargeMode(e.wallbox.mode, event.detail.value) : this.setBoost("wallbox", event.detail.value === "on")}
              ></ed-segmented>
              ${this.renderPowerFold(s, manualBoost)}
              ${e.wallbox.mode ? this.renderTargetFold(s, chargeMode, soc) : nothing}
            </div>`
          : nothing}
        ${this.carVisible(s, model) ? this.renderWallboxGroup(s, model, charging, srcColor, unit) : nothing}
      </section>`;
    }

    /** The mode chosen in Home Assistant (wallbox.mode), undefined without the key or without a known value. */
    chargeMode(s: Settings): "Přetoky" | "Auto" | "Boost" | undefined {
      const value = this.shown(s.entities.wallbox.mode);
      return value === "Přetoky" || value === "Auto" || value === "Boost" ? value : undefined;
    }

    /** „Nabít do“ of the active mode (Auto or Boost); Přetoky has none. */
    targetId(s: Settings, mode: string | undefined): string | undefined {
      const w = s.entities.wallbox;
      return mode === "Auto" ? w.target_auto : mode === "Boost" ? w.target_boost : undefined;
    }

    /**
     * The options of the mode control. With wallbox.mode: Přetoky | Auto | Boost, Auto hidden while the rule only runs in
     * the shadow (wallbox.shadow on), unless Auto is chosen already. Without it: Přetoky | Boost on the Boost switch.
     */
    modeControl(s: Settings, mode: string | undefined, boost: string | undefined): { id: string | undefined; value: string; options: { value: string; label: string }[]; subs: string[] } {
      const t = this.t;
      const w = s.entities.wallbox;
      if (!w.mode) {
        return { id: w.boost, value: boost === "on" || boost === "off" ? boost : "", options: this.boostOptions, subs: [t.car.modeSurplus, t.car.modeBoost] };
      }
      const shadow = readText(this.hass, w.shadow) === "on" && mode !== "Auto";
      const all = [
        { value: "Přetoky", label: t.chargeModes["Přetoky"], sub: t.car.modeSurplus },
        { value: "Auto", label: t.chargeModes.Auto, sub: t.car.modeAuto },
        { value: "Boost", label: t.chargeModes.Boost, sub: t.car.modeBoost },
      ].filter((option) => !(shadow && option.value === "Auto"));
      return { id: w.mode, value: mode ?? "", options: all.map(({ value, label }) => ({ value, label })), subs: all.map((option) => option.sub) };
    }

    /**
     * „Nabít do“ in % of the car, for Auto and Boost, each mode with its own value (uživatel 15. 11. 2026: „Q273 ano“), with
     * an estimate of the time: (target − charge) × capacity ÷ power; Boost at its power, Auto at the lowest one (power_min).
     */
    renderTargetFold(s: Settings, mode: string | undefined, soc: number | undefined): TemplateResult {
      const t = this.t;
      const id = this.targetId(s, mode);
      const entity = entityState(this.hass, id);
      const value = id ? Number(this.shown(id)) : NaN;
      const known = Number.isFinite(value);
      const min = attribute(entity, "min") ?? 50;
      const max = attribute(entity, "max") ?? 100;
      const step = attribute(entity, "step") ?? 5;
      const capacity = readNumber(this.hass, s.entities.car.capacity);
      const { phases, power_min } = s.num.wallbox;
      const perPhase = readNumber(this.hass, s.entities.wallbox.charging_power);
      const kw = mode === "Boost" && perPhase !== undefined ? (perPhase * phases) / 1000 : power_min / 1000;
      let estimate: string | undefined;
      if (known && value >= 100) estimate = t.car.targetFull;
      else if (known && soc !== undefined && soc >= value) estimate = t.car.targetReached;
      else if (known && soc !== undefined && capacity !== undefined && kw > 0) {
        const minutes = Math.max(10, Math.round((((value - soc) / 100) * capacity * 60) / kw / 10) * 10);
        estimate = t.car.targetTime(t.car.duration(Math.floor(minutes / 60), minutes % 60));
      }
      const shownValue = known ? formatPercent(value) : NO_DATA;
      return html`<div class="fold ${id ? "open" : ""}" ?inert=${!id}><div>
        <div class="field">
          <span class="field-label">${t.car.target}</span><span class="field-value">${shownValue}${estimate ? html`<small> · ${estimate}</small>` : nothing}</span>
          <ed-slider
            .min=${min} .max=${max} .step=${step} .value=${known ? value : max}
            label=${t.car.targetLabel} valueText=${known ? `${formatPercent(value)}${estimate ? `, ${estimate}` : ""}` : t.noData}
            minLabel=${formatPercent(min)} maxLabel=${formatPercent(max)}
            ?disabled=${!known}
            @hdk-change=${(event: CustomEvent<{ value: number }>) => id && this.setInputNumber(id, event.detail.value, t.car.target)}
          ></ed-slider>
        </div>
      </div></div>`;
    }

    /** Why and when the Boost of the house ended last, only today (attribute posledni_konec of wallbox.step, „code|time“). */
    lastEnd(s: Settings): string | undefined {
      const raw = entityState(this.hass, s.entities.wallbox.step)?.attributes?.posledni_konec;
      if (typeof raw !== "string" || !raw.includes("|")) return undefined;
      const [code, time] = raw.split("|");
      const at = Date.parse(time);
      const why = this.t.wallbox.endReason[code];
      if (!why || !Number.isFinite(at) || new Date(at).toDateString() !== new Date(this._now).toDateString()) return undefined;
      return this.t.wallbox.lastEnd(formatClock(at), why);
    }

    renderCarSources(model: FlowModel, flows: Settings["num"]["flows"], total: string, boostOn: boolean): TemplateResult {
      const t = this.t;
      const names: Record<Source, string> = t.source;
      const share = model.loadShare.car;
      const parts = SOURCES.filter((source) => share[source] > 0.004);
      const pct = percentages(parts.map((source) => share[source]));
      // The grid beyond its share is a deviation: drawn in the warning colour, like in the texts (not at Boost).
      const colorOf = (source: Source) => (source === "grid" && !boostOn && share.grid > flows.grid_deviation_share / 100 ? "var(--ed-warning)" : `var(${SOURCE_VAR[source]})`);
      return html`<div class="mix">
        <div class="mix-head"><span>${t.car.sourcesTitle}</span><span>${total}</span></div>
        <div class="mix-bar" aria-hidden="true">${parts.map((source) => html`<div style="flex:${share[source]} 1 0;background:${colorOf(source)}"></div>`)}</div>
        <p class="mix-legend" role="group" aria-label=${t.car.sourcesLabel}>
          ${parts.map((source, i) => html`<span><i style="background:${colorOf(source)}"></i>${names[source]}<em>${formatPercent(pct[i])}</em></span>`)}
        </p>
      </div>`;
    }

    /** Charging power in boost: the card shows the total of all phases, the entity holds the power of one phase. */
    renderPowerFold(s: Settings, open: boolean): TemplateResult | typeof nothing {
      const id = s.entities.wallbox.charging_power;
      if (!id) return nothing;
      const { phases, power_min, power_max, power_step } = s.num.wallbox;
      const entity = entityState(this.hass, id);
      const perPhase = readNumber(this.hass, id);
      const total = perPhase === undefined ? undefined : (perPhase * phases) / 1000;
      let min = power_min / 1000;
      let max = power_max / 1000;
      const entityMin = attribute(entity, "min");
      const entityMax = attribute(entity, "max");
      if (entityMin !== undefined) min = Math.max(min, (entityMin * phases) / 1000);
      if (entityMax !== undefined) max = Math.min(max, (entityMax * phases) / 1000);
      return html`<div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
        <div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${total === undefined ? NO_DATA : formatNumber(total, 1)}<small> kW</small></span>
          <ed-slider
            .min=${min} .max=${max} .step=${power_step / 1000} .value=${total ?? min}
            label=${this.t.car.powerLabel} valueText=${total === undefined ? this.t.noData : `${formatNumber(total, 1)} kW`}
            minLabel="${formatNumber(min, 1)} kW" maxLabel="${formatNumber(max, 1)} kW"
            ?disabled=${total === undefined}
            @hdk-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, Math.round((event.detail.value * 1000) / phases), this.t.car.power)}
          ></ed-slider>
        </div>
      </div></div>`;
    }

    renderWallboxGroup(s: Settings, model: FlowModel, charging: boolean, srcColor: string, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const w = s.entities.wallbox;
      const open = !!this._open.wallbox;
      const hasDetail = !!(w.block_charging || w.priority);
      const link = model.carLink;
      const sub =
        charging
          ? html`<span>${t.wallbox.charging} </span><b style="--c:${srcColor}">${formatPower(model.car ?? 0, unit)}</b>`
          : link === "connected" || link === "charging"
            ? html`${t.wallbox.idle}`
            : link === "disconnected"
              ? html`${t.wallbox.disconnected}`
              : html`${NO_DATA}`;
      // The age of the car data: the time of the last message from the car (car.last_message, a timestamp sensor; uživatel
      // 12. 11. 2026: „Q136 A“), not the change of the charge, which follows the prediction of the integration while charging.
      const age = ago(readText(this.hass, s.entities.car.last_message), this._now, t);
      const ended = charging ? undefined : this.lastEnd(s);
      const subParts = [sub, ...(ended ? [ended] : []), ...(age ? [t.wallbox.fromCar(age)] : [])];
      const block = this.shown(w.block_charging);
      const prio = this.shown(w.priority);
      return html`<ul class="group">
        <li class=${open ? "open" : ""}>
          <button type="button" class="row row-btn" aria-expanded=${open ? "true" : "false"} ?disabled=${!hasDetail} @click=${() => this.toggle("wallbox")}>
            <span class="badge" aria-hidden="true" style=${charging ? `--bc:${srcColor}` : ""}><svg viewBox="0 0 24 24"><path d=${ICON.wallbox}></path></svg></span>
            <span class="row-text"><span class="row-title">${t.wallbox.title}</span><span class="row-sub wrap">${subParts.length > 1 ? joined(subParts) : sub}</span></span>
            <span></span>
            ${hasDetail ? html`<svg class="chevron" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>` : html`<span></span>`}
          </button>
          ${hasDetail
            ? html`<div class="fold ${open ? "open" : ""}" ?inert=${!open}><div>
                ${w.block_charging ? this.switchRow(t.wallbox.block, w.block_charging, block === "on" ? t.wallbox.blockOn : t.wallbox.blockOff, block === "on") : nothing}
                ${w.priority ? this.switchRow(t.wallbox.priority, w.priority, prio === "on" ? t.wallbox.priorityOn : t.wallbox.priorityOff, false) : nothing}
              </div></div>`
            : nothing}
        </li>
      </ul>`;
    }
  };
