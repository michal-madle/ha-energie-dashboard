import { html, nothing } from "lit";
import type { TemplateResult } from "lit";
import { buildModel } from "./model";
import { styles } from "./styles";
import { CardBase } from "./base";
import { withControls } from "./controls";
import { withBattery } from "./battery";
import { withSun } from "./sun";
import { withElectricity } from "./electricity";
import { withCar } from "./car";
import { withWater } from "./water";

/*
 * Energie card in the look of Apple's HIG (CURRENT_SPEC.md): alerts on top, then three panels —
 * Elektřina (Sankey diagram of the flows with the level in the tiles, popups with today's totals),
 * the car with the wallbox, hot water (two arc gauges, mixing). Every limit, threshold, scale and
 * colour comes from the configuration (config.ts).
 */
export class HaEnergieDashboard extends withWater(withCar(withElectricity(withSun(withBattery(withControls(CardBase)))))) {
  static styles = styles;

  // ----------------------------------------------------------------- render

  render(): TemplateResult | typeof nothing {
    const s = this._config;
    if (!s) return nothing;
    const model = buildModel(this.hass, s, this.t);
    const c = s.colors;
    const vars = `--ed-sun:${c.sun};--ed-battery:${c.battery};--ed-grid:${c.grid};--ed-house:${c.house};--ed-car:${c.car};--ed-boiler:${c.boiler};--ed-discharge:${c.discharge};--ed-accent:${c.accent};--ed-warning:${c.warning};--ed-off:${c.neutral}`;
    // The battery detail is a page of its own inside the card (CURRENT_SPEC.md, Baterie).
    if (this._batDetail) return html`<div class="page" style=${vars} @keydown=${this.onKey}>${this.renderBatteryDetail(s, model)}</div>`;
    if (this._sunDetail) return html`<div class="page" style=${vars} @keydown=${this.onKey}>${this.renderSunDetail(s, model)}</div>`;
    return html`<div class="page" style=${vars} @keydown=${this.onKey}>
      ${s.title === "" ? nothing : html`<h1>${s.title ?? this.t.title}</h1>`} ${this.renderAlerts(s, model)} ${this.renderElectricity(s, model)} ${this.renderCar(s, model)}
      ${this.renderWater(s, model)}
      <p class="feedback" aria-live="polite">${this._feedback}</p>
    </div>`;
  }
}
