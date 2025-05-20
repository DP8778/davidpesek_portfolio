'use client'

import React, { useEffect, useRef, useState } from 'react'
import Heroimage from "../components/HeroimageB"
import Videodiv from '../components/Videodiv2'
import Description from '../components/descriptionB'
import Footer from '../components/Footer-project'
import styles from './Projekt2.module.scss'
import Lenis from '@studio-freight/lenis';
import Technicals from '../components/TechnicalsB'
import { filmData } from "./content2.jsx";
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

      <Description
        title={filmData.title}
        content={filmData.content}
        title1={filmData.title1}
        content1={filmData.content1}
        title2={filmData.title2}
        content2={filmData.content2}
        title3={filmData.title3}
        content3={filmData.content3}
        title4={filmData.title4}
        content4={filmData.content4}
      />

      <Technicals
        Tech1={filmData.Tech1}
        Tech2={filmData.Tech2}
        Tech3={filmData.Tech3}
        Tech4={filmData.Tech4}
        Barvy={filmData.Barvy}
        Technologie={filmData.Technologie}
        Font={filmData.Font}
        Link={filmData.Link}
        Rok={filmData.Rok}
        Zákazníci={filmData.Zákazníci}
      />

      <Videodiv />
      <Footer />
    </div>
  )
};

export default Page;
