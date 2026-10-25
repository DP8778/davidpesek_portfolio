"use client";

import { useEffect, useRef, useState } from "react";
import { Prata } from "next/font/google";
import { typefaceProject } from "../../typefaceProject";
import styles from "./TypefacePreview.module.scss";

const prata = Prata({ subsets: ["latin"], weight: "400", display: "swap" });
const tiles = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 11];

export default function TypefacePreview() {
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

  return <div ref={rootRef} className={styles.preview} data-typeface-preview data-running={inView && visible && !paused}>
    <div className={styles.visual} aria-hidden="true">
      <div className={styles.topline}><img src="/typeface/logo.png" alt="" width="233" height="140" loading="lazy" /><span>Studio website</span></div>
      <p className={`${styles.headline} ${prata.className}`}>We build brands that defy convention and change the conversation.</p>
      <div className={styles.stage}>
        <div className={styles.ribbon}><div className={styles.track} data-typeface-track>{[...tiles, ...tiles].map((tile, index) => <img key={index} src={`/typeface/symbols/${tile}.svg`} alt="" width="192" height="192" loading="lazy" decoding="async" />)}</div></div>
        <div className={styles.glass} />
      </div>
    </div>
    <button className={styles.motionControl} type="button" aria-pressed={paused} onClick={() => setPaused((value) => !value)}>
      <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{paused ? "Spustit animaci" : "Pozastavit animaci"}
    </button>
    <span className={styles.srOnly}>Interaktivní výřez z hero sekce Typeface: barevné geometrické symboly se pomalu posouvají pod průsvitnou vrstvou.</span>
  </div>;
}

export function TypefaceFeature() {
  return <section className={styles.feature} aria-labelledby="typeface-project-title" id="typeface">
    <div className={styles.featureHeading}><span>Web design & motion</span><p>Typografie, kompozice a pohyb.</p></div>
    <TypefacePreview />
    <div className={styles.featureBody}>
      <div><span>Koncept webu pro grafické studio · {typefaceProject.year}</span><h2 id="typeface-project-title">Typeface</h2></div>
      <p>{typefaceProject.description}</p>
      <a href={typefaceProject.href}>Prohlédnout projekt <span aria-hidden="true">↗</span></a>
    </div>
  </section>;
}
