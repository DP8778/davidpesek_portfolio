"use client"
import React, { useState } from 'react';
import styles from './galery.module.scss';

const imageUrls = [
  
  '/galery/port-1.png',
  '/galery/portB-1.png',
  '/galery/portC-1.png',

  '/deardiary.png',
  '/deardiary-ph.PNG',
  '/dd12.png',

  '/galery/typeface1.png',
  '/galery/typeface2.png',
  '/fan-pic2.png',

  '/malir6.png',
  '/pumpposterBBigger.png',
  '/pump_insta.jpg',
  '/dp-web.png',
  
  '/galery/zamek1.png',
  
  '/fan-pic2.png',


  '/merPal.png',
  '/sklenickaPal.png',
  '/vizitkaPal.png',
  
  
];

const Gallery = () => {
  const [lightboxSrc, setLightboxSrc] = useState(null);

  const openLightbox = (src) => setLightboxSrc(src);
  const closeLightbox = () => setLightboxSrc(null);

  return (
    <>
      {/* wrapper s max-width */}
      <div className={styles.wrapper}>
        <h1 className={styles.nadpis}>Galerie</h1>
        <div className={styles.grid}>
          {imageUrls.map((src, idx) => (
            <div
              key={idx}
              className={styles.item}
              onClick={() => openLightbox(src)}
            >
              <img src={src} alt={`Galerie ${idx + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {lightboxSrc && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <img src={lightboxSrc} alt="Zvětšený obrázek" />
        </div>
      )}
    </>
  );
};

export default Gallery;
