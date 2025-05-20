'use client';
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Butt from './Butt/index.jsx';
import styles from './Headertwo.module.scss';
import Nav from './Navigation';

const menu = {
    open: {
        width: "20vw",
        height: "45vh",
        top: "-25px",
        right: "-25px",
        transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
    },
    closed: {
        width: "100px",
        height: "40px",
        top: "0px",
        right: "0px",
        transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
    }
}

export default function Index() {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={styles.header}>
            <motion.div 
                className={styles.menu}
                variants={menu}
                animate={isActive ? "open" : "closed"}
                initial="closed"
            >
                <AnimatePresence>
                    {isActive && <Nav />}
                </AnimatePresence>
            </motion.div>
            <Butt isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
        </div>
    )
}