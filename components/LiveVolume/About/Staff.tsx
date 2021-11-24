import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import styles from "./Staff.module.scss";

type Props = {
  staff: CmsStaffType
}
const Staff: React.VFC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const imgSize = 150;
  const staff = props.staff;

  useEffect(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerWidth / 2;
    const mouseMoveListener = (event: MouseEvent) => {
      const clientX = event.clientX;
      const clientY = event.clientY;

      if (ref.current) {
        let translateX = "0";
        let translateY = "0";
        if (clientX >= centerX) {
          translateX = "-100%";
        }
        if (clientY >= centerY) {
          translateY = "-100%";
        }
        ref.current.style.transform = `translate(${clientX}px, ${clientY}px) translate(${translateX}, ${translateY})`;
      }
    };

    window.addEventListener("mousemove", mouseMoveListener);

    return () => window.removeEventListener("mousemove", mouseMoveListener);
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.item}>
        <div className={styles.imgBox}>
          <Image src={staff.imageUrl ?? "/staff.svg"} width={imgSize} height={imgSize} alt="staff" />
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

      <div className={styles.commentBox}>
        <p><span>コメント:</span> {staff.comment}</p>
      </div>

      <div ref={ref} className={styles.tooltip}>
        <h3>{staff.name}</h3>
        <div>{staff.comment}</div>
      </div>
    </div>
  );
};

export default Staff;