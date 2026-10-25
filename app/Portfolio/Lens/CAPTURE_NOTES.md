# Lens: aktuální podoba a původ snímků

Snímky v `public/lens/2026-10/` vznikly 25. 10. 2026 z čistého lokálního produkčního buildu repozitáře `DP8778/P-2_Lens`, commit `3cbd00bf46114adaa235b78d20a3375b9900fb5d` (`feat: add persistent light and dark workspaces with clearer company UI`). Zdrojový kód Lens ani finanční data nebyly při snímání měněny.

## Prostředí a stav

- Chrome/Playwright, čeština, časové pásmo Europe/Prague, omezený pohyb. Desktop 1440 px, mobil 390 px. Pro snímání celých komponent byl viewport na výšku zvětšen; nešlo o skládání několika obrazovek.
- Oba motivy byly přepnuté skutečným ovládáním v hlavičce. Metodika a tabulky zůstaly ve výchozím sbaleném stavu, rok FY2025.
- Tržní a AI klíče nebyly nakonfigurované. Výkazy a připravený tržní kontext fungovaly bez těchto služeb. U hlavního grafu je proto autentický stav nedostupné cenové historie a zobrazení ověřeného hospodaření.
- `overview-*`: celý blok ročního hospodaření AMD FY2021–FY2025, včetně přepínačů, časového navigátoru a odkazu na zdroje.
- `revenue-*`: celá sekce struktury tržeb AMD FY2025 včetně růstového vysvětlení. `mobile-*`: autentický mobilní výřez grafu a legendy, bez opakování úvodu a metodiky.
- `market-*`: po skutečném přepnutí na samostatné desktopové grafické karty (AIB) za Q2 2026. Jednotkou podílu jsou dodané kusy; nejde o AI akcelerátory ani podíl na tržbách. `marketMobile-*` zachycuje stejný stav na mobilu.
- `business-*`: celé srovnání AMD, NVIDIA a Intel. `businessMobile-*`: autentický mobilní výřez první karty AMD; není vydáván za celé třífiremní srovnání.
- `portfolio-*`: analytický modul dashboardu se syntetickým datasetem `lens-demo-2026.09-v2`, nastavením 1Y a základním deterministickým vysvětlením. Jde o jiný datový základ než skutečné výkazy AMD.
- Screenshoty jsou přímé snímky komponent nebo jejich výřezy v prohlížeči, pro web převedené z PNG do WebP (kvalita 94). Texty ani čísla v obrázcích nebyly graficky rekonstruované či upravené. `captures.json` uchovává commit, datum a skutečné rozměry každého obrázku.

## Obsahová hranice studie

Studie ukazuje funkční průchod na AMD a konkrétní návrhové volby. Nepředstírá uživatelský výzkum, měřený dopad ani srovnatelně podrobná data pro všechny firmy. Tržní snapshot má vlastní dataci a zdroje přímo v Lens. Další ověření se týká porozumění metrikám, konkurenci a omezením údajů.
