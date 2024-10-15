import axios from "axios";
import { getTokens, storeToken } from "./storeToken";

const serverAPI = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_X_API_KEY;
export const signIn = async (email: string, password: string) => {
  try {
    const url = `${serverAPI}/sign-in`;
    const data = {
      email: email,
      password: password,
    };

    const response = await axios.post(url, data, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
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
export const sendCode = async (email: string) => {
  try {
    const url = `${serverAPI}/forgot-password/send-code`;
    const data = {
      email: email,
    };

    const response = await axios.post(url, data);
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
export const verifyPassword = async (email: any, code: any) => {
  try {
    const url = `${serverAPI}/forgot-password/verify-code`;
    const data = {
      email: email,
      code: code,
    };

    const response = await axios.post(url, data);
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
export const resetPassword = async (
  email: any,
  new_password: any,
  retype_password: any
) => {
  try {
    const url = `${serverAPI}/forgot-password/reset`;
    const data = {
      email: email,
      new_password: new_password,
      retype_password: retype_password,
    };

    const response = await axios.put(url, data);
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
