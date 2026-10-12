"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  chapterLinks,
  decisions,
  projectFacts,
  scenarios,
  solutionParts,
  testTasks,
} from "./content";
import styles from "./DigitalCallCaseStudy.module.scss";

gsap.registerPlugin(ScrollTrigger);

const DEMO_URL = "https://digital-call-module.vercel.app/";
const CODE_URL = "https://github.com/DP8778/digital_call_module";

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

function ChapterHeading({ number, label, title, intro }) {
  return (
    <header className={styles.chapterHeading} data-chapter-heading>
      <span className={styles.chapterKicker}>{number} / {label}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
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

function Screenshot({ desktop, mobile, alt, eyebrow, caption, priority = false, className = "", onOpen }) {
  const imageRef = useRef(null);

  const openViewer = () => {
    const image = imageRef.current;
    onOpen({
      src: image?.currentSrc || desktop,
      alt,
      eyebrow,
      caption,
      width: image?.naturalWidth || 1440,
      height: image?.naturalHeight || 1000,
    });
  };

  return (
    <figure className={`${styles.screenshot} ${className}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span /><span /><span />
        <i>digital-call-module.vercel.app</i>
      </div>
      <picture>
        {mobile ? <source media="(max-width: 620px)" srcSet={mobile} width="390" height="844" /> : null}
        <img ref={imageRef} src={desktop} alt={alt} width="1440" height="1000" loading={priority ? "eager" : "lazy"} decoding="async" />
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
      const xPositions = mobile ? [9, 9, 9, 9, 9, 9] : [24, 48, 28, 48, 28, 48];
      const headings = Array.from(root.querySelectorAll("[data-story-chapter] [data-chapter-heading] h2"));
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
    if (chapterLinks.some((chapter) => chapter.id === hashId)) setActiveChapter(hashId);

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
    return () => observer.disconnect();
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
    <div className={styles.prototype} role="img" aria-label="Wireframe původního Kanban prototypu se třemi procesními sloupci">
      <div className={styles.prototypeTop}>
        <span>Výchozí prototyp</span>
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
      <p>Nově nakreslený wireframe · bez původní značky a kontaktních údajů</p>
    </div>
  );
}

export default function DigitalCallCaseStudy() {
  const [theme, setTheme] = useState("light");
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
    <div className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
      <a className={styles.skipLink} href="#case-content">Přeskočit na obsah</a>

      <header className={styles.siteHeader}>
        <a className={styles.backLink} href="/#work">
          <ArrowIcon />
          <span>Zpět na portfolio</span>
        </a>
        <span className={styles.projectLabel}>Case study · Digital Call</span>
        <div className={styles.headerActions}>
          <button
            className={styles.themeToggle}
            type="button"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}
          >
            <span className={theme === "light" ? styles.activeTheme : ""}><SunIcon /></span>
            <span className={theme === "dark" ? styles.activeTheme : ""}><MoonIcon /></span>
          </button>
          <a className={styles.headerDemo} href={DEMO_URL} target="_blank" rel="noreferrer">
            Demo <ArrowIcon diagonal />
          </a>
        </div>
      </header>

      <main id="case-content">
        <section className={styles.hero} aria-labelledby="page-title">
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}>Product design · Pracovní workflow · 2026</span>
            <h1 id="page-title">Digital Call</h1>
            <p className={styles.heroClaim}>Od přehledu kontaktů k jasnému dalšímu kroku.</p>
            <p className={styles.heroIntro}>
              Pracovní nástroj pro obvolávání realitních kontaktů. Pomáhá makléři zjistit,
              koho řešit právě teď, získat kontext a zaznamenat výsledek bez ztráty návaznosti.
            </p>
            <ol className={styles.quickDecisions} aria-label="Tři hlavní návrhová rozhodnutí">
              <li><a href="#problem"><span>01</span>Z Kanbanu na pracovní frontu</a></li>
              <li><a href="#solution"><span>02</span>Kontext před akcí</a></li>
              <li><a href="#decisions"><span>03</span>Výsledek hovoru oddělený od přesunu</a></li>
            </ol>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href={DEMO_URL} target="_blank" rel="noreferrer">
                Vyzkoušet demo <ArrowIcon diagonal />
              </a>
              <a className={styles.secondaryButton} href="#problem">
                Prohlédnout case study <ArrowIcon />
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <Screenshot
              desktop="/digital-call/queue-desktop.png"
              mobile="/digital-call/queue-mobile.png"
              alt="Aktuální pracovní fronta Digital Call se zmeškanými kontakty a filtry"
              eyebrow="Aktuální produkt"
              caption="Pracovní fronta používá syntetická data a stav uložený jen v prohlížeči."
              priority
              onOpen={openViewer}
            />
          </div>

          <dl className={styles.facts}>
            {projectFacts.map(([term, value]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <ChapterNavigation />

        <div className={styles.story} ref={storyRef}>
          <StoryLine rootRef={storyRef} />
          <div className={styles.storyContent}>
            <section className={styles.chapter} id="problem" data-story-chapter>
              <ChapterHeading number="01" label="Problém" title="Stav kontaktu ještě neříká, co udělat dnes." />
              <div className={styles.editorialSplit}>
                <div className={styles.bodyCopy}>
                  <p>
                    Původní prototyp byl postavený na Kanbanu. Ukazoval, v jaké fázi se kontakty
                    nacházejí, ale pro dnešní práci chyběl pohled přes jednotlivé sloupce. Uživatel
                    musel sám spojovat stav, termín a dosavadní komunikaci.
                  </p>
                  <p>
                    V původní logice se navíc míchal přesun kontaktu s pokusem o hovor. Chyběl
                    kontextový detail i historie, ze které by bylo zřejmé, co se skutečně stalo a co
                    má následovat.
                  </p>
                </div>
                <blockquote>
                  <span>Návrhová otázka</span>
                  Jak rychle ukázat, koho řešit, proč právě teď a jaký je bezpečný další krok?
                </blockquote>
              </div>

              <div className={styles.problemVisuals}>
                <PrototypeWireframe />
                <div className={styles.questionShift}>
                  <div><span>Původní otázka</span><strong>V jakém stavu je kontakt?</strong></div>
                  <ArrowIcon />
                  <div><span>Nová pracovní otázka</span><strong>Koho mám řešit teď a co udělat dál?</strong></div>
                  <p>Audit prototypu · nikoli zjištění z rozhovorů s makléři</p>
                </div>
              </div>
            </section>

            <section className={styles.chapter} id="approach" data-story-chapter>
              <ChapterHeading
                number="02"
                label="Přístup a omezení"
                title="Nejdřív pracovní scénář. Potom obrazovky."
                intro="Návrh vychází z auditu původního rozhraní a stavové logiky. Potřeby makléře jsou v této fázi návrhové hypotézy; výzkum s reálnými uživateli zatím neproběhl."
              />

              <ol className={styles.scenarios}>
                {scenarios.map((scenario) => (
                  <li key={scenario.number}>
                    <span>{scenario.number}</span>
                    <div><h3>{scenario.title}</h3><p>{scenario.text}</p></div>
                  </li>
                ))}
              </ol>

              <div className={styles.scopeNote}>
                <span>Rozsah projektu</span>
                <p>
                  Projekt rozvíjí pohovorový prototyp do veřejně prezentovatelného interaktivního
                  dema. Používá syntetická data a localStorage, neprovádí skutečné volání a nemá
                  backend ani týmovou synchronizaci. Původní text zadání není dostupný. Zdrojově
                  závislé časové intervaly jsou převzaté z původního kódu a zatím nepotvrzené.
                </p>
              </div>

              <div className={styles.process} aria-label="Proces projektu">
                {["Audit", "Pracovní flow", "Stavový model", "Implementace", "Technické ověření", "Plán testování"].map((step, index) => (
                  <div key={step}><span>{String(index + 1).padStart(2, "0")}</span><strong>{step}</strong></div>
                ))}
              </div>
            </section>

            <section className={styles.chapter} id="decisions" data-story-chapter>
              <ChapterHeading number="03" label="Klíčová rozhodnutí" title="Změnit způsob práce, nejen podobu karet." />

              <div className={styles.decisionList}>
                {decisions.map((decision) => (
                  <article key={decision.number}>
                    <header><span>{decision.number}</span><h3>{decision.title}</h3></header>
                    <dl>
                      <div><dt>Problém</dt><dd>{decision.problem}</dd></div>
                      <div><dt>Volba</dt><dd>{decision.choice}</dd></div>
                      <div><dt>Přínos / kompromis</dt><dd>{decision.impact}</dd></div>
                    </dl>
                    {decision.number === "02" ? (
                      <div className={styles.stateModel} aria-label="Ilustrativní scénář oddělení stavu, aktivity a historie">
                        <span>Ilustrativní scénář</span>
                        <div><small>Stav</small><strong>Volat později</strong></div>
                        <i>+</i>
                        <div><small>Aktivita</small><strong>Hovor, zítra 15:00</strong></div>
                        <i>+</i>
                        <div><small>Historie</small><strong>Skutečně uložené události</strong></div>
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>

            <section className={styles.chapter} id="solution" data-story-chapter>
              <ChapterHeading
                number="04"
                label="Aktuální řešení"
                title="Jedno navazující workflow. Od priority po další krok."
              />

              <div className={styles.workflow} aria-label="Syntetický scénář kontaktu Anna Novotná od fronty po další krok">
                {[
                  ["Fronta", "Anna Novotná · zmeškaný hovor"],
                  ["Kontext", "Byt 3+kk · Praha 7 · poslední interakce"],
                  ["Výsledek", "Nedovoláno · pokus uložený do historie"],
                  ["Další krok", "Nový hovor v potvrzeném termínu"],
                ].map(([label, step], index) => (
                  <div key={label}><span>{index + 1} · {label}</span><strong>{step}</strong>{index < 3 ? <ArrowIcon /> : null}</div>
                ))}
              </div>

              <div className={styles.solutionIntro}>
                {solutionParts.map((part) => (
                  <article key={part.title}>
                    <span>{part.label}</span>
                    <h3>{part.title}</h3>
                    <p>{part.text}</p>
                  </article>
                ))}
              </div>

              <div className={styles.screenSequence}>
                <Screenshot
                  desktop="/digital-call/queue-desktop.png"
                  mobile="/digital-call/queue-mobile.png"
                  alt="Pracovní fronta Digital Call s prioritní skupinou zmeškaných kontaktů"
                  eyebrow="01 · Priorita"
                  caption="Fronta odděluje práci vyžadující zásah právě teď od aktivit, které přijdou na řadu později."
                  onOpen={openViewer}
                />
                <Screenshot
                  desktop="/digital-call/detail-desktop.png"
                  mobile="/digital-call/detail-mobile.png"
                  alt="Kontextový detail syntetického kontaktu Anna Novotná"
                  eyebrow="02 · Kontext"
                  caption="Anna Novotná · Byt 3+kk · Praha 7. Důvod, kontext, akce, plán a historie jsou v jednom rozhodovacím toku."
                  onOpen={openViewer}
                />
                <Screenshot
                  desktop="/digital-call/outcome-desktop.png"
                  alt="Dialog Digital Call pro zaznamenání výsledku hovoru"
                  eyebrow="03 · Výsledek"
                  caption="Každá volba předem vysvětluje dopad na stav nebo příští aktivitu. Zobrazený kontakt i údaje jsou syntetické."
                  onOpen={openViewer}
                />
              </div>

              <p className={styles.solutionFootnote}>
                Kanban zůstává dostupný jako <strong>Proces</strong>. Lokální stav umožňuje po refreshi
                pokračovat a reset dema vyžaduje potvrzení.
              </p>
            </section>

            <section className={styles.chapter} id="validation" data-story-chapter>
              <ChapterHeading number="05" label="Výsledek a ověření" title="Funkční řešení. Dopad na práci teprve ověřím." />

              <div className={styles.validationGrid}>
                <article>
                  <span>Co vzniklo</span>
                  <p>
                    Interaktivní demo, které propojuje pracovní priority, kontext kontaktu a další
                    krok. Návrhová rozhodnutí jsou převedená do rozhraní a explicitních pravidel chování.
                  </p>
                </article>
                <article>
                  <span>Co je technicky doložené</span>
                  <p>
                    Automatické testy ověřují stavové změny, řazení fronty a pražský čas — například
                    skutečný vznik pokusu, plánování bez změny stavu, jednorázové časové zpracování a
                    obnovu uloženého scénáře.
                  </p>
                </article>
                <article>
                  <span>Co ověřeno není</span>
                  <p>
                    Moderované testování s makléři, zrychlení práce, snížení chybovosti ani obchodní dopad.
                  </p>
                </article>
              </div>

              <div className={styles.testProof}>
                <span>Kontrola · 12. 10. 2026</span>
                <strong>19 / 19 automatických testů prošlo</strong>
                <p>Stejně jako TypeScript, ESLint a produkční Next.js build aktuálního produktu.</p>
              </div>

              <blockquote className={styles.learning}>
                <span>Poučení</span>
                Procesní přehled a pracovní priorita odpovídají na různé otázky. Rozhraní musí podpořit
                obě a zároveň vysvětlit důsledky každé akce.
              </blockquote>
            </section>

            <section className={styles.chapter} id="next" data-story-chapter>
              <ChapterHeading number="06" label="Co dál" title="Ověřit, jestli další krok vidí i uživatel." />

              <ol className={styles.testTasks}>
                {testTasks.map((task, index) => (
                  <li key={task.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div><h3>{task.title}</h3><p><strong>Sleduji:</strong> {task.observe}</p></div>
                  </li>
                ))}
              </ol>

              <div className={styles.futureNote}>
                <span>Plánovaná vizuální iterace</span>
                <p>
                  Směr inspirovaný Liquid Glass patří až do další iterace produktu. Nenahrazuje
                  uživatelské testování a nebude prezentovaný jako hotové řešení, dokud nebude ověřený.
                </p>
              </div>
            </section>
          </div>
        </div>

        <section className={styles.closing} aria-labelledby="closing-title">
          <div className={styles.closingGrid} aria-hidden="true" />
          <span>Digital Call · 2026</span>
          <h2 id="closing-title">Od kontaktu k rozhodnutí bez ztráty návaznosti.</h2>
          <div className={styles.closingActions}>
            <a className={styles.primaryButton} href={DEMO_URL} target="_blank" rel="noreferrer">
              Vyzkoušet Digital Call <ArrowIcon diagonal />
            </a>
            <a className={styles.secondaryButton} href={CODE_URL} target="_blank" rel="noreferrer">
              Prohlédnout kód <ArrowIcon diagonal />
            </a>
          </div>
          <footer>
            <a href="/#work">Další projekty</a>
            <a href="/kontakt">Kontakt</a>
            <a href="#case-content">Nahoru ↑</a>
          </footer>
        </section>
      </main>
      <ScreenshotViewer viewer={viewer} onClose={closeViewer} />
    </div>
  );
}
