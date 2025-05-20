"use client";

import { DualRing } from "react-css-spinners";
import styles from "./Preloader.module.scss";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isLoading ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className={`${styles.preloader} ${!isLoading ? styles.hidden : ""}`}
    >
      {isLoading && (
        <div className={styles.logoContainer}>
          {/* Bigger centered image */}
          <Image
            src="/Preloader-ell.png"
            width={200}  // Increase size
            height={200}
            alt="Loader"
            className={styles.logoImage}
          />
          {/* Ellipsis in the center of the image */}
          <div className={styles.spinner}>
            <DualRing color="rgba(100,100,100,0.5)" size={70} thickness={3} />
          </div>
        </div>
      )}
      {!isLoading && (
        <motion.div
          className={styles.landing}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* The content of the Landing page */}
        </motion.div>
      )}
    </motion.div>
  );
}
