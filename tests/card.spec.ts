import { readFileSync } from "node:fs";
import { parse } from "yaml";
import { axeViolations as kitAxeViolations } from "ha-dashboard-kit/testing/helpers.mjs";
import { expect, test } from "./fixtures";
import type { Page } from "./fixtures";
import { CONFIG_KEYS } from "../src/config-schema";

// Browser tests of the Energie Dashboard card against tests/harness.html (fake hass data).
// Every case names the spec section it guards. `npm test` builds the card first;
// `npm run coverage` shows which code of src/ the tests execute.

const WIDTHS = [320, 360, 375, 393, 430, 768];
const LANDSCAPE = [852, 393] as const;
const TILES = ["sun", "bat", "grid", "house", "car", "boil", "batIn", "gridOut"];
const CARD = "ha-energie-dashboard";

// ------------------------------------------------------------------ helpers

async function open(page: Page, scenario = "full", width = 393, height = 852, theme: "dark" | "light" = "dark", lang = "cs"): Promise<void> {
  await page.setViewportSize({ width, height });
  await page.goto(`/tests/harness.html?s=${scenario}${theme === "light" ? "&theme=light" : ""}&lang=${lang}`);
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
  await settle(page);
  return kitAxeViolations(page, skip);
}

/** What every tile shows: key, visible value and the label a screen reader gets. */
const readTiles = (page: Page) =>
  page.evaluate((tag) => {
    const root = document.querySelector(tag)!.shadowRoot!;
    return [...root.querySelectorAll<HTMLElement>(".tile")].map((tile) => ({
      key: tile.dataset.tile!,
      name: tile.querySelector(".name")?.textContent?.trim(),
      value: tile.querySelector(".value")?.textContent?.trim(),
      aria: tile.getAttribute("aria-label"),
      on: tile.classList.contains("on"),
      style: tile.getAttribute("style") ?? "",
    }));
  }, CARD);

const tile = async (page: Page, key: string) => (await readTiles(page)).find((item) => item.key === key)!;
const tileKeys = async (page: Page) => (await readTiles(page)).map((item) => item.key);

/** Service calls the card made on the fake hass. */
const calls = (page: Page) =>
  page.evaluate(() => {
    // @ts-expect-error test hook
    return window.__test.calls as Array<{ domain: string; service: string; data: Record<string, unknown> }>;
  });

/** Opens a detail (fold) by the title of its row button and waits for the animation. */
async function expand(page: Page, title: string): Promise<void> {
  const row = page.locator(".row-btn, .rowbtn").filter({ hasText: title }).first();
  if ((await row.getAttribute("aria-expanded")) !== "true") await row.click();
  await settle(page);
}

const expandAll = async (page: Page) => {
  for (const title of ["Wallbox", "Cílové teploty", "Teplota"]) {
    const row = page.locator(".row-btn, .rowbtn").filter({ hasText: title }).first();
    if ((await row.count()) && (await row.getAttribute("aria-expanded")) !== "true") await row.click();
  }
  await settle(page);
};

/** The sentence of the n-th state line (0 Elektřina, 1 auto, 2 voda). */
const stateLine = (page: Page, index: number) => page.locator(".state").nth(index);

const update = (page: Page, changes: Record<string, string | { state: string; attributes: Record<string, unknown> }>) =>
  page.evaluate((value) => {
    // @ts-expect-error test hook
    window.__test.update(value);
  }, changes);

/** Hold a protected control for longer than ui.hold_ms. */
const hold = (locator: ReturnType<Page["locator"]>) => locator.click({ delay: 700 });

