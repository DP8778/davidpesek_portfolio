import styles from './Double.module.scss'
import { projects } from '../../data/data.js';
import Image from 'next/image';
import Comp from './comp';
import Link from 'next/link';
import ButtonF from '../../../common/CustomButtonB';

export default function Home() {
  return (
    <main className={styles.main}>
      
      <div className={styles.gallery}>
        <Comp projects={[projects[0], projects[1]]}/>
        <Comp projects={[projects[2], projects[3]]} reversed={true} className="pt-10" />
      </div>
      <Link href={"/Portfolio"}>
      <div className={styles.gradient}>
        <ButtonF>
        <p className={styles.paragraph}>Zobrazit celé portfolio</p>
        </ButtonF>
      </div>
      </Link>
    </main>
  )
}