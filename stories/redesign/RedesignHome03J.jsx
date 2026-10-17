"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import usePortfolioTheme from "../../app/usePortfolioTheme";
import { digitalCallProject } from "../../app/Portfolio/digitalCallProject";
import { lensProject } from "../../app/Portfolio/lensProject";
// Independent 03J fork; keep 03I as the previous design variant.
import styles from "./RedesignHome03J.module.scss";

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
    <button
      className={styles.themeToggle}
      type="button"
      onClick={onToggle}
      aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}
      title="Light / dark mode"
    >
      <span className={theme === "light" ? styles.activeMode : ""}><SunIcon /></span>
      <span className={theme === "dark" ? styles.activeMode : ""}><MoonIcon /></span>
    </button>
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
      <a className={styles.brand} href="#top" aria-label="David Pešek – začátek stránky">
        <span className={styles.brandMark}>DP</span>
        <span className={styles.brandText}>David Pešek</span>
      </a>

      <nav className={styles.navigation} aria-label="Hlavní navigace">
        <a href="#work" aria-current={activeAnchor === "#work" ? "location" : undefined}>Projekty</a>
        <a href="#services" aria-current={activeAnchor === "#services" ? "location" : undefined}>Dovednosti</a>
        <a href="#about" aria-current={activeAnchor === "#about" ? "location" : undefined}>O mně</a>
      </nav>

      <div className={styles.headerActions}>
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <a className={styles.contactButton} href="/kontakt">
          Kontakt <ArrowIcon diagonal />
        </a>
        {compactOnScroll && (
          <button
            className={styles.compactMenuButton}
            type="button"
            aria-label={isMenuOpen ? "Zavřít navigaci" : "Otevřít navigaci"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        )}
      </div>

      {compactOnScroll && (
        <button
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
        <nav className={`${styles.compactMenu} ${isMenuOpen ? styles.compactMenuOpen : ""}`} aria-label="Kompaktní navigace" aria-hidden={!isMenuOpen}>
          <a href="#work" aria-current={activeAnchor === "#work" ? "location" : undefined} onClick={() => setIsMenuOpen(false)}>Projekty</a>
          <a href="#services" aria-current={activeAnchor === "#services" ? "location" : undefined} onClick={() => setIsMenuOpen(false)}>Dovednosti</a>
          <a href="#about" aria-current={activeAnchor === "#about" ? "location" : undefined} onClick={() => setIsMenuOpen(false)}>O mně</a>
          <button className={styles.compactThemeAction} type="button" onClick={onToggle}>
            {theme === "light" ? "Tmavý režim" : "Světlý režim"}
          </button>
        </nav>
      )}
    </header>
  );
}

export function RedesignHero({ viewportText = false }) {
  return (
    <section className={`${styles.hero} ${viewportText ? styles.heroViewportText : ""}`} id="top">
      <div className={styles.heroCopy}>
        <div className={styles.eyebrowRow}>
          <span className={styles.status}><i /> K dispozici pro vybrané projekty</span>
          <span>Praha · CZ</span>
        </div>

        <h1>
          Digitální zážitky
          <span> s jasností a charakterem.</span>
        </h1>

        <div className={styles.heroFooter}>
          <p>
            Jsem UX/UI designér a front-end vývojář. Navrhuji čisté weby a produkty,
            které působí přirozeně, přesně a zapamatovatelně.
          </p>
          <a className={styles.textLink} href="#work">
            Vybrané projekty <ArrowIcon />
          </a>
        </div>
      </div>

      <div className={styles.heroVisual} aria-label="Ukázka vybraných projektů">
        <div className={styles.aurora} />
        <div className={styles.previewWindow}>
          <div className={styles.previewBar}>
            <div className={styles.windowDots}><i /><i /><i /></div>
            <span>davidpesek.cz / selected-work</span>
            <span className={styles.previewIndex}>01—03</span>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.previewIntro}>
              <span>Selected work</span>
              <strong>Design, který funguje tiše a přesně.</strong>
              <p>UX · UI · CODE</p>
            </div>
            <div className={styles.previewImage}>
              <img src="/galery/portC-1.png" alt="Náhled projektu BBB Krby" />
            </div>
            <div className={styles.previewMini}>
              <span>Latest</span>
              <strong>Digital Call</strong>
              <span>Product / 2026</span>
            </div>
          </div>
        </div>
        <div className={`${styles.floatingBadge} ${styles.badgeOne}`}>UX / UI</div>
        <div className={`${styles.floatingBadge} ${styles.badgeTwo}`}>Next.js</div>
      </div>
    </section>
  );
}

