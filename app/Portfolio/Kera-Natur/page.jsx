import { keraNaturProject } from "../keraNaturProject";
import VisualProjectShell, { ProjectDecisions, ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Kera Natur — komerční prezentační web | David Pešek",
  description: "Web keramické dílny Kera Natur: přehled výrobků, zakázková tvorba, kurzy, ceník a kontakt v responzivním návrhu.",
};

export default function KeraNaturPage() {
  return <VisualProjectShell project={keraNaturProject} label="Komerční prezentační web" headline="Web pro výrobky, zakázky a kurzy." intro="Navrhl a postavil jsem prezentační web keramické dílny Kera Natur. Nabídku výrobků, zakázkové tvorby a kurzů jsem rozdělil do samostatných částí; ceny a kontakty jsou dostupné z hlavní navigace.">
    <p style={{ color: "var(--text-soft)", lineHeight: 1.6, marginTop: 32 }}>Dílna nabízí keramiku, výrobky pro chovatele i vzdělávací programy. Strukturu webu jsem postavil podle těchto různých důvodů návštěvy.</p>
    <ProjectScreenshots title="Úvodní stránka dílny." images={[
      { src: "/kera-natur/2026-10/home-desktop.webp", width: 1440, height: 960, alt: "Úvodní stránka Kera Natur s fotografiemi keramiky, zvířat a odkazy na výrobky a kurzy", caption: "Desktop: představení dílny, fotografie a dvě hlavní cesty do nabídky." },
      { src: "/kera-natur/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní podoba úvodní stránky Kera Natur", caption: "Mobil: stejná nabídka v přehledném sloupci." },
    ]} />
    <ProjectDecisions title="Jak jsem uspořádal nabídku." items={[
      { title: "Samostatné vstupy do nabídky.", text: "Výrobky a kurzy mají samostatné stránky. U zakázkové tvorby web vede k přímé domluvě." },
      { title: "Fotografie výrobků a dílny.", text: "Vizuál stojí na fotografiích a přírodních barvách. Ilustrace a sazbu jsem použil jako doplněk k ukázkám tvorby." },
      { title: "Ceník a přímý kontakt.", text: "Zakázková tvorba a kurzy vedou k domluvě telefonem nebo e-mailem. Web proto zpřístupňuje ceník a kontakty přímo z navigace." },
    ]} />
    <ProjectScreenshots title="Výrobky ve vlastním přehledu." images={[
      { src: "/kera-natur/2026-10/products-desktop.webp", width: 1440, height: 960, alt: "Stránka keramických výrobků Kera Natur s kategoriemi a fotografiemi", caption: "Produktová stránka pokračuje od úvodní nabídky ke konkrétním kategoriím výrobků." },
    ]} />
  </VisualProjectShell>;
}
