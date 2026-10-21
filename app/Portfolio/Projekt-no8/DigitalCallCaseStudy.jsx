"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  chapterLinks,
  solutionSteps,
  testQuestions,
} from "./content";
import styles from "./DigitalCallCaseStudy.module.scss";
import usePortfolioTheme from "../../usePortfolioTheme";

gsap.registerPlugin(ScrollTrigger);

const DEMO_URL = "https://digital-call-module.vercel.app/";
const CODE_URL = "https://github.com/DP8778/digital_call_module";
const CURRENT_SOURCE = `${CODE_URL}/blob/b18dad5`;
const ORIGINAL_SOURCE = `${CODE_URL}/blob/0deaacd`;
const CHAPTER_ALIASES = { decisions: "solution", approach: "solution", validation: "scope-and-validation", next: "scope-and-validation" };

function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h13M11 5l5 5-5 5"} />
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

function ChapterHeading({ number, label, title }) {
  return (
    <header className={styles.chapterHeading} data-chapter-heading>
      <span className={styles.chapterKicker}>{number} / {label}</span>
      <h2>{title}</h2>
    </header>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.5 3.5h-4v4M3.5 3.5l5 5M12.5 16.5h4v-4M16.5 16.5l-5-5" />
    </svg>
  );
}

function Screenshot({ desktop, mobile, fullDesktop, fullMobile, desktopSize = [1440, 900], mobileSize = [390, 1200], fullDesktopSize, fullMobileSize, alt, eyebrow, caption, priority = false, className = "", onOpen }) {
  const openViewer = () => {
    const isMobile = window.matchMedia("(max-width: 620px)").matches;
    const [width, height] = isMobile ? (fullMobileSize || mobileSize) : (fullDesktopSize || desktopSize);
    onOpen({
      src: isMobile ? (fullMobile || mobile || fullDesktop || desktop) : (fullDesktop || desktop),
      alt,
      eyebrow,
      caption,
      width,
      height,
    });
  };

  return (
    <figure className={`${styles.screenshot} ${className}`}>
      <picture>
        {mobile ? <source media="(max-width: 620px)" srcSet={mobile} width={mobileSize[0]} height={mobileSize[1]} /> : null}
        <img src={desktop} alt={alt} width={desktopSize[0]} height={desktopSize[1]} loading={priority ? "eager" : "lazy"} decoding="async" />
      </picture>
      <figcaption>
        <div><span>{eyebrow}</span><p>{caption}</p></div>
        <button type="button" onClick={openViewer}>
          <ExpandIcon /> Zvětšit obrazovku
        </button>
      </figcaption>
    </figure>
  );
}

function ScreenshotViewer({ viewer, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !viewer) return undefined;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());

    const keepFocusInside = (event) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialog.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", keepFocusInside);
    return () => {
      dialog.removeEventListener("keydown", keepFocusInside);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [viewer]);

  if (!viewer) return null;

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-labelledby="screenshot-viewer-title"
      aria-describedby="screenshot-viewer-caption"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className={styles.lightboxPanel}>
        <header>
          <div>
            <span>{viewer.eyebrow}</span>
            <h2 id="screenshot-viewer-title">Detail obrazovky Digital Call</h2>
          </div>
          <button ref={closeRef} type="button" onClick={close} aria-label="Zavřít zvětšenou obrazovku">×</button>
        </header>
        <div className={styles.lightboxViewport} tabIndex="0" aria-label="Posouvatelný náhled obrazovky">
          <img
            src={viewer.src}
            alt={viewer.alt}
            width={viewer.width}
            height={viewer.height}
          />
        </div>
        <p id="screenshot-viewer-caption">{viewer.caption}</p>
      </div>
    </dialog>
  );
}

function createStoryPath(points) {
  if (points.length === 0) return "";
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const middle = previous.y + ((current.y - previous.y) / 2);
    const bend = Math.min(34, Math.max(18, (current.y - previous.y) / 8));
    path += ` L ${previous.x} ${middle - bend}`;
    path += ` C ${previous.x} ${middle}, ${current.x} ${middle}, ${current.x} ${middle + bend}`;
    path += ` L ${current.x} ${current.y}`;
  }

  return path;
}

