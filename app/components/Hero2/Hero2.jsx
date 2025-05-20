"use client";
import Image from "next/image";
import styles from "./Hero2.module.scss";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import Buttonmail from "../Imgbuttons/Button1";
import Buttonphone from "../Imgbuttons/Button2";
import ButtonF from "../../../common/CustomButtonF"

export default function Index() {
    const textRef = useRef(null);
    const skillRef = useRef(null);
    const skill1Ref = useRef(null);
    const skill2Ref = useRef(null);
    const contactRef = useRef(null);
    const underRef = useRef(null); // Ref for .under div

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Initial animations
        const timeline = gsap.timeline();
        timeline
            .fromTo(
                textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.75, delay: 1.75 }
            )
            .fromTo(skillRef.current, { x: -40, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
            .fromTo(skill1Ref.current, { x: -40, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
            .fromTo(skill2Ref.current, { x: -40, y: 10, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.7 }, "-=0.5")
            .fromTo(contactRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, "-=0.6");

        // Scroll-triggered animation for .under
        gsap.to(underRef.current, {
            y: "7vh", // Moves the .under div down by 50% of the viewport height
            ease: "power2.out",
            scrollTrigger: {
                trigger: `.${styles.divize}`, // The section that triggers the animation
                start: "top top", // Starts when the section reaches the top of the viewport
                end: "bottom center", // Ends when the bottom reaches the center
                scrub: 1, // Smooth animation linked to scroll progress
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    return (
        <div className={styles.divize}>
            {/* Under section with scroll animation */}
            <div ref={underRef} className={styles.under}>
                <div ref={textRef} className={styles.text}>
                    <p className="j-font4">David Pešek</p>
                </div>
                <div className={styles.skills}>
                    <div ref={skillRef} className="mx-5">
                        <Link href="/Portfolio#Web-development">
                            <div className={styles.dovednostt}>
                                <p className={styles.contactpp}>Web development</p>
                                <Image fill={true} alt="ellipse" src="/Rectangle8w.png" />
                            </div>
                        </Link>
                    </div>
                    <div ref={skill1Ref} className="mx-5">
                        <Link href="/Portfolio/Projekt-no1">
                            <div className={styles.dovednostt}>
                                <ButtonF>
                                <p className={styles.contactpp}>UX/UI</p>
                                </ButtonF>
                                <Image fill={true} alt="ellipse" src="/Rectangle8w.png" />
                            </div>
                        </Link>
                    </div>
                    <div ref={skill2Ref} className="mx-5">
                        <Link href="/Portfolio">
                            <div className={styles.dovednostt}>
                                <p className={styles.contactpp}>Grafický design</p>
                                <Image fill={true} alt="ellipse" src="/Rectangle8w.png" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div ref={contactRef} className={styles.contact}>
                    <div className="j-font4 text-3xl px-10 pt-[45px]">
                        <Buttonphone />
                    </div>
                    <div className="j-font4 text-3xl px-10 pt-[45px]">
                        <Buttonmail />
                    </div>
                </div>
            </div>

            {/* Bottom section */}
            <div className="flex-1 flex flex-col justify-end">
                <div className={styles.paragraph}>
                    <p className={styles.parags}>Projekty</p>
                </div>
            </div>

            {/* Rectangle Image */}
            <div >
                <Image width={1100} height={40} className={styles.rectangle} alt="ellipse" src="/Group3.png" />
            </div>
        </div>
    );
}
