import {
  checkInAPI,
  getCheckInById,
  getHisCheckIn,
} from "@/app/axios/api/checkInApi";
import {
  getCurrentTime,
  getFormatDateTimeCheckIn,
  getFormattedDate,
} from "@/app/axios/func/getDateTime";
import { setDateHisCheckIn } from "@/app/state/reducers/dataSlice";
import CustomCamera from "@/components/CustomCamera";
import { CustomCheckBox } from "@/components/CustomCheckBox";
import CustomDropdown from "@/components/DropDown";
import CustomHeader from "@/components/CustomHeader";
import CustomMessage from "@/components/CustomMessage";
import AppStyle from "@/constants/theme";
import Color from "@/constants/theme/Color";
import { useFocusEffect } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";

import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import CustomMap from "../CustomMap";
import { handleSplitHisCheckIn } from "@/app/axios/func/createCalendar";
import ExpoCustomMap from "../ExpoCustomMap";
import ExpoCustomCamera from "../ExpoCustomCamera";
import { getWorkShiftByBranch } from "@/app/axios/api/workShirtApi";
import convertDateFormat from "@/utils/helper";
import { splitWorkShift } from "@/app/axios/func/loadDataUser";

type CustomCameraRef = {
  takePhoto: () => any | null;
};

const dataBranches: any = [];
type ExpoCheckInDetailType = {
  updateNumTab: Function;
};
function ExpoCheckInDetail({
  updateNumTab,
}: ExpoCheckInDetailType): React.JSX.Element {
  const cameraRef = useRef<CustomCameraRef>(null);
  const dispatch = useDispatch();

  const [workShift, setWorkShift] = useState<any[]>([]);
  const workShiftCheckIn = useSelector(
    (state: any) => state.userdata.workShiftCheckIn
  );
  const branchs = useSelector((state: any) => state.userdata.branch);
  const branchCheckIn = useSelector(
    (state: any) => state.userdata.branchCheckIn
  );
  const location = useSelector((state: any) => state.location.coordinates);

  const [successTime, setSuccessTime] = useState(``);
  const [currentDate, setCurrentDate] = useState(``);
  const [currentTime, setCurrentTime] = useState(``);

  const [wsSelected, setWSSelected] = useState<string>(
    workShiftCheckIn
      ? workShiftCheckIn
      : ""
  );

  const [note, setNote] = useState("");
  const [position, setPosition] = useState([0, 0]);

  const [hasSuccess, sethasSuccess] = useState(false);
  const [hasFailure, sethasFailure] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  const [dateTimeDetail, setDateTimeDetail] = useState("");
  const [branchNameDetail, setBranchNameDetail] = useState("");
  const [workShiftNameDetail, setWorkShiftNameDetail] = useState("");
  const [imageDetail, setImageDetail] = useState("");

  const [loadingWorkShifts, setLoadingWorkShifts] = useState<boolean>(false);

  const [hasInvalidLocation, setHasInvalidLocation] = useState(false);

  const [officeIdDropdown, setOfficeIdDropdown] = useState(
    branchCheckIn ? branchCheckIn : branchs[0].id
  );

  useEffect(() => {
    if (Array.isArray(workShift) && workShift.length > 0) {
      setWSSelected(workShift[0].value);
    }
  }, [workShift]);

  useEffect(() => {
    dataBranches.length = 0;
    branchs.forEach((item: any) => {
      dataBranches.push({
        label: item.name,
        value: item.id,
      });
    });
  }, []);
  const [locationBusiness, setLocationBusiness] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const office = branchs.find(
      (office: { id: any }) => office.id === officeIdDropdown
    );
    if (office) {
      setLocationBusiness({
        lat: office.latitude,
        lng: office.longitude,
      });
    } else {
      setLocationBusiness({ lat: 0, lng: 0 });
    }
    setOfficeIdDropdown(officeIdDropdown);
  }, [officeIdDropdown]);

  const loadDataWorkShift = async (id: string) => {
    setLoadingWorkShifts(true);
    try {
      const result = await getWorkShiftByBranch(
        id,
        convertDateFormat(currentDate)
      );
      if (result.data) {
        const dataWorkShift = splitWorkShift(result.data);
        setWorkShift(dataWorkShift);
      } else {
        setWorkShift([]);
      }

      setLoadingWorkShifts(false);
    } catch (error) {
      console.log("🚀 ~ loadDataWorkShift ~ error:", error);
    }
  };

  useEffect(() => {
    const formattedDate = getFormattedDate();
    setCurrentDate(formattedDate);
    setLoadingWorkShifts(true);
    getWorkShiftByBranch(
      officeIdDropdown,
      convertDateFormat(formattedDate)
    ).then((result) => {
      if (result.data) {
        const dataWorkShift = splitWorkShift(result.data);
        setWorkShift(dataWorkShift);
      } else {
        setWorkShift([]);
      }
      setLoadingWorkShifts(false);
    });

    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  const handlePressCheckIn = async () => {
    setIsLoading(true);
    const startTime = new Date().getTime();
    try {
      if (cameraRef.current) {
        const dataPhoto = await cameraRef.current.takePhoto();
        setIsCameraVisible(false);
        const type = dataPhoto ? await dataPhoto.uri.split(".").pop() : null;
        const image = "data:image/" + type + ";base64," + dataPhoto.base64;
        const time = getFormatDateTimeCheckIn();
        setSuccessTime(time);

        await checkInAPI(
          time,
          image,
          officeIdDropdown,
          wsSelected,
          note,
          location.lat,
          location.lng
        ).then((result) => {
          if (result.code === 201) {
            sethasSuccess(true);
            setMessage("");
            setIsLoading(false);
            getCheckInById(result.data.id).then(async (result) => {
              if (result.code === 200) {
                setDateTimeDetail(result.data.date_time);
                setBranchNameDetail(result.data.branch_name);
                setWorkShiftNameDetail(result.data.work_shift_name);
                setImageDetail(result.data.image);
              }
            });
            getHisCheckIn().then(async (result) => {
              if (result.code === 200) {
                const datehis = await handleSplitHisCheckIn(result.data);
                dispatch(setDateHisCheckIn(datehis));
                setIsLoading(false);
              }
            });
            setIsCameraVisible(true);
          } else if (result.code === 500) {
            setIsLoading(false);
            setMessage(result.message);
            sethasFailure(true);
            setIsCameraVisible(true);
          } else {
            setIsLoading(false);
            setMessage(result.message);
            sethasFailure(true);
            setIsCameraVisible(true);
          }
        });
        const endTime = new Date().getTime();
        const duration = endTime - startTime;

        console.log(`🚀 API call took: ${duration} ms`);
      }
    } catch (error) {
      console.error("Error in handlePressCheckIn:", error);
    }
  };

  const SuccessCheckIn = () => {
    sethasSuccess(false);
    router.navigate("/(tabs)/home/homeTab");
  };
  const SeeHistoryCheckIn = () => {
    sethasSuccess(false);
    updateNumTab();
  };
  const FailureLocation = () => {
    sethasFailure(false);
    router.navigate("/(tabs)/home/homeTab");
  };

  const FailureCheckIn = () => {
    sethasFailure(false);
  };
  const branchLabel = dataBranches.find(
    (branch: any) => branch.value === branchCheckIn
  )?.label;
  const workShiftLabel =
    workShift &&
    workShift.find((item: any) => item.value === workShiftCheckIn)?.label;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <SafeAreaView style={[AppStyle.StyleCommon.container]}>
        <ScrollView
          style={AppStyle.StyleCheckIn.boxContent}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={AppStyle.StyleCheckIn.textCamera}>
            Chụp ảnh gương mặt
          </Text>
          <View style={AppStyle.StyleCheckIn.boxCamera}>
            <ExpoCustomCamera
              isCameraVisible={isCameraVisible}
              ref={cameraRef}
            />
          </View>
          <Text style={AppStyle.StyleCheckIn.textCamera}>Vị trí của tôi</Text>
          <View style={AppStyle.StyleCheckIn.boxMap}>
            <ExpoCustomMap
              showCir={checkbox}
              location_business={{
                lat: locationBusiness ? locationBusiness.lat : 0,
                lng: locationBusiness ? locationBusiness.lng : 0,
              }}
              onInvalidLocation={(isInvalid: boolean) => {
                setHasInvalidLocation(isInvalid);
              }}
            />
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <CustomCheckBox
              checked={checkbox}
              func={() => {
                setCheckbox(!checkbox);
              }}
            />
            <Text style={[AppStyle.StyleCheckIn.textNote, { paddingLeft: 5 }]}>
              Hiển thị bán kính và vị trí văn phòng
            </Text>
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Thời gian</Text>
            <Text style={AppStyle.StyleCheckIn.ItemValue}>
              {currentTime} {currentDate}
            </Text>
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Văn phòng</Text>
            {branchCheckIn.length > 0 ? (
              <View style={AppStyle.StyleCheckIn.ItemInfo}>
                <Text style={AppStyle.StyleCheckIn.ItemValue}>
                  {branchLabel}
                </Text>
              </View>
            ) : (
              <View style={AppStyle.StyleCheckIn.boxDropdown}>
                {dataBranches.length > 0 ? (
                  <CustomDropdown
                    data={dataBranches}
                    firstValue={officeIdDropdown}
                    onChange={(value: any) => {
                      setOfficeIdDropdown(value);
                      loadDataWorkShift(value);
                    }}
                  />
                ) : (
                  <Text>Không có chi nhánh làm việc</Text>
                )}
              </View>
            )}
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Ca làm việc</Text>
            {workShiftCheckIn.length > 0 ? (
              <View style={AppStyle.StyleCheckIn.ItemInfo}>
                <Text style={AppStyle.StyleCheckIn.ItemValue}>
                  {workShiftLabel}
                </Text>
              </View>
            ) : (
              <View style={AppStyle.StyleCheckIn.boxDropdown}>
                {loadingWorkShifts ? (
                  <ActivityIndicator
                    size="small"
                    color={Color.color_header_red}
                  />
                ) : workShift && workShift.length > 0 ? (
                  <CustomDropdown
                    data={workShift}
                    firstValue={wsSelected}
                    onChange={(value: string) => {
                      setWSSelected(value);
                    }}
                  />
                ) : (
                  <Text>Không có ca làm việc</Text>
                )}
              </View>
            )}
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Ghi chú</Text>
            <TextInput
              style={AppStyle.StyleCheckIn.ItemInput}
              value={note}
              placeholder="Ghi chú"
              placeholderTextColor={Color.color4}
              onChangeText={(text) => {
                setNote(text);
              }}
            />
          </View>
          <TouchableOpacity
            style={AppStyle.StyleCheckIn.buttonCheckIn}
            onPress={handlePressCheckIn}
          >
            <Text style={AppStyle.StyleCheckIn.textCheckIn}>Chấm Công</Text>
          </TouchableOpacity>
        </ScrollView>
        <CustomMessage
          hasVisible={hasSuccess}
          title={"Chấm công thành công"}
          content={"Dữ liệu của bạn đã được ghi nhận vào " + successTime}
          func={[SeeHistoryCheckIn, SuccessCheckIn]}
          textFunc={["Xem lịch sử", "Màn hình chính"]}
        />
        <CustomMessage
          hasVisible={hasFailure}
          title={"Chấm công thất bại"}
          content={message}
          func={[FailureCheckIn]}
          textFunc={["Quay lại"]}
        />
        <CustomMessage
          hasVisible={hasInvalidLocation}
          title={"Vị trí bị can thiệp"}
          content={
            "Bạn đang sử dụng phần mềm can thiệp vị trí. Vui lòng tắt nó đi để tiếp tục chấm công."
          }
          func={[FailureLocation]}
          textFunc={["Màn hình chính"]}
        />
        <Modal transparent={true} animationType="slide" visible={isLoading}>
          <View style={AppStyle.StyleCheckIn.overlay}>
            <View style={styles.modalView}>
              <Text style={styles.textTitle}>Đang chấm công</Text>
              <Text style={styles.textContent}>
                Vui lòng đợi trong giây lát...
              </Text>
              <ActivityIndicator size={"small"} color={Color.color3} />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  modalView: {
    width: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
  },
  textTitle: {
    color: Color.color2,
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  textContent: {
    color: Color.color2,
    fontWeight: "400",
    fontSize: 15,
    alignSelf: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
  },
  boxButton: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: Color.color1,
  },
  textButton: {
    color: Color.color3,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    paddingTop: 10,
  },
});
export default ExpoCheckInDetail;
