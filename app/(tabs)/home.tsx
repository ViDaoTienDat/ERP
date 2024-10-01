import {
  View,
  Text,
  FlatList,
  Animated,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../constants/theme";
import HomeHeader from "@/components/HomeHeader";
import CardCategory from "@/components/CardCategory";
import { data_cardbasic } from "../../assets/data/data_test";
import CardInternalNews from "@/components/CardInternalNews";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";
import Color from "@/constants/theme/Color";
import { useNavigation } from "expo-router";
export default function home() {
  const navigation = useNavigation();
  const [backPressedOnce, setBackPressedOnce] = useState(false);
  // Effect
  useEffect(() => {
    const backAction = () => {
      if (backPressedOnce) {
        BackHandler.exitApp(); // Thoát ứng dụng nếu bấm lần thứ 2
      } else {
        setBackPressedOnce(true); // Cập nhật trạng thái là đã bấm lần đầu
        ToastAndroid.show("Bấm quay về lần nữa để thoát", ToastAndroid.SHORT); // Hiện toast

        setTimeout(() => {
          setBackPressedOnce(false); // Reset trạng thái sau 2 giây
        }, 2000);
      }
      return true; // Chặn hành động quay về mặc định
    };

    // Lắng nghe sự kiện nút quay lại
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    // Dọn dẹp sự kiện khi component bị hủy
    return () => backHandler.remove();
  }, [backPressedOnce]);

  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );
  const userInfo = useSelector((state: any) => state.userdata.user);

  return (
    <SafeAreaView style={AppStyle.StyleCommon.container}>
      {!userInfo ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"small"} color={Color.color3} />
        </View>
      ) : (
        <ImageBackground
          source={require("../../assets/images/logo-background.png")}
          resizeMode="contain"
          style={[AppStyle.StyleHome.background]}
        >
          <HomeHeader userInfo={userInfo} />
          <View style={AppStyle.StyleHome.boxInternalNews}>
            <Text style={AppStyle.StyleHome.textTitleLarge}>
              Tin tức nội bộ
            </Text>
            <FlatList
              data={data_cardbasic}
              renderItem={({ item }) => <CardInternalNews item={item} />}
              horizontal
              pagingEnabled
              snapToAlignment="center"
              showsHorizontalScrollIndicator={false}
              onScroll={handleOnScroll}
            />
            <Pagination data={data_cardbasic} scrollX={scrollX} />
          </View>
          <View style={AppStyle.StyleHome.boxCategory}>
            <CardCategory
              name="Hồ sơ"
              img={require("../../assets/images/person-lines-fill.png")}
            />
            <CardCategory
              name="Chấm công"
              img={require("../../assets/images/person-bounding-box-fill.png")}
            />
            <CardCategory
              name="Nghỉ phép"
              img={require("../../assets/images/calendar-week.png")}
            />
            <CardCategory
              name="Nội quy"
              img={require("../../assets/images/file-text.png")}
            />
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}
