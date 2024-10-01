import {
  View,
  Text,
  FlatList,
  Animated,
  ImageBackground,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Image,
  TouchableWithoutFeedback,
  StyleSheet
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "../../../constants/theme";
import HomeHeader from "@/components/HomeHeader";
import CardCategory from "@/components/CardCategory";
import { data_cardbasic } from "../../../assets/data/data_test";
import CardInternalNews from "@/components/CardInternalNews";
import Pagination from "@/components/Pagination";
import { useSelector } from "react-redux";
import Color from "@/constants/theme/Color";
import RowCategory from "@/components/RowCategory";
import { useRouter } from "expo-router";
export default function home() {
  const router = useRouter();
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(null);
  const handleOnScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    { useNativeDriver: false }
  );
  const userInfo = useSelector((state: any) => state.userdata.user);
  const slideAnim = useRef(new Animated.Value(-500)).current; // Vị trí bắt đầu từ bên trái
  const [modalVisible, setModalVisible] = useState(false);
  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -500,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

   const handleOpen = () => {
    setModalVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300, 
      useNativeDriver: true,
    }).start();
  };

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
            source={require("../../../assets/images/logo-background.png")}
            resizeMode="contain"
            style={[AppStyle.StyleHome.background]}
          >
            <HomeHeader userInfo={userInfo} onPress={handleOpen} />
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
                img={require("../../../assets/images/person-lines-fill.png")}
                onPress={() => {router.navigate("/home/profileTab")}}
              />
              <CardCategory
                name="Chấm công"
                img={require("../../../assets/images/person-bounding-box-fill.png")}
              />
              <CardCategory
                name="Nghỉ phép"
                img={require("../../../assets/images/calendar-week.png")}
              />
              <CardCategory
                name="Nội quy"
                img={require("../../../assets/images/file-text.png")}
              />
            </View>
          </ImageBackground>
      )}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleClose}
      >
        <TouchableWithoutFeedback onPress={handleClose}>
          <View style={styles.modalContainer}>
            <Animated.View style={[styles.modalView, { transform: [{ translateX: slideAnim }] }]}>
              <View style={{gap: 20}}>
                <TouchableOpacity onPress={handleClose} style={{alignSelf: 'flex-end', padding: 10, borderRadius: 10 }}>
                  <Image style={AppStyle.StyleHeader.size_iconBack} source={require("../../../assets/images/filter-right.png")}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center', gap: 10}}>
                  <Image
                    style={[AppStyle.StyleCommon.size_avt_large]}
                    source={userInfo ? { uri: userInfo.avatar } : require("../../../assets/images/avt.png")}
                  />
                  <Text style={AppStyle.StyleCommon.textBlack18}>{userInfo ? userInfo.full_name : "..."}</Text>
                  <Text style={AppStyle.StyleCommon.textBlack14}>{userInfo ? userInfo.position : "..."}</Text>
                </View>
                <View>
                  <RowCategory name="Hồ sơ nhân viên" img={require("../../../assets/images/person-lines-fill.png")}/>
                  <RowCategory name="Đăng xuất" img={require("../../../assets/images/sign_out.png")}/>
                </View>
              </View>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalView: {
    height: '100%', // Chiếm nửa màn hình
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', // Để nền modal mờ
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
});
