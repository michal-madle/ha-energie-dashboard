import { LitElement, css, html } from "lit";
import { property } from "lit/decorators.js";
import type { TemplateResult } from "lit";

/**
 * Switch in the style of Apple's HIG Toggles (CURRENT_SPEC.md, Vzhled podle Apple HIG, Přepínač):
 * 60 × 32 px track, long white thumb 40 × 26 px, accent colour when on, hit area at least 44 px.
 * It has no label of its own: the list row beside it is the label, so the host row passes the
 * spoken name in `label`. Fires `ed-toggle` with `detail.checked` (the requested new state).
 */
export class EdSwitch extends LitElement {
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property() label = "";

  static styles = css`
    :host {
      display: inline-block;
      flex: none;
    }
    button {
      position: relative;
      display: block;
      box-sizing: border-box;
      width: 60px;
      height: 32px;
      padding: 0;
      border: 0;
      border-radius: 16px;
      background: var(--ed-switch-off, rgb(120 120 128 / 36%));
      cursor: pointer;
      transition: background 0.2s;
    }
    button[aria-checked="true"] {
      background: var(--ed-accent, #0a84ff);
    }
    /* Invisible extension of the touch target to 44 px. */
    button::after {
      content: "";
      position: absolute;
      inset: -6px -4px;
    }
    .thumb {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 40px;
      height: 26px;
      box-sizing: border-box;
      border-radius: 13px;
      background: #fff;
      box-shadow: 0 2px 6px rgb(0 0 0 / 40%);
      transition: left 0.25s cubic-bezier(0.3, 1.2, 0.5, 1);
    }
    button[aria-checked="true"] .thumb {
      left: 17px;
    }
    button:disabled {
      cursor: default;
      opacity: 0.45;
    }
    button:focus-visible {
      outline: 2px solid var(--ed-accent, #0a84ff);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      button,
      .thumb {
        transition: none;
      }
    }
  `;

  render(): TemplateResult {
    return html`<button
      type="button"
      role="switch"
      aria-checked=${this.checked ? "true" : "false"}
      aria-label=${this.label}
      ?disabled=${this.disabled}
      @click=${this.onClick}
    ><span class="thumb"></span></button>`;
  }

  private onClick(): void {
    if (this.disabled) return;
    this.dispatchEvent(new CustomEvent("ed-toggle", { detail: { checked: !this.checked }, bubbles: true, composed: true }));
  }
}
