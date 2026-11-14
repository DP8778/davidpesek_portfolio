import { useEffect } from "react";
import LanguageProvider, { usePortfolioLanguage } from "../../app/i18n/LanguageProvider";
import Redesign3Home from "./Redesign3Home";

function PreviewPreferences({ language, theme, typography, children }) {
  const { setLanguage } = usePortfolioLanguage();

  useEffect(() => setLanguage(language), [language, setLanguage]);
  useEffect(() => {
    const key = "dp-portfolio-theme";
    localStorage.setItem(key, theme);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: theme }));
  }, [theme]);

  return <div data-portfolio-type={typography}>{children}</div>;
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
  title: "Redesign_3/Home Page",
  component: Redesign3Home,
  decorators: [
    (Story, context) => <LanguageProvider>
      <PreviewPreferences language={context.args.initialLanguage} theme={context.args.initialTheme} typography={context.args.typography}>
        <Story />
      </PreviewPreferences>
    </LanguageProvider>,
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
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
  name: "01 – Celá stránka / sticky projekty",
  args: baseArgs,
};

export const FullPageDark = {
  name: "02 – Celá stránka / dark",
  args: { ...baseArgs, initialTheme: "dark" },
};

export const Hero = {
  name: "03 – Hero",
  args: { ...baseArgs, only: "hero" },
};

export const StickyProjects = {
  name: "04 – Sticky projekty",
  args: { ...baseArgs, only: "stickyPortfolio" },
  parameters: { docs: { description: { story: "Samostatný náhled sekce: rail vlevo a čtyři aktuální projekty ve scrollu vpravo." } } },
};

export const Tablet = {
  name: "05 – Celá stránka / tablet",
  args: baseArgs,
  parameters: { viewport: { defaultViewport: "tablet768" } },
};

export const Phone = {
  name: "06 – Celá stránka / telefon",
  args: baseArgs,
  parameters: { viewport: { defaultViewport: "phone390" } },
};
