"use client";


import Header from '../components/Headertwo';
import Hero2 from '../components/Hero2/Hero2';
import Double from '../components/Double';
import Technologies from "../components/Technologies";



import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import { useEffect, useState } from 'react';
import Lenis from 'lenis'


import Footer from '../components/Footer';


export default function Page () {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
      document.body.style.cursor = 'default';
      window.scrollTo(0, 0);
    }, 2000); // Preloader duration

    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.1, // Adjust for smoother scrolling
      smooth: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy(); // Cleanup on unmount
  }, []);

  return (
    <main className=''>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Header />
      <Hero2 />
      <Double />
      <Technologies />
      <Footer />
    </main>
  );
}