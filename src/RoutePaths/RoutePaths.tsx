import { Routes, Route } from "react-router-dom";
import { CredentialContextProvider } from "../contexts/credentialContext/provider";
import EditGistContextProvider from "../contexts/editGistContext/provider";
import SelectedGistContextProvider from "../contexts/gistPageContext/provider";
import { PublicGistsContextProvider } from "../contexts/publicGistsContext/provider";
import SelectedUserContextProvider from "../contexts/userContext/provider";
import CreateGist from "../pages/CreateGist/CreateGist";
import EditGist from "../pages/EditGist/EditGist";
import { GistPage } from "../pages/GistPage/GistPage";
import Homepage from "../pages/Homepage/Homepage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainLayout from "../pages/MainLayout/MainLayout";
import SearchPage from "../pages/SearchPage/SearchPage";
import UserPage from "../pages/UserPage/Userpage";
import { RequireAuth, AuthRedirect } from "./RequireAuth";

export const RoutePaths = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path="home"
          element={
            <PublicGistsContextProvider>
              <Homepage />
            </PublicGistsContextProvider>
          }
        />
        <Route path="gist">
          <Route
            path=":id"
            element={
              <SelectedGistContextProvider>
                <GistPage />
              </SelectedGistContextProvider>
            }
          />
        </Route>
        <Route path="user">
          <Route
            path=":login"
            element={
              <CredentialContextProvider>
                <SelectedUserContextProvider>
                  <UserPage />
                </SelectedUserContextProvider>
              </CredentialContextProvider>
            }
          />
        </Route>
        <Route
          path="create"
          element={
            <RequireAuth>
              <EditGistContextProvider>
                <CreateGist />
              </EditGistContextProvider>
            </RequireAuth>
          }
        />
        <Route
          path="search"
          element={
            <PublicGistsContextProvider>
              <SearchPage />
            </PublicGistsContextProvider>
          }
        />
        <Route path="edit">
          <Route
            path=":id"
            element={
              <RequireAuth>
                <EditGistContextProvider>
                  <EditGist />
                </EditGistContextProvider>
              </RequireAuth>
            }
          />
        </Route>
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
