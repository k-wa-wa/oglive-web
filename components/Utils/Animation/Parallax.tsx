import React, { useEffect, useRef } from "react";
import { useThemeContext } from "@/modules/theme-context";

/* type Props = {
  children: React.ReactNode;
  animVars?: gsap.TweenVars;
};
const Parallax: React.FC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  const defaultAnimVars = {
    scrollTrigger: {
      scrub: 1
    },
    y: -200
  };
  const overloadAnimVars = props.animVars || {};

  const { theme } = useThemeContext();

  useEffect(() => {
    const enoughHeight = Boolean(document.body.clientHeight >= (window.innerHeight * 1.5));
    if (theme.name === "light" && enoughHeight) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to(ref.current, { ...defaultAnimVars, ...overloadAnimVars });
    }
  }, [theme.name]); // eslint-disable-line

  if (theme.name === "light") {
  return (
    <div ref={ref}>
      {props.children}
    </div>
  );
  }
  return <>{props.children}</>;
}; */
type Props = {
  children: React.ReactNode;
  animVars?: any
};
const Parallax: React.FC<Props> = (props) => {
  return (<>{props.children}</>);
};
export default Parallax;