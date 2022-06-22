import React from "react";
import { IUser } from "../../api/types";
export interface ICredentialState {
    username: string;
    token: string;
    isLoggedIn: boolean;
    authUserData: IUser | null;
}

export const initialState: ICredentialState = {
    username: "",
    token: "",
    isLoggedIn: false,
    authUserData: null
}

export type CredentialAction = | {
    type: 'SET_CREDENTIALS',
    payload: ICredentialState
} | {
    type: 'REMOVE_CREDENTIALS'
} | {
    type: 'SET_AUTHUSERDATA',
    payload: any
}

export const credentialReducer = (state: ICredentialState, action: CredentialAction) =>{
    switch(action.type){
        case 'SET_CREDENTIALS':
            return{
                ...state,
                username: action.payload.username,
                token: action.payload.token,
                isLoggedIn: true
            }
        case 'REMOVE_CREDENTIALS':
            return initialState
        case 'SET_AUTHUSERDATA':
            return {
                ...state,
                authUserData: action.payload
            }

        default:
            return state;
    }
}





