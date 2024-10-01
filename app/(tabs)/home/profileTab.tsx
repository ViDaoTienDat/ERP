import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import AppStyle from "@/constants/theme";
import TitleHeader from "@/components/TitleHeader";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
export default function profileTab() {
  const userInfo = useSelector((state: any) => state.userdata.user);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={AppStyle.StyleCommon.container}>
        <TitleHeader title={"Hồ sơ nhân viên"} />
        <View style={[AppStyle.StyleHeader.boxInfo]}>
          <TouchableOpacity>
            <Image
              style={[AppStyle.StyleHeader.size_avt]}
              source={
                userInfo.avatar
                  ? { uri: userInfo.avatar }
                  : require("../../../assets/images/avt.png")
              }
            />
          </TouchableOpacity>
          <View>
            <Text
              style={[AppStyle.StyleCommon.textBlack18, { lineHeight: 19 }]}
            >
              {userInfo ? userInfo.full_name : "..."}
            </Text>
            <Text style={AppStyle.StyleCommon.textSecondary13}>
              {userInfo ? userInfo.position : "..."}
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
