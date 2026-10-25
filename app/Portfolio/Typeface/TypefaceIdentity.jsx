import { Prata } from "next/font/google";
import styles from "./TypefaceIdentity.module.scss";
import { Text as I18nText, Localized as I18nElement } from "../../i18n/Text";
const prata = Prata({ subsets: ["latin"], weight: "400", display: "swap" });
const colors = ["#046843", "#FD5210", "#6977FC", "#FB9AE5"];

export default function TypefaceIdentity() {
  return <>
    <section className={styles.section} aria-labelledby="logo-title"><div className={styles.heading}><span><I18nText>01 / Logo</I18nText></span><h2 id="logo-title"><I18nText>Slovní znak a tvář.</I18nText></h2><p><I18nText>Slovní znak doplňuje tvář v samostatném poli. Černobílý základ nechává barvu a proměnlivost sadě symbolů.</I18nText></p></div>
      <figure className={styles.logoBoard}><I18nElement as="img" src="/typeface/logo.png" alt="Původní černé logo Typeface" width="2500" height="1500" /><figcaption><I18nText>Slovní znak a tvář v jednom logu.</I18nText></figcaption></figure>
      <figure className={styles.detail}><I18nElement as="div" role="img" aria-label="Detail původního loga Typeface: stylizovaná tvář v klobouku" /><figcaption><strong><I18nText>Type + face.</I18nText></strong><p><I18nText>Tvář dává názvu doslovnou vizuální vrstvu. Výřez původního loga.</I18nText></p></figcaption></figure>
    </section>
    <section className={styles.section} aria-labelledby="system-title"><div className={styles.heading}><span><I18nText>02 / Vizuální systém</I18nText></span><h2 id="system-title"><I18nText>Prata, Manrope a sada symbolů.</I18nText></h2><p><I18nText>Prata přináší kontrastní serifovou kresbu nadpisů. Manrope drží navigaci a delší text čitelné. Opakující se čtvercové moduly dovolují měnit kompozici bez výměny celé identity.</I18nText></p></div>
      <div className={styles.system}><div className={styles.typeBoard}><span className={`${styles.specimen} ${prata.className}`}><I18nText>Aa</I18nText></span><p className={prata.className}><I18nText>Form follows</I18nText><br /><I18nText>feeling.</I18nText></p><span><I18nText>Prata / nadpisy</I18nText></span><div><I18nText>Manrope — text a navigace</I18nText><br /><I18nText>ABCDEFGHIJKLMNOPQRSTUVWXYZ</I18nText><br /><I18nText>abcdefghijklmnopqrstuvwxyz 0123456789</I18nText></div></div><div className={styles.symbolBoard}><I18nText>{Array.from({ length: 12 }, (_, i) => <I18nElement as="img" src={`/typeface/symbols/${i + 1}.svg`} alt={`Původní symbol Typeface ${i + 1}`} width="192" height="192" loading="lazy" key={i} />)}</I18nText></div></div>
      <div className={styles.palette}>{colors.map((color) => <div key={color}><i style={{ background: color }} /><span><I18nText>{color}</I18nText></span></div>)}</div>
      <p className={styles.note}><I18nText>Ukázka identity sestavená z původních podkladů. </I18nText><I18nElement as="a" href="https://github.com/DP8778/davidpesek_portfolio/blob/main/app/Portfolio/Typeface/CAPTURE_NOTES.md" target="_blank" rel="noreferrer"><I18nText>Podklady a původ snímků ↗</I18nText></I18nElement></p>
    </section>
    <section className={styles.section} aria-labelledby="motion-title"><div className={styles.heading}><span><I18nText>03 / Web a pohyb</I18nText></span><h2 id="motion-title"><I18nText>Symboly v pohybu.</I18nText></h2><p><I18nText>Velké sdělení má vlastní klidnou plochu. Symboly se v 74sekundové smyčce posouvají pod průsvitnou vrstvou, která mění jejich kresbu i barvy. Ukázku v úvodu lze pozastavit; při omezení pohybu zůstává statická.</I18nText></p></div></section>
  </>;
}
