"use client";
import React, { useState } from "react";
import styles from "./Fgalery.module.scss";

const imageData = [
  { src: "/galery/portB-1.png" },
  { src: "/galery/dd1.png" },
  { src: "/galery/dd14.PNG" },
  { src: "/galery/port-1.png" },
  { src: "/galery/malir6.png" },

  { src: "/galery/portC-1.png" },
  { src: "/galery/fan-pic2.png" },
  { src: "/galery/port-1.png" },
  { src: "/galery/3.PNG" },
  { src: "/galery/pump_insta.jpg" },
  { src: "/galery/pumpposterBBigger.png" },

  { src: "/folder19/5.jpg" },
];

export default function Gallery() {
  const [lightboxImg, setLightboxImg] = useState(null);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {imageData.map((img, idx) => (
            <div
              key={idx}
              className={styles.item}
              onClick={() => setLightboxImg(img.src)}
            >
              <img src={img.src} alt="" />
            </div>
          ))}
        </div>
      </div>

      {lightboxImg && (
        <div className={styles.lightbox} onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} alt="zoomed-image" />
        </div>
      )}
    </>
  );
}
