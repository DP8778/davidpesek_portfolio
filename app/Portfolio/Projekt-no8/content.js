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
    finding: "Dochovaný Kanban členil kontakty podle procesního stavu. Termín byl na kartě, ale chyběl společný pohled na práci napříč sloupci. To je zjištění z auditu, ne z rozhovorů.",
    choice: "Zvolil jsem frontu K řešení podle naléhavosti; Kanban zůstal jako pohled Proces.",
    evidence: "Lokální iterace ukazuje zmeškané, dnešní a pozdější úkoly zvlášť. U Anny Novotné je vidět prošlý termín a důvod priority. Rychlejší práci musí teprve potvrdit test.",
  },
  {
    number: "02",
    title: "Kontext před akcí",
    finding: "Dochovaný prototyp ukazoval stav a termín na kartě, ale neměl detail s historií posledních výsledků a příštím krokem.",
    choice: "Do detailu jsem dal důvod priority, nemovitost, poslední interakci a další aktivitu před hlavní akci.",
    evidence: "V lokálním detailu lze společně přečíst, proč kontakt řešit, co se stalo naposledy a co následuje. Že je toto pořadí pro makléře srozumitelné, je zatím hypotéza.",
  },
  {
    number: "03",
    title: "Přesun není výsledek hovoru",
    finding: "V dochovaném prototypu mohl přesun do „K provolání“ zvýšit počet pokusů, i bez zaznamenaného výsledku hovoru.",
    choice: "Oddělil jsem procesní přesun od uložení výsledku. Pokus se počítá pouze z událostí hovoru v historii; samostatné plánování nemění stav.",
    evidence: "V lokální implementaci přesun zapíše změnu stavu bez pokusu. Až potvrzené „Nedovoláno“ přidá pokus, nastaví další hovor a zůstane v historii.",
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
