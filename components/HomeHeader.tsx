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
import { useSelector } from "react-redux";

function HomeHeader(): React.JSX.Element {
  const userInfo = useSelector((state: any) => state.userdata.user);
  return (
    <View style={AppStyle.StyleHeader.header}>
      <View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={[AppStyle.StyleHeader.boxInfo]}>
          <TouchableOpacity>
            <Image
              style={[AppStyle.StyleHeader.size_avt]}
              source={require("../assets/images/avt.png")}
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
          <TouchableOpacity style={{}}>
            <Image
              style={[AppStyle.StyleHeader.size_iconsearch]}
              source={require("../assets/images/bell.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={[
          AppStyle.StyleHeader.header_item,
          AppStyle.StyleHeader.boxsearch,
        ]}
      >
        <Image
          style={{ width: 16, height: 16 }}
          source={require("../assets/images/search_c3c3c3.png")}
        />
        <TextInput
          style={AppStyle.StyleHeader.boxinput}
          placeholder="Tìm kiếm nhanh"
          placeholderTextColor="#B3B3B3"
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
