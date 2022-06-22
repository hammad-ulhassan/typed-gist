import { IGist, IGistRecord } from "../../api/types";
import { SETGISTS, SETLOADING, SETPAGE, SETPAGESIZE, SETSELECTEDGIST, SETSELECTEDGISTDATA } from "../../globals/constants/actionTypes";

export interface IPublicGistsState {
  gists: IGistRecord[];
  selectedGist: IGist | null;
  page: number;
  pageSize: number;
  loading: boolean;
  selectedGistData: IGist | null;
}

export const initialState: IPublicGistsState = {
  gists: [],
  selectedGist: null,
  page: 1,
  pageSize: 10,
  loading: false,
  selectedGistData: null,
};

export type PublicGistAction = | {
    type: "SET_GISTS",
    payload: IGistRecord[]
} | {
    type: "SET_LOADING",
    payload: boolean
} | {
    type: "SET_PAGE",
    payload: number
} | {
    type: "SET_PAGESIZE",
    payload: number
} | {
    type: "SET_SELECTEDGIST",
    payload: IGist
} | {
    type: "SET_SELECTEDGISTDATA",
    payload: IGist
}

export const publicGistsReducer = (state: IPublicGistsState, action: PublicGistAction) => {
  switch (action.type) {
    case SETGISTS:
      return {
        ...state,
        gists: action.payload,
        loading: false,
      };
    case SETLOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SETPAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SETPAGESIZE:
      return {
        ...state,
        pageSize: action.payload,
      };
    case SETSELECTEDGIST:
      return {
        ...state,
        selectedGist: action.payload,
      };
    case SETSELECTEDGISTDATA:
      return {
        ...state,
        selectedGistData: action.payload,
      };
    default:
      return state;
  }
};
