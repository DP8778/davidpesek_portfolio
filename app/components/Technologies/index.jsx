"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import Picture1 from "../../../public/images/framer.png";
import Picture2 from "../../../public/images/figma.png";
import Picture3 from "../../../public/images/blender.jpg";
import Lenis from "lenis";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./Technologies.module.scss";

const Index = () => {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]); // ✅ Define height here

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  return (
    <main className={styles.mains}>
      <p className={styles.paragraphs}>Používané technologie:</p>
      <div className="h-[10vh]" />
      
      <div ref={container}>
        <Slide src={Picture1} direction="left" left="-40%" progress={scrollYProgress} height={height} />
        <Slide src={Picture2} direction="right" left="-25%" progress={scrollYProgress} height={height} />
        <Slide src={Picture3} direction="left" left="-75%" progress={scrollYProgress} height={height} />
      </div>
      <div className={styles.lowgradient1} />
      <div className={styles.lowgradient} />
      
    </main>
  );
};

const Slide = ({ src, direction, left, progress, height }) => {
  const dir = direction === "left" ? -1 : 1;
  const translateX = useTransform(progress, [0, 1], [150 * dir, -150 * dir]);

  return (
    <motion.div style={{ x: translateX, left }} className="relative flex whitespace-nowrap">
      <Phrase src={src} height={height} /> {/* ✅ Pass height as prop */}
      <Phrase src={src} height={height} />
      <Phrase src={src} height={height} />
    </motion.div>
  );
};

const Phrase = ({ src, height }) => {
  return (
    <div className="px-5 flex gap-5 items-center bg-black">
      <p className="text-[2vw]">Tailwind / Next JS / GSAP / Framer Motion / Figma</p>
      <span className="relative h-[4.5vw] aspect-[4/2] rounded-full overflow-hidden">
        <Image style={{ objectFit: "cover" }} src={src} alt="image" fill />
      </span>
      
    </div>
  );
};

export default Index;