function StoryLine({ rootRef }) {
  const lineRef = useRef(null);
  const [geometry, setGeometry] = useState({ width: 72, height: 1, offsetTop: 0, path: "", points: [] });

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return undefined;

    let frameId;
    let disposed = false;

    const measure = () => {
      frameId = undefined;
      if (disposed) return;
      const rootRect = root.getBoundingClientRect();
      const lineRect = line.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const width = mobile ? 18 : 72;
      const xPositions = mobile ? [9, 9, 9, 9] : [24, 48, 28, 48];
      const headings = Array.from(root.querySelectorAll("[data-story-chapter] [data-chapter-heading] h1, [data-story-chapter] [data-chapter-heading] h2"));
      const points = headings.map((heading, index) => {
        const rect = heading.getBoundingClientRect();
        return {
          x: xPositions[index] ?? xPositions[xPositions.length - 1],
          y: Math.round(rect.top - lineRect.top + (rect.height / 2)),
        };
      });
      const height = Math.max(1, Math.round(lineRect.height));
      const offsetTop = Math.round(lineRect.top - rootRect.top);
      const path = createStoryPath(points);

      setGeometry((current) => {
        const unchanged = current.width === width
          && current.height === height
          && current.offsetTop === offsetTop
          && current.path === path;
        return unchanged ? current : { width, height, offsetTop, path, points };
      });
    };

    const scheduleMeasure = () => {
      if (frameId !== undefined) return;
      frameId = window.requestAnimationFrame(measure);
    };

    const observer = new ResizeObserver(scheduleMeasure);
    observer.observe(root);
    root.querySelectorAll("[data-story-chapter] [data-chapter-heading]").forEach((heading) => observer.observe(heading));
    root.querySelectorAll("img").forEach((image) => {
      if (!image.complete) image.addEventListener("load", scheduleMeasure);
    });
    window.addEventListener("resize", scheduleMeasure, { passive: true });
    document.fonts?.addEventListener?.("loadingdone", scheduleMeasure);
    document.fonts?.ready.then(scheduleMeasure);
    scheduleMeasure();

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
      document.fonts?.removeEventListener?.("loadingdone", scheduleMeasure);
      root.querySelectorAll("img").forEach((image) => image.removeEventListener("load", scheduleMeasure));
      if (frameId !== undefined) window.cancelAnimationFrame(frameId);
    };
  }, [rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const path = line?.querySelector("[data-story-progress]");
    if (!root || !path || !geometry.path || geometry.points.length === 0) return undefined;

    const context = gsap.context(() => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(path, { strokeDashoffset: 0 });
        return;
      }

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: () => `top+=${geometry.offsetTop + geometry.points[0].y} 72%`,
          end: () => `top+=${geometry.offsetTop + geometry.points[geometry.points.length - 1].y} 55%`,
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
    }, line);

    return () => context.revert();
  }, [geometry, rootRef]);

  return (
    <div ref={lineRef} className={styles.storyLine} aria-hidden="true">
      <svg
        width={geometry.width}
        height={geometry.height}
        viewBox={`0 0 ${geometry.width} ${geometry.height}`}
        preserveAspectRatio="xMinYMin meet"
      >
        <path className={styles.storyLineGhost} d={geometry.path} />
        <path data-story-progress className={styles.storyLineProgress} d={geometry.path} />
        {geometry.points.map((point, index) => (
          <circle key={chapterLinks[index]?.id || index} cx={point.x} cy={point.y} r={geometry.width === 18 ? 4 : 5} />
        ))}
      </svg>
    </div>
  );
}

