import { css } from "lit";

/*
 * Look of the card (CURRENT_SPEC.md, Vzhled podle Apple HIG): the card draws its own surfaces,
 * independent of the Home Assistant theme; it only follows its dark / light mode. Dark is the
 * default, `:host([data-light])` is the light set. The colours of the sources and the accent come
 * from the card configuration (set as --ed-sun … on the root element in the component).
 */
export const styles = css`
  :host {
    display: block;
    --ed-card: #1c1c1e;
    --ed-tile: #2c2c2e;
    --ed-track: #2c2c2e;
    --ed-text: #ffffff;
    --ed-secondary: #98989f;
    --ed-off: #8e8e93;
    --ed-sep: rgb(84 84 88 / 65%);
    --ed-bar: rgb(255 255 255 / 14%);
    --ed-tick: rgb(255 255 255 / 28%);
    --ed-switch-off: rgb(120 120 128 / 36%);
    --ed-seg-thumb: #ffffff;
    --ed-seg-text: #ebebf5;
    --ed-seg-selected: #000000;
    --ed-btn: rgb(118 118 128 / 24%);
    --ed-badge: rgb(255 255 255 / 8%);
    color: var(--ed-text);
    font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", Inter, Roboto, "Helvetica Neue", sans-serif;
    font-feature-settings: "tnum" 1;
    -webkit-font-smoothing: antialiased;
  }

  :host([data-light]) {
    --ed-card: #ffffff;
    --ed-tile: #f2f2f7;
    --ed-track: #f2f2f7;
    --ed-text: #000000;
    --ed-secondary: #5f5f66;
    --ed-off: #8e8e93;
    --ed-sep: rgb(60 60 67 / 29%);
    --ed-bar: rgb(60 60 67 / 18%);
    --ed-tick: rgb(60 60 67 / 30%);
    --ed-switch-off: rgb(120 120 128 / 32%);
    --ed-seg-text: #000000;
    --ed-badge: rgb(60 60 67 / 8%);
  }

  .page {
    display: grid;
    gap: 12px;
    min-width: 0;
  }

  h1,
  h2,
  p {
    margin: 0;
  }

  h1 {
    padding: 4px 4px 0;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
  }

  .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    box-sizing: border-box;
    padding: 16px 16px 12px;
    border-radius: 12px;
    background: var(--ed-card);
    overflow: hidden;
  }

  .panel h2 {
    font-size: 22px;
    font-weight: 700;
    line-height: 28px;
  }

  .head {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  /* The state line under a heading: a dot and a sentence in the colour of the energy source. */
  .state {
    display: flex;
    align-items: center;
    gap: 6px;
    color: var(--sc, var(--ed-secondary));
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  :host([data-light]) .state {
    color: color-mix(in srgb, var(--sc, var(--ed-secondary)) 45%, #000);
  }

  .state .dot {
    flex: none;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: var(--sc, var(--ed-secondary));
  }

  /* ------------------------------------------------------------ Sankey */
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

  .tile {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    border: 0;
    border-radius: 12px;
    background: var(--ed-tile);
    color: var(--ed-text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .tile.on {
    background: color-mix(in srgb, var(--tc) var(--tint), var(--ed-tile));
  }

  .tile:focus-visible,
  .row-btn:focus-visible,
  .btn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: 2px;
  }

  .tile .icon {
    flex: none;
    width: 26px;
    height: 26px;
    fill: var(--ed-off);
  }

  .tile.on .icon,
  .tile.on .icon2 {
    fill: var(--tc);
  }

  .tile.on .icon {
    filter: drop-shadow(0 0 var(--gr) color-mix(in srgb, var(--tc) var(--ga), transparent));
  }

  .tile .text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .tile .name {
    color: var(--ed-secondary);
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    white-space: nowrap;
  }

  /* On a tinted tile the secondary grey is too faint (4.5 : 1): the name takes the text colour. */
  .tile.on .name {
    color: color-mix(in srgb, var(--ed-text) 82%, transparent);
  }

  .tile .value {
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .tile.idle .value {
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 400;
  }

  /* ------------------------------------------------------------ gauges */
  .gauges {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
    margin-top: 4px;
  }

  .gauge {
    box-sizing: border-box;
    min-width: 0;
    padding: 8px 10px 10px;
    border-radius: 12px;
    background: var(--ed-tile);
  }

  .g-label {
    color: var(--ed-secondary);
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    white-space: nowrap;
  }

  .g-value {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    letter-spacing: -0.01em;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .bar {
    position: relative;
    height: 5px;
    margin-top: 6px;
    border-radius: 3px;
    background: var(--ed-bar);
  }

  .bar .fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 3px;
  }

  .bar .tick {
    position: absolute;
    top: -2px;
    bottom: -2px;
    width: 2px;
    margin-left: -1px;
    border-radius: 1px;
    background: var(--ed-text);
    opacity: 0.8;
  }

  /* --------------------------------------------------------------- car */
  .car-top {
    position: relative;
    height: 148px;
  }

  .car-art {
    position: absolute;
    right: -4px;
    bottom: 0;
    width: 236px;
    height: 132px;
    pointer-events: none;
  }

  .car-art .glow {
    position: absolute;
    inset: auto 6px 2px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(closest-side, var(--glow), transparent);
  }

  .car-art .shadow {
    position: absolute;
    inset: auto 14px 9px 22px;
    height: 8px;
    border-radius: 50%;
    background: radial-gradient(closest-side, rgb(0 0 0 / 65%), transparent);
  }

  .car-art img {
    position: absolute;
    right: 8px;
    bottom: 10px;
    display: block;
    width: 168px;
    max-height: 100px;
    object-fit: contain;
    filter: drop-shadow(0 6px 10px rgb(0 0 0 / 45%));
  }

  .car-soc {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
  }

  .soc {
    font-size: 52px;
    font-weight: 400;
    line-height: 54px;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }

  .soc small {
    color: var(--ed-secondary);
    font-size: 20px;
  }

  .range {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
  }

  .range b {
    color: var(--ed-text);
    font-weight: 500;
  }

  .meter {
    position: relative;
    height: 34px;
    border-radius: 12px;
    background: var(--ed-tile);
    overflow: hidden;
  }

  .meter .fill {
    position: absolute;
    inset: 0 auto 0 0;
    border-radius: 12px;
    background: var(--ed-car);
  }

  .meter .ticks {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(90deg, transparent 0, transparent calc(10% - 1px), rgb(0 0 0 / 28%) calc(10% - 1px), rgb(0 0 0 / 28%) 10%);
  }

  .meter .limit {
    position: absolute;
    top: 0;
    bottom: 0;
    border-left: 2px solid var(--ed-text);
    opacity: 0.8;
  }

  .meter-label {
    position: relative;
    height: 16px;
    margin-top: 4px;
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 16px;
  }

  .meter-label span {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  .notice {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 12px;
    background: var(--ed-tile);
    font-size: 15px;
    line-height: 20px;
  }

  .notice.warn {
    background: color-mix(in srgb, var(--ed-warning) 16%, var(--ed-card));
  }

  .notice svg {
    flex: none;
    width: 20px;
    height: 20px;
    margin-top: 1px;
    fill: var(--ed-secondary);
  }

  .notice.warn svg {
    fill: var(--ed-warning);
  }

  .mix {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mix-head {
    display: flex;
    justify-content: space-between;
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
  }

  .mix-bar {
    display: flex;
    gap: 3px;
    height: 20px;
    border-radius: 7px;
    overflow: hidden;
  }

  .mix-legend {
    display: flex;
    flex-wrap: wrap;
    gap: 2px 12px;
    font-size: 13px;
    line-height: 20px;
  }

  .mix-legend span {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .mix-legend i {
    width: 10px;
    height: 10px;
    border-radius: 3px;
  }

  .mix-legend em {
    color: var(--ed-secondary);
    font-style: normal;
    font-variant-numeric: tabular-nums;
  }

  /* --------------------------------------------------------- hot water */
  .water {
    display: grid;
    grid-template-columns: 96px minmax(0, 1fr) 96px;
    align-items: start;
    padding-top: 6px;
  }

  .tank-col {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .tank {
    position: relative;
    width: 96px;
    height: 132px;
    box-sizing: border-box;
    border-radius: 20px;
    background: var(--ed-tile);
    overflow: hidden;
  }

  .tank-water {
    position: absolute;
    inset: auto 0 0;
    border-top: 2px solid transparent;
  }

  .tank-target {
    position: absolute;
    inset: 0 0 auto;
    border-top: 1px dashed var(--ed-text);
    opacity: 0.5;
  }

  .tank-temp {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
  }

  .tank-temp.top {
    align-items: flex-start;
    padding-top: 14px;
  }

  .tank-temp small {
    padding-top: 6px;
    color: color-mix(in srgb, var(--ed-text) 82%, transparent);
    font-size: 17px;
  }

  .tank-caption {
    width: 120px;
    margin: 0 -12px;
    text-align: center;
    white-space: nowrap;
  }

  .tank-caption b {
    display: block;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  .tank-caption span {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .tank-caption span.src {
    color: var(--c);
  }

  :host([data-light]) .tank-caption span.src {
    color: color-mix(in srgb, var(--c) 45%, #000);
  }

  .mixing {
    display: block;
    width: 100%;
    height: 132px;
  }

  .mixing text {
    font-family: inherit;
    fill: var(--ed-secondary);
  }

  /* ------------------------------------------------------------- lists */
  .group {
    margin: 0;
    padding: 2px 12px;
    list-style: none;
    border-radius: 12px;
    background: var(--ed-tile);
  }

  .group > li + li {
    border-top: 1px solid var(--ed-sep);
  }

  .row {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    box-sizing: border-box;
    width: 100%;
    min-height: 60px;
    padding: 0;
    border: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .row-btn {
    cursor: pointer;
  }

  .badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: color-mix(in srgb, var(--bc, transparent) 16%, var(--ed-badge));
  }

  .badge svg {
    width: 24px;
    height: 24px;
    fill: var(--bc, var(--ed-off));
  }

  .row-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .row-title {
    font-size: 17px;
    font-weight: 500;
    line-height: 21px;
  }

  .row-sub {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .row-sub b {
    color: var(--c, var(--ed-text));
    font-weight: 500;
  }

  .row-sub.accent {
    color: var(--c);
  }

  :host([data-light]) .row-sub.accent,
  :host([data-light]) .row-sub b {
    color: color-mix(in srgb, var(--c, var(--ed-text)) 45%, #000);
  }

  .row-aside {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
    text-align: right;
  }

  .chevron {
    width: 16px;
    height: 16px;
    fill: var(--ed-off);
    transition: transform 0.28s ease;
  }

  .open .chevron {
    transform: rotate(90deg);
  }

  /* Detail of a row: grows open under the row, inside the same group. */
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
    .fold,
    .chevron {
      transition: none;
    }
  }

  .detail {
    display: grid;
    gap: 14px;
    padding: 4px 0 14px;
  }

  .field {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: baseline;
    column-gap: 12px;
  }

  .field ed-slider {
    grid-column: 1 / -1;
    margin-top: 6px;
  }

  .field-label {
    font-size: 15px;
    line-height: 20px;
  }

  .field-value {
    font-size: 22px;
    font-weight: 500;
    line-height: 28px;
    font-variant-numeric: tabular-nums;
  }

  .field-value.dim {
    color: var(--ed-secondary);
  }

  .hint {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
  }

  .switch-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    gap: 12px;
    min-height: 56px;
  }

  .switch-text {
    display: flex;
    flex-direction: column;
  }

  .switch-title {
    font-size: 17px;
    line-height: 22px;
  }

  .confirm {
    display: grid;
    gap: 10px;
    padding: 12px;
    border-radius: 12px;
    background: var(--ed-card);
    font-size: 15px;
    line-height: 20px;
  }

  .confirm .buttons {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .btn {
    min-height: 44px;
    padding: 0 16px;
    border: 0;
    border-radius: 999px;
    background: var(--ed-btn);
    color: var(--ed-text);
    font: inherit;
    font-size: 17px;
    cursor: pointer;
  }

  .btn.primary {
    background: var(--ed-button);
    color: #fff;
    font-weight: 600;
  }

  .feedback {
    min-height: 18px;
    padding: 0 4px;
    color: var(--ed-secondary);
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
