import axios from "axios";

import { getTokens } from "./storeToken";
import { jwtDecode } from "jwt-decode";

import { getUserIdFromAccessToken } from "../func/getUserIdFromAccessToken";
import { serverAPI } from "./dev_env";

const apiKey = process.env.EXPO_PUBLIC_X_API_KEY;
export const getHisCheckIn = async () => {
  try {
    const token = await getTokens();

    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);
      if (userId) {
        const url = `${serverAPI}/api/v1/attendance-records/users/${userId}`;

        const response = await axios.get(url, {
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

export const checkInAPI = async (
  date_time: string,
  image: string,
  branch_id: string,
  work_shift_id: string,
  note: string,
  latitude: number,
  longitude: number
) => {
  try {
    const token = await getTokens();
    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);

      if (userId) {
        const url = `${serverAPI}/api/v1/attendance-records/${userId}`;
        const data = {
          date_time: date_time,
          image: image,
          branch_id: branch_id,
          work_shift_id: work_shift_id,
          note: note,
          latitude: latitude,
          longitude: longitude,
        };
        const response = await axios.post(url, data, {
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
