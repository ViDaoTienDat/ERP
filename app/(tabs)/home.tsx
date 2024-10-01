import {
  View,
  Text,
  FlatList,
  Animated,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../constants/theme";
import HomeHeader from "@/components/HomeHeader";
import CardCategory from "@/components/CardCategory";
import { data_cardbasic } from "../../assets/data/data_test";
import CardInternalNews from "@/components/CardInternalNews";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";
import Color from "@/constants/theme/Color";
export default function home() {
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
