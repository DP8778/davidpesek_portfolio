import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import styles from "./Footerr.module.scss"

export default function Content() {
  return (
    <div className='bg-[#ACACAC] py-8 px-12 h-full'>
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
                <p className={styles.paragraph}>Adresa: Michalská 966/74, Praha 4</p>
                <a href="mailto:domaproservis@gmail.com"><p className={styles.paragraph}>e-mail: domaproservis@gmail.com</p></a>
                <a href='tel:+420 608 097 250'><p className={styles.paragraph}>telefon: +420 608 097 250</p></a>
                <Link href="/Obchodni-podminky"><p className={styles.paragraph}>Zásady ochrany osobních údajů</p></Link>
            </div>
            <div>
                <Image 
                            src="/Preloader-ell.png" 
                            alt="Banner" 
                            width={400} 
                            height={70} 
                />
            </div>
            
        </div>
    )
}