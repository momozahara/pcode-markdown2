import { useEffect } from "react";

import "react-markdown-css/styles/markdown.css";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

import rehypeRaw from "rehype-raw";

import RendererComponent from "./renderer-components";

interface Props {
  data: string;
}

export default function Renderer({ data }: Props) {
  useEffect(() => {
    let target = location.hash.replaceAll("#", "");
    if (target !== "") {
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
