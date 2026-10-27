# HA entities – exporty entit z Home Assistantu

Sem patří exporty entit, ze kterých vychází `ENTITY_MAP.md`. Bez exportu není žádná entita „potvrzená“.

| Soubor | Obsah |
|---|---|
| [energie.json](./energie.json) | export 24. 10. 2026, 22:53 (358 entit: střídač, AZ Router, zásobník, ventily, auto) |
| [export_entit.jinja](./export_entit.jinja) | šablona, která export vytvoří |

Formát je stejný jako ve složce `HA entities/` projektu Klima (`entity`, `name`, `state`), navíc s údaji, které energie potřebuje ověřit: `system`, `unit`, `device_class`, `state_class`, `attributes` (jen `options` a nastavení zásobníku / čísel), `last_changed`, `last_updated`, `last_reported`. Entita bez stavu nebo nenalezená kotva má `"state": null` a poznámku `note`.

**Repozitář je veřejný.** Hodnoty polohy GPS, sériových čísel a MAC adres šablona vypíše jako `"(skryto)"`. Před uložením nového exportu zkontrolujte, že v něm nic takového nezůstalo.

## Postup (asi 3 minuty, nic v Home Assistantu nemění)

1. V Home Assistantu otevřete v levém panelu **Nástroje** (*Tools*; do verze 2026.7 **Nástroje pro vývojáře**) a nahoře záložku **Šablona** (*Template*).
2. Klikněte do levého pole **Editor šablony**, označte vše (Ctrl+A, na Macu ⌘A) a smažte. Pole se tím změní jen u vás v prohlížeči.
3. Otevřete soubor [export_entit.jinja](./export_entit.jinja), zkopírujte **celý** obsah a vložte ho do prázdného editoru.
4. Vpravo se objeví výsledek: seznam záznamů, každý začíná `"system":`. Ověření: výsledek není prázdný a nikde není červená chybová hláška.
5. Výsledek celý označte a zkopírujte a uložte jako `energie.json` do této složky (přepište starý export; tento `README.md` nechte beze změny), nebo mi ho pošlete přílohou do konverzace.

Když je výsledek příliš dlouhý: v šabloně smažte řádky systémů, které nechcete (začínají `{'system': …`), a export udělejte po částech.

Z exportu vychází ID entit, jednotky a třídy, hloubka vybití baterie, režimy zásobníku a to, jak často která integrace hlásí (`ENTITY_MAP.md`). Hodnoty stavu wallboxu z exportu zjistit nejdou (senzor nemá `options`).

Zdroj použitých funkcí šablon (`states[…]`, `config_entry_id`, `config_entry_attr`, `integration_entities`, `device_id`, `device_entities`, `to_json`, `last_reported`): kód Home Assistant 2026.10.1, `homeassistant/helpers/template/`. Přejmenování Developer Tools na Tools: poznámky k vydání 2026.8.
