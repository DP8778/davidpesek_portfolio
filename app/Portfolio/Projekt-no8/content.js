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
    title: "Kontext před hlavní akcí",
    description: "Ve 13:00 makléř otevře Annu. Z poslední poznámky sám vyčte preferenci po 15. hodině a upraví další hovor na 15:30. Stav K provolání i počet pokusů zůstávají beze změny.",
    rationale: "Důvod pozornosti, poslední komunikace a další termín jsou pohromadě před hlavní akcí; pozornost neznamená volat hned.",
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
    title: "Výsledek a další krok",
    description: "Po modelovém pokusu v 15:35 makléř zaznamená Nedovoláno a sám zvolí další hovor na 13. 10. v 16:00. Nepoužije automatické doporučení, protože aplikace obsah poznámky nevyhodnocuje.",
    rationale: "Teprve přijatý výsledek přidá právě jeden pokus do historie, změní stav na Volat později a nastaví nový termín.",
    tradeoff: "Neplatný termín nebo zrušení formuláře ponechá kontakt beze změny.",
  },
];
