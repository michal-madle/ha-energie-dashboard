# Týdenní ladění (předpověď a algoritmus)

Smyčka, na které se dohodneme 29. 10.: jednou týdně napíšu, co z dat nechápu nebo co se liší od předpovědi, vy odpovíte několika větami a podle toho upravím předpověď výroby a pravidla. Čím dál míň otázek, protože se karta učí z dat sama.

Automaticky: každou neděli v 19:40 (pražského času) běží plánovaný úkol, který si export přečte z vašeho počítače (musí být zapnutý a s aplikací Claude) a napíše otázky; export ale pořád spouštíte vy (token). Připomínka v kalendáři: neděle 19:30.

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

## Odpovědi z 29. 10. (21:14) a co z nich plyne

- **18. 10. byl zátěžový test baterie:** celou sobotu schválně na 100 % a v noci plynulé vybíjení bez vlivu okolí. Ten den (17. až 19. 10.) se **nepočítá do učení** výroby, normy ani pravidel; v exportu je označen jako `test`.
- **Noční odběr 1,3 až 1,4 kW** je pračka, sušička nebo myčka. Běžné velké spotřebiče jsou auto, pračka, sušička, myčka, trouba.
- **Bojler z baterie nikdy nejede.** Teplá voda je primárně ze zásobníku na plyn. Karta proto bojler z baterie nikdy nenavrhuje a upozornění „baterie krmí bojler“ je skutečný problém (N14), na rozdíl od auta.
- **Nízký tarif (HDO)** se mění každý den a spíná ho distributor: 20 h denně 3,21587 Kč/kWh, 4 h denně 3,87691 Kč/kWh. Rozdíl je 0,66 Kč/kWh (asi 17 %), pro 10 kWh do auta 6,6 Kč. **Čas nabíjení se tedy podle tarifu neladí**, rozhoduje cíl a slunce. Plán z API distributora zatím není potřeba.
- **Jak nabíjíte:** vždy pustíte jen wallbox. V létě z přebytku při nabité baterii. Když baterie doma nabitá není a auto je potřeba, **boost 4 kW**; víc výkonu jen když potřebujete jet a auto má málo. Rychlé nabíjení 6 až 10,5 kW je tedy výjimka pro naléhavý případ, ne běžné pravidlo.

- **Ověření z nového exportu (wallbox a bojler ze stavů, 15. až 29. 10.):** skutečný výkon wallboxu sedí s mým odhadem z domu (25. 10. 23,3 kWh skutečně proti odhadnutým 21,7; základ domu při nabíjení medián 0,54 kW). Bojler jede hlavně z přebytku (nejvíc 27. 10., 4,3 kWh), ale 19., 21. a 29. 10. kolem 18:00 odebíral 0,12 až 0,27 kW při vybíjení baterie 1,3 až 2 kW. Je to nejspíš udržování teploty (`tuv_3_1_keep_heated`); chcete-li pravidlo „bojler z baterie nikdy“ vynutit, zapněte `switch.tuv_3_3_block_heating_from_battery` (dnes `off`).

Zbývá otázka k ověření: 28. 10. odběr ze sítě 9,8 kWh při baterii na rezervě (pračka, sušička, myčka a trouba najednou?).

## Jak se měří, že to funguje

- Chyba předpovědi výroby na den (cíl pod 15 %, po týdnu učení).
- Kolik kWh do auta bylo ze slunce, z baterie a ze sítě a jestli byl cíl 75 % splněn.
- Kolikrát pravidlo spustilo nabíjení, které jste zrušil (znamená špatný práh).
