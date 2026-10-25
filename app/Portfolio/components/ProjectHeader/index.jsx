"use client";

import styles from "./ProjectHeader.module.scss";

export default function ProjectHeader({ title, theme, onToggle, demoUrl, demoLabel = "Otevřít demo" }) {
  return <header className={styles.header}>
    <a className={styles.back} href="/#work">← Zpět na projekty</a>
    <span className={styles.label}>{title}</span>
    <div className={styles.actions}>
      <button type="button" className={styles.toggle} onClick={onToggle} aria-label={`Přepnout na ${theme === "light" ? "tmavý" : "světlý"} režim`}><span aria-hidden="true">{theme === "light" ? "☾" : "☼"}</span></button>
      {demoUrl && <a className={styles.demo} href={demoUrl} target="_blank" rel="noreferrer">{demoLabel} ↗</a>}
    </div>
  </header>;
}
