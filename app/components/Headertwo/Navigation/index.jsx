import styles from './navigation.module.scss';
import { motion } from 'framer-motion';
import { links, footerLinks } from './data';
import { perspective, slideIn } from "./anim";
import Link from 'next/link'; // ← přidej tento import

export default function Index() {
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {
          links.map((link, i) => {
            const { title, href } = link;
            return (
              <div key={`b_${i}`} className={styles.linkContainer}>
                <Link href={href} passHref>
                  <motion.a
                    custom={i}
                    variants={perspective}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className={styles.link} // volitelné – můžeš přidat className
                  >
                    {title}
                  </motion.a>
                </Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
