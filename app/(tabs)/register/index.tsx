import {
  View,
  Text,
  ImageBackground,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "@/constants/theme";
import CustomHeader from "@/components/CustomHeader";

import ReqScreen from "./reqScreen";
import RegisterChild from "./registerChild";
import { useIsFocused } from "@react-navigation/native";

export default function register() {
  const [tab, setTab] = useState<Number>(0);

  const HandlePressTab = (num: Number) => {
    setTab(num);
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
  return (
    <SafeAreaView
      style={[
        AppStyle.StyleCommon.container,
        { paddingHorizontal: 15, backgroundColor: "#fff" },
      ]}
    >
      <ImageBackground
        source={require("../../../assets/images/logo-background.png")}
        resizeMode="contain"
        style={AppStyle.StyleHome.background}
      >
        <CustomHeader
          title="Đăng ký"
          tabs={["Đăng ký", "Danh sách yêu cầu"]}
          state={tab}
          func={HandlePressTab}
          onchangeTab={false}
        />
        {tab == 0 ? <RegisterChild /> : <ReqScreen />}
      </ImageBackground>
    </SafeAreaView>
  );
}
