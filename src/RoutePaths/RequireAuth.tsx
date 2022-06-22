import React, { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { CREDENTIAL_STATE, SELECTED_GIST } from "../globals/constants/localStorageAccessors";
import { IComponentProps } from "../globals/types";
import { authResolver } from "./authResolver";

function RequireAuth({ children }: IComponentProps):JSX.Element {
  let authed = authResolver();

  if (!authed) {
    return <Navigate to="/login" replace />;
  }
  return children as JSX.Element;
}

function AuthRedirect({ children }: IComponentProps):React.ReactNode {
  let authed = authResolver();

  if (authed) {
    return <Navigate to="/home" replace />;
  }
  return children;
}

export { RequireAuth, AuthRedirect };
