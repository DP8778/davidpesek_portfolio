'use client';

import { motion } from 'framer-motion';
import styles from './CV.module.scss';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function CV() {
  return (
    <motion.section
      className={styles.cv}
      initial="hidden"
      animate="visible"
    >
      {/* HEADER */}
      <motion.header variants={fadeUp} custom={0} className={styles.header}>
        <div>
          <h1>Bc. David Pešek</h1>
          <p>
            david.pesek.prg@gmail.com · +420 739 140 013 · Pardubice / Praha
          </p>
        </div>

        {/* DOWNLOAD PDF */}
        <a
          href="/CV-DP.pdf"
          download
          className={styles.pdfBtn}
        >
          Stáhnout PDF
        </a>
      </motion.header>

      {/* SUMMARY */}
      <motion.p variants={fadeUp} custom={1} className={styles.summary}>
        Absolvent VŠE v Praze se zájmem o UX/UI design a digitální marketing.
        Kombinuji cit pro vizuální komunikaci s analytickým myšlením a základy
        front-end vývoje. Vlastními projekty jsem si ověřil celý proces návrhu
        a tvorby webu – od koncepce po spuštění. Hledám příležitost, kde budu
        moci dále profesně růst a podílet se na smysluplných digitálních řešeních.
      </motion.p>

      {/* EDUCATION */}
      <Section title="Vzdělání">
        <TimelineItem
          period="2019 – 2024"
          title="Vysoká škola ekonomická v Praze"
          subtitle="Arts Management – Podnikohospodářská fakulta (Bc.)"
        />
        <TimelineItem
          period="2015 – 2019"
          title="SPŠ stavební Hradec Králové"
          subtitle="Technické lyceum – architektura (maturita)"
        />
      </Section>

      {/* EXPERIENCE */}
      <Section title="Pracovní zkušenosti">
        <Card
          period="2024 – 2025"
          title="Web developer / UX/UI designer – Brightbox"
          text="Tvorba firemních webů, design systémů a grafických podkladů.
          Práce v interní platformě od návrhu UX/UI až po sestavení webu
          a následné vyhodnocení."
        />

        <Card
          period="2023 – dosud"
          title="Freelancer – Web development & Google Ads"
          text="Tvorba menších webů a landing pages, UX/UI návrhy,
          správa Google Ads kampaní, nastavování měření,
          optimalizace výkonu a technická údržba webů."
        />

        <Card
          period="2023 – 2024"
          title="Web administrátor – Ski a Bike Centrum Radotín"
          text="Správa obsahu e-shopu, práce s interními databázemi
          a úprava produktových informací pro web."
        />

        <Card period="2023" title="Obsluha – Fermé bar, Praha" />
        <Card period="2020 – 2022" title="Asistent přípravy nemovitostí na prodej – Quintero a.s." />
        <Card period="2019 – 2020" title="Obsluha – Poslední skaut bistro bar, Praha" />
        <Card period="2018 – 2020" title="Trenér mládeže – BMX Pardubice" />
        <Card period="2018 – dosud" title="Správa Facebook stránky – BMX Pardubice" />
        <Card period="2018 – 2019" title="Reprezentant ČR v BMX" />
      </Section>

      {/* SKILLS */}
      <Section title="Dovednosti">
        <motion.ul variants={fadeUp} custom={10} className={styles.skills}>
          <li>Anglický jazyk: B2 / C1</li>
          <li>Figma, Photoshop, Illustrator</li>
          <li>React, HTML, CSS</li>
          <li>Blender</li>
          <li>MS Office</li>
          <li>Řidičský průkaz skupiny B</li>
        </motion.ul>
      </Section>
    </motion.section>
  );
}

/* ===== COMPONENTS ===== */

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function TimelineItem({ period, title, subtitle }) {
  return (
    <motion.div variants={fadeUp} className={styles.timelineItem}>
      <span>{period}</span>
      <div>
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </motion.div>
  );
}

function Card({ period, title, text }) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -3 }}
      className={styles.card}
    >
      <span>{period}</span>
      <h3>{title}</h3>
      {text && <p>{text}</p>}
    </motion.div>
  );
}
