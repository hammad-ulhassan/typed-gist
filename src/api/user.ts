import { CREDENTIAL_STATE } from "../globals/constants/localStorageAccessors";
import { IUser } from "./types";

const API_KEY = process.env.ACCESS_TOKEN;


export const getAuthUserData = async () => {
  const authToken = JSON.parse(
    localStorage.getItem(CREDENTIAL_STATE) as string
  )?.token;

  if (!authToken){
    return null;
  }

  const response = await fetch(`https://api.github.com/user`, {
    headers: new Headers({
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    }),
  });
  if (!response.ok) {
    throw new Error("User Data could not be fetched!");
  } else {
    const res = await response.json();
    return res;
  }
};

export const getUser = async (login: string | null | undefined) => {
  if (login) {
    const response = await fetch(`https://api.github.com/users/${login}`, {
      headers: new Headers({
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      }),
    });
    if (!response.ok) {
      throw new Error("User Data could not be fetched!");
    } else {
      const res: IUser = await response.json();
      return res;
    }
  } else {
    throw new Error("no login provided.");
  }
};
