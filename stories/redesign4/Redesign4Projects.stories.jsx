import { useEffect } from "react";
import LanguageProvider, { usePortfolioLanguage } from "../../app/i18n/LanguageProvider";
import DigitalCallCaseStudy from "../../app/Portfolio/Projekt-no8/DigitalCallCaseStudy";
import LensCaseStudy from "../../app/Portfolio/Lens/LensCaseStudy";

function ProjectPreferences({ language, theme, children }) {
  const { setLanguage } = usePortfolioLanguage();

  useEffect(() => setLanguage(language), [language, setLanguage]);
  useEffect(() => {
    const key = "dp-portfolio-theme";
    localStorage.setItem(key, theme);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: theme }));
  }, [theme]);

  return children;
}

const baseArgs = { language: "cs", theme: "light" };

export default {
  title: "Redesign_4/Projektové podstránky",
  decorators: [
    (Story, { args }) => <LanguageProvider>
      <ProjectPreferences language={args.language} theme={args.theme}>
        <Story />
      </ProjectPreferences>
    </LanguageProvider>,
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    docs: {
      description: {
        component: "Produkční komponenty case studies použité i na skutečných podstránkách portfolia.",
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
    language: { name: "Jazyk", control: "inline-radio", options: ["cs", "en"] },
    theme: { name: "Barevný režim", control: "inline-radio", options: ["light", "dark"] },
  },
};

export const DigitalCall = {
  name: "01 · Digital Call case study",
  args: baseArgs,
  render: () => <DigitalCallCaseStudy />,
};

export const Lens = {
  name: "02 · Lens case study",
  args: baseArgs,
  render: () => <LensCaseStudy />,
};

export const DigitalCallPhone = {
  name: "03 · Digital Call / telefon",
  args: baseArgs,
  render: () => <DigitalCallCaseStudy />,
  parameters: { viewport: { defaultViewport: "phone390" } },
};

export const LensPhone = {
  name: "04 · Lens / telefon",
  args: baseArgs,
  render: () => <LensCaseStudy />,
  parameters: { viewport: { defaultViewport: "phone390" } },
};
