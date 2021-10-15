import styles from "./ListBoxLoading.module.scss";
import ListBox from "@/components/Utils/LayoutComponent/ListBox";

type Props = {
  n: number;
}
const ListBoxLoading: React.VFC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <ListBox>
        {[...Array(props.n)].map((_, i) => (
          <div key={i} className={i % 2 ? styles.boxEven : styles.boxOdd}></div>
        ))}
      </ListBox>
    </div>
  );
};

export default ListBoxLoading;