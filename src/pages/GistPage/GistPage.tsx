import { Spin } from "antd";
import { useCallback, useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GistCard from "../../components/GistCard/GistCard";
import GistMeta from "../../components/GistMeta/GistMeta";
import {
  ColFSWrapper,
  CSBWrapper,
  HomePageLayout,
} from "../../shared/components/styledComponent";
import GistUtils from "../../components/GistUtils/GistUtils";
import { SelectedGistContext } from "../../contexts/gistPageContext/provider";
import {
  SETFORKS,
  SETLOGGEDIN,
  SETSELECTEDGISTDATA,
  SETSELECTEDGISTID,
  SETSHOWPERSONALCONTROLS,
} from "../../globals/constants/actionTypes";
import {
  CREDENTIAL_STATE,
  SELECTED_GIST,
} from "../../globals/constants/localStorageAccessors";
import fetchGistData from "../../contexts/gistPageContext/getGistData";
import { forkGist, starGist } from "../../api/gists";
import { message } from "antd";
// import forkGist from "../../contexts/gistPageContext/forkGist";

export const GistPage = () => {
  let { id } = useParams();
  const { state, dispatch } = useContext(SelectedGistContext);
  const navigate = useNavigate();
  const [starred, setStarred] = useState(false);
  const currentGistId = JSON.parse(
    localStorage.getItem(SELECTED_GIST) as string
  ).id;

  const editGist = useCallback(() => {
    navigate(`/edit/${currentGistId}`);
  }, []);

  function deleteGist() {}

  const onForkGist = useCallback(() => {
    forkGist(state.selectedGistId)
      .then(() => {
        message.success("Gist has been forked", 3);
        setStarred(true)
      })
      .catch(() => {
        message.error("There was an error");
      });
  }, []);

  const onStarGist = useCallback(() => {
    starGist(state.selectedGistId).then((status) => {
      if (status === 204) {
        message.success("Gist has been starred", 3);
      } else {
        message.error("Error starring Gist");
      }
    });
  }, [state.selectedGistId, state.selectedGistData]);

  useEffect(() => {
    if (id) {
      console.log(id);
      dispatch({
        type: SETSELECTEDGISTID,
        payload: id,
      });
    }
  }, [id]);

  useEffect(() => {
    if (state.selectedGistId) {
      console.log(`fetching data for ${state.selectedGistId}`);
      fetchGistData(state)(dispatch);
    }
  }, [state.selectedGistId]);

  useEffect(() => {
    if (state.selectedGistData) {
      //destructure
      localStorage.setItem(
        SELECTED_GIST,
        JSON.stringify(state.selectedGistData)
      );
      const myState = localStorage.getItem(CREDENTIAL_STATE);
      if (myState) {
        let parsedState = JSON.parse(myState);
        dispatch({
          type: SETLOGGEDIN,
          payload: parsedState.isLoggedIn,
        });
        if (parsedState.username === state.selectedGistData?.owner?.login) {
          dispatch({
            type: SETSHOWPERSONALCONTROLS,
            payload: true,
          });
        } else {
          dispatch({
            type: SETSHOWPERSONALCONTROLS,
            payload: false,
          });
        }
      }
      // dispatch({
      //   type: SETFORKS,
      //   payload: state.selectedGistData?.forks,
      // });
    }
  }, [dispatch, state.selectedGistData]);

  return (
    <HomePageLayout>
      <CSBWrapper>
        {/* {JSON.stringify(selectedGist)} */}
        {!state.loading ? (
          <GistMeta isInTable={false} gist={state.selectedGistData} />
        ) : null}
        {!state.loading ? (
          <GistUtils
            handleGistEdit={editGist}
            handleGistDelete={deleteGist}
            handleForkGist={onForkGist}
            handleGistStar={onStarGist}
            starred={starred}
          />
        ) : null}
      </CSBWrapper>
      <ColFSWrapper gap="0.5vh">
        {state.selectedGistData ? (
          Object.keys(state.selectedGistData?.files)
            .map((fn) => state.selectedGistData?.files[fn])
            .map((file, index) => (
              <GistCard
                gist={state.selectedGistData}
                style={{ minWidth: "100%", margin: "1%" }}
                filename={file.filename}
                content={file.content}
                key={index}
              />
            ))
        ) : (
          <Spin size="large" />
        )}
      </ColFSWrapper>
    </HomePageLayout>
  );
};
