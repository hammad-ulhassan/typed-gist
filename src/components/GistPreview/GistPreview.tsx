import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getGist } from "../../api/gists";
import { IGist } from "../../api/types";
import { GistContainer } from "../../shared/components/styledComponent";
import CodeView from "../CodeView/CodeView";
import GistMeta from "../GistMeta/GistMeta";

export type GistPreviewPropType = {
  gist: IGist,
  splitter?: number
}

export default function GistPreview({ gist, splitter }: GistPreviewPropType) {
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getGist(gist?.id).then((gistData) => {
      setContent(gistData.files[Object.keys(gistData.files)[0]].content);
      setLoaded(true);
    });
  }, [gist?.id]);

  const navigateToGist = useCallback(()=>{
    //dispatch
    navigate(`/gist/${gist?.id}`);
  }, [])
  //split utility [todo]

  return (
    <GistContainer>
      <GistMeta isInTable={false} gist={gist} />
      <CodeView
        loaded={loaded}
        content={content?.split("\n").slice(0, (splitter||10)).join("\n")}
        navigateToGist={navigateToGist}
      />
    </GistContainer>
  );
}
