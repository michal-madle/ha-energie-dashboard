/* The house: the appliances (the label of Home Assistant), their popup, alerts and the detail "Dům" (CURRENT_SPEC.md, Dům: popup a detail). */
import { html, nothing, svg } from "lit";
import type { TemplateResult } from "lit";
import { isOn } from "./model";
import type { FlowModel } from "./model";
import type { Layout } from "./sankey";
import type { Sunned } from "./sun";
import type { Chart } from "./battery";
import type { GroupConfig, Settings } from "./types";
import { allTexts } from "ha-dashboard-kit/config";
import type { LocalizedText } from "ha-dashboard-kit/config";
import { DAY, HOUR, RANGES, W, bin, fetchStatistics, formatDuration, hasValues, niceCeil } from "./battery-data";
import type { Period, Range, StatRow, Stats } from "./battery-data";
import { GUTTER, timeTicks } from "./chart-grid";
import { formatClock, formatDayName, formatKwh, formatNumber, formatPower, powerUnit, readEnergy, readNumber, readText } from "./utils";
import type { PowerUnit } from "./utils";
import { NO_DATA, clamp } from "./view";
import type { Alert, BatEntry, Constructor, Tile } from "./view";
import { joined, joinedText } from "ha-dashboard-kit/joined";

/** How long a loaded history is used before it is fetched again (ms). */
const REFRESH = 5 * 60000;
/** The longest time a finished cycle is shown in the status line (uživatel 2. 11.: 24 h back). */
const ENDED_MAX = 24 * HOUR;
/** How far back the states of the cycle helpers are read: the last cycle of an appliance that did not run for days is still known. */
const CYCLE_DAYS = 7;
/** The most rows in the popup (uživatel 9. 11. 2026: "Q1 B"). */
const POPUP_ROWS = 5;
const KINDS = ["overcurrent", "overheating", "overpowering", "overvoltage"] as const;
type Kind = (typeof KINDS)[number];
/** The colours of the appliances in the chart: indigo, pink, teal, amber, green, steel blue, and since 9. 11. 2026 ("Q13 ano": nine) red, orchid, olive; each at least 3 : 1 on the dark and the light surface. */
const APP_COLORS = ["#5E5CE6", "#E8457A", "#1E9E96", "#B8803A", "#5E9E34", "#6F8FAF", "#D9503C", "#A064C8", "#8F8C2A"];
const HOUSE_RANGE_KEY = "ha-energie-dashboard.house-range";
/** The icon of an appliance that draws no power (the power symbol, grey). */
const POWER_OFF = "M13,3H11V13H13V3M17.83,5.17L16.41,6.59C17.99,7.86 19,9.81 19,12C19,15.87 15.87,19 12,19C8.13,19 5,15.87 5,12C5,9.82 6.01,7.87 7.59,6.59L6.17,5.17C4.23,6.82 3,9.26 3,12C3,16.97 7.03,21 12,21C16.97,21 21,16.97 21,12C21,9.26 19.77,6.82 17.83,5.17Z";

/** An appliance: a device that has the label, with the entities found on it and the helpers of its cycle from the configuration. */
/** The key of an open group among the names of the appliances. */
const groupKey = (index: number) => `\u0000group:${index}`;
/** The icon of an appliance that has none (the device has no icon and the configuration none). */
const DEFAULT_ICON = "mdi:power-plug";

/** What decides whether an appliance (or a member of a group) runs: its power and, if it has one, its helper. */
interface Runner {
  power: string;
  running?: string;
}

/** A row of the popup: an appliance, or a member of a group (its helper only gives the duration). */
interface PopupItem extends Runner {
  key: string;
  name: string;
  icon?: string;
  /** An appliance with the helper of a cycle: it is in the popup whenever it runs. */
  cycle: boolean;
  /** Minutes of running after which the alert "Běží už …" appears. */
  warnAfter?: number;
}

export interface Appliance {
  /** The identity of the appliance: the name of its device, or the first name of the configuration. */
  name: string;
  /** The name in the configuration (a text or the texts by language); shown instead of `name`. */
  label?: LocalizedText;
  deviceId: string;
  power: string;
  energy?: string;
  plug?: string;
  problems: Array<{ id: string; kind: Kind }>;
  running?: string;
  startEnergy?: string;
  /** Minutes of running after which the alert "Běží už …" appears. */
  warnAfter?: number;
  /** The icon the user gave to the device or its entities (mdi:washing-machine), if any. */
  icon?: string;
}

interface Registry {
  devices?: Record<string, { name?: string | null; name_by_user?: string | null; labels?: string[] }>;
  entities?: Record<string, { device_id?: string | null; labels?: string[] }>;
}

