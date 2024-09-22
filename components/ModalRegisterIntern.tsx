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
  GetInternSchedule,
  RegisterInternSchedule,
} from "@/app/axios/api/InternAPI";
import { Picker } from "@react-native-picker/picker";
import Color from "@/constants/theme/Color";
import CustomDropdown from "./DropDown";

type DataModalResIntern = {
  visiable: boolean;
  defaultDate: Date;
  funcHide: Function;
  add: boolean;
  onChangeSchedule: Function;
};
const dataworkShift = [
  { label: "Ca sáng", value: "2c1e165e-8" },
  { label: "Ca chiều", value: "78546471-a" },
  { label: "Fulltime", value: "All" },
];
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
  const listOffice = useSelector((state: any) => state.userdata.branch);
  const [workShift, setWorkShift] = useState(dataworkShift[0].value);
  const [office, setOffice] = useState("");

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [date, setDate] = useState<Date>(defaultDate);

  useEffect(() => {
    dataBranches.length = 0;
    listOffice.forEach((item: any) => {
      dataBranches.push({ label: item.name, value: item.id });
    });
    setOffice(dataBranches[0].value);
  }, []);
  useEffect(() => {
    setDate(defaultDate);
  }, [defaultDate]);
  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };
  const SubmitRegisterIntern = async () => {
    setIsLoading(true);
    setIsError(false);
    let workshiftSend = [];
    if (workShift === "All") {
      workshiftSend.push("2c1e165e-8", "78546471-a");
    } else {
      workshiftSend.push(workShift);
    }
    try {
      let result;
      if (add) {
        result = await RegisterInternSchedule(date, workshiftSend);
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
      } else {
        console.log("ChangeInternSchedule" + date);
        // result = await ChangeInternSchedule(date, workshiftSend);
        let textWorkShift = "";
        if (
          workshiftSend.includes("2c1e165e-8") &&
          workshiftSend.includes("78546471-a")
        ) {
          textWorkShift = "08:30 - 17:30";
        } else if (workshiftSend.includes("2c1e165e-8")) {
          textWorkShift = "08:30 - 12:00";
        } else {
          textWorkShift = "01:30 - 17:30";
        }

        onChangeSchedule(
          `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()} ${textWorkShift}`
        );
        funcHide();
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
                      }}
                    />
                    {/* <View
                      style={{
                        width: "100%",
                        borderColor: Color.color4,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                    >
                      <Picker
                        selectedValue={office}
                        onValueChange={(itemValue, itemIndex) =>
                          setOffice(itemValue)
                        }
                      >
                        {listOffice.map((item: any, index: number) => (
                          <Picker.Item
                            key={index}
                            label={item.name}
                            value={item}
                          />
                        ))}
                      </Picker>
                    </View> */}
                  </View>
                </View>
                <View style={AppStyle.StyleTable.addItem}>
                  <Text style={AppStyle.StyleCommon.textBlack15}>
                    Ca làm việc
                  </Text>
                  <View style={AppStyle.StyleTable.addValue}>
                    <CustomDropdown
                      data={dataworkShift}
                      firstValue={workShift}
                      onChange={(value: React.SetStateAction<string>) => {
                        setWorkShift(value);
                      }}
                    />
                    {/* <View
                      style={{
                        width: "100%",
                        borderColor: Color.color4,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                    >
                      <Picker
                        selectedValue={workShift}
                        onValueChange={(itemValue, itemIndex) =>
                          setWorkShift(itemValue)
                        }
                      >
                        <Picker.Item label="Ca 1" value={listWorkShift[0]} />
                        <Picker.Item label="Ca 2" value={listWorkShift[1]} />
                        <Picker.Item label="All" value={listWorkShift[2]} />
                      </Picker>
                    </View> */}
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
                    {isLoading ? ( // Hiển thị ActivityIndicator nếu đang tải
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
