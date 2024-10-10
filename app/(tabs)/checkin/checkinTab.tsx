import {
  View,
  Text,
  ImageBackground,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import AppStyle from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoCheckIn from "@/components/tab_checkin/ExpoCheckIn";
import { useFocusEffect } from "expo-router";
import HistoryCheckIn from "@/components/tab_checkin/history";
import { useIsFocused } from "@react-navigation/native";
import { getCurrentCheckIn } from "@/app/axios/api/checkInApi";
import { useDispatch } from "react-redux";
import {
  setBranchCheckIn,
  setWorkShiftCheckIn,
} from "@/app/state/reducers/dataSlice";
export default function checkin() {
  const dispatch = useDispatch();
  const [numTab, setNumTab] = useState(0); // Initialize numTab as state
  const [showDetailCheckIn, setShowDetailCheckIn] = useState(false);
  // Function to handle tab press
  const handlePressTab = (index: number) => {
    setNumTab(index); // Update numTab with the pressed tab index
  };
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const isFocused = useIsFocused(); // Kiểm tra xem trang chủ có đang được focus không
  useEffect(() => {
    // Nếu trang chủ không được focus, không cần thêm sự kiện quay lại
    if (!isFocused) return;

    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp(); // Thoát ứng dụng nếu bấm lần thứ 2
      } else {
        setBackPressedOnce(true); // Cập nhật trạng thái là đã bấm lần đầu
        ToastAndroid.show(
          "Bấm quay về lần nữa để thoát ứng dụng",
          ToastAndroid.SHORT
        ); // Hiện toast

        setTimeout(() => {
          setBackPressedOnce(false); // Reset trạng thái sau 2 giây
        }, 2000);
      }
      return true; // Chặn hành động quay về mặc định
    };

    // Lắng nghe sự kiện nút quay lại
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Dọn dẹp sự kiện khi component bị hủy hoặc mất focus
    return () => backHandler.remove();
  }, [isFocused, backPressedOnce]);
  useFocusEffect(
    React.useCallback(() => {
      // Reset isDetailCheckIn về false mỗi lần tab Home được focus
      setShowDetailCheckIn(false);
    }, [])
  );
  useEffect(() => {
    setShowDetailCheckIn(false);
  }, [numTab]);
  const handlePressCheckIn = () => {
    getCurrentCheckIn().then(async (result) => {
      if (result.code === 200 && result.data && result.data.length > 0) {
        const lastCheckIn = result.data[result.data.length - 1];

        if (lastCheckIn.branch_id && lastCheckIn.work_shift_id) {
          console.log("dispatcch setWS ");
          console.log(
            "🚀 ~ getCurrentCheckIn ~ work_shift_id:",
            lastCheckIn.work_shift_id
          );
          dispatch(setBranchCheckIn(lastCheckIn.branch_id));
          dispatch(setWorkShiftCheckIn(lastCheckIn.work_shift_id));
        }
      }
      setShowDetailCheckIn(true);
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ImageBackground
        source={require("../../../assets/images/logo-background.png")}
        resizeMode="contain"
        style={AppStyle.StyleHome.background}
      >
        <CustomHeader
          title="Chấm công"
          tabs={["Chấm công", "Lịch sử"]}
          func={handlePressTab}
          state={numTab}
          onchangeTab={false}
        />
        <View style={AppStyle.StyleHome.containerPadding}>
          {numTab == 0 ? (
            <ExpoCheckIn
              showDetailCheckIn={showDetailCheckIn}
              handlePressCheckIn={handlePressCheckIn}
              updateNumTab={() => setNumTab(1)}
            />
          ) : (
            <HistoryCheckIn />
          )}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
