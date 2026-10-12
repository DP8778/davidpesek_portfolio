export const chapterLinks = [
  { id: "problem", number: "01", label: "Problém" },
  { id: "approach", number: "02", label: "Přístup" },
  { id: "decisions", number: "03", label: "Rozhodnutí" },
  { id: "solution", number: "04", label: "Řešení" },
  { id: "validation", number: "05", label: "Ověření" },
  { id: "next", number: "06", label: "Co dál" },
];

export const projectFacts = [
  ["Zaměření", "UX/UI, interakce a front-end"],
  ["Kontext", "Rozvinutí pohovorového prototypu"],
  ["Forma", "Funkční portfolio demo"],
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
    title: "Pracovní fronta jako výchozí obrazovka",
    problem: "Přebarvený Kanban neukáže, co je potřeba řešit dnes.",
    choice:
      "K řešení je primární pracovní pohled; Kanban zůstává jako přehled Proces.",
    impact:
      "Fronta řeší prioritu, Proces fázi případu. Kompromisem jsou dva pohledy místo jednoho.",
  },
  {
    number: "02",
    title: "Stav, aktivita a historie odděleně",
    problem:
      "Původní logika míchala procesní přesun, termín a skutečný pokus o hovor.",
    choice:
      "Přesun nevytváří pokus. Pokus vzniká až potvrzením výsledku a úprava termínu nemění stav.",
    impact:
      "Každá změna má dohledatelný význam, za cenu jednoho explicitního kroku navíc.",
  },
  {
    number: "03",
    title: "Kontext před akcí, potvrzení po ní",
    problem:
      "Bez detailu nebylo před rozhodnutím jasné proč kontakt řešit a co už proběhlo.",
    choice:
      "Detail řadí důvod, kontext, akci, příští krok a historii. Po výsledku ukáže stav i pokračování.",
    impact:
      "Důsledky jsou vidět před návratem do fronty. Zrušení aktivity vyžaduje potvrzení.",
  },
  {
    number: "04",
    title: "Ovládání bez přetahování",
    problem:
      "Drag-and-drop sám nestačí pro klávesnici ani pro přesné vysvětlení změny.",
    choice:
      "Klíčové akce mají tlačítka, formuláře popisky a štítky vždy nesou textový význam.",
    impact:
      "Rozhraní funguje bez přetahování; průchod asistivní technologií zatím není doložený.",
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