export function RedesignHeroMinimal() {
  return (
    <section className={styles.minimalHero} id="top">
      <div className={styles.minimalHeroPanel}>
        <div className={styles.minimalCopy}>
          <div className={styles.minimalTopline}>
            <span>David Pešek</span>
            <span className={styles.status}><i /> Volná kapacita</span>
          </div>

          <div className={styles.minimalMessage}>
            <span className={styles.minimalRole}>UX/UI design · front-end</span>
            <p className={styles.minimalTitle}>Čisté digitální produkty.</p>
            <p className={styles.minimalDescription}>
              Od prvního směru po funkční web. Přehledně, citlivě a bez zbytečností.
            </p>
            <div className={styles.minimalActions}>
              <a className={styles.minimalPrimary} href="#work">Projekty <ArrowIcon /></a>
              <a className={styles.minimalSecondary} href="mailto:david.pesek.prg@gmail.com">Kontakt</a>
            </div>
          </div>

          <div className={styles.minimalFootnote}>
            <span>Praha · CZ</span>
            <span>Design / Code / Motion</span>
          </div>
        </div>

        <div className={styles.minimalVisual}>
          <div className={styles.gridTexture} aria-hidden="true" />
          <div className={styles.gridCoordinate} aria-hidden="true">
            <span>01</span><span>02</span><span>03</span><span>04</span>
          </div>
          <div className={styles.minimalPreview}>
            <div className={styles.minimalPreviewBar}>
              <span>Selected product / 2026</span>
              <div><i /><i /><i /></div>
            </div>
            <img src={digitalCallProject.image} alt="Pracovní fronta projektu Digital Call" />
            <div className={styles.minimalPreviewCaption}>
              <div><span>Case 08</span><strong>Digital Call</strong></div>
              <span>Product design</span>
            </div>
          </div>
          <span className={styles.minimalVisualLabel}>Selected work ↗</span>
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
          {edgeLabels && <span className={styles.elevatedRole}>Product / UX/UI designer · Front-end</span>}
          <div className={styles.elevatedMessage}>
            {!edgeLabels && <span className={styles.elevatedRole}>UX/UI designér · front-end vývojář</span>}
            <h1>{edgeLabels ? "Navrhuju a stavím digitální nástroje, ve kterých se lidé mohou rozhodovat." : "Navrhuji digitální produkty s jasnou strukturou a vlastním charakterem."}</h1>
            <p className={styles.elevatedSubtitle}>{edgeLabels ? "Hledám UX/UI roli, kde můžu propojit návrh pracovních a datových nástrojů s funkčním front-endem." : "Propojuji UX/UI design s front-endem — od prvního konceptu po funkční prototyp."}</p>
            <div className={styles.elevatedActions}>
              <a className={styles.elevatedPrimary} href="#work">
                <span className={styles.elevatedButtonFill} aria-hidden="true" />
                <span className={styles.elevatedButtonText}>{edgeLabels ? "Prohlédnout případové studie" : "Moje práce"}</span>
                {projectCarousel ? <ProjectsIcon /> : <ArrowIcon />}
              </a>
              <a className={styles.elevatedSecondary} href="/Cv">
                <span className={styles.elevatedSecondaryText}>CV</span>
                <span className={styles.elevatedSecondaryIcon} aria-hidden="true">
                  {projectCarousel ? <DocumentIcon /> : <ArrowIcon diagonal />}
                </span>
              </a>
            </div>
          </div>

          <div className={styles.elevatedFooter}>
            <span className={styles.status}><i /> Hledám novou pracovní příležitost</span>
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
                <div className={styles.elevatedProjectPagination} aria-label="Přepnout projekt">
                  {carouselProjects.map((project, index) => (
                    <button
                      key={project.title}
                      type="button"
                      className={index === activeProjectIndex ? styles.activeProjectIndicator : ""}
                      onClick={() => setActiveProjectIndex(index)}
                      aria-label={`Zobrazit projekt ${project.title}`}
                      aria-pressed={index === activeProjectIndex}
                    />
                  ))}
                </div>
              )}
              <div className={styles.elevatedScreen}>
                <img
                  key={projectCarousel ? activeProject.title : "Digital Call"}
                  className={projectCarousel ? styles.elevatedCarouselImage : ""}
                  src={projectCarousel ? activeProject.image : digitalCallProject.image}
                  alt={`Náhled projektu ${projectCarousel ? activeProject.title : "Digital Call"}`}
                />
              </div>
              <div className={styles.elevatedCardFooter}>
                <div><strong>{projectCarousel ? activeProject.title : "Digital Call"}</strong></div>
                <a
                  href={projectCarousel ? activeProject.href : digitalCallProject.href}
                  aria-label={`Otevřít projekt ${projectCarousel ? activeProject.title : "Digital Call"}`}
                >
                  {projectCarousel ? <PreviewIcon /> : <ArrowIcon diagonal />}
                </a>
              </div>
            </div>

            <div className={`${styles.elevatedUtilityCard} ${styles.utilityTop}`}>
              <strong>Figma<br />React<br />Next.js</strong>
            </div>

            <div className={`${styles.elevatedUtilityCard} ${styles.utilityBottom}`}>
              <div><i>Fi</i><i>Re</i><i>Nx</i></div>
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
      <a
        className={styles.stickyProjectLink}
        href={project.href}
        aria-label={`Otevřít projekt ${project.title}`}
      >
        <div className={styles.stickyProjectTop}>
          <span className={styles.stickyProjectIndex}>{project.number} / {total}</span>
          <span className={styles.stickyProjectRole}>
            <time dateTime={project.year}>{project.year}</time> · {project.role}
          </span>
        </div>

        <div className={styles.stickyProjectMedia}>
          <div className={styles.stickyProjectGrid} aria-hidden="true" />
          <img
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

        <div className={styles.stickyProjectBody}>
          <div className={styles.stickyProjectTitleGroup}>
            <h3>{project.title}</h3>
            {featured && <strong className={styles.featuredQuestion}>{project.question}</strong>}
          </div>
          <div className={styles.featuredSummary}>
            <p className={styles.stickyProjectDescription}>{project.description}</p>
            {featured && <ul className={styles.featuredEvidence}>{project.evidence.map((item) => <li key={item}>{item}</li>)}</ul>}
            {featured && <span className={styles.featuredCta}>Otevřít případovou studii</span>}
          </div>
          <span className={styles.stickyProjectArrow} aria-hidden="true"><ArrowIcon diagonal /></span>
        </div>
      </a>
    </article>
  );
}

