"use client";

import { useEffect, useRef, useState } from "react";
import usePortfolioTheme from "../../../usePortfolioTheme";
import ProjectHeader from "../ProjectHeader";
import styles from "./VisualProjectShell.module.scss";
import { Text as I18nText, Localized as I18nElement } from "../../../i18n/Text";

export default function VisualProjectShell({ project, label, headline, intro, heroVisual, children }) {
  const [theme, toggleTheme] = usePortfolioTheme();
  return <div className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <I18nElement as="a" className={styles.skipLink} href="#project-content"><I18nText>Přeskočit na obsah</I18nText></I18nElement>
    <ProjectHeader title={project.title} theme={theme} onToggle={toggleTheme} demoUrl={project.demoUrl} demoLabel="Otevřít web" />
    <main id="project-content">
      <div className={`${styles.intro} ${heroVisual ? styles.visualIntro : ""}`}>
        <div className={styles.introCopy}><span><I18nText>{label}</I18nText> · <I18nText>{project.year}</I18nText></span><h1><I18nText>{project.title}</I18nText></h1><h2><I18nText>{headline}</I18nText></h2><p><I18nText>{intro}</I18nText></p><div className={styles.role}><I18nText>Moje práce: </I18nText><I18nText>{project.role}</I18nText></div></div>
        {heroVisual && <div className={styles.heroVisual}>{heroVisual}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </main>
    <footer className={styles.footer}><I18nElement as="a" href="/#work"><I18nText>← Zpět na projekty</I18nText></I18nElement><I18nElement as="a" href={project.title === "Typeface" ? "/Portfolio/Kera-Natur" : "/Portfolio/Projekt-no8"}><I18nText>{project.title === "Typeface" ? "Další projekt: Kera Natur" : "Další projekt: Digital Call"}</I18nText> →</I18nElement><I18nElement as="a" href={project.demoUrl} target="_blank" rel="noreferrer"><I18nText>Otevřít </I18nText><I18nText>{project.title}</I18nText> ↗</I18nElement>{project.sourceUrl && <I18nElement as="a" href={project.sourceUrl} target="_blank" rel="noreferrer"><I18nText>Zdrojový kód ↗</I18nText></I18nElement>}</footer>
  </div>;
}

export function ProjectDecisions({ title, items }) {
  return <I18nElement as="section" className={styles.decisions} aria-label={title}><h2><I18nText>{title}</I18nText></h2><div>{items.map((item, index) => <article key={item.title}><span>0<I18nText>{index + 1}</I18nText></span><h3><I18nText>{item.title}</I18nText></h3><p><I18nText>{item.text}</I18nText></p></article>)}</div></I18nElement>;
}

export function ProjectScreenshots({ title = "Web na různých obrazovkách", images }) {
  const [viewer, setViewer] = useState(null);
  const dialogRef = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    if (!viewer || !dialogRef.current) return undefined;
    const overflow = document.body.style.overflow;
    const dialog = dialogRef.current;
    dialog.showModal();
    const trapFocus = (event) => {
      if (event.key !== "Tab") return;
      const controls = Array.from(dialog.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])'));
      const first = controls[0], last = controls.at(-1);
      if (!first) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    dialog.addEventListener("keydown", trapFocus);
    document.body.style.overflow = "hidden";
    return () => { dialog.removeEventListener("keydown", trapFocus); document.body.style.overflow = overflow; opener.current?.focus({ preventScroll: true }); };
  }, [viewer]);

  return <I18nElement as="section" className={styles.screenshots} aria-label={title}>
    <h2><I18nText>{title}</I18nText></h2>
    <div className={styles.screenshotGrid}>{images.map((image) => <figure key={image.src} data-mobile={image.width < 600}>
      <I18nElement as="button" type="button" className={styles.imageButton} aria-label={`Zvětšit: ${image.caption}`} onClick={(event) => { opener.current = event.currentTarget; setViewer(image); }}><I18nElement as="img" src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" /><span aria-hidden="true"><I18nText>↗ Zvětšit</I18nText></span></I18nElement>
      <figcaption><I18nText>{image.caption}</I18nText></figcaption>
    </figure>)}</div>
    {viewer && <I18nElement as="dialog" ref={dialogRef} className={styles.viewer} aria-label={viewer.caption} onCancel={(event) => { event.preventDefault(); setViewer(null); }} onClick={(event) => { if (event.target === event.currentTarget) setViewer(null); }}>
      <div><p><I18nText>{viewer.caption}</I18nText></p><button type="button" autoFocus onClick={() => setViewer(null)}><I18nText>Zavřít ×</I18nText></button></div><I18nElement as="img" src={viewer.src} alt={viewer.alt} width={viewer.width} height={viewer.height} />
    </I18nElement>}
  </I18nElement>;
}
