import purplevisor from '../assets/purplevisor.jpg'
import purplesneakers from '../assets/purplesneakers.jpg'
import purpleglasses from '../assets/purpleglasses.jpg'
import flowerpocket from '../assets/flowerpocket.jpg'
import styles from '../styles/Home.module.css'
import { useState } from 'react';

const Home = () => {

  const [loaded, setLoaded] = useState(true);

  return (
    <div className={loaded ? styles.home : styles.hidden}>
      <h1 className={styles.title}>KON · SUMP · SHON</h1>
      <div className={styles.imagecontainer}>
        <img className={styles.image + ' ' + styles.one} src={purpleglasses} />
        <img className={styles.image + ' ' + styles.two} src={purplevisor} />
        <img className={styles.image + ' ' + styles.three} src={purplesneakers} />
        <img className={styles.image + ' ' + styles.four} src={flowerpocket} />
      </div>
    </div>
  )
}

export default Home;