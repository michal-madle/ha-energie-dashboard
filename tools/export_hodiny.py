#!/usr/bin/env python3
"""Export hodinových dat za posledních N dní z Home Assistantu do CSV (pro návrh popisků a výhledu).

Co dělá: přes WebSocket API Home Assistantu přečte dlouhodobé statistiky (po hodinách; Home Assistant je
drží trvale, na rozdíl od stavů, které se po 10 dnech mažou) a zapíše je do jednoho CSV, jeden řádek na
hodinu. K tomu vytvoří šablonu popisky_sablona.csv se stejnými řádky a prázdnými sloupci, do kterých
můžete napsat větu, kterou byste v dané hodině chtěl vidět (hlavní karta, auto, ...).

Nic v Home Assistantu nemění, jen čte.

Použití:
  pip install websocket-client
  python3 export_hodiny.py --url http://homeassistant.local:8123 --token <dlouhodobý přístupový token> --days 14

Token: profil uživatele v Home Assistantu → Zabezpečení → Dlouhodobé přístupové tokeny → Vytvořit token.
Výstup (v aktuální složce): energie_hodiny.csv, popisky_sablona.csv, export_report.txt.
Pošlete mi je (nebo vložte obsah); v souborech nejsou polohy ani tokeny, jen hodinové hodnoty výkonů a nabití.
"""
import argparse
import csv
import json
import sys
from datetime import datetime, timedelta, timezone

try:
    import websocket  # websocket-client
except ImportError:
    sys.exit("Chybí knihovna: pip install websocket-client")

# Entity z examples/energie.yaml (karta Energie). Upravte, pokud máte jiná ID.
ENTITIES = {
    "fve_w": "sensor.goodwe_pv_power",
    "baterie_w": "sensor.goodwe_battery_power",           # kladné = vybíjení
    "baterie_soc": "sensor.goodwe_battery_state_of_charge",
    "sit_w": "sensor.goodwe_meter_active_power_total",     # záporné = odběr ze sítě
    "dum_w": "sensor.goodwe_house_consumption",
    "wallbox_w": "sensor.wallbox_total_power",
    "bojler_w": "sensor.tuv_power_total",
    "auto_soc": "sensor.parkovani_bmw_i3_soc",
}


def call(ws, counter, payload):
    counter[0] += 1
    payload["id"] = counter[0]
    ws.send(json.dumps(payload))
    while True:
        msg = json.loads(ws.recv())
        if msg.get("id") == counter[0]:
            return msg


def hourly_from_history(events, start, end):
    """Časově vážený hodinový průměr, minimum a maximum ze stavů (pro entity bez dlouhodobých statistik).

    events: [(čas v sekundách, hodnota)] seřazené; hodnota platí do další změny."""
    out = {}
    pts = [(t, v) for t, v in events if v is not None]
    if not pts:
        return out
    t0 = int(start.timestamp())
    t1 = int(end.timestamp())
    hour = t0 - t0 % 3600
    while hour < t1:
        h_end = hour + 3600
        # hodnota platná na začátku hodiny = poslední stav před ní
        prev = [v for t, v in pts if t <= hour]
        cur = prev[-1] if prev else None
        cursor = hour
        acc = 0.0
        covered = 0.0
        vals = [cur] if cur is not None else []
        for t, v in pts:
            if t <= hour or t >= h_end:
                continue
            if cur is not None:
                acc += cur * (t - cursor)
                covered += t - cursor
            cur, cursor = v, t
            vals.append(v)
        if cur is not None:
            acc += cur * (h_end - cursor)
            covered += h_end - cursor
        if covered > 0 and vals:
            out[hour] = {"mean": acc / covered, "min": min(vals), "max": max(vals)}
        hour = h_end
    return out


