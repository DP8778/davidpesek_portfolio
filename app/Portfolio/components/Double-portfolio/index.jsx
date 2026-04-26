'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './doublep.module.scss';
import Image from 'next/image';
import { gsap } from 'gsap';

const pairs = [
  
  ['/galery/port-1.png', '/galery/portB-1.png'],
  ['/galery/portC-1.png', '/fan-pic2.png'],
  [ '/deardiary.png','/galery/typeface1.png'],
];

export default function Doublep({ onScrollToProjectNew, onScrollToGallery }) {
  const [slide, setSlide] = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setSlide((s) => (s + 1) % pairs.length);
    }, 17000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const [leftImg, rightImg] = [leftRef.current, rightRef.current];
    if (leftImg && rightImg) {
      gsap.set([leftImg, rightImg], { x: '100%' });
      gsap.to([leftImg, rightImg], {
        x: '0%',
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
      });
    }
  }, [slide]);

  const open = (src) => setLightboxSrc(src);
  const close = (e) => {
    e.stopPropagation();
    setLightboxSrc(null);
  };

  const [leftSrc, rightSrc] = pairs[slide];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.subdiv}>
          <div className={styles.texttop}>
            <h1 className={styles.name}>David Pešek</h1>
            <div className={styles.skills}>
              <h2 className={styles.skill1} onClick={onScrollToProjectNew}>UX/UI</h2>
              <h2 className={styles.skill3} onClick={onScrollToGallery}>Product design</h2>
              <h2 className={styles.skill2} onClick={onScrollToProjectNew}>Web development</h2>
              
            </div>
          </div>

          <div className={styles.div}>
            <div className={styles.half1} onClick={() => open(leftSrc)}>
              <div ref={leftRef} className={styles.imageInner}>
                <Image
                  src={leftSrc}
                  alt="Slide image"
                  fill
                  style={{ objectFit: 'contain', borderRadius: '30px' }}
                />
              </div>
            </div>
            <div className={styles.half2} onClick={() => open(rightSrc)}>
              <div ref={rightRef} className={styles.imageInner}>
                <Image
                  src={rightSrc}
                  alt="Slide image"
                  fill
                  style={{ objectFit: 'contain', borderRadius: '30px' }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.ellipse}>
          <div className={styles.bottom}>
            <div onClick={onScrollToProjectNew} className={styles.image} >
              <Image src="/Vector3.svg" alt="Scroll"  fill />
            </div>
          </div>
        </div>
      </div>

      {lightboxSrc && (
        <div className={styles.lightbox} onClick={close}>
          <button className={styles.closeBtn} onClick={close}>×</button>
          <img src={lightboxSrc} alt="Full screen" />
        </div>
      )}
    </>
  );
}
