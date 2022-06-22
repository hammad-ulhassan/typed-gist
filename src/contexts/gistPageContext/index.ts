import { IGist } from "../../api/types";
import { SETLOADING, SETSELECTEDGISTDATA, SETSELECTEDGISTID, SETSHOWPERSONALCONTROLS, SETLOGGEDIN, SETFORKS, FORKED } from "../../globals/constants/actionTypes";

export interface IGistPageState{
    selectedGistId: string;
    selectedGistData: IGist | null;
    loading: boolean;
    showPersonalControls: boolean;
    isLoggedIn: boolean;
    forks: any[];
    forkedResponse: any;
}


export const initialState:IGistPageState = {
    selectedGistId: "",
    selectedGistData: null,
    loading: false,
    showPersonalControls: false,
    isLoggedIn: false,
    forks: [],
    forkedResponse: null
}

export type GistPageAction = | {
    type: "SET_LOADING",
    payload: boolean
} | {
    type: "SET_SELECTEDGISTDATA",
    payload: IGist
} | {
    type: "SET_SELECTEDGISTID",
    payload: string
} | {
    type: "SET_SHOWPERSONALCONTROLS",
    payload: boolean
} | {
    type: "SET_LOGGEDIN",
    payload: boolean
} | {
    type: "SET_FORKS",
    payload: IGist[]
} | {
    type: "GIST_FORKED",
    payload: any
}

export const reducer = (state: IGistPageState, { type, payload }: GistPageAction) => {
    switch (type) {
      case SETLOADING:
        return {
          ...state,
          loading: payload,
        };
      case SETSELECTEDGISTDATA:
        return {
          ...state,
          selectedGistData: payload,
          loading: false,
        };
      case SETSELECTEDGISTID:
        return {
          ...state,
          selectedGistId: payload,
        };
      case SETSHOWPERSONALCONTROLS:
        return {
          ...state,
          showPersonalControls: payload,
        };
      case SETLOGGEDIN:
        return {
          ...state,
          isLoggedIn: payload,
        };
      case SETFORKS:
        return {
          ...state,
          forks: payload,
        };
      case FORKED:
        return {
          ...state,
          forkedResponse: payload,
        };
      default:
        return state;
    }
  };

