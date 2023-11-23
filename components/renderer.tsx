import { useEffect } from "react";
import "react-markdown-css/styles/markdown.css";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

import RendererComponent from "./renderer-components";

interface Props {
  data: string;
}

export default function Renderer({ data }: Props) {
  useEffect(() => {
    const target = location.hash.replaceAll("#", "");
    if (target.length !== 0) {
      document.getElementById(target)?.scrollIntoView();
    }
  }, []);

  return (
    <ReactMarkdown
      className="wmde-markdown"
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={RendererComponent}
    >
      {data}
    </ReactMarkdown>
  );
}
