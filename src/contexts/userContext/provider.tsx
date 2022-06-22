import React, { createContext, useReducer } from "react";
import { initialState, IUserState, reducer, UserContextAction } from ".";
import { IComponentProps } from "../../globals/types";

export interface IUserContext {
    state: IUserState,
    dispatch: React.Dispatch<UserContextAction>
}

const SelectedUserContext = createContext({} as IUserContext);

export default function SelectedUserContextProvider({ children }: IComponentProps): JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <SelectedUserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SelectedUserContext.Provider>
  );
}

export {SelectedUserContext};
