# Portfolio — kontrola vydání 25. 10. 2026

**Průběžný stav:** aplikace jsou veřejně ověřené; nové portfolio má dokončenou implementaci a probíhá poslední kontrola exportu před publikací. Stav veřejného portfolia níže se aktualizuje až po ověření nasazeného obsahu.

| Projekt | Repozitář / větev | Ověřený zdroj | Veřejný výstup | Stav |
| --- | --- | --- | --- | --- |
| Portfolio | DP8778/davidpesek_portfolio · main | implementace tohoto vydání; SHA doplněno po publikaci | https://davidpesek-portfolio.vercel.app/ | neověřeno po tomto vydání |
| Lens | DP8778/P-2_Lens · main | 00bbdd78b3911ee8382d30f5cd2ab9f9aee865a0 | https://p-2-lens.vercel.app/ | ověřeno: skutečné AMD a TTD |
| Digital Call | DP8778/digital_call_module · main | 7b1b3448f74a451bd6ef5e2bffecc0b58fe160e6 | https://digital-call-module.vercel.app/ | ověřeno: současná verze i celý scénář |
| Typeface | DP8778/Typeface-website · main | 85c9272a06d22cff0f8aeeae99ae67dcf72a9dd8 | https://typeface-website-eta.vercel.app/ | ověřeno: homepage, Work, mobil a pohyb |
| Kera Natur | soukromý DP8778/Kera-Natur · main | 66d47adc540efc3ae19cba58ebf1b68100de64ea | https://kera-natur-jlyy.vercel.app/ | ověřeno: veřejný webový preview |

## Co se změnilo

- Portfolio: sdílené palety a hlavička, společný token názvu studie, zachovaná perzistence motivu; archiv se čtyřmi hlavními vstupy a sedmi staršími realizacemi. Homepage zachovává Digital Call → Lens → Typeface → Kera Natur a další weby, tlačítko Projekty, CV, technologie i klidné barevné pozadí.
- Lens: katalog ověřených instrumentů mimo indexy, skutečný TTD Class A / Nasdaq Global Market / XNGM / USD. Markets i portfolio odkazují na oba příklady. TTD FY2023–FY2025 používá primární výkazy, vlastní nákladovou prezentaci bez vymyšleného gross profit, srovnání gross spend/revenue a odvozený poměr. Trh a konkurenti mají vymezený základ a kvalitativní srovnání. Při selhání refresh zůstane primární záznam s původním stářím a chybou. Členství ani váhy indexů se přidáním příkladu nezměnily.
- Studie Lens zachovává AMD a přidává kompaktní průchod TTD, rozdíl v návrhu grafů a účetní variantě. Syntetické portfolio je nadále samostatný sbalený modul.
- Digital Call: po kontrole čistých stromů a vztahu větví byl `main` posunut fast-forward z `1d86942` na `7b1b344`. Veřejné demo odpovídá studii; upozornění na staré demo bylo odstraněno až po veřejném browser testu.
- Typeface: potvrzené autorství loga a celého brandingu je v metadatech, kartě i úvodu. Prezentace ukazuje původní logo, detail tváře, fonty, barvy, symboly, přenos do webu a živý pohyb. Nově sestavený přehled identity je označený jako ukázka použití. Podklady nejsou generované.
- Kera Natur: stručné zadání, vlastní práce na struktuře/UI/front-endu a konkrétní cesta k nabídce a kontaktům. Žádné přisvojené autorství loga/fotografií, e-shop či rezervační systém. Soukromý repozitář zůstal soukromý.
- Galerie vizuálních studií drží focus uvnitř dialogu, reagují na Escape a vracejí focus na zvětšovací tlačítko. Portfolio má neinteraktivní lint a server kompatibilní s `output: 'export'`.

## Kontroly

| Oblast | Stav a evidence |
| --- | --- |
| Lens — povinné kontroly | ověřeno: `npm run lint`, `npm run typecheck`, `TZ=Europe/Prague npm test -- --runInBand`, `npm run build`. 254 testů prošlo, 1 existující TODO zůstává neprovedený. Datace primárních zpráv je opravená: FY2025 27. 2. 2026, FY2024 21. 2. 2025. |
| Lens — browser | ověřeno: 16 Playwright testů. AMD i TTD, 390/768/1440, oba motivy, čitelnost/kontrast původních grafů, navigátor, SVG export, perzistence, zakázané úložiště, nedostupné ceny a AI, Markets a odstranění cizího odvětvového kontextu. |
| Lens — regrese a finance | ověřeno: účetní identity, jednotky, původ a chybějící mezisoučty, ochrana primárních období, invarianty indexů; veřejný detail NVIDIA má vlastní identitu, historii a výsledovku. |
| Digital Call | ověřeno: 56 testů, typecheck, lint, build; celý browser průchod lokálně i na veřejném aliasu. Přeplánování bez pokusu, odmítnutý termín a zrušení beze změny, přijatý výsledek právě jeden pokus, vybraný další termín, návrat, refresh, reset, tlačítková alternativa k drag-and-drop. |
| Portfolio | ověřeno: všech 36 kombinací homepage/archiv/4 studie × 390/768/1440 × light/dark. Žádné horizontální přetékání, všechny snímky načtené, kotvy a interní odkazy včetně CV funkční; Enter, Tab, Escape a návrat focusu v galeriích, perzistence motivu v celém průchodu, žádné runtime chyby. Chybný odkaz CV v novém archivu byl opraven na `/CV-DP.pdf`. |
| Typeface | ověřeno: produkční export, 390/768/1440, Work, pause, reduced motion, pause mimo viewport. Stejné chování zachovává nativní ukázka v portfoliu. Veřejný Work funguje. |
| Kera Natur | ověřeno: lint a build; 390/768/1440, homepage, výrobky, kurzy, ceny, kontakty, mobilní menu a dostupné dokumenty. Telefon/e-mail/mapa souhlasí s obsahem repozitáře. Odesílací formulář neexistuje; žádná zpráva nebyla odeslána. Veřejné routy ověřeny. |
| Nasazení | ověřeno: Vercel success pro Lens, Digital Call, Typeface a používaný Kera Natur `jlyy`; skutečný obsah uvedených veřejných adres byl ověřen v prohlížeči. Nové portfolio se publikuje až po poslední lokální kontrole. |

