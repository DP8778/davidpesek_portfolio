export const chapterLinks = [
  { id: "problem", number: "01", label: "Problém" },
  { id: "approach", number: "02", label: "Přístup" },
  { id: "decisions", number: "03", label: "Rozhodnutí" },
  { id: "solution", number: "04", label: "Řešení" },
  { id: "validation", number: "05", label: "Ověření" },
  { id: "next", number: "06", label: "Co dál" },
];

export const projectFacts = [
  ["Moje práce", "UX/UI návrh a front-end"],
  ["Kontext", "Rozvinutí pohovorového prototypu"],
  ["Forma", "Funkční demo se syntetickými daty"],
  ["Rok", "2026"],
  ["Technologie", "React, Next.js, TypeScript, Tailwind CSS"],
];

export const scenarios = [
  {
    number: "01",
    title: "Před hovorem",
    text: "Najít zmeškaný nebo dnešní kontakt bez procházení všech procesních sloupců.",
  },
  {
    number: "02",
    title: "Při rozhodování",
    text: "Vidět nemovitost, poslední interakci a další plán pohromadě.",
  },
  {
    number: "03",
    title: "Po hovoru",
    text: "Uložit výsledek, pochopit změnu a mít konkrétní další krok.",
  },
];

export const decisions = [
  {
    number: "01",
    title: "Priority oddělené od procesu",
    problem: "Kanban ukazoval fázi kontaktu, ale nedával odpověď na dnešní prioritu přes více sloupců.",
    choice:
      "Výchozí je časově řazená fronta K řešení. Kanban zůstává jako druhý pohled Proces.",
    interface: "Fronta odděluje zmeškané, dnešní, pozdější a nenaplánované aktivity; u Anny Novotné ukazuje prošlý termín jako důvod priority.",
    impact:
      "Dva pohledy odpovídají na dvě různé otázky. Za větší jasnost se platí přepínáním mezi nimi.",
  },
  {
    number: "02",
    title: "Stav, termín a pokus odděleně",
    problem:
      "Původní logika míchala procesní přesun, termín a skutečný pokus o hovor.",
    choice:
      "Přesun nevytváří pokus. Pokus vzniká až potvrzením výsledku a úprava termínu nemění stav.",
    interface: "Detail zvlášť zobrazuje stav, příští aktivitu a historii. Posun termínu nepřidá hovor; přesun do jiného stavu nezvýší počet pokusů.",
    impact:
      "Každá změna má dohledatelný význam, za cenu jednoho explicitního kroku navíc.",
  },
  {
    number: "03",
    title: "Výsledek potřebuje návaznost",
    problem:
      "Bez detailu a historie nebylo jasné, proč kontakt řešit; po akci mohl další krok zmizet.",
    choice:
      "Detail řadí důvod a kontext před akci. Uložený výsledek odděluje od změny stavu a ukáže pokračování.",
    interface: "Po nedovolání se pokus objeví v historii a další hovor má konkrétní termín. Prošlý termín ani prázdný filtr se netváří jako hotová práce.",
    impact:
      "Explicitní potvrzení přidává krok, ale důsledek je vidět před návratem do fronty. Srozumitelnost pro makléře zatím není ověřená.",
  },
];

export const solutionParts = [
  {
    label: "Pracovní fronta",
    title: "K řešení",
    text: "Zmeškané, dnešní, pozdější a nenaplánované aktivity, hledání, zdrojové a stavové filtry i odlišné prázdné stavy.",
  },
  {
    label: "Kontext",
    title: "Detail kontaktu",
    text: "Důvod řešit kontakt, nemovitost, poslední interakce, stavově vhodná hlavní akce, příští aktivita a historie.",
  },
  {
    label: "Rozhodnutí",
    title: "Výsledek hovoru",
    text: "Nedovoláno, schůzka, ozvat se později nebo vyřadit — vždy s vysvětleným důsledkem a potvrzením dalšího kroku.",
  },
];

export const testTasks = [
  {
    title: "Najdi zmeškaný kontakt.",
    observe: "První akce a pochopení, proč má právě tento kontakt prioritu.",
  },
  {
    title: "Zaznamenej nedovolání a naplánuj další hovor.",
    observe: "Chyby a rozdíl mezi stavem, výsledkem a plánem.",
  },
  {
    title: "Uprav termín a pokračuj po refreshi.",
    observe: "Předvídatelnost uložení a pochopení dalšího kroku.",
  },
];
