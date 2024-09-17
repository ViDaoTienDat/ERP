import {
  approvedby,
  directManagement,
  groupForgot,
  listOffice,
  typeForgot,
} from "@/app/axios/data";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataDate } from "./registerLOA";
import AppStyle from "@/constants/theme";
import TitleHeader from "@/components/TitleHeader";
import {
  ItemDateTime,
  ItemDropDown,
  ItemFile,
  ItemInfo,
  ItemInput,
} from "@/components/ItemRegister";
import Follower from "@/components/Follower";
import { SafeAreaView } from "react-native-safe-area-context";

function registerForgot(): React.JSX.Element {
  const [name, setName] = useState("");
  const [type, setType] = useState(typeForgot[0].label);
  const [group, setGroup] = useState(groupForgot[0].label);
  const [additional, setAdditional] = useState(new Date());
  const [location, setLocation] = useState(listOffice[0].value);
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [data, setData] = useState<DataDate[]>([]);
  const [management, setManegement] = useState(directManagement[0].label);
  const [approvedBy, setApproveBy] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={AppStyle.StyleCommon.container}>
        <TitleHeader title={"Quên chấm công"} />
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
              data={typeForgot}
              firstValue={typeForgot[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setType(value);
              }}
            />
            <ItemDropDown
              label={"Nhóm *"}
              data={groupForgot}
              firstValue={groupForgot[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setGroup(value);
              }}
            />
            <ItemDateTime
              label={"Thời gian chấm công bổ sung *"}
              value={additional}
              onChangeValue={(value: React.SetStateAction<Date>) => {
                setAdditional(value);
              }}
            />
            <ItemDropDown
              label={"Địa điểm chấm công *"}
              data={listOffice}
              firstValue={listOffice[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setLocation(value);
              }}
            />
            <ItemInput
              label="Lý do"
              value={reason}
              onChangeValue={(value: React.SetStateAction<string>) => {
                setReason(value);
              }}
            />
            <ItemFile
              label="Tệp đính kèm"
              value={""}
              onChangeValue={(value: React.SetStateAction<string | null>) => {
                setFile(value);
              }}
            />
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

export default registerForgot;
