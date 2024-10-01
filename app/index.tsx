import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Href, Redirect } from "expo-router";
import { getTokens } from "./axios/api/storeToken";
import { getWorkShift } from "./axios/api/workShirtApi";
import { GetInternSchedule } from "./axios/api/InternAPI";
import { getHisCheckIn } from "./axios/api/checkInApi";
import { getAllBranch } from "./axios/api/branchApi";
import { getUser } from "./axios/api/dataUserAPI";
import { useDispatch } from "react-redux";
import {
  setBranch,
  setDataIntern,
  setDateHisCheckIn,
  setUser,
  setWorkShift,
} from "./state/reducers/dataSlice";
import { handleSplitHisCheckIn } from "./axios/func/createCalendar";
import { splitWorkShift } from "./axios/func/loadDataUser";
import { getExpiredTimeFromAccessToken } from "./axios/func/getUserIdFromAccessToken";

export default function index() {
  const [redirectTo, setRedirectTo] = useState<Href>();
  const dispatch = useDispatch();
  const currentTime = new Date().getTime();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await getTokens();
        if (token?.accessToken) {
          const expirationTime = new Date(
            getExpiredTimeFromAccessToken(token?.accessToken) // exp: "2024-09-26T17:35:20.731715287+07:00"
          ).getTime();
          if (currentTime < expirationTime) {
            console.log("Token chưa hết hạn");
            getUser(token?.accessToken).then(async (result) => {
              if (result.code === 200) {
                dispatch(setUser(result.data));
              }
            });
            getAllBranch().then(async (result) => {
              if (result.code === 200) {
                dispatch(setBranch(result.data));
              }
            });
            getHisCheckIn().then(async (result) => {
              if (result.code === 200) {
                const datehis = await handleSplitHisCheckIn(result.data);
                dispatch(setDateHisCheckIn(datehis));
              }
            });
            GetInternSchedule().then(async (result) => {
              if (result.code === 200) {
                dispatch(setDataIntern(result.data));
              }
            });
            getWorkShift().then(async (result) => {
              if (result.code === 200) {
                const workshift = await splitWorkShift(result.data);
                dispatch(setWorkShift(workshift));
              }
            });
            setRedirectTo("./home"); // Chuyển hướng về trang home nếu có token
          } else {
            console.log("Token đã hết hạn");
            setRedirectTo("./login"); // Chuyển hướng về trang login nếu không có token
          }
        } else {
          console.log("Hong có Token ");
          setRedirectTo("./login");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setRedirectTo("./login"); // Chuyển hướng về trang login nếu có lỗi
      }
    };
    checkToken();
  }, []);

  // Render logic redirect dựa vào trạng thái redirectTo
  if (redirectTo) {
    return <Redirect href={redirectTo} />;
  }
}
