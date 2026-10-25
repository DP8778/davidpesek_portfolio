import { keraNaturProject } from "../keraNaturProject";
import VisualProjectShell, { ProjectDecisions, ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Kera Natur — komerční prezentační web | David Pešek",
  description: "Web keramické dílny Kera Natur: přehled výrobků, zakázková tvorba, kurzy, ceník a kontakt v responzivním návrhu.",
};

export default function KeraNaturPage() {
  return <VisualProjectShell project={keraNaturProject} label="Komerční prezentační web" headline="Výrobky, zakázky a kurzy na jednom místě." intro="Keramická dílna s různorodou nabídkou. Web odděluje výrobky, zakázky a kurzy a vede k cenám i přímému kontaktu.">
    <ProjectScreenshots title="Úvod, který představí dílnu i nabídku." images={[
      { src: "/kera-natur/2026-10/home-desktop.webp", width: 1440, height: 960, alt: "Úvodní stránka Kera Natur s fotografiemi keramiky, zvířat a odkazy na výrobky a kurzy", caption: "Desktop: představení dílny, fotografie a dvě hlavní cesty do nabídky." },
      { src: "/kera-natur/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní podoba úvodní stránky Kera Natur", caption: "Mobil: stejná nabídka v přehledném sloupci." },
    ]} />
    <ProjectDecisions title="Přehledná nabídka, konkrétní další krok." items={[
      { title: "Rozdělit různé potřeby.", text: "Hotový výrobek, zakázka a kurz potřebují jiné informace. Každá cesta má vlastní vstup a přehled nabídky." },
      { title: "Ukázat skutečnou práci.", text: "Fotografie výrobků a prostředí doplňuje přírodní paleta a ilustrace. Vizuální návrh navazuje na řemeslný charakter dílny." },
      { title: "Usnadnit přímou domluvu.", text: "Z hlavní navigace lze projít výrobky, ceník a kontakty. Objednávky i kurzy se domlouvají telefonem nebo e-mailem." },
    ]} />
    <ProjectScreenshots title="Výrobky ve vlastním přehledu." images={[
      { src: "/kera-natur/2026-10/products-desktop.webp", width: 1440, height: 960, alt: "Stránka keramických výrobků Kera Natur s kategoriemi a fotografiemi", caption: "Produktová stránka pokračuje od úvodní nabídky ke konkrétním kategoriím výrobků." },
    ]} />
    <details style={{ color: "var(--text-soft)", lineHeight: 1.6, marginTop: 32 }}>
      <summary>Rozsah a podklady</summary>
      <p>Prezentační web s přímým kontaktem; neobsahuje e-shop ani rezervace. Moje role nezahrnuje autorství loga a fotografií. <a href="https://github.com/DP8778/davidpesek_portfolio/blob/main/app/Portfolio/Kera-Natur/CAPTURE_NOTES.md" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>Původ snímků ↗</a></p>
    </details>
  </VisualProjectShell>;
}
