import LanguageToggle from "../i18n/LanguageToggle";
import styles from "./Kontakt.module.scss"
import { Text as I18nText, Localized as I18nElement } from "../i18n/Text";

export default function Page() {
  return (
    <main className={styles.main}>
      <nav className={styles.navigation}><LanguageToggle /><I18nElement as="a" className={styles.backLink} href="/#work"><I18nText>← Zpět na projekty</I18nText></I18nElement></nav>
      <div className={styles.content}>
        <p className={styles.eyebrow}><I18nText>Kontakt</I18nText></p>
        <h1><I18nText>David Pešek</I18nText></h1>
        <p><I18nText>Máte projekt nebo pracovní příležitost? Napište mi nebo zavolejte.</I18nText></p>
        <address>
          <I18nElement as="a" href="mailto:david.pesek.prg@gmail.com"><I18nText>david.pesek.prg@gmail.com</I18nText></I18nElement>
          <I18nElement as="a" href="tel:+420739140013">+420 739 140 013</I18nElement>
          <span><I18nText>Praha / Pardubice</I18nText></span>
        </address>
      </div>
    </main>
  )
}