function ChapterNavigation() {
  const [activeChapter, setActiveChapter] = useState(chapterLinks[0].id);
  const scrollerRef = useRef(null);
  const itemRefs = useRef(new Map());

  useEffect(() => {
    const hashId = window.location.hash.slice(1);
    const selectHash = () => {
      const id = CHAPTER_ALIASES[window.location.hash.slice(1)] || window.location.hash.slice(1);
      if (chapterLinks.some((chapter) => chapter.id === id)) setActiveChapter(id);
    };
    if (hashId) selectHash();

    const sections = chapterLinks
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean);
    const states = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => states.set(entry.target.id, entry));
      const activeEntries = chapterLinks
        .map((chapter) => states.get(chapter.id))
        .filter((entry) => entry?.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - (window.innerHeight * 0.16))
          - Math.abs(b.boundingClientRect.top - (window.innerHeight * 0.16)));
      if (activeEntries[0]) setActiveChapter(activeEntries[0].target.id);
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", selectHash);
    return () => { observer.disconnect(); window.removeEventListener("hashchange", selectHash); };
  }, []);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const item = itemRefs.current.get(activeChapter);
    if (!scroller || !item) return;
    const left = item.offsetLeft - ((scroller.clientWidth - item.offsetWidth) / 2);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    scroller.scrollTo({ left: Math.max(0, left), behavior: reducedMotion ? "auto" : "smooth" });
  }, [activeChapter]);

  return (
    <nav className={styles.chapterNav} aria-label="Kapitoly case study">
      <div ref={scrollerRef}>
        {chapterLinks.map((chapter) => (
          <a
            key={chapter.id}
            ref={(node) => {
              if (node) itemRefs.current.set(chapter.id, node);
              else itemRefs.current.delete(chapter.id);
            }}
            href={`#${chapter.id}`}
            className={activeChapter === chapter.id ? styles.activeChapter : ""}
            aria-current={activeChapter === chapter.id ? "location" : undefined}
            onClick={() => setActiveChapter(chapter.id)}
          >
            <span>{chapter.number}</span>{chapter.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

function PrototypeWireframe() {
  return (
    <div className={styles.prototype} role="img" aria-label="Zjednodušené schéma dochovaného Kanbanu; nejde o skutečný screenshot">
      <div className={styles.prototypeTop}>
        <span>Dochovaný Kanban · schéma</span>
        <i>Nový kontakt</i>
      </div>
      <div className={styles.prototypeColumns}>
        {["Zásobník", "K provolání", "Volat později"].map((column, index) => (
          <div key={column}>
            <strong>{column}</strong>
            <span className={styles.prototypeCard}><i />Kontakt 0{index + 1}<small>Stav · termín</small></span>
            {index !== 2 ? <span className={styles.prototypeCard}><i />Kontakt 0{index + 4}<small>Stav · termín</small></span> : null}
          </div>
        ))}
      </div>
      <p>Zjednodušená rekonstrukce tří z více sloupců podle dochovaného kódu; nejde o screenshot ani přesnou podobu původního zadání.</p>
    </div>
  );
}

export default function DigitalCallCaseStudy() {
  const [theme, toggleTheme] = usePortfolioTheme();
  const [viewer, setViewer] = useState(null);
  const storyRef = useRef(null);
  const viewerOpenerRef = useRef(null);

  const openViewer = (data) => {
    viewerOpenerRef.current = document.activeElement;
    setViewer(data);
  };

  const closeViewer = () => {
    setViewer(null);
    window.requestAnimationFrame(() => viewerOpenerRef.current?.focus());
  };

  return (
    <div className={`${styles.page} ${styles.digitalCase} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
      <a className={styles.skipLink} href="#case-content">Přeskočit na obsah</a>

      <header className={styles.siteHeader}>
        <a className={styles.backLink} href="/#work" aria-label="Zpět na portfolio">
          <ArrowIcon />
          <span>Zpět na portfolio</span>
        </a>
        <span className={styles.projectLabel}>Case study · Digital Call</span>
        <div className={styles.headerActions}>
          <button
            className={styles.themeToggle}
            type="button"
            onClick={toggleTheme}
            aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}
          >
            <span className={theme === "light" ? styles.activeTheme : ""}><SunIcon /></span>
            <span className={theme === "dark" ? styles.activeTheme : ""}><MoonIcon /></span>
          </button>
          <a className={styles.headerDemo} href={DEMO_URL} target="_blank" rel="noreferrer">
            Starší demo <ArrowIcon diagonal />
          </a>
        </div>
      </header>

      <main id="case-content">
        <div className={styles.caseIdentity}>
          <div>
            <span>Digital Call · Product design · 2026</span>
            <p>Moje práce: návrh pracovního postupu, UI a front-end.</p>
          </div>
          <a href={DEMO_URL} target="_blank" rel="noreferrer">Otevřít starší veřejné demo <ArrowIcon diagonal /></a>
        </div>

        <section className={styles.caseIntro} aria-labelledby="page-title">
          <h1 id="page-title">Komu se ozvat teď — a jak navázat?</h1>
          <p>Digital Call je pracovní modul pro obvolávání realitních kontaktů. Spojuje nové kontakty, naplánované aktivity a historii komunikace, aby měl makléř při každém hovoru po ruce důvod kontaktování i další krok.</p>
          <p>Projekt vznikl rozvinutím pohovorového prototypu.</p>
        </section>

        <ChapterNavigation />

        <div className={styles.story} ref={storyRef}>
          <StoryLine rootRef={storyRef} />
          <div className={styles.storyContent}>
            <section className={styles.chapter} id="problem" data-story-chapter>
              <ChapterHeading number="01" label="Problém" title="Procesní stav ještě neurčuje dnešní práci." />
              <div className={styles.problemCompare}>
                <div className={styles.bodyCopy}>
                  <p>Původní Kanban ukazoval, v jaké fázi se kontakt nachází. Pro rozhodnutí, komu se věnovat právě teď, ale bylo potřeba spojit další informace: termín aktivity, poslední výsledek a plán pokračování.</p>
                  <p>Návrh jsem proto zaměřil na jeden každodenní průchod: vybrat kontakt, pochopit souvislosti a zaznamenat, co bude následovat.</p>
                </div>
                <PrototypeWireframe />
              </div>
            </section>

            <section className={styles.chapter} id="solution" data-story-chapter>
              <span className={styles.anchorAlias} id="decisions" aria-hidden="true" />
              <span className={styles.anchorAlias} id="approach" aria-hidden="true" />
              <ChapterHeading number="02" label="Řešení" title="Vybrat. Zorientovat se. Navázat." />
              <div className={styles.solutionSteps}>
                {solutionSteps.map((step) => (
                  <article className={styles.solutionStep} key={step.number}>
                    <div className={styles.stepCopy}>
                      <span>{step.number} / 03</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                    <Screenshot
                      desktop={step.desktop}
                      mobile={step.mobile}
                      desktopSize={[1440, 1000]}
                      mobileSize={[375, 812]}
                      alt={step.alt}
                      eyebrow={step.eyebrow}
                      caption={step.caption}
                      onOpen={openViewer}
                    />
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.chapter} id="data-and-rules" data-story-chapter>
              <ChapterHeading number="03" label="Data a pravidla" title="Priorita má čitelný důvod." />
              <div className={styles.dataGrid}>
                <article>
                  <span>Provozní údaje v aplikaci</span>
                  <p>Pracovní fronta vychází z procesního stavu, typu a termínu další aktivity. Pořadí naplánovaných aktivit určuje termín; původ kontaktu slouží také k filtrování. Historie doplňuje kontext a dokládá zaznamenané pokusy — není vstupem do skórovacího algoritmu.</p>
                </article>
                <article>
                  <span>Podklady návrhu</span>
                  <p>Vycházel jsem z rozboru dochovaného prototypu a jeho stavových pravidel. Syntetické scénáře umožnily projít nové kontakty, zmeškané hovory, schůzky i uzavřené případy. Nejde o data z reálného provozu ani o uživatelský výzkum.</p>
                </article>
              </div>
              <aside className={styles.sources} aria-labelledby="sources-title">
                <h3 id="sources-title">Podklady</h3>
                <p>Dochovaný <a href={`${ORIGINAL_SOURCE}/components/calling/useCallingBoardState.ts`} target="_blank" rel="noreferrer">kód původního Kanbanu ↗</a> dokládá pozorovaný výchozí stav, ne motivaci jeho autora. <a href={`${CURRENT_SOURCE}/artifacts/portfolio-handoff/evidence.md`} target="_blank" rel="noreferrer">Technická evidence ↗</a> a <a href={`${CURRENT_SOURCE}/components/calling/stateLogic.test.ts`} target="_blank" rel="noreferrer">stavové testy ↗</a> dokládají pravidla nového prototypu.</p>
                <p>Šest snímků výše vzniklo 17. 10. 2026 v lokálním produkčním buildu nad commitem <code>6beb07e</code> s tehdy necommitnutou opravou potvrzování, později zahrnutou v <a href={`${CODE_URL}/commit/b18dad5`} target="_blank" rel="noreferrer">b18dad5 ↗</a>. Používají syntetická data a čas 12. 10. 2026 13:00 Europe/Prague; přesný původ popisuje <a href={`${CURRENT_SOURCE}/artifacts/portfolio-handoff/capture-manifest.md`} target="_blank" rel="noreferrer">manifest snímků ↗</a>. Veřejné demo při kontrole 21. 10. 2026 stále ukazovalo starší podobu „Obvolávání“.</p>
              </aside>
            </section>

            <section className={styles.chapter} id="scope-and-validation" data-story-chapter>
              <span className={styles.anchorAlias} id="validation" aria-hidden="true" />
              <span className={styles.anchorAlias} id="next" aria-hidden="true" />
              <ChapterHeading number="04" label="Rozsah a ověření" title="Jeden pracovní postup dotažený do funkčního prototypu." />
              <div className={styles.scopeGrid}>
                <article>
                  <span>Co prototyp zahrnuje</span>
                  <p>Práci jednoho makléře s kontakty, evidenci výsledků a plánování dalších aktivit. Samotné volání, týmová spolupráce a celý prodej nemovitosti zůstávají mimo rozsah.</p>
                </article>
                <article>
                  <span>Co je a není ověřeno</span>
                  <p>Technické kontroly pokrývají stavové přechody, počítání pokusů a práci s termíny. Použitelnost s makléři zatím ověřená není; rychlost práce ani obchodní dopad z prototypu nevyvozuji.</p>
                </article>
              </div>
              <p className={styles.testIntro}>Další test má zodpovědět tři otázky:</p>
              <ol className={styles.testQuestions}>
                {testQuestions.map((question, index) => (
                  <li key={question}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{question}</h3>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.closingGrid} aria-hidden="true" />
          <span>Digital Call · 2026</span>
          <h2 id="closing-title">Od pracovní priority k porozumění datům.</h2>
          <p className={styles.closingBridge}>Digital Call pomáhá rozhodnout, komu se věnovat a jak pokračovat. V Lens se věnuji tomu, jak pochopit změnu a ověřit její vysvětlení.</p>
          <div className={styles.closingActions}>
            <a className={styles.primaryButton} href={DEMO_URL} target="_blank" rel="noreferrer">
              Vyzkoušet starší veřejné demo <ArrowIcon diagonal />
            </a>
            <a className={styles.secondaryButton} href="/Portfolio/Lens">
              Pokračovat na Lens <ArrowIcon />
            </a>
          </div>
          <footer>
            <a href="/#work">Zpět na hlavní stránku</a>
            <a href={CODE_URL} target="_blank" rel="noreferrer">Zdrojový kód ↗</a>
            <a href="/kontakt">Kontakt</a>
            <a href="#case-content">Nahoru ↑</a>
          </footer>
        </section>
      </main>
      <ScreenshotViewer viewer={viewer} onClose={closeViewer} />
    </div>
  );
}
