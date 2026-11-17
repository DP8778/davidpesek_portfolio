import { useEffect } from "react";
import LanguageProvider, { usePortfolioLanguage } from "../../app/i18n/LanguageProvider";
import { Text } from "../../app/i18n/Text";
import HeroGlassRim from "../../app/components/HeroGlassRim/HeroGlassRim";
import Redesign3Home from "./Redesign3Home";
import styles from "./Redesign3Glass.module.scss";

function Preferences({ language, theme, children }) {
  const { setLanguage } = usePortfolioLanguage();
  useEffect(() => setLanguage(language), [language, setLanguage]);
  useEffect(() => {
    // Keep existing theme-toggle behavior while making the story deterministic.
    const key = "dp-portfolio-theme";
    localStorage.setItem(key, theme);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: theme }));
  }, [theme]);
  return children;
}

function EdgeDetail({ variant, theme }) {
  return <div className={styles.detail} data-theme={theme}>
    <div className={styles.detailPanel} data-hero-glass={variant}>
      <span className={styles.detailLabel} data-hero-glass-label><Text>David Pešek · UX/UI a front-end</Text></span>
      <p><Text>Navrhuju a stavím digitální nástroje i weby.</Text></p>
      <HeroGlassRim variant={variant} />
    </div>
  </div>;
}

function EdgeSamples({ lensing, spectrum, underlay }) {
  const style = {
    "--study-shift": underlay + "px",
    ...(!lensing && { "--hero-prism-lensing": 0 }),
    ...(!spectrum && { "--hero-prism-spectrum-opacity": 0 }),
  };
  return <div className={styles.sides} style={style}>
    {["light", "dark"].map(theme => <section key={theme} data-theme={theme} className={styles.sideSample}>
      <h2>{theme === "light" ? "Světlý podklad" : "Tmavý podklad"}</h2>
      <div className={styles.sidePane} data-hero-glass="prism">
        <span className={styles.detailLabel} data-hero-glass-label><Text>David Pešek · UX/UI a front-end</Text></span>
        <HeroGlassRim variant="prism" />
      </div>
    </section>)}
  </div>;
}

function GlassPreview({ view, ...args }) {
  if (view === "sides") return <EdgeSamples {...args} />;
  if (view === "compare-prism") return (
    <div className={styles.prismComparison}>
      {["light", "dark"].map(theme => (
        <section key={theme} aria-label={theme === "light" ? "Prism Corners · light" : "Prism Corners · dark"}>
          <EdgeDetail variant="prism" theme={theme} />
        </section>
      ))}
    </div>
  );
  if (view === "detail") return <EdgeDetail variant={args.heroGlass} theme={args.initialTheme} />;
  return <Redesign3Home {...args} />;
}

const base = {
  initialTheme: "light",
  initialLanguage: "cs",
  only: "hero",
  heroVariant: "elevated-grid",
  contentVariant: "sticky-portfolio-aboutme-ch",
  heroGlass: "prism",
  view: "hero",
};

export default {
  title: "Redesign_3/Glass",
  component: GlassPreview,
  args: base,
  decorators: [(Story, { args }) => <LanguageProvider>
    <Preferences language={args.initialLanguage} theme={args.initialTheme}><Story /></Preferences>
  </LanguageProvider>],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: { description: { component: "02 Prism Corners modeluje čirý objem po celém obvodu a v brusu láme viditelný podklad. 03 Cut Glass používá dvě fasety v SVG. Obě varianty sledují skutečný rozměr štítku a jejich tokeny jsou v app/portfolio-design.css." } },
    viewport: { options: {
      phone390: { name: "Telefon · 390 px", styles: { width: "390px", height: "844px" }, type: "mobile" },
      tablet768: { name: "Tablet · 768 px", styles: { width: "768px", height: "1024px" }, type: "tablet" },
      desktop1440: { name: "Desktop · 1440 px", styles: { width: "1440px", height: "1000px" }, type: "desktop" },
    } },
  },
  argTypes: {
    heroGlass: { name: "Materiál hrany", control: "inline-radio", options: ["prism", "cut"] },
    initialTheme: { name: "Podklad", control: "inline-radio", options: ["light", "dark"] },
    initialLanguage: { name: "Jazyk", control: "inline-radio", options: ["cs", "en"] },
    lensing: { name: "Lom podkladu", control: "boolean", if: { arg: "view", eq: "sides" } },
    spectrum: { name: "Barva v ohybech", control: "boolean", if: { arg: "view", eq: "sides" } },
    underlay: { name: "Posun mřížky (px)", control: { type: "range", min: 0, max: 80, step: 1 }, if: { arg: "view", eq: "sides" } },
    view: { table: { disable: true } },
    only: { table: { disable: true } },
    heroVariant: { table: { disable: true } },
    contentVariant: { table: { disable: true } },
  },
};

export const PrismCornersLight = { name: "02 · Prism Corners / light" };
export const PrismCornersDark = { name: "02 · Prism Corners / dark", args: { initialTheme: "dark" } };
export const CutGlassLight = { name: "03 · Cut Glass / light", args: { heroGlass: "cut" } };
export const CutGlassDark = { name: "03 · Cut Glass / dark", args: { heroGlass: "cut", initialTheme: "dark" } };
export const PrismCornersPage = { name: "02 · Prism Corners / celá stránka", args: { only: "all" } };
export const CutGlassPage = { name: "03 · Cut Glass / celá stránka", args: { heroGlass: "cut", only: "all", initialTheme: "dark" } };
export const PrismCornersDetail = { name: "02 · Prism Corners / detail 2×", args: { view: "detail" } };
export const CutGlassDetail = { name: "03 · Cut Glass / detail 2×", args: { view: "detail", heroGlass: "cut", initialTheme: "dark" } };
export const PrismCornersTablet = { name: "02 · Prism Corners / tablet", globals: { viewport: { value: "tablet768", isRotated: false } } };
export const PrismCornersPhone = { name: "02 · Prism Corners / telefon", globals: { viewport: { value: "phone390", isRotated: false } } };
export const CutGlassPhone = { name: "03 · Cut Glass / telefon", args: { heroGlass: "cut", initialTheme: "dark" }, globals: { viewport: { value: "phone390", isRotated: false } } };
export const PrismCornersComparison = {
  name: "02 · Prism Corners / porovnání hrany",
  args: { view: "compare-prism" },
  argTypes: { heroGlass: { table: { disable: true } }, initialTheme: { table: { disable: true } } },
};

export const PrismSides = {
  name: "02 · Prism Corners / boky a lom",
  args: { view: "sides", lensing: true, spectrum: false, underlay: 0 },
  argTypes: {
    heroGlass: { table: { disable: true } },
    initialTheme: { table: { disable: true } },
    initialLanguage: { table: { disable: true } },
  },
};
