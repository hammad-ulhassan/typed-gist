import React, { createContext, useReducer } from "react";
import reducer, { EditGistAction, IEditGistState, initialState } from ".";
import { IComponentProps } from "../../globals/types";

export type IEditGistContext = {
    state: IEditGistState;
    dispatch: React.Dispatch<EditGistAction>
}

export const EditGistContext = createContext({} as IEditGistContext);

export default function EditGistContextProvider({children}: IComponentProps){
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <EditGistContext.Provider
        value={{state, dispatch}}>
            {children}
        </EditGistContext.Provider>
    );
}