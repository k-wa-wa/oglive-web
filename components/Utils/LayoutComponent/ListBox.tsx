
import styles from "./ListBox.module.scss";

type Props = {
  children: React.ReactNodeArray;
}
const ListBox: React.FC<Props> = (props) => {

  return (
    <div className={styles.root}>
      {props.children.map((child, i) => (
        <div key={i} className={styles.box}>
          <div className={styles.block}>
            {child}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListBox;