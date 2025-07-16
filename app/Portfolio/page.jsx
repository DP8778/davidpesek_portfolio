'use client';

import React, { useRef } from 'react';
import Projects from './components/Projects';
import ProjectNew from './components/ProjectsPort';
import ProjectNew2 from './components/ProjectsPort2';
import Galery from './components/galery';
import Navbar from '../components/Headertwo';
import Doublep from './components/Double-portfolio';

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
      <div className={styles.navbar}>
        <div className={styles.subnav2}>
          <div className={styles.menu}><Navbar /></div>
        </div>
      </div>

      <Doublep
        onScrollToProjectNew={scrollToProjectNew}
        onScrollToGallery={scrollToGallery}
      />

      <div ref={projectNewRef}>
        <ProjectNew />
      </div>
      <div>
        <ProjectNew2 />
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
