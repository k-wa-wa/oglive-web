import Parallax from "../Animation/Parallax";
import styles from "./PageTitle.module.scss";

type Props = {
  title: string;
};
const PageTitle: React.VFC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <Parallax animVars={{ y: -200 }}>
        <h2 className={styles.title}>{props.title}</h2>
      </Parallax>
    </div>
  );
};

export default PageTitle;