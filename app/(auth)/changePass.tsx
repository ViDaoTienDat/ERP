import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../constants/theme";
import { router } from "expo-router";

export default function changePass() {
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [wrongPass, setWrongPass] = useState(false);
  const [textwrong, setTextWrong] = useState("");

  const handleGoBack = () => {
    router.navigate("./index");
  };
  const handleNext = () => {};
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView
        style={[
          AppStyle.StyleCommon.container,
          AppStyle.StyleCommon.alignCenter,
        ]}
      >
        <ScrollView
          style={[AppStyle.StyleCommon.container, { width: "100%" }]}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View
            style={[
              AppStyle.StyleCommon.alignCenter,
              AppStyle.StyleLogin.flexLogo,
            ]}
          >
            <Image
              style={AppStyle.StyleLogin.logo}
              source={require("../../assets/images/logo.png")}
            />
          </View>
          <View style={AppStyle.StyleLogin.flexLogin}>
            <View style={AppStyle.StyleLogin.boxLogin}>
              <View style={AppStyle.StyleLogin.boxItem}>
                <Text style={AppStyle.StyleCommon.textBlack15}>
                  Đặt lại mật khẩu
                </Text>
                <TextInput
                  style={[
                    AppStyle.StyleLogin.inputLogin,
                    AppStyle.StyleCommon.textBlack15,
                  ]}
                  placeholder="Nhập mật khẩu mới"
                  placeholderTextColor="#ccc"
                  value={pass}
                  onChangeText={(text) => {
                    setPass(text);
                  }}
                />
                <TextInput
                  style={[
                    AppStyle.StyleLogin.inputLogin,
                    AppStyle.StyleCommon.textBlack15,
                  ]}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#ccc"
                  value={confirmPass}
                  onChangeText={(text) => {
                    setConfirmPass(text);
                  }}
                />
              </View>
              {wrongPass && (
                <Text style={AppStyle.StyleLogin.wrongPass}>{textwrong}</Text>
              )}
              <View
                style={[
                  AppStyle.StyleCommon.flexRowCenter,
                  AppStyle.StyleLogin.boxButton,
                ]}
              >
                <TouchableOpacity
                  style={[AppStyle.StyleCommon.alignCenter]}
                  onPress={handleGoBack}
                >
                  <Text
                    style={[
                      AppStyle.StyleCommon.textBlack15,
                      AppStyle.StyleLogin.spaceButton,
                    ]}
                  >
                    Hủy bỏ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AppStyle.StyleLogin.button,
                    AppStyle.StyleCommon.alignCenter,
                  ]}
                  onPress={handleNext}
                >
                  <Text
                    style={[
                      AppStyle.StyleCommon.textWhite15,
                      ,
                      AppStyle.StyleLogin.spaceButton,
                    ]}
                  >
                    Gửi mã
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={AppStyle.StyleLogin.flexVer}>
            <Text style={{ alignSelf: "center" }}>Version 1.1.1</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
