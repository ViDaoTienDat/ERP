import axios from "axios";
import { getTokens, storeToken } from "./storeToken";

const serverAPI = process.env.EXPO_PUBLIC_API_URL;
export const signIn = async (email: string, password: string) => {
  try {
    const url = `${serverAPI}/api/v1/sign-in`;
    const data = {
      email: email,
      password: password,
    };

    const response = await axios.post(url, data);

    await storeToken(
      response.data.data.access_token,
      response.data.data.refresh_token
    );

    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      // Xử lý các lỗi khác nếu không phải là lỗi từ server
      console.error(error);
      throw new Error("An unknown error occurred.");
    }
  }
};
