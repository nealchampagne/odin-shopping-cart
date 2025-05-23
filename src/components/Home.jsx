import purplevisor from "../assets/purplevisor.jpg";
import purplesneakers from "../assets/purplesneakers.jpg";
import purpleglasses from "../assets/purpleglasses.jpg";
import flowerpocket from "../assets/flowerpocket.jpg";
import styles from "../styles/Home.module.css";
import { useState, useEffect, useRef } from "react";

// Show the aesthetic home page component
const Home = () => {
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [loading, setLoading] = useState(true);
  const imageRefs = useRef([]);
  const totalImages = 4;

  useEffect(() => {
    const handleImageLoad = () => {
      setImagesLoaded((prev) => prev + 1);
    }

    imageRefs.current.forEach((img) => {
      if (img && img.complete) {
        handleImageLoad();
      } else if (img) {
        img.onload = handleImageLoad;
      }
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
          <img ref={(el) => (imageRefs.current[0] = el)} className={styles.image + " " + styles.one} src={purpleglasses} />
          <img ref={(el) => (imageRefs.current[1] = el)} className={styles.image + " " + styles.two} src={purplevisor} />
          <img
            ref={(el) => (imageRefs.current[2] = el)}
            className={styles.image + " " + styles.three}
            src={purplesneakers}
          />
          <img 
            ref={(el) => (imageRefs.current[3] = el)} 
            className={styles.image + " " + styles.four} src={flowerpocket} />
        </div>
      </div>
    </>
  );
};

export default Home;
