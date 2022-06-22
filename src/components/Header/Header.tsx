import { Avatar, Button, Dropdown } from "antd";
import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuthUserData } from "../../api/user";
import { initialState } from "../../contexts/credentialContext";
import { CREDENTIAL_STATE } from "../../globals/constants/localStorageAccessors";
import {
  AvatarWrapper,
  CFSWrapper,
  ContentWrapper,
  CSBWrapper,
  SearchBox,
} from "../../shared/components/styledComponent";
import Logo from "../Logo/Logo";
import "./Header.css";
import MenuItems from "./menu";

const Header = () => {
  let navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const credentialState = JSON.parse(localStorage.getItem(CREDENTIAL_STATE) as string);

  const handleOnSearch = useCallback(
    (user: string) => {
      if (user) {
        navigate(`/search?user=${user}`);
      } else {
        console.log('bro')
        navigate(`/home`)
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!credentialState || credentialState.isLoggedIn === false) {
      localStorage.setItem(
        CREDENTIAL_STATE,
        JSON.stringify({
          username: null,
          token: null,
          isLoggedIn: false,
          authUserData: null,
        })
      );
    } else {
      // setState(credentialState)
      if (!state.isLoggedIn) {
        setState(credentialState);
      }
    }
  }, [credentialState, state.isLoggedIn]);

  useEffect(() => {
    if (state.isLoggedIn && !state.authUserData) {
      console.info("THISSSSS");

      getAuthUserData().then((userData) => {
        setState({ ...state, authUserData: userData });
      });
    }
  }, [state.isLoggedIn]);

  const handleOnLogin = useCallback(() => {
    navigate(`/login`);
  }, [navigate]);

  const onHandleLogout = useCallback(() => {
    localStorage.setItem(
      CREDENTIAL_STATE,
      JSON.stringify({
        username: null,
        token: null,
        isLoggedIn: false,
        authUserData: null,
      })
    );
    setState(initialState);
    navigate("/home");
  }, [navigate]);

  return (
    <header className="header-style emumba-bg">
      <ContentWrapper>
        <CSBWrapper>
          <Link to="/home">
            <Logo fillColor="#ffffff" />
          </Link>
          <CFSWrapper gap={4}>
            <SearchBox.Search
              placeholder="Search..."
              allowClear
              onSearch={handleOnSearch}
              enterButton={true}
            />
            {!state.isLoggedIn ? (
              <Button onClick={handleOnLogin}>Login</Button>
            ) : (
              <Dropdown
                overlay={
                  <MenuItems
                    credentialState={state}
                    handleLogout={onHandleLogout}
                  />
                }
                placement="bottom"
                arrow
              >
                <AvatarWrapper>
                  {state?.authUserData?.avatar_url ? (
                    <Avatar src={state?.authUserData?.avatar_url} size={50} />
                  ) : (
                    <Avatar size={50}>😀</Avatar>
                  )}
                </AvatarWrapper>
              </Dropdown>
            )}
          </CFSWrapper>
        </CSBWrapper>
      </ContentWrapper>
    </header>
  );
};

export default Header;
