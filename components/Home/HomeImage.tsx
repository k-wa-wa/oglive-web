import Image from "next/image";
import styles from "./HomeImage.module.scss";

const HomeImage = () => {
  const src = "/home_mono.png";
  return (
    <div className={styles.root}>
      <Image src={src} width={1024} height={512} unoptimized={true} alt="home" />
      <div className={styles.title}>
        <h1>
          Unplugged<br />
          OG Live
        </h1>
      </div>
    </div>
  );
};

export default HomeImage;