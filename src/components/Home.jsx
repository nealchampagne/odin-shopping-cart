import purplevisor from "../assets/purplevisor.jpg";
import purplesneakers from "../assets/purplesneakers.jpg";
import purpleglasses from "../assets/purpleglasses.jpg";
import flowerpocket from "../assets/flowerpocket.jpg";
import styles from "../styles/Home.module.css";
import { useState, useEffect } from "react";

// Show the aesthetic home page component
const Home = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 4;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const imageElements = document.querySelectorAll('img');

    const handleImageLoad = () => {
      setImagesLoaded((prev) => prev + 1);
    }

    imageElements.forEach((img) => {
      img.onload = handleImageLoad;
    });
  }, []);

  useEffect(() => {
    if (imagesLoaded === totalImages) {
      setLoading(false);
    }
  }, [imagesLoaded]);

  return (
    <>
    {/* If images are still loading, show loading message */}
      <h1 data-testid="loading" className={
        loading ? styles.loading : styles.hidden}>Loading...</h1>
      <div data-testid="home" className={
        loading ? styles.hidden : styles.home}>
        <h1 className={styles.title}>KON · SUMP · SHON</h1>
        <div className={styles.imagecontainer}>
          <img className={styles.image + " " + styles.one} src={purpleglasses} />
          <img className={styles.image + " " + styles.two} src={purplevisor} />
          <img
            className={styles.image + " " + styles.three}
            src={purplesneakers}
          />
          <img className={styles.image + " " + styles.four} src={flowerpocket} />
        </div>
      </div>
    </>
  );
};

export default Home;
