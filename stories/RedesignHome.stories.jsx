import { useEffect } from "react";
import LanguageProvider, { usePortfolioLanguage } from "../app/i18n/LanguageProvider";
import RedesignHome from "./redesign/RedesignHome";
import RedesignHome03I from "./redesign/RedesignHome03I";
import RedesignHome03J from "./redesign/RedesignHome03J";
import RedesignHome03K from "./redesign/RedesignHome03K";
import RedesignHome03L from "./redesign/RedesignHome03L";
import RedesignHome03M from "./redesign/RedesignHome03M";

function PreviewPreferences({ language, theme, children }) {
  const { setLanguage } = usePortfolioLanguage();
  useEffect(() => {
    setLanguage(language);
  }, [language, setLanguage]);
  useEffect(() => {
    // The production theme hook also listens for changes from other tabs.
    const key = "dp-portfolio-theme";
    localStorage.setItem(key, theme);
    window.dispatchEvent(new StorageEvent("storage", { key, newValue: theme }));
  }, [theme]);
  return children;
}

export default {
  title: "Redesign/Home Page",
  component: RedesignHome,
  decorators: [
    (Story, context) => <LanguageProvider>
      <PreviewPreferences language={context.args.initialLanguage || "cs"} theme={context.args.initialTheme || "light"}>
        <Story />
      </PreviewPreferences>
    </LanguageProvider>,
  ],
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
    viewport: {
      options: {
        phone390: { name: "Telefon · 390 px", styles: { width: "390px", height: "844px" } },
        tablet768: { name: "Tablet · 768 px", styles: { width: "768px", height: "1024px" } },
        tablet834: { name: "Tablet · 834 px", styles: { width: "834px", height: "1112px" } },
        tablet1024: { name: "Tablet · 1024 px", styles: { width: "1024px", height: "768px" } },
        desktop1440: { name: "Desktop · 1440 px", styles: { width: "1440px", height: "1000px" } },
      },
    },
  },
  argTypes: {
    initialLanguage: {
      name: "Jazyk",
      control: "inline-radio",
      options: ["cs", "en"],
    },
    initialTheme: {
      name: "Barevný režim",
      control: "inline-radio",
      options: ["light", "dark"],
    },
    only: { table: { disable: true } },
    heroVariant: { table: { disable: true } },
    contentVariant: { table: { disable: true } },
  },
};

export const Complete = {
  name: "00 – Celý redesign (přepínač tématu)",
  args: { initialTheme: "light", only: "all" },
};

export const Light = {
  name: "01 – Celá stránka / Light",
  args: { initialTheme: "light", only: "all" },
};

export const Dark = {
  name: "02 – Celá stránka / Dark",
  args: { initialTheme: "dark", only: "all" },
};

export const Hero = {
  name: "03 – Hero + navigace",
  args: { initialTheme: "light", only: "hero", heroVariant: "standard" },
};

export const HeroViewport = {
  name: "03B – Hero / text přes celý viewport",
  args: { initialTheme: "light", only: "hero", heroVariant: "viewport" },
};

export const HeroMinimalGrid = {
  name: "03C – Hero / jednoduchý s mřížkou",
  args: { initialTheme: "light", only: "hero", heroVariant: "minimal-grid" },
};

export const CompleteMinimalGrid = {
  name: "03D – Celá stránka / jednoduchý hero s mřížkou",
  args: { initialTheme: "light", only: "all", heroVariant: "minimal-grid" },
};

export const HeroElevatedGrid = {
  name: "03E – Hero / jemné stíny a přesná mřížka",
  args: { initialTheme: "light", only: "hero", heroVariant: "elevated-grid" },
};

export const CompleteElevatedGrid = {
  name: "03F – Celá stránka / hero s jemnými stíny",
  args: { initialTheme: "light", only: "all", heroVariant: "elevated-grid" },
};

export const CompleteElevatedGridStickyPortfolio = {
  name: "03G – Celá stránka / sticky portfolio",
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio",
  },
};

export const CompleteElevatedGridStickyPortfolioAboutMe = {
  name: "03H – Celá stránka / sticky portfolio + About me",
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme",
  },
};

export const CompleteElevatedGridStickyPortfolioAboutMeCh = {
  name: "03CH – Celá stránka / záloha – transparentní navbar",
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

export const CompleteElevatedGridStickyPortfolioAboutMeI = {
  name: "03I – Celá stránka / pokračování 03CH",
  render: (args) => <RedesignHome03I {...args} />,
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

export const CompleteElevatedGridStickyPortfolioAboutMeJ = {
  name: "03J – Předchozí verze / checkpoint",
  render: (args) => <RedesignHome03J {...args} />,
  args: {
    initialTheme: "light",
    initialLanguage: "cs",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

const currentHomepage = {
  render: (args) => <RedesignHome03J {...args} />,
  args: {
    initialTheme: "light",
    initialLanguage: "cs",
    only: "hero",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

export const CurrentHeroLightCs = { ...currentHomepage, name: "03J / Hero / Light / CZ" };
export const CurrentHeroDarkCs = { ...currentHomepage, name: "03J / Hero / Dark / CZ", args: { ...currentHomepage.args, initialTheme: "dark" } };
export const CurrentHeroLightEn = { ...currentHomepage, name: "03J / Hero / Light / EN", args: { ...currentHomepage.args, initialLanguage: "en" } };
export const CurrentHeroDarkEn = { ...currentHomepage, name: "03J / Hero / Dark / EN", args: { ...currentHomepage.args, initialTheme: "dark", initialLanguage: "en" } };

const currentProjects = { ...currentHomepage, args: { ...currentHomepage.args, only: "selectedWork" } };
export const CurrentProjectsLightCs = { ...currentProjects, name: "03J / Projekty / Light / CZ" };
export const CurrentProjectsDarkCs = { ...currentProjects, name: "03J / Projekty / Dark / CZ", args: { ...currentProjects.args, initialTheme: "dark" } };
export const CurrentProjectsLightEn = { ...currentProjects, name: "03J / Projekty / Light / EN", args: { ...currentProjects.args, initialLanguage: "en" } };
export const CurrentProjectsDarkEn = { ...currentProjects, name: "03J / Projekty / Dark / EN", args: { ...currentProjects.args, initialTheme: "dark", initialLanguage: "en" } };

export const CompleteElevatedGridStickyPortfolioAboutMeK = {
  name: "03K – Celá stránka / pokračování 03J",
  render: (args) => <RedesignHome03K {...args} />,
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

export const CompleteElevatedGridStickyPortfolioAboutMeL = {
  name: "03L – Celá stránka / pokračování 03K",
  render: (args) => <RedesignHome03L {...args} />,
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

export const CompleteElevatedGridStickyPortfolioAboutMeM = {
  name: "03M – Celá stránka / kopie aktuální hlavní verze",
  render: (args) => <RedesignHome03M {...args} />,
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

export const Work = {
  name: "04 – Vybrané projekty",
  args: { initialTheme: "light", only: "work" },
};

export const StickyPortfolio = {
  name: "04A – Profil a sticky projekty",
  args: { initialTheme: "light", only: "stickyPortfolio" },
};

export const Services = {
  name: "05 – Služby a proces",
  args: { initialTheme: "light", only: "services" },
};

export const About = {
  name: "06 – Profil",
  args: { initialTheme: "light", only: "about" },
};

export const Contact = {
  name: "07 – Kontakt",
  args: { initialTheme: "light", only: "contact" },
};
