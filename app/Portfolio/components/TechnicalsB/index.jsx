import React from 'react'
import styles from './Technicals.module.scss';

export default function DynamicTechnicals({ Barvy, Tech1, Tech2, Tech3, Tech4, Font, Link, Rok, Zákazníci
 }) {
  return (
    <div className={styles.technicals}>
        <div className={styles.container}>
            <div className={styles.card}>
            
            
                
                <div className={styles.text}>
                    <h3 className='text-[24px] md:text-xl font-bold'>Technologie:</h3>
                    <div className={styles.sub}>
                        <h2 >Front end:</h2>
                        <p className=''>{Tech1}</p>
                    </div>
                    <div className={styles.sub}>
                        <h2 >Styly & návrh:</h2>
                        <p className=''>{Tech2}</p>
                    </div>
                    <div className={styles.sub}>
                        <h2>Animace a přechody:</h2>
                        <p className=''>{Tech3}</p>
                    </div>
                    <div className={styles.sub}>
                        <h2>Back-end/hosting:</h2>
                        <p className=''>{Tech4}</p>
                    </div>
                    <div className={styles.sub}>
                        <h2>Podpora:</h2>
                        <p className=''>ChatGPT, Windsurf, VSCode</p>
                    </div>
                </div>
                <div className={styles.text}>
                    <h1 className='text-[24px] md:text-xl  font-bold pt-[8%]'>Použité barvy:</h1>
                    <div className={styles.colors}>
                        <div className={styles.col}>
                            <p className={styles.sub}>- #1A1A1A</p>
                            <div className={styles.color}></div>
                        </div>
                        <div className={styles.col}>
                            <p className={styles.sub}>- #D3D3D3</p>
                            <div className={styles.color2}></div>
                        </div>
                        <div className={styles.col}>
                            <p className={styles.sub}>- #B5EAD7</p>
                            <div className={styles.color3}></div>
                        </div>
                    </div>
                </div>
                
            
            
            </div>
            <div className={styles.card}>
            
                <div className={styles.col3}>
                    <h2 className='text-[24px] md:text-xl font-bold'>Font:</h2>
                    <div className={styles.text}>{Font}</div>
                </div>
                <div className={styles.col2}>
                    <h2 className='text-[24px] md:text-xl  font-bold'>Zákazníci:</h2>
                    <div className={styles.text}>{Zákazníci}</div>
                </div>
                <div className={styles.col2}>
                    <h2 className='text-[24px] md:text-xl  font-bold'>Rok vytvoření:</h2>
                    <div className={styles.text}>{Rok}</div>
                </div>
                
                <div className={styles.col2}>
                    <h2 className='text-[24px] md:text-xl  font-bold'>Odkaz:</h2>
                    <div className={styles.text}>{Link}</div>
                </div>
            
            
            </div>
        </div>
    </div>
  );
}