
import styles from "./LoadingBody.module.scss";

const LoadingBody = () => {
  return (
    <div className={styles.root}>
      <div className={styles.spinner}>
        <a className={styles.text}>
          Loading...
        </a>
        <div className={styles.cube1}></div>
        <div className={styles.cube2}></div>
      </div>
    </div>
  );
};

export default LoadingBody;