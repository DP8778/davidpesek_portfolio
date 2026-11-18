import { useEffect } from "react";
import LanguageProvider, { usePortfolioLanguage } from "../../app/i18n/LanguageProvider";
import Redesign4Home from "./Redesign4Home";

function Preferences({ language, theme, children }) {
  const { setLanguage } = usePortfolioLanguage();

  useEffect(() => setLanguage(language), [language, setLanguage]);
  useEffect(() => {
    const key = "dp-portfolio-theme";
    localStorage.setItem(key, theme);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: theme }));
  }, [theme]);

  return children;
}

const baseArgs = {
  initialTheme: "light",
  initialLanguage: "cs",
  typography: "current",
  only: "all",
  heroVariant: "elevated-grid",
  contentVariant: "sticky-portfolio-aboutme-ch",
};

export default {
  title: "Redesign_4/Home Page",
  component: Redesign4Home,
  decorators: [
    (Story, { args }) => <LanguageProvider>
      <Preferences language={args.initialLanguage} theme={args.initialTheme}>
        <div data-portfolio-type={args.typography}><Story /></div>
      </Preferences>
    </LanguageProvider>,
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: {
      description: {
        component: "Celá portfolio stránka z Redesign_3 se sticky projekty a produkční hranou Prism Corners. Redesign_3 zůstává beze změny.",
      },
    },
    viewport: {
      options: {
        phone390: { name: "Telefon · 390 px", styles: { width: "390px", height: "844px" }, type: "mobile" },
        tablet768: { name: "Tablet · 768 px", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        desktop1440: { name: "Desktop · 1440 px", styles: { width: "1440px", height: "1000px" }, type: "desktop" },
      },
    },
  },
  argTypes: {
    initialTheme: { name: "Barevný režim", control: "inline-radio", options: ["light", "dark"] },
    initialLanguage: { name: "Jazyk", control: "inline-radio", options: ["cs", "en"] },
    typography: { name: "Typografie", control: "inline-radio", options: ["current", "alternative"] },
    only: { table: { disable: true } },
    heroVariant: { table: { disable: true } },
    contentVariant: { table: { disable: true } },
  },
};

export const FullPage = {
  name: "01 · Celá stránka / Prism Corners",
  args: baseArgs,
};

export const FullPageDark = {
  name: "02 · Celá stránka / dark",
  args: { ...baseArgs, initialTheme: "dark" },
};

export const Tablet = {
  name: "03 · Celá stránka / tablet",
  args: baseArgs,
  parameters: { viewport: { defaultViewport: "tablet768" } },
};

export const Phone = {
  name: "04 · Celá stránka / telefon",
  args: baseArgs,
  parameters: { viewport: { defaultViewport: "phone390" } },
};
