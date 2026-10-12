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
    <header className={styles.chapterHeading}>
      <span className={styles.chapterKicker}>{number} / {label}</span>
      <h2>{title}</h2>
      {intro ? <p>{intro}</p> : null}
    </header>
  );
}

function Screenshot({ desktop, mobile, alt, eyebrow, caption, priority = false, className = "" }) {
  return (
    <figure className={`${styles.screenshot} ${className}`}>
      <div className={styles.browserBar} aria-hidden="true">
        <span /><span /><span />
        <i>digital-call-module.vercel.app</i>
      </div>
      <picture>
        {mobile ? <source media="(max-width: 620px)" srcSet={mobile} /> : null}
        <img src={desktop} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      </picture>
      <figcaption>
        <span>{eyebrow}</span>
        <p>{caption}</p>
      </figcaption>
    </figure>
  );
}

function StoryLine({ rootRef }) {
  const lineRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const paths = line ? Array.from(line.querySelectorAll("[data-story-path]")) : [];
    if (!root || paths.length === 0) return undefined;

    paths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });

    const media = gsap.matchMedia();
    let ownTriggers = [];
    let frameId;

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const tweens = paths.map((path) => gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top 72%",
            end: "bottom 78%",
            scrub: 0.65,
          },
        }));
      ownTriggers = tweens.map((tween) => tween.scrollTrigger).filter(Boolean);
      return () => tweens.forEach((tween) => tween.kill());
    });

    media.add("(prefers-reduced-motion: reduce)", () => {
      paths.forEach((path) => { path.style.strokeDashoffset = "0"; });
    });

    const observer = new ResizeObserver(() => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => ownTriggers.forEach((trigger) => trigger.refresh()));
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frameId);
      media.revert();
    };
  }, [rootRef]);

  return (
    <div ref={lineRef} className={styles.storyLine} aria-hidden="true">
      <svg className={styles.desktopLine} viewBox="0 0 72 1000" preserveAspectRatio="none">
        <path
          className={styles.storyLineGhost}
          d="M24 0V142C24 174 51 174 51 206V332C51 364 24 364 24 396V524C24 556 51 556 51 588V716C51 748 24 748 24 780V1000"
        />
        <path
          data-story-path
          className={styles.storyLineProgress}
          d="M24 0V142C24 174 51 174 51 206V332C51 364 24 364 24 396V524C24 556 51 556 51 588V716C51 748 24 748 24 780V1000"
        />
        {[35, 205, 394, 587, 778, 968].map((y) => <circle key={y} cx={y % 2 ? 24 : 51} cy={y} r="5" />)}
      </svg>
      <svg className={styles.mobileLine} viewBox="0 0 18 1000" preserveAspectRatio="none">
        <path className={styles.storyLineGhost} d="M9 0V1000" />
        <path data-story-path className={styles.storyLineProgress} d="M9 0V1000" />
        {[35, 205, 394, 587, 778, 968].map((y) => <circle key={y} cx="9" cy={y} r="4" />)}
      </svg>
    </div>
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
  const storyRef = useRef(null);

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

        <nav className={styles.chapterNav} aria-label="Kapitoly case study">
          <div>
            {chapterLinks.map((chapter) => (
              <a key={chapter.id} href={`#${chapter.id}`}>
                <span>{chapter.number}</span>{chapter.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={styles.story} ref={storyRef}>
          <StoryLine rootRef={storyRef} />
          <div className={styles.storyContent}>
            <section className={styles.chapter} id="problem">
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

            <section className={styles.chapter} id="approach">
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

            <section className={styles.chapter} id="decisions">
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

            <section className={styles.chapter} id="solution">
              <ChapterHeading
                number="04"
                label="Aktuální řešení"
                title="Jedno navazující workflow. Od priority po další krok."
              />

              <div className={styles.workflow} aria-label="Vizuální scénář práce s kontaktem">
                {["Najdu zmeškaný hovor", "Otevřu kontext", "Zaznamenám výsledek", "Vidím další krok"].map((step, index) => (
                  <div key={step}><span>{index + 1}</span><strong>{step}</strong>{index < 3 ? <ArrowIcon /> : null}</div>
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
                />
                <Screenshot
                  desktop="/digital-call/detail-desktop.png"
                  mobile="/digital-call/detail-mobile.png"
                  alt="Kontextový detail syntetického kontaktu Anna Novotná"
                  eyebrow="02 · Kontext"
                  caption="Anna Novotná · Byt 3+kk · Praha 7. Důvod, kontext, akce, plán a historie jsou v jednom rozhodovacím toku."
                />
                <Screenshot
                  desktop="/digital-call/outcome-desktop.png"
                  alt="Dialog Digital Call pro zaznamenání výsledku hovoru"
                  eyebrow="03 · Výsledek"
                  caption="Každá volba předem vysvětluje dopad na stav nebo příští aktivitu. Zobrazený kontakt i údaje jsou syntetické."
                />
              </div>

              <p className={styles.solutionFootnote}>
                Kanban zůstává dostupný jako <strong>Proces</strong>. Lokální stav umožňuje po refreshi
                pokračovat a reset dema vyžaduje potvrzení.
              </p>
            </section>

            <section className={styles.chapter} id="validation">
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

            <section className={styles.chapter} id="next">
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
    </div>
  );
}
