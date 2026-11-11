import styles from "./Redesign2DesignSystem.module.scss";

const headingTokens = [
  ["H1", "--type-h1", "Hlavní nadpis stránky"],
  ["H2", "--type-h2", "Nadpis hlavní sekce"],
  ["H3", "--type-h3", "Nadpis projektu nebo kapitoly"],
  ["H4", "--type-h4", "Nadpis menší skupiny"],
  ["H5", "--type-h5", "Krátký nadpis komponenty"],
  ["H6", "--type-h6", "Nejmenší nadpis nebo label"],
];

const textTokens = [
  ["Lead", "--type-lead", "Úvodní a důležitější odstavec"],
  ["Body", "--type-body", "Běžný text"],
  ["Control", "--type-control", "Tlačítka a navigace"],
  ["Meta", "--type-meta", "Datum, kategorie a doprovodný údaj"],
];

const spacingTokens = [
  ["1", "--space-1", "Ikona + text"],
  ["2", "--space-2", "Vnitřek malého ovládání"],
  ["3", "--space-3", "Související prvky"],
  ["4", "--space-4", "Základní padding"],
  ["5", "--space-5", "Menší bloky"],
  ["6", "--space-6", "Části komponenty"],
  ["7", "--space-7", "Větší skupiny"],
  ["8", "--space-8", "Hlavní části stránky"],
];

const heroTokens = [
  ["--home-hero-title", "Velikost hlavního nadpisu na desktopu"],
  ["--home-hero-title-tablet", "Velikost hlavního nadpisu na tabletu"],
  ["--home-hero-title-mobile", "Velikost hlavního nadpisu na telefonu"],
  ["--home-hero-copy-width", "Maximální šířka textového sloupce"],
  ["--home-hero-radius", "Zaoblení celého hero panelu"],
  ["--home-section-space", "Prostor nahoře a dole u hlavních sekcí"],
  ["--home-selected-header-gap", "Mezera mezi úvodem a kartami projektů"],
  ["--home-project-grid-gap", "Svislá mezera mezi kartami projektů"],
  ["--home-project-column-gap", "Vodorovná mezera mezi kartami projektů"],
  ["--home-project-copy-padding-x", "Boční odsazení textu pod náhledem"],
  ["--home-project-copy-padding-bottom", "Spodní prostor textové části"],
  ["--home-project-arrow-bottom", "Vzdálenost šipky od spodní hrany karty"],
  ["--home-archive-gap", "Odstup menších archivních náhledů"],
];

function TokenName({ name }) {
  return <code>{name}</code>;
}

export default function Redesign2DesignSystem() {
  return (
    <main className={styles.page}>
      <header className={styles.intro}>
        <p className={styles.eyebrow}>Redesign_2 · živé nastavení</p>
        <h1>Design systém portfolia</h1>
        <p>
          Hodnoty měň v <TokenName name="app/portfolio-design.css" />. Po uložení
          se tento přehled i celá stránka ve Storybooku aktualizují.
        </p>
      </header>

      <section className={styles.section} aria-labelledby="type-heading">
        <div className={styles.sectionHeading}>
          <div><p>01</p><h2 id="type-heading">Hierarchie nadpisů</h2></div>
          <p>Velikost určuje proměnná. Úroveň H1–H6 dál vyjadřuje strukturu obsahu.</p>
        </div>
        <div className={styles.typeList}>
          {headingTokens.map(([level, token, description], index) => {
            const Heading = `h${index + 1}`;
            return (
              <article className={styles.typeRow} key={token}>
                <div className={styles.tokenLabel}>
                  <strong>{level}</strong><TokenName name={token} /><span>{description}</span>
                </div>
                <Heading className={styles[`sampleH${index + 1}`]}>Srozumitelná struktura digitálního produktu</Heading>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="text-heading">
        <div className={styles.sectionHeading}>
          <div><p>02</p><h2 id="text-heading">Běžné texty</h2></div>
          <p>Čtyři úrovně pokrývají obsah, ovládání i doprovodné informace.</p>
        </div>
        <div className={styles.textGrid}>
          {textTokens.map(([label, token, description]) => (
            <article className={styles.textCard} key={token}>
              <div className={styles.tokenLabel}><strong>{label}</strong><TokenName name={token} /><span>{description}</span></div>
              <p style={{ fontSize: `var(${token})` }}>Návrh pomáhá člověku pochopit situaci a rozhodnout se, co udělat dál.</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="space-heading">
        <div className={styles.sectionHeading}>
          <div><p>03</p><h2 id="space-heading">Spacing stupnice</h2></div>
          <p>Opakující se kroky drží rytmus stránky. Číslo neříká důležitost, jen velikost mezery.</p>
        </div>
        <div className={styles.spacingList}>
          {spacingTokens.map(([level, token, usage]) => (
            <div className={styles.spacingRow} key={token}>
              <div className={styles.spacingMeta}><strong>{level}</strong><TokenName name={token} /><span>{usage}</span></div>
              <div className={styles.spacingTrack}><i style={{ width: `var(${token})` }} /></div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="shape-heading">
        <div className={styles.sectionHeading}>
          <div><p>04</p><h2 id="shape-heading">Tvary a povrchy</h2></div>
          <p>Stejné radiusy propojují ovládání, karty a velké panely.</p>
        </div>
        <div className={styles.shapeGrid}>
          <div className={styles.controlShape}><TokenName name="--portfolio-radius-control" /><span>Tlačítko / control</span></div>
          <div className={styles.surfaceShape}><TokenName name="--portfolio-radius-surface" /><span>Karta / surface</span></div>
          <div className={styles.panelShape}><TokenName name="--portfolio-radius-panel" /><span>Hero / velký panel</span></div>
        </div>
      </section>

      <section className={styles.section} aria-labelledby="hero-heading">
        <div className={styles.sectionHeading}>
          <div><p>05</p><h2 id="hero-heading">Rychlé nastavení home page</h2></div>
          <p>Tyto hodnoty mají přímý dopad na aktuální variantu Redesign_2.</p>
        </div>
        <div className={styles.heroTokenGrid}>
          {heroTokens.map(([token, description]) => (
            <article key={token}><TokenName name={token} /><p>{description}</p></article>
          ))}
        </div>
      </section>
    </main>
  );
}
