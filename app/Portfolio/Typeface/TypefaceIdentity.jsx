import { Prata } from "next/font/google";
import styles from "./TypefaceIdentity.module.scss";
const prata = Prata({ subsets: ["latin"], weight: "400", display: "swap" });
const colors = ["#046843", "#FD5210", "#6977FC", "#FB9AE5"];

export default function TypefaceIdentity() {
  return <>
    <section className={styles.section} aria-labelledby="logo-title"><div className={styles.heading}><span>01 / Logo</span><h2 id="logo-title">Slovní znak a tvář.</h2><p>Název Typeface jsem spojil s motivem tváře. Černobílé logo doplňuje sada barevných geometrických symbolů, se kterými dál pracuju na webu.</p></div>
      <figure className={styles.logoBoard}><img src="/typeface/logo.png" alt="Původní černé logo Typeface" width="2500" height="1500" /><figcaption>Logo Typeface použité v navigaci webu.</figcaption></figure>
      <figure className={styles.detail}><div role="img" aria-label="Detail původního loga Typeface: stylizovaná tvář v klobouku" /><figcaption><strong>Type + face.</strong><p>Tvář doplňuje slovní část loga a odkazuje na název studia.</p></figcaption></figure>
    </section>
    <section className={styles.section} aria-labelledby="system-title"><div className={styles.heading}><span>02 / Vizuální systém</span><h2 id="system-title">Prata, Manrope a sada symbolů.</h2><p>Pratu jsem zvolil pro výrazné nadpisy, Manrope pro text a navigaci. Symboly skládám do čtvercových modulů, které můžou měnit pořadí i kompozici.</p></div>
      <div className={styles.system}><div className={styles.typeBoard}><span className={`${styles.specimen} ${prata.className}`}>Aa</span><p className={prata.className}>Form follows<br />feeling.</p><span>Prata / nadpisy</span><div>Manrope — text a navigace<br />ABCDEFGHIJKLMNOPQRSTUVWXYZ<br />abcdefghijklmnopqrstuvwxyz 0123456789</div></div><div className={styles.symbolBoard}>{Array.from({ length: 12 }, (_, i) => <img src={`/typeface/symbols/${i + 1}.svg`} alt={`Původní symbol Typeface ${i + 1}`} width="192" height="192" loading="lazy" key={i} />)}</div></div>
      <div className={styles.palette}>{colors.map((color) => <div key={color}><i style={{ background: color }} /><span>{color}</span></div>)}</div>
      <p className={styles.note}>Ukázka identity sestavená z původního loga, fontů a symbolů.</p>
    </section>
    <section className={styles.section} aria-labelledby="motion-title"><div className={styles.heading}><span>03 / Web a pohyb</span><h2 id="motion-title">Symboly v pohybu.</h2><p>Pás symbolů se pomalu posouvá pod průsvitnou vrstvou. Rozostření mění jejich kresbu a barvy, zatímco hlavní sdělení zůstává na místě.</p></div></section>
  </>;
}
