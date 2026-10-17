'use client';

import React, { useRef } from 'react';
import Projects from './components/Projects';
import ProjectNew from './components/ProjectsPort';

import Galery from './components/galery';
import GaleryF from './components/Fgalery';

import Navbar from '../components/Headertwo';
import Doublep from './components/Double-portfolio';
import TechnicalsAB from "./components/TechnicalsAB"
import Description from './components/description';

import styles from './Portfolio.module.scss';

export default function Page() {
  const projectNewRef = useRef(null);
  const galleryRef    = useRef(null);

  const scrollToProjectNew = () => {
    projectNewRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="Web-development" className={styles.container}>
      <a className={styles.homeLink} href="/">← Zpět na hlavní stránku</a>
      <div className={styles.navbar}>
        <div className={styles.subnav2}>
          <div className={styles.menu}><Navbar /></div>
        </div>
      </div>

      <Doublep
        onScrollToProjectNew={scrollToProjectNew}
        onScrollToGallery={scrollToGallery}
      />
      <div>
        <Description />
      </div>
      <div>
        <TechnicalsAB />
      </div>

      <div ref={projectNewRef}>
        <ProjectNew />
      </div>
      <div ref={galleryRef}>
      <Galery />
      </div>
      

      <div className="py-[1rem] flex justify-center">
        <div className={styles.navbar2}>
          <div className={styles.subnav1}>
            <div>Vytvořil: David Pešek, 2025</div>
          </div>
          <div className={styles.subnav2}>
            <div>e-mail: david.pesek.prg@gmail.com</div>
            <div>telefon: +420 739 140 013</div>
          </div>
        </div>
      </div>
    </div>
  );
}
