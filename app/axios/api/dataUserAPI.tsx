import { getUserIdFromAccessToken } from "../func/getUserIdFromAccessToken";
import { getUrl } from "./api";


import { getTokens } from "./storeToken";
const serverAPI = process.env.EXPO_PUBLIC_API_URL;
export const getUser = async (accessToken: string) => {
  const userId = getUserIdFromAccessToken(accessToken);
  if (userId) {
    const url = `${serverAPI}/users/${userId}`;
    return getUrl(url);
  }
};
