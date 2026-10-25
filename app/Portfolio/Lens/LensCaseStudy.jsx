"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectHeader from "../components/ProjectHeader";
import usePortfolioTheme from "../../usePortfolioTheme";
import styles from "./LensCaseStudy.module.scss";
import captures from "../../../public/lens/2026-10/captures.json";

gsap.registerPlugin(ScrollTrigger);

const chapters = [
  ["problem", "01", "Záměr"],
  ["interaction", "02", "Průchod AMD"],
  ["ttd", "03", "Průchod TTD"],
  ["direction", "04", "Návrhové volby"],
  ["evidence", "05", "Data a AI"],
  ["next", "06", "Výsledek"],
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

function Screenshot({ src, alt, eyebrow, caption, onOpen, priority = false, imageWidth = 1440, imageHeight = 1000, mobile, sourceLabel = "Lens · ověřené výkazy AMD" }) {
  return <figure className={styles.screenshot}>
    <div className={styles.browserBar} aria-hidden="true"><span /><span /><span /><i>{sourceLabel}</i></div>
    <picture>{mobile && <source media="(max-width: 760px)" srcSet={mobile.src} width={mobile.imageWidth} height={mobile.imageHeight} />}<img src={src} alt={alt} width={imageWidth} height={imageHeight} loading={priority ? "eager" : "lazy"} decoding="async" /></picture>
    <figcaption><div><span>{eyebrow}</span><p>{caption}</p></div><button type="button" onClick={(event) => { const image = event.currentTarget.closest("figure").querySelector("img"); onOpen({ src: image.currentSrc || src, alt, eyebrow, caption, imageWidth: image.naturalWidth || imageWidth, imageHeight: image.naturalHeight || imageHeight }); }}>↗ Zvětšit obrazovku</button></figcaption>
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
  const screens = captures.screens[theme];
  const ttdUrl = "https://p-2-lens.vercel.app/cs-CZ/assets/twelvedata%3AXNGM%3ATTD";
  const amdUrl = "https://p-2-lens.vercel.app/cs-CZ/assets/twelvedata%3AXNGS%3AAMD";
  const openViewer = (data) => { opener.current = document.activeElement; setViewer(data); };
  const closeViewer = () => { setViewer(null); requestAnimationFrame(() => opener.current?.focus()); };

  return <div className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <a className={styles.skipLink} href="#case-content">Přeskočit na obsah</a>
    <ProjectHeader title="Lens" theme={theme} onToggle={toggleTheme} demoUrl={amdUrl} demoLabel="Otevřít Lens" />
    <main id="case-content">
      <section className={styles.hero} aria-labelledby="page-title">
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>Product design · Data visualization · 2026</span>
          <h1 id="page-title">Lens</h1>
          <p className={styles.heroClaim}>Od čísel k pochopení firmy.</p>
          <p className={styles.heroIntro}>Lens propojuje hospodaření, strukturu tržeb a tržní kontext. AMD a The Trade Desk ukazují, jak přizpůsobit výklad různým obchodním modelům, místo aby se firma musela vejít do jedné šablony.</p>
          <ol className={styles.quickDecisions} aria-label="Hlavní otázky studie"><li><a href="#interaction"><span>01</span>Čím firma vydělává?</a></li><li><a href="#interaction-market"><span>02</span>Kde soutěží a kdo vede?</a></li><li><a href="#evidence"><span>03</span>O jaká data se závěr opírá?</a></li></ol>
          <div className={styles.heroActions}><a className={styles.primaryButton} href={amdUrl} target="_blank" rel="noreferrer">Otevřít AMD v Lens <Arrow diagonal /></a><a className={styles.secondaryButton} href={ttdUrl} target="_blank" rel="noreferrer">Otevřít TTD <Arrow diagonal /></a><a className={styles.secondaryButton} href="#problem">Prozkoumat návrh <Arrow /></a></div>
        </div>
        <div className={styles.heroVisual}><Screenshot {...screens.overview} alt="Lens: hospodaření AMD FY2021 až FY2025, tržby, provozní a čistý zisk se samostatnou volbou ceny akcie" eyebrow="Funkční detail AMD" caption="Roční hospodaření má vlastní měřítko a zdroje. Cena akcie je samostatný pohled; při nedostupnosti cen zůstávají ověřené výkazy čitelné." onOpen={openViewer} priority /></div>
        <dl className={styles.facts}><div><dt>Forma</dt><dd>Vlastní produktový prototyp</dd></div><div><dt>Průchod</dt><dd>AMD + The Trade Desk · dva modely</dd></div><div><dt>Moje práce</dt><dd>Produktový návrh, UI a front-end</dd></div><div><dt>Data</dt><dd>Firemní výkazy a datované tržní odhady</dd></div><div><dt>Technologie</dt><dd>React, Next.js, TypeScript</dd></div></dl>
      </section>
      <ChapterNavigation />
      <div className={styles.story} ref={storyRef}><StoryLine rootRef={storyRef} /><div className={styles.storyContent}>

        <section className={styles.chapter} id="problem" data-story-chapter>
          <ChapterHeading number="01" label="Záměr" title="Spojit informace, které samy o sobě nestačí." />
          <div className={styles.editorialSplit}><div className={styles.bodyCopy}><p>Při zkoumání technologické firmy člověk přechází mezi cenovým grafem, výroční zprávou a údaji o konkurenci. Každý zdroj používá jiné období nebo jiný význam procent. Rozhraní musí pomoct tyto vrstvy správně propojit.</p><p>Začal jsem u AMD: více segmentů, proměna tržeb a konkrétně vymezená konkurence. Jedna dobře vypadající obrazovka ale ještě neověřuje návrh pro jiný model. The Trade Desk proto přidává platformu, kde objem zprostředkované reklamy není tržbou firmy. Tyto firmy nejsou přímí konkurenti.</p></div><blockquote><span>Návrhová otázka</span>Jak firma vydělává a jakou pozici má na svých trzích?</blockquote></div>
        </section>

        <section className={styles.chapter} id="interaction" data-story-chapter>
          <ChapterHeading number="02" label="Průchod AMD" title="Od firmy k trhu ve třech krocích." intro="Horní graf ukáže vývoj hospodaření. Následující vrstvy vysvětlují jeho strukturu a zasazují firmu do konkurence." />
          <div className={styles.researchStep}><span>01 / Zdroje tržeb</span><h3>Nejdřív pochopit, co firma prodává.</h3><p>Prstencový graf ukazuje podíl tří vykázaných segmentů. Částka, podíl i meziroční změna zůstávají viditelné. Přepnutí roku umožňuje prozkoumat proměnu struktury bez hledání další tabulky.</p></div>
          <Screenshot {...screens.revenue} mobile={screens.mobile} alt="Struktura tržeb AMD za FY2025: prstencový graf segmentů Data Center, Client and Gaming a Embedded, částky, podíly a růst" eyebrow="Struktura tržeb · FY2025" caption="Koláč ukazuje složení tržeb. Viditelné částky zachovávají absolutní velikost; FY2024 používá srovnatelnou, retrospektivně upravenou strukturu segmentů." onOpen={openViewer} />
          <div className={styles.researchStep} id="interaction-market"><span>02 / Tržní kontext</span><h3>Podíl dává smysl až s vymezeným trhem.</h3><p>Serverové procesory x86 a samostatné grafické karty pro PC mají jiné konkurenty i velikost. Proto má každý pohled vlastní období, definici a jednotku. Širší tržby odvětví jsou označené zvlášť.</p></div>
          <Screenshot {...screens.market} mobile={screens.marketMobile} alt="Trh samostatných grafických karet pro stolní PC za Q2 2026: odhad podílu AMD, NVIDIA a Intel na dodaných kusech a celkový počet karet" sourceLabel="Lens · odhady trhu AIB, Q2 2026" eyebrow="Jeden konkrétní trh" caption="Tento pohled se týká desktopových grafických karet a kusových podílů. Nevypovídá o trhu AI akcelerátorů ani o podílu na tržbách." onOpen={openViewer} />
          <div className={styles.researchStep}><span>03 / Konkurenční výhoda</span><h3>Vedle velikosti porovnat i způsob podnikání.</h3><p>AMD, NVIDIA a Intel skládají nabídku a výrobu odlišně. Srovnání proto doplňuje produktové zaměření, strategii a konkrétní otázku, kterou má smysl dál sledovat.</p></div>
          <Screenshot {...screens.business} mobile={screens.businessMobile} alt="Obchodní modely a strategie v Lens, se zdrojovým odkazem a označenou interpretací; na mobilu detail AMD" sourceLabel="Lens · firemní zdroje a označená interpretace" eyebrow="Byznys model a strategie" caption="Popis nabídky a strategie vychází z firemních zdrojů. Část „Co sledovat“ je interpretace Lens. Mobilní výřez ukazuje kartu AMD." onOpen={openViewer} />
        </section>

        <section className={styles.chapter} id="ttd" data-story-chapter>
          <ChapterHeading number="03" label="Průchod The Trade Desk" title="Jiný model potřebuje jiný výklad." intro="Agentury a inzerenti platí za nákupní reklamní platformu, služby a data. Gross spend měří objem klientských výdajů; vykázané tržby používají převážně netto základ." />
          <Screenshot {...screens.ttdOverview} sourceLabel="Lens · ověřené výkazy The Trade Desk" mobile={screens.ttdMobile} alt="Skutečný graf The Trade Desk v Lens: historie tržeb, provozního a čistého zisku FY2023–FY2025" eyebrow="TTD · jeden provozní segment" caption="Stejný navigátor a graf hospodaření jako u AMD. Uložený profil a výkazy jsou dostupné i bez cenového API a AI." onOpen={openViewer} />
          <div className={styles.researchStep}><span>Rozhodnutí / porovnání místo koláče</span><h3>13,39 miliardy výdajů není 13,39 miliardy tržeb.</h3><p>Vedle sebe ukazuji gross spend a netto tržby ve stejném měřítku. Poměr 21,62 % pro FY2025 je výpočet nad těmito veličinami; nevydávám ho za smluvní sazbu nebo podíl na trhu. U AMD naopak zůstává donut skutečných výnosových segmentů.</p></div>
          <Screenshot {...screens.ttdEconomics} mobile={screens.ttdEconomicsMobile} sourceLabel="Lens · The Trade Desk · gross spend a revenue" alt="The Trade Desk FY2023–FY2025: porovnání gross spend a vykázaných tržeb s odvozeným poměrem a odkazy na zdroje" eyebrow="Ekonomika reklamní platformy" caption="Částky, význam i omezení jsou viditelné bez hoveru. Nákladová cesta navazuje rovnou na provozní výdaje; TTD samostatný hrubý zisk nevykazuje." onOpen={openViewer} />
          <div className={styles.bodyCopy}><p>Výsledovku jsem proto rozšířil o výslovnou variantu bez hrubého zisku. Náklady se započítají jednou a tři roční období zůstávají použitelná v historii. Tržní kontext odděluje americký odhad internetové reklamy od globálních údajů TTD a srovnává modely TTD, Googlu a Amazonu kvalitativně, bez vymyšlených podílů.</p></div>
          <a className={styles.secondaryButton} href={ttdUrl} target="_blank" rel="noreferrer">Otevřít The Trade Desk v Lens <Arrow diagonal /></a>
        </section>

        <section className={styles.chapter} id="direction" data-story-chapter>
          <ChapterHeading number="04" label="Návrhové volby" title="Hierarchie, která drží význam dat." />
          <div className={styles.decisionList}>
            <article><span>01 / Pořadí informací</span><h3>Vývoj → tržby → konkurence.</h3><p>Každá vrstva odpovídá na další otázku. Rychlé odkazy umožňují přeskočit přímo k tématu; metodika zůstává dostupná v rozbalení.</p><small>Kompromis: detail je stále delší stránka. Jeho srozumitelnost závisí i na jasných nadpisech a orientaci.</small></article>
            <article><span>02 / Volba grafu</span><h3>Složení vidím. Přesné hodnoty přečtu.</h3><p>Koláč slouží k rychlému čtení poměrů; vedlejší seznam doplňuje názvy, částky, podíly a změny. Význam tak nezávisí na hoveru ani samotné barvě.</p><small>Kompromis: velikost koláče neporovnává celkové tržby mezi roky. Tuto roli přebírá zobrazená částka a historický graf.</small></article>
            <article><span>03 / Vizuální systém</span><h3>Dva motivy, stejná orientace.</h3><p>Světlé minerální plochy, modrý akcent a měděné detaily dávají Lens vlastní charakter. Tmavý motiv zachovává stejnou hierarchii i barvy datových řad v upraveném kontrastu.</p><small>Na mobilu se legenda skládá pod graf. Přepínače i zdroje zůstávají dostupné.</small></article>
          </div>
          <div className={styles.responsiveProof}><div><span className={styles.chapterKicker}>Detail na mobilu</span><h3>Hodnoty zůstávají přímo u grafu.</h3><p>Otevřené údaje se vejdou do jedné čtecí osy. Rozhraní nevyžaduje přesný pohyb kurzoru, aby člověk zjistil základní strukturu tržeb.</p><p className={styles.captureHint}>Přepnutí motivu nahoře mění i autentické snímky aplikace v této studii.</p></div><Screenshot {...screens.mobile} alt="Mobilní Lens: čitelný prstencový graf tržeb AMD a legenda s částkami, podíly a meziroční změnou" eyebrow="390 px · responzivní detail" caption="Stejná data a ovládání jako na desktopu, v jedné svislé ose." onOpen={openViewer} /></div>
        </section>

        <section className={styles.chapter} id="evidence" data-story-chapter>
          <ChapterHeading number="05" label="Data a AI" title="Zdroj, výpočet a interpretace mají vlastní roli." />
          <dl className={styles.dataLayers}><div><dt>Firemní výkazy</dt><dd>Hospodaření AMD FY2021–FY2025 používá srovnatelné konsolidované GAAP výkazy. Složení segmentů FY2024 je upravené podle struktury vykázané pro FY2025. The Trade Desk používá FY2023–FY2025 a vlastní účetní prezentaci bez mezisoučtu hrubého zisku. Zdroje a období jsou dostupné u grafů.</dd></div><div><dt>Tržní odhady</dt><dd>Podíly CPU a desktopových grafik patří do Q2 2026 a měří dodané kusy. Širší tržby logických čipů patří do kalendářního roku 2025. Odlišné základy se neskládají do jednoho procenta.</dd></div><div><dt>Výpočty a AI</dt><dd>Podíly, meziroční změny a vysvětlení růstu počítá datová vrstva. AI je volitelná vrstva pro formulaci a firemní výzkum; srovnání trhů v tomto průchodu používá připravený datový snapshot se zdroji.</dd></div></dl>
          <details className={styles.supportingModule}><summary>Jak Lens navazuje na analýzu portfolia</summary><div><p>Portfolio zůstává druhou úrovní produktu: vývoj hodnoty, příspěvky jednotlivých pozic, poklesy a vysvětlení s dohledatelnými metrikami. Tato obrazovka používá pevný syntetický dataset; firemní výkazy v detailech AMD a TTD mají samostatné skutečné zdroje.</p><Screenshot {...screens.portfolio} alt="Lens: graf výkonu syntetického demo portfolia a související Lens Insight" sourceLabel="Lens · syntetické demo portfolio" eyebrow="Navazující analytický modul" caption="Souhrn, graf a vysvětlení pracují se stejným obdobím. Demo hodnoty nejsou živá tržní data." onOpen={openViewer} /></div></details>
        </section>

        <section className={styles.chapter} id="next" data-story-chapter>
          <ChapterHeading number="06" label="Výsledek" title="Funkční průchod s konkrétními hranicemi." />
          <div className={styles.editorialSplit}><div className={styles.bodyCopy}><p>Výsledkem je nasazený prototyp s historií hospodaření, přepínáním let, strukturou tržeb, dvěma vymezenými trhy a srovnáním obchodních modelů. Světlý a tmavý motiv používají společný systém komponent.</p><p>Dva připravené příklady ověřují různou strukturu podnikání: AMD má segmentový rozpad, TTD porovnání reklamních výdajů a tržeb. Nejde o plošné pokrytí všech firem. Dostupnost aktuálních cen a rozšířeného AI výzkumu závisí na externích službách. Implementace vzniká s podporou Codexu; tato studie ukazuje návrhové volby a ověřitelný stav produktu.</p></div><blockquote><span>Co dál ověřit s lidmi</span>Dokáže člověk z dat sestavit vlastní, správně vymezený závěr?</blockquote></div>
          <ul className={styles.validationTasks}><li>Rozlišit podíl segmentu na tržbách AMD od podílu AMD na konkrétním trhu.</li><li>Popsat rozdíl mezi AMD a největším konkurentem na vybraném trhu.</li><li>Vysvětlit rozdíl mezi gross spend a tržbami TTD bez záměny s tržním podílem.</li><li>Najít zdroj, období a omezení údaje, o který se závěr opírá.</li></ul>
          <p className={styles.captureHint}>Technické ověření pokrývá výpočty, ovládání a responzivitu. Uživatelské porozumění těmto otázkám zatím nebylo testované.</p>
        </section>
      </div></div>
      <section className={styles.closing} aria-labelledby="closing-title"><div className={styles.closingGrid} aria-hidden="true" /><span>Lens · 2026</span><h2 id="closing-title">Prozkoumat firmu v kontextu.</h2><p className={styles.closingBridge}>Otevřete AMD se segmentovou strukturou, nebo The Trade Desk s ekonomikou reklamní platformy.</p><div className={styles.closingActions}><a className={styles.primaryButton} href={amdUrl} target="_blank" rel="noreferrer">Otevřít AMD v Lens <Arrow diagonal /></a><a className={styles.secondaryButton} href={ttdUrl} target="_blank" rel="noreferrer">Otevřít The Trade Desk <Arrow diagonal /></a></div><footer><a href="/#work">Zpět na hlavní stránku</a><a href="/Portfolio/Typeface">Další projekt: Typeface →</a><a href="https://github.com/DP8778/P-2_Lens" target="_blank" rel="noreferrer">Zdrojový kód ↗</a><a href="#case-content">Nahoru ↑</a></footer></section>
    </main>
    <ScreenshotViewer viewer={viewer} onClose={closeViewer} />
  </div>;
}
