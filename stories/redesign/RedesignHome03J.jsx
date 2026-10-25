"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import LanguageToggle from "../../app/i18n/LanguageToggle";
import usePortfolioTheme from "../../app/usePortfolioTheme";
import { digitalCallProject } from "../../app/Portfolio/digitalCallProject";
import { lensProject } from "../../app/Portfolio/lensProject";
import { keraNaturProject } from "../../app/Portfolio/keraNaturProject";
import { TypefaceFeature } from "../../app/Portfolio/components/TypefacePreview";
// Independent 03J fork; keep 03I as the previous design variant.
import styles from "./RedesignHome03J.module.scss";
import { Text as I18nText, Localized as I18nElement } from "../../app/i18n/Text";

const projects = [
  {
    number: "01",
    title: "František Nevrala",
    description: "Portfolio pro ilustrátora Františka Nevralu. Návrh, vývoj a animace v Next.js.",
    image: "/fan-pic2.png",
    fallback: "/galery/typeface1.png",
    tags: ["Art direction", "UX/UI", "Development"],
    year: "2024",
    href: "/Portfolio/Projekt-no1",
    tone: "violet",
  },
  {
    number: "02",
    title: "Růžička",
    description: "Návrh webu pro malířské služby se zaměřením na nabídku, reference a kontakt.",
    image: "/galery/malir7.png",
    fallback: "/malir8.png",
    tags: ["Web design", "Strategy"],
    year: "2025",
    href: "/Portfolio/Projekt-no2",
    tone: "amber",
  },
  {
    ...digitalCallProject,
    number: "03",
    fallback: digitalCallProject.mobileImage,
    tags: ["Product design", "UX/UI"],
    tone: "blue",
  },
];

const stickyProjects = [
  {
    ...digitalCallProject,
    number: "01",
    fallback: digitalCallProject.mobileImage,
    tone: "digital",
  },
  {
    number: "02",
    title: "František Nevrala",
    role: "Art direction · Development",
    description: "Osobní portfolio ilustrátora, od vizuálního konceptu po vývoj a animace.",
    image: "/fan-pic2.png",
    fallback: "/galery/typeface1.png",
    year: "2024",
    href: "/Portfolio/Projekt-no1",
    tone: "violet",
  },
  {
    number: "03",
    title: "BBB Krby",
    role: "UX/UI · Web design",
    description: "Prezentační web pro studio krbů, kamen a komínů s přehlednou nabídkou.",
    image: "/galery/portC-1.png",
    fallback: "/galery/portC-2.png",
    year: "2025",
    href: "/Portfolio/Projekt-no7",
    tone: "ember",
  },
  {
    number: "04",
    title: "Intertaz Plus",
    role: "UX/UI · Web design",
    description: "Firemní web pro logistické služby a mezinárodní přepravu zboží.",
    image: "/galery/port-1.png",
    fallback: "/galery/port-2.png",
    year: "2025",
    href: "/Portfolio/Projekt-no6",
    tone: "steel",
  },
  {
    number: "05",
    title: "Teach4Future",
    role: "Web design · Visual design",
    description: "Web vzdělávací platformy pro školy, lektory a neziskové organizace.",
    image: "/galery/portB-2.png",
    fallback: "/galery/portB-1.png",
    year: "2025",
    href: "/Portfolio/Projekt-no5",
    tone: "lime",
  },
];

const featuredProjects = [
  { ...digitalCallProject, number: "01", fallback: digitalCallProject.mobileImage, tone: "digital" },
  { ...lensProject, number: "02", fallback: lensProject.mobileImage, tone: "lens" },
];

const additionalProjects = stickyProjects.slice(1);

const capabilities = [
  {
    number: "01",
    title: "UX/UI návrh",
    text: "Wireframy, prototypy a rozhraní ve Figmě.",
  },
  {
    number: "02",
    title: "Design systémy",
    text: "Komponenty, typografie a pravidla pro konzistentní návrh.",
  },
  {
    number: "03",
    title: "Front-end",
    text: "Responzivní weby v Reactu a Next.js, včetně animací.",
  },
];

function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h13M11 5l5 5-5 5"} />
    </svg>
  );
}

function ProjectsIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="3" y="3" width="5" height="5" rx="1" />
      <rect x="12" y="3" width="5" height="5" rx="1" />
      <rect x="3" y="12" width="5" height="5" rx="1" />
      <rect x="12" y="12" width="5" height="5" rx="1" />
    </svg>
  );
}

function DocumentIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 2.5h6l4 4v11H5z" />
      <path d="M11 2.5v4h4M7.5 10h5M7.5 13h5" />
    </svg>
  );
}

function PreviewIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M2.5 10s2.8-4.5 7.5-4.5 7.5 4.5 7.5 4.5-2.8 4.5-7.5 4.5S2.5 10 2.5 10Z" />
      <circle cx="10" cy="10" r="2.2" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="3.2" />
      <path d="M10 1.8v2M10 16.2v2M1.8 10h2M16.2 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M16.6 12.8A7 7 0 0 1 7.2 3.4a7 7 0 1 0 9.4 9.4Z" />
    </svg>
  );
}

export function ThemeToggle({ theme, onToggle }) {
  return (
    <I18nElement as="button"
      className={styles.themeToggle}
      type="button"
      onClick={onToggle}
      aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}
      title="Light / dark mode"
    >
      <span className={theme === "light" ? styles.activeMode : ""}><SunIcon /></span>
      <span className={theme === "dark" ? styles.activeMode : ""}><MoonIcon /></span>
    </I18nElement>
  );
}

export function RedesignHeader({ theme = "light", onToggle = () => {}, compactOnScroll = false }) {
  const [isCompact, setIsCompact] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("");

  useEffect(() => {
    const updateAnchor = () => setActiveAnchor(window.location.hash);
    updateAnchor();
    window.addEventListener("hashchange", updateAnchor);
    return () => window.removeEventListener("hashchange", updateAnchor);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    if (!compactOnScroll) return undefined;

    const updateHeader = () => {
      const nextCompact = window.scrollY > 56;
      setIsCompact(nextCompact);
      if (!nextCompact) {
        setIsMenuOpen(false);
        setIsManuallyExpanded(false);
      }
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [compactOnScroll]);

  const showCompactHeader = isCompact && !isManuallyExpanded;

  return (
    <header className={`${styles.header} ${showCompactHeader ? styles.compactHeader : ""}`}>
      <I18nElement as="a" className={styles.brand} href="#top" aria-label="David Pešek – začátek stránky">
        <span className={styles.brandMark}><I18nText>DP</I18nText></span>
        <span className={styles.brandText}><I18nText>David Pešek</I18nText></span>
      </I18nElement>

      <I18nElement as="nav" className={styles.navigation} aria-label="Hlavní navigace">
        <I18nElement as="a" href="#work" aria-current={activeAnchor === "#work" ? "location" : undefined}><I18nText>Projekty</I18nText></I18nElement>
        <I18nElement as="a" href="#services" aria-current={activeAnchor === "#services" ? "location" : undefined}><I18nText>Dovednosti</I18nText></I18nElement>
        <I18nElement as="a" href="#about" aria-current={activeAnchor === "#about" ? "location" : undefined}><I18nText>O mně</I18nText></I18nElement>
      </I18nElement>

      <div className={styles.headerActions}>
        <LanguageToggle />
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <I18nElement as="a" className={styles.contactButton} href="/kontakt"><I18nText>Kontakt </I18nText><ArrowIcon diagonal />
        </I18nElement>
        {compactOnScroll && (
          <I18nElement as="button"
            className={styles.compactMenuButton}
            type="button"
            aria-label={isMenuOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </I18nElement>
        )}
      </div>

      {compactOnScroll && (
        <I18nElement as="button"
          className={styles.compactExpandArea}
          type="button"
          aria-label="Rozbalit celou navigaci"
          onClick={() => {
            setIsMenuOpen(false);
            setIsManuallyExpanded(true);
          }}
        />
      )}

      {compactOnScroll && (
        <I18nElement as="nav" className={`${styles.compactMenu} ${isMenuOpen ? styles.compactMenuOpen : ""}`} aria-label="Kompaktní navigace" aria-hidden={!isMenuOpen}>
          <I18nElement as="a" href="#work" aria-current={activeAnchor === "#work" ? "location" : undefined} onClick={() => setIsMenuOpen(false)}><I18nText>Projekty</I18nText></I18nElement>
          <I18nElement as="a" href="#services" aria-current={activeAnchor === "#services" ? "location" : undefined} onClick={() => setIsMenuOpen(false)}><I18nText>Dovednosti</I18nText></I18nElement>
          <I18nElement as="a" href="#about" aria-current={activeAnchor === "#about" ? "location" : undefined} onClick={() => setIsMenuOpen(false)}><I18nText>O mně</I18nText></I18nElement>
          <button className={styles.compactThemeAction} type="button" onClick={onToggle}>
            <I18nText>{theme === "light" ? "Tmavý režim" : "Světlý režim"}</I18nText>
          </button>
        </I18nElement>
      )}
    </header>
  );
}

export function RedesignHero({ viewportText = false }) {
  return (
    <section className={`${styles.hero} ${viewportText ? styles.heroViewportText : ""}`} id="top">
      <div className={styles.heroCopy}>
        <div className={styles.eyebrowRow}>
          <span className={styles.status}><i /><I18nText> K dispozici pro vybrané projekty</I18nText></span>
          <span><I18nText>Praha · CZ</I18nText></span>
        </div>

        <h1><I18nText>Digitální zážitky</I18nText><span><I18nText> s jasností a charakterem.</I18nText></span>
        </h1>

        <div className={styles.heroFooter}>
          <p><I18nText>Jsem UX/UI designér a front-end vývojář. Navrhuji čisté weby a produkty, které působí přirozeně, přesně a zapamatovatelně.</I18nText></p>
          <I18nElement as="a" className={styles.textLink} href="#work"><I18nText>Vybrané projekty </I18nText><ArrowIcon />
          </I18nElement>
        </div>
      </div>

      <I18nElement as="div" className={styles.heroVisual} aria-label="Ukázka vybraných projektů">
        <div className={styles.aurora} />
        <div className={styles.previewWindow}>
          <div className={styles.previewBar}>
            <div className={styles.windowDots}><i /><i /><i /></div>
            <span><I18nText>davidpesek.cz / selected-work</I18nText></span>
            <span className={styles.previewIndex}>01—03</span>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewIntro}>
              <span><I18nText>Selected work</I18nText></span>
              <strong><I18nText>Design, který funguje tiše a přesně.</I18nText></strong>
              <p><I18nText>UX · UI · CODE</I18nText></p>
            </div>
            <div className={styles.previewImage}>
              <I18nElement as="img" src="/galery/portC-1.png" alt="Náhled projektu BBB Krby" />
            </div>
            <div className={styles.previewMini}>
              <span><I18nText>Latest</I18nText></span>
              <strong><I18nText>Digital Call</I18nText></strong>
              <span><I18nText>Product / 2026</I18nText></span>
            </div>
          </div>
        </div>
        <div className={`${styles.floatingBadge} ${styles.badgeOne}`}><I18nText>UX / UI</I18nText></div>
        <div className={`${styles.floatingBadge} ${styles.badgeTwo}`}><I18nText>Next.js</I18nText></div>
      </I18nElement>
    </section>
  );
}

export function RedesignHeroMinimal() {
  return (
    <section className={styles.minimalHero} id="top">
      <div className={styles.minimalHeroPanel}>
        <div className={styles.minimalCopy}>
          <div className={styles.minimalTopline}>
            <span><I18nText>David Pešek</I18nText></span>
            <span className={styles.status}><i /><I18nText> Volná kapacita</I18nText></span>
          </div>

          <div className={styles.minimalMessage}>
            <span className={styles.minimalRole}><I18nText>UX/UI design · front-end</I18nText></span>
            <p className={styles.minimalTitle}><I18nText>Čisté digitální produkty.</I18nText></p>
            <p className={styles.minimalDescription}><I18nText>Od prvního směru po funkční web. Přehledně, citlivě a bez zbytečností.</I18nText></p>
            <div className={styles.minimalActions}>
              <I18nElement as="a" className={styles.minimalPrimary} href="#work"><I18nText>Projekty </I18nText><ArrowIcon /></I18nElement>
              <I18nElement as="a" className={styles.minimalSecondary} href="mailto:david.pesek.prg@gmail.com"><I18nText>Kontakt</I18nText></I18nElement>
            </div>
          </div>

          <div className={styles.minimalFootnote}>
            <span><I18nText>Praha · CZ</I18nText></span>
            <span><I18nText>Design / Code / Motion</I18nText></span>
          </div>
        </div>

        <div className={styles.minimalVisual}>
          <div className={styles.gridTexture} aria-hidden="true" />
          <div className={styles.gridCoordinate} aria-hidden="true">
            <span>01</span><span>02</span><span>03</span><span>04</span>
          </div>
          <div className={styles.minimalPreview}>
            <div className={styles.minimalPreviewBar}>
              <span><I18nText>Selected product / 2026</I18nText></span>
              <div><i /><i /><i /></div>
            </div>
            <I18nElement as="img" src={digitalCallProject.image} alt="Pracovní fronta projektu Digital Call" />
            <div className={styles.minimalPreviewCaption}>
              <div><span><I18nText>Case 08</I18nText></span><strong><I18nText>Digital Call</I18nText></strong></div>
              <span><I18nText>Product design</I18nText></span>
            </div>
          </div>
          <span className={styles.minimalVisualLabel}><I18nText>Selected work ↗</I18nText></span>
        </div>
      </div>
    </section>
  );
}

export function RedesignHeroElevatedGrid({ projectCarousel = false, edgeLabels = false }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const carouselProjects = edgeLabels ? featuredProjects : stickyProjects.slice(0, 3);
  const activeProject = carouselProjects[activeProjectIndex];

  useEffect(() => {
    if (!projectCarousel) return undefined;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let intervalId;
    const syncAutoplay = () => {
      window.clearInterval(intervalId);
      if (!reducedMotion.matches) {
        intervalId = window.setInterval(() => {
          setActiveProjectIndex((current) => (current + 1) % carouselProjects.length);
        }, 15000);
      }
    };
    syncAutoplay();
    reducedMotion.addEventListener("change", syncAutoplay);
    return () => {
      reducedMotion.removeEventListener("change", syncAutoplay);
      window.clearInterval(intervalId);
    };
  }, [projectCarousel, carouselProjects.length]);

  return (
    <section className={styles.elevatedHero} id="top">
      <div className={styles.elevatedHeroPanel}>
        <div className={styles.elevatedCopy}>
          {edgeLabels && <span className={styles.elevatedRole}><I18nText>UX/UI designér · Front-end</I18nText></span>}
          <div className={styles.elevatedMessage}>
            {!edgeLabels && <span className={styles.elevatedRole}><I18nText>UX/UI designér · front-end vývojář</I18nText></span>}
            <h1><I18nText>{edgeLabels ? "Navrhuju rozhraní a stavím je v kódu." : "Navrhuji digitální produkty s jasnou strukturou a vlastním charakterem."}</I18nText></h1>
            <p className={styles.elevatedSubtitle}><I18nText>{edgeLabels ? "Tvořím weby pro klienty a vlastní aplikace. V Digital Callu řeším práci s kontakty, v Lens čtení finančních dat." : "Propojuji UX/UI design s front-endem — od prvního konceptu po funkční prototyp."}</I18nText></p>
            <div className={styles.elevatedActions}>
              <I18nElement as="a" className={styles.elevatedPrimary} href="#work">
                <span className={styles.elevatedButtonFill} aria-hidden="true" />
                <span className={styles.elevatedButtonText}><I18nText>{edgeLabels ? "Projekty" : "Moje práce"}</I18nText></span>
                {projectCarousel ? <ProjectsIcon /> : <ArrowIcon />}
              </I18nElement>
              <I18nElement as="a" className={styles.elevatedSecondary} href="/Cv">
                <span className={styles.elevatedSecondaryText}><I18nText>CV</I18nText></span>
                <span className={styles.elevatedSecondaryIcon} aria-hidden="true">
                  {projectCarousel ? <DocumentIcon /> : <ArrowIcon diagonal />}
                </span>
              </I18nElement>
            </div>
          </div>

          <div className={styles.elevatedFooter}>
            <span className={styles.status}><i /><I18nText> Hledám novou pracovní příležitost</I18nText></span>
          </div>
        </div>

        <div className={styles.elevatedCanvas}>
          <div className={styles.referenceGrid} aria-hidden="true" />

          <div className={styles.elevatedComposition}>
            <div className={styles.elevatedProjectCard}>
              <div className={styles.elevatedCardHeader}>
                <div><i /><i /><i /></div>
              </div>
              {projectCarousel && (
                <I18nElement as="div" className={styles.elevatedProjectPagination} aria-label="Přepnout projekt">
                  {carouselProjects.map((project, index) => (
                    <I18nElement as="button"
                      key={project.title}
                      type="button"
                      className={index === activeProjectIndex ? styles.activeProjectIndicator : ""}
                      onClick={() => setActiveProjectIndex(index)}
                      aria-label={`Zobrazit projekt ${project.title}`}
                      aria-pressed={index === activeProjectIndex}
                    />
                  ))}
                </I18nElement>
              )}
              <div className={styles.elevatedScreen}>
                <I18nElement as="img"
                  key={projectCarousel ? activeProject.title : "Digital Call"}
                  className={projectCarousel ? styles.elevatedCarouselImage : ""}
                  src={projectCarousel ? activeProject.image : digitalCallProject.image}
                  alt={`Náhled projektu ${projectCarousel ? activeProject.title : "Digital Call"}`}
                />
              </div>
              <div className={styles.elevatedCardFooter}>
                <div><strong><I18nText>{projectCarousel ? activeProject.title : "Digital Call"}</I18nText></strong></div>
                <I18nElement as="a"
                  href={projectCarousel ? activeProject.href : digitalCallProject.href}
                  aria-label={`Otevřít projekt ${projectCarousel ? activeProject.title : "Digital Call"}`}
                >
                  {projectCarousel ? <PreviewIcon /> : <ArrowIcon diagonal />}
                </I18nElement>
              </div>
            </div>

            <div className={`${styles.elevatedUtilityCard} ${styles.utilityTop}`}>
              <strong><I18nText>Figma</I18nText><br /><I18nText>React</I18nText><br /><I18nText>Next.js</I18nText></strong>
            </div>

            <div className={`${styles.elevatedUtilityCard} ${styles.utilityBottom}`}>
              <div><i><I18nText>Fi</I18nText></i><i><I18nText>Re</I18nText></i><i><I18nText>Nx</I18nText></i></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StickyProjectCard({ project, featured = false, total = "05" }) {
  const [imageSrc, setImageSrc] = useState(project.image);

  return (
    <article className={styles.stickyProjectCard} data-tone={project.tone}>
      <I18nElement as="a"
        className={styles.stickyProjectLink}
        href={project.href}
        aria-label={`Otevřít projekt ${project.title}`}
      >
        <div className={styles.stickyProjectTop}>
          <span className={styles.stickyProjectIndex}><I18nText>{project.number}</I18nText> / <I18nText>{total}</I18nText></span>
          <span className={styles.stickyProjectRole}>
            <time dateTime={project.year}><I18nText>{project.year}</I18nText></time> · <I18nText>{project.role}</I18nText>
          </span>
        </div>

        <div className={styles.stickyProjectMedia}>
          <div className={styles.stickyProjectGrid} aria-hidden="true" />
          <I18nElement as="img"
            className={styles.stickyProjectImage}
            src={imageSrc}
            alt={`Náhled projektu ${project.title}`}
            loading={project.number === "01" ? "eager" : "lazy"}
            decoding="async"
            onError={() => {
              if (imageSrc !== project.fallback) setImageSrc(project.fallback);
            }}
          />
        </div>

        <div className={`${styles.stickyProjectBody} ${featured ? styles.featuredProjectBody : ""}`}>
          <div className={styles.stickyProjectTitleGroup}>
            {featured ? <><span className={styles.featuredProjectName}><I18nText>{project.title}</I18nText></span><h3 className={styles.featuredQuestion}><I18nText>{project.question}</I18nText></h3></> : <h3><I18nText>{project.title}</I18nText></h3>}
          </div>
          <p className={styles.stickyProjectDescription}><I18nText>{project.description}</I18nText></p>
          {featured ? <div className={styles.featuredProjectFooter}>
            {project.evidence?.length > 0 && <I18nElement as="ul" className={styles.featuredEvidence} aria-label="Témata projektu">{project.evidence.map((item) => <li key={item}><I18nText>{item}</I18nText></li>)}</I18nElement>}
            <span className={styles.featuredCta}><I18nText>Otevřít studii </I18nText><ArrowIcon diagonal /></span>
          </div> : <span className={styles.stickyProjectArrow} aria-hidden="true"><ArrowIcon diagonal /></span>}
        </div>
      </I18nElement>
    </article>
  );
}

export function RedesignStickyPortfolio({ featured = false, hasToolsSection = false }) {
  const technologies = ["Figma", "React", "Next.js", "GSAP", "SCSS", "Storybook"];

  return (
    <section className={styles.stickyPortfolio} id="work" aria-labelledby={featured ? "featured-projects-heading" : "sticky-portfolio-heading"}>
      <div className={styles.stickyPortfolioLayout}>
        <aside className={styles.profileRail}>
          <div className={styles.profileGrid} aria-hidden="true" />

          <div className={styles.profileIntro}>
            <span className={styles.profileLabel}><I18nText>Zkušenosti</I18nText></span>
            <h2 className={styles.profileLead} id="sticky-portfolio-heading">
              <I18nText>{featured ? "Weby pro klienty i vlastní aplikace." : "Návrh propojuji s realizací."}</I18nText>
            </h2>
            <div className={styles.profileCopy}>
              <p><I18nText>{featured ? "V Brightboxu jsem se podílel na návrhu a sestavení firemních webů a práci s design systémy. Digital Call a Lens jsou vlastní prototypy; v Typeface ukazuju svůj návrh vizuální identity." : "V Brightboxu jsem navrhoval firemní weby a design systémy a podílel se na jejich sestavení. Vlastní projekty mi dávají prostor ověřit návrhové volby ve funkčním prototypu."}</I18nText></p>
            </div>
          </div>

          <div className={styles.profileTechnologies} id={hasToolsSection ? undefined : "services"}>
            {featured ? <I18nElement as="a" className={styles.profileToolsLink} href="#services"><I18nText>Technologie a nástroje </I18nText><ArrowIcon /></I18nElement> : <>
              <span className={styles.technologyLabel}><I18nText>Dovednosti a nástroje</I18nText></span>
              <p className={styles.technologySummary}><I18nText>Struktura rozhraní, prototypy a responzivní front-end.</I18nText></p>
              <div className={styles.technologyList}>{technologies.map((technology) => <span key={technology}><I18nText>{technology}</I18nText></span>)}</div>
            </>}
          </div>

          <p className={styles.profileAvailability}><I18nText>Návrh · prototyp · implementace</I18nText></p>
        </aside>

        <I18nElement as="div" className={styles.stickyProjectList} aria-label={featured ? "Hlavní projekty" : "Vybrané projekty"}>
          {featured && <h2 className={styles.featuredListLabel} id="featured-projects-heading"><I18nText>Vybrané projekty</I18nText></h2>}
          {(featured ? featuredProjects : stickyProjects).map((project) => <StickyProjectCard key={project.title} project={project} featured={featured} total={featured ? "02" : "05"} />)}
          <I18nElement as="a" className={styles.stickyArchiveLink} href="/Portfolio"><I18nText>Zobrazit všechny projekty </I18nText><ArrowIcon diagonal />
          </I18nElement>
        </I18nElement>
      </div>
    </section>
  );
}

export function RedesignAdditionalProjects() {
  return (
    <section className={styles.additionalWork} aria-labelledby="additional-work-title">
      <div className={styles.additionalWorkHeading}>
        <span><I18nText>Další realizace</I18nText></span>
        <h2 id="additional-work-title"><I18nText>Weby a vizuální projekty.</I18nText></h2>
      </div>
      <I18nElement as="a" className={styles.commercialWork} href={keraNaturProject.href} aria-label="Otevřít projekt Kera Natur">
        <I18nElement as="img" src={keraNaturProject.image} alt="Úvodní stránka komerčního webu Kera Natur" width="1440" height="960" loading="lazy" />
        <div><span><I18nText>Komerční prezentační web · </I18nText><I18nText>{keraNaturProject.year}</I18nText></span><h3><I18nText>{keraNaturProject.title}</I18nText></h3><p><I18nText>{keraNaturProject.description}</I18nText></p><strong><I18nText>Prohlédnout projekt </I18nText><ArrowIcon diagonal /></strong></div>
      </I18nElement>
      <div className={styles.additionalWorkGrid}>
        {additionalProjects.map((project) => (
          <I18nElement as="a" href={project.href} key={project.title} className={styles.additionalWorkCard}>
            <I18nElement as="img" src={project.image} alt="" loading="lazy" />
            <div><span><I18nText>{project.role}</I18nText> · <I18nText>{project.year}</I18nText></span><h3><I18nText>{project.title}</I18nText></h3><p><I18nText>{project.description}</I18nText></p></div>
            <ArrowIcon diagonal />
          </I18nElement>
        ))}
      </div>
    </section>
  );
}

export function RedesignAboutMeText() {
  const toolGroups = [
    { title: "Návrh a vizuál", tools: ["Figma", "Photoshop", "Blender"] },
    { title: "Front-end", tools: ["React", "Next.js", "JavaScript", "TypeScript", "HTML", "CSS / SCSS"] },
    { title: "Interakce a komponenty", tools: ["GSAP", "Framer Motion", "Storybook"] },
    { title: "Verzování a nasazení", tools: ["Git", "GitHub", "Vercel"] },
  ];
  return (
    <section className={styles.aboutMeText} id="about" aria-labelledby="about-me-text-heading">
      <div className={styles.aboutMeTextInner}>
        <p className={styles.aboutMeTextLabel}><I18nText>O mně</I18nText></p>
        <div className={styles.aboutMeTextContent}>
          <h2 id="about-me-text-heading"><I18nText>Baví mě hledat řád ve složitých věcech.</I18nText></h2>
          <div className={styles.aboutMeIntro}>
            <p><I18nText>Zajímají mě digitální nástroje, ve kterých se potkává hodně informací, mnoho možných kroků a nejistota. Hledám pro ně strukturu, která člověku pomůže pochopit souvislosti, porovnat možnosti a rozhodnout se.</I18nText></p>
            <p><I18nText>Přemýšlím v návrhu i v kódu. Ve funkčních prototypech zkouším celé pracovní postupy, chybové stavy i návrat k rozdělané práci. Propojení UX/UI a front-endu mi umožňuje rozvíjet návrh přímo při jeho používání.</I18nText></p>
          </div>
          <I18nElement as="div" className={styles.aboutTechnologyGroups} id="services" role="group" aria-label="Technologie a nástroje, které používám">
            {toolGroups.map((group) => <I18nElement as="section" className={styles.aboutTechnologyGroup} key={group.title} aria-label={group.title}>
              <h3><I18nText>{group.title}</I18nText></h3>
              <ul>{group.tools.map((tool) => <li key={tool}><I18nText>{tool}</I18nText></li>)}</ul>
            </I18nElement>)}
          </I18nElement>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false }) {
  const [imageSrc, setImageSrc] = useState(project.image);

  return (
    <article className={`${styles.projectCard} ${featured ? styles.featuredProject : ""}`}>
      <I18nElement as="a" className={`${styles.projectVisual} ${styles[project.tone]}`} href={project.href}>
        <div className={styles.projectBrowser}>
          <div className={styles.projectBrowserBar}>
            <span><I18nText>{project.title}</I18nText></span>
            <i /><i /><i />
          </div>
          <I18nElement as="img"
            src={imageSrc}
            alt={`Náhled projektu ${project.title}`}
            onError={() => setImageSrc(project.fallback)}
          />
        </div>
        <span className={styles.openProject}><ArrowIcon diagonal /></span>
      </I18nElement>

      <div className={styles.projectInfo}>
        <div>
          <span className={styles.projectNumber}><I18nText>{project.number}</I18nText></span>
          <h3><I18nText>{project.title}</I18nText></h3>
        </div>
        <p><I18nText>{project.description}</I18nText></p>
        <div className={styles.projectMeta}>
          <div>{project.tags.map((tag) => <span key={tag}><I18nText>{tag}</I18nText></span>)}</div>
          <time><I18nText>{project.year}</I18nText></time>
        </div>
      </div>
    </article>
  );
}

export function RedesignWork() {
  return (
    <section className={styles.workSection} id="work">
      <div className={styles.sectionHeading}>
        <span className={styles.sectionLabel}><I18nText>01 / Projekty</I18nText></span>
        <h2><I18nText>Vybrané práce.</I18nText></h2>
        <p><I18nText>U každé ukazuju zadání, postup a výsledek.</I18nText></p>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} featured={index === 0} />
        ))}
      </div>

      <I18nElement as="a" className={styles.archiveLink} href="/Portfolio">
        <span><I18nText>Všechny projekty</I18nText></span>
        <span className={styles.archiveArrow}><ArrowIcon diagonal /></span>
      </I18nElement>
    </section>
  );
}

