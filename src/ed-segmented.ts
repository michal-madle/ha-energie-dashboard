import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import type { TemplateResult } from "lit";

export interface SegmentOption {
  value: string;
  label: string;
  /** Short line under the label (optional), e.g. a temperature. */
  detail?: string;
  disabled?: boolean;
}

/**
 * Choice of one of a few options (role radiogroup): a long, tall capsule with a glass thumb that
 * slides under the chosen option, in the style of iOS 27 (CURRENT_SPEC.md, Přepínače voleb).
 * Colours come from the Home Assistant theme. Fires `ed-select` with `detail.value`.
 */
export class EdSegmented extends LitElement {
  @property({ attribute: false }) options: SegmentOption[] = [];
  @property() value = "";
  @property() label = "";
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: block;
      --ed-seg-h: 56px;
    }
    .track {
      position: relative;
      display: grid;
      grid-template-columns: repeat(var(--n), minmax(0, 1fr));
      box-sizing: border-box;
      height: var(--ed-seg-h);
      padding: 5px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--primary-text-color, #212121) 9%, transparent);
      box-shadow:
        inset 0 1px 3px rgb(0 0 0 / 28%),
        inset 0 0 0 1px color-mix(in srgb, var(--primary-text-color, #212121) 8%, transparent);
    }
    .thumb {
      position: absolute;
      top: 5px;
      bottom: 5px;
      left: 5px;
      width: calc((100% - 10px) / var(--n));
      box-sizing: border-box;
      border-radius: 999px;
      background: linear-gradient(
        180deg,
        color-mix(in srgb, var(--primary-text-color, #212121) 26%, transparent),
        color-mix(in srgb, var(--primary-text-color, #212121) 12%, transparent)
      );
      border: 1px solid color-mix(in srgb, var(--primary-text-color, #212121) 22%, transparent);
      box-shadow:
        0 4px 14px rgb(0 0 0 / 30%),
        inset 0 1px 0 rgb(255 255 255 / 45%),
        inset 0 -8px 12px rgb(255 255 255 / 5%);
      -webkit-backdrop-filter: blur(10px) saturate(1.6);
      backdrop-filter: blur(10px) saturate(1.6);
      transform: translateX(calc(var(--i) * 100%));
      transition: transform 0.32s cubic-bezier(0.3, 1.25, 0.5, 1);
    }
    .thumb::before {
      content: "";
      position: absolute;
      left: 12%;
      right: 12%;
      top: 2px;
      height: 42%;
      border-radius: 999px;
      background: linear-gradient(180deg, rgb(255 255 255 / 30%), rgb(255 255 255 / 0%));
    }
    .thumb[hidden] {
      display: none;
    }
    button {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-width: 0;
      min-height: 44px;
      padding: 0 8px;
      border: 0;
      border-radius: 999px;
      background: transparent;
      color: color-mix(in srgb, var(--secondary-text-color, #727272) 65%, var(--primary-text-color, #212121));
      font: inherit;
      font-size: 16px;
      font-weight: 500;
      line-height: 20px;
      cursor: pointer;
      transition: color 0.2s;
    }
    button .detail {
      font-size: 13px;
      line-height: 16px;
      font-weight: 400;
    }
    button[aria-checked="true"] {
      color: var(--primary-text-color, #212121);
      font-weight: 600;
    }
    button:focus-visible {
      outline: 2px solid var(--primary-color, #03a9f4);
      outline-offset: -3px;
    }
    button:disabled {
      cursor: default;
      opacity: 0.5;
    }
    @media (prefers-reduced-motion: reduce) {
      .thumb,
      button {
        transition: none;
      }
    }
  `;

  render(): TemplateResult {
    const index = this.options.findIndex((option) => option.value === this.value);
    const enabled = this.options.filter((option) => !option.disabled);
    const tabbable = this.options[index]?.value ?? enabled[0]?.value;
    return html`<div
      class="track"
      role="radiogroup"
      aria-label=${this.label}
      style="--n:${Math.max(1, this.options.length)};--i:${Math.max(0, index)}"
      @keydown=${this.onKey}
    >
      <span class="thumb" aria-hidden="true" ?hidden=${index < 0}></span>
      ${this.options.map(
        (option) => html`<button
          type="button"
          role="radio"
          aria-checked=${option.value === this.value ? "true" : "false"}
          tabindex=${option.value === tabbable ? 0 : -1}
          ?disabled=${this.disabled || option.disabled}
          data-value=${option.value}
          @click=${() => this.pick(option.value)}
        >
          <span>${option.label}</span>${option.detail ? html`<span class="detail">${option.detail}</span>` : null}
        </button>`,
      )}
    </div>`;
  }

  private pick(value: string): void {
    if (this.disabled || value === this.value) return;
    this.dispatchEvent(new CustomEvent("ed-select", { detail: { value }, bubbles: true, composed: true }));
  }

  private onKey(event: KeyboardEvent): void {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    if (!keys.includes(event.key)) return;
    const enabled = this.options.filter((option) => !option.disabled);
    if (!enabled.length) return;
    const at = enabled.findIndex((option) => option.value === this.value);
    const step = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const next = enabled[(at + step + enabled.length) % enabled.length];
    event.preventDefault();
    this.pick(next.value);
    void this.updateComplete.then(() => this.renderRoot.querySelector<HTMLElement>(`[data-value="${next.value}"]`)?.focus());
  }
}
