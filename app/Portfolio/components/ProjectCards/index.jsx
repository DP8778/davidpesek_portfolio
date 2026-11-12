"use client";

import { useState } from "react";
import { Text, Localized } from "../../../i18n/Text";
import { selectedProjects } from "../../projectCatalog";
import { TypefaceCardArtwork } from "../TypefacePreview";
import styles from "./ProjectCards.module.scss";

function Arrow() {
  return <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

function Preview({ project, theme, priority = false }) {
  const { preview } = project;
  const image = (theme === "dark" && preview?.dark) || project.image;
  const nextImage = (theme === "dark" && preview?.nextDark) || preview?.next;

  return <div className={styles.preview} aria-hidden="true">
    {preview?.typeface ? <div className={styles.artwork}><TypefaceCardArtwork priority={priority} /></div> :
      <div className={nextImage ? styles.reel : styles.poster} data-preview-reel={nextImage ? "" : undefined}>
        {/* These images are decorative; the project name and description are below. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" loading={priority ? "eager" : "lazy"} decoding="async" />
        {nextImage && <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={nextImage} alt="" loading="lazy" decoding="async" />
        </>}
      </div>}
  </div>;
}

export function ProjectGrid({ theme, headingLevel = 3 }) {
  const Heading = `h${headingLevel}`;
  return <div className={styles.grid}>
    {selectedProjects.map((project) => <article className={styles.card} key={project.id} id={project.id === "typeface" ? "typeface" : undefined} data-project-card={project.id}>
      <Localized as="a" href={project.href} className={styles.cardLink}>
        <Preview project={project} theme={theme} />
        <div className={styles.cardText}>
          <p className={styles.meta}><Text>{project.kind}</Text> <span aria-hidden="true">·</span> <time dateTime={project.year}>{project.year}</time></p>
          <Heading className={styles.title}><Text>{project.title}</Text></Heading>
          <p className={styles.description}><Text>{project.description}</Text></p>
          <span className={styles.arrow}><Arrow /></span>
        </div>
      </Localized>
    </article>)}
  </div>;
}

export function HeroProjectGallery({ theme }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = selectedProjects[activeIndex];

  return <Localized as="div" role="group" aria-label="Ukázky projektů" className={styles.gallery} data-theme={theme}>
    <Localized as="a" className={styles.heroProjectLink} href={project.href} aria-label={`Otevřít projekt ${project.title}`}>
      <Preview project={project} theme={theme} priority key={project.id} />
      <span className={styles.galleryCaption}><span><Text>{project.galleryTitle || project.title}</Text></span><Arrow /></span>
    </Localized>
    <Localized as="div" role="group" aria-label="Přepnout projekt" className={styles.projectPicker}>
      {selectedProjects.map((entry, index) => <button
        type="button"
        key={entry.id}
        aria-pressed={activeIndex === index}
        onClick={() => setActiveIndex(index)}
      ><Text>{entry.galleryTitle || entry.title}</Text></button>)}
    </Localized>
  </Localized>;
}
