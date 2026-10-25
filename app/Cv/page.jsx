'use client';

import LanguageToggle from "../i18n/LanguageToggle";
import { motion } from 'framer-motion';
import styles from './CV.module.scss';
import { Text as I18nText, Localized as I18nElement } from "../i18n/Text";

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
          <h1><I18nText>Bc. David Pešek</I18nText></h1>
          <p><I18nText>david.pesek.prg@gmail.com · +420 739 140 013 · Pardubice / Praha</I18nText></p>
        </div>

        <LanguageToggle />
        {/* DOWNLOAD PDF */}
        <I18nElement as="a"
          href="/CV-DP.pdf"
          download
          className={styles.pdfBtn}
        ><I18nText>Stáhnout PDF</I18nText></I18nElement>
        <I18nElement as="a" href="/#work" className={styles.backLink}><I18nText>← Zpět na projekty</I18nText></I18nElement>
      </motion.header>

      {/* SUMMARY */}
      <motion.p variants={fadeUp} custom={1} className={styles.summary}><I18nText>Jsem UX/UI designér s přesahem do front-endu. Navrhuji strukturu a interakce digitálních produktů a ve vlastních projektech je převádím do funkčních prototypů v Reactu a Next.js. Ve Brightboxu jsem pracoval na firemních webech a design systémech. Zkušenosti s digitálním marketingem využívám jako doplněk při práci s obsahem a vyhodnocováním webů.</I18nText></motion.p>

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
          <li><I18nText>Anglický jazyk: B2 / C1</I18nText></li>
          <li><I18nText>Figma, Photoshop, Illustrator</I18nText></li>
          <li><I18nText>React, HTML, CSS</I18nText></li>
          <li><I18nText>Blender</I18nText></li>
          <li><I18nText>MS Office</I18nText></li>
          <li><I18nText>Řidičský průkaz skupiny B</I18nText></li>
        </motion.ul>
      </Section>
    </motion.section>
  );
}

/* ===== COMPONENTS ===== */

function Section({ title, children }) {
  return (
    <section className={styles.section}>
      <h2><I18nText>{title}</I18nText></h2>
      {children}
    </section>
  );
}

function TimelineItem({ period, title, subtitle }) {
  return (
    <motion.div variants={fadeUp} className={styles.timelineItem}>
      <span><I18nText>{period}</I18nText></span>
      <div>
        <h3><I18nText>{title}</I18nText></h3>
        <p><I18nText>{subtitle}</I18nText></p>
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
      <span><I18nText>{period}</I18nText></span>
      <h3><I18nText>{title}</I18nText></h3>
      {text && <p><I18nText>{text}</I18nText></p>}
    </motion.div>
  );
}
