import { Card as AntCard } from "antd";
import { CodeOutlined } from "@ant-design/icons";
import CodeView from "../CodeView/CodeView";
import './GistCard.css'
import { useCallback } from "react";
import { IGist } from "../../api/types";
import { useNavigate } from "react-router-dom";

export type GistCardPropsType = {
  filename: string;
  content: string;
  style?: React.CSSProperties;
  gist: IGist | null
}

export default function GistCard({ filename, content, gist }: GistCardPropsType) {
  const navigate = useNavigate();

  const navigateToGist = useCallback(()=>{
    //dispatch
    navigate(`/gist/${gist?.id}`);
  }, [])

  return (
    <AntCard
      title={
        <>
          <CodeOutlined /> {filename}
        </>
      }
      className="card-style min"
    >
      <CodeView loaded={true} content={content} navigateToGist={navigateToGist}></CodeView>
    </AntCard>
  );
}
