import { View, Text } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "@/constants/theme";
import CustomHeader from "@/components/CustomHeader";

import ReqScreen from "./reqScreen";
import RegisterChild from "./registerChild";

export default function register() {
  const [tab, setTab] = useState<Number>(0);

  const HandlePressTab = (num: Number) => {
    setTab(num);
  };
  return (
    <SafeAreaView
      style={[
        AppStyle.StyleCommon.container,
        { paddingHorizontal: 15, backgroundColor: "#fff" },
      ]}
    >
      <CustomHeader
        title="Đăng ký"
        tabs={["Đăng ký", "Danh sách yêu cầu"]}
        state={tab}
        func={HandlePressTab}
        onchangeTab={false}
      />
      {tab == 0 ? <RegisterChild /> : <ReqScreen />}
    </SafeAreaView>
  );
}
