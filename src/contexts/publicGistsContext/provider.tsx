import React, { createContext, useEffect, useReducer } from "react";
import { initialState, IPublicGistsState, PublicGistAction, publicGistsReducer } from ".";
import { IComponentProps } from "../../globals/types";

export interface IPublicGistContext {
    state: IPublicGistsState,
    publicGistDispatch: React.Dispatch<PublicGistAction>
}

const PublicGistsContext = createContext({} as IPublicGistContext);

export function PublicGistsContextProvider({children}: IComponentProps):JSX.Element{
    const [state, publicGistDispatch] = useReducer( publicGistsReducer, initialState);

    return (
        <PublicGistsContext.Provider value={{ state, publicGistDispatch }}>
      {children}
    </PublicGistsContext.Provider>
    )
}

export { PublicGistsContext };