def history_series(ws, counter, eid, start, end):
    res = call(ws, counter, {
        "type": "history/history_during_period",
        "start_time": start.isoformat(),
        "end_time": end.isoformat(),
        "entity_ids": [eid],
        "include_start_time_state": True,
        "significant_changes_only": False,
        "minimal_response": True,
        "no_attributes": True,
    })
    if not res.get("success"):
        return []
    rows = res["result"].get(eid) or []
    events = []
    for r in rows:
        try:
            v = float(r.get("s", r.get("state")))
        except (TypeError, ValueError):
            continue
        t = r.get("lu", r.get("last_updated", r.get("last_changed")))
        if isinstance(t, str):
            t = datetime.fromisoformat(t.replace("Z", "+00:00")).timestamp()
        if t is None:
            continue
        events.append((float(t), v))
    events.sort()
    return events


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True, help="adresa, kterou otevíráte v prohlížeči, např. http://192.168.1.50:8123 "
                    "(nebo https://vase.domena); převede se na WebSocket adresu automaticky")
    ap.add_argument("--token", required=True)
    ap.add_argument("--days", type=int, default=14)
    ap.add_argument("--outdir", default=".")
    a = ap.parse_args()

    url = a.url.strip().rstrip("/")
    if url.startswith("http://"):
        url = "ws://" + url[7:]
    elif url.startswith("https://"):
        url = "wss://" + url[8:]
    elif "://" not in url:
        url = "ws://" + url
    if not url.endswith("/api/websocket"):
        url += "/api/websocket"
    try:
        ws = websocket.create_connection(url, timeout=60)
    except OSError as e:
        sys.exit(f"Nelze se připojit na {url}\n  {e}\n"
                 "Použijte přesně adresu (včetně portu), kterou otevíráte Home Assistant v prohlížeči na tomto počítači. "
                 "Odmítnuté spojení znamená, že na té adrese/portu nic neposlouchá (špatná IP nebo port, "
                 "u VirtualBoxu NAT bez přesměrování portu 8123, nebo má HA HTTPS a je potřeba https://...).")
    first = json.loads(ws.recv())
    if first.get("type") != "auth_required":
        sys.exit(f"Neočekávaná odpověď: {first}")
    ws.send(json.dumps({"type": "auth", "access_token": a.token}))
    ok = json.loads(ws.recv())
    if ok.get("type") != "auth_ok":
        sys.exit("Přihlášení se nezdařilo (zkontrolujte token).")

    counter = [0]
    end = datetime.now(timezone.utc).replace(minute=0, second=0, microsecond=0)
    start = end - timedelta(days=a.days)
    res = call(ws, counter, {
        "type": "recorder/statistics_during_period",
        "start_time": start.isoformat(),
        "end_time": end.isoformat(),
        "statistic_ids": list(ENTITIES.values()),
        "period": "hour",
        "types": ["mean", "min", "max"],
    })
    if not res.get("success"):
        sys.exit(f"Chyba API: {res}")
    stats = res["result"]

    report = []
    rows = {}
    for key, eid in ENTITIES.items():
        series = stats.get(eid)
        if not series:
            # bez state_class nejsou dlouhodobé statistiky; zkusíme historii stavů (Home Assistant ji drží jen ~10 dní)
            hist = hourly_from_history(history_series(ws, counter, eid, start, end), start, end)
            if not hist:
                report.append(f"BEZ DAT: {eid} (entita neexistuje nebo nemá ani historii stavů)")
                continue
            report.append(f"{eid}: {len(hist)} hodin ze stavů (bez dlouhodobých statistik, jen posledních ~10 dní)")
            series = [{"start": h * 1000, **v} for h, v in hist.items()]
        else:
            report.append(f"{eid}: {len(series)} hodin")
        for p in series:
            t = datetime.fromtimestamp(p["start"] / 1000, tz=timezone.utc).astimezone()
            r = rows.setdefault(t, {})
            r[key] = p.get("mean")
            r[key + "_min"] = p.get("min")
            r[key + "_max"] = p.get("max")

    cols = []
    for key in ENTITIES:
        cols += [key, key + "_min", key + "_max"]
    with open(f"{a.outdir}/energie_hodiny.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["cas", "hodina", "den_v_tydnu"] + cols)
        for t in sorted(rows):
            r = rows[t]
            w.writerow([t.isoformat(timespec="minutes"), t.hour, t.isoweekday()] +
                       ["" if r.get(c) is None else round(r[c], 2) for c in cols])
    with open(f"{a.outdir}/popisky_sablona.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["cas", "hlavni_karta_veta", "auto_veta", "bojler_veta", "poznamka"])
        for t in sorted(rows):
            w.writerow([t.isoformat(timespec="minutes"), "", "", "", ""])
    with open(f"{a.outdir}/export_report.txt", "w", encoding="utf-8") as f:
        f.write("\n".join(report) + "\n")
    print("\n".join(report))
    print(f"Hotovo: {len(rows)} hodin. Soubory: energie_hodiny.csv, popisky_sablona.csv, export_report.txt")


if __name__ == "__main__":
    main()
