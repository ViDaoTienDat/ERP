import { View, Text, ImageBackground } from "react-native";
import React, { useState } from "react";
import CustomHeader from "@/components/CustomHeader";
import CheckIn from "../../components/tab_checkin/checkIn";
import History from "../../components/tab_checkin/history";
import AppStyle from "@/constants/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import ExpoCheckIn from "@/components/tab_checkin/ExpoCheckIn";
export default function checkin() {
  const [numTab, setNumTab] = useState(0); // Initialize numTab as state

  // Function to handle tab press
  const handlePressTab = (index: number) => {
    setNumTab(index); // Update numTab with the pressed tab index
  };
  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 15, backgroundColor: "#fff" }}
    >
      <ImageBackground
        source={require("../../assets/images/logo-background.png")}
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
        {/* Conditionally render the screen based on numTab */}
        {numTab == 0 ? <ExpoCheckIn /> : <History />}
      </ImageBackground>
    </SafeAreaView>
  );
}
