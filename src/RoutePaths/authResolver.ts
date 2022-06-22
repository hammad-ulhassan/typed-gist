import { CREDENTIAL_STATE } from "../globals/constants/localStorageAccessors";

const authResolver = () =>{
    const credentialState = localStorage.getItem(CREDENTIAL_STATE);
    if(!credentialState){
        return false
    }
    const parsed = JSON.parse(credentialState);
    return parsed.isLoggedIn
}



export {authResolver};