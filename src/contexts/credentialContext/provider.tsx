import { createContext, useEffect, useReducer } from "react";
import { CredentialAction, credentialReducer, ICredentialState, initialState } from ".";
import { CREDENTIAL_STATE } from "../../globals/constants/localStorageAccessors";
import { IComponentProps } from "../../globals/types";

export interface ICredentialContext {
    state: ICredentialState;
    credentialDispatch: React.Dispatch<CredentialAction>
}

const CredentialContext = createContext({} as ICredentialContext);

export function CredentialContextProvider({ children } : IComponentProps): JSX.Element {
  const [state, credentialDispatch] = useReducer( credentialReducer, initialState);

  useEffect(() => {
    const credentialState = localStorage.getItem(CREDENTIAL_STATE);

    if (!credentialState || !JSON.parse(credentialState)?.isLoggedIn) {
      localStorage.setItem(CREDENTIAL_STATE, JSON.stringify(state));
    }
  }, [state]);

  return (
    <CredentialContext.Provider
      value={{
        state,
        credentialDispatch,
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
}

export { CredentialContext };