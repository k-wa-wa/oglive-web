import Image from "next/image";
import Reveal from "../Animation/Reveal";
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
      <Reveal transformFrom="translate(-5rem, 0)">
        <div className={styles.line}></div>
      </Reveal>

      <div className={styles.vertical}>
        <Reveal transformFrom="translate(-10rem, 0)">
          <h2>{title}</h2>
          <div className={styles.img}>
            {(theme.name === "light" && props.img) && <Image src={props.img} layout="fill" alt={props.img} />}
          </div>
        </Reveal>
      </div>

      <div className={styles.box}>
        <Reveal transformFrom="translate(0, 5rem)">
          {props.children}
        </Reveal>

      </div>
    </div>
  );
};

export default LayoutBox;