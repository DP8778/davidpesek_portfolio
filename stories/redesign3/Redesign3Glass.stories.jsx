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
    <div className={styles.detailPanel}>
      <span className={styles.detailLabel} data-hero-glass-label><Text>David Pešek · UX/UI a front-end</Text></span>
      <p><Text>Navrhuju a stavím digitální nástroje i weby.</Text></p>
      <HeroGlassRim variant={variant} />
    </div>
  </div>;
}

function GlassPreview({ view, ...args }) {
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
    docs: { description: { component: "Dvě skutečné implementace hrany z vizuálních návrhů: 02 Prism Corners a 03 Cut Glass. Obsah zůstává živý a klikací. Hrana je SVG, nikoli obrázek; měří aktuální label a přepočítá se při změně šířky, písma nebo jazyka. Materiálové proměnné jsou v app/portfolio-design.css v části SKLENĚNÁ HRANA." } },
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
export const CutGlassPhone = { name: "03 · Cut Glass / telefon", args: { heroGlass: "cut", initialTheme: "dark" }, globals: { viewport: { value: "phone390", isRotated: false } } };