export function RedesignStickyPortfolio({ featured = false }) {
  const technologies = ["Figma", "React", "Next.js", "GSAP", "SCSS", "Storybook"];

  return (
    <section className={styles.stickyPortfolio} id="work" aria-labelledby={featured ? "featured-projects-heading" : "sticky-portfolio-heading"}>
      <div className={styles.stickyPortfolioLayout}>
        <aside className={styles.profileRail}>
          <div className={styles.profileGrid} aria-hidden="true" />

          <div className={styles.profileIntro}>
            <span className={styles.profileLabel}>Zkušenosti</span>
            <h2 className={styles.profileLead} id="sticky-portfolio-heading">
              Návrh propojuji s realizací.
            </h2>
            <div className={styles.profileCopy}>
              <p>{featured ? "V Brightboxu jsem navrhoval firemní weby a design systémy. V Digital Callu a Lens jsem pak navrhl vlastní produktové workflow, interakce i responzivní rozhraní a převedl je do funkčního front-endu." : "V Brightboxu jsem navrhoval firemní weby a design systémy a podílel se na jejich sestavení. Vlastní projekty mi dávají prostor ověřit návrhové volby ve funkčním prototypu."}</p>
            </div>
          </div>

          <div className={styles.profileTechnologies} id="services">
            <span className={styles.technologyLabel}>Dovednosti a nástroje</span>
            <p className={styles.technologySummary}>Struktura rozhraní, prototypy a responzivní front-end.</p>
            <div className={styles.technologyList}>
              {technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>

          <p className={styles.profileAvailability}>Návrh · prototyp · implementace</p>
        </aside>

        <div className={styles.stickyProjectList} aria-label={featured ? "Hlavní případové studie" : "Vybrané projekty"}>
          {featured && <h2 className={styles.featuredListLabel} id="featured-projects-heading">Vybrané případové studie</h2>}
          {(featured ? featuredProjects : stickyProjects).map((project) => <StickyProjectCard key={project.title} project={project} featured={featured} total={featured ? "02" : "05"} />)}
          <a className={styles.stickyArchiveLink} href="/Portfolio">
            Zobrazit všechny projekty <ArrowIcon diagonal />
          </a>
        </div>
      </div>
    </section>
  );
}

export function RedesignAdditionalProjects() {
  return (
    <section className={styles.additionalWork} aria-labelledby="additional-work-title">
      <div className={styles.additionalWorkHeading}>
        <span>Další realizace</span>
        <h2 id="additional-work-title">Weby a vizuální projekty.</h2>
      </div>
      <div className={styles.additionalWorkGrid}>
        {additionalProjects.map((project) => (
          <a href={project.href} key={project.title} className={styles.additionalWorkCard}>
            <img src={project.image} alt="" loading="lazy" />
            <div><span>{project.role} · {project.year}</span><h3>{project.title}</h3><p>{project.description}</p></div>
            <ArrowIcon diagonal />
          </a>
        ))}
      </div>
    </section>
  );
}

export function RedesignAboutMeText() {
  return (
    <section className={styles.aboutMeText} id="about" aria-labelledby="about-me-text-heading">
      <div className={styles.aboutMeTextInner}>
        <p className={styles.aboutMeTextLabel}>O mně</p>
        <div className={styles.aboutMeTextContent}>
          <h2 id="about-me-text-heading">
            Od návrhu obrazovek k tomu, jak se s nimi skutečně pracuje.
          </h2>
          <div className={styles.aboutMeTextColumns}>
            <p>
              Začínám otázkou, jaké rozhodnutí má rozhraní usnadnit. Ve Figmě skládám informace
              do srozumitelného toku a hledám, kde člověk potřebuje více kontextu.
            </p>
            <p>
              Návrh pak zkouším v Reactu a Next.js: na malé obrazovce, při chybě i při návratu
              k rozdělané práci. Implementace mi pomáhá odhalit místa, která statický návrh neukáže.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, featured = false }) {
  const [imageSrc, setImageSrc] = useState(project.image);

  return (
    <article className={`${styles.projectCard} ${featured ? styles.featuredProject : ""}`}>
      <a className={`${styles.projectVisual} ${styles[project.tone]}`} href={project.href}>
        <div className={styles.projectBrowser}>
          <div className={styles.projectBrowserBar}>
            <span>{project.title}</span>
            <i /><i /><i />
          </div>
          <img
            src={imageSrc}
            alt={`Náhled projektu ${project.title}`}
            onError={() => setImageSrc(project.fallback)}
          />
        </div>
        <span className={styles.openProject}><ArrowIcon diagonal /></span>
      </a>

      <div className={styles.projectInfo}>
        <div>
          <span className={styles.projectNumber}>{project.number}</span>
          <h3>{project.title}</h3>
        </div>
        <p>{project.description}</p>
        <div className={styles.projectMeta}>
          <div>{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <time>{project.year}</time>
        </div>
      </div>
    </article>
  );
}

export function RedesignWork() {
  return (
    <section className={styles.workSection} id="work">
      <div className={styles.sectionHeading}>
        <span className={styles.sectionLabel}>01 / Projekty</span>
        <h2>Vybrané práce.</h2>
        <p>U každé ukazuju zadání, postup a výsledek.</p>
      </div>

      <div className={styles.projectGrid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} featured={index === 0} />
        ))}
      </div>

      <a className={styles.archiveLink} href="/Portfolio">
        <span>Všechny projekty</span>
        <span className={styles.archiveArrow}><ArrowIcon diagonal /></span>
      </a>
    </section>
  );
}

