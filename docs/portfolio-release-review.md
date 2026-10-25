# Portfolio — kontrola vydání 25. 10. 2026

Původní přehled níže zachycuje vydání `557594a`. Navazující iterace úvodu Typeface, redakce studií a dílčí obnovy Lens je zaznamenaná na konci dokumentu.

**Ověřeno:** implementace je na main a veřejně nasazená. Portfolio prošlo celou maticí 36 kombinací lokálně i na produkčním aliasu. Lens obsahuje ověřené AMD a TTD; Digital Call veřejně předvádí stejný scénář jako studie. Všech osm podmínek dokončení je splněno v rozsahu uvedených omezení.

| Projekt | Repozitář / větev | Ověřený zdroj | Veřejný výstup | Stav |
| --- | --- | --- | --- | --- |
| Portfolio | DP8778/davidpesek_portfolio · main | 6c11246a7fadaaece91fdc2b713542704be65015 (implementace); závěrečný commit obsahuje jen report a ověřovací skript | https://davidpesek-portfolio.vercel.app/ | ověřeno: produkční alias a všechny 4 studie |
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
| Nasazení | ověřeno: Vercel success pro Lens, Digital Call, Typeface a používaný Kera Natur `jlyy`; skutečný obsah uvedených veřejných adres byl ověřen v prohlížeči. Portfolio z implementačního commitu `6c11246` má Vercel success; skutečný obsah homepage, archivu, všech 4 studií, nové snímky i oba příklady Lens byly ověřeny na produkčním aliasu. Celá matice 36 kombinací prošla i veřejně. |

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

Node 24.14.0. Před `pull` zkontrolujte `git status`; při vlastních změnách je nejprve vědomě commitněte nebo uložte. Použijte `git pull --ff-only`, nikdy force/reset. Původní složka Kera Natur bez Gitu byla zachována, ověřený klon je samostatný. Porovnání všech sledovaných souborů potvrdilo shodný obsah původní složky a klonu main.

| Projekt | Adresář | Větev | Spuštění |
| --- | --- | --- | --- |
| Portfolio | `/Users/David/Documents/davidpesek_portfolio-main` | main | `npm run dev -- --port 4100` |
| Lens | `/Users/David/Documents/P-2_Lens-1` | main | `npm run dev -- --port 4101` |
| Digital Call | `/Users/David/Documents/DC_update/digital_call_module` | main | `npm run dev -- --port 4102` |
| Typeface | `/Users/David/Documents/Typeface/Typeface-website` | main | `npm run dev -- --port 4103` |
| Kera Natur | `/Users/David/Documents/Kera-Natur-release-review` | main | `npm run dev -- --port 4104` |

Typeface má zachovanou původní změnu uživatele `.storybook/main.js`; nepatří k tomuto vydání a nebyla commitnutá ani přepsaná. Porty 3000–3002 byly při práci obsazené existujícími servery, proto ověření používalo 4100–4104. Lokální servery nejsou veřejná nasazení.

## Iterace: úvod Typeface a kratší studie — 25. 10. 2026

Výchozí `main` portfolia: `557594a`. Při zahájení byl pracovní strom čistý a vzdálená větev shodná; `AGENTS.md` nebyl v repozitáři ani nad ním. Další repozitáře tato iterace nemění.

### Kompozice a redakce

