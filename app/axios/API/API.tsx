import axios from "axios";
import { getTokens } from "./storeToken";

const apiKey = process.env.EXPO_PUBLIC_X_API_KEY;
export const getUrl = async (url: string) => {
  try {
    const token = await getTokens();
    if (token?.accessToken) {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "x-api-key": apiKey,
        },
      });
      return response.data;
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.error(error);
      throw new Error("An unknown error occurred.");
    }
  }
};
export const postUrl = async (url: string, data: any) => {
  try {
    const token = await getTokens();
    if (token?.accessToken) {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      return response.data;
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      console.error(error);
      throw new Error("An unknown error occurred.");
    }
  }
};
