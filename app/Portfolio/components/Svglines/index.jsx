'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function LinkaScroll() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "power1.inOut", // Plynulé zpomalení/zrychlení
      scrollTrigger: {
        trigger: path,
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1, // Malý delay pro plynulost animace
      },
    });
  }, []);

  return (
    <div style={{ height: '250vh', position: 'relative' }}>
      <div 
        className="obrazek one" 
        style={{
          width: 50,
          height: 50,
          background: 'lightgray',
          borderRadius: '50%',
          position: 'absolute',
          top: 100,
          left: 100,
        }}
      />
      <div 
        className="obrazek two" 
        style={{
          width: 50,
          height: 50,
          background: 'lightgray',
          borderRadius: '50%',
          position: 'absolute',
          top: 600,
          left: 400,
        }}
      />
      
      <svg
        viewBox="0 0 500 700" // Celkový prostor cesty
        style={{
          position: 'absolute',
          top: 100,
          left: 100,
          width: 500,
          height: 700,
          overflow: 'visible',
        }}
      >
        <path 
          ref={pathRef} 
          d="M25 0 V400 Q250 500 300 500 H400" // Oblouček na rohu
          stroke="white" 
          strokeWidth="4" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
