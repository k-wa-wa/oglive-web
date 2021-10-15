import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from "react";

import styles from "./Reveal.module.scss";

type Props = {
  children: React.ReactNode;
  animVars?: gsap.TweenVars;
};
const Reveal: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ani();
  });

  const defaultAnimVars = {
    scrollTrigger: {
      trigger: ref.current,
      start: "top 80%",
    },
    opacity: 0,
    y: 50,
    duration: 0.8
  };
  const overloadAnimVars = props.animVars || {};
  const ani = () => {
    gsap.from(ref.current, { ...defaultAnimVars, ...overloadAnimVars });
  };

  return (
    <div ref={ref} className={styles.root}>
      {props.children}
    </div>
  );
};

export default Reveal;