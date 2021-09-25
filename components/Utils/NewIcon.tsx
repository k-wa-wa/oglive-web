
import styles from "./NewIcon.module.scss";

type Props = {
  show: boolean;
}
const NewIcon: React.VFC<Props> = (props) => {
  if (props.show) {
    return (
      <div className={styles.root}>
        <span className={styles.new}>
          new
        </span>
      </div>
    );
  } else {
    return <></>;
  }
};

export default NewIcon;