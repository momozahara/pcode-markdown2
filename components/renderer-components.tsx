import {
  CodeProps,
  HeadingProps,
  ReactMarkdownProps,
} from "react-markdown/lib/ast-to-react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import highlightTheme from "react-syntax-highlighter/dist/esm/styles/prism/one-light";

import { CopyToClipboard } from "react-copy-to-clipboard";

export function codeRenderer({
  inline,
  className,
  children,
  ...props
}: CodeProps) {
  const match = /language-(\w+)/.exec(className || "");
  return !inline && match ? (
    <div
      style={{
        position: "relative",
      }}
    >
      <SyntaxHighlighter
        language={match[1]}
        style={highlightTheme as any}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
      <CopyToClipboard text={String(children)}>
        <div
          data-code={String(children)}
          className="copied"
        >
          <svg
            className="octicon-copy"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="currentColor"
            height="12"
            width="12"
          >
            <path
              fillRule="evenodd"
              d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"
            ></path>
            <path
              fillRule="evenodd"
              d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"
            ></path>
          </svg>
          <svg
            className="octicon-check"
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="currentColor"
            height="12"
            width="12"
          >
            <path
              fillRule="evenodd"
              d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
            ></path>
          </svg>
        </div>
      </CopyToClipboard>
    </div>
  ) : (
    <code
      className={className}
      {...props}
    >
      {children}
    </code>
  );
}

type AnchorProps = ReactMarkdownProps & {
  href?: string;
};

function Anchor(props: AnchorProps) {
  const { children, href } = props;

  return (
    <>
      <a
        className="anchor"
        aria-hidden={true}
        tabIndex={-1}
        href={`#${href}`}
      >
        <svg
          className="octicon octicon-link"
          viewBox="0 0 16 16"
          version="1.1"
          width="16"
          height="16"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M7.775 3.275a.75.75 0 001.06 1.06l1.25-1.25a2 2 0 112.83 2.83l-2.5 2.5a2 2 0 01-2.83 0 .75.75 0 00-1.06 1.06 3.5 3.5 0 004.95 0l2.5-2.5a3.5 3.5 0 00-4.95-4.95l-1.25 1.25zm-4.69 9.64a2 2 0 010-2.83l2.5-2.5a2 2 0 012.83 0 .75.75 0 001.06-1.06 3.5 3.5 0 00-4.95 0l-2.5 2.5a3.5 3.5 0 004.95 4.95l1.25-1.25a.75.75 0 00-1.06-1.06l-1.25 1.25a2 2 0 01-2.83 0z"
          ></path>
        </svg>
      </a>
      {children}
    </>
  );
}

export function headingRenderer(props: HeadingProps) {
  const { node, level, children } = props;

  let href: string = children
    ? `${children.toString().toLowerCase().replaceAll(" ", "-")}`
    : "#";
  const child = node.children[0];
  if (child && child.type === "element" && child.tagName === "a") {
    if (child.children.length <= 0) {
      return <></>;
    }
    if (child.children[0].type === "text") {
      href = `${child.children[0].value
        .replace(/[^a-zA-Z ]/g, "")
        .toLowerCase()}`;
    }
  }

  switch (level) {
    case 1: {
      return (
        <h1 id={href}>
          <Anchor
            href={href}
            {...props}
          />
        </h1>
      );
    }
    case 2: {
      return (
        <h2 id={href}>
          <Anchor
            href={href}
            {...props}
          />
        </h2>
      );
    }
    case 3: {
      return (
        <h3 id={href}>
          <Anchor
            href={href}
            {...props}
          />
        </h3>
      );
    }
    case 4: {
      return (
        <h4 id={href}>
          <Anchor
            href={href}
            {...props}
          />
        </h4>
      );
    }
    case 5: {
      return (
        <h5 id={href}>
          <Anchor
            href={href}
            {...props}
          />
        </h5>
      );
    }
    case 6: {
      return (
        <h6 id={href}>
          <Anchor
            href={href}
            {...props}
          />
        </h6>
      );
    }
  }

  return <>{children}</>;
}

const Components = {
  code: codeRenderer,
  h1: headingRenderer,
  h2: headingRenderer,
  h3: headingRenderer,
  h4: headingRenderer,
  h5: headingRenderer,
  h6: headingRenderer,
};

export default Components;
