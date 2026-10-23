export const chapterLinks = [
  { id: "problem", number: "01", label: "Situace" },
  { id: "solution", number: "02", label: "Pracovní průchod" },
  { id: "scope-and-validation", number: "03", label: "Rozsah a ověření" },
];

export const modelContacts = [
  {
    name: "Anna Novotná",
    property: "Byt 3+kk · Praha 7",
    status: "K provolání",
    activity: "Hovor 11. 10. v 16:00",
    work: "Zmeškané · termín uplynul",
    meaning: "Je potřeba rozhodnout o dalším hovoru.",
  },
  {
    name: "Petr Dvořák",
    property: "Rodinný dům · Beroun",
    status: "Volat později",
    activity: "Hovor 12. 10. ve 14:00",
    work: "Dnes · termín teprve přijde",
    meaning: "Nejde o prošlý úkol ve 13:00.",
  },
  {
    name: "Jana Benešová",
    property: "Rodinný dům · Pardubice",
    status: "Zásobník",
    activity: "Bez určené aktivity",
    work: "Nové kontakty · mimo frontu K řešení",
    meaning: "Potřebuje první další krok, ne falešnou naléhavost.",
  },
];

export const solutionSteps = [
  {
    number: "B",
    title: "Kontext před hlavní akcí",
    description: "U Anny nejdřív ukazuju důvod pozornosti a termín po splatnosti. Hned pod nimi jsou nemovitost a poslední nedovolání s poznámkou o vhodném čase; teprve potom přichází akce Zaznamenat výsledek.",
    rationale: "Pořadí má umožnit připravit hovor podle poslední komunikace, ne jen podle štítku stavu.",
    tradeoff: "Detail je delší než stručná karta ve frontě. Zda pořadí opravdu pomáhá makléřům, zatím nebylo ověřeno.",
    desktop: "/digital-call/handoff-detail-desktop.png",
    mobile: "/digital-call/handoff-detail-mobile.png",
    alt: "Detail Anny Novotné s nemovitostí, posledním nedovoláním, hlavní akcí a dalším hovorem",
    eyebrow: "B · Detail před akcí",
    caption: "Důvod pozornosti, poslední komunikace a příští krok jsou čitelné ještě před zaznamenáním výsledku.",
  },
  {
    number: "C",
    title: "Výsledek má jasné důsledky",
    description: "Ve formuláři Anna volí Nedovoláno, další termín a případnou poznámku. Před potvrzením vidí, že se uloží pokus a připraví další hovor.",
    rationale: "Potvrzení vychází z přijaté změny: teprve pak se aktualizuje stav, historie a příští aktivita.",
    tradeoff: "Výslovné určení pokračování znamená krok navíc, ale odděluje skutečný hovor od pouhého přesunu mezi stavy.",
    desktop: "/digital-call/handoff-outcome-desktop.png",
    mobile: "/digital-call/handoff-outcome-mobile.png",
    alt: "Formulář výsledku hovoru u Anny Novotné s volbou Nedovoláno a doporučeným dalším termínem",
    eyebrow: "C · Výsledek hovoru",
    caption: "Vybraný výsledek, doporučený termín a potvrzení jsou součástí jednoho formuláře; snímek ukazuje stav před uložením.",
  },
];
