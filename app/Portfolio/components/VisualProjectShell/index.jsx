"use client";

import { useEffect, useRef, useState } from "react";
import usePortfolioTheme from "../../../usePortfolioTheme";
import { ThemeToggle } from "../../../../stories/redesign/RedesignHome03J";
import styles from "./VisualProjectShell.module.scss";

export default function VisualProjectShell({ project, label, headline, intro, children }) {
  const [theme, toggleTheme] = usePortfolioTheme();
  return <div className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <header className={styles.header}>
      <a href="/#work" className={styles.back}>← Zpět na projekty</a>
      <div><a href={project.demoUrl} target="_blank" rel="noreferrer" aria-label={`Otevřít web ${project.title}`}><span className={styles.desktopLabel}>Otevřít </span>web ↗</a><ThemeToggle theme={theme} onToggle={toggleTheme} /></div>
    </header>
    <main id="project-content">
      <div className={styles.intro}><span>{label} · {project.year}</span><h1>{project.title}</h1><h2>{headline}</h2><p>{intro}</p><div className={styles.role}>{project.role}</div></div>
      <div className={styles.content}>{children}</div>
    </main>
    <footer className={styles.footer}><a href="/#typeface">← Zpět na výběr webů</a><a href={project.demoUrl} target="_blank" rel="noreferrer">Otevřít {project.title} ↗</a>{project.sourceUrl && <a href={project.sourceUrl} target="_blank" rel="noreferrer">Zdrojový kód ↗</a>}</footer>
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
    dialogRef.current.showModal();
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = overflow; opener.current?.focus({ preventScroll: true }); };
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
