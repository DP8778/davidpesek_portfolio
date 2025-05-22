import styles from './Customb.module.scss';
import React, { useRef } from 'react';

export default function Index({ children, ...attributes }) {
  const textRef = useRef(null);

  const handleMouseEnter = () => {
    // Add the underline and start the color animation on hover
    textRef.current.classList.add(styles.hovered);
  };

  const handleMouseLeave = () => {
    // Remove the underline and stop the color animation when not hovering
    textRef.current.classList.remove(styles.hovered);
  };

  return (
    <div
      className={styles.button}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...attributes}
    >
      <span ref={textRef} className={styles.text}>
        {children}
      </span>
    </div>
  );
}
