import { EdSegmented } from "./ed-segmented";
import { EdSlider } from "./ed-slider";
import { EdSwitch } from "./ed-switch";
import { HaEnergieDashboard } from "./ha-energie-dashboard";
import { getI18n, pageLanguage } from "./i18n";

if (!customElements.get("ed-segmented")) {
  customElements.define("ed-segmented", EdSegmented);
}
if (!customElements.get("ed-slider")) {
  customElements.define("ed-slider", EdSlider);
}
if (!customElements.get("ed-switch")) {
  customElements.define("ed-switch", EdSwitch);
}
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
