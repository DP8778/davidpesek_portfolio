import React from 'react';
import styles from './Description.module.scss';

export default function DynamicCard({
  title, content,
  title1, content1,
  title2, content2,
  title3, content3,
  title4, content4
}) {
  return (
    <div className={styles.card}>
      <div className={styles.column}>
        <div>
          <h2 className="j-font3 text-2xl font-bold">{title}</h2>
          <p className="j-font4 text-[16px]">{content}</p>
        </div>
        <div>
          <h2 className="j-font3">{title1}</h2>
          <p className="j-font4 text-[16px]">{content1}</p>
        </div>
      </div>
      <div className={styles.column}>
        <div>
          <h2 className="j-font3 text-2xl font-bold">{title2}</h2>
          <p className="j-font4 text-[16px]">{content2}</p>
        </div>
        <div>
          <h2 className="j-font3">{title3}</h2>
          <p className="j-font4 text-[16px]">{content3}</p>
        </div>
        <div>
          <h2 className="j-font3">{title4}</h2>
          <p className="j-font4 text-[16px]">{content4}</p>
        </div>
      </div>
      
    </div>
  );
}
