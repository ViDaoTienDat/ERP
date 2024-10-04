import CustomHeader from "@/components/CustomHeader";
import AppStyle from "@/constants/theme";
import React, { useState } from "react";
import { ImageBackground, Platform, StyleSheet, View } from "react-native";
import RegisterInternChild from "./RegisterInternChild";
import ChangeSchedule from "./ChangeSchedule";
import { SafeAreaView } from "react-native-safe-area-context";

function registerIntern(): React.JSX.Element {
  const [tab, setTab] = useState<Number>(0);

  const HandlePressTab = (num: Number) => {
    setTab(num);
  };
  return (
    <SafeAreaView
      style={[
        AppStyle.StyleCommon.container,
        { backgroundColor: "#fff" },
      ]}
    >
      <ImageBackground
        source={require("../../../assets/images/logo-background.png")}
        resizeMode="contain"
        style={AppStyle.StyleHome.background}
      >
        <CustomHeader
          title="Đăng ký lịch thực tập"
          tabs={["Đăng ký", "Thay đổi lịch"]} 
          func={HandlePressTab}
          state={tab}
          onchangeTab={true}
        />
        <View style={AppStyle.StyleHome.containerPadding}>
          {tab === 0 && <RegisterInternChild />}
          {tab === 1 && <ChangeSchedule />}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export default registerIntern;
