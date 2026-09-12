"use client";

import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
// Independent 03I fork; keep 03CH in RedesignHome.jsx as the backup.
import styles from "./RedesignHome03I.module.scss";

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
    number: "03",
    title: "Digital Call",
    description: "Prototyp interní aplikace pro správu kontaktů a obvolávání realitních klientů.",
    image: "/DSS1.png",
    fallback: "/DSS2.png",
    tags: ["Product design", "Prototype"],
    year: "2026",
    href: "/Portfolio/Projekt-no8",
    tone: "blue",
  },
];

const stickyProjects = [
  {
    number: "01",
    title: "Digital Call",
    role: "Product design · Prototyp",
    description: "Interaktivní prototyp modulu pro správu a obvolávání realitních kontaktů.",
    image: "/DSS1.png",
    fallback: "/DSS2.png",
    year: "2026",
    href: "/Portfolio/Projekt-no8",
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
        <a href="#work">Projekty</a>
        <a href="#services">Dovednosti</a>
        <a href="#about">O mně</a>
      </nav>

      <div className={styles.headerActions}>
        <ThemeToggle theme={theme} onToggle={onToggle} />
        <a className={styles.contactButton} href="mailto:david.pesek.prg@gmail.com">
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
        <nav className={`${styles.compactMenu} ${isMenuOpen ? styles.compactMenuOpen : ""}`} aria-label="Kompaktní navigace">
          <a href="#work" onClick={() => setIsMenuOpen(false)}>Projekty</a>
          <a href="#services" onClick={() => setIsMenuOpen(false)}>Dovednosti</a>
          <a href="#about" onClick={() => setIsMenuOpen(false)}>O mně</a>
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
            <img src="/DSS1.png" alt="Náhled produktového projektu Digital Call" />
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
  const carouselProjects = stickyProjects.slice(0, 3);
  const activeProject = carouselProjects[activeProjectIndex];

  useEffect(() => {
    if (!projectCarousel) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveProjectIndex((current) => (current + 1) % carouselProjects.length);
    }, 15000);

    return () => window.clearInterval(intervalId);
  }, [activeProjectIndex, projectCarousel, carouselProjects.length]);

  return (
    <section className={styles.elevatedHero} id="top">
      <div className={styles.elevatedHeroPanel}>
        <div className={styles.elevatedCopy}>
          {edgeLabels && <span className={styles.elevatedRole}>UX/UI designér · front-end vývojář</span>}
          <div className={styles.elevatedMessage}>
            {!edgeLabels && <span className={styles.elevatedRole}>UX/UI designér · front-end vývojář</span>}
            <h1>Zaměřuji se na UX/UI a grafický design.</h1>
            <h2>S pomocí AI tvořím UX i vizuální návrhy a převádím je do kódu.</h2>
            <div className={styles.elevatedActions}>
              <a className={styles.elevatedPrimary} href="#work">
                <span className={styles.elevatedButtonFill} aria-hidden="true" />
                <span className={styles.elevatedButtonText}>Moje práce</span>
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
                      aria-current={index === activeProjectIndex ? "true" : undefined}
                    />
                  ))}
                </div>
              )}
              <div className={styles.elevatedScreen}>
                <img
                  key={projectCarousel ? activeProject.title : "Digital Call"}
                  className={projectCarousel ? styles.elevatedCarouselImage : ""}
                  src={projectCarousel ? activeProject.image : "/DSS1.png"}
                  alt={`Náhled projektu ${projectCarousel ? activeProject.title : "Digital Call"}`}
                />
              </div>
              <div className={styles.elevatedCardFooter}>
                <div><strong>{projectCarousel ? activeProject.title : "Digital Call"}</strong></div>
                <a
                  href={projectCarousel ? activeProject.href : "/Portfolio/Projekt-no8"}
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

function StickyProjectCard({ project }) {
  const [imageSrc, setImageSrc] = useState(project.image);

  return (
    <article className={styles.stickyProjectCard} data-tone={project.tone}>
      <a
        className={styles.stickyProjectLink}
        href={project.href}
        aria-label={`Otevřít projekt ${project.title}`}
      >
        <div className={styles.stickyProjectTop}>
          <span className={styles.stickyProjectIndex}>{project.number} / 05</span>
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
          </div>
          <p className={styles.stickyProjectDescription}>{project.description}</p>
          <span className={styles.stickyProjectArrow} aria-hidden="true"><ArrowIcon diagonal /></span>
        </div>
      </a>
    </article>
  );
}

export function RedesignStickyPortfolio() {
  const technologies = ["Figma", "React", "Next.js", "GSAP", "SCSS", "Storybook"];

  return (
    <section className={styles.stickyPortfolio} id="work" aria-labelledby="sticky-portfolio-heading">
      <div className={styles.stickyPortfolioLayout}>
        <aside className={styles.profileRail}>
          <div className={styles.profileGrid} aria-hidden="true" />

          <div className={styles.profileIntro} id="about">
            <span className={styles.profileLabel}>O mně</span>
            <h2 className={styles.profileLead} id="sticky-portfolio-heading">
              Design převádím do funkčního rozhraní.
            </h2>
            <div className={styles.profileCopy}>
              <p>
                V Brightboxu jsem pracoval na firemních webech a design systémech. Teď hledám tým,
                ve kterém navážu na zkušenosti s UX/UI a front-endem.
              </p>
            </div>
          </div>

          <div className={styles.profileTechnologies} id="services">
            <span className={styles.technologyLabel}>Technologie</span>
            <div className={styles.technologyList}>
              {technologies.map((technology) => <span key={technology}>{technology}</span>)}
            </div>
          </div>

          <p className={styles.profileAvailability}>Hledám novou pracovní příležitost</p>
        </aside>

        <div className={styles.stickyProjectList} aria-label="Vybrané projekty">
          {stickyProjects.map((project) => <StickyProjectCard key={project.title} project={project} />)}
        </div>
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
            Navrhuji digitální produkty, které jsou srozumitelné, funkční a mají vlastní charakter.
          </h2>
          <div className={styles.aboutMeTextColumns}>
            <p>
              Jsem UX/UI designér a front-end vývojář. Propojuji vizuální návrh s praktickou
              znalostí toho, jak se rozhraní chová v reálném produktu a na různých obrazovkách.
            </p>
            <p>
              Od prvního směru přes prototyp až po výsledný web hledám jednoduchá řešení,
              která nepůsobí genericky a uživatele zbytečně nezdržují.
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
  const [theme, setTheme] = useState(initialTheme);
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

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  const sections = {
    hero: <><RedesignHeader theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} compactOnScroll={isAboutMeChVersion} />{heroVariant === "minimal-grid" ? <RedesignHeroMinimal /> : heroVariant === "elevated-grid" ? <RedesignHeroElevatedGrid projectCarousel={isAboutMeVersion} edgeLabels={isAboutMeChVersion} /> : <RedesignHero viewportText={heroVariant === "viewport"} />}</>,
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
          <RedesignHeader theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} compactOnScroll={isAboutMeChVersion} />
          <main>
            {heroVariant === "minimal-grid" ? <RedesignHeroMinimal /> : heroVariant === "elevated-grid" ? <RedesignHeroElevatedGrid projectCarousel={isAboutMeVersion} edgeLabels={isAboutMeChVersion} /> : <RedesignHero viewportText={heroVariant === "viewport"} />}
            {contentVariant === "sticky-portfolio" || isAboutMeVersion ? (
              <>
                {isAboutMeVersion && <RedesignAboutMeText />}
                <RedesignStickyPortfolio />
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
