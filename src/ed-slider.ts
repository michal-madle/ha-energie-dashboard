import { LitElement, css, html } from "lit";
import { property, state } from "lit/decorators.js";
import type { TemplateResult } from "lit";

/**
 * Slider with a thick capsule track and a long glass thumb, in the style of iOS 27
 * (CURRENT_SPEC.md, Nastavované hodnoty). A native range input underneath, so keyboard and
 * screen readers work. Fires `ed-input` while dragging and `ed-change` when the value is set.
 */
export class EdSlider extends LitElement {
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Number }) value = 0;
  @property() label = "";
  /** Spoken value, e.g. "40 °C"; defaults to the number. */
  @property() valueText = "";
  @property({ type: Boolean }) disabled = false;

  @state() private _drag?: number;

  static styles = css`
    :host {
      display: block;
      --ed-slider-accent: var(--primary-color, #03a9f4);
      --ed-track-h: 34px;
      --ed-thumb-w: 58px;
      --ed-thumb-h: 44px;
    }
    .wrap {
      position: relative;
      height: 48px;
    }
    input {
      -webkit-appearance: none;
      appearance: none;
      display: block;
      width: 100%;
      height: 48px;
      margin: 0;
      background: transparent;
      cursor: pointer;
      touch-action: pan-y;
    }
    input:disabled {
      cursor: default;
      opacity: 0.45;
    }
    input::-webkit-slider-runnable-track {
      height: var(--ed-track-h);
      border-radius: 999px;
      background:
        linear-gradient(180deg, rgb(255 255 255 / 26%), rgb(255 255 255 / 0%) 60%),
        linear-gradient(
          to right,
          var(--ed-slider-accent) 0%,
          var(--ed-slider-accent) var(--fill),
          color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent) var(--fill),
          color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent) 100%
        );
      box-shadow:
        inset 0 1px 3px rgb(0 0 0 / 30%),
        0 0 0 1px color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
    }
    input::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      box-sizing: border-box;
      width: var(--ed-thumb-w);
      height: var(--ed-thumb-h);
      margin-top: calc((var(--ed-track-h) - var(--ed-thumb-h)) / 2);
      border-radius: 999px;
      border: 1px solid rgb(255 255 255 / 85%);
      background: linear-gradient(180deg, rgb(255 255 255 / 98%), rgb(228 228 238 / 82%));
      box-shadow:
        0 5px 14px rgb(0 0 0 / 35%),
        inset 0 1px 0 #fff,
        inset 0 -8px 10px rgb(255 255 255 / 25%);
    }
    input::-moz-range-track {
      height: var(--ed-track-h);
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color, #212121) 10%, transparent);
      box-shadow: inset 0 1px 3px rgb(0 0 0 / 30%);
    }
    input::-moz-range-progress {
      height: var(--ed-track-h);
      border-radius: 999px;
      background: var(--ed-slider-accent);
    }
    input::-moz-range-thumb {
      box-sizing: border-box;
      width: var(--ed-thumb-w);
      height: var(--ed-thumb-h);
      border: 1px solid rgb(255 255 255 / 85%);
      border-radius: 999px;
      background: linear-gradient(180deg, rgb(255 255 255 / 98%), rgb(228 228 238 / 82%));
      box-shadow: 0 5px 14px rgb(0 0 0 / 35%);
    }
    input:focus-visible {
      outline: none;
    }
    input:focus-visible::-webkit-slider-thumb {
      box-shadow:
        0 0 0 3px var(--card-background-color, #fff),
        0 0 0 5px var(--primary-color, #03a9f4);
    }
    input:focus-visible::-moz-range-thumb {
      box-shadow:
        0 0 0 3px var(--card-background-color, #fff),
        0 0 0 5px var(--primary-color, #03a9f4);
    }
  `;

  render(): TemplateResult {
    const shown = this._drag ?? this.value;
    const span = this.max - this.min || 1;
    const fraction = Math.max(0, Math.min(1, (shown - this.min) / span));
    // The thumb is wider than a plain handle: the fill ends under its centre, so offset the
    // fraction by the thumb travel (the thumb centre moves over track width minus thumb width).
    const fill = `calc(var(--ed-thumb-w) / 2 + (100% - var(--ed-thumb-w)) * ${fraction})`;
    return html`<div class="wrap">
      <input
        type="range"
        min=${this.min}
        max=${this.max}
        step=${this.step}
        .value=${String(shown)}
        aria-label=${this.label}
        aria-valuetext=${this.valueText || String(shown)}
        ?disabled=${this.disabled}
        style="--fill: ${fill}"
        @input=${this.onInput}
        @change=${this.onChange}
      />
    </div>`;
  }

  private onInput(event: Event): void {
    this._drag = Number((event.target as HTMLInputElement).value);
    this.dispatchEvent(new CustomEvent("ed-input", { detail: { value: this._drag }, bubbles: true, composed: true }));
  }

  private onChange(event: Event): void {
    const value = Number((event.target as HTMLInputElement).value);
    this._drag = undefined;
    this.dispatchEvent(new CustomEvent("ed-change", { detail: { value }, bubbles: true, composed: true }));
  }
}
