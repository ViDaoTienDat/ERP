import {
  approvedby,
  directManagement,
  groupWFH,
  typeWFH,
} from "@/app/axios/data";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataDate } from "./registerLOA";
import AppStyle from "@/constants/theme";
import TitleHeader from "@/components/TitleHeader";
import {
  ItemDropDown,
  ItemFile,
  ItemInfo,
  ItemInput,
} from "@/components/ItemRegister";
import { BoxDatePicker } from "@/components/CustomDatePicker";
import Follower from "@/components/Follower";
import { SafeAreaView } from "react-native-safe-area-context";

function registerWFH(): React.JSX.Element {
  const [name, setName] = useState("");
  const [type, setType] = useState(typeWFH[0].label);
  const [group, setGroup] = useState(groupWFH[0].label);
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [data, setData] = useState<DataDate[]>([]);
  const [management, setManegement] = useState(directManagement[0].label);
  const [approvedBy, setApproveBy] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={AppStyle.StyleCommon.container}>
        <TitleHeader title={"Đăng ký làm việc tại nhà"} />
        <ScrollView
          style={AppStyle.StyleRegister.boxcontent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={AppStyle.StyleRegister.title}>Tạo yêu cầu mới</Text>
          <View style={AppStyle.StyleRegister.boxContent}>
            <ItemInput
              label="Tên yêu cầu *"
              value={name}
              onChangeValue={(value: React.SetStateAction<string>) => {
                setName(value);
              }}
            />
            <ItemDropDown
              label={"Loại *"}
              data={typeWFH}
              firstValue={typeWFH[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setType(value);
              }}
            />
            <ItemDropDown
              label={"Nhóm *"}
              data={groupWFH}
              firstValue={groupWFH[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setGroup(value);
              }}
            />
            <ItemInput
              label="Lý do"
              value={reason}
              onChangeValue={(value: React.SetStateAction<string>) => {
                setReason(value);
              }}
            />
            <View style={AppStyle.StyleRegister.boxInfo}>
              <View style={AppStyle.StyleRegister.itemInfo}>
                <Text style={AppStyle.StyleRegister.textInfo}>
                  Số ngày làm việc tại nhà còn lại: 1
                </Text>
                <Text style={AppStyle.StyleRegister.textInfo}>
                  Số ngày làm việc tại nhà đề xuất: 0.5
                </Text>
              </View>
            </View>
            <ItemFile
              label="Tệp đính kèm"
              value={""}
              onChangeValue={(value: React.SetStateAction<string | null>) => {
                setFile(value);
              }}
            />

            <BoxDatePicker data={data} setData={setData} />
          </View>
          <View>
            <ItemInfo label={"Quản lý trực tiếp"} value={"Cù Xuân Hưng"} />
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

export default registerWFH;
