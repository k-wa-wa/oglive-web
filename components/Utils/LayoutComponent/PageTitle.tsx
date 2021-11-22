import { useEffect, useRef } from "react";
import ShuffleText from "shuffle-text";
import styles from "./PageTitle.module.scss";

type Props = {
  title: string;
};
const PageTitle: React.VFC<Props> = (props) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      const text = new ShuffleText(el);
      text.duration = 800; // ms
      text.start();
    }
  }, []);

  return (
    <div className={styles.root}>
      <h2 ref={ref} className={styles.title}>{props.title}</h2>
    </div>
  );
};

export default PageTitle;