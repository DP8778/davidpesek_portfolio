import { keraNaturProject } from "../keraNaturProject";
import VisualProjectShell, { ProjectDecisions, ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Kera Natur — komerční prezentační web | David Pešek",
  description: "Web keramické dílny Kera Natur: přehled výrobků, zakázková tvorba, kurzy, ceník a kontakt v responzivním návrhu.",
};

export default function KeraNaturPage() {
  return <VisualProjectShell project={keraNaturProject} label="Komerční prezentační web" headline="Výrobky, zakázky a kurzy na jednom místě." intro="Kera Natur propojuje keramickou tvorbu, výrobky pro chovatele a vzdělávací programy. Web představuje jednotlivé části nabídky a vede návštěvníka k produktům, ceníku nebo přímému kontaktu.">
    <ProjectScreenshots title="Úvod, který představí dílnu i nabídku." images={[
      { src: "/kera-natur/2026-10/home-desktop.webp", width: 1440, height: 960, alt: "Úvodní stránka Kera Natur s fotografiemi keramiky, zvířat a odkazy na výrobky a kurzy", caption: "Desktop: představení dílny, fotografie a dvě hlavní cesty do nabídky." },
      { src: "/kera-natur/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní podoba úvodní stránky Kera Natur", caption: "Mobil: stejná nabídka v přehledném sloupci." },
    ]} />
    <ProjectDecisions title="Přehledná nabídka, konkrétní další krok." items={[
      { title: "Rozdělit různé potřeby.", text: "Výrobky, zakázková tvorba a kurzy mají vlastní vstupy. Návštěvník si může rychle vybrat část nabídky, která ho zajímá." },
      { title: "Ukázat skutečnou práci.", text: "Fotografie výrobků a prostředí doplňují jemné přírodní barvy a ilustrace. Návrh navazuje na řemeslný charakter dílny." },
      { title: "Usnadnit přímou domluvu.", text: "Kategorie výrobků, ceník a kontaktní údaje jsou dostupné z hlavní navigace. U zakázkové tvorby web vede rovnou ke kontaktu." },
    ]} />
    <ProjectScreenshots title="Výrobky ve vlastním přehledu." images={[
      { src: "/kera-natur/2026-10/products-desktop.webp", width: 1440, height: 960, alt: "Stránka keramických výrobků Kera Natur s kategoriemi a fotografiemi", caption: "Produktová stránka pokračuje od úvodní nabídky ke konkrétním kategoriím výrobků." },
    ]} />
  </VisualProjectShell>;
}
