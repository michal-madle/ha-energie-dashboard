import { EdSegmented } from "./ed-segmented";
import { EdSlider } from "./ed-slider";
import { HaEnergieDashboard } from "./ha-energie-dashboard";

if (!customElements.get("ed-segmented")) {
  customElements.define("ed-segmented", EdSegmented);
}
if (!customElements.get("ed-slider")) {
  customElements.define("ed-slider", EdSlider);
}
if (!customElements.get("ha-energie-dashboard")) {
  customElements.define("ha-energie-dashboard", HaEnergieDashboard);
}

window.customCards = window.customCards ?? [];
if (!window.customCards.some((card) => card.type === "ha-energie-dashboard")) {
  window.customCards.push({
    type: "ha-energie-dashboard",
    name: "Energie Dashboard",
    description: "Toky energie domu jako Sankey diagram (FVE, síť, baterie, dům, auto, bojler) a ovládání wallboxu, bojleru a zásobníku.",
    preview: false,
  });
}
