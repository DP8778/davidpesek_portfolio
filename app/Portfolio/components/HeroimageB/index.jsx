'use client';
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import styles from './Heroimage.module.scss';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Index = () => {
  const textRef = useRef(null);
  const skillRef = useRef(null);
  const skill1Ref = useRef(null);
  const skill2Ref = useRef(null);
  const contactRef = useRef(null);
  const underRef = useRef(null);

  const [mainImage, setMainImage] = useState('/malir1.png');
  const [allThumbnails, setAllThumbnails] = useState([
    '/malir2.png',
    '/malir3.png',
    '/malir4.png',
    '/malir5.png',
    '/malir6.png',
    '/malir7.png',
    '/malir8.png',
  ]);
  const [thumbStartIndex, setThumbStartIndex] = useState(0);
  const visibleThumbs = allThumbnails.slice(thumbStartIndex, thumbStartIndex + 3);

  const handleThumbnailClick = (indexInView) => {
    const actualIndex = thumbStartIndex + indexInView;
    const newMain = allThumbnails[actualIndex];
    const newThumbs = [...allThumbnails];

    // Vyměň hlavní obrázek s kliknutým náhledem
    newThumbs[actualIndex] = mainImage;
    setMainImage(newMain);
    setAllThumbnails(newThumbs);

    // Pokud byl kliknut poslední zobrazený náhled a existují další obrázky, posuň
    if (indexInView === 2 && thumbStartIndex + 3 < allThumbnails.length) {
      setThumbStartIndex(thumbStartIndex + 1);
    }

    // (Nepovinně) můžeš přidat i posun zpět při kliknutí na první náhled
    if (indexInView === 0 && thumbStartIndex > 0) {
      setThumbStartIndex(thumbStartIndex - 1);
    }
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const timeline = gsap.timeline();
    timeline
      .fromTo(textRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
      .fromTo(skillRef.current, { x: -30, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
      .fromTo(skill1Ref.current, { y: 40, x: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
      .fromTo(skill2Ref.current, { x: -40, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
      .fromTo(contactRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.6");

    gsap.to(underRef.current, {
      y: "7vh",
      ease: "power2.out",
      scrollTrigger: {
        trigger: `.${styles.divize}`,
        start: "top top",
        end: "bottom center",
        scrub: 1,
      },
    });

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <div className={styles.divize}>
      <div className={styles.showcase}>
        <div ref={textRef} className={styles.imagediv}>
          <div className={styles.img}>
            <Image src={mainImage} fill className={styles.cover} alt="Main Image" />
          </div>
        </div>
        <div className={styles.triple}>
          <div ref={skillRef} className={styles.tripledown}>
            {visibleThumbs.map((src, index) => (
              <div
                key={index}
                className={styles.imgbottom}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image src={src} fill className={styles.cover} alt={`Thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={skill1Ref} className={styles.orientation}>
        <Link href="/Portfolio#Web-development">
          <div className={styles.toparrowdiv}>
            <div className={styles.toparrow}>
              <Image className={styles.arrow2} src="/ArrowDB.svg" fill alt="Up" />
            </div>
          </div>
        </Link>
        <div className={styles.bottarrow}>
          <Link href="/Portfolio/Projekt-no1#Video-div">
            <div className={styles.linkInner}>
              <div className={styles.vertical}>SCROLL</div>
              <Image className={styles.arrow} src="/ArrowB.svg" fill alt="Down" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
