import { Link } from "react-router-dom";
import styles from '../styles/ErrorPage.module.css'

const ErrorPage = ({error}) => {
  return (
    <div className={styles.errorPage}>
      <h1 className={styles.errorHeading}>Error:</h1>
      <h2 className={styles.errorMessage}>{error ? `${error}` 
      : `This route doesn't exist!`}</h2>
      <Link className={styles.rescueLink} to="/">
        Return to home page
      </Link>
    </div>
  );
};

export default ErrorPage;