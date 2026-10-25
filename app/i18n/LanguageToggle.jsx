"use client";

import { usePortfolioLanguage } from "./LanguageProvider";
import styles from "./LanguageToggle.module.scss";

export default function LanguageToggle() {
  const { language, setLanguage } = usePortfolioLanguage();
  const next = language === "cs" ? "en" : "cs";
  const label = language === "cs" ? "Přepnout do angličtiny" : "Switch to Czech";
  return <button type="button" className={styles.toggle} onClick={() => setLanguage(next)}
    aria-label={label}
    title={label}
    data-language-toggle>
    <span lang={next}>{next === "en" ? "EN" : "CZ"}</span>
  </button>;
}
