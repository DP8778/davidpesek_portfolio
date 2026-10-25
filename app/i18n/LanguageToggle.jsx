"use client";

import { usePortfolioLanguage } from "./LanguageProvider";
import styles from "./LanguageToggle.module.scss";

export default function LanguageToggle() {
  const { language, setLanguage } = usePortfolioLanguage();
  const next = language === "cs" ? "en" : "cs";
  return <button type="button" className={styles.toggle} onClick={() => setLanguage(next)}
    aria-label={next === "en" ? "Switch to English" : "Přepnout do češtiny"}
    title={next === "en" ? "Switch to English" : "Přepnout do češtiny"}
    data-language-toggle>
    <span lang={next}>{next === "en" ? "EN" : "CZ"}</span>
  </button>;
}
