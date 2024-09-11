import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Color from "../constants/theme/Color";
import AppStyle from "../constants/theme";

function HomeHeader(): React.JSX.Element {
  return (
    <View style={AppStyle.StyleHeader.header}>
      <TouchableOpacity style={[AppStyle.StyleHeader.header_item]}>
        <Image
          style={[
            AppStyle.StyleHeader.size_avt,
            AppStyle.StyleHeader.border_white,
          ]}
          source={require("../assets/images/avt.png")}
        />
      </TouchableOpacity>
      <View
        style={[
          AppStyle.StyleHeader.header_item,
          AppStyle.StyleHeader.boxsearch,
        ]}
      >
        <Image
          style={[AppStyle.StyleHeader.size_iconsearch]}
          source={require("../assets/images/search_c3c3c3.png")}
        />
        <TextInput
          style={AppStyle.StyleHeader.boxinput}
          placeholder="Tìm kiếm nhanh"
          placeholderTextColor="#B3B3B3"
        />
      </View>
      <View>
        <TouchableOpacity style={[AppStyle.StyleHeader.header_item]}>
          <Image
            style={[AppStyle.StyleHeader.size_iconsearch]}
            source={require("../assets/images/bell.png")}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HomeHeader;
