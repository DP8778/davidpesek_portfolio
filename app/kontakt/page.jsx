import styles from "./Kontakt.module.scss"

export default function Page() {
  return (
    <main className={styles.main}>
      <a className={styles.backLink} href="/#work">← Zpět na projekty</a>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Kontakt</p>
        <h1>David Pešek</h1>
        <p>Máte projekt nebo pracovní příležitost? Napište mi nebo zavolejte.</p>
        <address>
          <a href="mailto:david.pesek.prg@gmail.com">david.pesek.prg@gmail.com</a>
          <a href="tel:+420739140013">+420 739 140 013</a>
          <span>Praha / Pardubice</span>
        </address>
      </div>
    </main>
  )
}
