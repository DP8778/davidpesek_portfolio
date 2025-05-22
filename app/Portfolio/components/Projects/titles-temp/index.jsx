import React from 'react';
import styles from './Titles.module.scss';
import Link from 'next/link';

export default function index({ data, setSelectedProject }) {
    return (
        <div className={styles.titles}>
            {data.map((project, i) => (
                <Title key={i} data={{ ...project, i }} setSelectedProject={setSelectedProject} />
            ))}
        </div>
    );
}

function Title({ data, setSelectedProject }) {
    const { title, i, link } = data;

    const Wrapper = link ? Link : 'div';

    return (
        <div className={styles.title}>
            <Wrapper href={link || "#"} passHref>
                <div
                    className={styles.wrapper}
                    onMouseOver={() => setSelectedProject(i)}
                    onMouseLeave={() => setSelectedProject(null)}
                >
                    <p>{title}</p>
                </div>
            </Wrapper>
        </div>
    );
}
