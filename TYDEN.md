# Týdenní ladění (předpověď a algoritmus)

Smyčka, na které se dohodneme 29. 10.: jednou týdně napíšu, co z dat nechápu nebo co se liší od předpovědi, vy odpovíte několika větami a podle toho upravím předpověď výroby a pravidla. Čím dál míň otázek, protože se karta učí z dat sama.

## Postup (asi 10 minut vašeho času)

1. Spustíte export (`python tools\export_hodiny.py --url http://… --token … --days 14`). Wallbox a bojler se doplní z historie stavů, dokud nemají statistiky (`examples/statistiky_wallbox_bojler.yaml`).
2. Já načtu `tools/energie_hodiny.csv`, porovnám týden s předpovědí a s pravidly níže a napíšu sem otázky (jen to, co z dat nejde zjistit).
3. Odpovíte (i jednou větou), já upravím parametry, tento soubor a návrh karty.

## Co už o vašem provozu platí (z vašich vět, 29. 10.)

- **Jízdní dny:** pondělí, úterý, pátek; auto se vrací odpoledne, takže přes den se nedobíjí. **Cíl: v neděli večer v autě aspoň 75 %.**
- **Dva způsoby nabíjení:**
  1. *Ze slunce s baterií jako zásobníkem* (v dobrém dni, kolem poledne): start při baterii kolem 50 % a slunci kolem 2 kW, stop kolem 30 %. V říjnu stačí hodina až dvě a baterie doma na to potřebuje jen pár kWh.
  2. *Rychle, když je baterie na rezervě a slunce nebude:* výkon libovolně vysoký, protože není z čeho šetřit. Vysoký výkon má menší ztráty při nabíjení a baterie doma se rychleji začne dobíjet ze slunce.
- **Výsledek, kterému data odpovídají:** 25. 10. (neděle, výroba jen 4,3 kWh) nabito asi 22 kWh ze sítě na 88 % v autě; 19. a 20. 10. a 26. 10. ráno nabíjení při rezervě z 6 až 8 kW.

Důsledek pro kartu: místo okamžitého prahu „kolik dá slunce“ se počítá **plán do cíle**: kolik kWh auto potřebuje do neděle (75 %), kolik jich zítra dá slunce podle předpovědi, a když to nevychází, karta navrhne rychlé nabití ze sítě v nejlepší hodinu (nízký tarif, pokud ho máte), ne „nenabíjej“.

## Otázky pro tento týden (15. až 29. 10.)

1. **Neděle 18. 10.** skončila s autem na 52 %, v pondělí v 5 h jste dobil na 70 %. Bylo to rozhodnutí (málo slunce, levný proud), nebo se to nepovedlo?
2. **Noční odběr 1,3 až 1,4 kW** 17. 10. ve 20 až 23 h a 18. 10. ve 0 až 2 h ze sítě: je to bojler (`tuv_1_max_power` 1325 W) v nízkém tarifu, nebo něco jiného?
3. **Nízký tarif (HDO):** v jakých hodinách ho máte (`sensor.master_hdo`)? Podle toho se vybere nejlevnější okno pro rychlé nabití.
4. **Rezerva baterie 20 %:** u dobíjení ze sítě (19. 10. v 5 h, 25. 10. ve 12 h) jste baterii ručně neovlivňoval, jen jste pustil wallbox na 6 až 10,5 kW? (Rozhoduje, zda do pravidla patří i přepnutí režimu střídače.)
5. **18. 10. (výroba 8 kWh, ze sítě 15 kWh)** a **28. 10. (ze sítě 9,8 kWh při baterii na rezervě)**: co se ten den dělo navíc (vaření, topení, bojler)?

## Jak se měří, že to funguje

- Chyba předpovědi výroby na den (cíl pod 15 %, po týdnu učení).
- Kolik kWh do auta bylo ze slunce, z baterie a ze sítě a jestli byl cíl 75 % splněn.
- Kolikrát pravidlo spustilo nabíjení, které jste zrušil (znamená špatný práh).
