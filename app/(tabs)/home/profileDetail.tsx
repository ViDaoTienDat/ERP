import {
  View,
  Text,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "@/constants/theme";
import TitleHeader from "@/components/TitleHeader";
import ContentProfile from "@/components/ContentProfile";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { changeAvatar } from "@/app/axios/api/dataUserAPI";
import { setAvatar, setUrlAvatar } from "@/app/state/reducers/dataSlice";
import Color from "@/constants/theme/Color";
import { getImageUrl } from "@/app/axios/api/imageApi";
import * as ImageManipulator from "expo-image-manipulator";
export default function profileDetail() {
  const [modalVisible, setModalVisible] = useState(false);
  const userInfo = useSelector((state: any) => state.userdata.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const imgUrl = useSelector((state: any) => state.userdata.urlAvatar);
  const [img, setImg] = useState("");

  const pickImage = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.assets[0]);
    }
  };
  const takePhoto = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setIsLoading(true);
      uploadImage(result.assets[0]);
    }
  };

  const uploadImage = async (imageUri: any) => {
    console.log(imageUri);
    const resizedImage = await ImageManipulator.manipulateAsync(
      imageUri.uri,
      [{ resize: { width: 800 } }],
      { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
    );
    console.log(resizedImage);
    const response = await changeAvatar(resizedImage);
    if (response?.data) {
      dispatch(setAvatar(response?.data?.id));
      getImageUrl(response?.data?.id).then((res) => {
        if (res) {
          dispatch(setUrlAvatar(res)); 
          setIsLoading(false);
        }
      });
    }
  };

  return (
    <SafeAreaView style={AppStyle.StyleCommon.container}>
      <View style={AppStyle.StyleCommon.container}>
        <ImageBackground
          source={require("../../../assets/images/logo-background.png")}
          resizeMode="contain"
          style={AppStyle.StyleHome.background}
        >
          <TitleHeader title={"Thông tin chung"} />
          <ScrollView>
            <View style={styles.row_container}>
              <Image
                style={[AppStyle.StyleCommon.size_avt_large]}
                source={
                  img
                    ? { uri: img }
                    : imgUrl
                    ? { uri: imgUrl }
                    : require("../../../assets/images/avt.png")
                }
              />
              <View style={styles.container}>
                <TouchableOpacity
                  style={styles.touchable}
                  onPress={() => setModalVisible(true)}
                >
                  <Image
                    style={styles.image}
                    source={require("../../../assets/images/camera.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <ContentProfile title={"Họ tên"} content={userInfo?.full_name} />
            <ContentProfile title={"Mã nhân viên"} content={userInfo?.id} />
            <ContentProfile title={"Giới tính"} content={userInfo?.gender} />
            <ContentProfile title={"Ngày sinh"} content={userInfo?.birthday} />
            <ContentProfile
              title={"Số điện thoại"}
              content={userInfo?.phone_number}
            />
            <ContentProfile title={"Email"} content={userInfo?.email} />
            <ContentProfile title={"Địa chỉ"} content={userInfo?.address} />
            <ContentProfile
              title={"Ngày bắt đầu"}
              content={userInfo?.start_date}
            />
            <ContentProfile
              title={"Ngày chính thức"}
              content={userInfo?.formal_date}
            />
            <ContentProfile
              title={"Ngày kết thúc"}
              content={userInfo?.end_date}
            />
            <ContentProfile title={"Trạng thái"} content={""} />
            <ContentProfile title={"Phân loại"} content={""} />
            <ContentProfile title={"Chức danh"} content={userInfo?.position} />
            <ContentProfile
              title={"Phòng ban"}
              content={userInfo?.department}
            />
            <ContentProfile
              title={"Quản lý trực tiếp"}
              content={userInfo?.mentor}
            />
          </ScrollView>
        </ImageBackground>
        {isLoading && (
          <View style={AppStyle.StyleCommon.loadingWrapper}>
            <View style={AppStyle.StyleCommon.loadingContainer}>
              <ActivityIndicator size="large" color={Color.color_header_red} />
            </View>
          </View>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setModalVisible(!modalVisible)}
        >
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalView}>
                <TouchableOpacity
                  style={styles.row_container_modal}
                  onPress={pickImage}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/file-earmark-image.png")}
                  />
                  <Text style={AppStyle.StyleCommon.textBlack16w400}>
                    Chọn ảnh trong thư viện
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.row_container_modal}
                  onPress={takePhoto}
                >
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/camera_black.png")}
                  />
                  <Text style={AppStyle.StyleCommon.textBlack16w400}>
                    Chụp ảnh
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { justifyContent: "flex-end" },
  touchable: {
    padding: 5,
    backgroundColor: "#FAFAFA",
    borderRadius: 12,
    position: "absolute",
    right: 5,
  },
  row_container: {
    flexDirection: "row",
    justifyContent: "center",
    padding: 20,
  },
  row_container_modal: {
    flexDirection: "row",
    padding: 20,
    gap: 20,
  },
  image: { width: 15, height: 15 },
  icon: { width: 25, height: 25 },
  modalView: {
    height: "20%",
    width: "100%",
    backgroundColor: "white",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)", // Để nền modal mờ
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
});
