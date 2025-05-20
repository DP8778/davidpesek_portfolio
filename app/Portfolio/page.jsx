import React from 'react'
import Projects from './components/Projects'

import styles from './Portfolio.module.scss'
import Navbar from '../components/Headertwo'
import Link from 'next/link'

const page = () => {
  return (
    <div id='Web-development' className={styles.container}>
      <div className=' h-screen' >
        <div className={styles.navbar}>
          
          <div className={styles.subnav2}>
          <div className={styles.menu}><Navbar /></div>
          </div>
        </div>
        <div  className='relative'>
          <div className={styles.par}>PROJEKTY</div>
          <Projects />
        </div>
        <div className={styles.navbar2}>
          <div className={styles.subnav1}>
            <div className=''>Vytvořil: David Pešek, 2025</div>
          </div>
          <div className={styles.subnav2}>
            <div>e-mail: david.pesek.prg@gmail.com</div>
            <div>telefon: +420 739 140 013</div>
          </div>
        </div>
      </div>
      
      
    </div>
  )
}

export default page