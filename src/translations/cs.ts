/*
 * Czech texts of the card: the source of all three languages (CURRENT_SPEC.md, Jazyky). The
 * English (en.ts) and Swedish (sv.ts) dictionaries have exactly the same keys, which the build
 * checks; a change here belongs into both of them in the same commit. Texts from the YAML
 * (title, panel names) are never translated. Values arrive already formatted ("1,2 kW", "65 %").
 */

export const cs = {
  /** Heading without `title` in the YAML. */
  title: "Energie",
  /** Card picker of Home Assistant. */
  cardDescription: "Energie domu: toky jako Sankey diagram, auto s wallboxem a teplá voda (bojler, zásobník, mísení) s ovládáním.",
  /** Panel headings without `titles.*` in the YAML. */
  titles: { electricity: "Elektřina", car: "BMW i3", water: "Teplá voda" },

  // Words used in many places
  /** A value that is missing, for screen readers ("––" on screen) and in lists of spoken details. */
  noData: "bez dat",
  close: "Zavřít",
  /** Small connecting word of source lists: "ze slunce a baterie". */
  and: "a",
  /** "před 4 min" for the age of a reading. */
  ago: {
    now: "právě teď",
    minutes: (count: number) => `před ${count} min`,
    hours: (count: number) => `před ${count} h`,
    days: (count: number) => `před ${count} d`,
  },

  // Sources of energy: "ze slunce", "z baterie a sítě" (from-form first, then the form after "a")
  from: { sun: "ze slunce", bat: "z baterie", grid: "ze sítě" },
  alsoFrom: { sun: "slunce", bat: "baterie", grid: "sítě" },
  /** Names of the sources in lists (car sources). */
  source: { sun: "Slunce", bat: "Baterie", grid: "Síť" },

  // Sentence under the heading of Elektřina
  summary: {
    exportSurplus: "Přebytek jde do sítě",
    sunChargesCar: (withBattery: boolean) => `Slunce nabíjí ${withBattery ? "baterii i " : ""}auto`,
    sunChargesBattery: "Slunce nabíjí baterii",
    sunCoversHouse: "Slunce pokrývá dům",
    fromGrid: "Dům jede ze sítě",
    fromBattery: "Dům jede z baterie",
    nothing: "Dům nic neodebírá",
    houseTakes: (sources: string) => `Dům bere ${sources}`,
  },

  // Alerts (Upozornění)
  alerts: {
    heading: "Upozornění",
    blocked: { title: "Nabíjení auta je zablokované", text: "Auto nenabíjí, ani v Boostu. Přebytek ohřívá vodu." },
    priorityWaiting: {
      title: "Auto je připojené, ale nenabíjí",
      text: "Přednost před bojlerem je zapnutá, ale slunce zřejmě nestačí na rozjezd wallboxu.",
    },
    boostWallbox: { title: "Boost wallboxu je zapnutý", text: "Auto smí nabíjet i ze sítě a z baterie." },
    boostBoiler: { title: "Boost bojleru je zapnutý", text: "Bojler smí topit i ze sítě a z baterie." },
  },

  // Tiles of the flow diagram
  flowLabel: "Toky energie",
  tile: { sun: "Slunce", bat: "Baterie", grid: "Síť", house: "Dům", car: "Auto", boil: "Bojler", batIn: "Baterie", gridOut: "Do sítě" },
  idle: {
    sun: "bez výroby",
    bat: "nevybíjí",
    grid: "neodebírá",
    house: "bez odběru",
    carDisconnected: "odpojeno",
    carNoState: "bez stavu",
    carConnected: "připojeno",
    boil: "bez ohřevu",
    batIn: "nenabíjí",
    gridOut: "nedodává",
  },
  /** Extra words of the spoken name of a tile. */
  tileSpoken: {
    gridImport: "odběr",
    gridExport: "dodávka",
    houseOther: "ostatní spotřeba",
    charging: "nabíjí",
    heating: "ohřev",
    atReserve: "na rezervě",
    chargeLevel: (value: string) => `nabití ${value}`,
    temperature: (value: string) => `teplota ${value}`,
    batteryState: (discharging: boolean): string => (discharging ? "vybíjení" : "nabíjení"),
  },

  // Popups of the tiles and of the heading
  pop: {
    discharging: (power: string) => `vybíjí ${power}`,
    charging: (power: string) => `nabíjí ${power}`,
    importing: (power: string) => `odebírá ${power}`,
    exporting: (power: string) => `dodává ${power}`,
    carConnectedIdle: "připojeno, nenabíjí",
    heating: (power: string) => `ohřev ${power}`,
    level: "Nabití",
    atReserve: "na rezervě",
    temperature: "Teplota",
    rows: {
      discharged: "Dnes vybito",
      charged: "Dnes nabito",
      imported: "Dnes odebráno",
      exported: "Dnes dodáno",
      produced: "Dnes vyrobeno",
      consumed: "Dnes spotřebováno",
      carCharged: "Dnes nabito",
      boilerHeated: "Dnes ohřev",
    },
    day: "Dnes",
    sources: "Zdroje",
    consumption: "Spotřeba",
    fromBattery: "Z baterie",
    fromGrid: "Ze sítě",
    toBattery: "Do baterie",
  },

  // Car panel
  car: {
    charging: (sources: string) => `Nabíjí ${sources}`,
    connectedIdle: "Připojeno, nenabíjí",
    disconnected: "Odpojeno",
    openDashboard: "Otevřít dashboard auta",
    chargeLevel: (value: string, limit: string | undefined) => `Nabití auta ${value}${limit === undefined ? "" : `, limit ${limit}`}`,
    range: "dojezd",
    limit: (value: string) => `limit ${value}`,
    mode: "Režim nabíjení",
    modeLabel: "Režim nabíjení auta",
    modeSurplus: "Přetoky · jen z přebytku",
    modeBoost: "Boost · bere i ze sítě a z baterie",
    sourcesTitle: "Odkud auto nabíjí",
    sourcesLabel: "Odkud auto nabíjí, průměr za 5 minut",
    power: "Nabíjecí výkon",
    powerLabel: "Nabíjecí výkon wallboxu",
  },
  /** The two charging and heating modes (segmented control). */
  boostOptions: { off: "Přetoky", on: "Boost" },

  // Wallbox
  wallbox: {
    title: "Wallbox",
    charging: "nabíjí",
    idle: "nenabíjí",
    disconnected: "odpojeno",
    fromCar: (age: string) => `z auta ${age}`,
    block: "Zablokovat nabíjení",
    blockOn: "Auto nenabíjí, přebytek ohřívá vodu",
    blockOff: "Auto smí nabíjet",
    priority: "Přednost před bojlerem",
    priorityOn: "Auto nabíjí dřív než bojler",
    priorityOff: "Auto nemá přednost",
  },

  // Hot water panel
  water: {
    boilerHeats: (sources: string) => `Bojler ohřívá ${sources}`,
    noHeating: "Bez ohřevu",
    boilerTitle: "Bojler (FVE)",
    notHeating: "neohřívá",
    target: (value: string) => `cíl ${value}`,
    boilerLabel: (temperature: string, state: string, target: string | undefined, from: string, to: string) =>
      `Bojler ${temperature}, ${state}${target === undefined ? "" : `, cíl ${target}`}, stupnice ${from} až ${to}`,
    heatingWith: (power: string) => `ohřívá výkonem ${power}`,
    boostMode: "Režim ohřevu bojleru",
    targets: "Cílové teploty",
    targetFlow: "Přetoky",
    targetBoost: "Boost",
    targetFlowHint: "jen z přebytku",
    targetBoostHint: "i ze sítě a z baterie",
    targetsRule: "Přetoky nesmí být pod Boostem.",
    targetSliderLabel: (name: string) => `Cíl ohřevu bojleru, ${name}`,
    targetSliderSpoken: (value: string, name: string) => `${value}, ${name}`,
    targetWhat: (name: string) => `Cíl ohřevu bojleru (${name})`,
    mixing: "Mísení vody",
    mixingUnclear: "nejasný stav ventilů",
  },

  // Tank (gas)
  tank: {
    title: "Zásobník (plyn)",
    modes: { auto: "Auto", heat: "Manual", off: "Off" } as Record<string, string>,
    modeLabel: "Režim zásobníku",
    temperature: "Teplota",
    sliderLabel: "Teplota zásobníku",
    keepsMinimum: "kotel drží minimum",
    setManually: "nastaveno ručně",
    byPlan: "podle plánu",
    summaryOff: (value: string) => `${value} · vypnuto`,
    summaryManual: (value: string) => `${value} · ručně`,
    summaryPlan: (value: string) => `${value} · podle plánu`,
    hintOff: "zásobník je vypnutý",
    hintManual: "nastavujete ručně",
    hintPlan: "podle plánu; změna přepne na Manual",
    sliderSpoken: (value: string) => `${value}, nastavená teplota`,
    label: (setting: string, mode: string, from: string, to: string) =>
      `Zásobník, ${setting}, režim ${mode}, naměřená teplota není, stupnice ${from} až ${to}`,
    settingNoData: "nastavení bez dat",
    settingOff: (minimum: string) => `vypnuto, kotel drží ${minimum}`,
    settingSet: (value: string) => `nastaveno ${value}`,
  },

  // Hints of the protected controls (hold or double tap)
  hint: {
    holdOrDouble: "Podržte nebo klepněte dvakrát.",
    holdDragOrDouble: "Podržte, přetáhněte nebo klepněte dvakrát.",
  },

  // Feedback under the card
  feedback: {
    noData: (what: string) => `${what}: entita nehlásí data, nic jsem neodeslal.`,
    rejected: (what: string) => `${what}: Home Assistant příkaz nepřijal.`,
    unblocked: "Nabíjení bylo zablokované, blokování jsem vypnul, aby boost fungoval.",
    mixingNotSent: "Mísení vody: příkaz se neodeslal.",
  },

  // Popup and detail of the battery (CURRENT_SPEC.md, Baterie)
  bat: {
    open: "Detail baterie",
    back: "Zpět",
    done: "Hotovo",
    title: "Baterie",
    detailLabel: "Detail baterie",
    tabsLabel: "Část detailu baterie",
    tabs: { now: "Dnes", hist: "Historie", health: "Zdraví" } as Record<string, string>,
    rangeLabel: "Období historie",
    ranges: { "1d": "1 den", "7d": "7 dní", "30d": "30 dní" } as Record<string, string>,
    spanLabel: "Rozsah grafu",
    spans: { "6h": "6 h", "24h": "24 h" } as Record<string, string>,
    level: "Nabití",
    levelLabel: (value: string, reserve: string) => `Nabití ${value}, rezerva ${reserve}`,
    fullIn: (time: string) => `Plná za asi ${time}`,
    lastsFor: (time: string) => `Vydrží asi ${time}`,
    today: "Dnes",
    charging: "nabíjení",
    discharging: "vybíjení",
    now: "teď",
    noDataChart: "–– bez dat",
    trendLabel: "Výkon baterie dnes od půlnoci",
    scrubLabel: "Posun v čase",
    status: { charging: "Nabíjí se", discharging: "Vybíjí se", idle: "Nečinná" },
    live: { power: "Výkon", current: "Proud", voltage: "Napětí", load: "Zátěž", loadSub: "výkon ÷ kapacita", chargeCurrent: "nabíjecí", dischargeCurrent: "vybíjecí", ofBattery: "baterie" },
    levelChart: "Nabití a výkon",
    levelLegend: "nabití",
    energyToday: "Energie dnes",
    charged: "Nabito",
    discharged: "Vybito",
    netStored: (value: string) => `Čistě uloženo ${value}`,
    net: "čistě",
    energyHours: "Energie po hodinách",
    energyDays: "Denní energie",
    kpi: {
      efficiency: "Účinnost cyklu",
      efficiencySub: "vybito ÷ nabito",
      cycles: "Ekvivalentní cykly",
      cyclesSub: (capacity: string) => `vybito ÷ ${capacity}`,
      lowest: "Nejnižší nabití",
      lowestSub: "minimum nabití",
      peak: "Špička výkonu",
      peakSub: "nabíjení i vybíjení",
      over: (range: string) => `za ${range}`,
    },
    bandsTitle: "Čas v pásmech nabití",
    bandsNote: "Podíl času za zvolené období, z historie nabití.",
    health: {
      ok: "Baterie je v pořádku",
      okSub: "Bez chyb a varování",
      error: (text: string) => `Chyba ${text}`,
      warning: (text: string) => `Varování ${text}`,
      problemSub: "Podrobnosti v diagnostice",
      noData: "Bez dat",
      noDataSub: "Baterie neposílá data",
      capacity: "Kapacita",
      capacitySub: (usable: string, total: string) => `využitelná ≈ ${usable} z ${total}`,
      balance: "Vyvážení článků",
      balanceSub: "rozdíl nejnižšího a nejvyššího článku",
      words: { good: "Výborné", ok: "Dobré", warn: "Pozor", fault: "Chyba" },
      temperature: "Teplota",
      temperatureSub: (spread: string) => `nejteplejší článek · rozptyl ${spread}`,
      battery: "Baterie",
      inverterAir: "Střídač, vzduch",
      inverterRadiator: "Střídač, chladič",
      life: "Životnost",
      cycles: (count: string) => `${count} cyklů`,
      lifeSub: (efficiency: string) => `účinnost celkem ${efficiency}`,
      totalCharged: "Celkem nabito",
      totalDischarged: "Celkem vybito",
      diagnostics: "Diagnostika",
      mode: "Režim",
      chargeLimit: "Limit nabíjení",
      dischargeLimit: "Limit vybíjení",
      errors: "Chyby a varování",
      none: "žádné",
      min: "min",
      max: "max",
      difference: "rozdíl",
      rangeLegend: "min–max",
      expand: (name: string) => `${name}, zobrazit historii`,
    },
  },
};
