

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react";
import styles from "./ToPageTopBtn.module.scss";

const ToPageTopButton = () => {
  const ref = useRef<HTMLAnchorElement>(null);
  return <></>;

/*   useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    setAnimation();
  }, []);


  const setAnimation = () => {
    gsap.from(ref.current, {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: ref.current,
        scrub: true
      }
    });
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <a
          href="#"
          ref={ref}
          className={styles.button}
          //onClick={() => { window.scroll({ top: 0, left: 0, behavior: 'smooth' }); }}
          >
          ↑
        </a>
      </div>
    </div>
  ); */
};

export default ToPageTopButton;