import React from 'react';
import styles from './Technicals.module.scss';

export default function Technicals() {
  return (
    <section className={styles.technicals}>
      <div className={styles.wrapper}>

        {/* NADPIS */}
        <h2 className={styles.title}>Technologie</h2>

        {/* TABULKA */}
        <div className={styles.container}>
          <div className={styles.grid}>

            <div className={styles.item}>
              <span className={styles.label}>Design:</span>
              <span className={styles.value}>
                Figma, Illustrator, Photoshop, Affinity, Blender (příležitostně)
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>AI tools:</span>
              <span className={styles.value}>
                ChatGPT, Cursor
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Analytic tools:</span>
              <span className={styles.value}>
                Google Analytics
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Testing:</span>
              <span className={styles.value}>
                Google Analytics, Clarity
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Hosting & databases:</span>
              <span className={styles.value}>
                SQL, MongoDB, Sanity, Vercel, Google Firebase, GitHub
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Web development:</span>
              <span className={styles.value}>
                React.js, Next.js, Node.js
              </span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Code styling:</span>
              <span className={styles.value}>
                Sass, Tailwind, GSAP, Framer Motion
              </span>
            </div>

          </div>
          <div className={styles.textbellow}>
            <p>Moc rád zařadím další nástroje, jako Pencil nebo jiné AI modely od různých firem.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
