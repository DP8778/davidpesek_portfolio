"use client";

import { useEffect, useRef, useState } from "react";
import { Prata } from "next/font/google";
import { typefaceProject } from "../../typefaceProject";
import styles from "./TypefacePreview.module.scss";
import { Text as I18nText, Localized as I18nElement } from "../../../i18n/Text";

const prata = Prata({ subsets: ["latin"], weight: "400", display: "swap" });
const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11];

export default function TypefacePreview({ hero = false } = {}) {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .1 });
    if (rootRef.current) observer.observe(rootRef.current);
    const syncVisibility = () => setVisible(document.visibilityState === "visible");
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncVisibility);
    };
  }, []);

  return <div ref={rootRef} className={`${styles.preview} ${hero ? styles.hero : ""}`} data-typeface-preview data-running={inView && visible && !paused}>
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.topline}><I18nElement as="img" src="/typeface/logo.png" alt="" width="233" height="140" loading={hero ? "eager" : "lazy"} /><span><I18nText>Studio website</I18nText></span></div>
      <p className={`${styles.headline} ${prata.className}`}><I18nText>We build brands that defy convention and change the conversation.</I18nText></p>
      <div className={styles.stage}>
        <div className={styles.ribbon}><div className={styles.track} data-typeface-track>{[...tiles, ...tiles].map((tile, index) => <I18nElement as="img" key={index} src={`/typeface/symbols/${tile}.svg`} alt="" width="192" height="192" loading={hero ? "eager" : "lazy"} decoding="async" />)}</div></div>
        <div className={styles.glass} />
      </div>
    </div>
    <button className={styles.motionControl} type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
      <span aria-hidden="true"><I18nText>{paused ? "▷" : "Ⅱ"}</I18nText></span><I18nText>{paused ? "Spustit animaci" : "Pozastavit animaci"}</I18nText>
    </button>
    <span className={styles.srOnly}><I18nText>Interaktivní výřez z hero sekce Typeface: barevné geometrické symboly se pomalu posouvají pod průsvitnou vrstvou.</I18nText></span>
  </div>;
}

export function TypefaceFeature() {
  return <section className={styles.feature} aria-labelledby="typeface-project-title" id="typeface">
    <div className={styles.featureHeading}><span><I18nText>Logo, branding &amp; web</I18nText></span><p><I18nText>Od loga k webu v pohybu.</I18nText></p></div>
    <TypefacePreview />
    <div className={styles.featureBody}>
      <div><span><I18nText>Vlastní vizuální identita a web · </I18nText><I18nText>{typefaceProject.year}</I18nText></span><h2 id="typeface-project-title"><I18nText>Typeface</I18nText></h2></div>
      <p><I18nText>{typefaceProject.description}</I18nText></p>
      <I18nElement as="a" href={typefaceProject.href}><I18nText>Prohlédnout projekt </I18nText><span aria-hidden="true">↗</span></I18nElement>
    </div>
  </section>;
}
