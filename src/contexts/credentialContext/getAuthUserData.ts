import React from "react";
import { CredentialAction, ICredentialState } from ".";
import { getAuthUserData } from "../../api/user";
import { SETAUTHUSERDATA } from "../../globals/constants/actionTypes";

const fetchAuthUserData = (state: ICredentialState) => (dispatch: React.Dispatch<CredentialAction>) =>{
    getAuthUserData().then(userData => {
        dispatch({
            type: SETAUTHUSERDATA,
            payload: userData
        })
    })
}

export default fetchAuthUserData;