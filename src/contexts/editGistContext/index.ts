import { IGist } from "../../api/types";
import {
  SETEDITDATAFORPOST,
  SETGISTDATAFOREDIT,
  SETSELECTEDGISTDATA,
} from "../../globals/constants/actionTypes";

export interface IEditGistState {
  gistData: IGist | null;
  description?: string;
  files?: any;
  dataForPost?: any;
}

export const initialState = {
  gistData: null,
  description: null,
  files: null,
  dataForPost: null,
};

export type EditGistAction =
  | {
      type: "SET_SELECTEDGISTDATA",
      payload: IGist
    }
  | {
      type: "SET_GISTDATAFOREDIT",
      payload: any
  }
  | {
      type: "SET_EDITDATAFORPOST",
      payload: any
  }

const reducer = (state: IEditGistState, { type, payload }: EditGistAction) => {
  switch (type) {
    case SETSELECTEDGISTDATA:
      return {
        ...state,
        gistData: payload,
      };
    case SETGISTDATAFOREDIT:
      return {
        ...state,
        description: payload.description,
        files: payload.files,
      };
    case SETEDITDATAFORPOST:
      return {
        ...state,
        dataForPost: payload,
      };
    default:
      return state;
  }
};

export default reducer;
