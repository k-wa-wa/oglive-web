import Link from "next/link";

import styles from "./H1.module.scss";

type Props = {
  liveVolume: queryParamsType;
};
const H1: React.VFC<Props> = (props) => {
  const liveVolume = props.liveVolume;
  const liveVolumeN = Number(String(liveVolume).replace("vol", ""));

  return (
    <div className={styles.root}>
      <Link href="/[liveVolume]" as={`/${liveVolume}`} passHref>
        <h1>Vol.{liveVolumeN}</h1>
      </Link>
    </div>
  );
};

export default H1;