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
- Produkční kontrola nové lokalizace bude doplněna po nasazení; uvedené kontroly nejsou uživatelský výzkum.

## Co má nyní největší přínos

1. Krátké kvalitativní ověření portfolia s několika designéry nebo lidmi, kteří vybírají kolegy. Po půl minutě na homepage se zeptat: co David dělá, co osobně vytvořil a který projekt dokládá jeho schopnosti? Poté nechat bez nápovědy otevřít vybraný projekt.
2. Ověřit konkrétní úlohy prototypů. V Digital Callu rozlišit přeplánování a uskutečněný pokus. V Lens vysvětlit rozdíl mezi podílem segmentu a podílem na trhu a mezi gross spend a tržbami TTD. Zaznamenat skutečné neporozumění a následnou úpravu.
3. Připravit krátkou ústní prezentaci jednoho projektu: situace, moje rozhodnutí, alternativy a kompromis, funkční ukázka, co chci ověřit. Další přidávání funkcí teď samo o sobě neposílí důvěryhodnost příběhu.

Tyto kroky jsou doporučení, nikoli popis již provedeného výzkumu. Počet několika účastníků slouží kvalitativnímu pilotu, ne statistickému závěru.
