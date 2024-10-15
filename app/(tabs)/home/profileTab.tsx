import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import React from "react";
import AppStyle from "@/constants/theme";
import TitleHeader from "@/components/TitleHeader";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import Color from "@/constants/theme/Color";
import RowCategory from "@/components/RowCategory";
import { useRouter } from "expo-router";
export default function profileTab() {
  const router = useRouter();
  const imageUrl = useSelector((state: any) => state.userdata.avatar);

  const handleDetailProfile = () => {
    router.navigate("/home/profileDetail");
  }
  const userInfo = useSelector((state: any) => state.userdata.user);
  return (
    <SafeAreaView style={AppStyle.StyleCommon.container}>
      <View style={AppStyle.StyleCommon.container}>
        <ImageBackground source={require("../../../assets/images/logo-background.png")} resizeMode="contain" style={AppStyle.StyleHome.background}>
          <TitleHeader title={"Hồ sơ nhân viên"} />
          <View style={[AppStyle.StyleHeader.boxInfo, {padding: 20, borderBottomWidth: 2, borderColor: Color.color1 }]}>
            <TouchableOpacity>
              <Image
                style={[AppStyle.StyleHeader.size_avt]}
                source={
                  imageUrl
                    ? { uri: imageUrl }
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
          <RowCategory name={"Thông tin chung"} img={require("../../../assets/images/profileIcon.png")} onPress={handleDetailProfile} />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