export function RedesignServices() {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.sectionHeading}>
        <span className={styles.sectionLabel}><I18nText>02 / Dovednosti</I18nText></span>
        <h2><I18nText>Co umím.</I18nText></h2>
      </div>

      <div className={styles.capabilityList}>
        {capabilities.map((item) => (
          <article key={item.number} className={styles.capabilityItem}>
            <span><I18nText>{item.number}</I18nText></span>
            <h3><I18nText>{item.title}</I18nText></h3>
            <p><I18nText>{item.text}</I18nText></p>
            <div className={styles.capabilityIcon}><ArrowIcon diagonal /></div>
          </article>
        ))}
      </div>

      <div className={styles.processCard}>
        <div className={styles.processTop}>
          <span><I18nText>Postup / 04 kroky</I18nText></span>
          <span><I18nText>Od zadání po hotový web</I18nText></span>
        </div>
        <ol className={styles.processSteps}>
          <li><span>01</span><I18nText> Zadání</I18nText></li>
          <li><span>02</span><I18nText> Wireframe</I18nText></li>
          <li><span>03</span><I18nText> Návrh</I18nText></li>
          <li><span>04</span><I18nText> Vývoj</I18nText></li>
        </ol>
      </div>
    </section>
  );
}

export function RedesignAbout() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutIntro}>
        <span className={styles.sectionLabel}><I18nText>03 / O mně</I18nText></span>
        <h2><I18nText>Jsem David.</I18nText></h2>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <p className={styles.aboutLead}><I18nText>V Brightboxu jsem pracoval na firemních webech a design systémech.</I18nText></p>
          <p><I18nText>Vedle toho dělám vlastní projekty v Reactu a Next.js. Teď hledám tým, kde tyhle zkušenosti využiju a budu se dál učit.</I18nText></p>
          <I18nElement as="a" className={styles.textLink} href="/Cv"><I18nText>Celé CV </I18nText><ArrowIcon />
          </I18nElement>
        </div>

        <div className={styles.statsGrid}>
          <div><strong>2024–25</strong><span><I18nText>UX/UI a vývoj webů · Brightbox</I18nText></span></div>
          <div><strong><I18nText>Figma</I18nText></strong><span><I18nText>návrhy a prototypy</I18nText></span></div>
          <div><strong><I18nText>Bc.</I18nText></strong><span><I18nText>Arts Management · VŠE</I18nText></span></div>
          <div className={styles.stackCard}>
            <span><I18nText>Pracuji s</I18nText></span>
            <div><i><I18nText>Fi</I18nText></i><i><I18nText>Re</I18nText></i><i><I18nText>Gs</I18nText></i><i><I18nText>Nx</I18nText></i></div>
            <p><I18nText>Figma · React · GSAP · Next.js</I18nText></p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function RedesignContact() {
  return (
    <footer className={styles.contactSection} id="contact">
      <div className={styles.contactGlow} />
      <div className={styles.contactTop}>
        <span className={styles.status}><i /><I18nText> Hledám novou pracovní příležitost</I18nText></span>
        <span><I18nText>Pardubice / Praha</I18nText></span>
      </div>
      <div className={styles.contactBody}>
        <span><I18nText>Kontakt</I18nText></span>
        <h2><I18nText>Můžeme si zavolat nebo se potkat.</I18nText></h2>
        <I18nElement as="a" href="mailto:david.pesek.prg@gmail.com"><I18nText>david.pesek.prg@gmail.com </I18nText><ArrowIcon diagonal />
        </I18nElement>
      </div>
      <div className={styles.contactBottom}>
        <div className={styles.brand}><span className={styles.brandMark}><I18nText>DP</I18nText></span><span className={styles.brandText}><I18nText>David Pešek</I18nText></span></div>
        <div><I18nElement as="a" href="#top"><I18nText>Nahoru ↑</I18nText></I18nElement><I18nElement as="a" href="/Cv"><I18nText>CV</I18nText></I18nElement><I18nElement as="a" href="/kontakt"><I18nText>Kontakt</I18nText></I18nElement></div>
        <span><I18nText>© 2026 · Praha</I18nText></span>
      </div>
    </footer>
  );
}

