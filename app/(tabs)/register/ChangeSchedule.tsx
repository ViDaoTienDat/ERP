import {
  approvedby,
  directManagement,
  groupIntern,
  operation,
  typeIntern,
} from "@/app/axios/data";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { DataDate } from "./registerLOA";
import AppStyle from "@/constants/theme";
import {
  ItemButton,
  ItemDropDown,
  ItemFile,
  ItemInfo,
  ItemInput,
} from "@/components/ItemRegister";
import { ModalResIntern } from "@/components/ModalRegisterIntern";
import { BoxDatePicker } from "@/components/CustomDatePicker";
import Follower from "@/components/Follower";
import { caLamViec } from "@/assets/data/data_test";

function ChangeSchedule(): React.JSX.Element {
  const [visiable, setVisiable] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState(typeIntern[0].label);
  const [group, setGroup] = useState(groupIntern[0].label);
  const [time, setTime] = useState("");
  const [operationvalue, setoperation] = useState(operation[0].label);
  const [reason, setReason] = useState("");
  const [file, setFile] = useState<string | null>(null);
  const [data, setData] = useState<DataDate[]>([]);
  const [management, setManegement] = useState(directManagement[0].label);
  const [approvedBy, setApproveBy] = useState("");
  const [newShift, setNewShift] = useState("Nhấn để chọn ca làm việc mới");
  return (
    <View style={{ flex: 1 }}>
      <View style={AppStyle.StyleCommon.container}>
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
              data={typeIntern}
              firstValue={typeIntern[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setType(value);
              }}
            />
            <ItemDropDown
              label={"Nhóm *"}
              data={groupIntern}
              firstValue={groupIntern[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setGroup(value);
              }}
            />
            <ItemDropDown
              label={"Ca làm việc cần thay đổi *"}
              data={caLamViec}
              firstValue={caLamViec[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setTime(value);
              }}
            />
            <ItemDropDown
              label={"Thao tác *"}
              data={operation}
              firstValue={operation[0].value}
              onChange={(value: React.SetStateAction<string>) => {
                setoperation(value);
              }}
            />
            <ItemButton
              label={"Ca làm việc mới *"}
              value={newShift}
              func={() => {
                setVisiable(true);
              }}
            />
            <ModalResIntern
              visiable={visiable}
              funcHide={() => {
                setVisiable(false);
              }}
              defaultDate={new Date()}
              add={false}
              onChangeSchedule={(shift: string) => {
                setNewShift(shift);
              }}
            />
            <ItemInput
              label="Lý do *"
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

            {/* <BoxDatePicker data={data} setData={setData} /> */}
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
    </View>
  );
}

export default ChangeSchedule;
