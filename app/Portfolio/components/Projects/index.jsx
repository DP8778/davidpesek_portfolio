'use client';
import { useState } from 'react';
import styles from './Projects.module.scss';
import Titles from './titles-temp';
import Descriptions from './descriptions-temp';

const data = [
    {
        title: "Ilustrace a Grafický design portfolio",
        description: "(Návrh a tovrba webu)",
        
        speed: 0.5,
        link: "/Portfolio/Projekt-no1",
        image: "/images/fan-pic.png"
    },
    {
        title: "Malířské služby Růžička",
        description: "(Návrh a tvorba webu)",
        speed: 0.5,
        link: "/Portfolio/Projekt-no2",
        image: "/malir1.png"
    },
    {
        title: "Zámečnictví Dalešický",
        description: "(Návrh a tovrba webu)",
        speed: 0.67,
        link: "/Portfolio/Projekt-no3",
        image: "/zamek1.png"
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
