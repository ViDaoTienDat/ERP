import {
  ActivityIndicator,
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../constants/theme";

import { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect } from "expo-router";
import { signIn } from "../axios/api/loginAPI";
import { getUser } from "../axios/api/dataUserAPI";
import { useDispatch } from "react-redux";
import {
  setBranch,
  setDataIntern,
  setDateHisCheckIn,
  setRoleId,
  setUrlAvatar,
  setUser,
  setWorkShift,
} from "../state/reducers/dataSlice";
import { GetInternSchedule } from "../axios/api/InternAPI";
import { getHisCheckIn } from "../axios/api/checkInApi";
import { handleSplitHisCheckIn } from "../axios/func/createCalendar";
import { splitWorkShift } from "../axios/func/loadDataUser";
import { getAllBranch } from "../axios/api/branchApi";
import { getWorkShift } from "../axios/api/workShirtApi";
import Color from "@/constants/theme/Color";
import { CustomCheckBox } from "@/components/CustomCheckBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { getRoleIdFromAccessToken } from "../axios/func/getUserIdFromAccessToken";
import Dimension from "@/constants/theme/Dimension";
import { getImageUrl } from "../axios/api/imageApi";

export default function Index() {
  const dispatch = useDispatch();
  const [isSavedPassword, setisSavedPassword] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);
  const [textwrong, setTextWrong] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const isFocused = useIsFocused();
  useEffect(() => {
    if (!isFocused) return;

    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp();
      } else {
        setBackPressedOnce(true);
        ToastAndroid.show(
          "Bấm quay về lần nữa để thoát ứng dụng",
          ToastAndroid.SHORT
        );

        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [isFocused, backPressedOnce]);

  const getSavedLoginInfo = async () => {
    const email = await AsyncStorage.getItem("email");
    // console.log("🚀 ~ getSavedLoginInfo ~ email:", email);
    const password = await AsyncStorage.getItem("password");
    // console.log("🚀 ~ getSavedLoginInfo ~ password:", password);
    const isSavedPassword = await AsyncStorage.getItem("isSavedPassword");
    // console.log("🚀 ~ getSavedLoginInfo ~ isSavedPassword:", isSavedPassword);
    return { email, password, isSavedPassword };
  };

  useFocusEffect(
    useCallback(() => {
      const fetchSavedLoginInfo = async () => {
        const dataSavedLogin = await getSavedLoginInfo();
        if (dataSavedLogin.email) {
          setEmail(dataSavedLogin.email);
        }
        if (dataSavedLogin.isSavedPassword === "true") {
          setisSavedPassword(true);
        } else {
          setisSavedPassword(false);
        }
        if (dataSavedLogin.password) {
          setPassword(dataSavedLogin.password);
        } else {
          setPassword("");
        }
      };

      fetchSavedLoginInfo();

      // Cleanup function (nếu cần), chạy khi màn hình mất focus
      return () => {
        // Optional: Logic để dọn dẹp hoặc reset khi màn hình bị unmount
      };
    }, []) // Nếu có biến nào muốn phụ thuộc có thể thêm vào array này
  );

  const handleLogin = () => {
    setLoading(true);
    signIn(email, password).then(async (result) => {
      if (result.code === 200) {
        await AsyncStorage.setItem("email", email);
        if (isSavedPassword) {
          await AsyncStorage.setItem(
            "isSavedPassword",
            isSavedPassword.toString()
          );
          await AsyncStorage.setItem("password", password);
        } else {
          await AsyncStorage.setItem(
            "isSavedPassword",
            isSavedPassword.toString()
          );
          await AsyncStorage.setItem("password", ""); // Đặt giá trị password thành null
        }

        setWrongPass(false);
        setTextWrong("");
        if (result.data.force_password_change) {
          router.push({
            pathname: "./enterNewPass",
            params: {
              email: email,
              password: password,
              isChangePassword: 1,
              isSavedPassword: isSavedPassword.toString(),
            },
          });
        } else {
          dispatch(
            setRoleId(getRoleIdFromAccessToken(result.data.access_token))
          );
          getUser(result.data.access_token).then(async (result) => {
            if (result.code === 200) {
              dispatch(setUser(result.data));
            }
          });
          getAllBranch().then(async (result) => {
            if (result.code === 200) {
              dispatch(setBranch(result.data));
            }
          });
          getHisCheckIn().then(async (result) => {
            if (result.code === 200) {
              const datehis = await handleSplitHisCheckIn(result.data);
              dispatch(setDateHisCheckIn(datehis));
            }
          });
          GetInternSchedule().then(async (result) => {
            if (result.code === 200) {
              dispatch(setDataIntern(result.data));
            }
          });
          getWorkShift().then(async (result) => {
            if (result.code === 200) {
              const workshift = await splitWorkShift(result.data);
              dispatch(setWorkShift(workshift));
            }
          });

          router.push("/(tabs)/home");
        }
      } else if (result.code === 401) {
        setWrongPass(true);
        setTextWrong("Email hoặc mật khẩu không đúng!");
      } else {
        setWrongPass(true);
        console.log(result);
        setTextWrong("Lỗi không xác định!");
      }

      setLoading(false);
    });
  };

  const handleForgotPassword = () => {
    router.push("./forgotPass");
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
                ,
              ]}
            >
              <Image
                resizeMode="contain"
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
                    placeholder="Nhập email"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                    }}
                  />
                </View>
                <View style={AppStyle.StyleLogin.boxItem}>
                  <Text style={AppStyle.StyleCommon.textBlack15}>Mật khẩu</Text>
                  <TextInput
                    style={[
                      AppStyle.StyleLogin.inputLogin,
                      AppStyle.StyleCommon.textBlack15,
                    ]}
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#ccc"
                    secureTextEntry={!showPass}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                    }}
                  />
                  <TouchableOpacity
                    style={AppStyle.StyleLogin.buttonImg}
                    onPress={handleShowPass}
                  >
                    <Image
                      style={AppStyle.StyleLogin.img}
                      source={
                        showPass
                          ? require("../../assets/images/eye_view.png")
                          : require("../../assets/images/eye_hide.png")
                      }
                    />
                  </TouchableOpacity>
                </View>
                {wrongPass && (
                  <View
                    style={[
                      AppStyle.StyleLogin.boxItem,
                      { marginVertical: 0, marginLeft: 4 },
                    ]}
                  >
                    <Text style={AppStyle.StyleLogin.wrongPass}>
                      {textwrong}
                    </Text>
                  </View>
                )}
                <View
                  style={{
                    flex: 1,
                    alignSelf: "flex-end",
                    marginRight: 20,
                    marginBottom: 15,
                  }}
                >
                  <TouchableOpacity onPress={handleForgotPassword}>
                    <Text style={AppStyle.StyleLogin.textHref}>
                      Quên mật khẩu?
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    {
                      flexDirection: "row",
                      width: "90%",
                      alignSelf: "center",
                      marginLeft: 4,
                      marginBottom: 10,
                      gap: 10,
                    },
                  ]}
                >
                  <CustomCheckBox
                    checked={isSavedPassword}
                    func={() => {
                      setisSavedPassword(!isSavedPassword);
                    }}
                  />
                  <Text>Lưu mật khẩu</Text>
                </View>
                <TouchableOpacity
                  style={[
                    AppStyle.StyleLogin.boxItem,
                    AppStyle.StyleLogin.button,
                    AppStyle.StyleCommon.alignCenter,
                    ,
                    {
                      backgroundColor:
                        email && password ? Color.color_header_red : "#ccc", // Điều kiện đổi màu nền
                    },
                  ]}
                  onPress={handleLogin}
                  disabled={loading || !(email && password)} // Vô hiệu hóa nút khi đang tải
                >
                  {loading ? ( // Hiển thị ActivityIndicator nếu đang tải
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text
                      style={[
                        AppStyle.StyleCommon.textWhite15,
                        { color: email && password ? "#fff" : "#A8A8A8" },
                      ]}
                    >
                      Đăng nhập
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
