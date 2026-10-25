import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from "./Footerr.module.scss"
import { Text as I18nText, Localized as I18nElement } from "../../../i18n/Text";

export default function Content() {
  return (
    <div className=' py-8 px-12 h-full'>
        <Section1 />
        
    </div>
  )
}

const Section1 = () => {
    return (
        <div>
            <Nav />
        </div>
    )
}



const Nav = () => {
    return (
        <div className='flex justify-between items-end gap-20'>
            <div className='flex flex-col justify-center gap-2'>
                
                <I18nElement as="a" href="mailto:david.pesek.prg@gmail.com"><p className={styles.paragraph}><I18nText>e-mail: david.pesek.prg@gmail.com</I18nText></p></I18nElement>
                
                <I18nElement as={Link} href="/Portfolio"><p className={styles.paragraph}><I18nText>Hlavní strana</I18nText></p></I18nElement>
            </div>
            
        </div>
    )
}