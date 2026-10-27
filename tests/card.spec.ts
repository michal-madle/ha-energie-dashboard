import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { parse } from "yaml";
import { expect, test } from "./fixtures";
import type { Page } from "./fixtures";

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

// ------------------------------------------------------------- configuration

test.describe("konfigurace (CURRENT_SPEC.md, Konfigurace)", () => {
  test("příklad YAML obsahuje úplně všechna nastavení a projde kontrolou s výchozím nadpisem", async ({ page }) => {
    const all = [
      "type", "title",
      "pv.power",
      "battery.power", "battery.state_of_charge",
      "grid.power",
      "house.power",
      "car.state_of_charge", "car.range",
      "wallbox.power", "wallbox.status", "wallbox.boost", "wallbox.block_charging", "wallbox.prioritize_connected",
      "boiler.power", "boiler.temperature", "boiler.boost", "boiler.target_temperature", "boiler.boost_target_temperature",
      "tank.water_heater",
      "mixing.valve_c1", "mixing.valve_c2", "mixing.script",
    ];
    const leaves = (value: unknown, path = ""): string[] =>
      value && typeof value === "object" && !Array.isArray(value)
        ? Object.entries(value).flatMap(([key, item]) => leaves(item, path ? `${path}.${key}` : key))
        : [path];
    const found = leaves(example());
    expect(all.filter((key) => !found.includes(key)), "chybí v příkladu").toEqual([]);
    expect(found.filter((key) => !all.includes(key)), "neznámé klíče").toEqual([]);

    await open(page, "full");
    const [explicit, implicit] = await page.evaluate((config) => {
      const normalized = (value: unknown) => {
        const card = document.createElement("ha-energie-dashboard") as unknown as { setConfig(value: unknown): void; _config: unknown };
        card.setConfig(value);
        return JSON.stringify(card._config);
      };
      const bare = structuredClone(config);
      delete bare.title;
      return [normalized(config), normalized(bare)];
    }, example());
    expect(explicit).toEqual(implicit);
    expect(JSON.parse(explicit).entities.boiler.boost_target_temperature).toBe("number.tuv_2_2_boost_target_temperature");
  });

  test("chybná hodnota zastaví kartu srozumitelnou chybou s názvem klíče; prázdná hodnota = výchozí", async ({ page }) => {
    await open(page, "full");
    const cases: Array<[Record<string, unknown>, RegExp]> = [
      [{ wallbox: { boots: "switch.wallbox_boost" } }, /^Energie Dashboard: wallbox: unknown key "boots" \(allowed: power, status, boost, block_charging, prioritize_connected\)/],
      [{ wallbox: { boost: "sensor.wallbox_boost" } }, /wallbox\.boost must be a switch entity \(switch\.…\), not sensor\.wallbox_boost/],
      [{ boiler: { boost: "input_boolean.tuv_boost" } }, /boiler\.boost must be a switch entity/],
      [{ boiler: { target_temperature: "sensor.tuv_cil" } }, /boiler\.target_temperature must be a number entity/],
      [{ tank: { water_heater: "climate.tepla_voda" } }, /tank\.water_heater must be a water_heater entity/],
      [{ mixing: { script: "prepnout_miseni_vody" } }, /mixing\.script must be an entity ID such as script\.example/],
      [{ mixing: { valve_c1: "switch.ventil", valve_c2: "switch.ventil" } }, /mixing\.valve_c1 and mixing\.valve_c2 must be two different valves/],
      [{ pv: "sensor.goodwe_pv_power" }, /"pv" must be a mapping of keys/],
      [{ pv: { power: "Sensor.GoodWe PV" } }, /pv\.power must be an entity ID/],
      [{ battery: { power: 351 } }, /battery\.power must be an entity ID/],
      [{ car: { soc: "sensor.parkovani_bmw_i3_soc" } }, /car: unknown key "soc" \(allowed: state_of_charge, range\)/],
      [{ title: 5 }, /title must be a text/],
    ];
    for (const [patch, message] of cases) {
      expect(await configError(page, patch), JSON.stringify(patch)).toMatch(message);
    }
    expect(await configError(page, ["pv"] as unknown as Record<string, unknown>, true)).toMatch(/configuration must be a mapping/);
    const accepted: Array<[Record<string, unknown>, boolean]> = [
      [{ title: "" }, false],
      [{ title: null, pv: null, battery: { power: null, state_of_charge: null }, mixing: { script: null } }, false],
      [{ theme: "light", grid_options: { columns: 12 }, view_layout: { position: "main" } }, false],
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
    await expect(page.locator(".summary")).toContainText("Slunce nabíjí baterii i auto");
    // Jeden pás za zdroj a spotřebič: slunce → dům, auto, bojler, baterie, síť.
    await expect(page.locator(".flow svg path.dots")).toHaveCount(5);
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(new Set(fills)).toEqual(new Set(["url(#rg-sun)"]));
  });

  test("večer: dům z baterie a sítě, bez slunce; malé hodnoty ve W", async ({ page }) => {
    await open(page, "full");
    const shown = Object.fromEntries((await readTiles(page)).map((item) => [item.name, item.value]));
    expect(shown).toMatchObject({ Slunce: "nevyrábí", Baterie: "351 W", "Síť": "148 W", Dům: "459 W", Auto: "připojeno", Bojler: "vypnuto" });
    await expect(page.locator(".summary")).toContainText("Dům bere z baterie a sítě");
    const fills = await page.locator(".flow svg > g > path:first-child").evaluateAll((paths) => paths.map((path) => path.getAttribute("fill")));
    expect(new Set(fills)).toEqual(new Set(["url(#rg-bat)", "url(#rg-grid)"]));
  });

  test("boost ze sítě: dům jede ze sítě, pásy ze sítě k autu a bojleru", async ({ page }) => {
    await open(page, "grid");
    await expect(page.locator(".summary")).toContainText("Dům jede ze sítě");
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
});

// --------------------------------------------------------------------- layout

test.describe("rozložení (CURRENT_SPEC.md, Mobil)", () => {
  test("bez vodorovného posouvání na 320–768 px i na šířku, nic se neořízne ani nepřekrývá, cíle aspoň 44 px", async ({ page }) => {
    const sizes = [...WIDTHS.map((width) => [width, 852] as const), LANDSCAPE];
    for (const scenario of ["full", "day", "grid", "unavailable"]) {
      for (const [width, height] of sizes) {
        await open(page, scenario, width, height);
        const at = `${scenario} ${width} × ${height}`;
        const layout = await page.evaluate((tag) => {
          const root = document.querySelector(tag)!.shadowRoot!;
          const card = root.querySelector(".dashboard")!.getBoundingClientRect();
          const boxes = [...root.querySelectorAll<HTMLElement>(".tile")].map((item) => {
            const box = item.getBoundingClientRect();
            const text = item.querySelector<HTMLElement>(".text")!;
            return { name: item.querySelector(".name")?.textContent, left: box.left, right: box.right, top: box.top, bottom: box.bottom, height: box.height, cut: text.scrollWidth > text.clientWidth + 0.5 || text.getBoundingClientRect().right > box.right + 0.5 };
          });
          const controls = [...root.querySelectorAll("ed-segmented, ed-slider")].flatMap((host) =>
            [...(host.shadowRoot?.querySelectorAll<HTMLElement>("button, input") ?? [])].map((el) => el.getBoundingClientRect().height),
          );
          return { scrollWidth: document.documentElement.scrollWidth, card: { left: card.left, right: card.right }, boxes, controls };
        }, CARD);
        expect(layout.scrollWidth, at).toBeLessThanOrEqual(width);
        expect(layout.card.right, at).toBeLessThanOrEqual(width);
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
        expect(tiles.map((item) => item.name), at).toEqual(TILES);
        for (const item of tiles) {
          expect(item.value, `${at}: ${item.name}`).toBe("––");
          expect(item.on, `${at}: ${item.name}`).toBe(false);
        }
        await expect(page.locator(".flow svg path.dots"), at).toHaveCount(0);
        await expect(page.locator(".summary"), at).toContainText("––");
        await expect(page.locator(".summary .sr-only"), at).toHaveText("bez dat");
      }
    }
    // A pushed state change is picked up at once.
    await open(page, "missing");
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.update({ "sensor.goodwe_pv_power": "2400", "sensor.goodwe_house_consumption": "1000", "sensor.goodwe_meter_active_power_total": "1400" });
    });
    expect((await tile(page, "Slunce")).value).toBe("2,4 kW");
    expect((await tile(page, "Do sítě")).value).toBe("1,4 kW");
  });
});

// ------------------------------------------------------------------ controls

test.describe("ovládání (CURRENT_SPEC.md, Ovládání a pojistky)", () => {
  const pick = (page: Page, label: string, option: string) =>
    page.locator(`ed-segmented`).filter({ has: page.locator(`[aria-label="${label}"]`) }).getByRole("radio", { name: option }).click();

  test("Boost wallboxu a bojleru volá switch; vybraná volba se ukáže hned", async ({ page }) => {
    await open(page, "full");
    await pick(page, "Režim nabíjení auta", "Boost");
    await pick(page, "Režim ohřevu bojleru a jeho cílová teplota", "Boost");
    expect(await calls(page)).toEqual([
      { domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } },
      { domain: "switch", service: "turn_on", data: { entity_id: "switch.tuv_boost" } },
    ]);
    await expect(page.getByRole("radio", { name: "Boost" }).first()).toHaveAttribute("aria-checked", "true");
  });

  test("Boost při zablokovaném nabíjení nejdřív zablokování vypne a řekne to", async ({ page }) => {
    await open(page, "full");
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.update({ "switch.wallbox_1_block_charging": "on" });
    });
    await pick(page, "Režim nabíjení auta", "Boost");
    expect((await calls(page)).map((call) => `${call.service} ${call.data.entity_id}`)).toEqual([
      "turn_off switch.wallbox_1_block_charging",
      "turn_on switch.wallbox_boost",
    ]);
    await expect(page.locator(".feedback")).toContainText("blokování jsem vypnul");
  });

  test("posuvník bojleru: cíl přetoků ≥ cíl boostu; slider volá number.set_value; zásobník volá water_heater", async ({ page }) => {
    await open(page, "full");
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

  test("nedostupná entita: ovládání je neaktivní a nic se neodešle", async ({ page }) => {
    await open(page, "unavailable");
    for (const radio of await page.getByRole("radio").all()) await expect(radio).toBeDisabled();
    await expect(page.locator("ha-switch").first()).toHaveJSProperty("disabled", true);
    expect(await calls(page)).toEqual([]);
  });

  test("slidery a radiobuttony jsou protáhlé (iOS 27): přepínač ≥ 52 px, jezdec ≥ 40 px vysoký a ≥ 50 px dlouhý", async ({ page }) => {
    await open(page, "full");
    const sizes = await page.evaluate(() => {
      const root = document.querySelector("ha-energie-dashboard")!.shadowRoot!;
      const seg = root.querySelector("ed-segmented")!.shadowRoot!.querySelector<HTMLElement>(".track")!.getBoundingClientRect();
      const input = root.querySelector("ed-slider")!.shadowRoot!.querySelector<HTMLElement>("input")!;
      const thumb = getComputedStyle(input, "::-webkit-slider-thumb");
      return { segHeight: seg.height, thumbWidth: parseFloat(thumb.width), thumbHeight: parseFloat(thumb.height) };
    });
    expect(sizes.segHeight).toBeGreaterThanOrEqual(52);
    expect(sizes.thumbHeight).toBeGreaterThanOrEqual(40);
    expect(sizes.thumbWidth).toBeGreaterThanOrEqual(50);
  });

  test("zablokované nabíjení a nevyužitá přednost se ukážou jako upozornění", async ({ page }) => {
    await open(page, "full");
    await expect(page.locator(".notice")).toHaveCount(0);
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.update({ "sensor.goodwe_pv_power": "900" });
    });
    await expect(page.locator(".notice.warn")).toContainText("Auto je připojené, ale nenabíjí");
    await page.evaluate(() => {
      // @ts-expect-error test hook
      window.__test.update({ "switch.wallbox_1_block_charging": "on" });
    });
    await expect(page.locator(".notice")).toHaveText(/Nabíjení auta je zablokované/);
  });
});

// -------------------------------------------------------------- accessibility

test.describe("přístupnost (CURRENT_SPEC.md, Mobil, režimy, přístupnost)", () => {
  for (const theme of ["dark", "light"] as const) {
    test(`axe (${theme}): karta bez porušení, i bez dat a bez nadpisu`, async ({ page }) => {
      for (const scenario of ["full", "day", "unavailable", "missing"]) {
        await open(page, scenario, 393, 852, theme);
        expect(await axeViolations(page), scenario).toEqual([]);
      }
      await reconfigure(page, { title: "" });
      expect(await axeViolations(page, ["page-has-heading-one"]), "title: \"\"").toEqual([]);
    });
  }

  test("klávesnice: šipky přepínají volbu v radiogroupu a jezdec jde ovládat šipkami", async ({ page }) => {
    await open(page, "full");
    const first = page.locator("ed-segmented").first().getByRole("radio", { name: "Přetoky" });
    await first.focus();
    await page.keyboard.press("ArrowRight");
    expect(await calls(page)).toEqual([{ domain: "switch", service: "turn_on", data: { entity_id: "switch.wallbox_boost" } }]);
  });
});