const alertTitles = (page: Page) => page.locator(".alert .row-title").allTextContents();

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
      // Without title, titles, numbers, colours and the scale: the defaults must be the values of the example.
      const bare = structuredClone(config);
      for (const key of ["title", "titles", "flows", "scale", "ui", "colors", "water"]) delete bare[key];
      for (const [section, keys] of Object.entries({
        battery: ["reserve"], car: ["charge_limit", "image_scale"],
        wallbox: ["phases", "power_min", "power_max", "power_step", "priority_min_sun"],
        boiler: ["show", "target_min", "target_max", "target_step", "hold_minutes"],
        tank: ["temp_min", "temp_max", "temp_step"],
      })) for (const key of keys) delete bare[section][key];
      return [normalized(config), normalized(bare)];
    }, example());
    expect(explicit).toEqual(implicit);
    const settings = JSON.parse(explicit);
    expect(settings.entities.boiler.boost_target_temperature).toBe("number.tuv_2_2_boost_target_temperature");
    expect(settings.entities.daily.pv_generation).toBe("sensor.energie_fve_dnes");
    expect(settings.num.wallbox.power_max).toBe(11100);
    expect(settings.num.flows.idle_threshold).toBe(100);
    expect(settings.num.ui).toEqual({ revert_after: 6, hold_ms: 550, double_tap_ms: 400, hint_seconds: 3 });
    expect(settings.tempScale).toHaveLength(5);
    expect(settings.boilerShow).toBe("heating");
  });

  test("konfigurace: chybné hodnoty, čísla, nadpisy, barvy a limity", async ({ page }) => {
    test.setTimeout(90000);
    await test.step("chybná hodnota zastaví kartu srozumitelnou chybou s názvem klíče; prázdná hodnota = výchozí", async () => {
      await open(page, "full");
      const cases: Array<[Record<string, unknown>, RegExp]> = [
        [{ wallbox: { boots: "switch.wallbox_boost" } }, /^Energie Dashboard: wallbox: unknown key "boots" \(allowed: power, status, boost, block_charging, prioritize_connected, charging_power, phases, /],
        [{ wallbox: { boost: "sensor.wallbox_boost" } }, /wallbox\.boost must be a switch entity \(switch\.…\), not sensor\.wallbox_boost/],
        [{ wallbox: { charging_power: "sensor.wallbox_power" } }, /wallbox\.charging_power must be a number entity/],
        [{ boiler: { boost: "input_boolean.tuv_boost" } }, /boiler\.boost must be a switch entity/],
        [{ boiler: { target_temperature: "sensor.tuv_cil" } }, /boiler\.target_temperature must be a number entity/],
        [{ boiler: { show: "sometimes" } }, /boiler\.show must be one of/],
        [{ tank: { water_heater: "climate.tepla_voda" } }, /tank\.water_heater must be a water_heater entity/],
        [{ car: { image: "sensor.obrazek" } }, /car\.image must be a image entity/],
        [{ mixing: { valve_c1: "switch.ventil", valve_c2: "switch.ventil" } }, /mixing\.valve_c1 and mixing\.valve_c2 must be two different valves/],
        [{ daily: { car: "Sensor Auto" } }, /daily\.car must be an entity ID/],
        [{ language: "de" }, /language must be one of auto, cs, en, sv/],
        [{ pv: "sensor.goodwe_pv_power" }, /"pv" must be a mapping of keys/],
        [{ pv: { power: "Sensor.GoodWe PV" } }, /pv\.power must be an entity ID/],
        [{ battery: { power: 351 } }, /battery\.power must be an entity ID/],
        [{ car: { soc: "sensor.parkovani_bmw_i3_soc" } }, /car: unknown key "soc" \(allowed: state_of_charge, range, image, charge_limit, image_scale, link\)/],
        [{ car: { image_scale: 5 } }, /car\.image_scale must be a number from 0\.5 to 3/],
        [{ title: 5 }, /title must be a text/],
        [{ titles: { car: "" } }, /titles\.car must be a non-empty text/],
        [{ titles: { auto: "Auto" } }, /titles: unknown key "auto"/],
        [{ battery: { reserve: "20" } }, /battery\.reserve must be a number \(% battery reserve\)/],
        [{ battery: { reserve: 120 } }, /battery\.reserve must be a number from 0 to 100 \(% battery reserve\), not 120/],
        [{ wallbox: { phases: 2.5 } }, /wallbox\.phases must be a whole number from 1 to 3/],
        [{ wallbox: { power_min: 12000, power_max: 4000 } }, /wallbox\.power_min \(12000\) must be below wallbox\.power_max \(4000\)/],
        [{ water: { gauge_min: 60, gauge_max: 30 } }, /water\.gauge_min \(60\) must be below water\.gauge_max \(30\)/],
        [{ ui: { hold_ms: 10 } }, /ui\.hold_ms must be a whole number from 200 to 3000/],
        [{ flows: { idle: 5 } }, /flows: unknown key "idle"/],
        [{ scale: { sun: 0 } }, /scale\.sun must be a number from 100/],
        [{ colors: { sun: "yellow" } }, /colors\.sun must be a colour like #FFD60A/],
        [{ colors: { button: "#FFFFFF" } }, /colors: unknown key "button"/],
        [{ colors: { temp_scale: [{ temp: 20, color: "#0A84FF" }] } }, /colors\.temp_scale must be a list of at least two points/],
        [{ colors: { temp_scale: [{ temp: 50, color: "#0A84FF" }, { temp: 20, color: "#FF453A" }] } }, /colors\.temp_scale: temperatures must rise/],
      ];
      for (const [patch, message] of cases) {
        expect(await configError(page, patch), JSON.stringify(patch)).toMatch(message);
      }
      expect(await configError(page, ["pv"] as unknown as Record<string, unknown>, true)).toMatch(/configuration must be a mapping/);
      const accepted: Array<[Record<string, unknown>, boolean]> = [
        [{ title: "" }, false],
        [{ title: null, pv: null, battery: { power: null, state_of_charge: null, reserve: null }, mixing: { valve_c1: null }, colors: null, flows: { kw_from: null }, daily: null }, false],
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
    await test.step("čísla, nadpisy a barvy z konfigurace se projeví na kartě", async () => {
      await open(page, "day");
      const config = example();
      await reconfigure(page, {
        titles: { electricity: "Proud", car: "Moje auto", water: "Voda" },
        car: { ...config.car, charge_limit: 90 },
        flows: { ...config.flows, kw_from: 100000 },
        colors: { ...config.colors, sun: "#FF0000" },
      });
      await expect(page.locator(".panel h2")).toHaveText(["Proud", "Moje auto", "Voda"]);
      await expect(page.locator(".meter .limit")).toHaveAttribute("style", /calc\(.*\* 0\.9 \+ 16px\)/);
      await expect(page.locator(".meter-label")).toContainText("limit 90 %");
      await expect(page.locator(".page")).toHaveAttribute("style", /--ed-sun:#FF0000/);
      expect((await tile(page, "sun")).value).toMatch(/^6\s800 W$/);
    });
    await test.step("flows.decimals: 2 a auto: kW na dvě desetinná místa, nebo aspoň tři číslice (11,3 · 6,43 · 1,36), v diagramu, autu i bojleru; W zůstanou celé; vejde se na 320 px", async () => {
      await open(page, "day");
      const config = example();
      await reconfigure(page, { flows: { ...config.flows, decimals: 1 } });
      expect((await tile(page, "sun")).value).toBe("6,8 kW");
      await reconfigure(page, { flows: { ...config.flows, decimals: 2 } });
      const values = await Promise.all(["sun", "grid", "house", "car", "boil"].map(async (key) => (await tile(page, key)).value));
      for (const value of values.filter((text) => text.includes("kW"))) expect(value).toMatch(/^\d+[,.]\d{2} kW$/);
      expect((await tile(page, "sun")).value).toBe("6,80 kW");
      expect((await tile(page, "car")).aria).toMatch(/\d,\d{2} kW/);
      await page.setViewportSize({ width: 320, height: 852 });
      await settle(page);
      await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(320);
      const cut = await page.evaluate((tag) => {
        const root = document.querySelector(tag)!.shadowRoot!;
        return [...root.querySelectorAll<HTMLElement>(".tile .text")].map((text) => text.scrollWidth > text.clientWidth + 0.5 || text.getBoundingClientRect().right > text.closest(".tile")!.getBoundingClientRect().right + 0.5);
      }, CARD);
      expect(cut).not.toContain(true);
      await reconfigure(page, { flows: { ...config.flows, decimals: "auto" } });
      for (const [watts, shown] of [["11340", "11,3 kW"], ["6430", "6,43 kW"], ["1360", "1,36 kW"], ["9996", "10,0 kW"]]) {
        await update(page, { "sensor.goodwe_pv_power": watts });
        expect((await tile(page, "sun")).value, `auto ${watts} W`).toBe(shown);
      }
      await update(page, { "sensor.goodwe_pv_power": "6800" });
      await reconfigure(page, { flows: { ...config.flows, decimals: 2, kw_from: 100000 } });
      expect((await tile(page, "sun")).value).toMatch(/^6\s800 W$/);
      await expect(reconfigure(page, { flows: { ...config.flows, decimals: 3 } })).rejects.toThrow();
    });
    await test.step("limit nabíjení 100 % se v měřiči nekreslí; práh toku z konfigurace rozhoduje, co je tok", async () => {
      await open(page, "day");
      await expect(page.locator(".meter .limit")).toHaveCount(0);
      await update(page, { "sensor.goodwe_battery_power": "-90" }); // pod 100 W: baterie nenabíjí
      expect((await tile(page, "batIn")).on).toBe(false);
      const config = example();
      await reconfigure(page, { flows: { ...config.flows, idle_threshold: 50 } });
      expect((await tile(page, "batIn")).on).toBe(true);
    });
  });
});

// ------------------------------------------------------------------ flows

test.describe("toky energie (CURRENT_SPEC.md, Karta Elektřina = Sankey)", () => {
  test("toky: poledne, večer, boost ze sítě a šum pod prahem", async ({ page }) => {
    test.setTimeout(120000);
    await test.step("poledne: hodnoty ve všech dlaždicích v jedné jednotce, pásy podle zdrojů, věta o stavu", async () => {
      await open(page, "day");
      const tiles = await readTiles(page);
      expect(tiles.map((item) => item.key)).toEqual(TILES);
      const shown = Object.fromEntries(tiles.map((item) => [item.key, item.value]));
      // Dům = spotřeba bez auta (4,1 kW) a bojleru (1,2 kW): 5,8 − 5,3 = 0,5 kW; všude kW s aspoň třemi číslicemi (flows.decimals: auto).
      expect(shown).toMatchObject({ sun: "6,80 kW", car: "4,10 kW", boil: "1,20 kW", house: "0,50 kW", batIn: "0,80 kW", gridOut: "0,20 kW" });
      expect(shown.bat).toBe("nevybíjí");
      expect(shown.grid).toBe("neodebírá");
      await expect(stateLine(page, 0)).toContainText("Slunce nabíjí baterii i auto");
      await expect(page.locator(".flow svg path.dots")).toHaveCount(5);
      const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
      expect(new Set(fills)).toEqual(new Set(["url(#rg-sun)"]));
    });
    await test.step("večer: dům z baterie a sítě, bez slunce; malé hodnoty ve W; Auto jen připojené", async () => {
      await open(page, "full");
      const shown = Object.fromEntries((await readTiles(page)).map((item) => [item.key, item.value]));
      expect(shown).toMatchObject({ sun: "bez výroby", bat: "351 W", grid: "148 W", house: "459 W", car: "připojeno", boil: "bez ohřevu", batIn: "nenabíjí", gridOut: "nedodává" });
      await expect(stateLine(page, 0)).toContainText("Dům bere z baterie a sítě");
      // Dům: barva největšího zdroje a pruh s podíly zdrojů dole (žádný duhový přechod).
      const house = (await tile(page, "house")).style;
      expect(house).toContain("bottom / 100% 4px");
      expect(house).toContain("--ed-battery");
      expect(house).toContain("--ed-grid");
      expect(house).not.toContain("135deg");
      const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
      expect(new Set(fills)).toEqual(new Set(["url(#rg-bat)", "url(#rg-grid)"]));
    });
    await test.step("boost ze sítě: dům jede ze sítě, pásy ze sítě k autu a bojleru; dům jede ze sítě není upozornění", async () => {
      await open(page, "grid");
      await expect(stateLine(page, 0)).toContainText("Dům jede ze sítě");
      expect((await tile(page, "grid")).value).toBe("10,3 kW");
      expect((await tile(page, "car")).aria).toBe("Auto 5,30 kW, nabíjí, nabití 50 %");
      const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
      expect(fills.filter((fill) => fill === "url(#rg-grid)").length).toBe(3);
    });
    await test.step("zdroje plní spotřebiče popořadě, pásy se nekříží: Slunce → Dům a Auto, Baterie → Auto, Síť → Auto; totéž v Odkud auto nabíjí", async () => {
      await open(page, "day");
      await update(page, { "sensor.goodwe_pv_power": "1870", "sensor.goodwe_battery_power": "2490", "sensor.goodwe_meter_active_power_total": "-230", "sensor.goodwe_house_consumption": "4650", "sensor.tuv_power_total": "0" });
      await expect(stateLine(page, 0)).toContainText("Dům bere ze slunce");
      const bands = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
      expect(bands.sort()).toEqual(["url(#rg-bat)", "url(#rg-grid)", "url(#rg-sun)", "url(#rg-sun)"]);
      // Barva dlaždice Dům = zdroje toku do Domu (jen slunce), ne celkový mix.
      const house = (await tile(page, "house")).style;
      expect(house).toContain("--ed-sun");
      expect(house).not.toContain("--ed-battery");
      expect(house).not.toContain("--ed-grid");
      const mix = page.locator(".mix-legend");
      await expect(mix).toContainText("Slunce");
      await expect(mix).toContainText("Baterie");
      await expect(mix).toContainText("Síť");
    });
    await test.step("šum pod prahem 100 W není tok: žádný pás, dlaždice nesvítí", async () => {
      await open(page, "full");
      await update(page, { "sensor.goodwe_battery_power": "60", "sensor.goodwe_meter_active_power_total": "-40", "sensor.goodwe_house_consumption": "99" });
      await expect(page.locator(".flow svg path.dots")).toHaveCount(0);
      for (const item of await readTiles(page)) expect(item.on, item.key).toBe(false);
    });
  });

  test("dlaždice: hladina, rezerva baterie a barva Domu", async ({ page }) => {
    test.setTimeout(90000);
    await test.step("hladina v dlaždici: baterie, auto a bojler jako výplň pozadí; baterie na rezervě oranžově", async () => {
      await open(page, "day");
      const bat = await tile(page, "batIn");
      expect(bat.style).toMatch(/linear-gradient\(90deg.*88\.0%/);
      expect(bat.style).not.toContain("--ed-warning");
      expect((await tile(page, "bat")).style).toContain("var(--ed-fill-idle)"); // nevybíjí: šedá výplň
      expect((await tile(page, "car")).style).toMatch(/--ed-car.*62\.0%|62\.0%.*--ed-car/);
      expect((await tile(page, "boil")).style).toMatch(/linear-gradient\(90deg/);
      await update(page, { "sensor.goodwe_battery_state_of_charge": "15" });
      expect((await tile(page, "batIn")).style).toContain("var(--ed-warning)");
      expect((await tile(page, "bat")).style).toContain("15.0%");
      // Na rezervě (20 %), ne „pod“: střídač pod rezervu nevybije (uživatel 29. 10.).
      await update(page, { "sensor.goodwe_battery_state_of_charge": "20" });
      await page.locator('.tile[data-tile="batIn"]').click();
      const pop = page.getByRole("dialog", { name: "Baterie" });
      await expect(pop).toContainText("na rezervě");
      await expect(pop).not.toContainText("pod rezervou");
      await page.keyboard.press("Escape");
    });
    await test.step("rezerva baterie se bere z nastavení střídače (100 − hloubka vybití), jinak z battery.reserve", async () => {
      await open(page, "day");
      await update(page, { "sensor.goodwe_battery_state_of_charge": "35" });
      expect((await tile(page, "batIn")).style).not.toContain("var(--ed-warning)"); // hloubka 80 % → rezerva 20 %
      await update(page, { "number.goodwe_depth_of_discharge_on_grid": "50" }); // rezerva 50 %
      expect((await tile(page, "batIn")).style).toContain("var(--ed-warning)");
      await update(page, { "number.goodwe_depth_of_discharge_on_grid": "unavailable" }); // záloha: battery.reserve 20 %
      expect((await tile(page, "batIn")).style).not.toContain("var(--ed-warning)");
    });
    await test.step("dlaždice Dům má barvu podle podílů zdrojů", async () => {
      await open(page, "full");
      const house = (await tile(page, "house")).style;
      expect(house).toContain("--ed-battery");
      expect(house).toContain("--ed-grid");
      expect(house).not.toContain("--ed-sun");
    });
  });

  test("Auto a Bojler v diagramu: skrývání a hold po ohřevu", async ({ page }) => {
    test.setTimeout(60000);
    await test.step("Auto jen když je připojené; Bojler při show: heating jen při ohřevu a hold_minutes po něm", async () => {
      await open(page, "full");
      expect(await tileKeys(page)).toEqual(TILES);
      await update(page, { "sensor.wallbox_charge_status": "Disconnected" });
      expect(await tileKeys(page)).toEqual(TILES.filter((key) => key !== "car"));
      await expect(page.locator(".flow")).toHaveAttribute("style", /height:\d+px/);
      await update(page, { "sensor.wallbox_charge_status": "Charging", "sensor.wallbox_total_power": "2000" });
      expect(await tileKeys(page)).toContain("car");
      // Disconnected, ale wallbox ještě dodává: dlaždice zůstane.
      await update(page, { "sensor.wallbox_charge_status": "Disconnected" });
      expect(await tileKeys(page)).toContain("car");

      // Výchozí nastavení z příkladu (boiler.show: heating): Bojler bez ohřevu a bez nedávného ohřevu zmizí.
      await reconfigure(page, { boiler: example().boiler });
      expect(await tileKeys(page)).not.toContain("boil");
      await update(page, { "sensor.tuv_power_total": "1500" });
      expect(await tileKeys(page)).toContain("boil");
      await reconfigure(page, { boiler: { ...example().boiler, show: "always" } });
      expect(await tileKeys(page)).toContain("boil");
      await update(page, { "sensor.tuv_power_total": "0" });

      // Bojler: show heating, ohřev dávno skončil.
      await page.addInitScript(() => localStorage.setItem("ha-energie-dashboard:boiler-heating", String(Date.now() - 3_600_000)));
      await open(page, "full");
      await reconfigure(page, { boiler: { ...example().boiler, show: "heating" } });
      expect(await tileKeys(page)).not.toContain("boil");
      await update(page, { "sensor.tuv_power_total": "1500" });
      expect(await tileKeys(page)).toContain("boil");
      await update(page, { "sensor.tuv_power_total": "0" });
      expect(await tileKeys(page), "po ohřevu ještě hold").toContain("boil");
      // Bez dat se dlaždice neschovává.
      await open(page, "unavailable");
      await reconfigure(page, { boiler: { ...example().boiler, show: "heating" } });
      expect(await tileKeys(page)).toContain("boil");
    });
    await test.step("hold po ohřevu přežije načtení stránky (localStorage), pozdě po ohřevu dlaždice zmizí", async () => {
      await page.addInitScript(() => localStorage.setItem("ha-energie-dashboard:boiler-heating", String(Date.now() - 5 * 60_000)));
      await open(page, "full");
      await reconfigure(page, { boiler: { ...example().boiler, show: "heating" } });
      expect(await tileKeys(page)).toContain("boil");
      await reconfigure(page, { boiler: { ...example().boiler, show: "heating", hold_minutes: 3 } });
      await page.evaluate(() => {
        // @ts-expect-error test hook
        window.__test.card.requestUpdate();
      });
      await expect.poll(async () => (await tileKeys(page)).includes("boil")).toBe(false);
    });
  });

  test("popovery: dlaždice a záhlaví", async ({ page }) => {
    test.setTimeout(60000);
    await test.step("popover dlaždice: dnešní součty, hladina; zavře se Escapem i klepnutím mimo", async () => {
      await open(page, "day");
      const sun = page.locator('.tile[data-tile="sun"]');
      await sun.click();
      const pop = page.getByRole("dialog", { name: "Slunce" });
      await expect(pop).toBeVisible();
      await expect(pop).toContainText("Dnes zatím");
      await expect(pop).toContainText("18,4 kWh");
      await expect(sun).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Escape");
      await expect(pop).toHaveCount(0);
      await page.locator('.tile[data-tile="batIn"]').click();
      const battery = page.getByRole("dialog", { name: "Baterie" });
      await expect(battery).toContainText("88 %");
      await expect(battery).toContainText("Dnes nabito");
      await expect(battery).toContainText("5,20 kWh");
      // Jen směr dlaždice: Do baterie ukáže nabito, ne vybito (a obráceně u Baterie).
      await expect(battery).not.toContainText("Dnes vybito");
      await page.locator(".scrim").click({ position: { x: 5, y: 5 } });
      await page.locator('.tile[data-tile="bat"]').click();
      const discharge = page.getByRole("dialog", { name: "Baterie" });
      await expect(discharge).toContainText("Dnes vybito");
      await expect(discharge).not.toContainText("Dnes nabito");
      await page.locator(".scrim").click({ position: { x: 5, y: 5 } });
      await expect(discharge).toHaveCount(0);
      await page.locator('.tile[data-tile="grid"]').click();
      const grid = page.getByRole("dialog", { name: "Síť" });
      await expect(grid).toContainText("Dnes odebráno");
      await expect(grid).not.toContainText("Dnes dodáno");
      await page.keyboard.press("Escape");
      await page.locator('.tile[data-tile="gridOut"]').click();
      const feedIn = page.getByRole("dialog", { name: "Do sítě" });
      await expect(feedIn).toContainText("Dnes dodáno");
      await expect(feedIn).not.toContainText("Dnes odebráno");
      await page.keyboard.press("Escape");
      // Auto bez čítače: „––“, ne vymyšlené číslo.
      await page.locator('.tile[data-tile="car"]').click();
      await expect(page.getByRole("dialog", { name: "Auto" })).toContainText("––");
    });
    await test.step("klepnutí na záhlaví: Dnes · kWh, Zdroje a Spotřeba; Dům je zbytek; bez čítačů auta a bojleru „––“", async () => {
      await open(page, "day");
      await page.locator(".title-btn").click();
      const day = page.getByRole("dialog", { name: /Dnes/ });
      await expect(day).toBeVisible();
      await expect(day.getByRole("list", { name: "Zdroje" })).toContainText("18,4");
      await expect(day.getByRole("list", { name: "Spotřeba" })).toContainText("––");
      await page.keyboard.press("Escape");
      const config = example();
      await reconfigure(page, { daily: { ...config.daily, car: "sensor.test_auto_dnes", boiler: "sensor.test_bojler_dnes" } });
      await page.locator(".title-btn").click();
      // 18,4 + 2,6 + 3,1 − 4,9 − 5,2 − 6,0 − 2,5 = 5,5 kWh; zdroje i spotřeba dají 24,1.
      const use = day.getByRole("list", { name: "Spotřeba" });
      await expect(use).toContainText("24,1");
      await expect(use.getByRole("listitem").first()).toContainText("5,50");
      await expect(day.getByRole("list", { name: "Zdroje" })).toContainText("24,1");
    });
  });
});

// ------------------------------------------------------------------ alerts

test.describe("upozornění (CURRENT_SPEC.md, Upozornění)", () => {
  test("upozornění: jen odchylky a Boosty", async ({ page }) => {
    test.setTimeout(60000);
    await test.step("jen skutečné odchylky; baterie na rezervě a dům na síti upozornění nejsou", async () => {
      await open(page, "full");
      await expect(page.locator(".alerts")).toHaveCount(0);
      await update(page, { "sensor.goodwe_battery_state_of_charge": "12" });
      await expect(page.locator(".alerts")).toHaveCount(0);
      await update(page, { "sensor.goodwe_pv_power": "900" });
      expect(await alertTitles(page)).toEqual(["Auto je připojené, ale nenabíjí"]);
      await update(page, { "switch.wallbox_1_block_charging": "on" });
      expect(await alertTitles(page)).toEqual(["Nabíjení auta je zablokované"]);
    });
    await test.step("Boost wallboxu (jen s připojeným autem) a Boost bojleru", async () => {
      await open(page, "grid");
      expect(await alertTitles(page)).toEqual(["Boost wallboxu je zapnutý", "Boost bojleru je zapnutý"]);
      await update(page, { "sensor.wallbox_charge_status": "Disconnected", "sensor.wallbox_total_power": "0" });
      expect(await alertTitles(page)).toEqual(["Boost bojleru je zapnutý"]);
    });
  });
});

// ------------------------------------------------------------------ panels

test.describe("karty auto a teplá voda (CURRENT_SPEC.md, Auto, Wallbox, Bojler, Zásobník, Mísení vody)", () => {
  test("karta auta: nabíjení, večer, boost ze sítě a měřič", async ({ page }) => {
    test.setTimeout(120000);
    await test.step("auto nabíjí ze slunce: stav, odkud auto nabíjí, řádek Wallbox, stáří dat", async () => {
      await open(page, "day");
      await expect(stateLine(page, 1)).toHaveText("Nabíjí ze slunce");
      await expect(page.locator(".soc")).toContainText("62");
      await expect(page.locator(".range")).toContainText("95 km");
      await expect(page.locator(".mix-head")).toContainText("Odkud auto nabíjí");
      await expect(page.locator(".mix-legend")).toContainText("Slunce100 %");
      await expect(page.locator(".row-btn .row-sub")).toContainText("nabíjí 4,10 kW");
      await expect(page.locator(".row-aside")).toHaveText("z auta právě teď");
      await expect(page.locator(".car-art img")).toHaveAttribute("src", /^data:image\/svg/);
      await expect(page.locator(".mode-sub")).toHaveText("Přetoky · jen z přebytku");
    });
    await test.step("večer: auto připojené, nenabíjí; bez „Odkud auto nabíjí“; odpojené", async () => {
      await open(page, "full");
      await expect(stateLine(page, 1)).toHaveText("Připojeno, nenabíjí");
      await expect(page.locator(".mix")).toHaveCount(0);
      await expect(page.locator(".row-btn .row-sub")).toHaveText("nenabíjí");
      await expect(stateLine(page, 2)).toHaveText("Bez ohřevu");
      await update(page, { "sensor.wallbox_charge_status": "Disconnected" });
      await expect(stateLine(page, 1)).toHaveText("Odpojeno");
      await expect(page.locator(".row-btn .row-sub")).toHaveCount(0); // řádek Wallbox se s odpojeným autem schová
      await expect(page.getByText("Zablokovat nabíjení")).toHaveCount(0);
    });
    await test.step("boost ze sítě: „Nabíjí ze sítě · Boost“ a „Bojler ohřívá ze sítě“, odchylka oranžově", async () => {
      await open(page, "grid");
      await expect(stateLine(page, 1)).toHaveText("Nabíjí ze sítě · Boost");
      await expect(stateLine(page, 2)).toHaveText("Bojler ohřívá ze sítě · Boost");
      expect(await stateLine(page, 1).evaluate((el) => (el as HTMLElement).style.getPropertyValue("--sc"))).toBe("var(--ed-warning)");
      await expect(page.locator(".mix-legend")).toContainText("Síť100 %");
      await expect(page.locator(".mode-sub")).toHaveText("Boost · bere i ze sítě a z baterie");
    });
    await test.step("měřič nabití auta: limit jen pod 100 %, popisek čtečky", async () => {
      await open(page, "day");
      await expect(page.locator(".meter")).toHaveAttribute("aria-label", "Nabití auta 62 %");
      // Deset bloků po 10 % s mezerou 2 px; 62 % = šest plných a sedmý z 20 %.
      expect(await page.locator(".meter > span > i").evaluateAll((bars) => bars.map((bar) => (bar as HTMLElement).style.width))).toEqual(["100%", "100%", "100%", "100%", "100%", "100%", "20%", "0%", "0%", "0%"]);
      expect(await page.locator(".meter").evaluate((el) => getComputedStyle(el).columnGap)).toBe("2px");
      await reconfigure(page, { car: { ...example().car, charge_limit: 80 } });
      await expect(page.locator(".meter")).toHaveAttribute("aria-label", "Nabití auta 62 %, limit 80 %");
    });
  });

  test("teplá voda: oblouky a mísení", async ({ page }) => {
    test.setTimeout(60000);
    await test.step("teplá voda: oblouky se stupnicí z konfigurace, cíl a výkon bojleru, zásobník ukazuje nastavenou teplotu", async () => {
      await open(page, "day");
      const arcs = page.locator(".arc");
      await expect(arcs).toHaveCount(2);
      await expect(arcs.nth(0).locator(".arc-num b")).toHaveText("52");
      await expect(arcs.nth(0)).toHaveAttribute("aria-label", /Bojler 52 °C, ohřívá výkonem 1,20 kW, cíl 60 °C, stupnice 15 až 65 °C/);
      await expect(arcs.nth(0).locator(".arc-min")).toHaveText("15");
      await expect(arcs.nth(0).locator(".arc-max")).toHaveText("65");
      await expect(page.locator(".source-line").nth(0)).toContainText("cíl 60 °C");
      await expect(arcs.nth(1).locator(".arc-num b")).toHaveText("40");
      await expect(page.locator(".source-line").nth(1)).toContainText("Auto · podle plánu");
      await expect(arcs.nth(1)).toHaveAttribute("aria-label", /naměřená teplota není/);
      // Off: oblouk ukazuje minimum, které kotel drží (tank.temp_min).
      await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": "off" });
      await expect(arcs.nth(1).locator(".arc-num b")).toHaveText("38");
      await expect(page.locator(".source-line").nth(1)).toContainText("Off");
      // Stejná teplota má na obou obloucích stejnou barvu (jedna stupnice).
      const colours = await arcs.evaluateAll((list) => list.map((arc) => [...arc.querySelectorAll("svg path")].map((path) => path.getAttribute("stroke"))));
      expect(colours[0].filter((c) => c !== "var(--ed-gauge-track)").length).toBeGreaterThan(colours[1].filter((c) => c !== "var(--ed-gauge-track)").length);
    });
    await test.step("mísení: kapsle mezi dlaždicemi podle ventilů; z nejasného stavu jde přepnout na mísení", async () => {
      await open(page, "full");
      const capsule = page.getByRole("group", { name: "Mísení vody" });
      const toggle = capsule.getByRole("switch", { name: "Mísení vody" });
      await expect(toggle).toHaveAttribute("aria-checked", "false");
      await expect(page.locator(".link.on")).toHaveCount(0);
      await update(page, { "switch.technicka_mistnost_ventil_c1": "off", "switch.technicka_mistnost_ventil_c2": "on" });
      await expect(toggle).toHaveAttribute("aria-checked", "true");
      await expect(page.locator(".link.on")).toHaveCount(2);
      await update(page, { "switch.technicka_mistnost_ventil_c1": "on", "switch.technicka_mistnost_ventil_c2": "on" });
      await expect(toggle).toBeEnabled();
      await expect(capsule).toContainText("nejasný stav ventilů");
      await toggle.dblclick();
      expect(await calls(page)).toEqual([
        { domain: "switch", service: "turn_off", data: { entity_id: "switch.technicka_mistnost_ventil_c1" } },
        { domain: "switch", service: "turn_on", data: { entity_id: "switch.technicka_mistnost_ventil_c2" } },
      ]);
    });
  });
});

// --------------------------------------------------------------------- layout

test.describe("rozložení (CURRENT_SPEC.md, Mobil)", () => {
  test("rozložení: bez vodorovného posouvání na 320–768 px i na šířku, nic se neořízne ani nepřekrývá, cíle aspoň 44 px (všechny scénáře)", async ({ page }) => {
    test.setTimeout(240000);
    for (const scenario of ["full", "day", "grid", "unavailable"]) {
      const sizes = [...WIDTHS.map((width) => [width, 852] as const), LANDSCAPE];
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
            return { name: item.dataset.tile, left: box.left, right: box.right, top: box.top, bottom: box.bottom, height: box.height, cut: text.scrollWidth > text.clientWidth + 0.5 || text.getBoundingClientRect().right > box.right + 0.5 };
          });
          const panels = [...root.querySelectorAll<HTMLElement>(".panel")].map((panel) => {
            const box = panel.getBoundingClientRect();
            // The enlarged car picture is meant to reach over the edge (and is clipped); nothing else may.
            const over = [...panel.querySelectorAll<HTMLElement>("*")].some((el) => !el.closest(".car-art") && el.getBoundingClientRect().width > 0 && (el.getBoundingClientRect().right > box.right + 0.5 || el.getBoundingClientRect().left < box.left - 0.5));
            return { left: box.left, right: box.right, over };
          });
          // The compact Auto | Manual | Off of the tank is 40 px by the design; everything else 44 px.
          const controls = [...root.querySelectorAll("ed-segmented:not([compact]), ed-slider")].flatMap((host) =>
            [...(host.shadowRoot?.querySelectorAll<HTMLElement>("button, input") ?? [])].map((el) => el.getBoundingClientRect().height),
          );
          const rows = [...root.querySelectorAll<HTMLElement>(".row, .rowbtn")].map((row) => row.getBoundingClientRect().height);
          const sources = [...root.querySelectorAll<HTMLElement>(".source")].map((el) => ({ over: el.scrollWidth > el.clientWidth + 0.5, right: el.getBoundingClientRect().right }));
          return { scrollWidth: document.documentElement.scrollWidth, card: { left: card.left, right: card.right }, boxes, panels, controls, rows, sources };
        }, CARD);
        expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
        expect(layout.card.right, at).toBeLessThanOrEqual(width);
        for (const panel of [...layout.panels, ...layout.sources]) {
          expect(panel.over, `${at}: panel`).toBe(false);
          expect(panel.right, `${at}: panel`).toBeLessThanOrEqual(width);
        }
        for (const box of layout.boxes) {
          expect(box.left, `${at}: ${box.name}`).toBeGreaterThanOrEqual(layout.card.left - 0.5);
          expect(box.right, `${at}: ${box.name}`).toBeLessThanOrEqual(layout.card.right + 0.5);
          expect(box.cut, `${at}: ${box.name}`).toBe(false);
          expect(box.height, `${at}: ${box.name}`).toBeGreaterThanOrEqual(44);
        }
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

  test("popover i nápověda nic neposunou ani nezvětší: výška stránky, panelů a poloha prvků zůstane stejná", async ({ page }) => {
    const layout = () =>
      page.evaluate((tag) => {
        const root = document.querySelector(tag)!.shadowRoot!;
        const boxes = [...root.querySelectorAll(".panel, .flow, .tile, .row, ed-segmented, ed-switch, h1, h2")].map((el) => {
          const r = el.getBoundingClientRect();
          return [Math.round(r.x * 10), Math.round((r.y + window.scrollY) * 10), Math.round(r.width * 10), Math.round(r.height * 10)].join(",");
        });
        return { boxes, page: document.documentElement.scrollHeight, width: document.documentElement.scrollWidth };
      }, CARD);
    for (const [scenario, width] of [["day", 320], ["day", 393], ["day", 768], ["full", 393], ["grid", 360]] as const) {
      await open(page, scenario, width);
      const before = await layout();
      for (const key of await tileKeys(page)) {
        await page.locator(`.tile[data-tile="${key}"]`).click();
        await page.waitForTimeout(250);
        expect(await layout(), `${scenario} ${width} ${key}`).toEqual(before);
        await page.keyboard.press("Escape");
      }
      await page.locator(".title-btn").click();
      await page.waitForTimeout(250);
      expect(await layout(), `${scenario} ${width} záhlaví`).toEqual(before);
      await page.keyboard.press("Escape");
    }
    await open(page, "full", 393);
    const before = await layout();
    for (const control of [page.getByRole("switch", { name: "Mísení vody" }), page.getByRole("radio", { name: "Boost" }).first()]) {
      await control.click();
      await expect(page.locator("div.hint").first()).toBeVisible();
      expect(await layout(), "nápověda").toEqual(before);
      await page.waitForTimeout(3300);
    }
  });
});

// ------------------------------------------------------------- missing data

test.describe("chybějící data (CURRENT_SPEC.md, Chybějící a zastaralá data)", () => {
  test("chybějící data: „––“ a denní součty bez čítačů", async ({ page }) => {
    test.setTimeout(60000);
    await test.step("chybějící, nedostupné i neznámé hodnoty: „––“ neutrálně, čtečka řekne „bez dat“, žádné pásy, ovládání nic neodešle", async () => {
      for (const theme of ["dark", "light"] as const) {
        for (const scenario of ["missing", "unavailable"]) {
          await open(page, scenario, 393, 852, theme);
          const at = `${scenario} ${theme}`;
          const tiles = await readTiles(page);
          expect(tiles.map((item) => item.key), at).toEqual(TILES);
          for (const item of tiles) {
            expect(item.value, `${at}: ${item.key}`).toBe("––");
            expect(item.on, `${at}: ${item.key}`).toBe(false);
            expect(item.aria, `${at}: ${item.key}`).toMatch(/bez dat/);
          }
          await expect(page.locator(".flow svg path.dots"), at).toHaveCount(0);
          for (const index of [0, 1, 2]) {
            await expect(stateLine(page, index), at).toContainText("––");
            await expect(stateLine(page, index).locator(".sr-only"), at).toHaveText("bez dat");
          }
          await expect(page.locator(".soc"), at).toContainText("––");
          await expect(page.locator(".mix"), at).toHaveCount(0);
          await expect(page.locator(".alerts"), at).toHaveCount(0);
          await expect(page.locator(".arc-num b"), at).toHaveText(["––", "––"]);
          await expect(page.getByRole("switch", { name: "Mísení vody" }), at).toBeDisabled();
          await expect(page.locator(".row-aside"), at).toHaveText("");
        }
      }
      await open(page, "missing");
      await update(page, { "sensor.goodwe_pv_power": "2400", "sensor.goodwe_house_consumption": "1000", "sensor.goodwe_meter_active_power_total": "1400" });
      expect((await tile(page, "sun")).value).toBe("2,40 kW");
      expect((await tile(page, "gridOut")).value).toBe("1,40 kW");
    });
    await test.step("denní součty bez čítačů: „––“ v popoveru i v záhlaví, žádné odhady", async () => {
      await open(page, "unavailable");
      await page.locator(".title-btn").click();
      const day = page.getByRole("dialog", { name: /Dnes/ });
      await expect(day.locator(".day-total b")).toHaveText(["––", "––"]);
    });
  });
});

// ------------------------------------------------------------------ controls

test.describe("ovládání (CURRENT_SPEC.md, Ovládání a pojistky)", () => {
  const radio = (page: Page, label: string, option: string) =>
    page.locator("ed-segmented").filter({ has: page.locator(`[aria-label="${label}"]`) }).getByRole("radio", { name: option });

  test("ovládání: Wallbox, chráněný přepínač, nápověda a obrázek auta", async ({ page }) => {
    test.setTimeout(120000);
    await test.step("Wallbox se rozbalí a sbalí (aria-expanded), zavřený detail není ovladatelný", async () => {
      await open(page, "full");
      const row = page.locator(".row-btn");
      await expect(row).toHaveAttribute("aria-expanded", "false");
      await expect(page.getByRole("switch", { name: "Zablokovat nabíjení" })).toHaveCount(0);
      await row.click();
      await settle(page);
      await expect(row).toHaveAttribute("aria-expanded", "true");
      await expect(page.getByRole("switch", { name: "Zablokovat nabíjení" })).toHaveCount(1);
      await row.click();
      await settle(page);
      await expect(page.getByRole("switch", { name: "Zablokovat nabíjení" })).toHaveCount(0);
    });
    await test.step("chráněný přepínač (Mísení): jedno klepnutí jen ukáže nápovědu, podržení přepne", async () => {
      await open(page, "full");
      const toggle = page.getByRole("switch", { name: "Mísení vody" });
      await toggle.click();
      expect(await calls(page)).toEqual([]);
      await expect(page.locator("ed-switch .hint")).toContainText("Podržte nebo klepněte dvakrát.");
      await page.waitForTimeout(3300);
      await expect(page.locator("ed-switch .hint")).toHaveCount(0);
      await hold(toggle);
      expect(await calls(page)).toEqual([
        { domain: "switch", service: "turn_off", data: { entity_id: "switch.technicka_mistnost_ventil_c1" } },
        { domain: "switch", service: "turn_on", data: { entity_id: "switch.technicka_mistnost_ventil_c2" } },
      ]);
    });
    await test.step("nápověda chráněných ovladačů je nad ovladačem a celá v panelu (320, 393 a 768 px)", async () => {
      for (const width of [320, 393, 768]) {
        await open(page, "full", width);
        const controls = [
          page.getByRole("switch", { name: "Mísení vody" }),
          radio(page, "Režim ohřevu bojleru", "Boost"),
          radio(page, "Režim nabíjení auta", "Boost"),
        ];
        for (const control of controls) {
          await control.scrollIntoViewIfNeeded();
          await control.click();
          const hint = page.locator("div.hint").first();
          await expect(hint).toBeVisible();
          await page.waitForTimeout(250);
          const box = (await hint.boundingBox())!;
          const target = (await control.boundingBox())!;
          expect(box.y + box.height, "nad ovladačem").toBeLessThanOrEqual(target.y + 1);
          expect(box.x, "vlevo v okně").toBeGreaterThanOrEqual(0);
          expect(box.x + box.width, "vpravo v okně").toBeLessThanOrEqual(width);
          const panels = await page.locator(".panel").evaluateAll((items) => items.map((item) => item.getBoundingClientRect().toJSON()));
          expect(panels.some((p) => box.x >= p.x - 1 && box.x + box.width <= p.x + p.width + 1 && box.y >= p.y - 1 && box.y + box.height <= p.y + p.height + 1), "celá v panelu").toBe(true);
          await page.waitForTimeout(3300);
        }
      }
    });
    await test.step("obrázek auta: klepnutí jen poradí, dvojklep i podržení otevře dashboard auta (car.link)", async () => {
      await open(page, "full");
      await page.evaluate(() => {
        (window as any).__nav = [];
        window.addEventListener("location-changed", () => (window as any).__nav.push(location.pathname));
      });
      const nav = () => page.evaluate(() => (window as any).__nav as string[]);
      const car = page.getByRole("button", { name: "Otevřít dashboard auta" });
      await car.click();
      expect(await nav()).toEqual([]);
      await expect(page.locator(".car-hint")).toContainText("Podržte nebo klepněte dvakrát.");
      await car.dblclick();
      expect(await nav()).toEqual(["/dashboard-bmw"]);
      await expect(page.locator(".car-hint")).toHaveCount(0);
      await hold(car);
      expect(await nav()).toEqual(["/dashboard-bmw", "/dashboard-bmw"]);
      await car.focus();
      await page.keyboard.press("Enter");
      expect((await nav()).length).toBe(3);
      // car.link: "" obrázek ovladačem neudělá; špatný tvar se hlásí s názvem klíče
      expect(await configError(page, { car: { link: "" } })).toBe("");
      expect(await configError(page, { car: { link: "https://example.com/bmw" } })).toBe("");
      expect(await configError(page, { car: { link: "dashboard-bmw" } })).toMatch(/car\.link must be a path/);
    });
  });

  test("ovládání: Přetoky | Boost, zablokování a přepínače wallboxu", async ({ page }) => {
    test.setTimeout(120000);
    await test.step("Boost bojleru je Přetoky | Boost jako zásobník: klepnutí jen poradí, dvojklik a podržení přepne", async () => {
      await open(page, "full");
      const boost = radio(page, "Režim ohřevu bojleru", "Boost");
      await expect(page.locator("ed-segmented[compact]").first()).toBeVisible();
      await boost.click();
      expect(await calls(page)).toEqual([]);
      await expect(page.locator(".source ed-segmented .hint").first()).toContainText("Podržte, přetáhněte nebo klepněte dvakrát.");
      await boost.dblclick();
      expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.tuv_boost" } }]);
      await expect(boost).toHaveAttribute("aria-checked", "true");
      await hold(radio(page, "Režim ohřevu bojleru", "Přetoky"));
      expect((await calls(page)).at(-1)).toEqual({ domain: "switch", service: "turn_off", data: { entity_id: "switch.tuv_boost" } });
    });
    await test.step("Přetoky | Boost: klepnutí nic nepošle a poradí, dvojklik i podržení přepne, klávesnice hned", async () => {
      await open(page, "full");
      await radio(page, "Režim nabíjení auta", "Boost").click();
      expect(await calls(page)).toEqual([]);
      await expect(page.locator("ed-segmented .hint").first()).toContainText("Podržte, přetáhněte nebo klepněte dvakrát.");
      await radio(page, "Režim nabíjení auta", "Boost").dblclick();
      expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } }]);
      await expect(radio(page, "Režim nabíjení auta", "Boost")).toHaveAttribute("aria-checked", "true");
      await hold(radio(page, "Režim nabíjení auta", "Přetoky"));
      expect((await calls(page)).at(-1)).toEqual({ domain: "switch", service: "turn_off", data: { entity_id: "switch.wallbox_boost" } });
    });
    await test.step("Přetoky | Boost jde přetáhnout jezdcem", async () => {
      await open(page, "full");
      const track = page.locator("ed-segmented").first().locator(".track");
      const box = (await track.boundingBox())!;
      await page.mouse.move(box.x + box.width * 0.25, box.y + box.height / 2);
      await page.mouse.down();
      await page.mouse.move(box.x + box.width * 0.6, box.y + box.height / 2, { steps: 6 });
      await page.mouse.move(box.x + box.width * 0.8, box.y + box.height / 2, { steps: 4 });
      await page.mouse.up();
      expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } }]);
    });
    await test.step("Boost při zablokovaném nabíjení nejdřív zablokování vypne a řekne to", async () => {
      await open(page, "full");
      await update(page, { "switch.wallbox_1_block_charging": "on" });
      await radio(page, "Režim nabíjení auta", "Boost").dblclick();
      expect((await calls(page)).map((call) => `${call.service} ${call.data.entity_id}`)).toEqual([
        "turn_off switch.wallbox_1_block_charging",
        "turn_on switch.wallbox_boost",
      ]);
      await expect(page.locator(".feedback")).toContainText("blokování jsem vypnul");
    });
    await test.step("volba se ukáže hned a bez potvrzení od Home Assistantu se po ui.revert_after vrátí", async () => {
      await open(page, "full");
      await expand(page, "Wallbox");
      const block = page.getByRole("switch", { name: "Zablokovat nabíjení" });
      await block.click();
      await expect(block).toHaveAttribute("aria-checked", "true");
      await page.waitForTimeout(6300);
      await expect(block).toHaveAttribute("aria-checked", "false");
    });
    await test.step("přepínače Zablokovat nabíjení a Přednost před bojlerem volají switch jedním klepnutím", async () => {
      await open(page, "full");
      await expand(page, "Wallbox");
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
    });
  });

  test("ovládání: nabíjecí výkon, cílové teploty a zásobník", async ({ page }) => {
    test.setTimeout(120000);
    await test.step("nabíjecí výkon: jen v boostu, celkový výkon všech fází, entita dostane výkon na fázi", async () => {
      await open(page, "full");
      await expect(page.locator('ed-slider[label="Nabíjecí výkon wallboxu"]')).toBeHidden();
      await open(page, "grid");
      const slider = page.locator('ed-slider[label="Nabíjecí výkon wallboxu"]');
      await expect(slider).toBeVisible();
      expect(await slider.evaluate((el: HTMLElement & { min: number; max: number; step: number; value: number }) => [el.min, el.max, el.step, el.value])).toEqual([4.2, 11.1, 0.3, 4.2]);
      await expect(page.locator(".field-value").first()).toHaveText("4,2 kW");
      await slider.locator("input").evaluate((input: HTMLInputElement) => {
        input.value = "6.6";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
      expect(await calls(page)).toEqual([{ domain: "number", service: "set_value", data: { entity_id: "number.wallbox_7_1_manual_charging_power", value: 2200 } }]);
    });
    await test.step("Cílové teploty: Přetoky ≥ Boost, slidery volají number.set_value", async () => {
      await open(page, "full");
      await expect(page.locator(".rowbtn-value").first()).toContainText("Přetoky 60 · Boost 55 °C");
      await expand(page, "Cílové teploty");
      const solar = page.locator('ed-slider[label="Cíl ohřevu bojleru, Přetoky"]');
      const boost = page.locator('ed-slider[label="Cíl ohřevu bojleru, Boost"]');
      expect(await solar.evaluate((el: HTMLElement & { min: number; max: number; step: number }) => [el.min, el.max, el.step])).toEqual([55, 85, 5]);
      expect(await boost.evaluate((el: HTMLElement & { min: number; max: number }) => [el.min, el.max])).toEqual([20, 60]);
      await solar.locator("input").evaluate((input: HTMLInputElement) => {
        input.value = "70";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
      expect(await calls(page)).toEqual([{ domain: "number", service: "set_value", data: { entity_id: "number.tuv_2_1_target_temperature", value: 70 } }]);
    });
    await test.step("zásobník: Auto | Manual | Off volá water_heater jedním klepnutím", async () => {
      await open(page, "full");
      await radio(page, "Režim zásobníku", "Manual").click();
      await radio(page, "Režim zásobníku", "Off").click();
      expect(await calls(page)).toEqual([
        { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "heat" } },
        { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "off" } },
      ]);
    });
    await test.step("Manual začne v rozsahu: zásobník hlásí 30 °C, karta nastaví nejnižší povolenou a ukáže ji hned; pak jde měnit", async () => {
      await open(page, "full");
      await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": { state: "auto", attributes: { temperature: 30, min_temp: 30, max_temp: 65, operation_list: ["auto", "heat", "off"] } } });
      await radio(page, "Režim zásobníku", "Manual").click();
      expect(await calls(page)).toEqual([
        { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "heat" } },
        { domain: "water_heater", service: "set_temperature", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", temperature: 38 } },
      ]);
      await expect(page.locator(".arc-num b").nth(1)).toHaveText("38");
      // Home Assistant to potvrdí; pak jde teplota změnit.
      await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": { state: "heat", attributes: { temperature: 38, min_temp: 30, max_temp: 65, operation_list: ["auto", "heat", "off"] } } });
      await expand(page, "Teplota");
      const slider = page.locator('ed-slider[label="Teplota zásobníku"]');
      await slider.locator("input").evaluate((input: HTMLInputElement) => {
        input.value = "52";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
      expect((await calls(page)).at(-1)).toEqual({ domain: "water_heater", service: "set_temperature", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", temperature: 52 } });
      await expect(page.locator(".arc-num b").nth(1)).toHaveText("52");
    });
    await test.step("Teplota a doba: v Auto změna přepne na Manual a pak nastaví teplotu; v Off je neaktivní; meze z konfigurace", async () => {
      await open(page, "full");
      await expand(page, "Teplota");
      const slider = page.locator('ed-slider[label="Teplota zásobníku"]');
      expect(await slider.evaluate((el: HTMLElement & { min: number; max: number; step: number }) => [el.min, el.max, el.step])).toEqual([38, 65, 1]);
      await slider.locator("input").evaluate((input: HTMLInputElement) => {
        input.value = "45";
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      });
      expect(await calls(page)).toEqual([
        { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "heat" } },
        { domain: "water_heater", service: "set_temperature", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", temperature: 45 } },
      ]);
      // Home Assistant potvrdí Manual a 45 °C, potom se zásobník vypne.
      const attributes = { temperature: 45, min_temp: 30, max_temp: 65, operation_list: ["auto", "heat", "off"] };
      await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": { state: "heat", attributes } });
      await update(page, { "water_heater.technicka_mistnost_tado_tepla_voda": { state: "off", attributes } });
      await expect(slider.locator("input")).toBeDisabled();
    });
  });

  test("ovládání: mísení, nedostupná entita a rozměry prvků", async ({ page }) => {
    test.setTimeout(90000);
    await test.step("mísení: chráněný přepínač přepne oba ventily přímo", async () => {
      await open(page, "full");
      const toggle = page.getByRole("switch", { name: "Mísení vody" });
      await toggle.click();
      expect(await calls(page)).toEqual([]);
      await toggle.dblclick();
      expect(await calls(page)).toEqual([
        { domain: "switch", service: "turn_off", data: { entity_id: "switch.technicka_mistnost_ventil_c1" } },
        { domain: "switch", service: "turn_on", data: { entity_id: "switch.technicka_mistnost_ventil_c2" } },
      ]);
    });
    await test.step("nedostupná entita: ovládání je neaktivní a nic se neodešle", async () => {
      await open(page, "unavailable");
      await expandAll(page);
      for (const control of await page.getByRole("radio").all()) await expect(control).toBeDisabled();
      for (const toggle of await page.getByRole("switch").all()) await expect(toggle).toBeDisabled();
      for (const toggle of await page.getByRole("switch").all()) await toggle.dispatchEvent("click");
      expect(await calls(page)).toEqual([]);
    });
    await test.step("prvky podle HIG: přepínač 60 × 32 s jezdcem 40 × 26, kapsle 48 px, slider 52 px s jezdcem 38 × 24", async () => {
      await open(page, "full");
      await expandAll(page);
      const sizes = await page.evaluate(() => {
        const root = document.querySelector("ha-energie-dashboard")!.shadowRoot!;
        const rect = (el: Element) => el.getBoundingClientRect();
        const seg = rect(root.querySelector("ed-segmented:not([compact])")!.shadowRoot!.querySelector(".track")!);
        const compact = rect(root.querySelector("ed-segmented[compact]")!.shadowRoot!.querySelector(".track")!);
        const input = root.querySelector('ed-slider[label^="Cíl ohřevu bojleru"]')!.shadowRoot!.querySelector("input")!;
        const sheets = [...((input.getRootNode() as ShadowRoot).adoptedStyleSheets ?? []), ...(input.getRootNode() as ShadowRoot).styleSheets];
        const rule = sheets.flatMap((sheet) => [...sheet.cssRules]).find((r) => (r as CSSStyleRule).selectorText === "input::-webkit-slider-thumb") as CSSStyleRule;
        const thumb = rule.style;
        const toggle = root.querySelector("ed-switch")!.shadowRoot!;
        const track = rect(toggle.querySelector("button")!);
        const knob = rect(toggle.querySelector(".thumb")!);
        return { seg: seg.height, compact: compact.height, slider: rect(input).height, thumb: [parseFloat(thumb.width), parseFloat(thumb.height)], track: [track.width, track.height], knob: [knob.width, knob.height] };
      });
      expect(sizes.seg).toBeGreaterThanOrEqual(48);
      expect(sizes.compact).toBe(40);
      expect(sizes.slider).toBe(52);
      expect(sizes.thumb).toEqual([38, 24]);
      expect(sizes.track).toEqual([60, 32]);
      expect(sizes.knob).toEqual([40, 26]);
    });
  });
});

// -------------------------------------------------------------- accessibility

test.describe("přístupnost (CURRENT_SPEC.md, Mobil, režimy, přístupnost)", () => {
  test("axe (tmavý i světlý režim): karta bez porušení, i bez dat, bez nadpisu, s rozbalenými detaily a s popoverem", async ({ page }) => {
    test.setTimeout(120000);
    for (const theme of ["dark", "light"] as const) {
      for (const scenario of ["full", "day", "grid", "unavailable", "missing"]) {
        await open(page, scenario, 393, 852, theme);
        expect(await axeViolations(page), scenario).toEqual([]);
        await expandAll(page);
        expect(await axeViolations(page), `${scenario} rozbaleno`).toEqual([]);
      }
      await open(page, "day", 393, 852, theme);
      await page.locator('.tile[data-tile="batIn"]').click();
      expect(await axeViolations(page), "popover dlaždice").toEqual([]);
      await page.keyboard.press("Escape");
      await page.locator(".title-btn").click();
      expect(await axeViolations(page), "popover záhlaví").toEqual([]);
      await reconfigure(page, { title: "" });
      expect(await axeViolations(page, ["page-has-heading-one"]), "title: \"\"").toEqual([]);
    }
  });

  test("klávesnice: Přetoky | Boost, mezerník a popovery", async ({ page }) => {
    test.setTimeout(90000);
    await test.step("klávesnice: šipka na Přetoky | Boost přepne hned, bez podržení", async () => {
      await open(page, "full");
      const first = page.locator("ed-segmented").first().getByRole("radio", { name: "Přetoky" });
      await first.focus();
      await page.keyboard.press("ArrowRight");
      expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } }]);
    });
    await test.step("klávesnice: mezerník na chráněném přepínači přepne hned; nechráněný taky", async () => {
      await open(page, "full");
      const mixing = page.getByRole("switch", { name: "Mísení vody" });
      await mixing.focus();
      await page.keyboard.press("Space");
      expect(await calls(page)).toEqual([
        { domain: "switch", service: "turn_off", data: { entity_id: "switch.technicka_mistnost_ventil_c1" } },
        { domain: "switch", service: "turn_on", data: { entity_id: "switch.technicka_mistnost_ventil_c2" } },
      ]);
      await expand(page, "Wallbox");
      const toggle = page.getByRole("switch", { name: "Zablokovat nabíjení" });
      await toggle.focus();
      await page.keyboard.press("Space");
      expect((await calls(page)).at(-1)).toEqual({ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_1_block_charging" } });
    });
    await test.step("dlaždice a záhlaví jdou ovládat klávesnicí a Escape zavře popover", async () => {
      await open(page, "day");
      const sun = page.locator('.tile[data-tile="sun"]');
      await sun.focus();
      await page.keyboard.press("Enter");
      await expect(page.getByRole("dialog", { name: "Slunce" })).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.getByRole("dialog")).toHaveCount(0);
    });
  });
});

// ------------------------------------------------------------------ languages

test.describe("jazyky (CURRENT_SPEC.md, Jazyky)", () => {
  /** Every text of the card: visible text, spoken names and hints of all shadow roots. */
  const allText = (page: Page) =>
    page.evaluate((tag) => {
      const out: string[] = [];
      const walk = (root: ParentNode) => {
        root.querySelectorAll("*").forEach((el) => {
          for (const node of el.childNodes) if (node.nodeType === 3 && node.textContent?.trim()) out.push(node.textContent.trim());
          for (const name of ["aria-label", "aria-valuetext", "title", "alt", "label", "valueText", "hint"]) {
            const value = el.getAttribute(name) ?? (el as unknown as Record<string, unknown>)[name];
            if (typeof value === "string" && value) out.push(value);
          }
          if (el.shadowRoot) walk(el.shadowRoot);
        });
      };
      const host = document.querySelector(tag)!;
      walk(host.shadowRoot!);
      return out;
    }, CARD);

  const CZECH = /[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/;
  /** No Czech word anywhere in the card (visible text, spoken names, hints). */
  const noCzech = async (page: Page, at: string) => expect((await allText(page)).filter((text) => CZECH.test(text)), at).toEqual([]);

  const expandEverything = async (page: Page) => {
    for (const row of await page.locator(".row-btn, .rowbtn").all()) {
      if ((await row.getAttribute("aria-expanded")) === "false") await row.click();
    }
    await settle(page);
  };

  test("en a sv: žádný český text v kartě, v popoverech ani v hlášeních (všechny scénáře)", async ({ page }) => {
    test.setTimeout(180000);
    for (const lang of ["en", "sv"]) {
      for (const scenario of ["full", "day", "grid", "unavailable", "missing"]) {
        await open(page, scenario, 393, 852, "dark", lang);
        await expandEverything(page);
        await noCzech(page, `${lang} ${scenario}`);
        for (const key of await tileKeys(page)) {
          await page.locator(`.tile[data-tile="${key}"]`).click();
          await noCzech(page, `${lang} ${scenario} ${key}`);
          await page.keyboard.press("Escape");
        }
        await page.locator(".title-btn").click();
        await noCzech(page, `${lang} ${scenario} záhlaví`);
      }
      // Feedback and hints
      await open(page, "full", 393, 852, "dark", lang);
      await page.getByRole("switch", { name: lang === "en" ? "Water mixing" : "Vattenblandning" }).click();
      await noCzech(page, `${lang} nápověda`);
      await update(page, { "switch.technicka_mistnost_ventil_c1": "unavailable" });
      await noCzech(page, `${lang} nedostupný ventil`);
    }
  });

  test("en a sv: rozložení na 320 px (nic se neořízne a nepřetéká) a přístupnost", async ({ page }) => {
    test.setTimeout(180000);
    for (const lang of ["en", "sv"]) {
      for (const scenario of ["full", "day", "grid"]) {
        await open(page, scenario, 320, 852, "dark", lang);
        await expandEverything(page);
        const layout = await page.evaluate((tag) => {
          const root = document.querySelector(tag)!.shadowRoot!;
          const tiles = [...root.querySelectorAll<HTMLElement>(".tile .text")].map((text) => text.scrollWidth > text.clientWidth + 0.5 || text.getBoundingClientRect().right > text.closest(".tile")!.getBoundingClientRect().right + 0.5);
          const panels = [...root.querySelectorAll<HTMLElement>(".panel, .source")].map((panel) => {
            const box = panel.getBoundingClientRect();
            return [...panel.querySelectorAll<HTMLElement>("*")].some((el) => !el.closest(".car-art") && el.getBoundingClientRect().width > 0 && (el.getBoundingClientRect().right > box.right + 0.5 || el.getBoundingClientRect().left < box.left - 0.5));
          });
          return { scrollWidth: document.documentElement.scrollWidth, tiles, panels };
        }, CARD);
        expect(layout.scrollWidth, `${lang} ${scenario}`).toBeLessThanOrEqual(320);
        expect(layout.tiles.some(Boolean), `${lang} ${scenario}: text dlaždice se ořízl`).toBe(false);
        expect(layout.panels.some(Boolean), `${lang} ${scenario}: obsah přesahuje panel`).toBe(false);
        expect(await axeViolations(page), `${lang} ${scenario} axe`).toEqual([]);
      }
    }
  });

  test("jazyky: čísla, jazyk profilu, texty z konfigurace a odpojené auto", async ({ page }) => {
    test.setTimeout(120000);
    await test.step("angličtina píše čísla a procenta jako Home Assistant: 65%, 1.2 kW; čeština a švédština s mezerou", async () => {
      await open(page, "full", 393, 852, "dark", "en");
      await page.locator('.tile[data-tile="bat"]').click();
      await expect(page.locator(".pop-big")).toHaveText("65%");
      await update(page, { "sensor.goodwe_pv_power": "1200" });
      await expect(page.locator('.tile[data-tile="sun"] .value')).toHaveText("1.20 kW");
      await open(page, "full", 393, 852, "dark", "sv");
      await page.locator('.tile[data-tile="bat"]').click();
      await expect(page.locator(".pop-big")).toHaveText("65 %");
      await open(page, "full", 393, 852, "dark", "cs");
      await page.locator('.tile[data-tile="bat"]').click();
      await expect(page.locator(".pop-big")).toHaveText("65 %");
      await update(page, { "sensor.goodwe_pv_power": "1200" });
      await expect(page.locator('.tile[data-tile="sun"] .value')).toHaveText("1,20 kW");
    });
    await test.step("jazyk karty je jazyk profilu Home Assistantu a mění se hned; jiný jazyk než cs a sv = angličtina; klíč language jazyk vynutí; lang na hostiteli", async () => {
      await open(page, "full");
      const host = page.locator(CARD);
      const title = () => page.locator("h1");
      await expect(title()).toHaveText("Energie");
      await expect(host).toHaveAttribute("lang", "cs");
      await page.evaluate(() => (window as any).__test.setLanguage("sv"));
      await expect(title()).toHaveText("Energi");
      await expect(host).toHaveAttribute("lang", "sv");
      await expect(page.locator(".tile .name").first()).toHaveText("Sol");
      await page.evaluate(() => (window as any).__test.setLanguage("de"));
      await expect(title()).toHaveText("Energy");
      await expect(host).toHaveAttribute("lang", "en");
      await page.evaluate(() => (window as any).__test.setLanguage("en-GB"));
      await expect(page.locator(".tile .name").first()).toHaveText("Sun");
      // forced by the YAML, whatever Home Assistant shows
      await page.evaluate(() => {
        const test = (window as any).__test;
        test.card.setConfig({ ...structuredClone(test.config), language: "cs" });
      });
      await expect(title()).toHaveText("Energie");
      await expect(host).toHaveAttribute("lang", "cs");
    });
    await test.step("texty z konfigurace (nadpis, nadpisy panelů) se nepřekládají, bez nich platí jazyk karty", async () => {
      await open(page, "full", 393, 852, "dark", "sv");
      await expect(page.locator("h1")).toHaveText("Energi");
      await expect(page.locator(".panel h2")).toHaveText(["El", "BMW i3", "Varmvatten"]);
      await page.evaluate(() => {
        const test = (window as any).__test;
        test.card.setConfig({ ...structuredClone(test.config), title: "Domov Madle", titles: { electricity: "Elektřina doma", car: null, water: "Teplá voda" } });
      });
      await expect(page.locator("h1")).toHaveText("Domov Madle");
      await expect(page.locator(".panel h2")).toHaveText(["Elektřina doma", "BMW i3", "Teplá voda"]);
    });
    await test.step("odpojené auto a nápověda u obrázku auta mluví jazykem karty", async () => {
      await open(page, "full", 393, 852, "dark", "en");
      await page.getByRole("button", { name: "Open the car dashboard" }).click();
      await expect(page.locator(".car-hint")).toHaveText("Press and hold, or tap twice.");
      await update(page, { "sensor.wallbox_charge_status": "Disconnected" });
      await expect(stateLine(page, 1)).toHaveText("Unplugged");
    });
  });
});

// ------------------------------------------------------------------- baterie

test.describe("baterie (CURRENT_SPEC.md, Baterie)", () => {
  /** The websocket requests the card made on the fake hass (statistics of the history). */
  const requests = (page: Page) =>
    page.evaluate(() => {
      // @ts-expect-error test hook
      return window.__test.requests as Array<{ type: string; statistic_ids: string[]; period: string; types: string[]; start_time: string; end_time: string }>;
    });

  const openDetail = async (page: Page, key: "bat" | "batIn" = "bat") => {
    await page.locator(`.tile[data-tile="${key}"]`).click();
    await page.getByRole("button", { name: "Detail baterie" }).click();
    await page.locator(".bat-detail").waitFor();
  };

  const tab = (page: Page, name: string) => page.getByRole("radio", { name, exact: true });

  /** The label, value and sub text of every tile of the live values. */
  const kpis = (page: Page) =>
    page.locator(".bat-kpi").evaluateAll((items) => items.map((item) => [...item.querySelectorAll("span")].map((el) => el.textContent?.trim())));

  test("popup baterie: nabití, gauge z deseti pilulek s rezervou, odhad času, mikrotrend a jen směr dlaždice", async ({ page }) => {
    await open(page, "day");
    await page.locator('.tile[data-tile="batIn"]').click();
    const pop = page.getByRole("dialog", { name: "Baterie" });
    await expect(pop).toContainText("nabíjí 0,80 kW");
    await expect(pop.locator(".pop-big")).toHaveText("88 %");
    await expect(pop.getByRole("img", { name: "Nabití 88 %, rezerva 20 %" })).toBeVisible();
    // (100 − 88) % z 11,2 kWh při 0,8 kW = 1,68 h, zaokrouhleno na 5 minut.
    await expect(pop).toContainText("Plná za asi 1 h 40 min");
    await expect(pop).toContainText("Dnes nabito");
    await expect(pop).not.toContainText("Dnes vybito");
    await expect(pop.getByRole("button", { name: "Detail baterie" })).toBeVisible();
    // Deset pilulek po 10 %: první dvě (rezerva 20 %) oranžové, osmá z 80 %, poslední prázdná.
    const pills = await pop.locator(".pill").evaluateAll((items) =>
      items.map((item) => {
        const fill = item.querySelector<HTMLElement>("i")!;
        const style = getComputedStyle(item);
        return { width: fill.style.width, colour: fill.style.background, radius: style.borderRadius, motion: getComputedStyle(fill).transitionDuration };
      }),
    );
    expect(pills).toHaveLength(10);
    expect(pills.slice(0, 2).map((pill) => [pill.width, pill.colour])).toEqual([["100%", "var(--ed-warning)"], ["100%", "var(--ed-warning)"]]);
    expect(pills[8].width).toBe("80%");
    expect(pills[9].width).toBe("0%");
    // Zaoblené jsou jen vnější rohy první a poslední pilulky, nic se neanimuje.
    expect(pills[0].radius).toBe("8px 0px 0px 8px");
    expect(pills[9].radius).toBe("0px 8px 8px 0px");
    expect(pills.slice(1, 9).every((pill) => pill.radius === "0px")).toBe(true);
    expect(pills.every((pill) => pill.motion === "0s")).toBe(true);
    // Popup je malý jako ostatní a nestahuje statistiky.
    expect((await page.locator(".bat-pop").boundingBox())!.width).toBeLessThanOrEqual(236);
    await expect(pop.locator(".bat-trend")).toHaveCount(0);
    await page.keyboard.press("Escape");
    // Vybíjení (Baterie vlevo): jiná věta a jen „Dnes vybito“.
    await open(page, "full");
    await page.locator('.tile[data-tile="bat"]').click();
    const out = page.getByRole("dialog", { name: "Baterie" });
    await expect(out).toContainText("vybíjí 351 W");
    await expect(out).toContainText("Vydrží asi 14 h 20 min");
    await expect(out).toContainText("Dnes vybito");
    await expect(out).not.toContainText("Dnes nabito");
    // Bez toku (pod prahem) věta s časem není; na rezervě je poznámka.
    await open(page, "grid");
    await page.locator('.tile[data-tile="bat"]').click();
    const rest = page.getByRole("dialog", { name: "Baterie" });
    await expect(rest).not.toContainText(/Plná za|Vydrží/);
    await update(page, { "sensor.goodwe_battery_state_of_charge": "15" });
    await expect(rest).toContainText("na rezervě");
  });

  test("detail baterie: Dnes (živé hodnoty, graf s osou, energie) a návrat Zpět / Hotovo / Escape", async ({ page }) => {
    await open(page, "full");
    await openDetail(page);
    const detail = page.locator(".bat-detail");
    await expect(detail).toHaveAttribute("role", "dialog");
    await expect(page.locator(".tile")).toHaveCount(0);
    await expect(tab(page, "Dnes")).toHaveAttribute("aria-checked", "true");
    await expect(detail.locator(".bat-huge")).toHaveText("65 %");
    await expect(detail.getByRole("img", { name: "Nabití 65 %, rezerva 20 %" })).toBeVisible();
    expect(await kpis(page)).toEqual([
      ["Výkon", "0,35 kW", "Vybíjí se"],
      ["Proud", "0,9 A", "vybíjecí"],
      ["Napětí", "294,9 V", "baterie"],
      ["Zátěž", "0,03 C", "výkon ÷ kapacita"],
    ]);
    // Graf Nabití a výkon: svislá osa (tři hodnoty nabití a výkon), údaj o bodu, posun šipkami.
    await expect(detail.locator(".bat-chart")).toBeVisible();
    const labels = await detail.locator(".bat-ylabel").allTextContents();
    expect(labels.slice(0, 3)).toEqual(["100 %", "50 %", "0 %"]);
    expect(labels).toHaveLength(6);
    await expect(detail.locator(".bat-read")).toContainText(/^teď · \d+ % · /);
    await detail.locator(".bat-chart input").focus();
    for (let i = 0; i < 20; i++) await page.keyboard.press("ArrowLeft");
    await expect(detail.locator(".bat-read")).toContainText(/^−\d+ h/);
    // 6 h: nová žádost jen na šest hodin.
    await tab(page, "6 h").click();
    await expect.poll(async () => (await requests(page)).some((item) => item.types.join() === "mean" && Date.parse(item.end_time) - Date.parse(item.start_time) === 6 * 3600000 && item.statistic_ids.includes("sensor.goodwe_battery_state_of_charge"))).toBe(true);
    // Energie dnes z denních čítačů.
    await expect(detail).toContainText("5,20 kWh");
    await expect(detail).toContainText("3,10 kWh");
    await expect(detail).toContainText("Čistě uloženo +2,10 kWh");
    // Pruh nabito/vybito: dva samostatné segmenty oddělené mezerou 2 px (zelená a modrá se nesmí slévat).
    const split = detail.locator(".bat-split");
    await expect(split.locator("> i")).toHaveCount(2);
    expect(await split.evaluate((el) => getComputedStyle(el).columnGap)).toBe("2px");
    // Zpět, Hotovo i Escape vrátí na kartu a zavřou i popup, ze kterého se detail otevřel.
    await detail.getByRole("button", { name: /Zpět/ }).click();
    await expect(page.locator(".bat-detail")).toHaveCount(0);
    await expect(page.locator(".pop")).toHaveCount(0);
    await openDetail(page);
    await page.getByRole("button", { name: "Hotovo" }).click();
    await expect(page.locator(".bat-detail")).toHaveCount(0);
    await expect(page.locator(".pop")).toHaveCount(0);
    await openDetail(page);
    await page.keyboard.press("Escape");
    await expect(page.locator(".bat-detail")).toHaveCount(0);
    await expect(page.locator(".tile")).toHaveCount(8);
  });

  test("detail baterie: Historie (1 den, 7 dní, 30 dní se pamatuje), energie, účinnost a pásma", async ({ page }) => {
    await open(page, "full");
    await openDetail(page);
    await tab(page, "Historie").click();
    // Výchozí je 1 den (battery.default_range); hodiny: 24 × 0,35 nabito a 24 × 0,30 vybito.
    await expect(tab(page, "1 den")).toHaveAttribute("aria-checked", "true");
    await expect(page.locator(".bat-detail")).toContainText("Energie po hodinách");
    await expect.poll(() => kpis(page).then((items) => items.map((item) => item[1]))).toEqual(["8,4 kWh", "7,2 kWh", "85,7 %", "0,6", expect.stringMatching(/ %$/), expect.stringMatching(/ kW$/)]);
    const chart = page.locator(".bat-detail .bat-chart");
    await expect(chart).toBeVisible();
    await expect(page.locator(".bat-detail .bat-read")).toContainText(/čistě [+−]/);
    expect(await page.locator(".bat-band").count()).toBe(5);
    const shares = (await page.locator(".bat-band .pct").allTextContents()).map((text) => Number(text.replace(/\D/g, "")));
    expect(shares.reduce((sum, value) => sum + value, 0)).toBeGreaterThanOrEqual(98);
    expect(shares.reduce((sum, value) => sum + value, 0)).toBeLessThanOrEqual(102);
    // 7 dní: po dnech.
    await tab(page, "7 dní").click();
    await expect(page.locator(".bat-detail")).toContainText("Denní energie");
    await expect.poll(() => requests(page).then((items) => items.some((item) => item.period === "day" && item.types.join() === "change"))).toBe(true);
    await expect.poll(() => kpis(page).then((items) => items.slice(0, 2).map((item) => item[1]))).toEqual(["59 kWh", "50 kWh"]);
    expect(await page.evaluate(() => localStorage.getItem("ha-energie-dashboard:battery-range"))).toBe("7d");
    // Pamatuje se i po znovunačtení stránky.
    await open(page, "full");
    await openDetail(page);
    await tab(page, "Historie").click();
    await expect(tab(page, "7 dní")).toHaveAttribute("aria-checked", "true");
    // Bez uložené volby platí battery.default_range.
    await page.evaluate(() => localStorage.clear());
    await open(page, "full");
    await reconfigure(page, { battery: { ...example().battery, default_range: "30d" } });
    await openDetail(page);
    await tab(page, "Historie").click();
    await expect(tab(page, "30 dní")).toHaveAttribute("aria-checked", "true");
  });

  test("detail baterie: Zdraví (stav, kapacita, vyvážení článků jako rozdíl v mV, teplota, životnost, diagnostika)", async ({ page }) => {
    await open(page, "full");
    await openDetail(page);
    await tab(page, "Zdraví").click();
    const detail = page.locator(".bat-detail");
    await expect(detail).toContainText("Baterie je v pořádku");
    await expect(detail).toContainText("Bez chyb a varování");
    const row = (name: string) => detail.locator(".bat-card.flush").filter({ hasText: name }).first();
    await expect(row("Kapacita")).toContainText("98 %");
    await expect(row("Kapacita")).toContainText("využitelná ≈ 11,0 kWh z 11,2 kWh");
    await expect(row("Kapacita").locator(".bat-row")).toBeDisabled();
    await expect(row("Vyvážení článků")).toContainText("5 mV");
    await expect(row("Vyvážení článků")).toContainText("Výborné");
    await expect(row("Teplota")).toContainText("26 °C");
    await expect(row("Teplota")).toContainText("nejteplejší článek · rozptyl 3 °C");
    await expect(row("Životnost")).toContainText("181 cyklů");
    await expect(row("Životnost")).toContainText("účinnost celkem 74,4 %");
    // Diagnostika tak, jak ji střídač hlásí.
    await expect(detail).toContainText("Režim");
    await expect(detail).toContainText("Discharge");
    await expect(detail).toContainText("Limit nabíjení");
    await expect(detail).toContainText("30 A");
    await expect(detail).toContainText("žádné");
    // Vyvážení: jedna čára rozdílu v mV od nuly nad zeleným pásem „výborné do 15 mV“; napětí článků jsou v údaji pod prstem.
    await row("Vyvážení článků").locator(".bat-row").click();
    await expect(row("Vyvážení článků").locator(".bat-row")).toHaveAttribute("aria-expanded", "true");
    await expect(row("Vyvážení článků").locator(".bat-read")).toContainText(/rozdíl \d+ mV · min 3,3\d\d V · max 3,3\d\d V/);
    const gapLabels = await row("Vyvážení článků").locator(".bat-ylabel").allTextContents();
    expect(gapLabels).toHaveLength(3);
    expect(gapLabels[0]).toMatch(/ mV$/);
    expect(gapLabels[1]).toBe("15 mV");
    expect(gapLabels[2]).toBe("0");
    await expect(row("Vyvážení článků")).toContainText("výborné do 15 mV");
    await expect(row("Vyvážení článků")).not.toContainText("min–max");
    await expect(row("Vyvážení článků")).not.toContainText("průměr");
    expect(await row("Vyvážení článků").locator(".bat-chart g path").count()).toBe(2); // plocha a čára
    const asked = (await requests(page)).filter((item) => item.statistic_ids.includes("sensor.goodwe_battery_min_cell_voltage"));
    expect(asked[0]).toMatchObject({ period: "5minute", types: ["mean", "state"] });
    // Teplota: v každém okamžiku nejnižší, nejvyšší a teplota baterie.
    await row("Teplota").locator(".bat-row").click();
    await expect(row("Teplota").locator(".bat-read")).toContainText(/min \d+,\d · baterie \d+,\d · max \d+,\d °C/);
    await expect(row("Teplota")).toContainText("23,8 °C");
    await expect(row("Teplota")).toContainText("Střídač, vzduch");
    await expect(row("Teplota")).toContainText("33,5 °C");
    // Životnost: ekvivalentní cykly v čase a čítače.
    await row("Životnost").locator(".bat-row").click();
    await expect(row("Životnost")).toContainText(/Celkem nabito\s*2.731 kWh/);
    await expect(row("Životnost").locator(".bat-read")).toContainText(/ · \d+,\d cyklů/);
    // 7 dní: hodinové statistiky.
    await tab(page, "7 dní").click();
    await expect.poll(() => requests(page).then((items) => items.some((item) => item.period === "hour" && item.statistic_ids.includes("sensor.goodwe_battery_min_cell_voltage")))).toBe(true);
    // Chyba střídače je odchylka.
    await update(page, { "sensor.goodwe_battery_error": "E-102" });
    await expect(detail).toContainText("Chyba E-102");
    await expect(detail.locator(".bat-title")).toHaveClass(/warn/);
  });

  test("detail baterie: bez dat a bez statistik je „––“, nikdy vymyšlená křivka", async ({ page }) => {
    for (const stats of ["none", "error"]) {
      await page.setViewportSize({ width: 393, height: 852 });
      await page.goto(`/tests/harness.html?s=full&stats=${stats}`);
      await page.locator(".tile").first().waitFor();
      await page.locator('.tile[data-tile="bat"]').click();
      await page.getByRole("button", { name: "Detail baterie" }).click();
      await expect(page.locator(".bat-detail .bat-nodata")).toContainText("–– bez dat");
      await tab(page, "Historie").click();
      await expect(page.locator(".bat-detail .bat-nodata").first()).toContainText("–– bez dat");
      await expect.poll(() => kpis(page).then((items) => items.slice(0, 4).map((item) => item[1]))).toEqual(["––", "––", "––", "––"]);
      await tab(page, "Zdraví").click();
      await page.locator(".bat-detail .bat-card.flush").filter({ hasText: "Vyvážení článků" }).locator(".bat-row").click();
      await expect(page.locator(".bat-detail .bat-nodata")).toContainText("–– bez dat");
      // Živé hodnoty z entit zůstávají.
      await expect(page.locator(".bat-detail")).toContainText("5 mV");
    }
    // Bez jediné entity baterie: Bez dat, žádné číslo.
    await open(page, "missing");
    await openDetail(page);
    await expect(page.locator(".bat-huge")).toHaveText("––");
    await tab(page, "Zdraví").click();
    await expect(page.locator(".bat-detail")).toContainText("Bez dat");
    await expect(page.locator(".bat-detail")).toContainText("Baterie neposílá data");
  });

  test("detail baterie: bez vodorovného posouvání od 320 px, cíle aspoň 44 px a přístupnost (tmavý i světlý režim)", async ({ page }) => {
    test.setTimeout(240000);
    for (const theme of ["dark", "light"] as const) {
      for (const width of [320, 375, 430, 768]) {
        await open(page, "full", width, 852, theme);
        await openDetail(page);
        for (const name of ["Dnes", "Historie", "Zdraví"]) {
          await tab(page, name).click();
          if (name === "Zdraví") {
            for (const title of ["Vyvážení článků", "Teplota", "Životnost"]) {
              await page.locator(".bat-detail .bat-card.flush").filter({ hasText: title }).locator(".bat-row").click();
            }
          }
          await settle(page);
          const at = `${theme} ${width} ${name}`;
          const layout = await page.evaluate((tag) => {
            const root = document.querySelector(tag)!.shadowRoot!;
            const page = root.querySelector(".page")!.getBoundingClientRect();
            const over = [...root.querySelectorAll<HTMLElement>(".bat-detail *")].filter((el) => !el.closest("svg") && el.getBoundingClientRect().width > 0 && (el.getBoundingClientRect().right > page.right + 0.5 || el.getBoundingClientRect().left < page.left - 0.5)).length;
            const targets = [...root.querySelectorAll<HTMLElement>(".bat-link, .bat-row, .bat-open")].map((el) => el.getBoundingClientRect().height);
            const segmented = [...root.querySelectorAll("ed-segmented:not([compact])")].flatMap((host) => [...(host.shadowRoot?.querySelectorAll<HTMLElement>("button") ?? [])].map((el) => el.getBoundingClientRect().height));
            return { scrollWidth: document.documentElement.scrollWidth, over, targets, segmented };
          }, CARD);
          expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
          expect(layout.over, at).toBe(0);
          for (const height of [...layout.targets, ...layout.segmented]) expect(height, at).toBeGreaterThanOrEqual(44);
          if (width === 393 || width === 375) expect(await axeViolations(page), at).toEqual([]);
        }
      }
    }
    // Popup baterie: také bez porušení.
    for (const theme of ["dark", "light"] as const) {
      await open(page, "day", 393, 852, theme);
      await page.locator('.tile[data-tile="batIn"]').click();
      await expect(page.locator(".bat-pop")).toBeVisible();
      expect(await axeViolations(page), `popup ${theme}`).toEqual([]);
    }
  });

  test("detail baterie: en a sv bez českého textu", async ({ page }) => {
    test.setTimeout(120000);
    for (const lang of ["en", "sv"]) {
      await open(page, "full", 393, 852, "dark", lang);
      await page.locator('.tile[data-tile="bat"]').click();
      await page.locator(".bat-open").click();
      for (const index of [0, 1, 2]) {
        await page.locator("ed-segmented").first().getByRole("radio").nth(index).click();
        if (index === 2) {
          for (const row of await page.locator(".bat-detail .bat-row:not([disabled])").all()) await row.click();
        }
        await settle(page);
        const text = await page.locator(".bat-detail").evaluate((el) => el.textContent ?? "");
        expect(text, `${lang} ${index}`).not.toMatch(/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/);
      }
    }
  });

  // ---------------------------------------------------------------- slunce

  test.describe("slunce (CURRENT_SPEC.md, Slunce)", () => {
    const openSun = async (page: Page, scenario = "day", width = 393, theme: "dark" | "light" = "dark", lang = "cs") => {
      await open(page, scenario, width, 852, theme, lang);
      await page.locator('.tile[data-tile="sun"]').click();
      await page.locator(".sun-pop .bat-open").click();
      await page.locator(".sun-detail").waitFor();
    };

    test("popup: výkon teď, kam slunce jde, dnes zatím s kolečkem, začátek a konec výroby; bez „% možného“", async ({ page }) => {
      await open(page, "day");
      await page.locator('.tile[data-tile="sun"]').click();
      const pop = page.getByRole("dialog", { name: "Slunce" });
      await expect(pop).toContainText("Vyrábí");
      await expect(pop.locator(".pop-big")).toHaveText("6,80 kW");
      // Kam teď slunce jde: jen pruh v barvách dlaždic (dům, auto, bojler, baterie, síť), bez legendy, aby popup nebyl roztažený.
      await expect(pop.locator(".sun-legend")).toHaveCount(0);
      await expect(pop.getByRole("img", { name: "Dům 0,50 kW, Auto 4,10 kW, Bojler 1,20 kW, Baterie 0,80 kW, Do sítě 0,20 kW" })).toBeVisible();
      await expect(pop.locator(".sun-sofar")).toContainText("Dnes zatím");
      await expect(pop.locator(".sun-sofar")).toContainText("18,4 kWh");
      await expect(pop.locator(".sun-sofar .sun-ring")).toBeVisible();
      await expect(pop.locator(".pop-row").first()).toContainText("Začala");
      await expect(pop.locator(".pop-row").nth(1)).toContainText("Skončí asi");
      await expect(pop).not.toContainText("možného");
      // Escape zavře popup, Detail slunce otevře detail a Escape ho zavře.
      await page.keyboard.press("Escape");
      await expect(pop).toHaveCount(0);
      await page.locator('.tile[data-tile="sun"]').click();
      await page.getByRole("button", { name: "Detail slunce" }).click();
      await expect(page.locator(".sun-detail")).toBeVisible();
      await expect(page.locator(".tile")).toHaveCount(0);
      await page.keyboard.press("Escape");
      await expect(page.locator(".sun-detail")).toHaveCount(0);
      await expect(page.locator(".tile").first()).toBeVisible();
      // Večer bez výroby: „bez výroby“, žádný tok.
      await open(page, "full");
      await page.locator('.tile[data-tile="sun"]').click();
      await expect(page.getByRole("dialog", { name: "Slunce" })).toContainText("bez výroby");
    });

    test("detail Dnes: výkon teď, graf s křivkou možného, dlaždice, kam slunce šlo, ⓘ otevře a zavře bublinu; Zpět a Hotovo", async ({ page }) => {
      await openSun(page);
      const detail = page.locator(".sun-detail");
      await expect(tab(page, "Dnes")).toHaveAttribute("aria-checked", "true");
      await expect(detail.locator(".bat-huge")).toHaveText("6,80 kW");
      await expect(detail.locator(".bat-chart")).toBeVisible();
      await expect(detail.locator(".bat-legend").first()).toContainText("Výroba");
      await expect(detail.locator(".bat-legend").first()).toContainText("Možné");
      await expect(detail.locator(".bat-legend").first()).toContainText("Předpověď");
      // Čtení pod prstem: čas, výkon a možné.
      await expect(detail.locator(".bat-read").first()).toContainText(/\d+:\d\d · .*kW/);
      const tiles = await kpis(page);
      expect(tiles.map((item) => item[0])).toEqual(["Dnes zatím", "Špička dnes", "Výroba začala", "Skončí asi"]);
      // Kam dnes slunce šlo: dům, baterie a síť z denních součtů (18,4 − 5,2 − 4,9 = 8,3 kWh do domu).
      await expect(detail.locator(".sun-legend").last()).toContainText("Dům8,30");
      await expect(detail.locator(".sun-legend").last()).toContainText("Baterie5,20");
      // Nápověda jen po klepnutí, druhé klepnutí ji zavře, nic neposune.
      const before = await detail.evaluate((el) => el.getBoundingClientRect().height);
      await detail.locator(".sun-hint").first().click();
      await expect(detail.locator(".sun-note")).toContainText("Křivka „možné“");
      expect(await detail.evaluate((el) => el.getBoundingClientRect().height)).toBe(before);
      await detail.locator(".sun-hint").first().click();
      await expect(detail.locator(".sun-note")).toHaveCount(0);
      await page.getByRole("button", { name: "‹ Zpět" }).click();
      await expect(page.locator(".sun-detail")).toHaveCount(0);
      await openSun(page);
      await page.getByRole("button", { name: "Hotovo" }).click();
      await expect(page.locator(".sun-detail")).toHaveCount(0);
      await expect(page.locator(".sun-pop")).toHaveCount(0);
    });

    test("detail Historie: 7 a 30 dní se pamatuje, Celkem a Denní doba mají stejnou výšku, pět bloků dne, dobré dny", async ({ page }) => {
      await openSun(page);
      await tab(page, "Historie").click();
      const detail = page.locator(".sun-detail");
      await expect(tab(page, "7 dní")).toHaveAttribute("aria-checked", "true");
      await expect(detail.locator(".bat-huge")).toContainText("kWh");
      await expect(detail).toContainText("Posledních 7 dní");
      await expect(detail).toContainText("možného");
      // Celkem: sloupce po dnech a možné; Denní doba: plošný graf o pěti blocích a klíč.
      const card = detail.locator(".bat-card").filter({ hasText: "Výroba po dnech" });
      await expect(card.locator("svg rect[style*='--ed-sun']").first()).toBeVisible();
      const heightTotal = await card.evaluate((el) => el.getBoundingClientRect().height);
      await card.getByRole("radio", { name: "Denní doba" }).click();
      await expect(card.locator("svg polygon")).toHaveCount(5);
      await expect(card.locator(".sun-blocks > span")).toHaveCount(5);
      expect(await card.evaluate((el) => el.getBoundingClientRect().height)).toBe(heightTotal);
      expect((await detail.locator(".bat-kpi .sub").allTextContents()).join(" ")).toMatch(/Nejlepší den[\s\S]*Nejhorší den[\s\S]*Špička[\s\S]*Délka výroby/);
      await expect(detail.locator(".sun-two")).toContainText("Východ a západ");
      await expect(detail.locator(".sun-two")).toContainText("Dobré dny");
      // 30 dní, zapamatované po novém otevření.
      await tab(page, "30 dní").click();
      await expect(detail).toContainText("Posledních 30 dní");
      await page.getByRole("button", { name: "Hotovo" }).click();
      await openSun(page);
      await tab(page, "Historie").click();
      await expect(tab(page, "30 dní")).toHaveAttribute("aria-checked", "true");
      // Bez předpovědi nejsou data pro kartu „Jak se předpověď trefovala“.
      await expect(detail).not.toContainText("Jak se předpověď trefovala");
    });

    test("detail Výhled: odhad s ≈, rozsahem a jistotou, pět dní, dnes do večera a dlaždice; bez předpovědi jen odhad z tempa", async ({ page }) => {
      await openSun(page, "day&forecast=1");
      await tab(page, "Výhled").click();
      const detail = page.locator(".sun-detail");
      await expect(detail.locator(".sun-est")).toContainText("≈");
      await expect(detail).toContainText("pravděpodobně");
      await expect(detail.locator(".sun-conf")).toContainText(/Jistota (nízká|střední|vysoká)/);
      await expect(detail.locator(".sun-five-row")).toHaveCount(5);
      await expect(detail.locator(".sun-five-row").nth(1)).toContainText("≈ 9,60");
      await expect(detail.locator(".sun-five-row").nth(1)).toContainText("déšť");
      await expect(detail.locator(".sun-five-row").nth(4)).toContainText("≈ 14,9");
      await expect(detail.locator(".sun-five-row").nth(4)).toContainText("10–14 h");
      await expect(detail.locator(".sun-five-row").first().locator(".strip i.now")).toHaveCount(1);
      await expect(detail).toContainText("Dnes do večera");
      await expect(detail).toContainText("Ze sítě v noci");
      const tiles = await kpis(page);
      expect(tiles.map((item) => item[0])).toEqual(["Den", "Nejlepší den"]);
      expect(tiles[1][1]).toMatch(/^(Dnes|Sobota|Neděle|Pondělí|Úterý)$/);
      // Předpověď má v historii kartu přesnosti.
      await tab(page, "Historie").click();
      await expect(detail).toContainText("Jak se předpověď trefovala");
      // Bez předpovědi: odhad z tempa, žádné další dny a žádný vymyšlený den.
      await openSun(page, "day");
      await tab(page, "Výhled").click();
      await expect(page.locator(".sun-detail .sun-est")).toContainText("≈");
      await expect(page.locator(".sun-detail .sun-five-row")).toHaveCount(0);
    });

    test("bez statistik a bez entit je „––“, nikdy vymyšlená křivka", async ({ page }) => {
      for (const stats of ["none", "error"]) {
        await page.setViewportSize({ width: 393, height: 852 });
        await page.goto(`/tests/harness.html?s=day&stats=${stats}`);
        await page.locator(".tile").first().waitFor();
        await page.locator('.tile[data-tile="sun"]').click();
        await page.locator(".sun-pop .bat-open").click();
        await expect(page.locator(".sun-detail .bat-nodata")).toContainText("–– bez dat");
        await expect(page.locator(".sun-detail .bat-chart")).toHaveCount(0);
        await tab(page, "Historie").click();
        await expect(page.locator(".sun-detail .bat-huge")).toHaveText("––");
        await expect(page.locator(".sun-detail .bat-nodata").first()).toContainText("–– bez dat");
        await tab(page, "Výhled").click();
        await expect(page.locator(".sun-detail .sun-five-row")).toHaveCount(0);
      }
      await open(page, "unavailable");
      await page.locator('.tile[data-tile="sun"]').click();
      const pop = page.getByRole("dialog", { name: "Slunce" });
      await expect(pop.locator(".pop-big")).toHaveText("––");
    });

    test("konfigurace: forecast.* má výchozí hodnoty a špatná hodnota pojmenuje klíč", async ({ page }) => {
      await open(page, "day");
      expect(await configError(page, { forecast: { default_range: "1d" } })).toMatch(/forecast\.default_range must be one of 7d, 30d/);
      expect(await configError(page, { forecast: { learn_days: 2 } })).toMatch(/forecast\.learn_days must be a whole number from 3 to 90/);
      expect(await configError(page, { forecast: { strip_from: 17, strip_to: 6 } })).toMatch(/forecast\.strip_from \(17\) must be below forecast\.strip_to \(6\)/);
      expect(await configError(page, { forecast: { car_start_soc: 20, car_stop_soc: 30 } })).toMatch(/forecast\.car_stop_soc \(30\) must be below forecast\.car_start_soc \(20\)/);
      expect(await configError(page, { forecast: { weather: "sensor.x" } })).toMatch(/forecast\.weather/);
      expect(await configError(page, { forecast: { energy_today: "sensor.energy_production_today", weather: "weather.home" } })).toBe("");
    });

    test("en a sv: žádný český text v popupu ani v detailu", async ({ page }) => {
      for (const lang of ["en", "sv"]) {
        await open(page, "day&forecast=1", 393, 852, "dark", lang);
        await page.locator('.tile[data-tile="sun"]').click();
        const popText = await page.locator(".sun-pop").evaluate((el) => el.textContent ?? "");
        expect(popText, lang).not.toMatch(/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/);
        await page.locator(".sun-pop .bat-open").click();
        for (const index of [0, 1, 2]) {
          await page.locator("ed-segmented").first().getByRole("radio").nth(index).click();
          await page.locator(".sun-hint").first().click();
          await settle(page);
          const text = await page.locator(".sun-detail").evaluate((el) => el.textContent ?? "");
          expect(text, `${lang} ${index}`).not.toMatch(/[áčďéěíňóřšťúůýžÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]/);
        }
      }
    });

    test("rozložení od 320 px bez posouvání, cíle aspoň 44 px a přístupnost (tmavý i světlý režim, všechny záložky)", async ({ page }) => {
      test.setTimeout(240000);
      for (const theme of ["dark", "light"] as const) {
        for (const width of [320, 393, 768]) {
          await openSun(page, "day&forecast=1", width, theme);
          for (const name of ["Dnes", "Historie", "Výhled"]) {
            await tab(page, name).click();
            await page.locator(".sun-hint").first().click();
            await settle(page);
            const at = `${theme} ${width} ${name}`;
            const layout = await page.evaluate((tag) => {
              const root = document.querySelector(tag)!.shadowRoot!;
              const page = root.querySelector(".page")!.getBoundingClientRect();
              const over = [...root.querySelectorAll<HTMLElement>(".sun-detail *")].filter((el) => !el.closest("svg") && el.getBoundingClientRect().width > 0 && (el.getBoundingClientRect().right > page.right + 0.5 || el.getBoundingClientRect().left < page.left - 0.5)).length;
              const targets = [...root.querySelectorAll<HTMLElement>(".bat-link, .sun-hint")].map((el) => el.getBoundingClientRect().height);
              return { scrollWidth: document.documentElement.scrollWidth, over, targets };
            }, CARD);
            expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
            expect(layout.over, at).toBe(0);
            for (const height of layout.targets) expect(height, at).toBeGreaterThanOrEqual(44);
            if (width === 393) expect(await axeViolations(page), at).toEqual([]);
          }
        }
      }
    });
  });
});
