import katex from 'katex';
import mermaid from "mermaid";
import dynamic from "next/dynamic";
import { useState } from "react";


import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import 'katex/dist/katex.css';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

type Props = {
  body: string;
}
const MdEditor: React.VFC<Props> = (props) => {
  const [body, setBody] = useState<string>(props.body);
  const [scroll, setScroll] = useState<boolean>(true);

  const setBodyFunc = (value: string | undefined): void => {
    if (typeof value === "string") {
      setBody(value);
    }
  };

  return (
    <div>
      <MDEditor
        value={body}
        onChange={(value) => setBodyFunc(value)}
        // ↓↓ enable mermaid & katex
        previewOptions={{
          components: {
            code: ({ inline, children, className, ...props }) => {
              const txt = children[0] || '';
              // mermaid
              if (
                typeof txt === 'string' &&
                typeof className === 'string' &&
                /^language-mermaid/.test(className.toLocaleLowerCase())
              ) {
                const Elm = document.createElement("div");
                Elm.id = "demo";
                const svg = mermaid.render("demo", txt);
                return <code dangerouslySetInnerHTML={{ __html: svg }} />;
              }
              // mermaid
              // katex
              if (inline) {
                if (typeof txt === 'string' && /^\$\$(.*)\$\$/.test(txt)) {
                  const html = katex.renderToString(txt.replace(/^\$\$(.*)\$\$/, '$1'), {
                    throwOnError: false,
                  });
                  return <code dangerouslySetInnerHTML={{ __html: html }} />;
                }
                return <code>{txt}</code>;
              }
              if (
                typeof txt === 'string' &&
                typeof className === 'string' &&
                /^language-katex/.test(className.toLocaleLowerCase())
              ) {
                const html = katex.renderToString(txt, {
                  throwOnError: false,
                });
                return <code dangerouslySetInnerHTML={{ __html: html }} />;
              }
              //katex
              return <code className={String(className)}>{txt}</code>;
            },
          },
        }}
        // ↑↑ enable mermaid & katex
        highlightEnable={false}
        visiableDragbar={false}
        enableScroll={scroll}
        height={500} />

      <label>
        <input type="checkbox" checked={scroll} onChange={() => setScroll(!scroll)} />
        Scroll Sync (mermaidを使用するとスクロールがバグるので、同期をオフにしてください)
      </label>
    </div>
  );
};

export default MdEditor;