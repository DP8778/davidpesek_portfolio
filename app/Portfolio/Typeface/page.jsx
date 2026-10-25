import { typefaceProject } from "../typefaceProject";
import TypefacePreview from "../components/TypefacePreview";
import VisualProjectShell, { ProjectDecisions, ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Typeface — web design a motion | David Pešek",
  description: "Vizuální studie webu grafického studia: výrazná typografie, barevné symboly a plynulá hero animace v responzivním front-endu.",
};

const decisions = [
  { title: "Klidná typografie, výrazná grafika.", text: "Serifové nadpisy Prata a jednoduchý text v Manrope tvoří kontrast k barevným symbolům. Bílá plocha drží pozornost na kompozici." },
  { title: "Pohyb mění vnímání tvarů.", text: "Mozaika se pomalu posouvá pod průsvitnou vrstvou. Rozostření a kontrast proměňují stejné symboly bez další složité animace." },
  { title: "Stejný princip i na mobilu.", text: "Velikost symbolů, skleněné plochy i zalomení nadpisu se přizpůsobují obrazovce. Animaci lze pozastavit; při omezení pohybu zůstává statická." },
];

export default function TypefacePage() {
  return <VisualProjectShell project={typefaceProject} label="Koncept webu pro grafické studio" headline="Vizuální charakter v pohybu." intro="Web grafického studia propojuje výraznou sazbu, barevné geometrické symboly a pomalý pohyb pod průsvitnou vrstvou.">
    <TypefacePreview />
    <ProjectDecisions title="Tři volby, které drží návrh pohromadě." items={decisions} />
    <ProjectScreenshots title="Od kompozice k responzivnímu webu." images={[
      { src: "/typeface/2026-10/home-desktop.webp", width: 1440, height: 900, alt: "Skutečná homepage Typeface s vyváženým nadpisem a barevným pásem symbolů", caption: "Desktop: celý úvod webu včetně navigace a hero animace." },
      { src: "/typeface/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní homepage Typeface s většími symboly a menší průsvitnou plochou", caption: "Mobil: upravený poměr nadpisu, symbolů a průsvitné plochy." },
    ]} />
  </VisualProjectShell>;
}
