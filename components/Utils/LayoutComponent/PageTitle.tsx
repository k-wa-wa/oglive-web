import Reveal from "../Animation/Reveal";
import styles from "./PageTitle.module.scss";

type Props = {
  title: string;
};
const PageTitle: React.VFC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <Reveal transformFrom="translate(0, -2rem)">
        <h2 className={styles.title}>{props.title}</h2>
      </Reveal>
    </div>
  );
};

export default PageTitle;