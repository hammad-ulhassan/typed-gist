import moment from "moment";
import { transformObjectToUrlParams } from "../shared/utils/transformObjectToUrlParams";
import { IGist, IGistRecord } from "./types";

const API_KEY = process.env.ACCESS_TOKEN;

export type FetchAllPublicGistsType = {
  page: number;
  pageSize: number;
};

export async function getAllPublicGists({
  page,
  pageSize,
}: FetchAllPublicGistsType) {
  const resp = await fetch(
    "https://api.github.com/gists/public?" +
      new URLSearchParams(
        transformObjectToUrlParams({ per_page: pageSize, page: page })
      ),
    {
      headers: new Headers({
        Authorization: `Bearer ${API_KEY}`,
        Accept: "application/json",
      }),
    }
  );
  let res: IGist[] = await resp.json();
  let res2: IGistRecord[] = await res.map((gist) => {
    return {
      gist,
      date: moment(gist.created_at).format("DD-MM-YYYY"),
      time: moment(gist.created_at).format("HH:mm"),
      keyword: gist.description,
      notebook: [...Object.keys(gist.files)],
      key: gist.id,
    };
  });

  return res2;
}

export const forkGist = async (id: string) => {
  const response = await fetch(`https://api.github.com/gists/${id}/forks`, {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    }),
  });
  if (!response.ok) {
    throw new Error("Gist could not be forked");
  } else {
    const res = await response.json();
    return res;
  }
};

export const starGist = async (id: string) => {
  const response = await fetch(`https://api.github.com/gists/${id}/star`, {
    method: "put",
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    }),
  });
  // if (!response.ok) {
  //   throw new Error("Gist could not be starred");
  // } else {
  //   const res = await response.json();
  //   console.log(res)
  //   return res;
  // }
  return response.status;
};

export const getGist = async (id: string) => {
  const response = await fetch(`https://api.github.com/gists/${id}`, {
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    }),
  });
  if (!response.ok) {
    throw new Error("Gist Data coud not be fetched!");
  } else {
    const res: IGist = await response.json();
    return res;
  }
};

export const getUserGists = async (login: string | null | undefined) => {
  const resp = await fetch(`https://api.github.com/users/${login}/gists`, {
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    }),
  });
  if (!resp.ok) {
    throw new Error("User Gists coud not be fetched!");
  } else {
    let res = await resp.json();
    let res2: IGistRecord[] = await res.map((gist: IGist) => {
      return {
        gist,
        date: moment(gist.created_at).format("DD-MM-YYYY"),
        time: moment(gist.created_at).format("HH:mm"),
        keyword: gist.description,
        notebook: [...Object.keys(gist.files)],
        key: gist.id,
      };
    });
    return res2;
  }
};

export const createGist = async (gistPostData: any) => {
  const resp = await fetch("https://api.github.com/gists", {
    method: "post",
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    }),
    body: JSON.stringify(gistPostData),
  });
  const res = await resp.json();
  return res;
};

export const editGist = async (
  gist_id: string | undefined,
  gistPostData: any
) => {
  const resp = await fetch(`https://api.github.com/gists/${gist_id}`, {
    method: "patch",
    headers: new Headers({
      Authorization: `Bearer ${API_KEY}`,
      Accept: "application/json",
    }),
    body: JSON.stringify(gistPostData),
  });
  const res = await resp.json();
  return res;
};
