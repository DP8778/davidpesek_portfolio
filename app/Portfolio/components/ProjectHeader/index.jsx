"use client";

import LanguageToggle from "../../../i18n/LanguageToggle";
import styles from "./ProjectHeader.module.scss";
import { Text as I18nText, Localized as I18nElement } from "../../../i18n/Text";

export default function ProjectHeader({ title, theme, onToggle, demoUrl, demoLabel = "Otevřít demo" }) {
  return <header className={styles.header}>
    <I18nElement as="a" className={styles.back} href="/#work"><I18nText>← Zpět na projekty</I18nText></I18nElement>
    <span className={styles.label}><I18nText>{title}</I18nText></span>
    <div className={styles.actions}>
      <LanguageToggle />
      <I18nElement as="button" type="button" className={styles.toggle} onClick={onToggle} aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}><span aria-hidden="true"><I18nText>{theme === "light" ? "☾" : "☼"}</I18nText></span></I18nElement>
      {demoUrl && <I18nElement as="a" className={styles.demo} href={demoUrl} target="_blank" rel="noreferrer"><I18nText>{demoLabel}</I18nText> ↗</I18nElement>}
    </div>
  </header>;
}