- Typeface: krátký úvod a jediný živý výřez vedle textu na desktopu, pod textem na menších obrazovkách. Při 390 × 844 px je v první obrazovce viditelný barevný pás; úvod nemá pevnou výšku a jeho text zůstává nejméně 17 px. Hlavička, Clash Display, Manrope a motivy patří dál do portfolia. Následují detaily loga, typografie, symbolů a pohybu. Autorská role je uvedená jednou, podrobnosti původu identity zůstávají v CAPTURE_NOTES.md.
- Lens: v popředí jsou segmenty AMD, překrývající se veličiny gross spend/revenue TTD a odpovídající volba grafu. Období, USD, význam 21,62 % a základy tržních podílů zůstaly u konkrétních příkladů. Obecný rozsah, AI, technické ověření a neprovedené uživatelské ověření jsou společně v části Data a AI.
- Kera Natur: tři cesty nabídkou a přímá domluva přes telefon/e-mail. Role je uvedená jednou; bez autorství loga či fotografií. Rozsah a původ podkladů mají vlastní rozbalení.
- Digital Call: zkrácené duplicity v úvodu, popiscích a závěru. Zachovaný scénář Anny 12. 10. 2026 ve 13:00 → přeplánování na 15:30 bez pokusu → výsledek v 15:35 → další termín 13. 10. v 16:00. Právě jeden pokus přidá až přijatý výsledek; neplatný termín či zrušení kontakt nemění. Syntetická data a neprovedené ověření s makléři zůstávají uvedené.
- Funkční regrese: navigace kapitol Lens a Digital Call je odsazená pod pevnou hlavičkou. Fokusovaný odkaz se na mobilu odkryje a automatické sledování kapitoly ho neposune pryč. Galerie uchovávají přímo tlačítko, které je otevřelo, pro návrat focusu.

### Obnova Lens

Zdroj: veřejně nasazený `56885216a1fcdac764d188972c18c826287c611c` repozitáře `DP8778/P-2_Lens`, Vercel success a skutečné detaily AMD/TTD ověřené před snímáním. Obnoveny pouze `overview`, `ttdOverview`, `ttdMobile` v light/dark: šest přímých snímků bez zachytávání požadavků. Ostatních 20 souborů a jejich provenance je bajtově zachovaných.

Viewporty 1440 × 1200 / 390 × 1000 i výstupní rozměry 1180 × 965 / 358 × 1128 zůstaly stejné. Rámeček je přímý výřez prohlížeče od horního rohu skutečného grafu; kratší panel ponechává dole skutečný kontext další sekce. Žádná retuš ani změna čísel. Přesné časy, veřejné URL, commit, motivy a souřadnice jsou v `public/lens/2026-10/captures.json` a metoda v `app/Portfolio/Lens/CAPTURE_NOTES.md`. Stávající výřezy navigační lištu TTD neobsahují.

### Skutečně provedené kontroly této iterace

- `TZ=Europe/Prague npm run lint`: úspěch; sedm existujících upozornění na cleanup `heroRef` v archivních `Projekt-no1` až `Projekt-no7`. Upravené soubory nemají nové lint chyby.
- `NODE_USE_SYSTEM_CA=1 TZ=Europe/Prague npm run build`: úspěšný statický produkční export.
- Lokální browser matice: homepage, archiv a čtyři studie × 390/768/1440 px × light/dark, všech 36 kombinací prošlo. Mobil používá skutečně 390 × 844 px. Kontrola načtení obrázků, interních odkazů a CV, pořadí čtyř projektů, kotev klávesnicí a jejich nezakrytých nadpisů, rozbalení podkladů, všech galerií, Tab/Shift+Tab, Escape a návratu focusu. Bez přetékání a runtime chyb.
- Samostatná kontrola Typeface: všech šest kombinací 390/768/1440 × light/dark prošlo při běžném pohybu. Snímání skutečných animačních snímků potvrdilo souvislý 74sekundový posun, klávesovou pauzu a neměnnou pozici po jejím vykreslení, zastavení a obnovení mimo viewport i dynamické přepnutí reduced motion. Perzistence motivu prošla celým řetězcem čtyř studií a zpět na homepage. Strojový záznam: `docs/qa/typeface-iteration-2026-10-25-local.json`.
- Veřejné cíle Typeface, Kera Natur, Digital Call a detail TTD byly otevřené v prohlížeči: HTTP 200 a odpovídající obsah. Nebyla odeslána žádná zpráva.

Produkční ověření této iterace portfolia se doplní po nasazení. Jde o technické a vizuální kontroly. V této iteraci neproběhl uživatelský výzkum ani sběr klientské zpětné vazby; studie nepřidávají tvrzení o měřeném dopadu.
