import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Color from "../constants/theme/Color";
import AppStyle from "../constants/theme";

function HomeHeader({
  userInfo,
  onPress,
  handlePressNotificationIcon,
}: any): React.JSX.Element {
  return (
    <View style={[AppStyle.StyleHeader.header]}>
      <View style={[AppStyle.StyleHeader.topRow]}>
        <View style={[AppStyle.StyleHeader.boxInfo]}>
          <TouchableOpacity onPress={onPress}>
            <Image
              style={[AppStyle.StyleHeader.size_avt]}
              source={
                userInfo?.avatar
                  ? { uri: userInfo.avatar }
                  : require("../assets/images/avt.png")
              }
            />
          </TouchableOpacity>
          <View>
            <Text
              style={[AppStyle.StyleCommon.textWhite15, { lineHeight: 19 }]}
            >
              {userInfo ? userInfo.full_name : "..."}
            </Text>
            <Text style={{ fontSize: 12, color: "#ececec" }}>
              {userInfo ? userInfo.position : "..."}
            </Text>
          </View>
        </View>
        <View>
          <View style={[selfstyle.dot, { backgroundColor: "#E6224D" }]}></View>
          <TouchableOpacity onPress={handlePressNotificationIcon}>
            <Image
              style={[AppStyle.StyleHeader.size_iconsearch]}
              source={require("../assets/images/bell-fill.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[AppStyle.StyleHeader.boxsearch]}>
        <Image
          style={[
            AppStyle.StyleHeader.size_iconsearch,
            { width: 16, height: 16 },
          ]}
          source={require("../assets/images/search.png")}
        />
        <TextInput
          style={[AppStyle.StyleHeader.boxinput]}
          placeholder="Tìm kiếm nhanh"
          placeholderTextColor={Color.color_gray5}
        />
      </View>
    </View>
  );
}
const selfstyle = StyleSheet.create({
  dot: {
    position: "absolute",
    zIndex: 100,
    left: 15,
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: Color.color1,
    marginHorizontal: 3,
  },
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeHeader;
