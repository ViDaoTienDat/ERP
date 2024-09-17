import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  ItemDropDown,
  ItemFile,
  ItemInfo,
  ItemInput,
} from "@/components/ItemRegister";
import TitleHeader from "@/components/TitleHeader";
import {
  groupDayOff,
  approvedby,
  typeDayOff,
  directManagement,
} from "../../axios/data";
import AppStyle from "@/constants/theme";
import Follower from "@/components/Follower";
import { BoxDatePicker } from "@/components/CustomDatePicker";
import { SafeAreaView } from "react-native-safe-area-context";
export type DataDate = {
  date: Date;
  checkedS: boolean;
  checkedC: boolean;
};
export default function registerLOA() {
  const [name, setName] = useState("");
  const [type, setType] = useState(typeDayOff[0].label);
  const [group, setGroup] = useState(groupDayOff[0].label);
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [data, setData] = useState<DataDate[]>([]);
  const [management, setManegement] = useState(directManagement[0].label);
  const [approvedBy, setApproveBy] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={AppStyle.StyleCommon.container}>
        <TitleHeader title={"Đăng ký nghỉ phép"} />
        <ScrollView
          style={AppStyle.StyleRegister.boxcontent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={AppStyle.StyleRegister.title}>Tạo yêu cầu mới</Text>
          <View style={AppStyle.StyleRegister.boxContent}>
            <ItemInput
              label="Tên yêu cầu *"
              value={name}
              onChangeValue={(text: React.SetStateAction<string>) => {
                setName(text);
              }}
            />
            <ItemDropDown
              label={"Loại *"}
              data={typeDayOff}
              firstValue={typeDayOff[0].value}
              onChange={(label: React.SetStateAction<string>) => {
                setType(label);
              }}
            />
            <ItemDropDown
              label={"Nhóm *"}
              data={groupDayOff}
              firstValue={groupDayOff[0].value}
              onChange={(label: React.SetStateAction<string>) => {
                setGroup(label);
              }}
            />
            <ItemInput
              label="Lý do *"
              value={reason}
              onChangeValue={(text: React.SetStateAction<string>) => {
                setReason(text);
              }}
            />
            <ItemFile
              label="Tệp đính kèm"
              value={""}
              onChangeValue={(value: React.SetStateAction<string | null>) => {
                setFile(value);
              }}
            />

            <View style={AppStyle.StyleRegister.boxInfo}>
              <View style={AppStyle.StyleRegister.itemInfo}>
                <Text style={AppStyle.StyleRegister.textInfo}>
                  Số phép năm còn lại: 5.5
                </Text>
                <Text style={AppStyle.StyleRegister.textInfo}>
                  Số phép bù còn lại: 0
                </Text>
              </View>
              <View style={AppStyle.StyleRegister.itemInfo}>
                <Text style={AppStyle.StyleRegister.textInfo}>
                  Số phép năm đề xuất: 1
                </Text>
                <Text style={AppStyle.StyleRegister.textInfo}>
                  Số phép bù đề xuất: 0
                </Text>
              </View>
            </View>
            <BoxDatePicker data={data} setData={setData} />
          </View>
          <View>
            <ItemInfo
              label={"Quản lý trực tiếp"}
              value={directManagement[0].label}
            />
            <ItemDropDown
              label={"Người duyệt"}
              data={approvedby}
              firstValue={"0"}
              onChange={(value: React.SetStateAction<string>) => {
                setApproveBy(value);
              }}
            />
            <Follower />
          </View>
          <TouchableOpacity
            style={[
              AppStyle.StyleCheckIn.buttonCheckIn,
              AppStyle.StyleRegister.mV,
            ]}
          >
            <Text style={AppStyle.StyleCheckIn.textCheckIn}>Tạo yêu cầu</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
