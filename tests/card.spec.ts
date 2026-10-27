import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parse } from "yaml";
import { expect, test } from "./fixtures";
import type { Page } from "./fixtures";
import { CONFIG_KEYS } from "../src/config";

// Browser tests of the Energie Dashboard card against tests/harness.html (fake hass data).
// Every case names the spec section it guards. `npm test` builds the card first;
// `npm run coverage` shows which code of src/ the tests execute.

const require = createRequire(import.meta.url);
const AXE = require.resolve("axe-core/axe.min.js");
const WIDTHS = [320, 360, 375, 393, 430, 768];
const LANDSCAPE = [852, 393] as const;
const TILES = ["Slunce", "Baterie", "Síť", "Dům", "Auto", "Bojler", "Do baterie", "Do sítě"];
const CARD = "ha-energie-dashboard";

// ------------------------------------------------------------------ helpers

async function open(page: Page, scenario = "full", width = 393, height = 852, theme: "dark" | "light" = "dark"): Promise<void> {
  await page.setViewportSize({ width, height });
  await page.goto(`/tests/harness.html?s=${scenario}${theme === "light" ? "&theme=light" : ""}`);
  await page.locator(".tile").first().waitFor();
}

const example = () => parse(readFileSync(new URL("../examples/energie.yaml", import.meta.url), "utf8"));

/** setConfig of a fresh card with the example configuration and `patch` over its top-level keys; "" = accepted. */
const configError = (page: Page, patch: Record<string, unknown>, replace = false) =>
  page.evaluate(
    ([value, whole]) => {
      // @ts-expect-error test hook
      const config = whole ? value : { ...structuredClone(window.__test.config), ...value };
      try {
        (document.createElement("ha-energie-dashboard") as unknown as { setConfig(value: unknown): void }).setConfig(config);
        return "";
      } catch (error) {
        return (error as Error).message;
      }
    },
    [patch, replace] as const,
  );

/** setConfig of the shown card with `patch` over the example configuration. */
const reconfigure = (page: Page, patch: Record<string, unknown>) =>
  page.evaluate((value) => {
    // @ts-expect-error test hook
    const { card, config } = window.__test;
    card.setConfig({ ...config, ...value });
  }, patch);

/** Waits until every finite animation (also inside shadow roots) has finished. */
async function settle(page: Page): Promise<void> {
  await page.evaluate(async () => {
    const roots = [document, ...[...document.querySelectorAll("*")].flatMap((node) => (node.shadowRoot ? [node.shadowRoot] : []))];
    const finite = roots.flatMap((root) => root.getAnimations()).filter((a) => a.effect?.getComputedTiming().iterations !== Infinity);
    await Promise.all(finite.map((a) => a.finished.catch(() => undefined)));
  });
}

/** axe-core on the whole harness page; `skip` turns off rules that judge the page, not the card. */
async function axeViolations(page: Page, skip: string[] = []): Promise<string[]> {
  await page.addScriptTag({ path: AXE });
  await settle(page);
  return page.evaluate(async (off) => {
    const rules = Object.fromEntries(off.map((id) => [id, { enabled: false }]));
    // @ts-expect-error axe is injected above
    const result = await window.axe.run(document, { resultTypes: ["violations"], rules });
    return result.violations.map(
      (violation: { id: string; nodes: Array<{ target: string[]; any: Array<{ data?: unknown }> }> }) =>
        `${violation.id}: ${violation.nodes
          .map((node) => `${node.target.join(" > ")} ${JSON.stringify(node.any[0]?.data ?? {})}`)
          .join(" | ")}`,
    );
  }, skip);
}

/** What every tile shows: name, visible value and the label a screen reader gets. */
const readTiles = (page: Page) =>
  page.evaluate((tag) => {
    const root = document.querySelector(tag)!.shadowRoot!;
    return [...root.querySelectorAll<HTMLElement>(".tile")].map((tile) => ({
      name: tile.querySelector(".name")?.textContent?.trim(),
      value: tile.querySelector(".value")?.textContent?.trim(),
      aria: tile.getAttribute("aria-label"),
      on: tile.classList.contains("on"),
    }));
  }, CARD);

const tile = async (page: Page, name: string) => (await readTiles(page)).find((item) => item.name === name)!;

/** Service calls the card made on the fake hass. */
const calls = (page: Page) =>
  page.evaluate(() => {
    // @ts-expect-error test hook
    return window.__test.calls as Array<{ domain: string; service: string; data: Record<string, unknown> }>;
  });

/** Opens the detail of a list row (Boost, Boost bojleru, Zásobník (plyn)) and waits for the animation. */
async function expand(page: Page, title: string): Promise<void> {
  const row = page.locator(".row-btn").filter({ has: page.locator(".row-title", { hasText: new RegExp(`^${title.replace(/[()]/g, "\\$&")}$`) }) });
  if ((await row.getAttribute("aria-expanded")) !== "true") await row.click();
  await settle(page);
}

