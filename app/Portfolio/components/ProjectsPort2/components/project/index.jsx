'use client';
import React from 'react';
import Link from 'next/link';
import styles from './style.module.scss';

export default function Project({ index, title, slug, manageModal }) {
  const handleMouseEnter = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth > 900) {
      manageModal(true, index, e.clientX, e.clientY);
    }
  };

  const handleMouseLeave = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth > 900) {
      manageModal(false, index, e.clientX, e.clientY);
    }
  };

  return (
    <Link
      href={`/Portfolio/${slug}`}
      className={styles.project}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className={styles.nadpis}>{title}</h2>
      <p className={styles.popis}>Design & Prototype</p>
    </Link>
  );
}
