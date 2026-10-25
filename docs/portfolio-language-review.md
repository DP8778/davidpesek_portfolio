# Kontrola po dvou prompech a anglická verze

Datum: 25. 10. 2026. Výchozí portfolio `f1b9f6f`, Lens `5688521`.

## Co se podařilo ověřit

- Lens odděluje aktuální kurz, historické ceny a roční výkazy. Na veřejném TTD jsem otevřel nedostupné ceny a tlačítkem se vrátil k funkčnímu grafu hospodaření. Nová kotva Ekonomika platformy přesune také focus na nadpis. Navigace obsahuje všechny čtyři kapitoly.
- Typeface používá existující živou ukázku v úvodu. Veřejné ovládání pozastavit/spustit reaguje. Kód zachovává reduced motion, zastavení mimo viewport a společný styl. Dokumentované mobilní a pohybové kontroly předchozího releasu nejsou vydávané za nově provedené testy této iterace.
- Aktualizovaný manifest šestice snímků Lens odkazuje na commit `5688521`. Zachoval jsem snímky i jejich provenance.
- Redakční návrh `d40465c` původně zůstal v samostatném draft PR. Při integraci zůstaly kratší studie a nové rozložení Typeface z `main`; konkrétnější úvodní formulace a homepage navazují na výzkum v `portfolio-copy-direction.md`.
- V archivu ilustrátorova portfolia byl nesouvisející odstavec o řemeslnících a podvodech. Odstranil jsem jej. Některé nepoužívané části dalších archivních dat mají také kopírovaný text; neslouží jako podklad pro nové autorské tvrzení.

## Anglická verze

- Přepínač EN/CZ je v hlavní navigaci a hlavičce studií a archivu. Kontakt, webové CV a starší projekty mají vlastní dostupný přepínač.
- Překládá se homepage, archiv, čtyři hlavní studie, vykreslený obsah starších projektů, kontakt a webové CV. Přeložené jsou i popisky snímků, alternativní texty, aria popisky, rozbalovací sekce a ovládání galerií.
- Volba zachová stránku, query parametry i kotvu. `?lang=en` / `?lang=cs` lze sdílet. Jazyk se ukládá do localStorage a vnitřní odkazy jej přenášejí i při nedostupném úložišti. Explicitní jazyk v URL má přednost před uloženou volbou.
- Odkazy do Lens přepínají na jeho existující `en-US` / `cs-CZ` lokalizaci. Jiné externí aplikace mají svůj vlastní jazyk.
- Přepínač funguje nad existujícím statickým exportem. Výchozí HTML je české; po hydrataci se použije jazyk URL nebo preference a aktualizuje se `html lang`, titulek a popis. Nejde o samostatně indexovatelné anglické serverové routy.
- Snímky zůstávají autentickými podklady v původním jazyce. Stávající české PDF CV nebylo upravené ani znovu nahrané; anglické odkazy je označují jako české PDF.
- Lokalizační komponenty nepřidávají obalové DOM elementy. Odkazy a ovládací prvky předávají původní ref, aby zůstaly funkční galerie, návrat focusu i animace.

## Ověření implementace

