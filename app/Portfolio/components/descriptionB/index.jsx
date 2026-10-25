import React from 'react';
import styles from './Description.module.scss';
import { Text as I18nText } from "../../../i18n/Text";

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
          <h2 className="j-font3 text-2xl font-bold"><I18nText>{title}</I18nText></h2>
          <p className="j-font4 text-[16px]"><I18nText>{content}</I18nText></p>
        </div>
        <div>
          <h2 className="j-font3 text-2xl font-bold"><I18nText>{title1}</I18nText></h2>
          <p className="j-font4 text-[16px]"><I18nText>{content1}</I18nText></p>
        </div>
      </div>
      <div className={styles.column}>
        <div>
          <h2 className="j-font3 text-2xl font-bold"><I18nText>{title2}</I18nText></h2>
          <p className="j-font4 text-[16px]"><I18nText>{content2}</I18nText></p>
        </div>
        <div>
          <h2 className="j-font3 text-2xl font-bold"><I18nText>{title3}</I18nText></h2>
          <p className="j-font4 text-[16px]"><I18nText>{content3}</I18nText></p>
        </div>
        <div>
          <h2 className="j-font3 text-2xl font-bold"><I18nText>{title4}</I18nText></h2>
          <p className="j-font4 text-[16px]"><I18nText>{content4}</I18nText></p>
        </div>
      </div>
      
    </div>
  );
}
