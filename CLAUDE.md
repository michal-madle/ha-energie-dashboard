# CLAUDE.md

Energie Dashboard: Lovelace custom card pro Home Assistant (HACS). Odpovídej česky.

@AGENTS.md

## Kde co je

- Pravidla projektu a implementace karty: `.github/copilot-instructions.md` (přečti před změnou kódu v `src/`).
- Sestavení a testy: `npm run build`, `npm test`. `ha-energie-dashboard.js` v kořeni je generovaný, ručně se needituje.
- Soukromá data (exporty entit, hodinová data, týdenní ladění v `TYDEN.md` a `FORECAST.md`) jsou v soukromém repozitáři `ha-config`, složka `energie/`. Karta v repozitáři je nemá.
- Agenti, společná pravidla a UX systém jsou jen v [ha-dashboard-kit](https://github.com/michal-madle/ha-dashboard-kit). Práce s agenty: session v kitu s touto kartou přidanou přes `--add-dir` (postup v `AGENTS.md` kitu).