- `node --test scripts/portfolio-language.test.mjs`: 7 regresních scénářů prošlo. Pokrývají přednost URL, přenos jazyka a kotvy, soubory a externí odkazy, lokalizaci Lens, alternativní popisky i význam klíčových finančních a pracovních formulací.
- `npm run lint`: prošlo; sedm již existujících varování ke cleanup referencím v archivních stránkách.
- `npm run build`: prošlo pro statický export všech 18 výstupů.
- `git diff --check`: prošlo. PDF CV je shodné s výchozí verzí.
- Změna byla sloučena přes PR #2 jako `b5ffb47`; Vercel nasazení uspělo. Na veřejném aliasu bylo ověřeno všech 15 obsahových rout v angličtině při 1348 × 926 px bez horizontálního přetékání. Kontrolované načtené obrázky a otevřené galerie nevykazovaly rozbité podklady. Jde o jednu desktopovou šířku, nikoli novou responzivní matici.
- Myš i klávesnice přepínají jazyk; volba vydrží čistou URL i refresh. Přepnutí CZ/EN na kapitole TTD zachovalo `#ttd`. Odkazy do Lens vedou na `en-US`. Tmavý motiv přešel mezi hlavními studiemi; homepage byla zkontrolována v obou motivech.
- Galerie Lens, Digital Call a společného vizuálního shellu prošly otevřením, Escape i návratem focusu na spouštěcí tlačítko.
- Záznam: `docs/qa/portfolio-language-20261025-production.json`. Záznam zachycuje nasazení `b5ffb47`. Kontrolní screenshot není součástí veřejného repozitáře. Následná drobná úprava sjednocuje také přístupnostní popisek jazykového tlačítka do jazyka stránky.
- Nová mobilní/tabletová vizuální kontrola zůstává neprovedená: bezpečnostní pravidla prohlížeče zamítla pomocný náhled přes protokol `data:`. Nebyl použit obcházející postup.
- Uvedené kontroly nejsou uživatelský výzkum.

## Navazující úpravy podle autorských připomínek

- Přehled technologií je otevřený seznam čtyř skupin s jemnými oddělovacími linkami. Karty a rámečky jednotlivých nástrojů jsou odstraněné. Na mobilu se název skupiny skládá nad seznam.
- Horní role a spodní dostupnost v hero mají shodně Manrope, 12 px, váhu 500, stejný řádek a prostrkání. Používají běžná malá písmena.
- Samostatný výřez loga s textem „Type + face“ je odstraněný ze studie Typeface. Text u hlavního loga je zkrácený.
- Sekce O mně vrací přesný nadpis „Baví mě hledat řád ve složitých věcech.“ a oba původní odstavce z commitu `b4a2af8` z 22. 10. 2026. Zachované je české znění; anglická verze je přeložená podle něj.
- Původní produkční JSON výše zachycuje stav před těmito vizuálními úpravami, nikoli jejich ověření.
- Produkční úprava `09985f2` prošla další kontrolou při 1348 × 926 px. V obou motivech je seznam bez karet a nástroje mají nulový rámeček i padding. Computed styles obou hero labelů jsou shodné: Manrope, 12 px, váha 500, řádek 16,8 px, prostrkání 0,3 px, bez transformace na verzálky. Bylo ověřeno obnovené české znění, anglický překlad a nepřítomnost odstraněného bloku Typeface. Záznam: `docs/qa/home-refinement-20261025-production.json`. Nová mobilní vizuální kontrola není součástí těchto výsledků.

## Co má nyní největší přínos

Starší detaily archivu mají nevyrovnanou strukturu: v některých je hlavním nadpisem sekce „Použité barvy“ a u ilustrátora se místo individuálního popisu vykresluje obecný úvod. Před plošným rozšiřováním je vhodné vybrat relevantní práce a sjednotit jejich stručný popis, roli, vizuální ukázku a odkazy. Hlavní čtyři studie mají přednost.

1. Krátké kvalitativní ověření portfolia s několika designéry nebo lidmi, kteří vybírají kolegy. Po půl minutě na homepage se zeptat: co David dělá, co osobně vytvořil a který projekt dokládá jeho schopnosti? Poté nechat bez nápovědy otevřít vybraný projekt.
2. Ověřit konkrétní úlohy prototypů. V Digital Callu rozlišit přeplánování a uskutečněný pokus. V Lens vysvětlit rozdíl mezi podílem segmentu a podílem na trhu a mezi gross spend a tržbami TTD. Zaznamenat skutečné neporozumění a následnou úpravu.
3. Připravit krátkou ústní prezentaci jednoho projektu: situace, moje rozhodnutí, alternativy a kompromis, funkční ukázka, co chci ověřit. Další přidávání funkcí teď samo o sobě neposílí důvěryhodnost příběhu.

Tyto kroky jsou doporučení, nikoli popis již provedeného výzkumu. Počet několika účastníků slouží kvalitativnímu pilotu, ne statistickému závěru.
