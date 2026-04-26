import React from 'react';
import styles from './Description.module.scss';

export default function Description() {
  return (
    <div className={styles.background}>
      <div className={styles.card}>
        <div className={styles.column1}>
          <span className={styles.markerUnderline}>
            Jak přistupuji k práci

            <img
              src="/underline6.svg"
              alt=""
              className={styles.underlineImage}
            />
          </span>
        </div>

        <div className={styles.column}>
          Zaměřuji se na návrh digitálních aplikací a designových systémů. Primárně vycházím z Figmy, která je základem mého designového procesu a prostředím, ve kterém vznikají návrhy, prototypy i jejich struktura. Průběžně testuji nové nástroje a AI workflow, které mi pomáhají pracovat rychleji a udržet návrhy konzistentní i při vyšší komplexitě. Dlouhodobě si buduji široký technologický rozhled, abych se dokázal rychle přizpůsobit novým nástrojům a změnám v tom, jak se digitální produkty navrhují a vyvíjejí.
        </div>
      </div>
    </div>
  );
}
