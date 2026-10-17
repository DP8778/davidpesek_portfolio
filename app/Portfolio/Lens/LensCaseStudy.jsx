"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import usePortfolioTheme from "../../usePortfolioTheme";
import styles from "./LensCaseStudy.module.scss";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  ["problem", "01", "Problém"],
  ["direction", "02", "Návrhová volba"],
  ["interaction", "03", "Interakce"],
  ["evidence", "04", "AI a evidence"],
  ["limits", "05", "Omezení"],
  ["next", "06", "Co dál"],
];

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h13M11 5l5 5-5 5"} /></svg>;
}

function ChapterHeading({ number, label, title, intro }) {
  return <header className={styles.chapterHeading} data-chapter-heading><span className={styles.chapterKicker}>{number} / {label}</span><h2>{title}</h2>{intro && <p>{intro}</p>}</header>;
}

function pathFor(points) {
  if (!points.length) return "";
  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const middle = (previous.y + current.y) / 2;
    const bend = Math.min(34, Math.max(18, (current.y - previous.y) / 8));
    path += ` L ${previous.x} ${middle - bend} C ${previous.x} ${middle}, ${current.x} ${middle}, ${current.x} ${middle + bend} L ${current.x} ${current.y}`;
  }
  return path;
}

function StoryLine({ rootRef }) {
  const lineRef = useRef(null);
  const [geometry, setGeometry] = useState({ width: 72, height: 1, offset: 0, points: [], path: "" });

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    if (!root || !line) return undefined;
    let frame;
    let disposed = false;
    const measure = () => {
      frame = undefined;
      if (disposed) return;
      const rootRect = root.getBoundingClientRect();
      const lineRect = line.getBoundingClientRect();
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const positions = mobile ? [9, 9, 9, 9, 9, 9] : [24, 48, 28, 48, 28, 48];
      const points = Array.from(root.querySelectorAll("[data-story-chapter] [data-chapter-heading] h2")).map((heading, index) => {
        const rect = heading.getBoundingClientRect();
        return { x: positions[index], y: Math.round(rect.top - lineRect.top + rect.height / 2) };
      });
      const next = { width: mobile ? 18 : 72, height: Math.max(1, Math.round(lineRect.height)), offset: Math.round(lineRect.top - rootRect.top), points, path: pathFor(points) };
      setGeometry((current) => current.width === next.width && current.height === next.height && current.offset === next.offset && current.path === next.path ? current : next);
    };
    const schedule = () => { if (frame === undefined) frame = requestAnimationFrame(measure); };
    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    root.querySelectorAll("[data-story-chapter] [data-chapter-heading]").forEach((heading) => observer.observe(heading));
    const images = Array.from(root.querySelectorAll("img"));
    images.forEach((img) => img.addEventListener("load", schedule));
    window.addEventListener("resize", schedule, { passive: true });
    document.fonts?.addEventListener?.("loadingdone", schedule);
    document.fonts?.ready.then(schedule);
    schedule();
    return () => {
      disposed = true;
      observer.disconnect();
      images.forEach((img) => img.removeEventListener("load", schedule));
      window.removeEventListener("resize", schedule);
      document.fonts?.removeEventListener?.("loadingdone", schedule);
      if (frame !== undefined) cancelAnimationFrame(frame);
    };
  }, [rootRef]);

  useEffect(() => {
    const root = rootRef.current;
    const line = lineRef.current;
    const progress = line?.querySelector("[data-story-progress]");
    if (!root || !progress || !geometry.path || !geometry.points.length) return undefined;
    const context = gsap.context(() => {
      const length = progress.getTotalLength();
      gsap.set(progress, { strokeDasharray: length, strokeDashoffset: length });
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(progress, { strokeDashoffset: 0 });
        return;
      }
      gsap.to(progress, { strokeDashoffset: 0, ease: "none", scrollTrigger: {
        trigger: root,
        start: () => `top+=${geometry.offset + geometry.points[0].y} 72%`,
        end: () => `top+=${geometry.offset + geometry.points.at(-1).y} 55%`,
        scrub: 0.65,
        invalidateOnRefresh: true,
      } });
    }, line);
    return () => context.revert();
  }, [geometry, rootRef]);

  return <div ref={lineRef} className={styles.storyLine} aria-hidden="true"><svg width={geometry.width} height={geometry.height} viewBox={`0 0 ${geometry.width} ${geometry.height}`} preserveAspectRatio="xMinYMin meet"><path className={styles.storyLineGhost} d={geometry.path} /><path className={styles.storyLineProgress} data-story-progress d={geometry.path} />{geometry.points.map((point, index) => <circle key={chapters[index][0]} cx={point.x} cy={point.y} r={geometry.width === 18 ? 4 : 5} />)}</svg></div>;
}

