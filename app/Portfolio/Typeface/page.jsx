import TypefaceIdentity from "./TypefaceIdentity";
import { typefaceProject } from "../typefaceProject";
import TypefacePreview from "../components/TypefacePreview";
import VisualProjectShell, { ProjectScreenshots } from "../components/VisualProjectShell";

export const metadata = {
  title: "Typeface — logo, vizuální identita a web | David Pešek",
  description: "Autorské logo a branding Typeface od typografie a symbolů po responzivní web a pohyb. Vizuální studie Davida Peška.",
};

export default function TypefacePage() {
  return <VisualProjectShell project={typefaceProject} label="Vizuální identita studia" headline="Od loga k webu v pohybu." intro="Navrhl jsem logo, typografii a sadu barevných symbolů pro grafické studio. Na webu je propojuje pomalý pohyb." heroVisual={<TypefacePreview hero />}>
    <TypefaceIdentity />
    <ProjectScreenshots title="Od kompozice k responzivnímu webu." images={[
      { src: "/typeface/2026-10/home-desktop.webp", width: 1440, height: 900, alt: "Skutečná homepage Typeface s vyváženým nadpisem a barevným pásem symbolů", caption: "Desktop: celý úvod webu včetně navigace a hero animace." },
      { src: "/typeface/2026-10/home-mobile.webp", width: 390, height: 844, alt: "Mobilní homepage Typeface s většími symboly a menší průsvitnou plochou", caption: "Mobil: upravený poměr nadpisu, symbolů a průsvitné plochy." },
    ]} />
  </VisualProjectShell>;
}
