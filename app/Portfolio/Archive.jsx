"use client";
import usePortfolioTheme from "../usePortfolioTheme";
import ProjectHeader from "./components/ProjectHeader";
import { digitalCallProject } from "./digitalCallProject";
import { lensProject } from "./lensProject";
import { typefaceProject } from "./typefaceProject";
import { keraNaturProject } from "./keraNaturProject";
import styles from "./Archive.module.scss";

const projects = [digitalCallProject, lensProject, { ...typefaceProject, image: "/typeface/2026-10/home-desktop.webp" }, keraNaturProject];
const older = [["Teach4Future", "Projekt-no5"], ["IntertazPlus.cz", "Projekt-no6"], ["BBB Krby", "Projekt-no7"], ["Dear Diary · školní projekt", "Projekt-no4"], ["Ilustrace a grafický design", "Projekt-no1"], ["Malířství Růžička", "Projekt-no2"], ["Zámečnictví Dalešický", "Projekt-no3"]];

export default function Archive() {
  const [theme, toggleTheme] = usePortfolioTheme();
  return <div id="Web-development" className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <ProjectHeader title="Archiv projektů" theme={theme} onToggle={toggleTheme} />
    <main className={styles.main} id="projects">
      <header className={styles.intro}><span>David Pešek · portfolio</span><h1>Projekty.</h1><p>Vybrané aplikace, návrh vizuální identity a weby pro klienty. U každého projektu popisuju svoji roli a konkrétní rozhodnutí.</p></header>
      <div className={styles.featured}>{projects.map((p, i) => <a href={p.href} className={styles.project} key={p.href}>
        <div className={styles.image}><img src={p.image} alt={`Ukázka projektu ${p.title}`} width={1440} height={900} loading={i ? "lazy" : "eager"} /></div>
        <div><span>{p.role} · {p.year}</span><h2>{p.title}</h2><p>{p.description}</p><strong>Prohlédnout projekt ↗</strong></div>
      </a>)}</div>
      <section className={styles.older}><h2>Další realizace.</h2><div>{older.map(([title, slug]) => <a href={`/Portfolio/${slug}`} key={slug}>{title}<span aria-hidden="true">↗</span></a>)}</div></section>
    </main>
    <footer className={styles.footer}><a href="/#work">← Zpět na výběr projektů</a><a href="/CV-DP.pdf" target="_blank" rel="noreferrer">Životopis ↗</a><a href="mailto:david.pesek.prg@gmail.com">david.pesek.prg@gmail.com</a></footer>
  </div>;
}
