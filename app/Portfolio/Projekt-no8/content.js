export const chapterLinks = [
  { id: "problem", number: "01", label: "Problém" },
  { id: "decisions", number: "02", label: "Rozhodnutí" },
  { id: "solution", number: "03", label: "Výsledné řešení" },
  { id: "validation", number: "04", label: "Ověření a další krok" },
];

export const decisions = [
  {
    number: "01",
    title: "Pracovní fronta jako hlavní pohled",
    finding: "Kanban ukazoval fázi a termín na kartě, ne společnou prioritu napříč sloupci.",
    choice: "Jako výchozí pohled jsem navrhl frontu K řešení; Kanban zůstal jako Proces.",
    annotation: "Panel shrnuje 4 prošlé termíny a 2 další dnešní úkoly; zmeškaný seznam ukazuje důvod „Po termínu“ přímo u kontaktu.",
  },
  {
    number: "02",
    title: "Kontext před akcí",
    finding: "Karta původně neukazovala poslední výsledek ani historii navazujících kroků.",
    choice: "V detailu jsem spojil důvod priority, poslední interakci a příští aktivitu kolem hlavní akce.",
    annotation: "Poslední „Nedovoláno“, příští hovor i hlavní akce jsou v jednom detailu ještě před uložením nového výsledku.",
  },
  {
    number: "03",
    title: "Přesun není výsledek hovoru",
    finding: "Přesun do „K provolání“ mohl v původní logice navýšit počet pokusů bez hovoru.",
    choice: "Pokus nyní vzniká až uložením výsledku; samotný přesun mění pouze stav.",
    annotation: "Test rozlišuje přesun bez pokusu od potvrzeného „Nedovoláno“ s novým pokusem a dalším termínem.",
  },
];

export const testTasks = [
  {
    title: "Najdi zmeškaný kontakt.",
    observe: "První akce a pochopení, proč má právě tento kontakt prioritu.",
  },
  {
    title: "Vysvětli poslední komunikaci a další krok.",
    observe: "Zda detail srozumitelně propojuje historii, důvod priority a plán.",
  },
  {
    title: "Zaznamenej nedovolání a naplánuj další hovor.",
    observe: "Rozdíl mezi výsledkem, přesunem a plánem; zda uživatel rozumí potvrzení.",
  },
];