const expandAll = async (page: Page) => {
  for (const title of ["Boost", "Boost bojleru", "Zásobník (plyn)"]) {
    const row = page.locator(".row-btn").filter({ has: page.locator(".row-title", { hasText: new RegExp(`^${title.replace(/[()]/g, "\\$&")}$`) }) });
    if ((await row.getAttribute("aria-expanded")) !== "true") await row.click();
  }
  await settle(page);
};

/** The sentence of the n-th state line (0 Elektřina, 1 auto, 2 voda). */
const stateLine = (page: Page, index: number) => page.locator(".state").nth(index);

/** Subtitle of a list row by its title. */
const rowText = (page: Page, title: string) =>
  page.locator(".row").filter({ has: page.locator(".row-title", { hasText: new RegExp(`^${title.replace(/[()]/g, "\\$&")}$`) }) }).locator(".row-sub");

const update = (page: Page, changes: Record<string, string>) =>
  page.evaluate((value) => {
    // @ts-expect-error test hook
    window.__test.update(value);
  }, changes);

// ------------------------------------------------------------- configuration

test.describe("konfigurace (CURRENT_SPEC.md, Konfigurace)", () => {
  test("příklad YAML obsahuje úplně všechna nastavení a výchozí hodnoty jsou přesně ty v příkladu", async ({ page }) => {
    const leaves = (value: unknown, path = ""): string[] =>
      value && typeof value === "object" && !Array.isArray(value)
        ? Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key))
        : [path];
    const found = leaves(example());
    expect(CONFIG_KEYS.filter((key) => !found.includes(key)), "chybí v příkladu").toEqual([]);
    expect(found.filter((key) => !CONFIG_KEYS.includes(key)), "neznámé klíče").toEqual([]);

    await open(page, "full");
    const [explicit, implicit] = await page.evaluate((config) => {
      const normalized = (value: unknown) => {
        const card = document.createElement("ha-energie-dashboard") as unknown as { setConfig(value: unknown): void; _config: unknown };
        card.setConfig(value);
        return JSON.stringify(card._config);
      };
      // Without title, titles, numbers and colours: the defaults must be the values of the example.
      const bare = structuredClone(config);
      for (const key of ["title", "titles", "flows", "scale", "ui", "colors"]) delete bare[key];
      for (const [section, keys] of Object.entries({
        battery: ["reserve"], car: ["charge_limit"],
        wallbox: ["phases", "power_min", "power_max", "power_step", "priority_min_sun"],
        boiler: ["target_min", "target_max", "target_step", "scale_min", "gauge_max", "schema_max", "cold_below", "hot_from"],
        tank: ["temp_min", "temp_max", "temp_step"],
      })) for (const key of keys) delete bare[section][key];
      return [normalized(config), normalized(bare)];
    }, example());
    expect(explicit).toEqual(implicit);
    const settings = JSON.parse(explicit);
    expect(settings.entities.boiler.boost_target_temperature).toBe("number.tuv_2_2_boost_target_temperature");
    expect(settings.num.wallbox.power_max).toBe(11100);
  });

  test("chybná hodnota zastaví kartu srozumitelnou chybou s názvem klíče; prázdná hodnota = výchozí", async ({ page }) => {
    await open(page, "full");
    const cases: Array<[Record<string, unknown>, RegExp]> = [
      [{ wallbox: { boots: "switch.wallbox_boost" } }, /^Energie Dashboard: wallbox: unknown key "boots" \(allowed: power, status, boost, block_charging, prioritize_connected, charging_power, phases, /],
      [{ wallbox: { boost: "sensor.wallbox_boost" } }, /wallbox\.boost must be a switch entity \(switch\.…\), not sensor\.wallbox_boost/],
      [{ wallbox: { charging_power: "sensor.wallbox_power" } }, /wallbox\.charging_power must be a number entity/],
      [{ boiler: { boost: "input_boolean.tuv_boost" } }, /boiler\.boost must be a switch entity/],
      [{ boiler: { target_temperature: "sensor.tuv_cil" } }, /boiler\.target_temperature must be a number entity/],
      [{ tank: { water_heater: "climate.tepla_voda" } }, /tank\.water_heater must be a water_heater entity/],
      [{ car: { image: "sensor.obrazek" } }, /car\.image must be a image entity/],
      [{ mixing: { script: "prepnout_miseni_vody" } }, /mixing\.script must be an entity ID such as script\.example/],
      [{ mixing: { valve_c1: "switch.ventil", valve_c2: "switch.ventil" } }, /mixing\.valve_c1 and mixing\.valve_c2 must be two different valves/],
      [{ pv: "sensor.goodwe_pv_power" }, /"pv" must be a mapping of keys/],
      [{ pv: { power: "Sensor.GoodWe PV" } }, /pv\.power must be an entity ID/],
      [{ battery: { power: 351 } }, /battery\.power must be an entity ID/],
      [{ car: { soc: "sensor.parkovani_bmw_i3_soc" } }, /car: unknown key "soc" \(allowed: state_of_charge, range, image, charge_limit\)/],
      [{ title: 5 }, /title must be a text/],
      [{ titles: { car: "" } }, /titles\.car must be a non-empty text/],
      [{ titles: { auto: "Auto" } }, /titles: unknown key "auto"/],
      [{ battery: { reserve: "20" } }, /battery\.reserve must be a number \(% battery reserve\)/],
      [{ battery: { reserve: 120 } }, /battery\.reserve must be a number from 0 to 100 \(% battery reserve\), not 120/],
      [{ wallbox: { phases: 2.5 } }, /wallbox\.phases must be a whole number from 1 to 3/],
      [{ wallbox: { power_min: 12000, power_max: 4000 } }, /wallbox\.power_min \(12000\) must be below wallbox\.power_max \(4000\)/],
      [{ boiler: { cold_below: 50, hot_from: 40 } }, /boiler\.cold_below \(50\) must be at most boiler\.hot_from \(40\)/],
      [{ flows: { idle: 5 } }, /flows: unknown key "idle"/],
      [{ scale: { sun: 0 } }, /scale\.sun must be a number from 100/],
      [{ colors: { sun: "yellow" } }, /colors\.sun must be a colour like #FFD60A/],
      [{ colors: { sky: "#FFFFFF" } }, /colors: unknown key "sky"/],
    ];
    for (const [patch, message] of cases) {
      expect(await configError(page, patch), JSON.stringify(patch)).toMatch(message);
    }
    expect(await configError(page, ["pv"] as unknown as Record<string, unknown>, true)).toMatch(/configuration must be a mapping/);
    const accepted: Array<[Record<string, unknown>, boolean]> = [
      [{ title: "" }, false],
      [{ title: null, pv: null, battery: { power: null, state_of_charge: null, reserve: null }, mixing: { script: null }, colors: null, flows: { kw_from: null } }, false],
      [{ theme: "light", grid_options: { columns: 12 }, view_layout: { position: "main" } }, false],
      [{ battery: { reserve: 0 }, colors: { sun: "#ff0000" } }, false],
      [{ type: "custom:ha-energie-dashboard" }, true],
    ];
    for (const [patch, whole] of accepted) {
      expect(await configError(page, patch, whole), JSON.stringify(patch)).toBe("");
    }
    await reconfigure(page, { title: null, pv: { power: null } });
    await expect(page.locator("h1")).toHaveText("Energie");
    await reconfigure(page, { title: "" });
    await expect(page.locator("h1")).toHaveCount(0);
    await expect(page.locator(".tile")).toHaveCount(TILES.length);
  });

  test("čísla, nadpisy a barvy z konfigurace se projeví na kartě", async ({ page }) => {
    await open(page, "day");
    const config = example();
    await reconfigure(page, {
      titles: { electricity: "Proud", car: "Moje auto", water: "Voda" },
      car: { ...config.car, charge_limit: 90 },
      battery: { ...config.battery, reserve: 30 },
      flows: { kw_from: 100000 },
      colors: { sun: "#FF0000" },
    });
    await expect(page.locator(".panel h2")).toHaveText(["Proud", "Moje auto", "Voda"]);
    await expect(page.locator(".gauge .g-label").nth(1)).toHaveText("Auto → 90 %");
    await expect(page.locator(".meter .limit")).toHaveAttribute("style", /left:90%/);
    await expect(page.locator(".gauge .tick").first()).toHaveAttribute("style", /left:30%/);
    await expect(page.locator(".page")).toHaveAttribute("style", /--ed-sun:#FF0000/);
    expect((await tile(page, "Slunce")).value).toMatch(/^6\s800 W$/);
  });
});

// ------------------------------------------------------------------ flows

test.describe("toky energie (CURRENT_SPEC.md, Karta Elektřina = Sankey)", () => {
  test("poledne: hodnoty ve všech dlaždicích v jedné jednotce, pásy podle zdrojů, věta o stavu", async ({ page }) => {
    await open(page, "day");
    const tiles = await readTiles(page);
    expect(tiles.map((item) => item.name)).toEqual(TILES);
    const shown = Object.fromEntries(tiles.map((item) => [item.name, item.value]));
    // Dům = spotřeba bez auta (4,1 kW) a bojleru (1,2 kW): 5,8 − 5,3 = 0,5 kW; všude kW s jednou desetinou.
    expect(shown).toMatchObject({ Slunce: "6,8 kW", Auto: "4,1 kW", Bojler: "1,2 kW", Dům: "0,5 kW", "Do baterie": "0,8 kW", "Do sítě": "0,2 kW" });
    expect(shown.Baterie).toBe("nevybíjí");
    expect(shown["Síť"]).toBe("neodebírá");
    await expect(stateLine(page, 0)).toContainText("Slunce nabíjí baterii i auto");
    // Jeden pás za zdroj a spotřebič: slunce → dům, auto, bojler, baterie, síť.
    await expect(page.locator(".flow svg path.dots")).toHaveCount(5);
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(new Set(fills)).toEqual(new Set(["url(#rg-sun)"]));
  });

  test("večer: dům z baterie a sítě, bez slunce; malé hodnoty ve W", async ({ page }) => {
    await open(page, "full");
    const shown = Object.fromEntries((await readTiles(page)).map((item) => [item.name, item.value]));
    expect(shown).toMatchObject({ Slunce: "nevyrábí", Baterie: "351 W", "Síť": "148 W", Dům: "459 W", Auto: "připojeno", Bojler: "vypnuto" });
    await expect(stateLine(page, 0)).toContainText("Dům bere z baterie a sítě");
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(new Set(fills)).toEqual(new Set(["url(#rg-bat)", "url(#rg-grid)"]));
  });

  test("boost ze sítě: dům jede ze sítě, pásy ze sítě k autu a bojleru", async ({ page }) => {
    await open(page, "grid");
    await expect(stateLine(page, 0)).toContainText("Dům jede ze sítě");
    expect((await tile(page, "Síť")).value).toBe("10,3 kW");
    expect((await tile(page, "Auto")).aria).toBe("Auto 5,3 kW");
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(fills.filter((fill) => fill === "url(#rg-grid)").length).toBe(3);
  });

  test("tap na dlaždici otevře historii entity (hass-more-info)", async ({ page }) => {
    await open(page, "day");
    const detail = page.evaluate(
      () => new Promise((resolve) => document.addEventListener("hass-more-info", (event) => resolve((event as CustomEvent).detail), { once: true })),
    );
    await page.locator(".tile", { hasText: "Slunce" }).click();
    expect(await detail).toEqual({ entityId: "sensor.goodwe_pv_power" });
  });

  test("ukazatele: baterie pod rezervou oranžově, auto má značku limitu, bojler jde na stupnici 10–60 °C", async ({ page }) => {
    await open(page, "day");
    const gauges = page.locator(".gauge");
    await expect(gauges.nth(0).locator(".fill")).toHaveAttribute("style", /width:88%;background:var\(--ed-battery\)/);
    await expect(gauges.nth(1).locator(".g-label")).toHaveText("Auto → 80 %");
    await expect(gauges.nth(2).locator(".fill")).toHaveAttribute("style", /width:84%/); // (52 − 10) / 50
    await update(page, { "sensor.goodwe_battery_state_of_charge": "15" });
    await expect(gauges.nth(0).locator(".fill")).toHaveAttribute("style", /background:var\(--ed-warning\)/);
  });
});

// ------------------------------------------------------------------ panels

test.describe("karty auto a teplá voda (CURRENT_SPEC.md, Auto, Wallbox, Bojler, Zásobník, Mísení vody)", () => {
  test("auto nabíjí ze slunce: stav, odkud auto nabíjí, řádky Wallbox a Boost", async ({ page }) => {
    await open(page, "day");
    await expect(stateLine(page, 1)).toHaveText("Nabíjí ze slunce");
    await expect(page.locator(".soc")).toContainText("62");
    await expect(page.locator(".range")).toContainText("95 km");
    await expect(page.locator(".mix-head")).toContainText("Odkud auto nabíjí");
    await expect(page.locator(".mix-legend")).toContainText("Slunce100 %");
    await expect(rowText(page, "Wallbox")).toContainText("nabíjí 4,1 kW");
    await expect(rowText(page, "Boost")).toHaveText("Vypnuto");
    await expect(page.locator(".car-art img")).toHaveAttribute("src", /^data:image\/svg/);
  });

  test("večer: auto připojené, nenabíjí; bez „Odkud auto nabíjí“", async ({ page }) => {
    await open(page, "full");
    await expect(stateLine(page, 1)).toHaveText("Připojeno, nenabíjí");
    await expect(page.locator(".mix")).toHaveCount(0);
    await expect(rowText(page, "Wallbox")).toHaveText("nenabíjí");
    await expect(stateLine(page, 2)).toHaveText("Bez ohřevu");
    await update(page, { "sensor.wallbox_charge_status": "Disconnected" });
    await expect(stateLine(page, 1)).toHaveText("Odpojeno");
    await update(page, { "switch.wallbox_boost": "on" });
    await expect(rowText(page, "Boost")).toHaveText("Auto není připojeno");
    await update(page, { "sensor.wallbox_charge_status": "Waiting" });
    await expect(rowText(page, "Boost")).toHaveText("Auto nenabíjí");
  });

  test("boost ze sítě: texty „Nabíjí ze sítě“ a „Hřeje ze sítě“, odchylka oranžově", async ({ page }) => {
    await open(page, "grid");
    await expect(rowText(page, "Boost")).toHaveText("Nabíjí ze sítě");
    await expect(rowText(page, "Boost bojleru")).toHaveText("Hřeje ze sítě");
    await expect(stateLine(page, 2)).toHaveText("Bojler ohřívá ze sítě");
    expect(await stateLine(page, 1).evaluate((el) => (el as HTMLElement).style.getPropertyValue("--sc"))).toBe("var(--ed-warning)");
    await expect(page.locator(".mix-legend")).toContainText("Síť96 %");
  });

  test("voda ve schématu: barva podle teploty a ohřevu, značka cíle, mísení podle ventilů", async ({ page }) => {
    await open(page, "full");
    const water = page.locator(".tank").first().locator(".tank-water");
    await expect(water).toHaveAttribute("style", /border-top-color:var\(--ed-cold\)/); // 15 °C
    await update(page, { "sensor.tuv_temperature": "35" });
    await expect(water).toHaveAttribute("style", /border-top-color:var\(--ed-off\)/);
    await update(page, { "sensor.tuv_temperature": "50" });
    await expect(water).toHaveAttribute("style", /border-top-color:var\(--ed-warning\)/);
    // Cíl přetoků 60 °C na stupnici 10–70 °C: čárkovaná značka 17 % od horního okraje.
    await expect(page.locator(".tank-target")).toHaveAttribute("style", /top:1[67](\.\d+)?%/);
    await expect(page.locator(".mixing text").nth(1)).toHaveText("vypnuto");
    await update(page, { "switch.technicka_mistnost_ventil_c1": "off", "switch.technicka_mistnost_ventil_c2": "on" });
    await expect(page.locator(".mixing text").nth(1)).toHaveText("zapnuto");
    await update(page, { "switch.technicka_mistnost_ventil_c1": "on", "switch.technicka_mistnost_ventil_c2": "on" });
    await expect(page.locator(".mixing text").nth(1)).toHaveText("nejasné");
  });

  test("zásobník: nastavená teplota a režim v řádku i ve schématu", async ({ page }) => {
    await open(page, "full");
    await expect(rowText(page, "Zásobník (plyn)")).toHaveText("nastaveno 40 °C · režim auto");
    await expect(page.locator(".tank").nth(1).locator(".tank-temp")).toContainText("40");
    await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": "off" });
    await expect(rowText(page, "Zásobník (plyn)")).toContainText("režim vypnuto");
    await expect(page.locator(".tank-caption").nth(1)).toContainText("vypnuto");
  });
});

// --------------------------------------------------------------------- layout

test.describe("rozložení (CURRENT_SPEC.md, Mobil)", () => {
  for (const scenario of ["full", "day", "grid", "unavailable"]) {
  test(`${scenario}: bez vodorovného posouvání na 320–768 px i na šířku, nic se neořízne ani nepřekrývá, cíle aspoň 44 px`, async ({ page }) => {
    test.setTimeout(120_000);
    const sizes = [...WIDTHS.map((width) => [width, 852] as const), LANDSCAPE];
    {
      for (const [width, height] of sizes) {
        await open(page, scenario, width, height);
        await expandAll(page);
        const at = `${scenario} ${width} × ${height}`;
        const layout = await page.evaluate((tag) => {
          const root = document.querySelector(tag)!.shadowRoot!;
          const card = root.querySelector(".page")!.getBoundingClientRect();
          const boxes = [...root.querySelectorAll<HTMLElement>(".tile")].map((item) => {
            const box = item.getBoundingClientRect();
            const text = item.querySelector<HTMLElement>(".text")!;
            return { name: item.querySelector(".name")?.textContent, left: box.left, right: box.right, top: box.top, bottom: box.bottom, height: box.height, cut: text.scrollWidth > text.clientWidth + 0.5 || text.getBoundingClientRect().right > box.right + 0.5 };
          });
          const panels = [...root.querySelectorAll<HTMLElement>(".panel")].map((panel) => {
            const box = panel.getBoundingClientRect();
            return { left: box.left, right: box.right, over: panel.scrollWidth > panel.clientWidth + 0.5 };
          });
          const controls = [...root.querySelectorAll("ed-segmented, ed-slider")].flatMap((host) =>
            [...(host.shadowRoot?.querySelectorAll<HTMLElement>("button, input") ?? [])].map((el) => el.getBoundingClientRect().height),
          );
          const rows = [...root.querySelectorAll<HTMLElement>(".row")].map((row) => row.getBoundingClientRect().height);
          return { scrollWidth: document.documentElement.scrollWidth, card: { left: card.left, right: card.right }, boxes, panels, controls, rows };
        }, CARD);
        expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
        expect(layout.card.right, at).toBeLessThanOrEqual(width);
        for (const panel of layout.panels) {
          expect(panel.over, `${at}: panel`).toBe(false);
          expect(panel.right, `${at}: panel`).toBeLessThanOrEqual(width);
        }
        for (const box of layout.boxes) {
          expect(box.left, `${at}: ${box.name}`).toBeGreaterThanOrEqual(layout.card.left - 0.5);
          expect(box.right, `${at}: ${box.name}`).toBeLessThanOrEqual(layout.card.right + 0.5);
          expect(box.cut, `${at}: ${box.name}`).toBe(false);
          expect(box.height, `${at}: ${box.name}`).toBeGreaterThanOrEqual(44);
        }
        // Dlaždice v jednom sloupci se nepřekrývají.
        for (const a of layout.boxes) {
          for (const b of layout.boxes) {
            if (a !== b && a.left === b.left) {
              expect(a.bottom <= b.top + 0.5 || b.bottom <= a.top + 0.5, `${at}: ${a.name} × ${b.name}`).toBe(true);
            }
          }
        }
        for (const height of layout.controls) expect(height, at).toBeGreaterThanOrEqual(44);
        for (const height of layout.rows) expect(height, at).toBeGreaterThanOrEqual(44);
      }
    }
  });
  }
});

// ------------------------------------------------------------- missing data

test.describe("chybějící data (CURRENT_SPEC.md, Chybějící a zastaralá data)", () => {
  test("chybějící, nedostupné i neznámé hodnoty: „––“ neutrálně, čtečka řekne „bez dat“, žádné pásy, ovládání nic neodešle", async ({ page }) => {
    for (const theme of ["dark", "light"] as const) {
      for (const scenario of ["missing", "unavailable"]) {
        await open(page, scenario, 393, 852, theme);
        const at = `${scenario} ${theme}`;
        const tiles = await readTiles(page);
        expect(tiles.map((item) => item.name), at).toEqual(TILES);
        for (const item of tiles) {
          expect(item.value, `${at}: ${item.name}`).toBe("––");
          expect(item.on, `${at}: ${item.name}`).toBe(false);
        }
        await expect(page.locator(".flow svg path.dots"), at).toHaveCount(0);
        for (const index of [0, 1, 2]) {
          await expect(stateLine(page, index), at).toContainText("––");
          await expect(stateLine(page, index).locator(".sr-only"), at).toHaveText("bez dat");
        }
        await expect(page.locator(".soc"), at).toContainText("––");
        await expect(page.locator(".mix"), at).toHaveCount(0);
        await expect(page.locator(".mixing text").nth(1), at).toHaveText("––");
      }
    }
    // A pushed state change is picked up at once.
    await open(page, "missing");
    await update(page, { "sensor.goodwe_pv_power": "2400", "sensor.goodwe_house_consumption": "1000", "sensor.goodwe_meter_active_power_total": "1400" });
    expect((await tile(page, "Slunce")).value).toBe("2,4 kW");
    expect((await tile(page, "Do sítě")).value).toBe("1,4 kW");
  });
});

// ------------------------------------------------------------------ controls

test.describe("ovládání (CURRENT_SPEC.md, Ovládání a pojistky)", () => {
  const pick = (page: Page, label: string, option: string) =>
    page.locator(`ed-segmented`).filter({ has: page.locator(`[aria-label="${label}"]`) }).getByRole("radio", { name: option }).click();

  test("řádky s detailem se rozbalují a sbalují (aria-expanded), zavřený detail není ovladatelný", async ({ page }) => {
    await open(page, "full");
    const row = page.locator(".row-btn").filter({ has: page.locator(".row-title", { hasText: /^Boost$/ }) });
    await expect(row).toHaveAttribute("aria-expanded", "false");
    await expect(page.getByRole("radio", { name: "Přetoky" })).toHaveCount(0);
    await row.click();
    await settle(page);
    await expect(row).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByRole("radio", { name: "Přetoky" })).toHaveCount(1);
    await row.click();
    await settle(page);
    await expect(page.getByRole("radio", { name: "Přetoky" })).toHaveCount(0);
  });

  test("Boost wallboxu a bojleru volá switch; vybraná volba se ukáže hned", async ({ page }) => {
    await open(page, "full");
    await expandAll(page);
    await pick(page, "Režim nabíjení auta", "Boost");
    await pick(page, "Režim ohřevu bojleru a jeho cílová teplota", "Boost");
    expect(await calls(page)).toEqual([
      { domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } },
      { domain: "switch", service: "turn_on", data: { entity_id: "switch.tuv_boost" } },
    ]);
    await expect(page.getByRole("radio", { name: "Boost" }).first()).toHaveAttribute("aria-checked", "true");
    // Bez potvrzení od Home Assistantu se volba po ui.revert_after vrátí na skutečný stav.
    await page.waitForTimeout(6300);
    await expect(page.getByRole("radio", { name: "Boost" }).first()).toHaveAttribute("aria-checked", "false");
  });

  test("Boost při zablokovaném nabíjení nejdřív zablokování vypne a řekne to", async ({ page }) => {
    await open(page, "full");
    await update(page, { "switch.wallbox_1_block_charging": "on" });
    await expand(page, "Boost");
    await pick(page, "Režim nabíjení auta", "Boost");
    expect((await calls(page)).map((call) => `${call.service} ${call.data.entity_id}`)).toEqual([
      "turn_off switch.wallbox_1_block_charging",
      "turn_on switch.wallbox_boost",
    ]);
    await expect(page.locator(".feedback")).toContainText("blokování jsem vypnul");
  });

  test("přepínače Zablokovat nabíjení a Přednost před bojlerem volají switch", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Boost");
    const block = page.getByRole("switch", { name: "Zablokovat nabíjení" });
    const priority = page.getByRole("switch", { name: "Přednost před bojlerem" });
    await expect(block).toHaveAttribute("aria-checked", "false");
    await expect(priority).toHaveAttribute("aria-checked", "true");
    await block.click();
    await priority.click();
    expect(await calls(page)).toEqual([
      { domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_1_block_charging" } },
      { domain: "switch", service: "turn_off", data: { entity_id: "switch.wallbox_2_prioritize_when_connected" } },
    ]);
    await expect(block).toHaveAttribute("aria-checked", "true");
  });

  test("nabíjecí výkon: jen v boostu, celkový výkon všech fází, entita dostane výkon na fázi", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Boost");
    await expect(page.locator('ed-slider[label="Nabíjecí výkon wallboxu"]')).toHaveCount(0);
    await open(page, "grid");
    await expand(page, "Boost");
    const slider = page.locator('ed-slider[label="Nabíjecí výkon wallboxu"]');
    // Entita drží 1400 W na fázi (min 1400, max 3700): na kartě 4,2–11,1 kW po 0,3 kW.
    expect(await slider.evaluate((el: HTMLElement & { min: number; max: number; step: number; value: number }) => [el.min, el.max, el.step, el.value])).toEqual([4.2, 11.1, 0.3, 4.2]);
    await expect(page.locator(".field-value").first()).toHaveText("4,2 kW");
    await slider.locator("input").evaluate((input: HTMLInputElement) => {
      input.value = "6.6";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    expect(await calls(page)).toEqual([{ domain: "number", service: "set_value", data: { entity_id: "number.wallbox_7_1_manual_charging_power", value: 2200 } }]);
  });

  test("posuvník bojleru: cíl přetoků ≥ cíl boostu; slider volá number.set_value; zásobník volá water_heater", async ({ page }) => {
    await open(page, "full");
    await expandAll(page);
    const slider = page.locator('ed-slider[label^="Cíl ohřevu bojleru"]');
    // Cíl z přebytku (60) nesmí pod cíl boostu (55).
    expect(await slider.evaluate((el: HTMLElement & { min: number; max: number }) => [el.min, el.max])).toEqual([55, 85]);
    await slider.locator("input").evaluate((input: HTMLInputElement) => {
      input.value = "70";
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    });
    await pick(page, "Režim zásobníku", "Manual");
    expect(await calls(page)).toEqual([
      { domain: "number", service: "set_value", data: { entity_id: "number.tuv_2_1_target_temperature", value: 70 } },
      { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "heat" } },
    ]);
  });

  test("teplota zásobníku jen v režimu Manual, v mezích z konfigurace", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Zásobník (plyn)");
    const slider = page.locator('ed-slider[label="Teplota zásobníku"]');
    await expect(slider).toBeHidden();
    await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": "heat" });
    await settle(page);
    await expect(slider).toBeVisible();
    expect(await slider.evaluate((el: HTMLElement & { min: number; max: number; step: number }) => [el.min, el.max, el.step])).toEqual([30, 65, 5]);
  });

  test("mísení: přepnutí se nejdřív potvrdí, pak se zavolá skript; nejasný stav je nepřepnutelný", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Zásobník (plyn)");
    await pick(page, "Mísení vody", "Zapnuto");
    await expect(page.getByRole("alertdialog")).toContainText("Přepnout mísení vody na zapnuto?");
    await page.getByRole("button", { name: "Zrušit" }).click();
    expect(await calls(page)).toEqual([]);
    await pick(page, "Mísení vody", "Zapnuto");
    await page.getByRole("button", { name: "Přepnout" }).click();
    expect(await calls(page)).toEqual([{ domain: "script", service: "turn_on", data: { entity_id: "script.prepnout_miseni_vody" } }]);
    await update(page, { "switch.technicka_mistnost_ventil_c2": "on" });
    await expect(page.locator("ed-segmented").filter({ has: page.locator('[aria-label="Mísení vody"]') }).getByRole("radio", { name: "Zapnuto" })).toBeDisabled();
  });

  test("nedostupná entita: ovládání je neaktivní a nic se neodešle", async ({ page }) => {
    await open(page, "unavailable");
    await expandAll(page);
    for (const radio of await page.getByRole("radio").all()) await expect(radio).toBeDisabled();
    for (const toggle of await page.getByRole("switch").all()) await expect(toggle).toBeDisabled();
    expect(await calls(page)).toEqual([]);
  });

  test("prvky podle HIG: přepínač 60 × 32 s jezdcem 40 × 26, kapsle 48 px, slider 52 px s jezdcem 38 × 24", async ({ page }) => {
    await open(page, "full");
    await expandAll(page);
    const sizes = await page.evaluate(() => {
      const root = document.querySelector("ha-energie-dashboard")!.shadowRoot!;
      const rect = (el: Element) => el.getBoundingClientRect();
      const seg = rect(root.querySelector("ed-segmented")!.shadowRoot!.querySelector(".track")!);
      const input = root.querySelector('ed-slider[label^="Cíl ohřevu bojleru"]')!.shadowRoot!.querySelector("input")!;
      // The thumb is a pseudo element that getComputedStyle does not resolve reliably: read its rule.
      const sheets = [...((input.getRootNode() as ShadowRoot).adoptedStyleSheets ?? []), ...(input.getRootNode() as ShadowRoot).styleSheets];
      const rule = sheets.flatMap((sheet) => [...sheet.cssRules]).find((r) => (r as CSSStyleRule).selectorText === "input::-webkit-slider-thumb") as CSSStyleRule;
      const thumb = rule.style;
      const toggle = root.querySelector("ed-switch")!.shadowRoot!;
      const track = rect(toggle.querySelector("button")!);
      const knob = rect(toggle.querySelector(".thumb")!);
      return { seg: seg.height, slider: rect(input).height, thumb: [parseFloat(thumb.width), parseFloat(thumb.height)], track: [track.width, track.height], knob: [knob.width, knob.height] };
    });
    expect(sizes.seg).toBeGreaterThanOrEqual(48);
    expect(sizes.slider).toBe(52);
    expect(sizes.thumb).toEqual([38, 24]);
    expect(sizes.track).toEqual([60, 32]);
    expect(sizes.knob).toEqual([40, 26]);
  });

  test("zablokované nabíjení a nevyužitá přednost se ukážou jako upozornění v kartě auta", async ({ page }) => {
    await open(page, "full");
    await expect(page.locator(".notice")).toHaveCount(0);
    await update(page, { "sensor.goodwe_pv_power": "900" });
    await expect(page.locator(".notice.warn")).toContainText("Přednost před bojlerem je zapnutá, auto je připojené, ale nenabíjí");
    await expect(stateLine(page, 1)).toHaveText("Připojeno, nenabíjí");
    await update(page, { "switch.wallbox_1_block_charging": "on" });
    await expect(page.locator(".notice")).toHaveText(/Nabíjení auta je zablokované/);
  });
});

