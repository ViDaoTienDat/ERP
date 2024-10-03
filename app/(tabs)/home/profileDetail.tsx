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
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AppStyle from "@/constants/theme";
import TitleHeader from "@/components/TitleHeader";
import ContentProfile from "@/components/ContentProfile";
import { useSelector } from "react-redux";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker';
export default function profileDetail() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const userInfo = useSelector((state: any) => state.userdata.user);

  const [image, setImage] = useState<string | null>(null);


  const pickImage = async () => {
    setModalVisible(false);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });

    if (!result.canceled) {
        const type = result.assets[0] ? result.assets[0].uri.split(".").pop() : null;
        const base64Image = result.assets[0].base64;
        setImage(`data:image/${type};base64,${base64Image}`);
    }
  };
  const takePhoto = async () => {
    setModalVisible(false);
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64:true
    });
    if (!result.canceled) {
      const type = result.assets[0] ? result.assets[0].uri.split(".").pop() : null;
      const base64Image = result.assets[0].base64;
      setImage(`data:image/${type};base64,${base64Image}`);
  }
  }

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
                  image
                    ? { uri: image }
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
                <TouchableOpacity style={styles.row_container_modal} onPress={pickImage}>
                  <Image
                    style={styles.icon}
                    source={require("../../../assets/images/file-earmark-image.png")}
                  />
                  <Text style={AppStyle.StyleCommon.textBlack16w400}>
                    Chọn ảnh trong thư viện
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.row_container_modal} onPress={takePhoto}>
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
