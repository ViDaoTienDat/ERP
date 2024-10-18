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
import { verifyPassword } from "../axios/api/loginAPI";

export default function verifyCode() {
  const [code, setCode] = useState("");
  // const { email } = route.params;
  const [wrongPass, setWrongPass] = useState(false);
  const [textwrong, setTextWrong] = useState("");
  const params = useLocalSearchParams();

  useEffect(() => {
    console.log("Params" + JSON.stringify(params.email));
  }, []);
  const email = params.email;
  const handleNext = () => {
    verifyPassword(email, code).then((result) => {
      if (result.code === 200) {
        router.push({
          pathname: "./enterNewPass",
          params: {
            email: email,
            password: "",
            isChangePassword: 0,
            isSavedPassword: "",
          },
        });
      } else if (result.code === 400) {
        setWrongPass(true);
        setTextWrong("Mã không chính xác!");
      } else {
        setWrongPass(true);
        setTextWrong("Lỗi không xác định!");
      }
    });
  };

  const reSendCode = () => {
    // sendCode(email).then((result)=> {
    // })
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
                    Nhập mã xác thực
                  </Text>
                  <Text style={AppStyle.StyleCommon.textGray15}>
                    Chúng tôi đã gửi mã xác thực qua email *******.thd@gmail.com
                  </Text>
                  <TextInput
                    style={[
                      AppStyle.StyleLogin.inputLogin,
                      AppStyle.StyleCommon.textBlack15,
                    ]}
                    placeholder="Nhập mã xác thực"
                    placeholderTextColor="#ccc"
                    value={code}
                    onChangeText={(text) => {
                      setCode(text);
                    }}
                  />
                  {wrongPass && (
                    <Text style={AppStyle.StyleLogin.wrongPass}>
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
                    onPress={reSendCode}
                  >
                    <Text
                      style={[
                        AppStyle.StyleCommon.textBlack15,
                        AppStyle.StyleLogin.spaceButton,
                      ]}
                    >
                      Gửi lại mã
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
                      Xác nhận
                    </Text>
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
