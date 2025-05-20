'use client';
import { useState } from 'react';
import styles from './Projects.module.scss';
import Titles from './titles';
import Descriptions from './descriptions';

const data = [
    {
        title: "Ilustrace a Grafický design portfolio - (Návrh a tvorba webu)",
        description: "",
        
        speed: 0.5,
        link: "/Portfolio/Projekt-no1",
        image: "/images/fan-pic.png"
    },
    {
        title: "Malířské služby Růžička - (Návrh a tvorba webu)",
        description: "Developed the Future of UFC Sports Ecosystem despite not being a sports fan.",
        speed: 0.5,
        link: "/Portfolio/Projekt-no2",
        image: "/malir1.png"
    },
    {
        title: "Zámečnictví Dalešický - (Návrh a tvorba webu)",
        description: "Defined the visual concept and design language for the Lincoln Zephyr 2022 but never seen it in real life.",
        speed: 0.67,
        link: "/Portfolio/Projekt-no3",
        image: "/images/fan-pic.png"
    }
];

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    
    return (
        <div className={styles.container}>
            <Titles data={data} setSelectedProject={setSelectedProject} />
            <Descriptions data={data} selectedProject={selectedProject} />
        </div>
    );
}
