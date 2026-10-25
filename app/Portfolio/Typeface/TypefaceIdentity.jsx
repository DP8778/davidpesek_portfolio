import { Prata } from "next/font/google";
import styles from "./TypefaceIdentity.module.scss";
const prata = Prata({ subsets: ["latin"], weight: "400", display: "swap" });
const colors = ["#046843", "#FD5210", "#6977FC", "#FB9AE5"];

export default function TypefaceIdentity() {
  return <>
    <section className={styles.section} aria-labelledby="logo-title"><div className={styles.heading}><span>01 / Logo</span><h2 id="logo-title">Jméno jako základ identity.</h2><p>Slovní znak doplňuje tvář v samostatném poli. Černobílý základ nechává barvu a proměnlivost sadě symbolů.</p></div>
      <figure className={styles.logoBoard}><img src="/typeface/logo.png" alt="Původní černé logo Typeface" width="2500" height="1500" /><figcaption>Slovní znak a tvář v jednom logu.</figcaption></figure>
      <figure className={styles.detail}><div role="img" aria-label="Detail původního loga Typeface: stylizovaná tvář v klobouku" /><figcaption><strong>Type + face.</strong><p>Tvář dává názvu doslovnou vizuální vrstvu. Výřez původního loga.</p></figcaption></figure>
    </section>
    <section className={styles.section} aria-labelledby="system-title"><div className={styles.heading}><span>02 / Vizuální systém</span><h2 id="system-title">Klidná sazba, výrazné tvary.</h2><p>Prata přináší kontrastní serifovou kresbu nadpisů. Manrope drží navigaci a delší text čitelné. Opakující se čtvercové moduly dovolují měnit kompozici bez výměny celé identity.</p></div>
      <div className={styles.system}><div className={styles.typeBoard}><span className={`${styles.specimen} ${prata.className}`}>Aa</span><p className={prata.className}>Form follows<br />feeling.</p><span>Prata / nadpisy</span><div>Manrope — text a navigace<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz 0123456789</div></div><div className={styles.symbolBoard}>{Array.from({ length: 12 }, (_, i) => <img src={`/typeface/symbols/${i + 1}.svg`} alt={`Původní symbol Typeface ${i + 1}`} width="192" height="192" loading="lazy" key={i} />)}</div></div>
      <div className={styles.palette}>{colors.map((color) => <div key={color}><i style={{ background: color }} /><span>{color}</span></div>)}</div>
      <p className={styles.note}>Ukázka identity sestavená z původních podkladů. <a href="https://github.com/DP8778/davidpesek_portfolio/blob/main/app/Portfolio/Typeface/CAPTURE_NOTES.md" target="_blank" rel="noreferrer">Podklady a původ snímků ↗</a></p>
    </section>
    <section className={styles.section} aria-labelledby="motion-title"><div className={styles.heading}><span>03 / Web a pohyb</span><h2 id="motion-title">Identita dostává prostor i čas.</h2><p>Velké sdělení má vlastní klidnou plochu. Symboly se v 74sekundové smyčce posouvají pod průsvitnou vrstvou, která mění jejich kresbu i barvy. Ukázku v úvodu lze pozastavit; při omezení pohybu zůstává statická.</p></div></section>
  </>;
}