function ChapterNavigation() {
  const [active, setActive] = useState(chapters[0][0]);
  const scrollRef = useRef(null);
  const itemRefs = useRef(new Map());
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (chapters.some(([id]) => id === hash)) setActive(hash);
    const sections = chapters.map(([id]) => document.getElementById(id)).filter(Boolean);
    const states = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => states.set(entry.target.id, entry));
      const visible = chapters.map(([id]) => states.get(id)).filter((entry) => entry?.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight * .16) - Math.abs(b.boundingClientRect.top - innerHeight * .16));
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    const onHash = () => { const id = location.hash.slice(1); if (chapters.some(([name]) => name === id)) setActive(id); };
    window.addEventListener("hashchange", onHash);
    return () => { observer.disconnect(); window.removeEventListener("hashchange", onHash); };
  }, []);
  useEffect(() => {
    const scroller = scrollRef.current;
    const item = itemRefs.current.get(active);
    if (!scroller || !item) return;
    const left = item.offsetLeft - (scroller.clientWidth - item.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  }, [active]);
  return <nav className={styles.chapterNav} aria-label="Kapitoly case study"><div ref={scrollRef}>{chapters.map(([id, number, label]) => <a key={id} ref={(node) => { if (node) itemRefs.current.set(id, node); else itemRefs.current.delete(id); }} href={`#${id}`} className={active === id ? styles.activeChapter : ""} aria-current={active === id ? "location" : undefined} onClick={() => setActive(id)}><span>{number}</span>{label}</a>)}</div></nav>;
}

function Screenshot({ src, alt, eyebrow, caption, onOpen, priority = false, imageWidth = 1440, imageHeight = 1000 }) {
  return <figure className={styles.screenshot}>
    <div className={styles.browserBar} aria-hidden="true"><span /><span /><span /><i>Lokální demo Lens · syntetické portfolio</i></div>
    <img src={src} alt={alt} width={imageWidth} height={imageHeight} loading={priority ? "eager" : "lazy"} decoding="async" />
    <figcaption><div><span>{eyebrow}</span><p>{caption}</p></div><button type="button" onClick={() => onOpen({ src, alt, eyebrow, caption, imageWidth, imageHeight })}>↗ Zvětšit obrazovku</button></figcaption>
  </figure>;
}

function ScreenshotViewer({ viewer, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !viewer) return undefined;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    const trap = (event) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialog.querySelectorAll('button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1).focus(); }
      if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    };
    dialog.addEventListener("keydown", trap);
    return () => { dialog.removeEventListener("keydown", trap); document.body.style.overflow = overflow; if (dialog.open) dialog.close(); };
  }, [viewer]);
  if (!viewer) return null;
  const close = () => dialogRef.current?.close();
  return <dialog ref={dialogRef} className={styles.lightbox} aria-labelledby="lens-viewer-title" aria-describedby="lens-viewer-caption" onCancel={(event) => { event.preventDefault(); close(); }} onClose={onClose} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div className={styles.lightboxPanel}><header><div><span>{viewer.eyebrow}</span><h2 id="lens-viewer-title">Detail obrazovky Lens</h2></div><button ref={closeRef} type="button" onClick={close} aria-label="Zavřít zvětšenou obrazovku">×</button></header><div className={styles.lightboxViewport} tabIndex="0" aria-label="Posouvatelný náhled obrazovky"><img src={viewer.src} alt={viewer.alt} width={viewer.imageWidth} height={viewer.imageHeight} /></div><p id="lens-viewer-caption">{viewer.caption}</p></div>
  </dialog>;
}

