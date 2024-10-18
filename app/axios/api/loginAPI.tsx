import axios from "axios";
import { getTokens, storeToken } from "./storeToken";
import { getUserIdFromAccessToken } from "../func/getUserIdFromAccessToken";

const serverAPI = process.env.EXPO_PUBLIC_API_URL;
console.log("🚀 ~ serverAPI:", serverAPI);
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
      response.data.data.refresh_token,
      response.data.data.force_password_change
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

    const response = await axios.post(url, data, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
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

    const response = await axios.post(url, data, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
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

    const response = await axios.put(url, data, {
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
    });
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
export const changePassword = async (
  password: string,
  new_password: string,
  retype_password: string
) => {
  try {
    const token = await getTokens();
    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);
      if (userId) {
        const url = `${serverAPI}/users/change-password/${userId}`;
        const data = {
          current_password: password,
          new_password: new_password,
          retype_password: retype_password,
        };
        const response = await axios.put(url, data, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
        });
        return response.data;
      }
    }
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
