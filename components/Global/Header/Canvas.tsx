
import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";
import { drawText } from "@/modules/canvas";


const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      return drawText(canvas, ctx);
    }
  }, []);

  return (
    <div className={styles.root}>
      <canvas ref={ref} className={styles.text}/>
    </div>
  );
};

export default Canvas;