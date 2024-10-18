import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../constants/theme";
import { router } from "expo-router";
import { sendCode } from "../axios/api/loginAPI";

export default function forgotPass() {
  const [email, setEmail] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [textwrong, setTextWrong] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGoBack = () => {
    router.back();
  };
  const handleNext = () => {
    setIsLoading(true);
    setTextWrong("");
    sendCode(email).then((result) => {
      if (result.code === 200) {
        router.push({ pathname: "./verifyCode", params: { email: email } });
        setWrongPass(false);
        setTextWrong("");
        setIsLoading(false);
      } else if (result.code === 400) {
        setWrongPass(true);
        setTextWrong("Email không tồn tại!");
        setIsLoading(false);
      } else {
        setWrongPass(true);
        setTextWrong("Lỗi không xác định!");
        setIsLoading(false);
      }
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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
                  <Text style={AppStyle.StyleCommon.textBlack15}>Email</Text>
                  <TextInput
                    style={[
                      AppStyle.StyleLogin.inputLogin,
                      AppStyle.StyleCommon.textBlack15,
                    ]}
                    placeholder="Nhập email của bạn"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                  />
                  {wrongPass && (
                    <Text style={[AppStyle.StyleLogin.wrongPass]}>
                      {textwrong}
                    </Text>
                  )}
                </View>

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
                    {isLoading ? ( // Hiển thị ActivityIndicator nếu đang tải
                      <ActivityIndicator
                        style={[AppStyle.StyleLogin.spaceButton]}
                        size="small"
                        color="#fff"
                      />
                    ) : (
                      <Text
                        style={[
                          AppStyle.StyleCommon.textWhite15,
                          AppStyle.StyleLogin.spaceButton,
                        ]}
                      >
                        Gửi mã
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
      <View style={AppStyle.StyleLogin.flexVer}>
        <Text style={{ alignSelf: "center" }}>Version 1.1.1</Text>
      </View>
    </View>
  );
}