export default function RedesignHome({
  initialTheme = "light",
  only = "all",
  heroVariant = "standard",
  contentVariant = "standard",
}) {
  const [theme, toggleTheme] = usePortfolioTheme(initialTheme);
  const isAboutMeVersion =
    contentVariant === "sticky-portfolio-aboutme" ||
    contentVariant === "sticky-portfolio-aboutme-ch";
  const isAboutMeChVersion = contentVariant === "sticky-portfolio-aboutme-ch";

  useEffect(() => {
    if (only !== "all" && only !== "hero") return undefined;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis;
    const updateScrolling = () => {
      lenis?.destroy();
      lenis = undefined;
      if (reducedMotion.matches) return;

      lenis = new Lenis({
        autoRaf: true,
        smoothWheel: true,
        lerp: 0.09,
        wheelMultiplier: 1,
        syncTouch: false,
        anchors: { offset: -90 },
      });
    };

    updateScrolling();
    reducedMotion.addEventListener("change", updateScrolling);
    return () => {
      reducedMotion.removeEventListener("change", updateScrolling);
      lenis?.destroy();
    };
  }, [only]);

  const sections = {
    hero: <><RedesignHeader theme={theme} onToggle={toggleTheme} compactOnScroll={isAboutMeChVersion} />{heroVariant === "minimal-grid" ? <RedesignHeroMinimal /> : heroVariant === "elevated-grid" ? <RedesignHeroElevatedGrid projectCarousel={isAboutMeVersion} edgeLabels={isAboutMeChVersion} /> : <RedesignHero viewportText={heroVariant === "viewport"} />}</>,
    work: <RedesignWork />,
    stickyPortfolio: <RedesignStickyPortfolio />,
    services: <RedesignServices />,
    about: <RedesignAbout />,
    contact: <RedesignContact />,
  };

  return (
    <div
      className={`${styles.page} ${theme === "dark" ? styles.dark : styles.light} ${
        isAboutMeVersion ? styles.aboutMeVersion : ""
      } ${isAboutMeChVersion ? styles.aboutMeChVersion : ""}`}
      data-theme={theme}
    >
      <I18nText>{only === "all" ? (
        <>
          <RedesignHeader theme={theme} onToggle={toggleTheme} compactOnScroll={isAboutMeChVersion} />
          <main>
            {heroVariant === "minimal-grid" ? <RedesignHeroMinimal /> : heroVariant === "elevated-grid" ? <RedesignHeroElevatedGrid projectCarousel={isAboutMeVersion} edgeLabels={isAboutMeChVersion} /> : <RedesignHero viewportText={heroVariant === "viewport"} />}
            {contentVariant === "sticky-portfolio" || isAboutMeVersion ? (
              <>
                {isAboutMeVersion && <RedesignAboutMeText />}
                <RedesignStickyPortfolio featured={isAboutMeChVersion} hasToolsSection={isAboutMeVersion} />
                {isAboutMeChVersion && <><TypefaceFeature /><RedesignAdditionalProjects /></>}
              </>
            ) : (
              <>
                <RedesignWork />
                <RedesignServices />
                <RedesignAbout />
              </>
            )}
          </main>
          <RedesignContact />
        </>
      ) : sections[only]}</I18nText>
    </div>
  );
}