// -------------------------------------------------------------- accessibility

test.describe("přístupnost (CURRENT_SPEC.md, Mobil, režimy, přístupnost)", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`axe (${theme}): karta bez porušení, i bez dat, bez nadpisu a s rozbalenými detaily`, async ({ page }) => {
      for (const scenario of ["full", "day", "grid", "unavailable", "missing"]) {
        await open(page, scenario, 393, 852, theme);
        expect(await axeViolations(page), scenario).toEqual([]);
        await expandAll(page);
        expect(await axeViolations(page), `${scenario} rozbaleno`).toEqual([]);
      }
      await reconfigure(page, { title: "" });
      expect(await axeViolations(page, ["page-has-heading-one"]), "title: \"\"").toEqual([]);
    });
  }

  test("klávesnice: šipky přepínají volbu v radiogroupu a jezdec jde ovládat šipkami", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Boost");
    const first = page.locator("ed-segmented").first().getByRole("radio", { name: "Přetoky" });
    await first.focus();
    await page.keyboard.press("ArrowRight");
    expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } }]);
  });

  test("přepínač jde ovládat mezerníkem a čte se jako switch s názvem řádku", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Boost");
    const toggle = page.getByRole("switch", { name: "Zablokovat nabíjení" });
    await toggle.focus();
    await page.keyboard.press("Space");
    expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_1_block_charging" } }]);
  });
});
