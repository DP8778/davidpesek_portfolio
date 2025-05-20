import React from 'react'
import styles from './Descriptions.module.scss';

export default function index({data, selectedProject}) {

    const crop = (string, maxLength) => {
        return string.substring(0, maxLength);
    }
    
    
    return (
        <div className={styles.descriptions}>
            {
                data.map( (project, i) => {
                    const { title, description, image } = project;
                    return (
                    <div 
                        key={i} 
                        className={styles.description}
                        style={{clipPath: selectedProject == i ? "inset(0 0 0)" : "inset(50% 0 50%"}}
                    >
                        <p>{crop(title, 90)}</p>
                        
                        <img src={image} alt={title} className={styles.image} />
                    </div>
                    )
                })
            }
        </div>
    )
}