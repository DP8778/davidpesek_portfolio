import TypefaceIdentity from "./TypefaceIdentity";
import { typefaceProject } from "../typefaceProject";
import TypefacePreview from "../components/TypefacePreview";
import VisualProjectShell, { ProjectDecisions, ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Typeface — logo, vizuální identita a web | David Pešek",
  description: "Autorské logo a branding Typeface od typografie a symbolů po responzivní web a pohyb. Vizuální studie Davida Peška.",
};

const decisions = [
  { title: "Klidná typografie, výrazná grafika.", text: "Serifové nadpisy Prata a jednoduchý text v Manrope tvoří kontrast k barevným symbolům. Bílá plocha drží pozornost na kompozici." },
  { title: "Pohyb mění vnímání tvarů.", text: "Mozaika se pomalu posouvá pod průsvitnou vrstvou. Rozostření a kontrast proměňují stejné symboly bez další složité animace." },
  { title: "Stejný princip i na mobilu.", text: "Velikost symbolů, skleněné plochy i zalomení nadpisu se přizpůsobují obrazovce. Animaci lze pozastavit; při omezení pohybu zůstává statická." },
];

export default function TypefacePage() {
  return <VisualProjectShell project={typefaceProject} label="Logo · Vizuální identita · Web" headline="Od loga k webu v pohybu." intro="Pro Typeface jsem navrhl logo, celý branding i web. Černý slovní znak, serifová typografie a barevná sada symbolů tvoří identitu, kterou jsem převedl do kompozice a pomalého pohybu.">
    <TypefaceIdentity />
    <TypefacePreview />
    <ProjectDecisions title="Tři volby, které drží návrh pohromadě." items={decisions} />
    <ProjectScreenshots title="Od kompozice k responzivnímu webu." images={[
      { src: "/typeface/2026-10/home-desktop.webp", width: 1440, height: 900, alt: "Skutečná homepage Typeface s vyváženým nadpisem a barevným pásem symbolů", caption: "Desktop: celý úvod webu včetně navigace a hero animace." },
      { src: "/typeface/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní homepage Typeface s většími symboly a menší průsvitnou plochou", caption: "Mobil: upravený poměr nadpisu, symbolů a průsvitné plochy." },
    ]} />
  </VisualProjectShell>;
}
