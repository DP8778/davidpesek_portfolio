import React from 'react'
import styles from './Technicals.module.scss';
import { Text as I18nText, Localized as I18nElement } from "../../../i18n/Text";

export default function DynamicTechnicals({ Barvy, Tech1, Tech2, Tech3, Tech4, Font, Link, Rok, Zákazníci
 }) {
  return (
    <div className={styles.technicals}>
        <div className={styles.container}>
            <div className={styles.card}>
            
            
                
                <div className={styles.text}>
                    <h3 className='text-[24px] md:text-xl font-bold'><I18nText>Technologie:</I18nText></h3>
                    <div className={styles.sub}>
                        <h2 ><I18nText>Front end:</I18nText></h2>
                        <p className=''><I18nText>{Tech1}</I18nText></p>
                    </div>
                    <div className={styles.sub}>
                        <h2 ><I18nText>Styly &amp; návrh:</I18nText></h2>
                        <p className=''><I18nText>{Tech2}</I18nText></p>
                    </div>
                    
                    <div className={styles.sub}>
                        <h2><I18nText>Podpora:</I18nText></h2>
                        <p className=''><I18nText>ChatGPT, Claude AI</I18nText></p>
                    </div>
                </div>
                <div className={styles.text}>
                    <h1 className='text-[24px] md:text-xl  font-bold pt-[8%]'><I18nText>Použité barvy:</I18nText></h1>
                    <div className={styles.colors}>
                        <div className={styles.col}>
                            <p className={styles.sub}><I18nText>- #1A1A1A</I18nText></p>
                            <div className={styles.color}></div>
                        </div>
                        <div className={styles.col}>
                            <p className={styles.sub}><I18nText>- #D3D3D3</I18nText></p>
                            <div className={styles.color2}></div>
                        </div>
                        <div className={styles.col}>
                            <p className={styles.sub}><I18nText>- #172922ff</I18nText></p>
                            <div className={styles.color3}></div>
                        </div>
                    </div>
                </div>
                
            
            
            </div>
            <div className={styles.card}>
            
                <div className={styles.col3}>
                    <h2 className='text-[24px] md:text-xl font-bold'><I18nText>Font:</I18nText></h2>
                    <div className={styles.text}><I18nText>{Font}</I18nText></div>
                </div>
                <div className={styles.col2}>
                    <h2 className='text-[24px] md:text-xl  font-bold'><I18nText>Zákazníci:</I18nText></h2>
                    <div className={styles.text}><I18nText>{Zákazníci}</I18nText></div>
                </div>
                <div className={styles.col2}>
                    <h2 className='text-[24px] md:text-xl  font-bold'><I18nText>Rok vytvoření:</I18nText></h2>
                    <div className={styles.text}><I18nText>{Rok}</I18nText></div>
                </div>
                
                <div className={styles.col2}>
                    <h2 className='text-[24px] md:text-xl  font-bold'><I18nText>Odkaz:</I18nText></h2>
                    <I18nElement as="a" href='https://www.teach4future.com/cs/'>
                    <div className={styles.text}><I18nText>{Link}</I18nText></div>
                    </I18nElement>
                </div>
            
            
            </div>
        </div>
    </div>
  );
}