## Snímky a autorství

- Lens: 24 nových přímých snímků AMD/TTD z produkčního buildu, v obou motivech. Commit, URL, viewport, čas, selector a skutečné rozměry jsou po souborech v `public/lens/2026-10/captures.json`. Dva snímky syntetického dashboardu mají samostatně zachovaný předchozí commit. Podrobnosti: `app/Portfolio/Lens/CAPTURE_NOTES.md`.
- Digital Call: snímky skutečného `7b1b344`, řízený 12. 10. 2026 13:00/15:35 Europe/Prague. Dne 25. 10. byl stejný scénář ověřen na současné veřejné verzi. Zdroj: `app/Portfolio/Projekt-no8/CAPTURE_NOTES.md`.
- Typeface: původní logo a 12 SVG z `85c9272`, produkční export desktop 1440 × 900 / mobil 390 × 844. David 25. 10. výslovně potvrdil autorství identity; původ screenshotů je jiná informace. `app/Portfolio/Typeface/CAPTURE_NOTES.md`.
- Kera Natur: přímé snímky veřejného `jlyy`, 25. 10., 1440 × 960 / 390 × 844. Obsah porovnán s `66d47ad`; přesný Git SHA aliasu není nezávisle potvrzen. `app/Portfolio/Kera-Natur/CAPTURE_NOTES.md`.

## Omezení

- **neověřeno:** uživatelský výzkum, obchodní dopad a konverzní změny. Studie je netvrdí. Jeden existující Jest TODO není úspěšný test.
- **blokováno pro živý import SEC z tohoto Macu:** přímý HTTP download TTD 10-K vracel 403. Primární zpráva byla čitelná výzkumným prohlížečem; tabulky jsou ručně ověřené a zapsané s provenance. Adaptér je testovaný na označeném přepisu buněk; produkční živý refresh není vykázaný jako úspěšný. Výpadek nesmaže ověřené příklady.
- Ceny a rozšířený AI výzkum jsou volitelné služby. Ověření proběhlo i bez nich; nejsou nahrazované skrytou syntetickou cenou. Firemní příklady používají datované roční výkazy, ne živá čtvrtletní data.
- Starší stránky archivu mají sedm existujících lint upozornění na cleanup referencí. Lint končí úspěšně bez konfiguračního dialogu.
- Build Digital Call upozornil na bezpečnostní stav stávající verze Next.js. Nebyl proveden major upgrade; závislosti vyžadují samostatnou bezpečnostní údržbu.

## Lokální projekty a bezpečné načtení ve VS Code

Node 24.14.0. Před `pull` zkontrolujte `git status`; při vlastních změnách je nejprve vědomě commitněte nebo uložte. Použijte `git pull --ff-only`, nikdy force/reset. Původní složka Kera Natur bez Gitu byla zachována, ověřený klon je samostatný.

| Projekt | Adresář | Větev | Spuštění |
| --- | --- | --- | --- |
| Portfolio | `/Users/David/Documents/davidpesek_portfolio-main` | main | `npm run dev -- --port 4100` |
| Lens | `/Users/David/Documents/P-2_Lens-1` | main | `npm run dev -- --port 4101` |
| Digital Call | `/Users/David/Documents/DC_update/digital_call_module` | main | `npm run dev -- --port 4102` |
| Typeface | `/Users/David/Documents/Typeface/Typeface-website` | main | `npm run dev -- --port 4103` |
| Kera Natur | `/Users/David/Documents/Kera-Natur-release-review` | main | `npm run dev -- --port 4104` |

Typeface má zachovanou původní změnu uživatele `.storybook/main.js`; nepatří k tomuto vydání a nebyla commitnutá ani přepsaná. Porty 3000–3002 byly při práci obsazené existujícími servery, proto ověření používalo 4100–4104. Lokální servery nejsou veřejná nasazení.
