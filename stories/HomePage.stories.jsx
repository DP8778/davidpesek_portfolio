import PortfolioPage from "../app/Portfolio/page";
import Header from "../app/components/Headertwo";
import PortfolioIntro from "../app/Portfolio/components/Double-portfolio";
import Description from "../app/Portfolio/components/description";
import Technicals from "../app/Portfolio/components/TechnicalsAB";
import Projects from "../app/Portfolio/components/ProjectsPort";
import Gallery from "../app/Portfolio/components/galery";
import styles from "../app/Portfolio/Portfolio.module.scss";

export default {
  title: "Pages/Home",
  parameters: {
    layout: "fullscreen",
  },
};

export const FullPage = {
  name: "00 – Celá hlavní stránka",
  render: () => <PortfolioPage />,
};

export const HeaderSection = {
  name: "01 – Navigace",
  render: () => (
    <div className={styles.container} style={{ minHeight: 160 }}>
      <div className={styles.navbar}>
        <div className={styles.subnav2}>
          <div className={styles.menu}><Header /></div>
        </div>
      </div>
    </div>
  ),
};

export const IntroSection = {
  name: "02 – Úvodní portfolio",
  render: () => <PortfolioIntro onScrollToProjectNew={() => {}} onScrollToGallery={() => {}} />,
};

export const DescriptionSection = {
  name: "03 – Popis",
  render: () => <Description />,
};

export const TechnicalsSection = {
  name: "04 – Technické informace",
  render: () => <Technicals />,
};

export const ProjectsSection = {
  name: "05 – Projekty",
  render: () => <Projects />,
};

export const GallerySection = {
  name: "06 – Galerie",
  render: () => <Gallery />,
};

export const ContactSection = {
  name: "07 – Kontaktní patička",
  render: () => (
    <div className={styles.container}>
      <div className="py-[1rem] flex justify-center">
        <div className={styles.navbar2}>
          <div className={styles.subnav1}>
            <div>Vytvořil: David Pešek, 2025</div>
          </div>
          <div className={styles.subnav2}>
            <div>e-mail: david.pesek.prg@gmail.com</div>
            <div>telefon: +420 739 140 013</div>
          </div>
        </div>
      </div>
    </div>
  ),
};
