"use client";
import usePortfolioTheme from "../usePortfolioTheme";
import ProjectHeader from "./components/ProjectHeader";
import { digitalCallProject } from "./digitalCallProject";
import { lensProject } from "./lensProject";
import { typefaceProject } from "./typefaceProject";
import { keraNaturProject } from "./keraNaturProject";
import styles from "./Archive.module.scss";
import { Text as I18nText, Localized as I18nElement } from "../i18n/Text";

const projects = [digitalCallProject, lensProject, { ...typefaceProject, image: "/typeface/2026-10/home-desktop.webp" }, keraNaturProject];
const older = [["Teach4Future", "Projekt-no5"], ["IntertazPlus.cz", "Projekt-no6"], ["BBB Krby", "Projekt-no7"], ["Dear Diary · školní projekt", "Projekt-no4"], ["Ilustrace a grafický design", "Projekt-no1"], ["Malířství Růžička", "Projekt-no2"], ["Zámečnictví Dalešický", "Projekt-no3"]];

export default function Archive() {
  const [theme, toggleTheme] = usePortfolioTheme();
  return <div id="Web-development" className={`${styles.page} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
    <ProjectHeader title="Archiv projektů" theme={theme} onToggle={toggleTheme} />
    <main className={styles.main} id="projects">
      <header className={styles.intro}><span><I18nText>David Pešek · portfolio</I18nText></span><h1><I18nText>Projekty.</I18nText></h1><p><I18nText>Vybrané aplikace, návrh vizuální identity a weby pro klienty. U každého projektu popisuju svoji roli a konkrétní rozhodnutí.</I18nText></p></header>
      <div className={styles.featured}>{projects.map((p, i) => <I18nElement as="a" href={p.href} className={styles.project} key={p.href}>
        <div className={styles.image}><I18nElement as="img" src={p.image} alt={`Ukázka projektu ${p.title}`} width={1440} height={900} loading={i ? "lazy" : "eager"} /></div>
        <div><span><I18nText>{p.role}</I18nText> · <I18nText>{p.year}</I18nText></span><h2><I18nText>{p.title}</I18nText></h2><p><I18nText>{p.description}</I18nText></p><strong><I18nText>Prohlédnout projekt ↗</I18nText></strong></div>
      </I18nElement>)}</div>
      <section className={styles.older}><h2><I18nText>Další realizace.</I18nText></h2><div>{older.map(([title, slug]) => <I18nElement as="a" href={`/Portfolio/${slug}`} key={slug}><I18nText>{title}</I18nText><span aria-hidden="true">↗</span></I18nElement>)}</div></section>
    </main>
    <footer className={styles.footer}><I18nElement as="a" href="/#work"><I18nText>← Zpět na výběr projektů</I18nText></I18nElement><I18nElement as="a" href="/CV-DP.pdf" target="_blank" rel="noreferrer"><I18nText>Životopis ↗</I18nText></I18nElement><I18nElement as="a" href="mailto:david.pesek.prg@gmail.com"><I18nText>david.pesek.prg@gmail.com</I18nText></I18nElement></footer>
  </div>;
}
