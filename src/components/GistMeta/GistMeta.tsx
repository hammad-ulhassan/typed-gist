import { Avatar, Typography } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";
import { IGist } from "../../api/types";
import {
  ColC,
  GistDetails,
  RowFS,
} from "../../shared/components/styledComponent";
const { Text } = Typography;

export type GistMetaProps = {
  isInTable: boolean;
  gist: IGist | null
}

export default function GistMeta({ isInTable, gist }: GistMetaProps) {
  return (
    <RowFS>
      <Avatar src={gist?.owner?.avatar_url} size={64} />
      {!isInTable ? (
        <GistDetails>
          <span>
            <Link to={`/user/${gist?.owner?.login}`}>{`@${gist?.owner?.login}/`}</Link>
            <Link to="">{gist?.files[Object.keys(gist?.files)[0]]?.filename}</Link>
          </span>
          <Text type="secondary">{moment(gist?.created_at).fromNow()}</Text>
          <Text type="secondary">{gist?.description?.slice(0, 20)}</Text>
        </GistDetails>
      ) : (
        <ColC>
          <Text>{gist?.owner?.login}</Text>
        </ColC>
      )}
    </RowFS>
  );
}
