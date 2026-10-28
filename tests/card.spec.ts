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
const TILES = ["sun", "bat", "grid", "house", "car", "boil", "batIn", "gridOut"];
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
    expect(settings.boilerShow).toBe("always");
  });

  test("chybná hodnota zastaví kartu srozumitelnou chybou s názvem klíče; prázdná hodnota = výchozí", async ({ page }) => {
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
      [{ mixing: { script: "prepnout_miseni_vody" } }, /mixing\.script must be an entity ID such as script\.example/],
      [{ mixing: { valve_c1: "switch.ventil", valve_c2: "switch.ventil" } }, /mixing\.valve_c1 and mixing\.valve_c2 must be two different valves/],
      [{ daily: { car: "Sensor Auto" } }, /daily\.car must be an entity ID/],
      [{ pv: "sensor.goodwe_pv_power" }, /"pv" must be a mapping of keys/],
      [{ pv: { power: "Sensor.GoodWe PV" } }, /pv\.power must be an entity ID/],
      [{ battery: { power: 351 } }, /battery\.power must be an entity ID/],
      [{ car: { soc: "sensor.parkovani_bmw_i3_soc" } }, /car: unknown key "soc" \(allowed: state_of_charge, range, image, charge_limit, image_scale\)/],
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
      [{ title: null, pv: null, battery: { power: null, state_of_charge: null, reserve: null }, mixing: { script: null }, colors: null, flows: { kw_from: null }, daily: null }, false],
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
      flows: { ...config.flows, kw_from: 100000 },
      colors: { ...config.colors, sun: "#FF0000" },
    });
    await expect(page.locator(".panel h2")).toHaveText(["Proud", "Moje auto", "Voda"]);
    await expect(page.locator(".meter .limit")).toHaveAttribute("style", /left:90%/);
    await expect(page.locator(".meter-label")).toContainText("limit 90 %");
    await expect(page.locator(".page")).toHaveAttribute("style", /--ed-sun:#FF0000/);
    expect((await tile(page, "sun")).value).toMatch(/^6\s800 W$/);
  });

  test("limit nabíjení 100 % se v měřiči nekreslí; práh toku z konfigurace rozhoduje, co je tok", async ({ page }) => {
    await open(page, "day");
    await expect(page.locator(".meter .limit")).toHaveCount(0);
    await update(page, { "sensor.goodwe_battery_power": "-90" }); // pod 100 W: baterie nenabíjí
    expect((await tile(page, "batIn")).on).toBe(false);
    const config = example();
    await reconfigure(page, { flows: { ...config.flows, idle_threshold: 50 } });
    expect((await tile(page, "batIn")).on).toBe(true);
  });
});

// ------------------------------------------------------------------ flows

