import React from 'react';
import styles from './Description.module.scss';
import { Text as I18nText, Localized as I18nElement } from "../../../i18n/Text";

export default function Description() {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <div className={styles.column1}>
          <span className={styles.markerUnderline}><I18nText>Jak přistupuji k práci</I18nText><I18nElement as="img"
              src="/underline6.svg"
              alt=""
              className={styles.underlineImage}
            />
          </span>
        </div>

        <div className={styles.column}><I18nText>Navrhuji digitální produkty s jasnou strukturou a vlastním charakterem. Ve Figmě připravuji rozhraní a prototypy, v Reactu a Next.js ověřuji jejich chování na různých obrazovkách. Vlastní projekty mi umožňují ukázat nejen výsledný vzhled, ale i rozhodnutí, která k němu vedla.</I18nText></div>
      </div>
    </div>
  );
}
