export const chapterLinks = [
  { id: "problem", number: "01", label: "Situace" },
  { id: "solution", number: "02", label: "Pracovní průchod" },
  { id: "scope-and-validation", number: "03", label: "Rozsah a ověření" },
];

export const modelContacts = [
  {
    name: "Anna Novotná",
    status: "K provolání",
    activity: "Hovor 11. 10. v 16:00",
  },
  {
    name: "Petr Dvořák",
    status: "Volat později",
    activity: "Hovor 12. 10. ve 14:00",
  },
  {
    name: "Jana Benešová",
    status: "Zásobník",
    activity: "Bez určené aktivity",
  },
];

export const solutionSteps = [
  {
    number: "B",
    title: "Poznámka před rozhodnutím o hovoru",
    description: "Ve 13:00 makléř otevře Annu. Z poslední poznámky sám vyčte preferenci po 15. hodině a upraví další hovor na 15:30. Stav K provolání i počet pokusů zůstávají beze změny.",
    rationale: "Poznámku, historii a další termín jsem dal do jednoho detailu. Makléř tak může posoudit vhodný čas ještě před záznamem hovoru.",
    tradeoff: "Detail je delší než řádek ve frontě a vyžaduje vědomé přečtení poznámky.",
    desktop: "/digital-call/story-detail-desktop.png",
    mobile: "/digital-call/story-detail-mobile.png",
    desktopSize: [896, 655],
    mobileSize: [375, 812],
    alt: "Detail Anny Novotné po úpravě termínu: poznámka o kontaktu po 15. hodině a další hovor dnes v 15:30",
    eyebrow: "B · Detail ve 13:00",
    caption: "Makléř upravil termín na 15:30 podle poznámky. Snímek ukazuje plánování, nikoli uskutečněný hovor.",
  },
  {
    number: "C",
    title: "Výsledek hovoru spolu s dalším termínem",
    description: "Po modelovém pokusu v 15:35 makléř uloží výsledek Nedovoláno a sám zvolí další hovor na 13. 10. v 16:00.",
    rationale: "Uložení výsledku přidá jeden pokus a nastaví další aktivitu. Samotné přeplánování se do historie hovorů nepočítá.",
    tradeoff: "Výsledek i pokračování vyžadují výslovné potvrzení; samotný přesun stavu pokus nevytváří.",
  },
];
