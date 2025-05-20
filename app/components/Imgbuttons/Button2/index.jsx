import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./Button2.module.scss";

export default function Button({ backgroundColor = "#455CE9", ...attributes }) {
  const lettersRef = useRef([]); // Ref pro jednotlivá písmena
  const imageRef = useRef(null); // Ref pro obrázek

  useEffect(() => {
    return () => {
      lettersRef.current = [];
    };
  }, []);

  const handleMouseEnter = () => {
    // Animace textu
    gsap.to(lettersRef.current, {
      color: "#455CE9",
      stagger: 0.01,
      ease: "power3.out",
      duration: 0.16,
      onComplete: () => {
        // Animace obrázku po dokončení animace textu
        gsap.to(imageRef.current, {
          opacity: 1,
          duration: 0.1,
          ease: "power3.out",
        });
      },
    });
  };

  const handleMouseLeave = () => {
    // Reset obrázku
    gsap.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.out",
    });

    // Reset textu
    gsap.to(lettersRef.current, {
      color: "#dfdfdf",
      stagger: 0.03,
      ease: "power3.out",
      duration: 0.3,
    });
  };

  const text = "tel. 739140013";

  const renderText = () => {
    return [...text].map((letter, index) => (
      <span
        key={index}
        ref={(el) => (lettersRef.current[index] = el)}
        className={styles.letter}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div
      className={styles.roundedButton}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...attributes}
    >
      <p className={styles.text}>{renderText()}</p>
      {/* Obrázek */}
      <img
        ref={imageRef}
        src="/images/phone.png"
        alt="Decorative"
        className={styles.image}
      />
    </div>
  );
}