export function RedesignServices() {
  return (
    <section className={styles.servicesSection} id="services">
      <div className={styles.sectionHeading}>
        <span className={styles.sectionLabel}>02 / Dovednosti</span>
        <h2>Co umím.</h2>
      </div>

      <div className={styles.capabilityList}>
        {capabilities.map((item) => (
          <article key={item.number} className={styles.capabilityItem}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className={styles.capabilityIcon}><ArrowIcon diagonal /></div>
          </article>
        ))}
      </div>

      <div className={styles.processCard}>
        <div className={styles.processTop}>
          <span>Postup / 04 kroky</span>
          <span>Od zadání po hotový web</span>
        </div>
        <ol className={styles.processSteps}>
          <li><span>01</span> Zadání</li>
          <li><span>02</span> Wireframe</li>
          <li><span>03</span> Návrh</li>
          <li><span>04</span> Vývoj</li>
        </ol>
      </div>
    </section>
  );
}

export function RedesignAbout() {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutIntro}>
        <span className={styles.sectionLabel}>03 / O mně</span>
        <h2>Jsem David.</h2>
      </div>

      <div className={styles.aboutContent}>
        <div className={styles.aboutText}>
          <p className={styles.aboutLead}>
            V Brightboxu jsem pracoval na firemních webech a design systémech.
          </p>
          <p>
            Vedle toho dělám vlastní projekty v Reactu a Next.js. Teď hledám tým,
            kde tyhle zkušenosti využiju a budu se dál učit.
          </p>
          <a className={styles.textLink} href="/Cv">
            Celé CV <ArrowIcon />
          </a>
        </div>

        <div className={styles.statsGrid}>
          <div><strong>2024–25</strong><span>UX/UI a vývoj webů · Brightbox</span></div>
          <div><strong>Figma</strong><span>návrhy a prototypy</span></div>
          <div><strong>Bc.</strong><span>Arts Management · VŠE</span></div>
          <div className={styles.stackCard}>
            <span>Pracuji s</span>
            <div><i>Fi</i><i>Re</i><i>Gs</i><i>Nx</i></div>
            <p>Figma · React · GSAP · Next.js</p>
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
        <span className={styles.status}><i /> Hledám novou pracovní příležitost</span>
        <span>Pardubice / Praha</span>
      </div>
      <div className={styles.contactBody}>
        <span>Kontakt</span>
        <h2>Můžeme si zavolat nebo se potkat.</h2>
        <a href="mailto:david.pesek.prg@gmail.com">
          david.pesek.prg@gmail.com <ArrowIcon diagonal />
        </a>
      </div>
      <div className={styles.contactBottom}>
        <div className={styles.brand}><span className={styles.brandMark}>DP</span><span className={styles.brandText}>David Pešek</span></div>
        <div><a href="#top">Nahoru ↑</a><a href="/Cv">CV</a><a href="/kontakt">Kontakt</a></div>
        <span>© 2026 · Praha</span>
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
      {only === "all" ? (
        <>
          <RedesignHeader theme={theme} onToggle={toggleTheme} compactOnScroll={isAboutMeChVersion} />
          <main>
            {heroVariant === "minimal-grid" ? <RedesignHeroMinimal /> : heroVariant === "elevated-grid" ? <RedesignHeroElevatedGrid projectCarousel={isAboutMeVersion} edgeLabels={isAboutMeChVersion} /> : <RedesignHero viewportText={heroVariant === "viewport"} />}
            {contentVariant === "sticky-portfolio" || isAboutMeVersion ? (
              <>
                {isAboutMeVersion && <RedesignAboutMeText />}
                <RedesignStickyPortfolio featured={isAboutMeChVersion} />
                {isAboutMeChVersion && <RedesignAdditionalProjects />}
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
      ) : sections[only]}
    </div>
  );
}
