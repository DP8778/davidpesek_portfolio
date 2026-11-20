import CaseStudyBrief from "../components/CaseStudyBrief";
import captures from "../../../public/lens/2026-10/captures.json";

const intro = [
  "Lens jsem navrhl pro člověka, který sleduje cenu akcie a zajímá ho, jak funguje samotná firma. Z cenového grafu vyčte, kdy kurz rostl nebo klesal. Pokud chce vědět, co firma prodává a jak si vede vedle konkurence, musí se podívat i do výkazů a tržních přehledů. V Lens může tyto souvislosti prozkoumat v jednom detailu firmy.",
  "U AMD mě zajímaly dvě otázky: která část firmy přináší nejvíc tržeb a která nejvíc přispěla k jejich růstu? Odpověď nemusí být stejná. V prstencovém grafu proto ukazuju, jak se tržby dělí mezi jednotlivé části firmy. Vedle něj jsou částky a meziroční změny, takže se dají porovnat i bez odhadování velikosti výsečí.",
  "Při přechodu ke konkurenci se mění význam procent. U samostatných grafických karet pro stolní počítače už celek netvoří tržby AMD, ale všechny karty dodané na tento trh. Přímo u grafu proto uvádím, za které čtvrtletí odhad platí a že se podíl počítá z počtu kusů. Čtenář tak ví, v čem výrobce porovnává.",
  "The Trade Desk ukazuje, proč jsem pro každou firmu nepoužil stejný graf. Klienti přes platformu nakupují reklamu. Celková částka, kterou utratí, a vlastní tržby platformy se překrývají. Místo dvou výsečí je proto kreslím jako dva pruhy ve stejném měřítku. Pod grafem si čtenář může otevřít zdroj a dohledat, co do výpočtu vstupuje.",
];

function lensScreens(theme) {
  const image = key => {
    const { src, imageWidth, imageHeight } = captures.screens[theme][key];
    return { src, imageWidth, imageHeight };
  };
  return [
    {
      id: "interaction", label: "01 · Zdroje tržeb AMD",
      caption: "Datová centra tvoří největší část tržeb. Největší přírůstek za zobrazený rok ale přinesla divize Client and Gaming.",
      alt: "Rozdělení tržeb AMD za fiskální rok 2025 mezi datová centra, Client and Gaming a vestavné systémy.",
      desktop: image("revenue"), mobile: image("mobile"),
    },
    {
      id: "interaction-market", label: "02 · AMD a konkurence",
      caption: "Podíly AMD, NVIDIA a Intelu vycházejí z odhadu počtu dodaných karet pro stolní PC za jedno čtvrtletí.",
      alt: "Graf odhadovaných podílů tří výrobců na dodávkách samostatných grafických karet pro stolní PC.",
      desktop: image("market"), mobile: image("marketMobile"),
    },
    {
      id: "ttd", label: "03 · The Trade Desk",
      caption: "Délka pruhů umožňuje v každém roce porovnat útratu klientů za reklamu s tržbami samotné platformy.",
      alt: "Dvojice pruhů pro každý ze tří let ukazuje útratu klientů a tržby The Trade Desk na společné stupnici.",
      desktop: image("ttdEconomics"), mobile: image("ttdEconomicsMobile"),
      demo: { href: "https://p-2-lens.vercel.app/cs-CZ/assets/twelvedata%3AXNGM%3ATTD", label: "Otevřít The Trade Desk v Lens" },
    },
  ];
}

export default function LensCaseStudy() {
  return <CaseStudyBrief
    project="Lens"
    eyebrow="Lens · Vizualizace dat · 2026"
    question="Jak firma vydělává a kde soutěží?"
    intro={intro}
    screens={{ light: lensScreens("light"), dark: lensScreens("dark") }}
    demoUrl="https://p-2-lens.vercel.app/cs-CZ/assets/twelvedata%3AXNGS%3AAMD"
    sourceUrl="https://github.com/DP8778/P-2_Lens"
    next={{ href: "/Portfolio/Typeface", label: "Další projekt: Typeface" }}
  />;
}