export const withHouse = <T extends Constructor<Sunned>>(Base: T) =>
  class extends Base {
    // ----------------------------------------------------------------- the appliances

    /** The appliances: the devices that have the label and measure power, and the ones named in house.appliances with their power sensor; the others (a vacuum) drop out. */
    appliances(s: Settings): Appliance[] {
      const reg = this.hass as unknown as Registry | undefined;
      const devices = reg?.devices ?? {};
      const entities = reg?.entities ?? {};
      const label = s.houseLabel.toLowerCase();
      const has = (labels: string[] | undefined) => !!labels?.some((item) => item.toLowerCase() === label);
      const ids = new Set<string>();
      for (const [id, device] of Object.entries(devices)) if (has(device.labels)) ids.add(id);
      for (const entity of Object.values(entities)) if (entity.device_id && has(entity.labels)) ids.add(entity.device_id);
      /** The entities found on a device. */
      const gather = (deviceId: string | undefined) => {
        const found: { power?: string; energy?: string; plug?: string; icon?: string; problems: Appliance["problems"] } = { problems: [] };
        const icons: Record<string, string> = {};
        for (const [entityId, entity] of Object.entries(entities)) {
          if (!deviceId || entity.device_id !== deviceId) continue;
          const state = this.hass?.states?.[entityId];
          if (!state) continue;
          const icon = state.attributes?.icon;
          if (typeof icon === "string" && icon) icons[entityId] = icon;
          const cls = state.attributes?.device_class;
          if (entityId.startsWith("sensor.")) {
            if (cls === "power" && !found.power) found.power = entityId;
            else if (cls === "energy" && state.attributes?.state_class === "total_increasing" && !entityId.endsWith("_returned") && !found.energy) found.energy = entityId;
          } else if (entityId.startsWith("binary_sensor.") && cls === "problem") {
            const kind = KINDS.find((k) => entityId.endsWith(`_${k}`));
            if (kind) found.problems.push({ id: entityId, kind });
          } else if (entityId.startsWith("switch.") && !found.plug) {
            found.plug = entityId;
          }
        }
        // The switch of the plug first, then the power sensor, then any entity of the device.
        found.icon = (found.plug && icons[found.plug]) || (found.power && icons[found.power]) || Object.values(icons)[0];
        return found;
      };
      const result: Appliance[] = [];
      for (const deviceId of ids) {
        const device = devices[deviceId];
        const name = (device?.name_by_user || device?.name || deviceId).trim();
        const found = gather(deviceId);
        if (!found.power) continue;
        const config = s.appliances.find((item) => allTexts(item.name).some((text) => text.toLowerCase() === name.toLowerCase()));
        result.push({ name, label: config?.name, deviceId, warnAfter: config?.warn_after, power: config?.power ?? found.power, energy: config?.energy ?? found.energy, plug: found.plug, icon: this.iconOf(config?.icon, found.icon, [config?.power ?? found.power, config?.energy ?? found.energy, config?.running, config?.start_energy]), problems: found.problems, running: config?.running, startEnergy: config?.start_energy });
      }
      // An appliance named with its power sensor in the configuration needs no label.
      for (const config of s.appliances) {
        if (!config.power || result.some((a) => a.power === config.power)) continue;
        const deviceId = entities[config.power]?.device_id ?? undefined;
        const found = gather(deviceId);
        result.push({ name: allTexts(config.name)[0], label: config.name, deviceId: deviceId ?? config.power, power: config.power, energy: config.energy ?? found.energy, plug: found.plug, icon: this.iconOf(config.icon, found.icon, [config.power, config.energy, config.running, config.start_energy]), problems: found.problems, running: config.running, startEnergy: config.start_energy, warnAfter: config.warn_after });
      }
      return result.sort((a, b) => a.name.localeCompare(b.name));
    }

    /** The appliances of the list and of the chart: without the ones that are members of a group (a power sensor is listed once, in its group). */
    listed(s: Settings): Appliance[] {
      const grouped = new Set(s.groups.flatMap((g) => g.appliances.map((m) => m.power)));
      return this.appliances(s).filter((a) => !grouped.has(a.power));
    }

    /** What the popup can show: the listed appliances and the members of the groups (Varná deska and Trouba are named in the popup, the group stays one row of the detail). */
    popupItems(s: Settings): PopupItem[] {
      const apps = this.listed(s).map((a): PopupItem => ({ key: a.name, name: this.applianceName(a), icon: a.icon, power: a.power, running: a.running, cycle: !!a.running, warnAfter: a.warnAfter }));
      const members = s.groups.flatMap((g, index) => g.appliances.map((m): PopupItem => ({ key: `${groupKey(index)}:${m.power}`, name: this.pickText(m.name) ?? "", icon: g.icon, power: m.power, running: m.running, cycle: false, warnAfter: m.warn_after })));
      return [...apps, ...members];
    }

    /** The icon of an appliance: the configured one, the one of the entities of its device, the one of its helpers, otherwise a plug. */
    iconOf(configured: string | undefined, found: string | undefined, ids: Array<string | undefined>): string {
      const own = ids.map((id) => (id ? this.hass?.states?.[id]?.attributes?.icon : undefined)).find((icon): icon is string => typeof icon === "string" && icon !== "");
      return configured ?? found ?? own ?? DEFAULT_ICON;
    }

    /** The name of the appliance in the language of the card. */
    applianceName(a: Appliance): string {
      return this.pickText(a.label) ?? a.name;
    }

    /** The icon of the appliance (Home Assistant draws it from its name). */
    renderApplianceIcon(a: Appliance): TemplateResult | typeof nothing {
      return a.icon ? html`<ha-icon class="house-icon" icon=${a.icon}></ha-icon>` : nothing;
    }

    /** An appliance that draws no power: the grey power symbol instead of a word. */
    renderIdleMark(): TemplateResult {
      return html`<span class="house-idle" role="img" aria-label=${this.t.house.idle}><svg viewBox="0 0 24 24" aria-hidden="true"><path d=${POWER_OFF}></path></svg></span>`;
    }

    /** What the card sees of the label when it finds no appliance (shown in the detail so that the cause can be told). */
    labelDiagnostics(s: Settings): string {
      const reg = this.hass as unknown as Registry | undefined;
      const label = s.houseLabel.toLowerCase();
      const has = (labels: string[] | undefined) => !!labels?.some((item) => item.toLowerCase() === label);
      const found = new Set<string>();
      for (const [id, device] of Object.entries(reg?.devices ?? {})) if (has(device.labels)) found.add(id);
      for (const entity of Object.values(reg?.entities ?? {})) if (entity.device_id && has(entity.labels)) found.add(entity.device_id);
      return this.t.house.noneHint(s.houseLabel, found.size, !!reg?.devices && !!reg?.entities);
    }

    /** Whether the appliance runs: the helper of its cycle, otherwise (an appliance without helpers) its power above the threshold. */
    applianceOn(a: Runner, s: Settings): boolean | undefined {
      if (a.running) {
        const state = readText(this.hass, a.running);
        if (state === "on") return true;
        if (state === "off") return false;
      }
      const watts = readNumber(this.hass, a.power);
      return watts === undefined ? undefined : isOn(watts, s.num.flows.idle_threshold);
    }

    /** When the helper last changed (ms); the start of the running cycle or the end of the finished one. */
    changedAt(a: Pick<Runner, "running">): number | undefined {
      const iso = a.running ? this.hass?.states?.[a.running]?.last_changed : undefined;
      const time = iso ? Date.parse(iso) : NaN;
      return Number.isFinite(time) ? time : undefined;
    }

    /** Start, end and length of the last cycle: from the moments the helper turned on and off (the recorder), without them only a running cycle (the helper changed when it started). */
    cycleTimes(a: Pick<Runner, "running">, on: boolean | undefined): { start?: number; end?: number; minutes?: number } {
      const known = a.running ? this._houseCycles?.byId[a.running] : undefined;
      const lastStart = known?.starts.length ? Math.max(...known.starts) : undefined;
      const lastEnd = known?.ends.length ? Math.max(...known.ends) : undefined;
      if (on) {
        const start = lastStart ?? this.changedAt(a);
        return { start, minutes: start === undefined ? undefined : Math.max(0, Math.round((Date.now() - start) / 60000)) };
      }
      // The last finished cycle: the last end and the last start before it.
      const before = lastEnd === undefined ? [] : (known?.starts ?? []).filter((start) => start < lastEnd);
      const start = before.length ? Math.max(...before) : undefined;
      if (start !== undefined && lastEnd !== undefined) return { start, end: lastEnd, minutes: Math.round((lastEnd - start) / 60000) };
      // Without the history the helper changed when the cycle ended (after a restart of Home Assistant that is the restart, so only the history is believed when it is there).
      return { end: known ? lastEnd : this.changedAt(a) };
    }

    /** A moment as the clock, with the day when it is not today ("včera 23:20"); `from` is the start of the range: the same day is not repeated. */
    stamp(time: number, from?: number): string {
      const t = this.t;
      const clock = formatClock(time);
      const midnight = (ms: number) => {
        const date = new Date(ms);
        date.setHours(0, 0, 0, 0);
        return date.getTime();
      };
      const day = midnight(time);
      const today = midnight(Date.now());
      if (from !== undefined && midnight(from) === day) return clock;
      if (day === today) return from === undefined ? clock : `${t.house.todayWord} ${clock}`;
      if (day === midnight(today - 12 * HOUR)) return `${t.house.yesterday} ${clock}`;
      return `${formatDayName(time)} ${clock}`;
    }

    /** The energy of the cycle: the counter minus the value saved at the start. */
    cycleKwh(a: Appliance): number | undefined {
      const end = readEnergy(this.hass, a.energy);
      const start = readNumber(this.hass, a.startEnergy);
      return end === undefined || start === undefined ? undefined : Math.max(0, end - start);
    }

    /** The status line of an appliance: "Běží · 31 min", "Skončilo · před 40 min" (up to 24 h) or nothing. */
    applianceStatus(a: Appliance, s: Settings): string | undefined {
      const t = this.t;
      const on = this.applianceOn(a, s);
      if (on === undefined) return undefined;
      const times = this.cycleTimes(a, on);
      if (on) return a.running && times.minutes !== undefined ? t.house.running(formatDuration(times.minutes)) : t.house.runningNoCycle;
      if (a.running && times.end !== undefined && Date.now() - times.end <= ENDED_MAX) return t.house.ended(formatDuration(Math.max(0, Math.round((Date.now() - times.end) / 60000))));
      return undefined;
    }

    // ----------------------------------------------------------------- alerts

    /** One alert for each appliance whose socket reports a fault, and for each one that runs longer than its `warn_after` (CURRENT_SPEC.md, Upozornění). */
    houseAlerts(s: Settings): Alert[] {
      const faults = this.appliances(s).flatMap((a) => {
        const active = a.problems.filter((p) => readText(this.hass, p.id) === "on");
        return active.map((p) => ({ kind: "warn" as const, title: this.applianceName(a), text: this.t.house.problem[p.kind] }));
      });
      // "Trouba běží už 2 h" (uživatel 9. 11. 2026): only by the helper `running`, the duration from the recorder (a restart of Home Assistant is no start).
      const long = this.popupItems(s).flatMap((item) => {
        if (!item.warnAfter || !item.running || this.applianceOn(item, s) !== true) return [];
        const minutes = this.cycleTimes(item, true).minutes;
        return minutes !== undefined && minutes >= item.warnAfter ? [{ kind: "warn" as const, title: item.name, text: this.t.house.runningLong(formatDuration(minutes)) }] : [];
      });
      return [...faults, ...long];
    }

    // ----------------------------------------------------------------- the popup

    /**
     * The rows are decided when the popup opens (uživatel 9. 11. 2026, "Q1 B"): at most five, the running cycles always among them, the rest by power
     * (an appliance or a member of a group runs by its helper, without one by its power above the threshold); shown from the largest power.
     */
    freezeHouse(s: Settings): void {
      const watts = (item: Runner) => readNumber(this.hass, item.power) ?? 0;
      const byPower = (a: PopupItem, b: PopupItem) => watts(b) - watts(a);
      const running = this.popupItems(s).filter((item) => this.applianceOn(item, s) === true);
      const cycles = running.filter((item) => item.cycle).sort(byPower).slice(0, POPUP_ROWS);
      const others = running.filter((item) => !item.cycle).sort(byPower).slice(0, POPUP_ROWS - cycles.length);
      this._houseFrozen = [...cycles, ...others].sort(byPower).map((item) => item.key);
    }

    /** The order of the detail, decided when it opens: what runs (an appliance by its helper or power, a group by the sum of its power) from the largest power, the rest after it. */
    houseOrder(s: Settings): string[] {
      const active: Array<{ key: string; watts: number }> = [];
      for (const a of this.listed(s)) if (this.applianceOn(a, s) === true) active.push({ key: a.name, watts: readNumber(this.hass, a.power) ?? 0 });
      s.groups.forEach((group, index) => {
        // The same rule as the row of the group: a sum counts only when every appliance of it is known (otherwise the row shows "––").
        const watts = group.appliances.map((m) => readNumber(this.hass, m.power));
        if (watts.some((value) => value === undefined)) return;
        const sum = (watts as number[]).reduce((total, value) => total + value, 0);
        if (isOn(sum, s.num.flows.idle_threshold)) active.push({ key: groupKey(index), watts: sum });
      });
      return active.sort((a, b) => b.watts - a.watts).map((item) => item.key);
    }

    /** The order of the table of each group, decided when the detail opens: from the largest power now, the unknown ones last (uživatel 9. 11. 2026, "Q19 ok"). */
    memberOrder(s: Settings): Record<number, string[]> {
      return Object.fromEntries(
        s.groups.map((group, index) => [index, group.appliances.map((m) => ({ power: m.power, watts: readNumber(this.hass, m.power) ?? -1 })).sort((a, b) => b.watts - a.watts).map((m) => m.power)]),
      );
    }

    renderHousePopup(tile: Tile, lay: Layout, s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const idle = s.num.flows.idle_threshold;
      const on = isOn(model.other, idle);
      const day = this.today(s);
      const all = this.popupItems(s);
      const rows = (this._houseFrozen ?? []).map((key) => all.find((item) => item.key === key)).filter((item): item is PopupItem => !!item);
      // Wider than the other popups (uživatel 2. 11.): a value never wraps.
      const width = Math.min(300, lay.width);
      const centreX = tile.side === "L" ? lay.tile.w / 2 : lay.width - lay.tile.w / 2;
      const left = clamp(centreX - width / 2, 0, lay.width - width);
      const centreY = tile.side === "L" ? lay.left[tile.key as "sun"] : lay.right[tile.key as "house"];
      const top = centreY - lay.tile.h / 2;
      const below = centreY < lay.height / 2;
      const place = below ? `top:${(top + lay.tile.h + 8).toFixed(0)}px` : `bottom:${(lay.height - top + 8).toFixed(0)}px`;
      // Watts in the whole popup (uživatel 9. 11. 2026, "Q10 ano").
      const now = on ? formatPower(model.other!, "W").replace(" ", "\u00a0") : model.other === undefined ? NO_DATA : t.idle.house;
      return html`<div class="pop bat-pop house-pop" role="dialog" aria-label=${tile.name} tabindex="-1" style="left:${left.toFixed(0)}px;${place};width:${width}px">
        <i class="arrow ${below ? "up" : "down"}" aria-hidden="true" style="left:${(centreX - left - 6).toFixed(0)}px"></i>
        <div class="pop-head"><span class="pop-title">${tile.name}</span><span class="pop-now">${now}</span></div>
        <div class="pop-rows">
          ${rows.map((item) => {
            const watts = readNumber(this.hass, item.power);
            const running = this.applianceOn(item, s);
            const app = this.listed(s).find((a) => a.name === item.key);
            const status = app ? this.applianceStatus(app, s) : undefined;
            const minutes = this.cycleTimes(item, running).minutes;
            // The duration only where a helper says when it started (a power sensor alone cannot).
            const label = running && item.running && minutes !== undefined ? `${item.name} · ${formatDuration(minutes)}` : item.name;
            // The symbol of a switched-off appliance only for an appliance with the helper of a cycle; a member of a group shows what it draws (CURRENT_SPEC.md: groups without the symbol).
            const value = watts === undefined ? html`<b>${NO_DATA}</b>` : isOn(watts, idle) || running || !item.cycle ? html`<b>${formatPower(watts, "W").replace(" ", "\u00a0")}</b>` : this.renderIdleMark();
            return html`<div class="house-app" title=${status ?? ""}><span class="ell">${item.icon ? html`<ha-icon class="house-icon" icon=${item.icon}></ha-icon>` : nothing}${label}</span>${value}</div>`;
          })}
          <div class="pop-row"><span>${t.pop.rows.consumed}</span><b>${day.house === undefined ? NO_DATA : `${formatKwh(day.house)}\u00a0kWh`}</b></div>
        </div>
        <button type="button" class="bat-open" @click=${() => this.openHouseDetail()}><span>${t.house.open}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg></button>
      </div>`;
    }

    // ----------------------------------------------------------------- state and history

    houseRange(s: Settings): Range {
      if (this._houseRange) return this._houseRange;
      try {
        const saved = localStorage.getItem(HOUSE_RANGE_KEY);
        if (saved && (RANGES as readonly string[]).includes(saved)) return saved as Range;
      } catch {
        /* no storage: the configured default */
      }
      return s.houseRange;
    }

    setHouseRange(range: Range): void {
      this._houseRange = range;
      this._batScrub = {};
      try {
        localStorage.setItem(HOUSE_RANGE_KEY, range);
      } catch {
        /* no storage */
      }
    }

    openHouseDetail(): void {
      this._houseDetail = true;
      this._houseOpen = [];
      this._houseTab = "now";
      this._batScrub = {};
      const s = this._config;
      if (s) {
        this._houseOrder = this.houseOrder(s);
        this._houseMembers = this.memberOrder(s);
      }
    }

    closeHouseDetail(): void {
      this._houseDetail = false;
      this._pop = undefined;
      this._houseFrozen = undefined;
      this._houseOrder = undefined;
      this._houseMembers = undefined;
      this.updateComplete.then(() => this.scrollIntoView({ block: "nearest" }));
    }

    loadBattery(): void {
      super.loadBattery();
      this.loadHouse();
    }

    loadHouse(): void {
      const s = this._config;
      if (!s || !this.hass) return;
      const wantsToday = this._pop === "house" || this._pop === "car" || this._pop === "boil" || this._all || this._houseDetail;
      // The energy of the appliances is read only for the detail: a fetch made before it opened is not enough.
      if (wantsToday && (!this._houseToday || Date.now() - this._houseToday.at > REFRESH || (this._houseDetail && !this._houseToday.detail))) void this.fetchHouseToday(s);
      if (this._houseDetail && this._houseTab === "hist") {
        const range = this.houseRange(s);
        const key = `hist:${range}`;
        const entry = this._houseData[key];
        if (!entry || (entry.status !== "loading" && Date.now() - entry.at > REFRESH)) void this.fetchHouse(s, key, range, entry);
      }
      // The hours of today for the charts in the rows of the appliances and of the groups.
      if (this._houseDetail && this._houseTab === "now") {
        const day = this._houseData.day;
        if (!day || (day.status !== "loading" && Date.now() - day.at > REFRESH)) void this.fetchHouse(s, "day", "day", day);
      }
      // The cycles of the helpers: for the rows of the detail, for the popup and for the alert of an appliance that runs too long.
      const watching = this.popupItems(s).some((item) => item.warnAfter && item.running);
      if ((this._houseDetail && this._houseTab === "now") || this._pop === "house" || watching) {
        const cycles = this._houseCycles;
        if (!cycles || Date.now() - cycles.at > REFRESH) void this.fetchCycles(s);
      }
    }

    /** Energy of the car and of the boiler since midnight from the statistics of their power (5-minute means). */
    async fetchHouseToday(s: Settings): Promise<void> {
      const hass = this.hass;
      if (!hass) return;
      const at = Date.now();
      this._houseToday = { ...(this._houseToday ?? {}), at, detail: this._houseDetail };
      const ids = [s.entities.wallbox.power, s.entities.boiler.power].filter((id): id is string => !!id);
      const counters = this._houseDetail ? this.appliances(s).map((a) => a.energy).filter((id): id is string => !!id) : [];
      // The groups: the counter of each appliance, otherwise the mean of its power.
      const members = this._houseDetail ? s.groups.flatMap((g) => g.appliances) : [];
      const cookEnergy = members.map((c) => c.energy).filter((id): id is string => !!id);
      const cookPower = members.filter((c) => !c.energy).map((c) => c.power);
      if (!ids.length && !counters.length && !cookEnergy.length && !cookPower.length) return;
      try {
        const start = new Date(at);
        start.setHours(0, 0, 0, 0);
        const stats = await fetchStatistics(hass, [...ids, ...cookPower], start.getTime(), at, "5minute", ["mean"]);
        // The energy of the appliances since midnight: the sum of the 5-minute changes of their counters.
        const changes = counters.length || cookEnergy.length ? await fetchStatistics(hass, [...counters, ...cookEnergy], start.getTime(), at, "5minute", ["change"]) : {};
        const cook: Record<string, number> = {};
        for (const item of members) {
          if (item.energy) {
            const rows = changes[item.energy];
            if (hasValues(rows, "change")) cook[item.power] = rows!.reduce((sum, row) => sum + (typeof row.change === "number" ? row.change : 0), 0);
          } else {
            const rows = stats[item.power];
            if (hasValues(rows, "mean")) cook[item.power] = rows!.reduce((sum, row) => sum + (typeof row.mean === "number" ? row.mean : 0), 0) / 12 / 1000;
          }
        }
        const apps: Record<string, number> = {};
        for (const id of counters) {
          const rows = changes[id];
          if (hasValues(rows, "change")) apps[id] = rows!.reduce((sum, row) => sum + (typeof row.change === "number" ? row.change : 0), 0);
        }
        const kwh = (id: string | undefined) => {
          const rows = id ? stats[id] : undefined;
          return hasValues(rows, "mean") ? rows!.reduce((sum, row) => sum + (typeof row.mean === "number" ? row.mean : 0), 0) / 12 / 1000 : undefined;
        };
        this._houseToday = { at, car: kwh(s.entities.wallbox.power), boil: kwh(s.entities.boiler.power), apps, groups: cook, detail: this._houseDetail };
      } catch {
        this._houseToday = { at, detail: this._houseDetail };
      }
    }

    /** The first moment and the number of bins of the chart: today by hours from midnight to midnight, or whole days up to today (uživatel 9. 11. 2026, "Q8 ok": 1 den = od půlnoci). */
    houseWindow(range: Range | "day", at: number): { start: number; bins: number; step: number } {
      // "day" and "1d": the hours of today from midnight to midnight (also the charts in the rows of the appliances).
      if (range === "day" || range === "1d") {
        const midnight = new Date(at);
        midnight.setHours(0, 0, 0, 0);
        return { start: midnight.getTime(), bins: 24, step: HOUR };
      }
      return { ...this.histWindow(range, at), step: DAY };
    }

    async fetchHouse(s: Settings, key: string, range: Range | "day", previous: BatEntry | undefined): Promise<void> {
      const hass = this.hass;
      if (!hass) return;
      const at = Date.now();
      this._houseData = { ...this._houseData, [key]: { status: "loading", at, parts: previous?.parts ?? {} } };
      try {
        const w = this.houseWindow(range, at);
        const period: Period = range === "1d" || range === "day" ? "hour" : "day";
        const ids = (...list: Array<string | undefined>) => list.filter((id): id is string => !!id);
        const e = s.entities;
        // The running bin (the hour or the day that has not ended): the last one of the rolling windows, the current hour in "day".
        const lastStart = w.start + Math.min(w.bins - 1, Math.max(0, Math.floor((at - w.start) / w.step))) * w.step;
        const apps = this.listed(s);
        const members = s.groups.flatMap((g) => g.appliances);
        const own = range === "day";
        const counters = ids(...(own ? [] : [e.pv.total_generation, e.battery.total_discharge, e.battery.total_charge, e.grid.total_import, e.grid.total_export]), ...apps.map((a) => a.energy), ...members.map((m) => m.energy));
        const powers = ids(...(own ? [] : [e.wallbox.power, e.boiler.power]), ...apps.filter((a) => !a.energy).map((a) => a.power), ...members.filter((m) => !m.energy).map((m) => m.power));
        const [energy, power, nowCounters, nowPowers] = await Promise.all([
          fetchStatistics(hass, counters, w.start, at, period, ["change"]),
          fetchStatistics(hass, powers, w.start, at, period, ["mean"]),
          // The running bin (hour or day) has no row in the long-term statistics yet: the 5-minute rows fill it.
          fetchStatistics(hass, counters, lastStart, at, "5minute", ["change"]),
          fetchStatistics(hass, powers, lastStart, at, "5minute", ["mean"]),
        ]);
        this._houseData = { ...this._houseData, [key]: { status: "ready", at, parts: { energy, power, nowCounters, nowPowers } } };
      } catch {
        this._houseData = { ...this._houseData, [key]: { status: "error", at, parts: {} } };
      }
    }

    /** The cycles of the helpers: the moments the helper turned on and off (the states of the recorder). A gap (unavailable, e.g. a restart of Home Assistant) is not a change: a cycle that ran before it and is over after it ended when the gap began. */
    async fetchCycles(s: Settings): Promise<void> {
      const hass = this.hass;
      if (!hass) return;
      const at = Date.now();
      this._houseCycles = { at, byId: this._houseCycles?.byId ?? {} };
      const ids = [...this.appliances(s).map((a) => a.running), ...s.groups.flatMap((g) => g.appliances.map((m) => m.running))].filter((id, at, list): id is string => !!id && list.indexOf(id) === at);
      if (!ids.length) return;
      try {
        const result = await hass.callWS<Record<string, Array<{ s?: string; state?: string; lu?: number; last_updated?: number | string }>> | null>({
          type: "history/history_during_period",
          start_time: new Date(at - CYCLE_DAYS * DAY).toISOString(),
          end_time: new Date(at).toISOString(),
          entity_ids: ids,
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });
        const byId: Record<string, { starts: number[]; ends: number[] }> = {};
        for (const [id, list] of Object.entries(result ?? {})) {
          const starts: number[] = [];
          const ends: number[] = [];
          let known: string | undefined;
          let gap: number | undefined;
          for (const item of list) {
            const state = item.s ?? item.state;
            const raw = item.lu ?? item.last_updated;
            const time = typeof raw === "number" ? raw * 1000 : raw ? Date.parse(raw) : NaN;
            if (!Number.isFinite(time)) continue;
            if (state === undefined || state === "unavailable" || state === "unknown") {
              if (known !== undefined && gap === undefined) gap = time;
              continue;
            }
            if (known !== undefined && state !== known) {
              if (state === "on") starts.push(time);
              else if (state === "off") ends.push(known === "on" && gap !== undefined ? gap : time);
            }
            known = state;
            gap = undefined;
          }
          byId[id] = { starts, ends };
        }
        this._houseCycles = { at, byId };
      } catch {
        this._houseCycles = { at, byId: {} };
      }
    }

    // ----------------------------------------------------------------- the detail

    renderHouseDetail(s: Settings, model: FlowModel): TemplateResult {
      const t = this.t;
      const range = this.houseRange(s);
      const options = RANGES.map((value) => ({ value, label: t.bat.ranges[value] }));
      const tabs = ((["now", "hist"] as const)).map((value) => ({ value, label: t.house.tabs[value] }));
      // Every power on the page in watts (uživatel 4. 11. 2026: "Všechno stejně. Klidně W."), not kW for one row and W for the next.
      const unit: PowerUnit = "W";
      // What runs first, from the largest power, in the order decided when the detail opened (uživatel 9. 11. 2026, "Q9 ano zkusme"); the rest: the appliances by name, then the groups.
      const order = this._houseOrder ?? [];
      const entries = [
        ...this.listed(s).map((a) => ({ key: a.name, label: this.applianceName(a), group: false, render: () => this.renderApplianceRow(a, s, unit) })),
        ...s.groups.map((group, index) => ({ key: groupKey(index), label: "", group: true, render: () => this.renderGroupRow(group, index) })),
      ].sort((a, b) => {
        const ia = order.indexOf(a.key);
        const ib = order.indexOf(b.key);
        if (ia >= 0 || ib >= 0) return (ia < 0 ? 999 : ia) - (ib < 0 ? 999 : ib);
        return Number(a.group) - Number(b.group) || (a.group ? 0 : a.label.localeCompare(b.label));
      });
      const chart = this.houseChart(s, range);
      const entry = this._houseData[`hist:${range}`];
      const loading = entry?.status === "loading" && !Object.keys(entry.parts).length;
      return html`<section class="bat-detail house-detail" role="dialog" aria-modal="true" aria-label=${t.house.detailLabel} tabindex="-1">
        <div class="bat-nav">
          <button type="button" class="bat-link" @click=${() => this.closeHouseDetail()}>‹ ${t.house.back}</button>
          <h2>${t.house.title}</h2>
          <button type="button" class="bat-link end" @click=${() => this.closeHouseDetail()}>${t.house.done}</button>
        </div>
        <ed-segmented .options=${tabs} .value=${this._houseTab} label=${t.house.tabsLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => { this._houseTab = event.detail.value as "now" | "hist"; this._batScrub = {}; }}></ed-segmented>
        ${this._houseTab === "now"
          ? html`<div class="bat-card"><span class="bat-cap">${t.house.nowLabel}</span>
              <span class="house-hero">${model.other === undefined ? NO_DATA : formatPower(model.other, unit)}</span></div>
            <div class="house-list"><span class="bat-cap">${t.house.appliances}</span>
              ${entries.length ? entries.map((entry) => entry.render()) : html`<div class="bat-card"><span>${t.house.none}</span><span class="bat-sub">${this.labelDiagnostics(s)}</span></div>`}
            </div>`
          : html`<ed-segmented .options=${options} .value=${range} label=${t.house.rangeLabel} @hdk-select=${(event: CustomEvent<{ value: string }>) => this.setHouseRange(event.detail.value as Range)}></ed-segmented>
            <div class="bat-card"><span class="bat-cap">${joined([range === "1d" ? t.house.chartHours : t.house.chartDays, html`<span class="unit">kWh</span>`])}</span>
              ${chart ? this.renderChart(chart) : html`<div class="bat-nodata" style="aspect-ratio:${W} / 220">${loading ? NO_DATA : t.bat.noDataChart}</div>`}
            </div>`}
      </section>`;
    }

    /**
     * A group of appliances (house.groups): one row. Closed: the power now (the sum) and the energy of today; open: every appliance with its
     * power now and its energy of today. No cycles, no threshold: what the appliances draw is shown as it is. A sum counts only when every appliance is known.
     */
    renderGroupRow(group: GroupConfig, index: number): TemplateResult {
      const key = groupKey(index);
      const open = this._houseOpen.includes(key);
      const order = this._houseMembers?.[index] ?? [];
      const items = group.appliances
        .map((c) => ({ power: c.power, name: this.pickText(c.name) ?? "", watts: readNumber(this.hass, c.power), kwh: this._houseToday?.groups?.[c.power] }))
        .sort((a, b) => (order.indexOf(a.power) < 0 ? 999 : order.indexOf(a.power)) - (order.indexOf(b.power) < 0 ? 999 : order.indexOf(b.power)));
      const known = (list: Array<number | undefined>): number | undefined => (list.every((v) => v !== undefined) ? (list as number[]).reduce((sum, v) => sum + v, 0) : undefined);
      // Watts everywhere on the page: a small draw of a standby appliance is never rounded to 0,00 kW.
      const power = (watts: number | undefined) => (watts === undefined ? NO_DATA : formatPower(watts, "W").replace(" ", "\u00a0"));
      const energy = (kwh: number | undefined) => (kwh === undefined ? NO_DATA : `${formatKwh(kwh)}\u00a0kWh`);
      const t = this.t;
      return html`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${open ? "true" : "false"} @click=${() => { this._houseOpen = open ? this._houseOpen.filter((name) => name !== key) : [...this._houseOpen, key]; }}>
          <ha-icon class="house-icon" icon=${group.icon}></ha-icon>
          <span class="bat-col"><span class="bat-label">${this.pickText(group.name) ?? ""}</span><span class="bat-sub">${t.house.today} ${energy(known(items.map((i) => i.kwh)))}</span></span>
          <span class="bat-value">${power(known(items.map((i) => i.watts)))}</span>
          <svg class="chev ${open ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${open
          ? html`<div class="house-body">
            <div class="house-cook">
              <span class="house-cook-head"></span><span class="house-cook-head">${t.house.nowCol}</span><span class="house-cook-head">${t.house.totalCol}</span>
              ${items.map((i) => html`<span class="house-cook-name">${i.name}</span><b>${power(i.watts)}</b><b>${energy(i.kwh)}</b>`)}
            </div>
            ${this.renderDayChart(group.appliances.map((m, k) => ({ name: this.pickText(m.name) ?? "", energy: m.energy, power: m.power, color: APP_COLORS[k % APP_COLORS.length] })).sort((a, b) => (order.indexOf(a.power) < 0 ? 999 : order.indexOf(a.power)) - (order.indexOf(b.power) < 0 ? 999 : order.indexOf(b.power))))}
          </div>`
          : nothing}
      </div>`;
    }

    renderApplianceRow(a: Appliance, s: Settings, unit: PowerUnit): TemplateResult {
      const t = this.t;
      const open = this._houseOpen.includes(a.name);
      const watts = readNumber(this.hass, a.power);
      const on = this.applianceOn(a, s);
      const status = this.applianceStatus(a, s) ?? (on === false ? t.house.notRunning : NO_DATA);
      const drawing = watts !== undefined && isOn(watts, s.num.flows.idle_threshold);
      // A running cycle shows its power even when it is small (a pause of the programme); only a stopped appliance shows the symbol.
      const value = watts === undefined
        ? html`<span class="bat-value">${NO_DATA}</span>`
        : drawing ? html`<span class="bat-value">${formatPower(watts, unit)}</span>`
        : on ? html`<span class="bat-value">${formatNumber(watts)}\u00a0W</span>` : this.renderIdleMark();
      const times = this.cycleTimes(a, on);
      const kwh = this.cycleKwh(a);
      // Today = since midnight (uživatel 2. 11.), not the last 24 hours.
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      const known = a.running ? this._houseCycles?.byId[a.running] : undefined;
      const starts = known ? known.starts.filter((time) => time >= midnight.getTime()).length : undefined;
      const index = Math.max(0, this.listed(s).findIndex((item) => item.name === a.name));
      const color = APP_COLORS[index % APP_COLORS.length];
      // "Poslední cyklus: 12:49 – 14:27 · 0,84 kWh" (uživatel 2. 11.: bez délky); the day is written when it is not today.
      const range = (start: number, end: string) => `${this.stamp(start)}\u00a0–\u00a0${end}`;
      const last = a.running && times.start !== undefined
        ? html`<div class="house-line wrap"><span>${on ? t.house.currentCycle : t.house.lastCycle}</span><b>${joined([range(times.start, on ? t.house.axisTo : this.stamp(times.end ?? times.start, times.start)), ...(kwh !== undefined ? [`${formatKwh(kwh)}\u00a0kWh`] : [])])}</b></div>`
        : a.running && times.end !== undefined && !on
          ? html`<div class="house-line wrap"><span>${t.house.lastCycle}</span><b>${t.house.endedAt(this.stamp(times.end))}</b></div>`
          : nothing;
      const chart = this.renderDayChart([{ name: this.applianceName(a), energy: a.energy, power: a.power, color }]);
      const todayKwh = a.energy ? this._houseToday?.apps?.[a.energy] : undefined;
      const plug = a.plug ? readText(this.hass, a.plug) : undefined;
      const problem = a.problems.find((p) => readText(this.hass, p.id) === "on");
      const line = (label: string, text: string) => html`<div class="house-line"><span>${label}</span><b>${joinedText(text)}</b></div>`;
      return html`<div class="bat-card flush house-item">
        <button type="button" class="bat-row" aria-expanded=${open ? "true" : "false"} @click=${() => { this._houseOpen = open ? this._houseOpen.filter((name) => name !== a.name) : [...this._houseOpen, a.name]; }}>
          ${this.renderApplianceIcon(a)}
          <span class="bat-col"><span class="bat-label">${this.applianceName(a)}</span><span class="bat-sub">${joinedText(status)}</span></span>
          ${value}
          <svg class="chev ${open ? "open" : ""}" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>
        </button>
        ${open
          ? html`<div class="house-body">
              ${problem ? line(t.house.problem[problem.kind], "") : nothing}
              ${last}
              ${a.running && starts !== undefined ? line(t.house.today, t.house.cyclesCount(starts, todayKwh === undefined ? "" : formatKwh(todayKwh))) : nothing}
              ${chart}
              ${plug === "off" ? line(t.house.plug, t.house.plugOff) : nothing}
            </div>`
          : nothing}
      </div>`;
    }

    /** "Co se dělo": the consumption of the house (without the car and the boiler) in kWh per hour or per day, broken down by the appliances. */
    /** The energy per bin of the statistics of a view: from the counter (the running bin from its 5-minute rows), otherwise from the mean power. */
    houseSeries(entry: BatEntry, range: Range | "day") {
      const at = entry.at;
      const w = this.houseWindow(range, at);
      const n = w.bins;
      const end = w.start + n * w.step;
      const stepHours = w.step / HOUR;
      // The running bin: the last one of the rolling windows, the current hour of today.
      const cur = Math.min(n - 1, Math.max(0, Math.floor((at - w.start) / w.step)));
      const energy: Stats = entry.parts.energy ?? {};
      const power: Stats = entry.parts.power ?? {};
      const nowCounters: Stats = entry.parts.nowCounters ?? {};
      const nowPowers: Stats = entry.parts.nowPowers ?? {};
      const counter = (id: string | undefined): Array<number | undefined> | undefined => {
        if (!id || !hasValues(energy[id], "change")) return undefined;
        const values = bin(energy[id], "change", w.start, end, n, "sum");
        const last = nowCounters[id];
        if (hasValues(last, "change")) values[cur] = (last as StatRow[]).reduce((sum, row) => sum + (typeof row.change === "number" ? row.change : 0), 0);
        return values;
      };
      const meanKwh = (id: string | undefined): Array<number | undefined> | undefined => {
        if (!id || !hasValues(power[id], "mean")) return undefined;
        const values = bin(power[id], "mean", w.start, end, n, "mean").map((mean) => (mean === undefined ? undefined : (mean * stepHours) / 1000));
        const last = nowPowers[id];
        if (hasValues(last, "mean")) {
          const rows = last as StatRow[];
          const mean = rows.reduce((sum, row) => sum + (typeof row.mean === "number" ? row.mean : 0), 0) / rows.length;
          values[cur] = (mean * Math.min(stepHours, Math.max(0, (at - (w.start + cur * w.step)) / HOUR))) / 1000;
        }
        return values;
      };
      return { at, w, n, cur, counter, meanKwh };
    }

    /** The reading of a bar (and the legend at once): the moment and the total, then every part with its colour and its energy. */
    renderReading(title: string, total: number, label: string, rows: Array<{ name: string; kwh: number | undefined; color: string }>): TemplateResult {
      return html`<div class="house-panel" role="group" aria-label=${title}>
        <div class="house-panel-head"><span>${title}</span><b>${label}\u00a0${formatKwh(total)}\u00a0kWh</b></div>
        ${rows.map((row) => html`<div class="house-panel-row"><i style="background:${row.color}"></i><span>${row.name}</span><b>${row.kwh === undefined ? NO_DATA : `${formatKwh(row.kwh)}\u00a0kWh`}</b></div>`)}
      </div>`;
    }

    /**
     * A small trend of today by hours (from midnight to midnight) in the row of an appliance (one colour) or of a group (the appliances
     * of the group stacked, a legend names them): when it was cooking, when it was washing. No axis of values, no reading. Without statistics nothing.
     */
    renderDayChart(parts: Array<{ name: string; energy?: string; power: string; color: string }>): TemplateResult | typeof nothing {
      const t = this.t;
      const entry = this._houseData.day;
      if (!entry || entry.status === "error" || !Object.keys(entry.parts).length) return nothing;
      const { n, counter, meanKwh } = this.houseSeries(entry, "day");
      const items = parts
        .map((part) => ({ ...part, list: part.energy ? counter(part.energy) : meanKwh(part.power) }))
        .filter((item) => item.list && item.list.some((value) => typeof value === "number"));
      if (!items.length) return nothing;
      const val = (list: Array<number | undefined> | undefined, i: number) => list?.[i] ?? 0;
      let peak = 0;
      for (let i = 0; i < n; i++) peak = Math.max(peak, items.reduce((sum, item) => sum + val(item.list, i), 0));
      const h = 44;
      const base = 42;
      // The top line stands for a round value (the label), the bars use the scale below it.
      const top = peak > 0 ? niceCeil(peak) : 0;
      const scale = top > 0 ? 36 / top : 0;
      // The guide lines of the day by 3 hours (8 parts), the top and the bottom line of the bars (chart-grid.ts).
      const midnight = new Date();
      midnight.setHours(0, 0, 0, 0);
      const ticks = timeTicks({ start: midnight.getTime(), end: midnight.getTime() + 24 * HOUR });
      const slot = W / n;
      const barW = slot * 0.72;
      const bars = Array.from({ length: n }, (_, i) => {
        let offset = 0;
        return items.map((item) => {
          const value = val(item.list, i);
          if (value <= 0) return nothing;
          const height = Math.max(1.5, value * scale);
          const y = base - offset - height;
          offset += height + 1;
          return svg`<rect x=${(i * slot + (slot - barW) / 2).toFixed(1)} y=${y.toFixed(1)} width=${barW.toFixed(1)} height=${height.toFixed(1)} style="fill:${item.color}"></rect>`;
        });
      });
      return html`<div class="house-micro">
        <span class="house-micro-cap">${joined([t.house.chartToday, html`<span class="unit">kWh</span>`])}</span>
        <svg viewBox="0 0 ${W + GUTTER} ${h}" role="img" aria-label=${t.house.chartToday}>
          ${ticks.map((tick) => svg`<line x1=${tick.x} y1="0" x2=${tick.x} y2=${base} style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>`)}
          <line x1="0" y1="6" x2=${W} y2="6" style="stroke:var(--ed-tick);stroke-width:1;opacity:0.7"></line>
          <line x1="0" y1=${base} x2=${W} y2=${base} style="stroke:var(--ed-tick);stroke-width:1.5"></line>
          ${bars}
          <text x=${W + 9} y="10" style="fill:var(--ed-secondary)" font-size="12">${top > 0 ? formatNumber(top, top % 1 ? 1 : 0) : ""}</text>
        </svg>
        <div class="bat-axis ticks" aria-hidden="true">${ticks.map((tick) => html`<span style="left:${((tick.x / (W + GUTTER)) * 100).toFixed(1)}%;transform:translateX(${tick.x < 8 ? "0" : tick.x > W - 8 ? "-100%" : "-50%"})">${tick.text}</span>`)}</div>
        ${items.length > 1 ? html`<div class="house-micro-legend">${items.map((item) => html`<span><i style="background:${item.color}"></i>${item.name}</span>`)}</div>` : nothing}
      </div>`;
    }

    houseChart(s: Settings, range: Range): Chart | undefined {
      const t = this.t;
      const entry = this._houseData[`hist:${range}`];
      if (!entry || entry.status === "error" || !Object.keys(entry.parts).length) return undefined;
      const e = s.entities;
      const { w, n, counter, meanKwh } = this.houseSeries(entry, range);
      const pv = counter(e.pv.total_generation);
      const bdis = counter(e.battery.total_discharge);
      const bchg = counter(e.battery.total_charge);
      const gin = counter(e.grid.total_import);
      const gout = counter(e.grid.total_export);
      const car = meanKwh(e.wallbox.power);
      const boil = meanKwh(e.boiler.power);
      if (!pv && !bdis && !bchg && !gin && !gout) return undefined;
      const val = (list: Array<number | undefined> | undefined, i: number) => list?.[i] ?? 0;
      const totalOnly = !car || !boil;
      const house = Array.from({ length: n }, (_, i) => Math.max(0, val(pv, i) + val(bdis, i) + val(gin, i) - val(bchg, i) - val(gout, i) - val(car, i) - val(boil, i)));
      // The appliances and the groups: the counter of the energy, otherwise the mean power (a group is the sum of its appliances).
      // A fixed palette (uživatel 2. 11., nine hues since 9. 11.): the same weight, readable on the dark and the light surface (3 : 1); the colour of an appliance is the same in its row.
      // The history shows the data that exists, like the detail of the battery (uživatel 9. 11. 2026, "Q20 udělej stejně jako baterie"): the sum of a group is the sum of the appliances
      // that have a value in the bin, an appliance without data is left out and nothing is made up; a bin that none of them has stays empty ("––" in the reading).
      const sumLists = (lists: Array<Array<number | undefined> | undefined>): Array<number | undefined> | undefined => {
        const have = lists.filter((list): list is Array<number | undefined> => !!list);
        return have.length ? Array.from({ length: n }, (_, i) => (have.every((list) => list[i] === undefined) ? undefined : have.reduce((sum, list) => sum + (list[i] ?? 0), 0))) : undefined;
      };
      const items = [
        ...this.listed(s).map((a) => ({ name: this.applianceName(a), list: a.energy ? counter(a.energy) : meanKwh(a.power) })),
        ...s.groups.map((g) => ({ name: this.pickText(g.name) ?? "", list: sumLists(g.appliances.map((m) => (m.energy ? counter(m.energy) : meanKwh(m.power)))) })),
      ]
        .map((item, k) => ({ ...item, color: APP_COLORS[k % APP_COLORS.length] }))
        .filter((item) => item.list && item.list.some((value) => typeof value === "number"));
      const total = (i: number) => Math.max(house[i], items.reduce((sum, item) => sum + val(item.list, i), 0));
      let peak = 0;
      for (let i = 0; i < n; i++) peak = Math.max(peak, total(i));
      if (peak <= 0) return undefined;
      const max = niceCeil(peak);
      const h = 220;
      const base = 200;
      const scale = 180 / max;
      // The labels of the axis stand in the strip to the right of the plot (chart-grid.ts, GUTTER).
      const lead = 0;
      const barW = Math.min(18, ((W - lead) / n) * 0.72);
      const x = (i: number) => lead + ((i + 0.5) / n) * (W - lead);
      // The parts of a bar are square and divided by a straight line (uživatel 2. 11.).
      const bars = Array.from({ length: n }, (_, i) => {
        let offset = 0;
        const used = items.reduce((sum, item) => sum + val(item.list, i), 0);
        const parts = [...items.map((item) => ({ value: val(item.list, i), color: item.color })), { value: Math.max(0, house[i] - used), color: "#8E8E93" }];
        return parts.map((part) => {
          if (part.value <= 0) return nothing;
          const height = Math.max(0.6, part.value * scale);
          const y = base - offset - height;
          offset += height + 1;
          return svg`<rect x=${(x(i) - barW / 2).toFixed(1)} y=${y.toFixed(1)} width=${barW.toFixed(1)} height=${height.toFixed(1)} style="fill:${part.color}"></rect>`;
        });
      });
      const date = (i: number) => {
        const time = w.start + i * w.step;
        return range === "1d" ? `${formatDayName(time)} ${formatClock(time)}–${formatClock(time + HOUR)}` : formatDayName(time);
      };
      const whole = (i: number) => Math.max(house[i], items.reduce((sum, item) => sum + val(item.list, i), 0));
      const sumLabel = totalOnly ? t.house.houseTotal : t.house.sum;
      const read = (i: number) => `${date(i)} · ${sumLabel} ${formatKwh(whole(i))} kWh`;
      // The reading of the selected bar (and the legend at once): the moment and the total, then every part with its colour and its energy.
      const panel = (i: number): TemplateResult => {
        const all = whole(i);
        const used = items.reduce((sum, item) => sum + val(item.list, i), 0);
        const rows = items.length
          ? [...items.map((item) => ({ name: item.name, kwh: item.list?.[i], color: item.color })).sort((p, q) => (q.kwh ?? -1) - (p.kwh ?? -1)), { name: t.house.houseRest, kwh: Math.max(0, all - used), color: "#8E8E93" }]
          : [];
        return this.renderReading(date(i), all, sumLabel, rows);
      };
      // Until a bar is picked the panel reads the whole period (Dnes, 7 or 30 days): the parts from the largest energy, the "Top dnes" (uživatel 9. 11. 2026, "Q8 ok").
      const bins = Array.from({ length: n }, (_, i) => i);
      const parts = items
        .map((item) => ({ name: item.name, kwh: bins.reduce((sum, i) => sum + val(item.list, i), 0), color: item.color }))
        .sort((p, q) => q.kwh - p.kwh);
      const used = parts.reduce((sum, part) => sum + part.kwh, 0);
      // One definition of "Dnes" (uživatel 9. 11. 2026, "Q15 ano"): the number of the popup, "Dnes spotřebováno", when it is known; never less than the parts.
      const popupToday = range === "1d" ? this.today(s).house : undefined;
      const periodAll = Math.max(popupToday ?? bins.reduce((sum, i) => sum + whole(i), 0), used);
      const period = (): TemplateResult => this.renderReading(periodTitle, periodAll, sumLabel, items.length ? [...parts, { name: t.house.houseRest, kwh: Math.max(0, periodAll - used), color: "#8E8E93" }] : []);
      const periodTitle = range === "1d" ? t.house.today : t.bat.ranges[range];
      const periodText = (): string => `${periodTitle} · ${sumLabel} ${formatKwh(periodAll)} kWh`;
      const missing = [pv, bdis, bchg, gin, gout].some((list) => list && list[0] === undefined);
      return {
        id: `house-${range}`,
        h,
        // The top line is the value `max` exactly (the bars are drawn on the scale of 180 above the base).
        grid: [{ y: base - 180 }, { y: base, strong: true }],
        labels: [{ y: base - 180, text: `${max}` }, { y: base, text: "0" }],
        time: { start: w.start, end: w.start + n * w.step, x0: lead, x1: W, slot: w.step },
        valueNum: (y) => ((base - y) / 180) * max,
        valueAt: (y) => { const v = ((base - y) / 180) * max; return v % 1 ? formatKwh(v) : formatNumber(v); },
        body: svg`${bars}`,
        n,
        x,
        read,
        from: missing ? t.house.dataFrom(formatDayName(w.start)) : t.house.axisFrom[range],
        to: t.house.axisTo,
        fade: 0,
        panel,
        whole: period,
        wholeText: periodText(),
      };
    }
  };

export type Housed = InstanceType<ReturnType<typeof withHouse>>;
