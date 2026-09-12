import Description from "../app/Portfolio/components/description";
import DescriptionCard from "../app/Portfolio/components/descriptionB";
import Technicals from "../app/Portfolio/components/Technicals";
import TechnicalsAB from "../app/Portfolio/components/TechnicalsAB";
import TechnicalsB from "../app/Portfolio/components/TechnicalsB";
import TechnicalsC from "../app/Portfolio/components/TechnicalsC";
import TechnicalsCH from "../app/Portfolio/components/TechnicalsCH";
import TechnicalsF from "../app/Portfolio/components/TechnicalsF";
import TechnicalsG from "../app/Portfolio/components/TechnicalsG";
import TechnicalsH from "../app/Portfolio/components/TechnicalsH";
import Projects from "../app/Portfolio/components/Projects";
import ProjectsPortfolio from "../app/Portfolio/components/ProjectsPort";
import ProjectsPortfolio02 from "../app/Portfolio/components/ProjectsPort2";
import ProjectFooter from "../app/Portfolio/components/Footer-project";
import ProjectFooterContent from "../app/Portfolio/components/Footer-project/Content";

export default {
  title: "Portfolio/Content",
  parameters: { layout: "fullscreen" },
};

const technicalArgs = {
  Tech1: "Next.js, React",
  Tech2: "Figma, Sass, Tailwind CSS",
  Tech3: "GSAP, Framer Motion",
  Tech4: "Firebase Hosting",
  Font: "Manrope / Clash Display",
  Link: "davidpesek.cz",
  Rok: "2026",
};

export const ProjectDescription = { render: () => <Description /> };

export const EditableDescriptionCard = {
  args: {
    title: "Zadání",
    content: "Návrh a realizace digitálního produktu.",
    title1: "Role",
    content1: "UX/UI design a front-end vývoj.",
    title2: "Výzkum",
    content2: "Analýza potřeb uživatelů.",
    title3: "Řešení",
    content3: "Responzivní rozhraní a prototyp.",
    title4: "Výsledek",
    content4: "Nasazený web připravený k používání.",
  },
  render: (args) => <DescriptionCard {...args} />,
};

export const TechnicalDetails01 = { args: technicalArgs, render: (args) => <Technicals {...args} /> };
export const TechnicalDetails02 = { render: () => <TechnicalsAB /> };
export const TechnicalDetails03 = { args: technicalArgs, render: (args) => <TechnicalsB {...args} /> };
export const TechnicalDetails04 = { args: technicalArgs, render: (args) => <TechnicalsC {...args} /> };
export const TechnicalDetails05 = { render: () => <TechnicalsCH /> };
export const TechnicalDetails06 = { args: technicalArgs, render: (args) => <TechnicalsF {...args} /> };
export const TechnicalDetails07 = { args: technicalArgs, render: (args) => <TechnicalsG {...args} /> };
export const TechnicalDetails08 = { args: technicalArgs, render: (args) => <TechnicalsH {...args} /> };
export const ProjectSelection = { render: () => <Projects /> };
export const PortfolioProjects01 = { render: () => <ProjectsPortfolio /> };
export const PortfolioProjects02 = { render: () => <ProjectsPortfolio02 /> };
export const Footer = { render: () => <ProjectFooter /> };
export const FooterContent = { render: () => <ProjectFooterContent /> };
