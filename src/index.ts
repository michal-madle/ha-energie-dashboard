import { defineControls } from "ha-dashboard-kit/controls";
import { HaEnergieDashboard } from "./ha-energie-dashboard";
import { getI18n, pageLanguage } from "./i18n";

// <ed-switch>, <ed-segmented>, <ed-slider> of the kit, named by the prefix of this card.
defineControls("ed");
if (!customElements.get("ha-energie-dashboard")) {
  customElements.define("ha-energie-dashboard", HaEnergieDashboard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-energie-dashboard")) {
  window.customCards.push({
    type: "ha-energie-dashboard",
    name: "Energie Dashboard",
    // The card picker has no `hass` yet: the language Home Assistant set on the page.
    description: getI18n(pageLanguage()).t.cardDescription,
    preview: false,
  });
}

// Which build runs in Home Assistant (a stale cached module is the usual reason a change is "not there").
console.info(`%c ENERGIE-DASHBOARD %c ${__BUILD__} `, "color:#000;background:#FFD60A;font-weight:700", "color:inherit");
