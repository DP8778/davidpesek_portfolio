"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  chapterLinks,
  modelContacts,
  solutionSteps,
} from "./content";
import styles from "./DigitalCallCaseStudy.module.scss";
import ProjectHeader from "../components/ProjectHeader";
import usePortfolioTheme from "../../usePortfolioTheme";

gsap.registerPlugin(ScrollTrigger);

const DEMO_URL = "https://digital-call-module.vercel.app/";
const CODE_URL = "https://github.com/DP8778/digital_call_module";
const CURRENT_SOURCE = `${CODE_URL}/blob/7b1b344`;
const ORIGINAL_SOURCE = `${CODE_URL}/blob/0deaacd`;
const CAPTURE_NOTES_URL = "https://github.com/DP8778/davidpesek_portfolio/blob/main/app/Portfolio/Projekt-no8/CAPTURE_NOTES.md";
const CHAPTER_ALIASES = { decisions: "solution", approach: "solution", "data-and-rules": "scope-and-validation", validation: "scope-and-validation", next: "scope-and-validation" };

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
    <figure className={styles.prototype}>
      <div className={styles.prototypeTop}>
        <span>Schéma původního uspořádání</span>
        <i>Procesní pohled</i>
      </div>
      <div className={styles.prototypeColumns}>
        {[modelContacts[2], modelContacts[0], modelContacts[1]].map((contact) => (
          <div key={contact.name}>
            <strong>{contact.status}</strong>
            <span className={styles.prototypeCard}><i />{contact.name}<small>{contact.activity}</small></span>
          </div>
        ))}
      </div>
      <figcaption>Rekonstrukce podle původního kódu se syntetickými kontakty. Schéma není původní screenshot ani zadání.</figcaption>
    </figure>
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

      <ProjectHeader title="Digital Call" theme={theme} onToggle={toggleTheme} demoUrl={DEMO_URL} demoLabel="Otevřít demo" />

      <main id="case-content">
        <div className={styles.caseIdentity}>
          <div>
            <span>Digital Call · Product design · 2026</span>
            <p>Moje práce: návrh pracovního postupu, UI a front-end.</p>
          </div>
          <a href={DEMO_URL} target="_blank" rel="noreferrer">Otevřít pracovní demo <ArrowIcon diagonal /></a>
        </div>

        <section className={styles.caseIntro} aria-labelledby="page-title">
          <h1 id="page-title">Komu se věnovat teď — a jak navázat?</h1>
          <p>Z pohovorového zadání na kanban pro makléře jsem rozvinul pracovní prototyp. Navrhl jsem frontu úkolů, detail kontaktu a záznam výsledku hovoru tak, aby na sebe navazovaly.</p>
        </section>

        <ChapterNavigation />

        <div className={styles.story} ref={storyRef}>
          <StoryLine rootRef={storyRef} />
          <div className={styles.storyContent}>
            <section className={styles.chapter} id="problem" data-story-chapter>
              <ChapterHeading number="01" label="Situace" title="Procesní stav sám neříká, co řešit teď." />
              <div className={styles.modelIntro}>
                <span>Modelový pracovní scénář · syntetická data · 12. 10. 2026 ve 13:00</span>
                <p>Anna má prošlý termín, Petr má hovor naplánovaný na 14:00 a Jana nemá určenou další aktivitu. Naléhavost ale ještě neříká, zda je vhodné právě teď volat.</p>
              </div>
              <PrototypeWireframe />
              <div className={styles.comparisonBridge}>
                <span>Od stavu k práci</span>
                <p>Kanban ukazuje fázi kontaktu. Pracovní fronta přidává čas: Anna vyžaduje pozornost, Petr má termín teprve před sebou.</p>
              </div>
              <div className={styles.queueDesktopEvidence}>
                <Screenshot
                  desktop="/digital-call/story-queue-desktop.png"
                  desktopSize={[1440, 1000]}
                  alt="Skutečná pracovní fronta ve 13:00: Anna mezi zmeškanými, Petr mezi dnešními budoucími hovory"
                  eyebrow="A · Pracovní fronta"
                  caption="Ve 13:00 je Anna mezi prošlými úkoly; Petr má hovor naplánovaný na 14:00. Jana bez termínu zůstává v Nových kontaktech."
                  priority
                  className={styles.queueComparison}
                  onOpen={openViewer}
                />
              </div>
              <div className={styles.queueMobileEvidence} aria-label="Dva autentické výřezy téže pracovní fronty ve 13:00">
                <Screenshot desktop="/digital-call/story-queue-anna-mobile.png" desktopSize={[343, 154]} alt="Řádek Anny Novotné: zmeškaný hovor z 11. října v 16:00" eyebrow="Zmeškané · Anna" caption="Termín už uplynul. Kontakt vyžaduje rozhodnutí o dalším kroku." onOpen={openViewer} />
                <Screenshot desktop="/digital-call/story-queue-petr-mobile.png" desktopSize={[343, 153]} alt="Řádek Petra Dvořáka: dnešní hovor ve 14:00" eyebrow="Dnes · Petr" caption="Ve 13:00 jde o budoucí termín, nikoli prošlý úkol." onOpen={openViewer} />
              </div>
              <div className={styles.designDecision}>
                <span>A / Pracovní priorita napříč stavy</span>
                <p>Fronta odděluje prošlé úkoly od pozdějších. Makléř proto nejprve otevře Annu, ale vhodný čas hovoru určí až z jejího kontextu. Kompromis: pro celkovou fázi případu se stále vrací do Kanbanu.</p>
              </div>
            </section>

            <section className={styles.chapter} id="solution" data-story-chapter>
              <span className={styles.anchorAlias} id="decisions" aria-hidden="true" />
              <span className={styles.anchorAlias} id="approach" aria-hidden="true" />
              <ChapterHeading number="02" label="Pracovní průchod" title="Anna: pozornost teď, hovor později." />
              <ol className={styles.scenarioTimeline} aria-label="Časová návaznost modelového průchodu">
                <li><time dateTime="2026-10-12T13:00:00+02:00">13:00</time><span>Makléř přečte poznámku a posune termín na 15:30. Pokus nepřibývá.</span></li>
                <li><time dateTime="2026-10-12T15:35:00+02:00">15:35</time><span>Po modelovém hovoru zaznamená „Nedovoláno“.</span></li>
                <li><time dateTime="2026-10-13T16:00:00+02:00">Další den 16:00</time><span>Makléř sám vybere další hovor na 13. 10. v 16:00.</span></li>
              </ol>
              <div className={styles.solutionSteps}>
                {solutionSteps.map((step) => (
                  <article className={`${styles.solutionStep} ${step.number === "B" ? styles.contextStep : styles.outcomeStep}`} key={step.number}>
                    <div className={styles.stepCopy}>
                      <span>Rozhodnutí {step.number} / 03</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                      <dl>
                        <div><dt>Proč takto</dt><dd>{step.rationale}</dd></div>
                        <div><dt>Kompromis</dt><dd>{step.tradeoff}</dd></div>
                      </dl>
                    </div>
                    {step.number === "B" ? (
                      <Screenshot desktop={step.desktop} mobile={step.mobile} desktopSize={step.desktopSize} mobileSize={step.mobileSize} alt={step.alt} eyebrow={step.eyebrow} caption={step.caption} className={styles.contextScreen} onOpen={openViewer} />
                    ) : (
                      <div className={styles.outcomeEvidence}>
                        <Screenshot desktop="/digital-call/story-outcome-desktop-top.png" mobile="/digital-call/story-outcome-mobile-top.png" desktopSize={[512, 275]} mobileSize={[375, 265]} alt="Formulář Anny Novotné po modelovém hovoru s vybraným výsledkem Nedovoláno" eyebrow="C · Výsledek" caption="Výsledek zaznamenává makléř až po modelovém pokusu v 15:35." onOpen={openViewer} />
                        <Screenshot desktop="/digital-call/story-outcome-desktop-confirm.png" mobile="/digital-call/story-outcome-mobile-confirm.png" desktopSize={[512, 515]} mobileSize={[375, 534]} alt="Vlastní další termín 13. října v 16:00 a dostupné tlačítko Uložit výsledek" eyebrow="C · Další termín" caption="Makléř vybírá vlastní čas; po uložení vznikne nový pokus a aktivita." onOpen={openViewer} />
                      </div>
                    )}
                    {step.number === "C" ? <Screenshot desktop="/digital-call/story-confirmation-desktop.png" mobile="/digital-call/story-confirmation-mobile.png" desktopSize={[896, 385]} mobileSize={[375, 420]} alt="Potvrzení přijatého výsledku Nedovoláno, stavu Volat později a dalšího hovoru 13. října v 16:00" eyebrow="Po potvrzení" caption="Po uložení má Anna výsledek Nedovoláno, stav Volat později a další hovor 13. 10. v 16:00." className={styles.confirmationScreen} onOpen={openViewer} /> : null}
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.chapter} id="scope-and-validation" data-story-chapter>
              <span className={styles.anchorAlias} id="data-and-rules" aria-hidden="true" />
              <span className={styles.anchorAlias} id="validation" aria-hidden="true" />
              <span className={styles.anchorAlias} id="next" aria-hidden="true" />
              <ChapterHeading number="03" label="Rozsah a ověření" title="Co je ověřené a co potřebuju zjistit." />
              <div className={styles.scopeGrid}>
                <article>
                  <span>Rozsah a data</span>
                  <p>Demo používá syntetické kontakty a ukládá stav v prohlížeči. Pokrývá práci jednoho makléře od výběru kontaktu po další aktivitu; skutečné hovory ani týmový provoz neřeší.</p>
                </article>
                <article>
                  <span>Co víme</span>
                  <p>Testy a průchody aplikací ověřily frontu, historii, počítání pokusů a ukládání výsledku. S makléři jsem použitelnost zatím netestoval.</p>
                </article>
              </div>
              <p className={styles.validationQuestion}>S makléři chci ověřit, zda z těchto tří kontaktů vyberou ten, který potřebuje pozornost, a najdou dost informací pro další krok.</p>
              <details className={styles.evidenceDisclosure}>
                <summary>Podklady a technické ověření</summary>
                <div>
                  <p>Dochovaný <a href={`${ORIGINAL_SOURCE}/components/calling/useCallingBoardState.ts`} target="_blank" rel="noreferrer">kód původního Kanbanu ↗</a> dokládá výchozí uspořádání, nikoli motivaci autora. <a href={`${CURRENT_SOURCE}/artifacts/portfolio-handoff/evidence.md`} target="_blank" rel="noreferrer">Technická evidence ↗</a>, <a href={`${CURRENT_SOURCE}/components/calling/queueLogic.test.ts`} target="_blank" rel="noreferrer">testy fronty ↗</a> a <a href={`${CURRENT_SOURCE}/components/calling/stateLogic.test.ts`} target="_blank" rel="noreferrer">stavové testy ↗</a> dokládají pravidla nového prototypu.</p>
                  <p>Snímky této studie vznikly 23. 10. 2026 z lokálního produkčního buildu commitu <a href={`${CODE_URL}/commit/7b1b344`} target="_blank" rel="noreferrer">7b1b344 ↗</a>. Fronta a detail používají 12. 10. 2026 13:00 Europe/Prague; formulář a potvrzení 15:35 téhož dne. Jde o syntetická data a řízený čas pouze v prohlížeči. <a href="/digital-call/story-schedule-mobile.png" target="_blank" rel="noreferrer">Formulář změny termínu ↗</a>, <a href={`${CURRENT_SOURCE}/components/calling/stateLogic.ts`} target="_blank" rel="noreferrer">stavová pravidla ↗</a> a <a href={CAPTURE_NOTES_URL} target="_blank" rel="noreferrer">úplný původ snímků ↗</a> dokládají návaznost; poslední odkaz uvádí také starší archivní snímky.</p>
                  <p>Veřejné demo bylo 25. 10. 2026 ověřeno proti této verzi: změna termínu nepřidává pokus, přijatý výsledek přidá právě jeden a další krok zůstává uložený po obnovení stránky.</p>
                </div>
              </details>
            </section>
          </div>
        </div>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.closingGrid} aria-hidden="true" />
          <span>Digital Call · 2026</span>
          <h2 id="closing-title">Vyzkoušejte pracovní postup.</h2>
          <p className={styles.closingBridge}>Otevřete kontakt, upravte termín a zaznamenejte výsledek modelového hovoru. Rozdíl mezi naplánovanou aktivitou a uskutečněným pokusem je hlavní návrhové rozhodnutí tohoto prototypu.</p>
          <div className={styles.closingActions}>
            <a className={styles.primaryButton} href={DEMO_URL} target="_blank" rel="noreferrer">
              Otevřít pracovní demo <ArrowIcon />
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
