import { IGist, IGistRecord, IUser } from "../../api/types";
import { SETUSERGISTS, SETUSERLOGIN, SETUSERDATA, SETLOADING, SETUSERGISTSLOADING } from "../../globals/constants/actionTypes";

export interface IUserState {
    userData: IUser | null;
    loading: boolean;
    userLogin: string | null | undefined;
    gistsLoading: boolean;
    userGists: IGistRecord[] | null;
}

export const initialState: IUserState = {
    userData: null,
    loading: false,
    userLogin: null,
    gistsLoading: false,
    userGists: null
}

export type UserContextAction = | {
    type: "SET_USERGISTS",
    payload: IGistRecord[]
} | {
    type: "SET_USERLOGIN",
    payload: string | null | undefined
} | {
    type: "SET_USERDATA",
    payload: IUser
} | {
    type: "SET_LOADING",
    payload: boolean
}

const reducer = (state: IUserState, { type, payload }: UserContextAction) => {
    switch (type) {
      case SETUSERGISTS:
        return {
          ...state,
          userGists: payload,
          gistsLoading: false
        };
      case SETUSERLOGIN:
        return {
          ...state,
          userLogin: payload,
        };
      case SETUSERDATA:
        return {
          ...state,
          userData: payload,
          loading: false,
        };
      case SETLOADING:
        return {
          ...state,
          loading: payload,
        };
      default:
        return state;
    }
  };

export {reducer}

