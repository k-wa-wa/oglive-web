import Link from "next/link";

import styles from "./ViewAll.module.scss";

type Props = {
  liveVolume: queryParamsType
}
const ViewAll: React.VFC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <Link href="/[liveVolume]/contents" as={`/${props.liveVolume}/contents`} passHref>
        <div className={styles.viewAll}>
          <div className={styles.text}>View All</div>
          <a className={styles.arrow}>&#9657;</a>
        </div>
      </Link>
    </div>
  );
};

export default ViewAll;