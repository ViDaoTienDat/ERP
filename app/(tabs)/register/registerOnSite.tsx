import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import TitleHeader from "@/components/TitleHeader";
import AppStyle from "@/constants/theme";
import { ItemDropDown, ItemInfo, ItemInput } from "@/components/ItemRegister";
import { BoxDatePicker } from "@/components/CustomDatePicker";
import Follower from "@/components/Follower";
import {
  approvedby,
  directManagement,
  groupOnsite,
  typeOnsite,
} from "@/app/axios/data";
import { DataDate } from "./registerLOA";
import { SafeAreaView } from "react-native-safe-area-context";

export default function registerOnSite() {
  const [name, setName] = useState("");
  const [type, setType] = useState(typeOnsite[0].label);
  const [group, setGroup] = useState(groupOnsite[0].label);
  const [projectOnsite, setprojectOnsite] = useState("");
  const [locationOnsite, setLocationOnsite] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [data, setData] = useState<DataDate[]>([]);
  const [management, setManegement] = useState(directManagement[0].label);
  const [approvedBy, setApproveBy] = useState("");
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={AppStyle.StyleCommon.container}>
        <TitleHeader title={"Đăng ký onsite"} />
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
              data={typeOnsite}
              firstValue={typeOnsite[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setType(value);
              }}
            />
            <ItemDropDown
              label={"Nhóm *"}
              data={groupOnsite}
              firstValue={groupOnsite[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setGroup(value);
              }}
            />
            <ItemInput
              label="Dự án onsite *"
              value={projectOnsite}
              onChangeValue={(value: React.SetStateAction<string>) => {
                setprojectOnsite(value);
              }}
            />
            <ItemInput
              label="Địa điểm onsite *"
              value={locationOnsite}
              onChangeValue={(value: React.SetStateAction<string>) => {
                setLocationOnsite(value);
              }}
            />
            <ItemInput
              label="Lý do"
              value={reason}
              onChangeValue={(value: React.SetStateAction<string>) => {
                setReason(value);
              }}
            />
            {/* <ItemFile label='Tệp đính kèm' value={''} onChangeValue={(value: React.SetStateAction<string | null>)=> {setFile(value)}}/> */}

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
