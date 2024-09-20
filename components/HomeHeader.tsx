import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import Color from "../constants/theme/Color";
import AppStyle from "../constants/theme";

function HomeHeader(): React.JSX.Element {
  return (
    <View style={AppStyle.StyleHeader.header}>
      <View style={AppStyle.StyleHeader.topRow}>
        <View style={AppStyle.StyleHeader.profileContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={[
                AppStyle.StyleHeader.size_avt,
              ]}
              source={require("../assets/images/avt.png")}
            />
          </TouchableOpacity>
          <View style={AppStyle.StyleHeader.textContainer}>
            <Text style={AppStyle.StyleHeader.text_name}>Nguyễn Văn A</Text>
            <Text style={AppStyle.StyleHeader.text_position}>Chức vụ</Text>
          </View>
        </View>
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Image
              style={[AppStyle.StyleHeader.size_iconnotificaton]}
              source={require("../assets/images/bell-fill.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[
          AppStyle.StyleHeader.boxsearch,
        ]}
      >
        <Image
          style={[AppStyle.StyleHeader.size_iconsearch]}
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

export default HomeHeader;
