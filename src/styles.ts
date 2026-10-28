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
    --ed-fill-idle: rgb(255 255 255 / 17%);
    --ed-gauge-track: rgb(255 255 255 / 14%);
    --ed-track-compact: #3a3a3c;
    --ed-pop: #3a3a3c;
    --ed-pop-sec: #c7c7cc;
    --ed-pop-line: rgb(255 255 255 / 14%);
    --ed-pop-shadow: rgb(0 0 0 / 55%);
    --ed-bubble: #3a3a3c;
    --ed-bubble-text: #ffffff;
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
    --ed-fill-idle: rgb(60 60 67 / 16%);
    --ed-gauge-track: rgb(60 60 67 / 16%);
    --ed-track-compact: #e5e5ea;
    --ed-pop: #ffffff;
    --ed-pop-sec: #5f5f66;
    --ed-pop-line: rgb(60 60 67 / 18%);
    --ed-pop-shadow: rgb(0 0 0 / 22%);
    --ed-bubble: #1c1c1e;
    --ed-bubble-text: #ffffff;
  }

  .page {
    display: grid;
    gap: 12px;
    min-width: 0;
  }

  h1,
  h2,
  h3,
  p,
  ul {
    margin: 0;
  }

  h1 {
    padding: 4px 4px 0;
    font-size: 28px;
    font-weight: 700;
    line-height: 34px;
  }

  button {
    font-family: inherit;
  }

  button:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: 2px;
    border-radius: 12px;
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
    /* Popups and hints lie over the page and never move or resize anything. */
    overflow: visible;
  }

  /* The enlarged car picture must not reach over the edges of its card. */
  .panel.car-panel {
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

  .head.click {
    cursor: pointer;
  }

  .title-btn {
    all: unset;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 6px;
    cursor: pointer;
  }

  .title-btn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: 3px;
  }

  .title-btn svg {
    width: 14px;
    height: 14px;
    margin-top: 1px;
    fill: var(--ed-off);
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

  /* ------------------------------------------------------------ alerts */
  .alerts {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .group-label {
    padding: 0 4px;
    color: var(--ed-secondary);
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
  }

  .alert {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    min-height: 60px;
    padding: 8px 0;
  }

  .alert .badge {
    background: color-mix(in srgb, var(--ed-accent) 18%, transparent);
  }

  .alert .badge svg {
    fill: var(--ed-accent);
  }

  .alert.warn .badge {
    background: color-mix(in srgb, var(--ed-warning) 18%, transparent);
  }

  .alert.warn .badge svg {
    fill: var(--ed-warning);
  }

  .alert-text {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
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
    gap: 6px;
    padding: 0 8px;
    border: 0;
    border-radius: 12px;
    background: var(--ed-tile);
    color: var(--ed-text);
    font: inherit;
    text-align: left;
    cursor: pointer;
  }

  .tile .icon {
    flex: none;
    width: 22px;
    height: 22px;
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
    flex: 1 1 auto;
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
  .tile.on .name,
  .tile.battery .name {
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

  :host([data-light]) .tile.idle.battery .value {
    color: var(--ed-text);
  }

  /* Popups: a tile popover with an arrow, and the big one of the heading. */
  .scrim {
    position: absolute;
    inset: 0;
    z-index: 5;
    padding: 0;
    border: 0;
    border-radius: 12px;
    background: rgb(0 0 0 / 0.1%);
    cursor: default;
  }

  .pop {
    position: absolute;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px 14px;
    border-radius: 14px;
    background: var(--ed-pop);
    box-shadow: 0 8px 30px var(--ed-pop-shadow);
    animation: pop-in 0.18s ease-out;
  }

  @keyframes pop-in {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pop {
      animation: none;
    }
  }

  .pop > * {
    position: relative;
  }

  .pop .arrow {
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    background: var(--ed-pop);
    transform: rotate(45deg);
  }

  .pop .arrow.up {
    top: -6px;
  }

  .pop .arrow.down {
    bottom: -6px;
  }

  .pop-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .pop-title {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
  }

  .pop-now,
  .pop-label {
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 18px;
  }

  .pop-now {
    text-align: right;
  }

  .pop-label .note {
    color: var(--ed-warning);
  }

  .pop-level {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .pop-level-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
  }

  .pop-big {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    font-variant-numeric: tabular-nums;
  }

  .segs {
    display: flex;
    gap: 3px;
    height: 8px;
  }

  .segs > span {
    position: relative;
    flex: 1 1 0;
    overflow: hidden;
    border-radius: 3px;
    background: var(--ed-pop-line);
  }

  .segs i {
    position: absolute;
    inset: 0 auto 0 0;
  }

  .pop-rows {
    display: flex;
    flex-direction: column;
  }

  .pop-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 8px;
    box-sizing: border-box;
    min-height: 30px;
    padding-top: 6px;
    border-top: 1px solid var(--ed-pop-line);
  }

  .pop-row span {
    color: var(--ed-pop-sec);
    font-size: 15px;
    line-height: 20px;
  }

  .pop-row b {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    font-variant-numeric: tabular-nums;
  }

  .pop.day {
    z-index: 20;
    top: 72px;
    right: 12px;
    left: 12px;
    gap: 6px;
    padding: 14px 14px 8px;
    border-radius: 16px;
  }

  .pop.day h3 {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
  }

  .pop.day h3 span {
    color: var(--ed-pop-sec);
    font-size: 15px;
    font-weight: 400;
  }

  .day-cols {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 16px;
    align-items: start;
  }

  .day-total {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding-bottom: 4px;
    color: var(--ed-pop-sec);
    font-size: 13px;
    line-height: 18px;
  }

  .day-total b {
    color: var(--ed-text);
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .day-item {
    display: grid;
    grid-template-columns: 8px minmax(0, 1fr) auto;
    align-items: center;
    gap: 8px;
    min-height: 36px;
    border-top: 1px solid var(--ed-pop-line);
    font-size: 15px;
    line-height: 20px;
  }

  .day-item i {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }

  .day-item span {
    white-space: nowrap;
  }

  .day-item b {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  /* --------------------------------------------------------------- car */
  .car-top {
    position: relative;
    height: 168px;
  }

  .car-top .head {
    position: relative;
  }

  .car-art {
    position: absolute;
    right: -4px;
    bottom: 0;
    width: 276px;
    height: 150px;
    pointer-events: none;
    /* Scaled up from the ground line, around the car (ui: car.image_scale). */
    transform-origin: 61% 100%;
  }

  .car-art .glow {
    position: absolute;
    inset: auto 6px 2px;
    height: 30px;
    border-radius: 50%;
    opacity: 0.95;
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
    width: 204px;
    max-height: 101px;
    object-fit: contain;
    filter: drop-shadow(0 6px 10px rgb(0 0 0 / 45%));
  }

  /* The hit area of the car picture: the same box and scaling as the picture, so it covers the car and nothing else. */
  .car-art.car-hitbox {
    z-index: 1;
  }

  .car-hit {
    position: absolute;
    right: 8px;
    bottom: 10px;
    width: 204px;
    height: 101px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    pointer-events: auto;
    touch-action: manipulation;
    -webkit-touch-callout: none;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
    -webkit-user-select: none;
  }

  .car-hit:focus-visible {
    outline: 2px solid var(--ed-accent, #0a84ff);
    outline-offset: 2px;
    border-radius: 12px;
  }

  /* Over the lower right of the picture; it lies on top and moves nothing. */
  .car-hint {
    position: absolute;
    z-index: 6;
    right: 8px;
    bottom: 8px;
    padding: 8px 12px;
    border-radius: 12px;
    background: var(--ed-bubble, #3a3a3c);
    color: var(--ed-bubble-text, #ffffff);
    box-shadow: 0 6px 20px rgb(0 0 0 / 55%);
    font-size: 13px;
    line-height: 18px;
    pointer-events: none;
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

  .meter-wrap {
    display: flex;
    flex-direction: column;
    gap: 4px;
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
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 16px;
  }

  .meter-label span {
    position: absolute;
    transform: translateX(-50%);
    white-space: nowrap;
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

  .mode {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .mode-head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 12px;
    font-size: 17px;
    line-height: 22px;
  }

  .mode-sub {
    color: var(--ed-secondary);
    font-size: 13px;
    line-height: 18px;
    text-align: right;
  }

  /* --------------------------------------------------------- hot water */
  .water {
    display: flex;
    flex-direction: column;
  }

  .source {
    box-sizing: border-box;
    padding: 12px 12px 0;
    border-radius: 12px;
    background: var(--ed-tile);
    overflow: hidden;
  }

  .source-top {
    display: grid;
    grid-template-columns: 108px minmax(0, 1fr);
    align-items: start;
    gap: 12px;
  }

  .arc {
    position: relative;
    width: 108px;
    height: 102px;
  }

  .arc > svg {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
  }

  .arc-num {
    position: absolute;
    inset: 27px 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .arc-num b {
    font-size: 36px;
    font-weight: 500;
    line-height: 38px;
    letter-spacing: -0.5px;
    font-variant-numeric: tabular-nums;
  }

  .arc-num span {
    color: var(--ed-pop-sec);
    font-size: 13px;
    font-weight: 500;
    line-height: 15px;
  }

  :host([data-light]) .arc-num span {
    color: var(--ed-secondary);
  }

  .arc-min,
  .arc-max {
    position: absolute;
    top: 87px;
    transform: translateX(-50%);
    color: var(--ed-secondary);
    font-size: 12px;
    line-height: 14px;
    font-variant-numeric: tabular-nums;
  }

  .arc-min {
    left: 25px;
  }

  .arc-max {
    left: 83px;
  }

  .source-body {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 0;
    height: 100px;
  }

  .source-title {
    font-size: 17px;
    font-weight: 600;
    line-height: 22px;
    white-space: nowrap;
  }

  .source-line {
    font-size: 13px;
    line-height: 18px;
    white-space: nowrap;
  }

  .source-line .src {
    color: var(--c);
    font-weight: 500;
  }

  :host([data-light]) .source-line .src {
    color: color-mix(in srgb, var(--c) 45%, #000);
  }

  .warn,
  .mode-sub.warn,
  .hint.warn {
    color: var(--ed-warning);
  }

  :host([data-light]) .warn,
  :host([data-light]) .mode-sub.warn,
  :host([data-light]) .hint.warn {
    color: color-mix(in srgb, var(--ed-warning) 45%, #000);
  }

  .source-line .dim {
    color: var(--ed-secondary);
  }

  .subrow {
    margin: 10px -12px 0;
    border-top: 1px solid var(--ed-sep);
  }

  .rowbtn {
    all: unset;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr) auto;
    align-items: center;
    gap: 10px;
    width: 100%;
    min-height: 48px;
    padding: 4px 12px;
    color: var(--ed-text);
    cursor: pointer;
  }

  .rowbtn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: -2px;
    border-radius: 10px;
  }

  .rowbtn-title {
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
    white-space: nowrap;
  }

  /* On the narrowest phones the value wraps to a second line instead of being cut. */
  .rowbtn-value {
    color: var(--ed-secondary);
    font-size: 15px;
    line-height: 20px;
    text-align: right;
  }

  .rowbtn-value b {
    color: var(--ed-text);
    font-weight: 500;
  }

  /* The water between the two tiles: connectors and the mixing capsule. */
  .link {
    width: 0;
    height: 8px;
    margin: 0 auto;
    border-left: 2px dashed var(--ed-off);
  }

  .link.on {
    border-left-style: solid;
    border-left-color: var(--ed-text);
  }

  .mixcap {
    position: relative;
    align-self: center;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    height: 48px;
    padding: 0 8px 0 14px;
    border-radius: 24px;
    background: var(--ed-tile);
  }

  .mixcap-text {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    font-weight: 500;
    line-height: 20px;
  }

  .mixcap-note {
    color: var(--ed-secondary);
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
  }

  /* ------------------------------------------------------------- lists */
  .group {
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
    grid-template-columns: 40px minmax(0, 1fr) auto auto;
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

  .row-btn:disabled {
    cursor: default;
  }

  .row-btn:focus-visible {
    outline: 2px solid var(--ed-accent);
    outline-offset: -2px;
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
    width: 14px;
    height: 14px;
    fill: var(--ed-secondary);
    transition: transform 0.25s;
  }

  [aria-expanded="true"] > .chevron,
  .chevron.turned {
    transform: rotate(180deg);
  }

  @media (prefers-reduced-motion: reduce) {
    .chevron {
      transition: none;
    }
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
    .fold {
      transition: none;
    }
  }

  .detail {
    display: grid;
    gap: 16px;
    padding: 4px 12px 14px;
  }

  .field {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
    column-gap: 12px;
  }

  .mode .field {
    padding-bottom: 6px;
  }

  .field.off {
    opacity: 0.5;
    pointer-events: none;
  }

  .field ed-slider {
    grid-column: 1 / -1;
    margin-top: 2px;
  }

  .field-label {
    display: flex;
    flex-direction: column;
    font-size: 17px;
    line-height: 22px;
  }

  .field-value {
    font-size: 28px;
    font-weight: 500;
    line-height: 34px;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .field-value small {
    color: var(--ed-secondary);
    font-size: 15px;
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
    min-height: 64px;
    border-top: 1px solid var(--ed-sep);
  }

  .switch-text {
    display: flex;
    flex-direction: column;
  }

  .switch-title {
    font-size: 17px;
    line-height: 22px;
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
