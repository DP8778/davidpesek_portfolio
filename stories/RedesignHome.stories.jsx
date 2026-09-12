import RedesignHome from "./redesign/RedesignHome";
import RedesignHome03I from "./redesign/RedesignHome03I";
import RedesignHome03J from "./redesign/RedesignHome03J";
import RedesignHome03K from "./redesign/RedesignHome03K";
import RedesignHome03L from "./redesign/RedesignHome03L";

export default {
  title: "Redesign/Home Page",
  component: RedesignHome,
  parameters: {
    layout: "fullscreen",
    backgrounds: { disable: true },
  },
  argTypes: {
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
  name: "03J – Celá stránka / pokračování 03I",
  render: (args) => <RedesignHome03J {...args} />,
  args: {
    initialTheme: "light",
    only: "all",
    heroVariant: "elevated-grid",
    contentVariant: "sticky-portfolio-aboutme-ch",
  },
};

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
