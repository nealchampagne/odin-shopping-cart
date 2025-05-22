import styles from "../styles/ShimmerCard.module.css";

const ShimmerCard = ({ type }) => {
  return (
    // Show shop or cart item shimmer configuration based on "type" prop
    <>
      {type === "shop" ? (
        <div className={styles.shopCard}>
          <div className={styles.shimmer + " " + styles.title}></div>
          <div className={styles.shimmer + " " + styles.titleEnd}></div>
          <div className={styles.shimmer + " " + styles.shopImage}></div>
          <div className={styles.shimmer + " " + styles.content}></div>
          <div className={styles.shimmer + " " + styles.button}></div>
        </div>
      ) : (
        <div className={styles.cartCard}>
          <div className={styles.shimmer + " " + styles.cartImage}></div>
          <div className={styles.info}>
            <div className={styles.shimmer + " " + styles.title}></div>
            <div className={styles.shimmer + " " + styles.titleEnd}></div>
            <div className={styles.shimmer + " " + styles.content}></div>
            <div className={styles.shimmer + " " + styles.button}></div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShimmerCard;
