import { useEffect } from "react";
import LanguageProvider, { usePortfolioLanguage } from "../app/i18n/LanguageProvider";
import Redesign2Home from "./redesign_2/Redesign2Home";
import Redesign2DesignSystem from "./redesign_2/Redesign2DesignSystem";

function PreviewPreferences({ language, theme, children }) {
  const { setLanguage } = usePortfolioLanguage();

  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);

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
  only: "all",
  heroVariant: "elevated-grid",
  contentVariant: "sticky-portfolio-aboutme-ch",
};

export default {
  title: "Redesign_2/Home Page",
  component: Redesign2Home,
  decorators: [
    (Story, context) => (
      <LanguageProvider>
        <PreviewPreferences language={context.args.initialLanguage} theme={context.args.initialTheme}>
          <Story />
        </PreviewPreferences>
      </LanguageProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    viewport: {
      options: {
        phone390: { name: "Telefon · 390 px", styles: { width: "390px", height: "844px" }, type: "mobile" },
        tablet768: { name: "Tablet · 768 px", styles: { width: "768px", height: "1024px" }, type: "tablet" },
        tablet834: { name: "Tablet · 834 px", styles: { width: "834px", height: "1112px" }, type: "tablet" },
        tablet1024: { name: "Tablet · 1024 px", styles: { width: "1024px", height: "768px" }, type: "tablet" },
        desktop1440: { name: "Desktop · 1440 px", styles: { width: "1440px", height: "1000px" }, type: "desktop" },
      },
    },
  },
  argTypes: {
    initialTheme: { name: "Barevný režim", control: "inline-radio", options: ["light", "dark"] },
    initialLanguage: { name: "Jazyk", control: "inline-radio", options: ["cs", "en"] },
    only: { table: { disable: true } },
    heroVariant: { table: { disable: true } },
    contentVariant: { table: { disable: true } },
  },
};

export const DesignSystem = {
  name: "00 – Design systém / nastavení",
  render: () => <Redesign2DesignSystem />,
  parameters: { controls: { disable: true } },
};

export const FullPage = {
  name: "01 – Celá stránka",
  args: baseArgs,
};

export const FullPageDark = {
  name: "02 – Celá stránka / dark",
  args: { ...baseArgs, initialTheme: "dark" },
};

export const Hero = {
  name: "03 – Hero a tlačítka",
  args: { ...baseArgs, only: "hero" },
};

export const SelectedProjects = {
  name: "04 – Vybrané projekty",
  args: { ...baseArgs, only: "selectedWork" },
};

export const StickyProjectScroll = {
  name: "05 – Projekty / sticky scroll",
  args: { ...baseArgs, only: "stickyPortfolio" },
  parameters: {
    viewport: { defaultViewport: "desktop1440" },
    docs: {
      description: {
        story: "Předchozí varianta projektové sekce: informační panel zůstává vlevo a seznam projektů pokračuje ve scrollu vpravo. Homepage dál používá aktuální komponentu Vybrané projekty.",
      },
    },
  },
};

export const Tablet = {
  name: "06 – Celá stránka / tablet",
  args: baseArgs,
  parameters: { viewport: { defaultViewport: "tablet768" } },
};

export const Phone = {
  name: "07 – Celá stránka / telefon",
  args: baseArgs,
  parameters: { viewport: { defaultViewport: "phone390" } },
};
