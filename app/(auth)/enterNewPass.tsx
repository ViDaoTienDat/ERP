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
import { router, useLocalSearchParams } from "expo-router";
import { checkPassword } from "../axios/func/checkPassword";
import { changePassword, resetPassword } from "../axios/api/loginAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomMessage from "@/components/CustomMessage";
import * as SecureStore from "expo-secure-store";

export default function enterNewPass() {
  const params = useLocalSearchParams();
  const email = params.email.toString();
  const password = params.password.toString();
  const isChangePasswordFirstTime = Number(params.isChangePassword);
  const isSavedPassword = params.isSavedPassword.toString();
  const [newpass, setNewPass] = useState("");
  const [retypePass, setRetypePass] = useState("");
  const [isStrongPass, setIsStrongPass] = useState(false);
  const [message, setMessage] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [textwrong, setTextWrong] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleGoLogin = () => {
    router.replace("/login");
  };
  const handleSuccess = () => {
    router.replace("/");
  };
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  useEffect(() => {
    checkPassword(newpass).then(({ mess, isStrongPass }) => {
      setIsStrongPass(isStrongPass);
      setMessage(mess);
    });
  }, [newpass]);

  const handleLogin = () => {
    if (newpass && retypePass) {
      if (newpass === retypePass) {
        if (isChangePasswordFirstTime == 1) {
          changePassword(password, newpass, retypePass).then(async (result) => {
            if (result.code === 200) {
              if (isSavedPassword == "true") {
                await AsyncStorage.setItem("password", newpass);
              }
              await SecureStore.setItemAsync("force_password_change", "false");
              setWrongPass(false);
              handleSuccess();
            } else if (result.code === 400) {
              setWrongPass(true);
              setTextWrong("Xác nhận mật khẩu không đúng!");
            } else {
              setWrongPass(true);
              setTextWrong("Lỗi không xác định!");
            }
          });
        } else {
          resetPassword(email, newpass, retypePass).then((result) => {
            if (result.code === 200) {
              setWrongPass(false);
              setIsSuccess(true);
            } else if (result.code === 400) {
              setWrongPass(true);
              setTextWrong("Không thể đổi!");
            } else {
              setWrongPass(true);
              setTextWrong("Lỗi không xác định!");
            }
          });
        }
      } else {
        setWrongPass(true);
        setTextWrong("Xác nhận mật khẩu không đúng");
      }
    } else {
      setWrongPass(true);
      setTextWrong("Mật khẩu không được để trống!");
    }
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
                <Text style={AppStyle.StyleCommon.textBlack15}>
                  {isChangePasswordFirstTime == 1
                    ? "Thay đổi mật khẩu lần đầu tiên"
                    : "Đặt lại mật khẩu"}
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
                {!isStrongPass && (
                  <View>
                    <Text>{message}</Text>
                  </View>
                )}
                {wrongPass && (
                  <View>
                    <Text style={AppStyle.StyleLogin.wrongPass}>
                      {textwrong}
                    </Text>
                  </View>
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
                  disabled={!isStrongPass}
                  style={[
                    AppStyle.StyleLogin.button,
                    !isStrongPass && { backgroundColor: "#ccc" },
                    AppStyle.StyleCommon.alignCenter,
                  ]}
                  onPress={handleLogin}
                >
                  <Text
                    style={[
                      AppStyle.StyleCommon.textWhite15,
                      !isStrongPass && { color: "#A8A8A8" },
                      AppStyle.StyleLogin.spaceButton,
                    ]}
                  >
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
        <CustomMessage
          hasVisible={isSuccess}
          title={"Đổi mật khẩu thành công"}
          content={"Vui lòng đăng nhập lại"}
          func={[handleGoLogin]}
          textFunc={["Đăng nhập"]}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
    <View
        style={[
          AppStyle.StyleLogin.flexVer,
        ]}
      >
        <Text style={{ alignSelf: "center" }}>Version 1.1.1</Text>
      </View>
    </View>
  );
}
