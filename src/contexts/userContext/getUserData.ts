import React from "react";
import { IUserState, UserContextAction } from ".";
import { getUser } from "../../api/user";
import { SETLOADING, SETUSERDATA } from "../../globals/constants/actionTypes";

const fetchUserData =
  (state: IUserState) => (dispatch: React.Dispatch<UserContextAction>) => {
    dispatch({
      type: SETLOADING,
      payload: true,
    });
    getUser(state.userLogin).then((userData) => {
      dispatch({
        type: SETUSERDATA,
        payload: userData,
      });
    });
  };

export default fetchUserData;
