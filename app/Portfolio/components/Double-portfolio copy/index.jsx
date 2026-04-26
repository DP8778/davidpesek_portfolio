import React from 'react';
import styles from './doublep.module.scss';
import Image from 'next/image';

const Index = () => {
  return (
    <div className={styles.container}>
      <div className={styles.subdiv}>
        <div className={styles.texttop}>
                <h1 className={styles.name}>David Pešek</h1>
                <div className={styles.skills}>
                    <h2 className={styles.skill1}>UX/UI</h2>
                    <h2 className={styles.skill2}>Web development</h2>
                    <h2 className={styles.skill3}>Grafický design</h2>
                </div>
        </div>
        <div className={styles.div}>
            
            <div className={styles.half1}>
                <Image  src="/malir1.png"
                        alt="Profilový obrázek"
                        fill
                        style={{ objectFit: 'contain', borderRadius: '30px' }} />
            </div>
            <div className={styles.half2}>
                <Image  src="/deardiary.png"
                        alt="Profilový obrázek"
                        fill
                        style={{ objectFit: 'contain', borderRadius: '30px' }} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Index;