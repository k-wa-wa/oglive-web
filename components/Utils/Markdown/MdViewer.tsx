import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

import styles from "./MdViewer.module.scss";

const MarkdownPreview = dynamic(
  () => import('@uiw/react-markdown-preview'),
  { ssr: false }
);

type Props = {
  body: string
}
const MdViewer: React.VFC<Props> = (props) => {
  return (
    <div className={styles.root}>
      <MarkdownPreview className={styles.viewer} source={props.body} />
    </div>
  );
};

export default MdViewer;