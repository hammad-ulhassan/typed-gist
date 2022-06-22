import { Card as AntCard } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import CodeView from "../CodeView/CodeView";
import './GistCard.css'

export type GistCardPropsType = {
  filename: string;
  content: string;
  style?: React.CSSProperties
}

export default function GistCard({ filename, content }: GistCardPropsType) {
  return (
    <AntCard
      title={
        <>
          <CodeOutlined /> {filename}
        </>
      }
      className="card-style min"
    >
      <CodeView loaded={true} content={content}></CodeView>
    </AntCard>
  );
}
