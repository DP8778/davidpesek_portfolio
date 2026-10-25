"use client";

import { useEffect, useRef, useState } from "react";
import usePortfolioTheme from "../../../usePortfolioTheme";
import ProjectHeader from "../ProjectHeader";
import styles from "./VisualProjectShell.module.scss";

export default function VisualProjectShell({ project, label, headline, intro, heroVisual, children }) {
  const [theme, toggleTheme] = usePortfolioTheme();
  return <div className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <a className={styles.skipLink} href="#project-content">Přeskočit na obsah</a>
    <ProjectHeader title={project.title} theme={theme} onToggle={toggleTheme} demoUrl={project.demoUrl} demoLabel="Otevřít web" />
    <main id="project-content">
      <div className={`${styles.intro} ${heroVisual ? styles.visualIntro : ""}`}>
        <div className={styles.introCopy}><span>{label} · {project.year}</span><h1>{project.title}</h1><h2>{headline}</h2><p>{intro}</p><div className={styles.role}>Moje práce: {project.role}</div></div>
        {heroVisual && <div className={styles.heroVisual}>{heroVisual}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </main>
    <footer className={styles.footer}><a href="/#work">← Zpět na projekty</a><a href={project.title === "Typeface" ? "/Portfolio/Kera-Natur" : "/Portfolio/Projekt-no8"}>{project.title === "Typeface" ? "Další projekt: Kera Natur" : "Další projekt: Digital Call"} →</a><a href={project.demoUrl} target="_blank" rel="noreferrer">Otevřít {project.title} ↗</a>{project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer">Zdrojový kód ↗</a>}</footer>
  </div>;
}

export function ProjectDecisions({ title, items }) {
  return <section className={styles.decisions} aria-label={title}><h2>{title}</h2><div>{items.map((item, index) => <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>;
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

  return <section className={styles.screenshots} aria-label={title}>
    <h2>{title}</h2>
    <div className={styles.screenshotGrid}>{images.map((image) => <figure key={image.src} data-mobile={image.width < 600}>
      <button type="button" className={styles.imageButton} aria-label={`Zvětšit: ${image.caption}`} onClick={(event) => { opener.current = event.currentTarget; setViewer(image); }}><img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" /><span aria-hidden="true">↗ Zvětšit</span></button>
      <figcaption>{image.caption}</figcaption>
    </figure>)}</div>
    {viewer && <dialog ref={dialogRef} className={styles.viewer} aria-label={viewer.caption} onCancel={(event) => { event.preventDefault(); setViewer(null); }} onClick={(event) => { if (event.target === event.currentTarget) setViewer(null); }}>
      <div><p>{viewer.caption}</p><button type="button" autoFocus onClick={() => setViewer(null)}>Zavřít ×</button></div><img src={viewer.src} alt={viewer.alt} width={viewer.width} height={viewer.height} />
    </dialog>}
  </section>;
}
