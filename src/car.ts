/* The car panel: the picture with its link, the charge level, the sources, the mode and the wallbox. */
import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import { SOURCES, isOn, sourceText } from "./model";
import type { FlowModel, Source } from "./model";
import type { Settings } from "./types";
import { ago, entityState, formatClock, formatDayShort, formatNumber, formatPercent, formatPower, powerUnit, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { HoldOrDoubleTap } from "ha-dashboard-kit/gesture";
import { ICON } from "./icons";
import type { Controlled } from "./controls";
import { NO_DATA, SOURCE_VAR, attribute, clamp, meterPosition, mix, percentages, segments } from "./view";
import type { Constructor } from "./view";
import { joined, joinedText } from "ha-dashboard-kit/joined";
import { boostReason, carReason, outsideWindow } from "./reasons";
import { timeline } from "./car-timeline";
import type { Point, Series } from "./car-timeline";

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
      // Auto: the step of the rule; Přetoky (or the Boost switch off without wallbox.mode): what the AZ Router waits for (H7).
      const surplusMode = chargeMode ? chargeMode === "Přetoky" : boost === "off";
      // In the shadow run the rule only writes down that it would start (yaml/packages/nabijeni_auta.yaml, 1794310000112).
      // The shadow run counts its tries too, so „dnes už 2 pokusy“ would claim tries that never charged (dashboard-critic 16. 11.).
      const shadow = readText(this.hass, e.wallbox.shadow) === "on";
      const stepKey = shadow && (step === "start" || step === "dnes_hotovo") ? `${step}_stin` : step;
      const read = (id: string | undefined) => readText(this.hass, id);
      const why = stepKey
        ? t.car.step[stepKey]
        : surplusMode
          ? carReason(read, s, model, t, this._now)
          : manualBoost && !charging
            ? boostReason(read, s, t, this._now, Date.parse(entityState(this.hass, e.wallbox.boost)?.last_changed ?? ""))
            : undefined;
      // The safe end blocks charging for a moment in every mode, not only in Auto (yaml/packages/nabijeni_auta.yaml, script).
      const ending = step === "konci" || read(e.wallbox.block_by_automation) === "on";
      if (ending && link !== "disconnected") {
        stateText = t.car.ending;
      } else if (charging) {
        stateText = [t.car.charging(src.text), ...(step === "nabiji" ? [autoMark] : boostMark)];
        stateColor = srcColor;
      } else if (link === "connected" || link === "charging") {
        // Every state of a connected car says why it does not charge (uživatel 15. 11. 2026: „Všechny takový stavy musí být
        // v nějakém stavu - pro neco jede auto nebo proc nejede.“).
        stateText = why ? [t.car.connected, why, ...boostMark] : [t.car.connectedIdle, ...boostMark];
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
        <!-- The height does not grow with car.image_scale: the picture of the car has transparent margins, so the space would stay
             empty above the charge (uživatel 16. 11. 2026: „mezera nad 76% je hrozně velká, i když auto je celkem malé“). -->
        <div class="car-top" style="height:${e.wallbox.mode ? 188 : 168}px">
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
          <div class="head">
            <h2 id="h-car">
              <button type="button" class="title-btn" aria-haspopup="dialog" aria-expanded=${this._carInfo ? "true" : "false"} aria-label="${this.pickText(s.titles.car) ?? t.titles.car}, ${t.car.info.heading}" @click=${() => this.openCarInfo(s)}>
                ${this.pickText(s.titles.car) ?? t.titles.car}<svg viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.info}></path></svg>
              </button>
            </h2>
            ${this.stateLine(stateText, stateColor)}
          </div>
          ${this._carInfo ? this.renderCarInfo(s, model, stateText, stateColor, { chargeMode, step: stepKey, shadow, charging, manualBoost }) : nothing}
          <div class="car-soc">
            <span class="soc">${soc === undefined ? NO_DATA : formatNumber(soc)}<small>${this._i18n.percent("")}</small>${soc === undefined ? html`<span class="sr-only">${t.noData}</span>` : nothing}</span>
            <span class="range">${t.car.range} <b>${model.carRange === undefined ? NO_DATA : `${formatNumber(model.carRange)} km`}</b></span>
            ${e.wallbox.mode ? this.renderEta(this.eta(s, chargeMode, soc, model, charging)) : nothing}
          </div>
        </div>
        <div class="meter-wrap">
          <div class="meter" role="img" aria-label=${meterLabel}>
            ${segments(clamp(soc ?? 0, 0, 100)).map((fill) => html`<span><i style="width:${fill.toFixed(1)}%"></i></span>`)}
            ${hasLimit ? html`<div class="limit" style="left:${meterPosition(limit)}"></div>` : nothing}
          </div>
        </div>
        ${charging ? this.renderCarSources(model, flows, formatPower(model.car ?? 0, unit), boost === "on") : nothing}
        ${w.boost
          ? html`<div class="mode">
              <div class="mode-head"><span id="mode-l">${t.car.mode}</span><span class="mode-sub">${control.value
                ? // All descriptions in one place, the others invisible: the tallest sets the height, so switching moves nothing (CURRENT_SPEC.md, Klidné přepínání režimů).
                  control.subs.map((text, i) => html`<span class=${control.options[i].value === control.value ? "shown" : "spare"}>${joinedText(text)}</span>`)
                : NO_DATA}</span></div>
              <ed-segmented
                compact guarded .options=${control.options} .value=${control.value} .pending=${this.isPending(control.id)} label=${t.car.modeLabel} .hint=${t.hint.holdDragOrDouble} ?disabled=${!control.value}
                .holdMs=${s.num.ui.hold_ms} .doubleTapMs=${s.num.ui.double_tap_ms} .hintSeconds=${s.num.ui.hint_seconds}
                @hdk-select=${(event: CustomEvent<{ value: string }>) =>
                  e.wallbox.mode ? this.setChargeMode(e.wallbox.mode, event.detail.value) : this.setBoost("wallbox", event.detail.value === "on")}
              ></ed-segmented>
              ${this.renderChargeSettings(s, chargeMode, manualBoost)}
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
    renderTargetField(s: Settings, mode: string | undefined): TemplateResult {
      const t = this.t;
      const id = this.targetId(s, mode);
      const entity = entityState(this.hass, id);
      const value = id ? Number(this.shown(id)) : NaN;
      const known = Number.isFinite(value);
      const min = attribute(entity, "min") ?? 50;
      const max = attribute(entity, "max") ?? 100;
      const step = attribute(entity, "step") ?? 5;
      // The unit small and grey beside the number, like kW of the power and % of the charge (ux-architect 15. 11. 2026).
      const shownValue = known ? html`${formatNumber(value)}<small>${this._i18n.percent("")}</small>` : NO_DATA;
      return html`<div class="field">
          <span class="field-label">${t.car.target}</span><span class="field-value">${shownValue}</span>
          <ed-slider
            .min=${min} .max=${max} .step=${step} .value=${known ? value : max}
            label=${t.car.targetLabel} valueText=${known ? formatPercent(value) : t.noData}
            minLabel=${formatPercent(min)} maxLabel=${formatPercent(max)}
            ?disabled=${!known}
            @hdk-change=${(event: CustomEvent<{ value: number }>) => id && this.setInputNumber(id, event.detail.value, t.car.target)}
          ></ed-slider>
        </div>`;
    }

    /**
     * „Kolik % mám a kdy odjedu“ (uživatel 16. 11. 2026) under the charge: the target of the active mode, the time only while
     * charging (at the measured power; waiting, a time would contradict „čeká na slunce“), undefined in Přetoky.
     */
    eta(s: Settings, mode: string | undefined, soc: number | undefined, model: FlowModel, charging: boolean): { text: string; toward: boolean } | undefined {
      const t = this.t;
      const id = this.targetId(s, mode);
      const target = id ? Number(this.shown(id)) : NaN;
      if (!Number.isFinite(target) || soc === undefined || model.carLink === "disconnected") return undefined;
      if (target < 100 && soc >= target) return { text: t.car.etaReached, toward: false };
      const goal = target >= 100 ? t.car.etaFull : formatPercent(target);
      const capacity = readNumber(this.hass, s.entities.car.capacity);
      const kw = (model.car ?? 0) / 1000;
      if (!charging || capacity === undefined || kw <= 0) return { text: t.car.eta(goal), toward: true };
      const minutes = Math.max(10, Math.round((((Math.min(target, 100) - soc) / 100) * capacity * 60) / kw / 10) * 10);
      return { text: t.car.eta(goal, t.car.duration(Math.floor(minutes / 60), minutes % 60)), toward: true };
    }

    /** The reserved line; the arrow is drawn, a screen reader hears „cíl“ instead (dashboard-critic 16. 11.). */
    renderEta(eta: { text: string; toward: boolean } | undefined): TemplateResult {
      if (!eta) return html`<span class="eta">\u00a0</span>`;
      return html`<span class="eta">${eta.toward ? html`<span aria-hidden="true">→ </span><span class="sr-only">${this.t.car.etaLabel} </span>` : nothing}${eta.text}</span>`;
    }

    /**
     * One row „Nastavení nabíjení 4,2 kW · do 75 %“ that opens the sliders (uživatel 16. 11. 2026: „Režim Boost je moc
     * dominantní“; the pattern of Cílové teploty): the power in Boost, „Nabít do“ in Auto and Boost; no row in Přetoky.
     */
    renderChargeSettings(s: Settings, mode: string | undefined, manualBoost: boolean): TemplateResult | typeof nothing {
      const t = this.t;
      const w = s.entities.wallbox;
      const power = manualBoost && w.charging_power ? readNumber(this.hass, w.charging_power) : undefined;
      const showPower = manualBoost && !!w.charging_power;
      const targetId = w.mode ? this.targetId(s, mode) : undefined;
      // In Přetoky the row folds away smoothly instead of disappearing (CURRENT_SPEC.md, Klidné přepínání režimů).
      const shown = showPower || !!targetId;
      const open = !!this._open.charge;
      const target = targetId ? Number(this.shown(targetId)) : NaN;
      const parts = [
        ...(showPower ? [html`${t.car.powerShort} <b>${power === undefined ? this.noData() : `${formatNumber((power * s.num.wallbox.phases) / 1000, 1)} kW`}</b>`] : []),
        ...(targetId ? [html`${t.car.targetShort} <b>${Number.isFinite(target) ? formatPercent(target) : this.noData()}</b>`] : []),
      ];
      return html`<div class="fold ${shown ? "open" : ""}" ?inert=${!shown}><div><div class="charge-settings">
        <button type="button" class="rowbtn" aria-expanded=${open ? "true" : "false"} @click=${() => this.toggle("charge")}>
          <span class="rowbtn-title">${t.car.settings}</span>
          <span class="rowbtn-value">${shown ? joined(parts, { whole: true }) : nothing}</span>
          <svg class="chevron ${open ? "turned" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d=${ICON.expand}></path></svg>
        </button>
        <div class="fold ${open && shown ? "open" : ""}" ?inert=${!open || !shown}><div class="charge-fields">
          ${showPower ? this.renderPowerField(s) : nothing}
          ${targetId ? this.renderTargetField(s, mode) : nothing}
        </div></div>
      </div></div></div>`;
    }

    /** Why and when the Boost of the house ended last, only today (attribute posledni_konec of wallbox.step, „code|time“). */
    lastEnd(s: Settings): string[] | undefined {
      const end = this.lastEndRecord(s);
      if (!end || !end.today) return undefined;
      return [this.t.wallbox.lastEnd(formatClock(end.at)), end.why];
    }

    /** „kód|čas|nabití auta|energie“ of the last end of a Boost (input_text.nabijeni_auta_posledni_konec through wallbox.step). */
    lastEndRecord(s: Settings): { at: number; why: string; today: boolean; soc?: number; kwh?: number } | undefined {
      const raw = entityState(this.hass, s.entities.wallbox.step)?.attributes?.posledni_konec;
      if (typeof raw !== "string" || !raw.includes("|")) return undefined;
      const [code, time, soc, kwh] = raw.split("|");
      const at = Date.parse(time);
      const why = this.t.wallbox.endReason[code];
      if (!why || !Number.isFinite(at)) return undefined;
      const num = (value: string | undefined) => (value !== undefined && value !== "" && Number.isFinite(Number(value)) ? Number(value) : undefined);
      return { at, why, today: new Date(at).toDateString() === new Date(this._now).toDateString(), soc: num(soc), kwh: num(kwh) };
    }

    /**
     * „Co se děje s autem“ (uživatel 16. 11. 2026: „Potrebuju videt co se s autem deje. Treba nejake (i) kde se mi zobrazi proc
     * se stala poslední akce a co bude následovat.“): now, the last end of a Boost with its reason, what comes next.
     */
    renderCarInfo(
      s: Settings, model: FlowModel, stateText: string | unknown[] | undefined, stateColor: string | undefined,
      at: { chargeMode: string | undefined; step: string | undefined; shadow: boolean; charging: boolean; manualBoost: boolean },
    ): TemplateResult {
      const t = this.t;
      const i = t.car.info;
      const end = this.lastEndRecord(s);
      const soc = model.carSoc;
      const targetId = this.targetId(s, at.chargeMode);
      const target = targetId ? Number(this.shown(targetId)) : NaN;
      const goal = Number.isFinite(target) ? (target >= 100 ? t.car.etaFull : formatPercent(target)) : undefined;
      let next: string;
      if (model.carLink === "disconnected") next = i.nextDisconnected(t.chargeModes[at.chargeMode ?? ""] ?? t.boostOptions.off);
      else if (Number.isFinite(target) && target < 100 && soc !== undefined && soc >= target) next = i.nextDone;
      else if (at.manualBoost) next = Number.isFinite(target) && target < 100 ? i.nextBoost(goal!) : i.nextBoostFull;
      else if (at.chargeMode === "Auto" && at.shadow) next = i.nextShadow;
      else if (at.chargeMode === "Auto") next = at.step === "nabiji" ? i.nextAutoCharging(goal ?? t.car.etaFull) : i.nextAutoWait;
      else {
        // The start of the AZ Router (per phase × phases) when known, otherwise the lowest charging power; the same reasons
        // as the state line come first, so now and next never contradict (dashboard-critic 16. 11. 2026).
        const start = readNumber(this.hass, s.entities.wallbox.solar_start);
        const power = `${formatNumber((start !== undefined ? start * s.num.wallbox.phases : s.num.wallbox.power_min) / 1000, 1)}\u00a0kW`;
        const read = (id: string | undefined) => readText(this.hass, id);
        const w = s.entities.wallbox;
        const window = outsideWindow(read, w.window, w.window_start, w.window_end, this._now);
        if (read(w.block_charging) === "on" && read(w.block_by_automation) !== "on") next = i.nextBlocked;
        else if (read(w.block_solar) === "on") next = i.nextSolarBlocked;
        else if (window) next = i.nextWindow(window);
        else if ((model.soc ?? 0) < s.num.battery.full && model.soc !== undefined) next = i.nextBattery(power);
        else next = i.nextSurplus(power);
      }
      const when = end ? (end.today ? formatClock(end.at) : `${formatDayShort(end.at)} ${formatClock(end.at)}`) : undefined;
      const detail = end
        ? [
            ...(end.soc !== undefined ? [i.atEnd(formatPercent(end.soc))] : []),
            ...(end.kwh !== undefined ? [i.delivered(`${formatNumber(end.kwh, 1)} kWh`)] : []),
          ]
        : [];
      // The charge can fall when the car reports its real charge after the end (the prediction of the integration overshoots
      // while charging: 16. 11. 2026 75,3 % predicted, 70 % reported).
      const drop = end?.soc !== undefined && soc !== undefined && end.soc - soc >= 2 ? i.socDrop(formatPercent(end.soc), formatPercent(soc)) : undefined;
      // Variant 2 (uživatel 16. 11. 2026: „Q298 varianta 2“): the day as a timeline, then now and what comes next.
      // Without the history (wallbox.last_end and the recorder) the last end of a Boost stands in for it.
      const tl = this._carTimeline;
      const rows = tl?.status === "ready" ? tl.rows : [];
      const past = rows.length
        ? rows.map((row) => html`<li class="ev"><time>${formatClock(row.at)}</time><span class="line" aria-hidden="true"></span><span class="t"><b>${row.title}</b>${row.detail.length ? html`<span>${row.detail.join(" · ")}</span>` : nothing}</span></li>`)
        : tl?.status === "loading" || tl?.status === "error"
          ? html`<li class="ev"><time></time><span class="line" aria-hidden="true"></span><span class="t"><span>${tl.status === "error" ? i.error : i.loading}</span></span></li>`
          : end
            ? html`<li class="ev"><time>${when}</time><span class="line" aria-hidden="true"></span><span class="t"><b>${i.lastEnd(when!, end.why)}</b>${detail.length ? html`<span>${detail.join(" · ")}</span>` : nothing}</span></li>`
            : html`<li class="ev"><time></time><span class="line" aria-hidden="true"></span><span class="t"><span>${i.empty}</span></span></li>`;
      return html`<ed-sheet open .heading=${i.heading} .closeLabel=${t.close} @hdk-close=${() => (this._carInfo = false)}><div class="pop car-info">
        <ol class="timeline" aria-label=${i.today}>
          ${past}
          <li class="ev now"><span class="when">${i.now}</span><span class="line" aria-hidden="true"></span><span class="t">${this.stateLine(stateText, stateColor)}${soc !== undefined ? html`<span>${t.car.info.timeline.soc(formatPercent(soc))}</span>` : nothing}${drop ? html`<span>${drop}</span>` : nothing}</span></li>
          <li class="ev next"><span class="when">${i.next}</span><span class="line" aria-hidden="true"></span><span class="t"><span class="next-text">${next}</span></span></li>
        </ol>
      </div></ed-sheet>`;
    }

    /** Opens „Co se děje s autem“ and reads today's history of the car from the recorder. */
    async openCarInfo(s: Settings): Promise<void> {
      this._carInfo = true;
      const hass = this.hass;
      const w = s.entities.wallbox;
      const ids: Partial<Record<keyof Series, string>> = { boost: w.boost, mode: w.mode, status: w.status, end: w.last_end, soc: s.entities.car.state_of_charge, target: w.target_boost };
      const wanted = Object.values(ids).filter((id): id is string => !!id);
      if (!hass || !wanted.length) return;
      this._carTimeline = { status: "loading", rows: this._carTimeline?.rows ?? [] };
      const midnight = new Date(this._now);
      midnight.setHours(0, 0, 0, 0);
      try {
        const result = await hass.callWS<Record<string, Array<{ s?: string; state?: string; lu?: number; last_updated?: number | string }>> | null>({
          type: "history/history_during_period",
          // From an hour before midnight, so the state at midnight is known (a Boost that ran over midnight).
          start_time: new Date(midnight.getTime() - 3600000).toISOString(),
          end_time: new Date().toISOString(),
          entity_ids: wanted,
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });
        const series: Series = {};
        for (const [key, id] of Object.entries(ids) as Array<[keyof Series, string | undefined]>) {
          if (!id) continue;
          series[key] = (result?.[id] ?? []).flatMap((item): Point[] => {
            const raw = item.lu ?? item.last_updated;
            const at = typeof raw === "number" ? raw * 1000 : raw ? Date.parse(raw) : NaN;
            const state = item.s ?? item.state;
            return Number.isFinite(at) && state !== undefined ? [{ at, state }] : [];
          });
        }
        this._carTimeline = { status: "ready", rows: timeline(series, midnight.getTime(), this.t, (value) => formatPercent(value), (ms) => formatClock(ms)) };
      } catch {
        this._carTimeline = { status: "error", rows: [] };
      }
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
    renderPowerField(s: Settings): TemplateResult | typeof nothing {
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
      return html`<div class="field">
          <span class="field-label">${this.t.car.power}</span><span class="field-value">${total === undefined ? NO_DATA : formatNumber(total, 1)}<small> kW</small></span>
          <ed-slider
            .min=${min} .max=${max} .step=${power_step / 1000} .value=${total ?? min}
            label=${this.t.car.powerLabel} valueText=${total === undefined ? this.t.noData : `${formatNumber(total, 1)} kW`}
            minLabel="${formatNumber(min, 1)} kW" maxLabel="${formatNumber(max, 1)} kW"
            ?disabled=${total === undefined}
            @hdk-change=${(event: CustomEvent<{ value: number }>) => this.setNumber(id, Math.round((event.detail.value * 1000) / phases), this.t.car.power)}
          ></ed-slider>
        </div>`;
    }

    renderWallboxGroup(s: Settings, model: FlowModel, charging: boolean, srcColor: string, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const w = s.entities.wallbox;
      const open = !!this._open.wallbox;
      const hasDetail = !!(w.block_charging || w.priority);
      const link = model.carLink;
      const sub =
        charging
          ? // The power is once, at „Odkud auto nabíjí“ (uživatel 16. 11. 2026: „dole ve Wallbox kartě nechat jen stav a poslední aktualizaci“).
            html`${t.wallbox.charging}`
          : link === "connected" || link === "charging"
            ? html`${t.wallbox.idle}`
            : link === "disconnected"
              ? html`${t.wallbox.disconnected}`
              : html`${NO_DATA}`;
      // The age of the car data: the time of the last message from the car (car.last_message, a timestamp sensor; uživatel
      // 12. 11. 2026: „Q136 A“), not the change of the charge, which follows the prediction of the integration while charging.
      const age = ago(readText(this.hass, s.entities.car.last_message), this._now, t);
      const ended = charging ? undefined : this.lastEnd(s);
      const subParts = [sub, ...(ended ?? []), ...(age ? [t.wallbox.fromCar(age)] : [])];
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
