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
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../constants/theme";
import { router } from "expo-router";

export default function enterNewPass() {
  //   const { email } = route.params;
  const [newpass, setNewPass] = useState("");
  const [retypePass, setRetypePass] = useState("");
  const [strongPass, setStrongPass] = useState(true);
  const [message, setMessage] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [textwrong, setTextWrong] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleGoLogin = () => {
    router.navigate("/");
  };
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    // checkPassword(newpass).then(({ mess, result }) => {
    //   setStrongPass(result);
    //   setMessage(mess);
    // });
  }, [newpass]);

  const handleLogin = () => {
    // resetPassword(email, newpass, retypePass).then((result) => {
    //   if (result.code === 200) {
    //     handleGoLogin();
    //   } else if (result.code === 400) {
    //     setWrongPass(true);
    //     setTextWrong("Không thể đổi!");
    //   } else {
    //     setWrongPass(true);
    //     setTextWrong("Lỗi không xác định!");
    //   }
    // });
  };
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
                  secureTextEntry={!showPass}
                  value={newpass}
                  onChangeText={(text) => {
                    setNewPass(text);
                  }}
                />
                <TextInput
                  style={[
                    AppStyle.StyleLogin.inputLogin,
                    AppStyle.StyleCommon.textBlack15,
                  ]}
                  placeholder="Xác nhận mật khẩu"
                  placeholderTextColor="#ccc"
                  secureTextEntry={!showPass}
                  value={retypePass}
                  onChangeText={(text) => {
                    setRetypePass(text);
                  }}
                />
                <TouchableOpacity
                  style={AppStyle.StyleLogin.showPassResetPass}
                  onPress={handleShowPass}
                >
                  <Text style={AppStyle.StyleLogin.textShowPass}>
                    {showPass ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  </Text>
                  <Image
                    style={AppStyle.StyleLogin.img}
                    source={
                      showPass
                        ? require("../../assets/images/eye_view.png")
                        : require("../../assets/images/eye_hide.png")
                    }
                  />
                </TouchableOpacity>
                {!strongPass && (
                  <View>
                    <Text>{message}</Text>
                  </View>
                )}
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
                  onPress={handleGoLogin}
                >
                  <Text
                    style={[
                      AppStyle.StyleCommon.textBlack15,
                      AppStyle.StyleLogin.spaceButton,
                    ]}
                  >
                    Hủy Bỏ
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AppStyle.StyleLogin.button,
                    AppStyle.StyleCommon.alignCenter,
                  ]}
                  onPress={handleLogin}
                >
                  <Text
                    style={[
                      AppStyle.StyleCommon.textWhite15,
                      ,
                      AppStyle.StyleLogin.spaceButton,
                    ]}
                  >
                    Xác nhận
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
