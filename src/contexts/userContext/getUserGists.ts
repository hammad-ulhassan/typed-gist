import { IUserState, UserContextAction } from ".";
import {
  SETUSERGISTS,
} from "../../globals/constants/actionTypes";
import { getUserGists } from "../../api/gists";
import React from "react";

const fetchUserGists = (state: IUserState) => (dispatch: React.Dispatch<UserContextAction>) => {
  getUserGists(state.userLogin).then((userGists) => {
    dispatch({
      type: SETUSERGISTS,
      payload: userGists,
    });
  });
};

export default fetchUserGists;
