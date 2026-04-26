'use client'

import React, { useEffect, useRef, useState } from 'react'
import Heroimage from "../components/HeroimageF"
import TechnicalsF from "../components/TechnicalsF"

import Footer from '../components/Footer-project'
import styles from './Projekt3.module.scss'
import Lenis from 'lenis'

import { filmData } from "./content5.jsx";
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
  const [showArrow, setShowArrow] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({ smooth: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setShowArrow(!entry.isIntersecting); // pokud Heroimage NENÍ vidět → zobrazit šipku
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) observer.unobserve(heroRef.current);
    };
  }, []);

  return (
    <div className={styles.background}>
      <div ref={heroRef}>
        <Heroimage />
      </div>
      <div>
        <TechnicalsF
          Tech1={filmData.Tech1}
          Tech2={filmData.Tech2}
                  

          Link={filmData.Link}
          Rok={filmData.Rok}
          Zákazníci={filmData.Zákazníci}
          Font={filmData.Font}
         />
      </div>
      <div
        style={{
          opacity: showArrow ? 1 : 0,
          transition: 'opacity 0.8s ease-in-out',
        }}
      >
        <Link href="/Portfolio">
        <Image
          className={styles.image}
          src="/ArrowDB.svg"
          alt="Zpět"
          width={60}
          height={60}
        />
        </Link>
      </div>
      
      <Footer />
    </div>
  )
};

export default Page;
