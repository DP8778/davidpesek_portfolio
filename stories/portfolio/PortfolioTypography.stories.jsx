import styles from "./PortfolioTypography.module.scss";

export default {
  title: "Portfolio/Typography",
  parameters: { layout: "fullscreen" },
};

const examples = [
  "Název stránky",
  "Nadpis kapitoly",
  "Nadpis projektu",
  "Menší skupina",
  "Krátký nadpis",
  "Název pole",
];

export const Hierarchie = {
  render: () => (
    <div className={styles.specimen}>
      <h1>Typografie portfolia</h1>
      <p>Stejná stupnice pro titulky a kompaktní rozhraní. Úroveň nadpisu se volí podle struktury stránky.</p>
      <div className={styles.table}>
        <span>Velikost</span><span>Display · Clash Display</span><span>Compact · Manrope</span>
        {examples.map((example, index) => (
          <div className={styles.row} key={example} data-level={index + 1}>
            <span>H{index + 1}</span>
            <p className={styles.display}>{example}</p>
            <p className={styles.compact}>{example}</p>
          </div>
        ))}
      </div>
      <div className={styles.samples}>
        <p className={styles.body}>Běžný text vysvětluje rozhodnutí. Má větší kontrast než datum a popisek.</p>
        <p className={styles.meta}>Popisek · datum · původ podkladu</p>
      </div>
    </div>
  ),
};
