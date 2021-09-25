
import styles from "./LoadingPage.module.scss";

const LoadingPage = () => {
  // https://www.webcreatorbox.com/tech/loading-animation ここから3つほど
  return (
    <div className={styles.root}>
      <div className={styles.loading}>
        <div>G</div>
        <div>N</div>
        <div>I</div>
        <div>D</div>
        <div>A</div>
        <div>O</div>
        <div>L</div>
      </div>
    </div>

  );
};

export default LoadingPage;