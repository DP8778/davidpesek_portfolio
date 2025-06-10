'use client'

import React from 'react'
import styles from './CV.module.scss'

const Page = () => {
  return (
    <div className={styles.cvWrapper}>
      <h1>Bc. David Pešek</h1>
      <p className={styles.contact}>
        david.pesek.prg@gmail.com | +420 739 140 013 | Lonkova 483, 53009 Pardubice
      </p>
      {/* Tlačítko pro stažení PDF */}
      <a
        href="/CV_David-Pesek.pdf"
        download
        className={styles.downloadButton}
      >
        Stáhnout CV (PDF)
      </a>

      <section>
        <p className={styles.intro}>
          Absolvent VŠE v Praze se zájmem o UX/UI design a digitální marketing.
          Kombinuji cit pro vizuální komunikaci s analytickým myšlením a základy
          front-end vývoje. Vlastními projekty jsem si ověřil celý proces návrhu
          a tvorby webu – od koncepce po spuštění. Hledám příležitost, kde budu
          moci dále profesně růst a podílet se na smysluplných digitálních
          řešeních.
        </p>
      </section>

      <section>
        <h2>Vzdělání</h2>
        <ul>
          <li>
            <strong>9/2019 – 2024</strong> – Vysoká škola ekonomická v Praze,
            Arts management (Bc.)
          </li>
          <li>
            <strong>9/2015 – 6/2019</strong> – SPŠ stavební, Hradec Králové,
            Technické lyceum
          </li>
        </ul>
      </section>

      <section>
        <h2>Pracovní zkušenosti</h2>
        <ul>
          <li>2023–2024 – Web administrátor – Ski a Bike Centrum Radotín</li>
          <li>2022–2023 – Barback – Fermé bar, Praha</li>
          <li>
            2021–2022 – Příprava nemovitostí na prodej – Quintero a.s., Praha
          </li>
          <li>2019–2020 – Obsluha – Poslední skaut bistro bar, Praha</li>
          <li>2018–2020 – Trenér mládeže – BMX Pardubice</li>
          <li>2018–dosud – Správa Facebooku – BMX Pardubice</li>
          <li>2018–2019 – Reprezentant ČR v BMX</li>
        </ul>
      </section>

      <section>
        <h2>Jazykové dovednosti</h2>
        <ul>
          <li>Anglický jazyk: C1 – dobrá znalost slovem i písmem</li>
        </ul>
      </section>

      <section>
        <h2>Počítačové dovednosti</h2>
        <ul>
          <li>
            MS Office, Figma, React.js, Next.js, VSCode, ChatGPT, GitHub, Adobe,
            Blender, HTML, SCSS, GSAP
          </li>
        </ul>
      </section>

      <section>
        <h2>Další dovednosti</h2>
        <ul>
          <li>Řidičský průkaz – skupina B</li>
        </ul>
      </section>
    </div>
  )
}

export default Page
