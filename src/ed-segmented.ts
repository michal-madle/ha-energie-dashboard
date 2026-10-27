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
 * Choice of one of a few options (role radiogroup), Apple HIG Segmented controls (CURRENT_SPEC.md,
 * Vzhled podle Apple HIG, Segmentový ovladač): a capsule 48 px high (66 px when an option has a
 * second line) with a white thumb that slides under the chosen option, which gets a black label.
 * Fires `ed-select` with `detail.value`.
 */
export class EdSegmented extends LitElement {
  @property({ attribute: false }) options: SegmentOption[] = [];
  @property() value = "";
  @property() label = "";
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: block;
    }
    .track {
      position: relative;
      display: grid;
      grid-template-columns: repeat(var(--n), minmax(0, 1fr));
      box-sizing: border-box;
      min-height: 48px;
      padding: 3px;
      border-radius: 999px;
      background: var(--ed-track, #2c2c2e);
    }
    .track.tall {
      min-height: 66px;
    }
    .thumb {
      position: absolute;
      top: 3px;
      bottom: 3px;
      left: 3px;
      width: calc((100% - 6px) / var(--n));
      box-sizing: border-box;
      border-radius: 999px;
      background: var(--ed-seg-thumb, #fff);
      box-shadow: 0 2px 6px rgb(0 0 0 / 30%);
      transform: translateX(calc(var(--i) * 100%));
      transition: transform 0.28s cubic-bezier(0.3, 1.1, 0.5, 1);
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
      color: var(--ed-seg-text, #ebebf5);
      font: inherit;
      font-size: 17px;
      font-weight: 400;
      line-height: 22px;
      cursor: pointer;
      transition: color 0.2s;
    }
    button .detail {
      font-size: 13px;
      line-height: 18px;
    }
    button[aria-checked="true"] {
      color: var(--ed-seg-selected, #000);
      font-weight: 600;
    }
    button:focus-visible {
      outline: 2px solid var(--ed-accent, #0a84ff);
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
      class="track ${this.options.some((option) => option.detail) ? "tall" : ""}"
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
