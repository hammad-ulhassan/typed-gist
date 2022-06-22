import React, { createContext, useReducer } from "react";
import { GistPageAction, IGistPageState, initialState, reducer } from ".";
import { IComponentProps } from "../../globals/types";

export interface IGistPageContext {
    state: IGistPageState,
    dispatch: React.Dispatch<GistPageAction>
}

export const SelectedGistContext = createContext({} as IGistPageContext);

  export default function SelectedGistContextProvider({ children }: IComponentProps): JSX.Element {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <SelectedGistContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </SelectedGistContext.Provider>
    );
  }