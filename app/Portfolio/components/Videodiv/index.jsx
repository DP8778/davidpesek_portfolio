import React from 'react'
import styles from './Videodiv.module.scss'

const index = () => {
  return (
    <div id='Video-div' className={styles.vid}>
        <div className={styles.videoContainer2}>
            
                <video autoPlay loop muted playsInline className={styles.video}>
                    <source src="/fan-video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            
        </div>
        <div className={styles.videoContainer}>
            
                <video autoPlay loop muted playsInline className={styles.video}>
                    <source src="/record1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            
        </div>
    </div>
  )
}

export default index