import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppStyle from "../../../constants/theme";

import { StackNavigationProp } from "@react-navigation/stack";

import { useNavigation } from "@react-navigation/native";
import CardRegister from "../../../components/CardRegister";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

function registerChild(): React.JSX.Element {
  const router = useRouter();
  const handlePressTabLOA = (num: any) => {
    router.navigate("./register/registerLOA");
  };
  const handlePressTabOnsite = (num: any) => {
    router.navigate("./register/registerOnSite");
  };
  const handlePressTabWFH = (num: any) => {
    router.navigate("./register/registerWFH");
  };
  const handlePressTabIntern = (num: any) => {
    router.navigate("./register/registerIntern");
  };
  const handlePressTabForgot = (num: any) => {
    router.navigate("./register/registerForgot");
  };
  const roleId = useSelector((state: any) => state.userdata.roleId);
  console.log("🚀 ~ registerChild ~ roleId:", roleId);
  return (
    <View style={{ flex: 1 }}>
      <View style={AppStyle.StyleCheckIn.container}>
        <Text style={AppStyle.StyleCheckIn.textNote}>
          Bạn vui lòng chọn loại đăng ký phù hợp!
        </Text>
        <CardRegister name="Đăng ký nghỉ phép" func={handlePressTabLOA} />
        <CardRegister
          name="Đăng ký làm việc onsite"
          func={handlePressTabOnsite}
        />
        <CardRegister
          name="Đăng ký làm việc tại nhà"
          func={handlePressTabWFH}
        />
        {roleId == "R1" && (
          <CardRegister
            name="Đăng ký lịch thực tập"
            func={handlePressTabIntern}
          />
        )}
        <CardRegister name="Quên chấm công" func={handlePressTabForgot} />
      </View>
    </View>
  );
}

export default registerChild;
