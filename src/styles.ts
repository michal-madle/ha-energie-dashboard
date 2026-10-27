import { css } from "lit";

/*
 * Home Assistant look (CURRENT_SPEC.md, Vzhled): ha-card, the theme's colours, font and radius.
 * Only the colours of the energy sources are the card's own (--ed-…); the sliders and choices
 * are styled in ed-slider.ts and ed-segmented.ts.
 */
export const styles = css`
  :host {
    display: block;
    color: var(--primary-text-color);
    --ed-sun: #ffd60a;
    --ed-bat: #30d158;
    --ed-grid: #3d8bff;
    --ed-home: #bf5af2;
    --ed-car: #40d0e6;
    --ed-boil: #ff6f59;
    --ed-bg: var(--ha-card-background, var(--card-background-color, #fff));
    --ed-radius: var(--ha-card-border-radius, 12px);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", Inter, Roboto, sans-serif;
    font-feature-settings: "tnum" 1, "cv11" 1;
    -webkit-font-smoothing: antialiased;
  }

  ha-card {
    display: block;
    overflow: hidden;
  }

  .dashboard {
    display: grid;
    gap: 12px;
    min-width: 0;
    padding: 16px;
  }

  .header h1 {
    margin: 0;
    font-size: var(--ha-card-header-font-size, 24px);
    font-weight: 500;
    line-height: 32px;
  }

  .summary {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 2px 0 0;
    color: var(--sc);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  /* Light theme: the source colour darkened, so the text keeps 4.5 : 1 on white. */
  :host([data-light]) .summary {
    color: color-mix(in srgb, var(--sc) 40%, var(--primary-text-color));
  }

  .summary .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--sc);
  }

  .notice {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: var(--ed-radius);
    background: var(--secondary-background-color);
    font-size: 14px;
    line-height: 20px;
  }

  .notice.warn {
    background: color-mix(in srgb, var(--warning-color, #ff9800) 18%, var(--ed-bg));
  }

  /* ------------------------------------------------------------- Sankey */
  .flow {
    position: relative;
    width: 100%;
  }

  .flow > svg {
    position: absolute;
    inset: 0 auto auto 0;
    overflow: visible;
    pointer-events: none;
  }

  .dots {
    fill: none;
    stroke: rgb(255 255 255 / 90%);
    stroke-linecap: round;
    stroke-dasharray: 0.1 13.9;
    animation: flow linear infinite;
  }

  @keyframes flow {
    to {
      stroke-dashoffset: -14;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dots {
      animation: none;
    }
  }

  /* Glass tiles of the approved design (blur, specular highlight, tint by the source). */
  .tile {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 0 8px;
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 20%, transparent);
    border-radius: 16px;
    background: linear-gradient(155deg, color-mix(in srgb, var(--primary-text-color) 12%, transparent), color-mix(in srgb, var(--primary-text-color) 3%, transparent));
    color: var(--primary-text-color);
    font: inherit;
    text-align: left;
    cursor: pointer;
    -webkit-backdrop-filter: blur(18px) saturate(1.8);
    backdrop-filter: blur(18px) saturate(1.8);
    box-shadow:
      inset 0 1px 0 rgb(255 255 255 / 30%),
      0 6px 16px rgb(0 0 0 / 22%);
  }

  .tile::before {
    content: "";
    position: absolute;
    left: 10%;
    right: 10%;
    top: 2px;
    height: 34%;
    border-radius: 999px;
    background: linear-gradient(180deg, rgb(255 255 255 / 20%), rgb(255 255 255 / 0%));
    pointer-events: none;
  }

  .tile.on {
    border-color: color-mix(in srgb, var(--tc) 55%, transparent);
    background: linear-gradient(155deg, color-mix(in srgb, var(--tc) calc(var(--tint) + 8%), transparent), color-mix(in srgb, var(--tc) calc(var(--tint) - 14%), transparent));
  }

  .tile.house.on {
    background: var(--house-bg, linear-gradient(155deg, color-mix(in srgb, var(--tc) var(--tint), transparent), transparent));
  }

  .tile:focus-visible {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }

  .icon {
    position: relative;
    flex: none;
    width: 24px;
    height: 24px;
    fill: var(--secondary-text-color);
  }

  .tile.on .icon {
    fill: var(--tc);
    filter: drop-shadow(0 0 var(--gr) color-mix(in srgb, var(--tc) var(--ga), transparent));
  }

  .tile.on .icon2 {
    fill: var(--tc);
  }

  .tile.house.on .icon {
    fill: var(--primary-text-color);
    filter: none;
  }

  .n-icon {
    flex: none;
    width: 22px;
    height: 22px;
    fill: var(--secondary-text-color);
  }

  .notice.warn .n-icon {
    fill: var(--warning-color, #ff9800);
  }

  .text {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .name {
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
  }

  .value {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .tile.idle .value {
    color: var(--secondary-text-color);
    font-size: 12px;
    font-weight: 400;
  }

  /* ------------------------------------------------------------- gauges */
  .gauges {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .gauge {
    box-sizing: border-box;
    min-width: 0;
    padding: 8px 10px 10px;
    border: 1px solid color-mix(in srgb, var(--primary-text-color) 14%, transparent);
    border-radius: 16px;
    background: linear-gradient(180deg, color-mix(in srgb, var(--primary-text-color) 9%, transparent), color-mix(in srgb, var(--primary-text-color) 3%, transparent));
    box-shadow: inset 0 1px 0 rgb(255 255 255 / 20%);
  }

  .g-label {
    color: var(--secondary-text-color);
    font-size: 12px;
    line-height: 15px;
    white-space: nowrap;
  }

  .g-value {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bar {
    position: relative;
    height: 5px;
    margin-top: 6px;
    border-radius: 3px;
    background: color-mix(in srgb, var(--primary-text-color) 14%, transparent);
  }

  .bar .fill {
    height: 100%;
    border-radius: 3px;
  }

  .bar .tick {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 2px;
    margin-left: -1px;
    border-radius: 1px;
    background: var(--primary-text-color);
    opacity: 0.8;
  }

  /* ----------------------------------------------------------- controls */
  .controls {
    display: grid;
    gap: 16px;
    padding-top: 4px;
    border-top: 1px solid var(--divider-color);
  }

  .controls h2 {
    margin: 12px 0 0;
    color: var(--secondary-text-color);
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
  }

  .ctl {
    display: grid;
    gap: 12px;
  }

  .ctl-head,
  .slider-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    column-gap: 12px;
  }

  .ctl-title {
    font-size: 16px;
    line-height: 22px;
  }

  .ctl-state,
  .hint {
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 18px;
  }

  .slider-row ed-slider,
  .slider-row .fold {
    grid-column: 1 / -1;
  }

  .slider-label {
    font-size: 15px;
    line-height: 20px;
  }

  .slider-value {
    font-size: 22px;
    font-weight: 500;
    line-height: 28px;
    font-variant-numeric: tabular-nums;
  }

  .slider-value.dim {
    color: var(--secondary-text-color);
  }

  .fold {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows 0.28s ease,
      visibility 0s linear 0.28s;
  }

  .fold.open {
    grid-template-rows: 1fr;
    visibility: visible;
    transition-delay: 0s;
  }

  .fold > div {
    min-height: 0;
    overflow: hidden;
  }

  @media (prefers-reduced-motion: reduce) {
    .fold {
      transition: none;
    }
  }

  .switch-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 48px;
  }

  .switch-text {
    display: flex;
    flex-direction: column;
    font-size: 16px;
    line-height: 22px;
  }

  .feedback {
    margin: 0;
    min-height: 18px;
    color: var(--secondary-text-color);
    font-size: 13px;
    line-height: 18px;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;
