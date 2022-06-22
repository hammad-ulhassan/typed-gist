import { Avatar, Button, Spin, Typography } from "antd";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GistPreview from "../../components/GistPreview/GistPreview";
import fetchAuthUserData from "../../contexts/credentialContext/getAuthUserData";
import { CredentialContext } from "../../contexts/credentialContext/provider";
import fetchUserData from "../../contexts/userContext/getUserData";
import fetchUserGists from "../../contexts/userContext/getUserGists";
import { SelectedUserContext } from "../../contexts/userContext/provider";
import { SETUSERLOGIN } from "../../globals/constants/actionTypes";
import { CREDENTIAL_STATE } from "../../globals/constants/localStorageAccessors";
import {
  CFSWrapper,
  FCFCWrapper,
  HomePageLayout,
  TextWordBreak,
  UserProfileGistsList,
  UserProfileWrapper,
} from "../../shared/components/styledComponent";

const UserPage = () => {
  const {login: urlUsername} = useParams();
  const { state, dispatch } = useContext(SelectedUserContext);
  const { state: credentialState, credentialDispatch: credDispatch } = useContext(CredentialContext);
  const [mine, setMine] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    if (!state.userLogin) {
      dispatch({
        type: SETUSERLOGIN,
        payload: urlUsername,
      });
      fetchAuthUserData(credentialState)(credDispatch);
    }
  }, [dispatch, urlUsername, state.userLogin]);

  useEffect(() => {
    if (!state.userData && state.userLogin) {
    const credentialState = localStorage.getItem(CREDENTIAL_STATE);
    if(!credentialState){
      setMine(false)
    }
    else{
      const parsedCredential = JSON.parse(credentialState);
      if(parsedCredential.username === urlUsername){
        // console.log("😀");
        setMine(true);
      }
    }

      fetchUserData(state)(dispatch);
    }
  }, [state.userLogin, state.userData]);

  useEffect(() => {
    if(!state.userGists && state.userData){
      fetchUserGists(state)(dispatch);
    }
  }, [state.userGists,state.userData]);

  const navigateToProfile = useCallback(() => {
    window.open(`https://github.com/${state.userData?.login}`);
  }, [state.userData]);


  // const navigateToCreateGist = useCallback(() => {
  //   navigate("/create");
  // }, [navigate]);

  return (
    <HomePageLayout>
      <CFSWrapper>
      {mine===true?
      <h1>🤗 Welcome</h1>:<h1>User Gists</h1>}
      </CFSWrapper>
      <UserProfileWrapper>
        <FCFCWrapper>
          <Avatar size={200} src={state.userData?.avatar_url} />
          <TextWordBreak>
            <Typography.Title level={4}>
              {state.userData?.name}
            </Typography.Title>
          </TextWordBreak>
          <TextWordBreak>
            <Typography.Title level={5}>
              {state.userData?.bio}
            </Typography.Title>
          </TextWordBreak>
          <Button onClick={navigateToProfile}>GitHub Profile</Button>
        </FCFCWrapper>
        <UserProfileGistsList>
          {state.gistsLoading ? (
            <Spin size="large" />
          ) : (
            state.userGists &&
            state.userGists.length > 0 &&
            state.userGists.map((gist, index) => (
              <GistPreview gist={gist.gist} key={index} />
            ))
          )}
        </UserProfileGistsList>
      </UserProfileWrapper>
    </HomePageLayout>
  );
};

export default UserPage;
