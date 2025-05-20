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


  const [mainImage, setMainImage] = useState('/images/fan-pic2.png');
  const [thumbnails, setThumbnails] = useState([
    '/ff1.png',
    '/ff2.png',
    '/ff3.png',
    
  ]);

  const handleThumbnailClick = (clickedIndex) => {
    const newMain = thumbnails[clickedIndex];
    const newThumbs = [...thumbnails];
    newThumbs.splice(clickedIndex, 1);
    newThumbs.push(mainImage); // move old main image to end
    setMainImage(newMain);
    setThumbnails(newThumbs);
  };

  useEffect(() => {
          gsap.registerPlugin(ScrollTrigger);
  
          // Initial animations
          const timeline = gsap.timeline();
          timeline
              .fromTo(
                  textRef.current,
                  { y: 50, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.5  }
              )
              .fromTo(skillRef.current, { x: -30, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
              .fromTo(skill1Ref.current, { y: 40, x: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.5 }, "-=0.5")
              .fromTo(skill2Ref.current, { x: -40, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
              .fromTo(contactRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.6");
  
          // Scroll-triggered animation for .under
          gsap.to(underRef.current, {
              y: "7vh", // Moves the .under div down by 50% of the viewport height
              ease: "power2.out",
              scrollTrigger: {
                  trigger: `.${styles.divize}`, // The section that triggers the animation
                  start: "top top", // Starts when the section reaches the top of the viewport
                  end: "bottom center", // Ends when the bottom reaches the center
                  scrub: 1, // Smooth animation linked to scroll progress
              },
          });
  
          return () => {
              ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
          };
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
            {thumbnails.map((src, index) => (
              <div
                key={index}
                className={styles.imgbottom}
                onClick={() => handleThumbnailClick(index)}
              >
                <Image  src={src} fill className={styles.cover} alt={`Thumbnail ${index}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div ref={skill1Ref} className={styles.orientation}>
        <Link href="/Portfolio#Web-development">
        <div className={styles.toparrowdiv}>
          <div  className={styles.toparrow}> 
              <Image src="/Arrow5.svg" fill alt="Up" />
          </div>
        </div>
        </Link>
        <div className={styles.bottarrow}>
          <Link href="/Portfolio/Projekt-no1#Video-div">
          <div  className={styles.linkInner}>
            <div className={styles.vertical}>SCROLL</div>
            <Image className={styles.arrow} src="/Arrowdown.svg" fill alt="Down" />
          </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
