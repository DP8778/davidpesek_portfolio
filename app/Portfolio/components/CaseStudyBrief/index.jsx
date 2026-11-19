"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Localized, Text } from "../../../i18n/Text";
import usePortfolioTheme from "../../../usePortfolioTheme";
import ProjectHeader from "../ProjectHeader";
import styles from "./CaseStudyBrief.module.scss";

function DemoArrow() {
  return <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8" /></svg>;
}

function Screenshot({ screen, priority, onOpen }) {
  const img = useRef(null);
  const { desktop, mobile, label, caption, alt, demo } = screen;

  function enlarge(event) {
    const { currentSrc, naturalWidth, naturalHeight } = img.current;
    onOpen({
      label, caption, alt, src: currentSrc || desktop.src,
      width: naturalWidth || desktop.imageWidth, height: naturalHeight || desktop.imageHeight,
    }, event.currentTarget);
  }

  return (
    <figure id={screen.id} className={styles.screenshot}>
      <picture>
        {mobile && <source media="(max-width: 620px)" srcSet={mobile.src} width={mobile.imageWidth} height={mobile.imageHeight} />}
        <Localized as="img" ref={img} src={desktop.src} width={desktop.imageWidth} height={desktop.imageHeight}
          alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" />
      </picture>
      <figcaption>
        <div>
          <span><Text>{label}</Text></span>
          <p><Text>{caption}</Text></p>
          {demo && <Localized as="a" href={demo.href} target="_blank" rel="noreferrer"><Text>{demo.label}</Text></Localized>}
        </div>
        <button type="button" onClick={enlarge}>
          <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M7.5 3.5h-4v4M3.5 3.5l5 5M12.5 16.5h4v-4M16.5 16.5l-5-5" /></svg>
          <Text>Zvětšit obrazovku</Text>
        </button>
      </figcaption>
    </figure>
  );
}

function ScreenshotViewer({ image, title, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const viewport = useRef(null);
  const titleId = useId();
  const captionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    closeRef.current.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key !== "Tab") return;
    if (event.shiftKey && document.activeElement === closeRef.current) {
      event.preventDefault();
      viewport.current.focus();
    } else if (!event.shiftKey && document.activeElement === viewport.current) {
      event.preventDefault();
      closeRef.current.focus();
    }
  }

  return (
    <dialog ref={dialogRef} className={styles.lightbox} aria-labelledby={titleId} aria-describedby={captionId}
      onKeyDown={handleKeyDown} onClose={event => { if (!event.currentTarget.open) onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) dialogRef.current.close(); }}>
      <div className={styles.lightboxPanel}>
        <header>
          <div><span><Text>{image.label}</Text></span><h2 id={titleId}><Text>{title}</Text></h2></div>
          <Localized as="button" ref={closeRef} type="button" aria-label="Zavřít zvětšenou obrazovku" onClick={() => dialogRef.current.close()}>×</Localized>
        </header>
        <Localized as="div" ref={viewport} className={styles.lightboxViewport} tabIndex={0} aria-label="Posouvatelný náhled obrazovky">
          <Localized as="img" src={image.src} alt={image.alt} width={image.width} height={image.height} />
        </Localized>
        <p id={captionId}><Text>{image.caption}</Text></p>
      </div>
    </dialog>
  );
}

function ReadingLine() {
  const rail = useRef(null);
  useEffect(() => {
    const node = rail.current;
    let frame = 0;
    const update = () => {
      frame = 0;
      const { top, height } = node.getBoundingClientRect();
      const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      const progress = atEnd ? 1 : Math.min(1, Math.max(0, (window.innerHeight * .55 - top) / Math.max(height, 1)));
      node.style.setProperty("--read", progress);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const observer = new ResizeObserver(schedule);
    observer.observe(node);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);
  return <span ref={rail} className={styles.readingLine} aria-hidden="true" />;
}

export default function CaseStudyBrief({ project, eyebrow, question, intro, screens, demoUrl, sourceUrl, next }) {
  const [theme, toggleTheme] = usePortfolioTheme();
  const [viewer, setViewer] = useState(null);
  const opener = useRef(null);

  function openViewer(image, button) {
    opener.current = button;
    setViewer(image);
  }
  function closeViewer() {
    setViewer(null);
    requestAnimationFrame(() => opener.current?.focus());
  }

  return (
    <div className={styles.page} data-theme={theme} data-project={project}>
      <Localized as="a" className={styles.skipLink} href="#case-content"><Text>Přeskočit na obsah</Text></Localized>
      <ProjectHeader title={project} theme={theme} onToggle={toggleTheme} demoUrl={demoUrl} />
      <main id="case-content" className={styles.brief}>
        <ReadingLine />
        <header id="problem" className={styles.briefIntro}>
          <span><Text>{eyebrow}</Text></span>
          <h1 id="page-title"><Text>{question}</Text></h1>
          {intro.map(paragraph => <p key={paragraph}><Text>{paragraph}</Text></p>)}
          <Localized as="a" className={styles.primaryButton} href={demoUrl} target="_blank" rel="noreferrer">
            <Text>Vyzkoušet demo</Text><DemoArrow />
          </Localized>
        </header>
        <div className={styles.briefGallery}>
          {screens[theme].map((screen, index) => <Screenshot key={screen.id} screen={screen} priority={index === 0} onOpen={openViewer} />)}
        </div>
        <footer id="next" className={styles.closingActions}>
          <Localized as="a" href={next.href}><Text>{next.label}</Text> →</Localized>
          <a href={sourceUrl}><Text>Zdrojový kód ↗</Text></a>
        </footer>
      </main>
      {viewer && <ScreenshotViewer image={viewer} title={`Detail obrazovky ${project}`} onClose={closeViewer} />}
    </div>
  );
}
