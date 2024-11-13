import {
  ActivityIndicator,
  Image,
  Modal,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import AppStyle from "@/constants/theme";
import { setDataIntern } from "@/app/state/reducers/dataSlice";
import {
  ChangeInternSchedule,
  DeleteInternSchedule,
  GetInternSchedule,
  getWorkShiftToCheckInByBranch,
  RegisterInternSchedule,
} from "@/app/axios/api/InternAPI";
import { Picker } from "@react-native-picker/picker";
import Color from "@/constants/theme/Color";
import CustomDropdown from "./DropDown";
import { splitWorkShift } from "@/app/axios/func/loadDataUser";

type DataModalResIntern = {
  visiable: boolean;
  defaultDate: Date;
  funcHide: Function;
  add: boolean;
  onChangeSchedule: Function;
};
const dataBranches: any = [];
export function ModalResIntern({
  visiable,
  funcHide,
  defaultDate,
  add,
  onChangeSchedule,
}: DataModalResIntern): React.JSX.Element {
  const Hide = () => {
    if (!isLoading) {
      funcHide();
    }
    setIsError(false);
  };

  const dispatch = useDispatch();
  const listWorkShift = useSelector((state: any) => state.userdata.workshift);

  const [listWorkShiftByBranch, setListWorkShiftByBranch] = useState<any>([]);
  const [loadingWorkShifts, setLoadingWorkShifts] = useState<boolean>(false);
  const dataworkShiftforChange = [
    ...listWorkShiftByBranch,
    { label: "Hủy ca", value: "Cancel" },
  ];
  const listOffice = useSelector((state: any) => state.userdata.branch);

  const [workShift, setWorkShift] = useState("");
  const [office, setOffice] = useState(listOffice ? listOffice[0].id : "");

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [date, setDate] = useState<Date>(defaultDate);

  useEffect(() => {
    dataBranches.length = 0;
    listOffice.forEach((item: any) => {
      dataBranches.push({ label: item.name, value: item.id });
    });
    GetWorkShiftToRegister();
  }, []);
  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  useEffect(() => {
    if (
      Array.isArray(listWorkShiftByBranch) &&
      listWorkShiftByBranch.length > 0
    ) {
      setWorkShift(listWorkShiftByBranch[0].value);
    }
  }, [listWorkShiftByBranch]);
  const GetWorkShiftToRegister = async () => {
    setLoadingWorkShifts(true);
    try {
      getWorkShiftToCheckInByBranch(office, date).then(async (result) => {
        if (result.code === 200 && result.data) {
          const workshift = await splitWorkShift(result.data);
          setListWorkShiftByBranch(workshift);
          setLoadingWorkShifts(false);
        } else {
          setLoadingWorkShifts(false);
        }
      });
    } catch (error) {
      console.error("Error during GetWorkShiftToRegister:", error);
    }
  };
  const SubmitRegisterIntern = async () => {
    setIsLoading(true);
    setIsError(false);
    let workshiftSend = [];
    workshiftSend.push(workShift);
    try {
      let result;
      if (add) {
        result = await RegisterInternSchedule(date, workshiftSend, office);
      } else {
        if (workshiftSend.includes("Cancel")) {
          result = await DeleteInternSchedule(date);
          GetWorkShiftToRegister();
        } else {
          result = await ChangeInternSchedule(date, workshiftSend, office);
          console.log("Change InternSchedule result:");
        }
      }
      if (result.code === 200) {
        funcHide();

        const item = await GetInternSchedule();
        if (item.code === 200) {
          dispatch(setDataIntern(item.data));
        } else {
          console.log(item);
        }
      } else {
        setIsError(true);
        console.log(result);
      }
    } catch (error) {
      setIsError(true);
      console.error("Error during submission:", error);
    }
    setIsLoading(false);
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
            <View style={[AppStyle.StyleCheckIn.modalView]}>
              <View style={AppStyle.StyleRegister.boxChooseFoll}>
                <View style={AppStyle.StyleTable.addItem}>
                  <Text style={AppStyle.StyleCommon.textBlack15}>Ngày</Text>
                  <TouchableOpacity
                    style={[
                      AppStyle.StyleTable.addValue,
                      AppStyle.StyleTable.addButton,
                      AppStyle.StyleTable.inputdate,
                    ]}
                    onPress={() => {
                      setShow(true);
                    }}
                  >
                    <Text style={AppStyle.StyleTable.addTextValue}>
                      {date.getDate()}/{date.getMonth() + 1}/
                      {date.getFullYear()}
                    </Text>
                    <Image
                      style={{
                        width: 16,
                        height: 16,
                        tintColor: Color.color13,
                      }}
                      source={require("../assets/images/timeoff.png")}
                    />
                  </TouchableOpacity>
                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      value={date}
                      mode="date"
                      is24Hour={true}
                      display="default"
                      onChange={onChange}
                    />
                  )}
                </View>
                {/*
                            <View style={AppStyle.StyleTable.addItem}>
                                <Text style={AppStyle.StyleCommon.textBlack15}>Văn phòng</Text>
                                <View style={AppStyle.StyleTable.addValue}>
                                    <CustomDropdown data={listOffice} firstValue={'0'} onChange={undefined} />
                                </View>
                            </View>*/}
                <View style={AppStyle.StyleTable.addItem}>
                  <Text style={AppStyle.StyleCommon.textBlack15}>
                    Văn phòng
                  </Text>
                  <View style={AppStyle.StyleTable.addValue}>
                    <CustomDropdown
                      data={dataBranches}
                      firstValue={office}
                      onChange={(value: React.SetStateAction<string>) => {
                        setOffice(value);
                        GetWorkShiftToRegister();
                      }}
                    />
                  </View>
                </View>
                <View style={AppStyle.StyleTable.addItem}>
                  <Text style={AppStyle.StyleCommon.textBlack15}>
                    Ca làm việc
                  </Text>
                  <View style={AppStyle.StyleTable.addValue}>
                    {loadingWorkShifts ? (
                      <ActivityIndicator
                        size="small"
                        color={Color.color_header_red}
                      />
                    ) : listWorkShiftByBranch &&
                      listWorkShiftByBranch.length > 0 ? (
                      <CustomDropdown
                        data={
                          add ? listWorkShiftByBranch : dataworkShiftforChange
                        }
                        firstValue={workShift}
                        onChange={(value: React.SetStateAction<string>) => {
                          setWorkShift(value);
                        }}
                      />
                    ) : (
                      <Text>Không có ca làm việc</Text>
                    )}
                  </View>
                </View>
                {isError && (
                  <View
                    style={{
                      alignSelf: "center",
                      padding: 10,
                    }}
                  >
                    <Text style={{ color: Color.color3 }}>
                      Đăng ký lịch thực tập thất bại, hãy thử lại !!!
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    AppStyle.StyleCommon.flexRowCenter,
                    AppStyle.StyleTable.addBoxButton,
                  ]}
                >
                  <TouchableOpacity
                    style={[AppStyle.StyleCommon.alignCenter]}
                    onPress={Hide}
                  >
                    <Text
                      style={[
                        AppStyle.StyleCommon.textBlack15,
                        AppStyle.StyleLogin.spaceButton,
                      ]}
                    >
                      Hủy bỏ
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      AppStyle.StyleLogin.button,
                      AppStyle.StyleCommon.alignCenter,
                    ]}
                    onPress={SubmitRegisterIntern}
                  >
                    {isLoading ? (
                      <ActivityIndicator
                        style={[AppStyle.StyleLogin.spaceButton]}
                        size="small"
                        color="#fff"
                      />
                    ) : (
                      <Text
                        style={[
                          AppStyle.StyleCommon.textWhite15,
                          AppStyle.StyleLogin.spaceButton,
                        ]}
                      >
                        Xác nhận
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
