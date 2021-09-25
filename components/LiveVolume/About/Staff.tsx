import Image from "next/image";
import { useEffect, useState } from "react";

import styles from "./Staff.module.scss";

type Props = {
  staff: CmsStaffType
}
const Staff: React.VFC<Props> = (props) => {
  const imgSize = 150;
  const staff = props.staff;

  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [translateX, setTranslateX] = useState<"0" | "-100%">("0");

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const mouseMoveListener = (event: MouseEvent) => {
      setMouseX(event.clientX);
      setMouseY(event.clientY);
      if (event.clientX <= centerX) {
        setTranslateX("-100%");
      } else {
        setTranslateX("0");
      }
    };

    window.addEventListener("mousemove", mouseMoveListener);

    return () => {
      window.removeEventListener("mousemove", mouseMoveListener);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div className={styles.imgBox}>
          <Image src={staff.imageUrl} width={imgSize} height={imgSize} objectFit="cover" alt="staff" />
        </div>
      </div>

      <br />

      <div className={styles.item}>
        <a className={styles.name}>{staff.name}</a>
      </div>

      <br />

      <div className={styles.item}>
        <a className={styles.nickname}>{staff.nickname}</a>
      </div>

      <br />

      <div className={styles.tooltip}
        style={{ transform: `translate(${mouseX}px, ${mouseY}px) translateX(${translateX})` }}>
        <h3>{staff.name}</h3>
        <div>{staff.comment}</div>
      </div>
    </div>
  );
};

export default Staff;