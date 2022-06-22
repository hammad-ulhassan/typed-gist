import { Spin } from "antd";
import SyntaxHighlighter from "react-syntax-highlighter";
import { CodeBlock } from "../../shared/components/styledComponent";

export type CodeViewPropsType = {
  content: string;
  loaded: boolean;
  navigateToGist: Function;
}

export default function CodeView({ content, loaded, navigateToGist }: CodeViewPropsType) {
  return (
    <CodeBlock onClick={()=>navigateToGist()}>
      {loaded ? (
        <SyntaxHighlighter
          showLineNumbers={true}
          lineNumberStyle={{ color: "var(--gray)" }}
        >
          {content}
        </SyntaxHighlighter>
      ) : (
        <Spin size="small" />
      )}
    </CodeBlock>
  );
}