export default function LensCaseStudy() {
  const [theme, toggleTheme] = usePortfolioTheme();
  const [viewer, setViewer] = useState(null);
  const storyRef = useRef(null);
  const opener = useRef(null);
  const openViewer = (data) => { opener.current = document.activeElement; setViewer(data); };
  const closeViewer = () => { setViewer(null); requestAnimationFrame(() => opener.current?.focus()); };

  return <div className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <a className={styles.skipLink} href="#case-content">Přeskočit na obsah</a>
    <header className={styles.siteHeader}>
      <a className={styles.backLink} href="/#work" aria-label="Zpět na portfolio"><Arrow /><span>Zpět na portfolio</span></a>
      <span className={styles.projectLabel}>Case study · Lens</span>
      <div className={styles.headerActions}><button className={styles.themeToggle} type="button" onClick={toggleTheme} aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}><span className={theme === "light" ? styles.activeTheme : ""}>☼</span><span className={theme === "dark" ? styles.activeTheme : ""}>☾</span></button><a className={styles.headerDemo} href="https://github.com/DP8778/P-2_Lens" target="_blank" rel="noreferrer">Kód <Arrow diagonal /></a></div>
    </header>
    <main id="case-content">
      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Product design · Data visualization · 2026</span>
          <h1 id="page-title">Lens</h1>
          <p className={styles.heroClaim}>Lens — od výsledného čísla k ověřitelnému vysvětlení.</p>
          <p className={styles.heroIntro}>Vývoj portfolia je snadné zobrazit jedním číslem. Těžší je ukázat, co ho ovlivnilo, které údaje vysvětlení podporují a kde informace nestačí.</p>
          <ol className={styles.quickDecisions} aria-label="Cesta případovou studií"><li><a href="#direction"><span>01</span>Od výsledku k příspěvkům a rizikům</a></li><li><a href="#interaction"><span>02</span>Výběr v grafu mění kontext</a></li><li><a href="#evidence"><span>03</span>Formulace navazuje na ověřená čísla</a></li></ol>
          <div className={styles.heroActions}><a className={styles.primaryButton} href="#problem">Prohlédnout case study <Arrow /></a><a className={styles.secondaryButton} href="https://github.com/DP8778/P-2_Lens" target="_blank" rel="noreferrer">Zdrojový kód <Arrow diagonal /></a></div>
        </div>
        <div className={styles.heroVisual}><Screenshot src="/lens/dashboard-desktop.png" alt="Skutečná obrazovka lokálního Lens dema: souhrn syntetického portfolia, graf výkonu a Lens Insight" eyebrow="Lokální demo · říjen 2026" caption="Demo portfolio má deterministická syntetická data. Zobrazené částky nejsou výsledek uživatelského testu ani investiční doporučení." onOpen={openViewer} priority /></div>
        <dl className={styles.facts}><div><dt>Forma</dt><dd>Funkční produktový prototyp</dd></div><div><dt>Data</dt><dd>Syntetické demo; volitelně vlastní portfolio</dd></div><div><dt>Moje práce</dt><dd>Návrh rozhraní a front-end</dd></div><div><dt>Rok</dt><dd>2026</dd></div><div><dt>Technologie</dt><dd>React, Next.js, TypeScript</dd></div></dl>
      </section>
      <ChapterNavigation />
      <div className={styles.story} ref={storyRef}><StoryLine rootRef={storyRef} /><div className={styles.storyContent}>
        <section className={styles.chapter} id="problem" data-story-chapter><ChapterHeading number="01" label="Problém" title="Číslo ukáže výsledek. Neřekne, jak ho číst." /><div className={styles.editorialSplit}><div className={styles.bodyCopy}><p>Samotná hodnota portfolia nebo procento výnosu nestačí k pochopení změny. Člověk musí spojit období, srovnání, jednotlivé pozice a riziko. Pokud jsou tyto vrstvy roztroušené, závěr si snadno domyslí bez opory v datech.</p><p>Lens je vlastní produktová hypotéza, ne odpověď na doložený klientský brief. Cílem bylo vytvořit čitelnou cestu od souhrnu k podkladům a zároveň jasně ukázat, kde data končí.</p></div><blockquote><span>Návrhová otázka</span>Co se změnilo — a o co se vysvětlení opírá?</blockquote></div><p className={styles.lensNote}><strong>Hranice tvrzení</strong><span>Prototyp neprokazuje, že uživatelé díky rozhraní dělají lepší finanční rozhodnutí. Takové tvrzení by vyžadovalo testování s lidmi.</span></p></section>

        <section className={styles.chapter} id="direction" data-story-chapter><ChapterHeading number="02" label="Návrhová volba" title="Nejdřív výsledek. Pak hybatelé, riziko a důkaz." intro="Hierarchie vede od jedné hlavní otázky k detailu. Záměrně nedává všem metrikám stejnou vizuální váhu." /><div className={styles.lensSteps}><div><span>01 / Souhrn</span><strong>Jak se portfolio změnilo?</strong><p>Hodnota, výnos, období a srovnání.</p></div><div><span>02 / Příspěvky</span><strong>Co změnu táhlo?</strong><p>Pozice a jejich příspěvek, ne jen pohyb ceny.</p></div><div><span>03 / Riziko</span><strong>Co může obraz zkreslit?</strong><p>Pokles, koncentrace a rozsah dat.</p></div><div><span>04 / Evidence</span><strong>Odkud to víme?</strong><p>Konkrétní vypočtená metrika za tvrzením.</p></div></div><div className={styles.lensComparison}><article><span>Vizuální rozhodnutí</span><h3>Jeden hlavní graf.</h3><p>Vývoj portfolia je primární osa příběhu. Přepnutí na příspěvky nebo pokles mění otázku, nikoli jen barvu čáry. Textový souhrn zachovává význam i bez vizuálního čtení grafu.</p></article><article><span>Kompromis</span><h3>Detail až na vyžádání.</h3><p>Podklady a hlubší vysvětlení jsou dostupné ve stejné obrazovce, ale nezatěžují první pohled. Pokročilá čísla proto vyžadují další interakci.</p></article></div><div className={styles.lensScreens}><Screenshot src="/lens/contributions-desktop.png" alt="Skutečná obrazovka Lens v režimu Příspěvky: rozpad příspěvků aktiv a související insight" eyebrow="Přepnutý pohled · Příspěvky" caption="Přepnutí z vývoje na příspěvky odpovídá na jinou otázku: která aktiva přispěla k výsledku. Syntetické hodnoty z lokálního dema." onOpen={openViewer} /></div></section>

        <section className={styles.chapter} id="interaction" data-story-chapter><ChapterHeading number="03" label="Interakce" title="Výběr musí přežít pohyb kurzoru." intro="Konkrétní průchod demem: období → bod nebo pozice → nové vysvětlení → metrika v Evidence." /><ol className={styles.lensBullets}><li><span>01</span><div><strong>Zvolím období.</strong><p>Graf, souhrn a insight pracují se stejným rozsahem. Vlastní výběr období lze zrušit a vrátit se k předvolbě.</p></div></li><li><span>02</span><div><strong>Vyberu bod nebo aktivum.</strong><p>Hover slouží k rychlé orientaci; kliknutí či klávesnicová volba nastaví trvalý kontext. Není nutné držet kurzor nad grafem.</p></div></li><li><span>03</span><div><strong>Čtu navazující vysvětlení.</strong><p>Lens Insight přepočítá rozsah a zaměření podle výběru. Stav výpočtu i nedostupnost rozšířené formulace mají čitelný text.</p></div></li><li><span>04</span><div><strong>Otevřu podklad.</strong><p>Evidence ukáže označené metriky; akční položka vrací pozornost k příslušnému pohledu v grafu.</p></div></li></ol><div className={styles.lensScreens}><Screenshot src="/lens/dashboard-desktop.png" alt="Přehled demo portfolia Lens s grafem a textovým insightem" eyebrow="01 · Přehled" caption="Graf, období a Lens Insight tvoří jeden čtecí tok. Hodnoty pocházejí ze syntetického demo portfolia." onOpen={openViewer} /><Screenshot src="/lens/evidence-desktop.png" alt="Obrazovka Lens s rozbalenou sekcí Evidence u insightu" eyebrow="02 · Podklady" caption="Rozbalené Evidence odkrývá metriky za vysvětlením. Snímek pochází z běžícího lokálního prototypu." onOpen={openViewer} /></div></section>

        <section className={styles.chapter} id="evidence" data-story-chapter><ChapterHeading number="04" label="AI a evidence" title="Model formuluje. Čísla nevytváří." /><div className={styles.editorialSplit}><div className={styles.bodyCopy}><p>Finanční vrstva nejdřív deterministicky spočítá výnos, příspěvky, expozice a pokles. Teprve z omezeného strukturovaného kontextu vznikne textové vysvětlení. Tvrzení nese odkazy na identifikátory metrik, které lze rozbalit jako Evidence.</p><p>AI může formulovat vztah mezi hotovými hodnotami; nesmí doplnit nové finanční číslo, doporučit obchod ani tvrdit neověřenou příčinu pohybu trhu. Když volání selže nebo není klíč, zůstane programově sestavený výklad nad stejnými čísly.</p></div><blockquote><span>Pravidlo důvěry</span>Vysvětlení je interpretace vypočtených faktů, ne další zdroj pravdy.</blockquote></div><p className={styles.lensNote}><strong>Soukromí</strong><span>AI payload je redukovaný a validovaný na serveru; neobsahuje identitu, přihlašovací údaje ani celé portfolio. Prezentační demo používá syntetická data.</span></p></section>

        <section className={styles.chapter} id="limits" data-story-chapter><ChapterHeading number="05" label="Omezení" title="Chybějící údaj není nula." /><div className={styles.lensComparison}><article><span>Data</span><h3>Nedostupnost je stav.</h3><p>Osobní portfolio je volitelný režim se zadáváním vlastních transakcí a poskytovatelem tržních dat. Prázdné portfolio ukáže výzvu k přidání aktiva, ne nulový výnos. Bez konfigurace nebo dostatečné historie rozhraní přizná nedostupnost. Demo je pevný syntetický dataset, ne živý trh.</p></article><article><span>AI</span><h3>Fallback má vlastní text.</h3><p>Při chybě rozšířeného vysvětlení zůstává deterministické shrnutí. UI rozlišuje stav formulace od platnosti metrik. Nejde o investiční doporučení ani predikci.</p></article></div><div className={styles.lensScreens}><Screenshot src="/lens/personal-empty-desktop.png" alt="Skutečný prázdný stav volitelného osobního portfolia Lens s výzvou k přidání aktiva a návratu do dema" eyebrow="Osobní režim · prázdný stav" caption="Bez zadaných aktiv Lens neukazuje nulový výnos: nabídne přidání aktiva nebo návrat do syntetického demo portfolia." onOpen={openViewer} /><Screenshot src="/lens/ai-fallback-desktop.png" alt="Lens Insight při simulované nedostupnosti rozšířené formulace stále ukazuje deterministické vysvětlení a upozornění" eyebrow="Simulovaná chyba služby" caption="Při testem vyvolané chybě API zůstaly vypočtené metriky i základní vysvětlení. Snímek nedokládá výpadek v nasazení." imageWidth={726} imageHeight={1506} onOpen={openViewer} /></div><p className={styles.lensNote}><strong>Navazující průzkum</strong><span>Ve funkčním prototypu lze z Markets přejít od tématu k firmě a jejímu Financial Anatomy. Vybrané období přechází do cenového grafu firmy; hlavní návrat vede zpět k tématu, takže se neztratí původní analytická otázka. Tok používá samostatná tržní data a ověřené výkazy, nikoli důkaz příčiny změny osobního portfolia. Detail tématu přiznává pokrytí a metodiku indexu.</span></p></section>

        <section className={styles.chapter} id="next" data-story-chapter><ChapterHeading number="06" label="Výsledek a co dál" title="Funkční prototyp. Srozumitelnost ještě ověřit." /><div className={styles.lensComparison}><article><span>Co je hotové</span><h3>Propojený analytický tok.</h3><p>Dashboard, graf, výběr kontextu, Lens Insight, Evidence, deterministické výpočty a chybové stavy jsou implementované. Technické testy pokrývají výpočty a vybrané průchody rozhraním; neměří porozumění lidí.</p></article><article><span>Co není doložené</span><h3>Uživatelský dopad.</h3><p>Neproběhlo moderované testování porozumění, měření rychlosti rozhodování ani ověření dlouhodobého používání. Tyto výsledky si z prototypu nelze vyvozovat.</p></article></div><ol className={styles.lensBullets}><li><span>01</span><div><strong>Najít hlavní příspěvek změny.</strong><p>Sledovat, zda člověk odliší výnos portfolia od příspěvku jedné pozice.</p></div></li><li><span>02</span><div><strong>Ověřit tvrzení v Evidence.</strong><p>Sledovat, zda rozumí vazbě mezi větou, metrikou a obdobím.</p></div></li><li><span>03</span><div><strong>Interpretovat chybějící data.</strong><p>Sledovat, zda nedostupný údaj nečte jako nulovou hodnotu a ví, co může udělat dál.</p></div></li></ol></section>
      </div></div>
      <section className={styles.closing} aria-labelledby="closing-title"><div className={styles.closingGrid} aria-hidden="true" /><span>Lens · 2026</span><h2 id="closing-title">Jak vypadá stejný přístup v každodenní práci?</h2><p className={styles.closingBridge}>Digital Call ukazuje návrh priorit a navazujících akcí u realitních kontaktů.</p><div className={styles.closingActions}><a className={styles.primaryButton} href="/Portfolio/Projekt-no8">Prohlédnout Digital Call <Arrow /></a><a className={styles.secondaryButton} href="https://github.com/DP8778/P-2_Lens" target="_blank" rel="noreferrer">Zdrojový kód <Arrow diagonal /></a></div><footer><a href="/#work">Zpět na hlavní stránku</a><a href="/kontakt">Kontakt</a><a href="#case-content">Nahoru ↑</a></footer></section>
    </main>
    <ScreenshotViewer viewer={viewer} onClose={closeViewer} />
  </div>;
}
