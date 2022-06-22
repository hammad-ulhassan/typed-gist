import React from "react";
import { IPublicGistsState, PublicGistAction } from ".";
import { getAllPublicGists } from "../../api/gists";
import { SETGISTS, SETLOADING } from "../../globals/constants/actionTypes"

const fetchPublicGists= (state: IPublicGistsState)=>(dispatch: React.Dispatch<PublicGistAction>) => {
    dispatch({
        type: SETLOADING,
        payload: true
    });
    getAllPublicGists({page:state.page, pageSize:state.pageSize}).then(gistsArray=>{
        dispatch({
            type: SETGISTS,
            payload: gistsArray
        })
    })
}
export default fetchPublicGists;