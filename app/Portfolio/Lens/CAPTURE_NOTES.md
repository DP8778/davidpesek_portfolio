# Lens — aktuální podoba a původ snímků

Aktuální snímky AMD a The Trade Desk vznikly 25. 10. 2026 z lokálního produkčního buildu repozitáře `DP8778/P-2_Lens`, commit `00bbdd78b3911ee8382d30f5cd2ab9f9aee865a0` (`main`). Před snímáním byl tento commit nasazen a oba příklady ověřeny na https://p-2-lens.vercel.app/. Zdrojový kód ani firemní data nebyly při snímání měněny.

- Spuštění: `OPENAI_API_KEY= TWELVE_DATA_API_KEY= TZ=Europe/Prague npm start -- --port 4101` po produkčním buildu. Přímé routy `/cs-CZ/assets/twelvedata%3AXNGS%3AAMD` a `/cs-CZ/assets/twelvedata%3AXNGM%3ATTD`.
- Chrome/Playwright, `cs-CZ`, Europe/Prague, reduced motion. Desktop 1440 × 1200, mobil 390 × 1000. Snímají se celé skutečné komponenty, nikoli skládané obrazovky. Výsledné rozměry, motiv, URL, selector a čas pořízení obsahuje `public/lens/2026-10/captures.json` u každého souboru.
- Motiv se přepínal skutečným ovládáním aplikace. Cenové a AI requesty byly řízeně nedostupné; uložené profily, výroční výkazy a připravený kontext zůstávají funkční. Není doplněna syntetická cena. Rok FY2025, tabulky metodiky výchozí sbalené.
- `overview-*`: AMD, graf hospodaření FY2021–FY2025 s navigátorem, přepínači a zdroji. `revenue-*`: celý segmentový přehled FY2025. `mobile-*`: skutečný mobilní graf a legenda.
- `market-*` a `marketMobile-*`: desktopové AIB grafiky, Q2 2026, po přepnutí příslušného trhu. Kusové podíly, nikoli podíly na tržbách nebo AI akcelerátory.
- `business-*`: srovnání AMD, NVIDIA a Intel. `businessMobile-*`: pouze první karta AMD, nikoli předstírané celé srovnání.
- `ttdOverview-*` a `ttdMobile-*`: skutečné hospodaření TTD FY2023–FY2025. `ttdEconomics-*` a `ttdEconomicsMobile-*`: gross spend a netto revenue, společné měřítko, odvozený poměr a zdroje. `ttdAnatomy-*`: výsledovka bez hrubého zisku. Žádný z těchto snímků neobsahuje AMD vydávané za TTD.
- `portfolio-*` zůstává z předchozí série (commit `3cbd00bf46114adaa235b78d20a3375b9900fb5d`, 25. 10. 2026). Ukazuje navazující syntetické demo `lens-demo-2026.09-v2`, 1Y, nikoli firemní výkazy. Původ je u těchto dvou položek samostatně zachovaný v manifestu.
- Přímé screenshoty byly pouze převedeny PNG → WebP, kvalita 94. Bez rekonstruování textů, hodnot nebo generované grafiky. Reprodukce: `node scripts/capture-lens.cjs`; `LENS_REPO` a `LENS_CAPTURE_URL` umožňují zvolit jiný checkout/server.

Studie ukazuje dva připravené příklady s odlišným modelem a účetní prezentací. Netvrdí plošné pokrytí, uživatelský výzkum ani měřený obchodní dopad. Výkazy, zdrojovaná tvrzení, výpočty a interpretace mají odlišné označení.
