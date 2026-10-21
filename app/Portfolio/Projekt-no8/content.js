export const chapterLinks = [
  { id: "problem", number: "01", label: "Problém" },
  { id: "solution", number: "02", label: "Řešení" },
  { id: "data-and-rules", number: "03", label: "Data a pravidla" },
  { id: "scope-and-validation", number: "04", label: "Rozsah a ověření" },
];

export const solutionSteps = [
  {
    number: "01",
    title: "Vybrat kontakt podle aktuální práce.",
    description: "Pohled K řešení odděluje prošlé termíny, dnešní plán a pozdější aktivity. Nové kontakty mají vlastní zásobník; Kanban zachovává přehled o procesu.",
    desktop: "/digital-call/handoff-queue-desktop.png",
    mobile: "/digital-call/handoff-queue-mobile.png",
    alt: "Pracovní fronta Digital Call s prošlými a budoucími dnešními aktivitami a důvodem pozornosti u kontaktů",
    eyebrow: "01 · Pracovní fronta",
    caption: "Termín a důvod pozornosti jsou přímo u kontaktu; procesní přehled zůstává samostatný.",
  },
  {
    number: "02",
    title: "Pochopit kontext před hovorem.",
    description: "Detail spojuje kontakt a nemovitost s poslední komunikací, historií a příští aktivitou. Uživatel vidí, proč se kontaktu věnovat a na co navázat.",
    desktop: "/digital-call/handoff-detail-desktop.png",
    mobile: "/digital-call/handoff-detail-mobile.png",
    alt: "Detail Anny Novotné s nemovitostí, posledním nedovoláním, hlavní akcí a dalším hovorem",
    eyebrow: "02 · Kontext kontaktu",
    caption: "Poslední výsledek a příští aktivita jsou dostupné před hlavní akcí.",
  },
  {
    number: "03",
    title: "Uzavřít hovor jasným dalším krokem.",
    description: "Záznam výsledku propojuje pokus o kontaktování s pokračováním — dalším hovorem, schůzkou nebo vyřazením. Samotný přesun mezi stavy nový pokus nevytváří.",
    desktop: "/digital-call/handoff-outcome-desktop.png",
    mobile: "/digital-call/handoff-outcome-mobile.png",
    alt: "Formulář výsledku hovoru u Anny Novotné s volbou Nedovoláno a doporučeným dalším termínem",
    eyebrow: "03 · Výsledek a pokračování",
    caption: "Dopad volby i doporučený termín jsou vidět ještě před potvrzením.",
  },
];

export const testQuestions = [
  "Pozná makléř, komu se věnovat nejdřív?",
  "Najde souvislosti poslední komunikace?",
  "Dokáže zaznamenat výsledek a naplánovat pokračování?",
];
