"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./DigitalCallCaseStudy.module.scss";
import ProjectHeader from "../components/ProjectHeader";
import usePortfolioTheme from "../../usePortfolioTheme";
import { Text as I18nText, Localized as I18nElement } from "../../i18n/Text";

const DEMO_URL = "https://digital-call-module.vercel.app/";
const CODE_URL = "https://github.com/DP8778/digital_call_module";
function ArrowIcon({ diagonal = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d={diagonal ? "M5 15 15 5M7 5h8v8" : "M3 10h13M11 5l5 5-5 5"} />
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M7.5 3.5h-4v4M3.5 3.5l5 5M12.5 16.5h4v-4M16.5 16.5l-5-5" />
    </svg>
  );
}

function Screenshot({ desktop, mobile, fullDesktop, fullMobile, desktopSize = [1440, 900], mobileSize = [390, 1200], fullDesktopSize, fullMobileSize, alt, eyebrow, caption, priority = false, className = "", onOpen }) {
  const openViewer = (event) => {
    const isMobile = window.matchMedia("(max-width: 620px)").matches;
    const [width, height] = isMobile ? (fullMobileSize || mobileSize) : (fullDesktopSize || desktopSize);
    onOpen({
      src: isMobile ? (fullMobile || mobile || fullDesktop || desktop) : (fullDesktop || desktop),
      alt,
      eyebrow,
      caption,
      width,
      height,
    }, event.currentTarget);
  };

  return (
    <figure className={`${styles.screenshot} ${className}`}>
      <picture>
        {mobile ? <source media="(max-width: 620px)" srcSet={mobile} width={mobileSize[0]} height={mobileSize[1]} /> : null}
        <I18nElement as="img" src={desktop} alt={alt} width={desktopSize[0]} height={desktopSize[1]} loading={priority ? "eager" : "lazy"} decoding="async" />
      </picture>
      <figcaption>
        <div><span><I18nText>{eyebrow}</I18nText></span><p><I18nText>{caption}</I18nText></p></div>
        <button type="button" onClick={openViewer}>
          <ExpandIcon /><I18nText> Zvětšit obrazovku</I18nText></button>
      </figcaption>
    </figure>
  );
}

function ScreenshotViewer({ viewer, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !viewer) return undefined;

    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeRef.current?.focus());

    const keepFocusInside = (event) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(dialog.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", keepFocusInside);
    return () => {
      dialog.removeEventListener("keydown", keepFocusInside);
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [viewer]);

  if (!viewer) return null;

  const close = () => dialogRef.current?.close();

  return (
    <dialog
      ref={dialogRef}
      className={styles.lightbox}
      aria-labelledby="screenshot-viewer-title"
      aria-describedby="screenshot-viewer-caption"
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClose={onClose}
      onClick={(event) => { if (event.target === event.currentTarget) close(); }}
    >
      <div className={styles.lightboxPanel}>
        <header>
          <div>
            <span><I18nText>{viewer.eyebrow}</I18nText></span>
            <h2 id="screenshot-viewer-title"><I18nText>Detail obrazovky Digital Call</I18nText></h2>
          </div>
          <I18nElement as="button" ref={closeRef} type="button" onClick={close} aria-label="Zavřít zvětšenou obrazovku">×</I18nElement>
        </header>
        <I18nElement as="div" className={styles.lightboxViewport} tabIndex="0" aria-label="Posouvatelný náhled obrazovky">
          <I18nElement as="img"
            src={viewer.src}
            alt={viewer.alt}
            width={viewer.width}
            height={viewer.height}
          />
        </I18nElement>
        <p id="screenshot-viewer-caption"><I18nText>{viewer.caption}</I18nText></p>
      </div>
    </dialog>
  );
}

const screens = [
  [
    "queue",
    "01 · Před hovorem",
    "Na jednom místě jsou dnešní hovory i ty, které už měly proběhnout."
  ],
  [
    "detail",
    "02 · U kontaktu",
    "Poslední poznámka připomene, na čem se makléř s klientem domluvil."
  ],
  [
    "outcome",
    "03 · Po hovoru",
    "Makléř uloží výsledek a naplánuje další zavolání."
  ]
];

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

export default function DigitalCallCaseStudy() {
  const [theme, toggleTheme] = usePortfolioTheme();
  const [viewer, setViewer] = useState(null);
  const viewerOpenerRef = useRef(null);

  const openViewer = (data, trigger) => {
    viewerOpenerRef.current = trigger;
    setViewer(data);
  };

  const closeViewer = () => {
    setViewer(null);
    window.requestAnimationFrame(() => viewerOpenerRef.current?.focus());
  };

  return (
    <div className={`${styles.page} ${styles.digitalCase} ${theme === "dark" ? styles.dark : ""}`} data-theme={theme}>
      <I18nElement as="a" className={styles.skipLink} href="#case-content"><I18nText>Přeskočit na obsah</I18nText></I18nElement>

      <ProjectHeader title="Digital Call" theme={theme} onToggle={toggleTheme} demoUrl={DEMO_URL} demoLabel="Otevřít demo" />

      <main id="case-content" className={styles.brief}>
        <ReadingLine />
        <header className={styles.briefIntro}>
          <span>Digital Call · UX/UI · 2026</span>
          <h1><I18nText>Komu dnes zavolat?</I18nText></h1>
          <p><I18nText>Digital Call je pracovní prototyp pro realitní makléře, kteří si během dne domlouvají hovory s klienty. U dvou kontaktů může být stejná poznámka „zavolat později“. S jedním se ale makléř domluvil na dnešním dopoledni, zatímco druhý čeká na zprávu až příští týden. Ze samotného stavu kontaktu ten rozdíl nepozná.</I18nText></p>
          <p><I18nText>Proto jsem jako první obrazovku navrhl přehled podle termínu. Makléř vidí, co už mělo proběhnout a co ho čeká dnes. Když otevře kontakt, má před sebou poslední domluvu. Po hovoru může na stejném místě zapsat, jak dopadl, a určit, kdy se ozve znovu. Při příštím telefonátu tak ví, na co navázat.</I18nText></p>
          <a className={styles.primaryButton} href={DEMO_URL} target="_blank" rel="noreferrer"><I18nText>Vyzkoušet demo</I18nText><ArrowIcon diagonal /></a>
        </header>
        <div className={styles.briefGallery}>
          {screens.map(([key, eyebrow, caption]) => <Screenshot key={key}
            desktop={`/digital-call/handoff-${key}-desktop.png`} mobile={`/digital-call/handoff-${key}-mobile.png`}
            desktopSize={[1440, 1000]} mobileSize={[375, 812]} alt={caption} eyebrow={eyebrow}
            caption={caption} priority={key === "queue"} onOpen={openViewer} />)}
        </div>
        <footer className={styles.closingActions}>
          <I18nElement as="a" href="/Portfolio/Lens"><I18nText>Pokračovat na Lens </I18nText> →</I18nElement>
          <a href={CODE_URL}><I18nText>Zdrojový kód ↗</I18nText></a>
        </footer>
      </main>
      <ScreenshotViewer viewer={viewer} onClose={closeViewer} />
    </div>
  );
}
