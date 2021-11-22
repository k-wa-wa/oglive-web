import { useEffect, useRef, useState } from "react"; 

import styles from "./Reveal.module.scss";

type Props = {
  children: React.ReactNode;
  transformFrom?: `translate(${number}${"" | "rem" | "%"}, ${number}${"" | "rem" | "%"})`;
}

const Reveal: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const defaultStyle: React.CSSProperties = {
    opacity: 0,
    transform: props.transformFrom ?? ""
  };

  const activeStyle: React.CSSProperties = {
    ...defaultStyle,
    opacity: 1,
    transform: "translate(0, 0)",
    transition: "all 1s ease-in-out"
  };

  useEffect(() => {
    const element = ref.current;
    const revealFunction = () => {
      if (element) {
        const triggerBottom = window.innerHeight / 5 * 4;
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < triggerBottom) {
          setActive(true);
        }
      }
    };

    revealFunction();
    window.addEventListener("scroll", revealFunction);
    return () => {
      window.removeEventListener("scroll", revealFunction);
    };
  });

  return (
    <div ref={ref}
      className={styles.root}
      style={active ? activeStyle : defaultStyle}>
      {props.children}
    </div>

  );
};

export default Reveal;