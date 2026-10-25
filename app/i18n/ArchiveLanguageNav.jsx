"use client";

import LanguageToggle from "./LanguageToggle";
import { Localized, Text } from "./Text";
import styles from "./ArchiveLanguageNav.module.scss";

export default function ArchiveLanguageNav() {
  return <nav className={styles.nav} aria-label="Portfolio">
    <Localized as="a" href="/Portfolio"><Text>← Zpět na projekty</Text></Localized>
    <LanguageToggle />
  </nav>;
}
