import TypefaceIdentity from "./TypefaceIdentity";
import { typefaceProject } from "../typefaceProject";
import TypefacePreview from "../components/TypefacePreview";
import VisualProjectShell, { ProjectDecisions, ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Typeface — logo, vizuální identita a web | David Pešek",
  description: "Návrh loga, vizuální identity a webu grafického studia. Vlastní projekt Davida Peška: typografie, geometrické symboly a pomalá hero animace.",
};

const decisions = [
  { title: "Dva fonty s odlišnou rolí.", text: "Prata nese hlavní sdělení. Manrope používám pro navigaci a delší text; výraznou kresbu tak soustředím do nadpisů a symbolů." },
  { title: "Pomalá smyčka místo střídání scén.", text: "Pohyb vzniká posunem jedné sady symbolů. Uživatel ho může pozastavit; při nastaveném omezení pohybu zůstává kompozice statická." },
  { title: "Jiný poměr prvků na mobilu.", text: "Na menší obrazovce jsem upravil velikost symbolů a průsvitné plochy i zalomení nadpisu. Zachoval jsem stejný princip kompozice." },
];

export default function TypefacePage() {
  return <VisualProjectShell project={typefaceProject} label="Logo · Vizuální identita · Web" headline="Od loga k webu v pohybu." intro="Typeface je návrh identity a webu grafického studia. Navrhl jsem logo, vybral typografii a vytvořil sadu barevných symbolů. Identitu jsem převedl do responzivního webu s pomalou animací.">
    <TypefaceIdentity />
    <TypefacePreview />
    <ProjectDecisions title="Typografie, pohyb a mobilní zobrazení." items={decisions} />
    <ProjectScreenshots title="Web na desktopu a mobilu." images={[
      { src: "/typeface/2026-10/home-desktop.webp", width: 1440, height: 900, alt: "Skutečná homepage Typeface s vyváženým nadpisem a barevným pásem symbolů", caption: "Desktop: celý úvod webu včetně navigace a hero animace." },
      { src: "/typeface/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní homepage Typeface s většími symboly a menší průsvitnou plochou", caption: "Mobil: upravený poměr nadpisu, symbolů a průsvitné plochy." },
    ]} />
  </VisualProjectShell>;
}
