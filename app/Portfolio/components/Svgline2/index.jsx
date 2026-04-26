'use client'; // pokud jsi v Next.js App Routeru (Next 13+)

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
      scrollTrigger: {
        trigger: path,
        start: "top 60%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  }, []);

  return (
    <div style={{ height: '200vh', position: 'relative' }}>
      <div 
        className="obrazek one" 
        style={{
          width: 50,
          height: 50,
          background: 'lightgray',
          borderRadius: '50%',
          position: 'absolute',
          top: 100,
          left: 50,
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
          top: 400,
          left: 400,
        }}
      />
      <svg 
        style={{
          position: 'absolute',
          top: 100,
          left: 50,
          width: 500,
          height: 500,
          overflow: 'visible',
        }}
      >
        <path 
          ref={pathRef} 
          d="M75 125 Q 250 250 425 425" 
          stroke="white" 
          strokeWidth="3" 
          fill="none" 
        />
      </svg>
    </div>
  );
}
