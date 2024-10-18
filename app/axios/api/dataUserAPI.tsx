import { getUserIdFromAccessToken } from "../func/getUserIdFromAccessToken";
import { getUrl } from "./api";
import { getTokens } from "./storeToken";
import { apiKey } from "./dev_env";
import axios from "axios";
import mime from "mime";
const serverAPI = process.env.EXPO_PUBLIC_API_URL;
export const getUser = async (accessToken: string) => {
  const userId = getUserIdFromAccessToken(accessToken);
  if (userId) {
    const url = `${serverAPI}/users/${userId}`;
    return getUrl(url);
  }
};

export const changeAvatar = async (avatarUri: any) => {
  try {
    const token = await getTokens();
    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);
      if (userId) {
        const url = `${serverAPI}/users/change-avatar`;
        const formData = new FormData();
        // @ts-expect-error: special react native format for form data
        formData.append(`file`, {
          uri: avatarUri.uri,
          name: "avatar.jpg",
          type: mime.getType(avatarUri.uri),
        });
        const response = await axios.put(url, formData, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data;
      }else{
        console.error("No user id found");
        return null;
      }
    } else {
      console.error("No access token found");
      return null;
    }
  } catch (error : any) {
    console.error("Error in changeAvatar:", error.message);
    return null;
  }
};