test.describe("toky energie (CURRENT_SPEC.md, Karta Elektřina = Sankey)", () => {
  test("poledne: hodnoty ve všech dlaždicích v jedné jednotce, pásy podle zdrojů, věta o stavu", async ({ page }) => {
    await open(page, "day");
    const tiles = await readTiles(page);
    expect(tiles.map((item) => item.key)).toEqual(TILES);
    const shown = Object.fromEntries(tiles.map((item) => [item.key, item.value]));
    // Dům = spotřeba bez auta (4,1 kW) a bojleru (1,2 kW): 5,8 − 5,3 = 0,5 kW; všude kW s jednou desetinou.
    expect(shown).toMatchObject({ sun: "6,8 kW", car: "4,1 kW", boil: "1,2 kW", house: "0,5 kW", batIn: "0,8 kW", gridOut: "0,2 kW" });
    expect(shown.bat).toBe("nevybíjí");
    expect(shown.grid).toBe("neodebírá");
    await expect(stateLine(page, 0)).toContainText("Slunce nabíjí baterii i auto");
    await expect(page.locator(".flow svg path.dots")).toHaveCount(5);
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(new Set(fills)).toEqual(new Set(["url(#rg-sun)"]));
  });

  test("večer: dům z baterie a sítě, bez slunce; malé hodnoty ve W; Auto jen připojené", async ({ page }) => {
    await open(page, "full");
    const shown = Object.fromEntries((await readTiles(page)).map((item) => [item.key, item.value]));
    expect(shown).toMatchObject({ sun: "bez výroby", bat: "351 W", grid: "148 W", house: "459 W", car: "připojeno", boil: "bez ohřevu", batIn: "nenabíjí", gridOut: "nedodává" });
    await expect(stateLine(page, 0)).toContainText("Dům bere z baterie a sítě");
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(new Set(fills)).toEqual(new Set(["url(#rg-bat)", "url(#rg-grid)"]));
  });

  test("boost ze sítě: dům jede ze sítě, pásy ze sítě k autu a bojleru; dům jede ze sítě není upozornění", async ({ page }) => {
    await open(page, "grid");
    await expect(stateLine(page, 0)).toContainText("Dům jede ze sítě");
    expect((await tile(page, "grid")).value).toBe("10,3 kW");
    expect((await tile(page, "car")).aria).toBe("Auto 5,3 kW, nabíjí, nabití 50 %");
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(fills.filter((fill) => fill === "url(#rg-grid)").length).toBe(3);
  });

  test("šum pod prahem 100 W není tok: žádný pás, dlaždice nesvítí", async ({ page }) => {
    await open(page, "full");
    await update(page, { "sensor.goodwe_battery_power": "60", "sensor.goodwe_meter_active_power_total": "-40", "sensor.goodwe_house_consumption": "99" });
    await expect(page.locator(".flow svg path.dots")).toHaveCount(0);
    for (const item of await readTiles(page)) expect(item.on, item.key).toBe(false);
  });

  test("hladina v dlaždici: baterie, auto a bojler jako výplň pozadí; baterie pod rezervou oranžově", async ({ page }) => {
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
  });

  test("dlaždice Dům má barvu podle podílů zdrojů", async ({ page }) => {
    await open(page, "full");
    const house = (await tile(page, "house")).style;
    expect(house).toContain("--ed-battery");
    expect(house).toContain("--ed-grid");
    expect(house).not.toContain("--ed-sun");
  });

  test("Auto jen když je připojené; Bojler při show: heating jen při ohřevu a hold_minutes po něm", async ({ page }) => {
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

  test("hold po ohřevu přežije načtení stránky (localStorage), pozdě po ohřevu dlaždice zmizí", async ({ page }) => {
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

  test("popover dlaždice: dnešní součty, hladina; zavře se Escapem i klepnutím mimo", async ({ page }) => {
    await open(page, "day");
    const sun = page.locator('.tile[data-tile="sun"]');
    await sun.click();
    const pop = page.getByRole("dialog", { name: "Slunce" });
    await expect(pop).toBeVisible();
    await expect(pop).toContainText("Dnes vyrobeno");
    await expect(pop).toContainText("18,4 kWh");
    await expect(sun).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(pop).toHaveCount(0);
    await page.locator('.tile[data-tile="batIn"]').click();
    const battery = page.getByRole("dialog", { name: "Baterie" });
    await expect(battery).toContainText("88 %");
    await expect(battery).toContainText("Dnes nabito");
    await expect(battery).toContainText("5,2 kWh");
    await page.locator(".scrim").click({ position: { x: 5, y: 5 } });
    await expect(battery).toHaveCount(0);
    // Auto bez čítače: „––“, ne vymyšlené číslo.
    await page.locator('.tile[data-tile="car"]').click();
    await expect(page.getByRole("dialog", { name: "Auto" })).toContainText("––");
  });

  test("klepnutí na záhlaví: Dnes · kWh, Zdroje a Spotřeba; Dům je zbytek; bez čítačů auta a bojleru „––“", async ({ page }) => {
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
    await expect(use.getByRole("listitem").first()).toContainText("5,5");
    await expect(day.getByRole("list", { name: "Zdroje" })).toContainText("24,1");
  });
});

// ------------------------------------------------------------------ alerts

test.describe("upozornění (CURRENT_SPEC.md, Upozornění)", () => {
  test("jen skutečné odchylky; baterie na rezervě a dům na síti upozornění nejsou", async ({ page }) => {
    await open(page, "full");
    await expect(page.locator(".alerts")).toHaveCount(0);
    await update(page, { "sensor.goodwe_battery_state_of_charge": "12" });
    await expect(page.locator(".alerts")).toHaveCount(0);
    await update(page, { "sensor.goodwe_pv_power": "900" });
    expect(await alertTitles(page)).toEqual(["Auto je připojené, ale nenabíjí"]);
    await update(page, { "switch.wallbox_1_block_charging": "on" });
    expect(await alertTitles(page)).toEqual(["Nabíjení auta je zablokované"]);
  });

  test("Boost wallboxu (jen s připojeným autem) a Boost bojleru", async ({ page }) => {
    await open(page, "grid");
    expect(await alertTitles(page)).toEqual(["Boost wallboxu je zapnutý", "Boost bojleru je zapnutý"]);
    await update(page, { "sensor.wallbox_charge_status": "Disconnected", "sensor.wallbox_total_power": "0" });
    expect(await alertTitles(page)).toEqual(["Boost bojleru je zapnutý"]);
  });
});

// ------------------------------------------------------------------ panels

test.describe("karty auto a teplá voda (CURRENT_SPEC.md, Auto, Wallbox, Bojler, Zásobník, Mísení vody)", () => {
  test("auto nabíjí ze slunce: stav, odkud auto nabíjí, řádek Wallbox, stáří dat", async ({ page }) => {
    await open(page, "day");
    await expect(stateLine(page, 1)).toHaveText("Nabíjí ze slunce");
    await expect(page.locator(".soc")).toContainText("62");
    await expect(page.locator(".range")).toContainText("95 km");
    await expect(page.locator(".mix-head")).toContainText("Odkud auto nabíjí");
    await expect(page.locator(".mix-legend")).toContainText("Slunce100 %");
    await expect(page.locator(".row-btn .row-sub")).toContainText("nabíjí 4,1 kW");
    await expect(page.locator(".row-aside")).toHaveText("z auta právě teď");
    await expect(page.locator(".car-art img")).toHaveAttribute("src", /^data:image\/svg/);
    await expect(page.locator(".mode-sub")).toHaveText("Přetoky · jen z přebytku");
  });

  test("večer: auto připojené, nenabíjí; bez „Odkud auto nabíjí“; odpojené", async ({ page }) => {
    await open(page, "full");
    await expect(stateLine(page, 1)).toHaveText("Připojeno, nenabíjí");
    await expect(page.locator(".mix")).toHaveCount(0);
    await expect(page.locator(".row-btn .row-sub")).toHaveText("nenabíjí");
    await expect(stateLine(page, 2)).toHaveText("Bez ohřevu");
    await update(page, { "sensor.wallbox_charge_status": "Disconnected" });
    await expect(stateLine(page, 1)).toHaveText("Odpojeno");
  });

  test("boost ze sítě: „Nabíjí ze sítě · Boost“ a „Bojler ohřívá ze sítě“, odchylka oranžově", async ({ page }) => {
    await open(page, "grid");
    await expect(stateLine(page, 1)).toHaveText("Nabíjí ze sítě · Boost");
    await expect(stateLine(page, 2)).toHaveText("Bojler ohřívá ze sítě · Boost");
    expect(await stateLine(page, 1).evaluate((el) => (el as HTMLElement).style.getPropertyValue("--sc"))).toBe("var(--ed-warning)");
    await expect(page.locator(".mix-legend")).toContainText("Síť96 %");
    await expect(page.locator(".mode-sub")).toHaveText("Boost · bere i ze sítě a z baterie");
  });

  test("měřič nabití auta: limit jen pod 100 %, popisek čtečky", async ({ page }) => {
    await open(page, "day");
    await expect(page.locator(".meter")).toHaveAttribute("aria-label", "Nabití auta 62 %");
    await expect(page.locator(".meter .fill")).toHaveAttribute("style", /width:62%/);
    await reconfigure(page, { car: { ...example().car, charge_limit: 80 } });
    await expect(page.locator(".meter")).toHaveAttribute("aria-label", "Nabití auta 62 %, limit 80 %");
  });

  test("teplá voda: oblouky se stupnicí z konfigurace, cíl a výkon bojleru, zásobník ukazuje nastavenou teplotu", async ({ page }) => {
    await open(page, "day");
    const arcs = page.locator(".arc");
    await expect(arcs).toHaveCount(2);
    await expect(arcs.nth(0).locator(".arc-num b")).toHaveText("52");
    await expect(arcs.nth(0)).toHaveAttribute("aria-label", /Bojler 52 °C, ohřívá výkonem 1,2 kW, cíl 60 °C, stupnice 15 až 65 °C/);
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

  test("mísení: kapsle mezi dlaždicemi podle ventilů, nejasný stav je nepřepnutelný", async ({ page }) => {
    await open(page, "full");
    const capsule = page.getByRole("group", { name: "Mísení vody" });
    const toggle = capsule.getByRole("switch", { name: "Mísení vody" });
    await expect(toggle).toHaveAttribute("aria-checked", "false");
    await expect(page.locator(".link.on")).toHaveCount(0);
    await update(page, { "switch.technicka_mistnost_ventil_c1": "off", "switch.technicka_mistnost_ventil_c2": "on" });
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(page.locator(".link.on")).toHaveCount(2);
    await update(page, { "switch.technicka_mistnost_ventil_c1": "on", "switch.technicka_mistnost_ventil_c2": "on" });
    await expect(toggle).toBeDisabled();
    await expect(capsule).toContainText("nejasný stav ventilů");
  });
});

// --------------------------------------------------------------------- layout

test.describe("rozložení (CURRENT_SPEC.md, Mobil)", () => {
  for (const scenario of ["full", "day", "grid", "unavailable"]) {
    test(`${scenario}: bez vodorovného posouvání na 320–768 px i na šířku, nic se neořízne ani nepřekrývá, cíle aspoň 44 px`, async ({ page }) => {
      test.setTimeout(120_000);
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
    });
  }

  test("popover dlaždice zůstane celý v kartě na nejužší i nejširší šířce", async ({ page }) => {
    for (const width of [320, 393, 768]) {
      await open(page, "day", width);
      for (const key of ["sun", "gridOut", "house", "grid"]) {
        await page.locator(`.tile[data-tile="${key}"]`).click();
        const box = await page.evaluate((tag) => {
          const root = document.querySelector(tag)!.shadowRoot!;
          const pop = root.querySelector(".pop")!.getBoundingClientRect();
          const flow = root.querySelector(".flow")!.getBoundingClientRect();
          return { left: pop.left - flow.left, right: flow.right - pop.right };
        }, CARD);
        expect(box.left, `${width} ${key}`).toBeGreaterThanOrEqual(-0.5);
        expect(box.right, `${width} ${key}`).toBeGreaterThanOrEqual(-0.5);
        await page.keyboard.press("Escape");
      }
    }
  });
});

// ------------------------------------------------------------- missing data

test.describe("chybějící data (CURRENT_SPEC.md, Chybějící a zastaralá data)", () => {
  test("chybějící, nedostupné i neznámé hodnoty: „––“ neutrálně, čtečka řekne „bez dat“, žádné pásy, ovládání nic neodešle", async ({ page }) => {
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
    expect((await tile(page, "sun")).value).toBe("2,4 kW");
    expect((await tile(page, "gridOut")).value).toBe("1,4 kW");
  });

  test("denní součty bez čítačů: „––“ v popoveru i v záhlaví, žádné odhady", async ({ page }) => {
    await open(page, "unavailable");
    await page.locator(".title-btn").click();
    const day = page.getByRole("dialog", { name: /Dnes/ });
    await expect(day.locator(".day-total b")).toHaveText(["––", "––"]);
  });
});

// ------------------------------------------------------------------ controls

test.describe("ovládání (CURRENT_SPEC.md, Ovládání a pojistky)", () => {
  const radio = (page: Page, label: string, option: string) =>
    page.locator("ed-segmented").filter({ has: page.locator(`[aria-label="${label}"]`) }).getByRole("radio", { name: option });

  test("Wallbox se rozbalí a sbalí (aria-expanded), zavřený detail není ovladatelný", async ({ page }) => {
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

  test("chráněný přepínač (Mísení): jedno klepnutí jen ukáže nápovědu, podržení přepne", async ({ page }) => {
    await open(page, "full");
    const toggle = page.getByRole("switch", { name: "Mísení vody" });
    await toggle.click();
    expect(await calls(page)).toEqual([]);
    await expect(page.locator("ed-switch .hint")).toContainText("Podržte nebo klepněte dvakrát.");
    await page.waitForTimeout(3300);
    await expect(page.locator("ed-switch .hint")).toHaveCount(0);
    await hold(toggle);
    expect(await calls(page)).toEqual([{ domain: "script", service: "turn_on", data: { entity_id: "script.prepnout_miseni_vody" } }]);
  });

  test("Boost bojleru je Přetoky | Boost jako zásobník: klepnutí jen poradí, dvojklik a podržení přepne", async ({ page }) => {
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

  test("Přetoky | Boost: klepnutí nic nepošle a poradí, dvojklik i podržení přepne, klávesnice hned", async ({ page }) => {
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

  test("Přetoky | Boost jde přetáhnout jezdcem", async ({ page }) => {
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

  test("Boost při zablokovaném nabíjení nejdřív zablokování vypne a řekne to", async ({ page }) => {
    await open(page, "full");
    await update(page, { "switch.wallbox_1_block_charging": "on" });
    await radio(page, "Režim nabíjení auta", "Boost").dblclick();
    expect((await calls(page)).map((call) => `${call.service} ${call.data.entity_id}`)).toEqual([
      "turn_off switch.wallbox_1_block_charging",
      "turn_on switch.wallbox_boost",
    ]);
    await expect(page.locator(".feedback")).toContainText("blokování jsem vypnul");
  });

  test("volba se ukáže hned a bez potvrzení od Home Assistantu se po ui.revert_after vrátí", async ({ page }) => {
    await open(page, "full");
    await expand(page, "Wallbox");
    const block = page.getByRole("switch", { name: "Zablokovat nabíjení" });
    await block.click();
    await expect(block).toHaveAttribute("aria-checked", "true");
    await page.waitForTimeout(6300);
    await expect(block).toHaveAttribute("aria-checked", "false");
  });

  test("přepínače Zablokovat nabíjení a Přednost před bojlerem volají switch jedním klepnutím", async ({ page }) => {
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

  test("nabíjecí výkon: jen v boostu, celkový výkon všech fází, entita dostane výkon na fázi", async ({ page }) => {
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

  test("Cílové teploty: Přetoky ≥ Boost, slidery volají number.set_value", async ({ page }) => {
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

  test("zásobník: Auto | Manual | Off volá water_heater jedním klepnutím", async ({ page }) => {
    await open(page, "full");
    await radio(page, "Režim zásobníku", "Manual").click();
    await radio(page, "Režim zásobníku", "Off").click();
    expect(await calls(page)).toEqual([
      { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "heat" } },
      { domain: "water_heater", service: "set_operation_mode", data: { entity_id: "water_heater.technicka_mistnost_tado_tepla_voda", operation_mode: "off" } },
    ]);
  });

  test("Manual začne v rozsahu: zásobník hlásí 30 °C, karta nastaví nejnižší povolenou a ukáže ji hned; pak jde měnit", async ({ page }) => {
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

  test("Teplota a doba: v Auto změna přepne na Manual a pak nastaví teplotu; v Off je neaktivní; meze z konfigurace", async ({ page }) => {
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

  test("mísení: chráněný přepínač zavolá skript jen když se přání liší od skutečného stavu", async ({ page }) => {
    await open(page, "full");
    const toggle = page.getByRole("switch", { name: "Mísení vody" });
    await toggle.click();
    expect(await calls(page)).toEqual([]);
    await toggle.dblclick();
    expect(await calls(page)).toEqual([{ domain: "script", service: "turn_on", data: { entity_id: "script.prepnout_miseni_vody" } }]);
  });

  test("nedostupná entita: ovládání je neaktivní a nic se neodešle", async ({ page }) => {
    await open(page, "unavailable");
    await expandAll(page);
    for (const control of await page.getByRole("radio").all()) await expect(control).toBeDisabled();
    for (const toggle of await page.getByRole("switch").all()) await expect(toggle).toBeDisabled();
    for (const toggle of await page.getByRole("switch").all()) await toggle.dispatchEvent("click");
    expect(await calls(page)).toEqual([]);
  });

  test("prvky podle HIG: přepínač 60 × 32 s jezdcem 40 × 26, kapsle 48 px, slider 52 px s jezdcem 38 × 24", async ({ page }) => {
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

// -------------------------------------------------------------- accessibility

test.describe("přístupnost (CURRENT_SPEC.md, Mobil, režimy, přístupnost)", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`axe (${theme}): karta bez porušení, i bez dat, bez nadpisu, s rozbalenými detaily a s popoverem`, async ({ page }) => {
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
    });
  }

  test("klávesnice: šipka na Přetoky | Boost přepne hned, bez podržení", async ({ page }) => {
    await open(page, "full");
    const first = page.locator("ed-segmented").first().getByRole("radio", { name: "Přetoky" });
    await first.focus();
    await page.keyboard.press("ArrowRight");
    expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } }]);
  });

  test("klávesnice: mezerník na chráněném přepínači přepne hned; nechráněný taky", async ({ page }) => {
    await open(page, "full");
    const mixing = page.getByRole("switch", { name: "Mísení vody" });
    await mixing.focus();
    await page.keyboard.press("Space");
    expect(await calls(page)).toEqual([{ domain: "script", service: "turn_on", data: { entity_id: "script.prepnout_miseni_vody" } }]);
    await expand(page, "Wallbox");
    const toggle = page.getByRole("switch", { name: "Zablokovat nabíjení" });
    await toggle.focus();
    await page.keyboard.press("Space");
    expect((await calls(page)).at(-1)).toEqual({ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_1_block_charging" } });
  });

  test("dlaždice a záhlaví jdou ovládat klávesnicí a Escape zavře popover", async ({ page }) => {
    await open(page, "day");
    const sun = page.locator('.tile[data-tile="sun"]');
    await sun.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog", { name: "Slunce" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });
});
