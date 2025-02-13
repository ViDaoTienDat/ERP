import axios from "axios";

// import { jwtDecode } from "jwt-decode";
import JWT from "expo-jwt";
import { getTokens } from "./storeToken";
import { formatDateToLocal } from "../func/getDateTime";
import { Buffer } from "buffer";
import { getUserIdFromAccessToken } from "../func/getUserIdFromAccessToken";
const serverAPI = process.env.EXPO_PUBLIC_API_URL;
const apiKey = process.env.EXPO_PUBLIC_X_API_KEY;

export const GetInternSchedule = async () => {
  try {
    const token = await getTokens();

    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);
      if (userId) {
        const url = `${serverAPI}/schedules/users/${userId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        });
        return response.data;
      }
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

export const getWorkShiftToCheckInByBranch = async (
  branchId: string,
  date: Date
) => {
  try {
    const token = await getTokens();
    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);
      if (userId) {
        // const url = `${serverAPI}/schedules/dasdasdsadasdasd`; // co tinh de error
        const formattedDate = formatDateToLocal(date);
        const url = `${serverAPI}/work-shifts/branches/${branchId}?dateTime=${formattedDate}&&action=register`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      }
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

export const RegisterInternSchedule = async (
  date: Date,
  workShift: string[],
  branchId: string
) => {
  try {
    const token = await getTokens();
    if (token.accessToken) {
      const userId = getUserIdFromAccessToken(token.accessToken);
      if (userId) {
        const url = `${serverAPI}/schedules/register/${userId}`;
        // const url = `${serverAPI}/schedules/dasdasdsadasdasd`; // co tinh de error
        const formattedDate = formatDateToLocal(date);
        const data = {
          register_time: {
            [formattedDate]: workShift,
          },
          branch_id: branchId,
        };
        const response = await axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            "x-api-key": apiKey,
            "Content-Type": "application/json",
          },
        });

        return response.data;
      }
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

export const ChangeInternSchedule = async (
  date: Date,
  workShift: string[],
  branchId: string
) => {
  try {
    const token = await getTokens();
    let userId = null;
    if (token.accessToken) {
      // const decodedToken = jwtDecode<CustomJwtPayload>(token.accessToken);

      userId = getUserIdFromAccessToken(token.accessToken);
    }
    if (userId) {
      const url = `${serverAPI}/schedules/users/${userId}`;
      const formattedDate = formatDateToLocal(date);
      const data = {
        register_time: {
          [formattedDate]: workShift,
        },
        branch_id: branchId,
      };
      const response = await axios.put(url, data, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "x-api-key": apiKey,
          "Content-Type": "application/json",
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

export const DeleteInternSchedule = async (date: Date) => {
  console.log("🚀 ~ DeleteInternSchedule ~ DeleteInternSchedule:");
  try {
    const token = await getTokens();
    let userId = null;
    if (token.accessToken) {
      // const decodedToken = jwtDecode<CustomJwtPayload>(token.accessToken);

      userId = getUserIdFromAccessToken(token.accessToken);
    }
    if (userId) {
      const url = `${serverAPI}/schedules/users/${userId}`;
      const formattedDate = formatDateToLocal(date);
      const response = await axios.delete(url, {
        data: {
          register_time: {
            [formattedDate]: ["2c1e165e-8", "78546471-a"],
          },
        },
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
          "x-api-key": apiKey,
          "Content-Type": "application/json",
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
