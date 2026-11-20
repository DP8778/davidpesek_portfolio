import CaseStudyBrief from "../components/CaseStudyBrief";

const intro = [
  "Digital Call je pracovní prototyp pro realitní makléře. Když makléř ráno otevře seznam kontaktů, potřebuje zjistit, komu co slíbil. U dvou jmen může být stav „Volat později“, jenže s jedním klientem se domluvil na dnešním dopoledni a druhý čeká hovor až příští týden. Samotný stav mu neřekne, které číslo vytočit jako první.",
  "Proto jsem jako první obrazovku navrhl přehled podle termínu. Nahoře jsou hovory, které už měly proběhnout, hned pod nimi ty naplánované na dnešek. U každého je vidět jméno, nemovitost a čas. Makléř si tak může vybrat další kontakt, aniž by musel pročítat historii všech lidí v seznamu.",
  "Před telefonátem už makléř potřebuje něco jiného: připomenout si poslední domluvu. Třeba u Anny je vedle prošlého termínu poznámka, že jí vyhovuje volat po třetí odpoledne. Makléř tedy může hovor přesunout na odpoledne a mezitím zavolat někomu jinému. Přesun jsem oddělil od záznamu výsledku, aby v historii nepřibyl telefonát, který se ve skutečnosti nestal.",
  "Po hovoru si makléř zapíše, jak dopadl. Když se Anně nedovolá, uloží se i tento pokus a makléř může rovnou vybrat nový termín. Při příštím telefonátu pak uvidí, kdy jí volal naposledy a proč se jí ozývá znovu. V demu se dá celý postup projít s jedním ukázkovým kontaktem a sledovat, kam se v přehledu přesune.",
];

function screen(id, label, alt, caption) {
  return {
    id, label, alt, caption,
    desktop: { src: `/digital-call/handoff-${id}-desktop.png`, imageWidth: 1440, imageHeight: 1000 },
    mobile: { src: `/digital-call/handoff-${id}-mobile.png`, imageWidth: 375, imageHeight: 812 },
  };
}

const screens = [
  screen("queue", "01 · Před hovorem", "Přehled kontaktů rozdělený na prošlé a dnešní termíny.", "Na jednom místě jsou dnešní hovory i ty, které už měly proběhnout."),
  screen("detail", "02 · U kontaktu", "Detail Anny Novotné s posledním pokusem o spojení a poznámkou, že jí vyhovuje čas po 15. hodině.", "Poslední poznámka připomene, na čem se makléř s klientem domluvil."),
  screen("outcome", "03 · Po hovoru", "Ve formuláři je vybraný výsledek Nedovoláno a pod ním termín dalšího hovoru.", "Makléř uloží výsledek a naplánuje další zavolání."),
];

export default function DigitalCallCaseStudy() {
  return <CaseStudyBrief
    project="Digital Call"
    eyebrow="Digital Call · UX/UI · 2026"
    question="Komu dnes zavolat?"
    intro={intro}
    screens={{ light: screens, dark: screens }}
    demoUrl="https://digital-call-module.vercel.app/"
    sourceUrl="https://github.com/DP8778/digital_call_module"
    next={{ href: "/Portfolio/Lens", label: "Pokračovat na Lens" }}
  />;
}
