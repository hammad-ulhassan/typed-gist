import { GistPageAction, IGistPageState } from ".";
import { getGist } from "../../api/gists";
import { SETLOADING, SETSELECTEDGISTDATA } from "../../globals/constants/actionTypes";

const fetchGistData = (state: IGistPageState)=> (dispatch: React.Dispatch<GistPageAction>) => {
    dispatch({
        type: SETLOADING,
        payload: true
    });
    getGist(state.selectedGistId).then(gistData=>{
        dispatch({
            type: SETSELECTEDGISTDATA,
            payload: gistData
        })
    })
}

export default fetchGistData;