import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import { useEffect, useRef } from "react";
import styles from "./MdViewer.module.scss";

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
);

type Props = {
  body: string
}
const MdViewer: React.VFC<Props> = (props) => {
  const ref = useRef<HTMLDivElement>(null);

  /* useEffect(() => {
    // markdownのレンダリングが遅い。
    // レンダリング前に要素が小さすぎてしまうので、scssでmin-heightを設定しているが、レンダリング後は不要(逆に大きな空白ができる可能性。)
    // なので、一定時間経過後はmin-heightを解除する。
    setTimeout(() => {
      if (ref.current) {
        ref.current.style.minHeight = "20vh";
      }
    }, 3000);
  }, []); */

  return (
    <div ref={ref} className={styles.root}>
      <MarkdownPreview className={styles.viewer} source={props.body} />
    </div>
  );
};

export default MdViewer;