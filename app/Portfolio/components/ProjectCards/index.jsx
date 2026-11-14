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

export function HeroProjectGallery({ theme, variant = "default" }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const project = selectedProjects[activeIndex];
  const interactive = variant === "interactive";

  const showNextProject = () => {
    setActiveIndex((current) => (current + 1) % selectedProjects.length);
  };

  const selectProject = (index) => {
    setActiveIndex(index);
    setCycle((current) => current + 1);
  };

  return <Localized
    as="div"
    role="group"
    aria-label="Ukázky projektů"
    className={styles.gallery}
    data-variant={variant}
    data-theme={theme}
    data-paused={isPaused ? "true" : "false"}
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    onFocusCapture={() => setIsPaused(true)}
    onBlurCapture={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false);
    }}
  >
    <Localized as="div" className={styles.galleryProgress} aria-label={interactive ? "Přepnout ukázku projektu" : undefined} aria-hidden={interactive ? undefined : "true"}>
      {selectedProjects.map((entry, index) => {
        const Segment = interactive ? "button" : "span";
        return <Segment
        className={index < activeIndex ? styles.galleryProgressComplete : index === activeIndex ? styles.galleryProgressActive : ""}
        key={entry.id}
        {...(interactive ? { type: "button", "aria-label": `Zobrazit projekt ${entry.title}`, "aria-pressed": index === activeIndex, onClick: () => selectProject(index) } : {})}
      >{index === activeIndex ? <i key={`${entry.id}-${cycle}`} onAnimationEnd={showNextProject} /> : index < activeIndex ? <i /> : null}</Segment>;
      })}
    </Localized>
    <Localized as="a" className={styles.heroProjectLink} href={project.href} aria-label={`Otevřít projekt ${project.title}`} key={interactive ? project.id : undefined}>
      <Preview project={project} theme={theme} priority key={project.id} />
      <span className={styles.galleryCaption} aria-live="polite"><span><Text>{project.galleryTitle || project.title}</Text></span><Arrow /></span>
    </Localized>
  </Localized>;
}
