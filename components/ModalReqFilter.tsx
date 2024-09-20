import {
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppStyle from "../constants/theme";
import React, { useState } from "react";
import { ItemDate, ItemDropDown, ItemInput } from "./ItemRegister";
import Color from "../constants/theme/Color";
type DataModalResIntern = {
  visiable: boolean;
  funcHide: Function;
};

const data = [
  { label: "Làm việc tại nhà", value: "0" },
  { label: "Nghỉ phép", value: "1" },
  { label: "Onsite", value: "2" },
];
export function ModalReqFilter({
  visiable,
  funcHide,
}: DataModalResIntern): React.JSX.Element {
  const Hide = () => {
    funcHide();
  };
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visiable}
      onRequestClose={Hide}
    >
      <TouchableWithoutFeedback onPress={Hide}>
        <View style={AppStyle.StyleCheckIn.overlay}>
          <TouchableWithoutFeedback>
            <View style={[AppStyle.StyleReq.modalView]}>
              <View style={AppStyle.StyleReq.filterItem}>
                <ItemDropDown
                  label={"Loại"}
                  data={data}
                  firstValue={"0"}
                  onChange={() => {}}
                />
                <ItemDropDown
                  label={"Trạng thái"}
                  data={data}
                  firstValue={"0"}
                  onChange={() => {}}
                />
                <ItemInput
                  label={"Người tạo"}
                  value=""
                  onChangeValue={() => {}}
                />
                <ItemDate
                  label={"Ngày bắt đầu"}
                  value=""
                  onChangeValue={() => {}}
                />
                <ItemDate
                  label={"Ngày kết thúc"}
                  value=""
                  onChangeValue={() => {}}
                />
              </View>
              <View
                style={[
                  AppStyle.StyleReq.filterItem,
                  AppStyle.StyleReq.filterBoxButton,
                ]}
              >
                <TouchableOpacity
                  style={[
                    AppStyle.StyleReq.filterButton,
                    { backgroundColor: Color.color_blue },
                  ]}
                  onPress={Hide}
                >
                  <Text
                    style={[AppStyle.StyleReq.filterText, { color: "#fff" }]}
                  >
                    Đồng ý
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    AppStyle.StyleReq.filterButton,
                    { backgroundColor: Color.color1 },
                  ]}
                  onPress={Hide}
                >
                  <Text
                    style={[
                      AppStyle.StyleReq.filterText,
                      { color: Color.color_blue },
                    ]}
                  >
                    Hủy bỏ
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
