import { getUserIdFromAccessToken } from "../func/getUserIdFromAccessToken";
import { getUrl } from "./API";
import { getTokens } from "./storeToken";
const serverAPI = process.env.EXPO_PUBLIC_API_URL;
export const getUser = async (accessToken: string) => {
  const userId = getUserIdFromAccessToken(accessToken);
  if (userId) {
    const url = `${serverAPI}/api/v1/users/${userId}`;
    return getUrl(url);
  }
};
export const getAllBranch = async () => {
  const url = `${serverAPI}/api/v1/branches`;
  return getUrl(url);
};
export const getWorkShift = async () => {
  const url = `${serverAPI}/api/v1/work-shifts`;
  return getUrl(url);
};
