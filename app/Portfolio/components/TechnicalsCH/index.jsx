import React from 'react'
import styles from './Technicals.module.scss';

export default function DynamicTechnicals() {

  // 🔥 DATA PŘÍMO V KOMPONENTĚ
  const data = {
    tech1: "React, Next.js, Tailwind CSS, MongoDB",
    tech2: "Figma",
    tech3: "Framer Motion / CSS transitions",
    tech4: "Vercel / Node.js hosting",

    colors: [
      "#1A1A1A",
      "#D3D3D3",
      "#B5EAD7"
    ],

    font: "Montserrat",
    link: "https://digital-call-module.vercel.app/",
    rok: "2026",

    zakaznici:
      "Modul Obvolávání (Digital Call) je interaktivní prototyp interního nástroje pro realitní makléře, navržený pro správu kontaktů, Kanban workflow a automatizaci obvolávání."
  }

  return (
    <div className={styles.technicals}>
      <div className={styles.container}>

        {/* LEFT SIDE */}
        <div className={styles.card}>

          <div className={styles.text}>
            <h3 className='text-[24px] md:text-xl font-bold'>Technologie:</h3>

            <div className={styles.sub}>
              <h2>Front end:</h2>
              <p>{data.tech1}</p>
            </div>

            <div className={styles.sub}>
              <h2>Styly & návrh:</h2>
              <p>{data.tech2}</p>
            </div>

            <div className={styles.sub}>
              <h2>Animace a přechody:</h2>
              <p>{data.tech3}</p>
            </div>

            <div className={styles.sub}>
              <h2>Back-end/hosting:</h2>
              <p>{data.tech4}</p>
            </div>

            <div className={styles.sub}>
              <h2>Podpora:</h2>
              <p>ChatGPT, Windsurf, VSCode</p>
            </div>
          </div>

          <div className={styles.text}>
            <h1 className='text-[24px] md:text-xl font-bold pt-[8%]'>
              Použité barvy:
            </h1>

            <div className={styles.colors}>
              {data.colors.map((color, i) => (
                <div className={styles.col} key={i}>
                  <p className={styles.sub}>- {color}</p>
                  <div
                    className={
                      i === 0
                        ? styles.color3
                        : i === 1
                        ? styles.color2
                        : styles.color
                    }
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className={styles.card}>

          <div className={styles.col3}>
            <h2 className='text-[24px] md:text-xl font-bold'>Font:</h2>
            <div className={styles.text}>{data.font}</div>
          </div>

          <div className={styles.col2}>
            <h2 className='text-[24px] md:text-xl font-bold'>Zákazníci:</h2>
            <div className={styles.text}>{data.zakaznici}</div>
          </div>

          <div className={styles.col2}>
            <h2 className='text-[24px] md:text-xl font-bold'>Rok vytvoření:</h2>
            <div className={styles.text}>{data.rok}</div>
          </div>

          <div className={styles.col2}>
            <h2 className='text-[24px] md:text-xl font-bold'>Odkaz:</h2>
            <a href={data.link} target="_blank" rel="noopener noreferrer">
              <div className={styles.text}>{data.link}</div>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}