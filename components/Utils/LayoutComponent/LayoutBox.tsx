import Image from "next/image";
import Parallax from "../Animation/Parallax";
import styles from "./LayoutBox.module.scss";
import { useThemeContext } from "@/modules/theme-context";

type Props = {
  title: string;
  img?: string;
  children: React.ReactNode;
  fixedChildren?: boolean;
};
const LayoutBox: React.VFC<Props> = (props) => {
  const title = props.title;
  const { theme } = useThemeContext();

  return (
    <div className={styles.root}>
      <div className={styles.line}></div>

      <div className={styles.vertical}>
        <Parallax animVars={{ y: -100 }}>
          <h2>{title}</h2>
          <div className={styles.img}>
            {(theme.name === "light" && props.img) && <Image src={props.img} layout="fill" alt={props.img} />}
          </div>
        </Parallax>
      </div>

      <div className={styles.box}>
        {props.children}
      </div>
    </div>
  );
};

export default LayoutBox;