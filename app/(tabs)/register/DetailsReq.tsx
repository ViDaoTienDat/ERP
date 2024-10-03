import { BasicInfo, CardApprove, OnsiteInfo } from "@/components/ComponentReq";
import { ItemInput } from "@/components/ItemRegister";
import TitleHeader from "@/components/TitleHeader";
import AppStyle from "@/constants/theme";
import Color from "@/constants/theme/Color";
import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function DetailsReq(): React.JSX.Element {
  const [titleModal, setTitleModal] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const handleAccept = () => {
    // Perform acceptance logic here
    setModalVisible(false);
    setConfirmationVisible(true);
  };

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
    // Navigate back or perform other actions as needed
  };
  return (
    <SafeAreaView style={AppStyle.StyleCommon.container}>
      <TitleHeader title={"Yêu cầu"} />
      <CardApprove
        name={"Tên yêu cầu"}
        dateCreate={new Date()}
        state={0}
        handlePressAccept={() => {
          setTitleModal("Chấp nhận");
          setModalVisible(true);
        }}
        handlePressDeny={() => {
          setTitleModal("Từ chối");
          setModalVisible(true);
        }}
      />
      <ScrollView style={AppStyle.StyleReq.boxScroll}>
        <BasicInfo />
        <OnsiteInfo />
      </ScrollView>
      <Modal transparent={true} animationType="slide" visible={isModalVisible}>
        <View style={AppStyle.StyleCheckIn.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[AppStyle.StyleCheckIn.modalView, { paddingBottom: 10 }]}
            >
              <View
                style={{
                  paddingTop: 15,
                }}
              >
                <Text
                  style={[
                    AppStyle.StyleCommon.textBlack15,
                    { textAlign: "center", fontSize: 18, fontWeight: 600 },
                  ]}
                >
                  {titleModal} yêu cầu
                </Text>
              </View>

              <View style={{ paddingHorizontal: 20 }}>
                <ItemInput
                  label="Lời nhắn"
                  value={""}
                  onChangeValue={(text: React.SetStateAction<string>) => {}}
                />
                <View style={{ flexDirection: "row", paddingVertical: 10 }}>
                  <TouchableOpacity
                    style={{ flex: 1, padding: 10 }}
                    onPress={() => {
                      setModalVisible(false);
                    }}
                  >
                    <Text style={{ textAlign: "center" }}>Hủy bỏ</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      padding: 10,
                      backgroundColor: Color.color3,
                      borderRadius: 10,
                    }}
                    onPress={handleAccept}
                  >
                    <Text style={{ textAlign: "center", color: "#fff" }}>
                      {titleModal}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isConfirmationVisible}
      >
        <View style={AppStyle.StyleCheckIn.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                AppStyle.StyleCheckIn.modalView,
                { width: "80%", paddingBottom: 10 },
              ]}
            >
              <View
                style={{
                  backgroundColor: "white",
                  padding: 20,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  Thành công
                </Text>
                <Text style={{ textAlign: "center", marginVertical: 10 }}>
                  Bạn đã {titleModal.toLowerCase()} thành công
                </Text>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: Color.color3,
                    borderRadius: 10,
                  }}
                  onPress={handleCloseConfirmation}
                >
                  <Text style={{ textAlign: "center", color: "#fff" }}>
                    Trở về
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default DetailsReq;
