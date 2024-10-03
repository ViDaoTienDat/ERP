import { checkInAPI, getHisCheckIn } from "@/app/axios/api/checkInApi";
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
//import * as Sharing from "expo-sharing";
// import RNFS from "react-native-fs";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
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
// import { getLocation } from "@/app/axios/func/getLocation";
import { handleSplitHisCheckIn } from "@/app/axios/func/createCalendar";
import ExpoCustomMap from "../ExpoCustomMap";
import ExpoCustomCamera from "../ExpoCustomCamera";
import { CameraType, CameraView } from "expo-camera";

type CustomCameraRef = {
  takePhoto: () => any | null;
};

function ExpoCheckInDetail({ route, navigation }: any): React.JSX.Element {
  const cameraRef = useRef<CustomCameraRef>(null);
  const officeId = useSelector((state: any) => state.office.officeId);
  const dispatch = useDispatch();

  const workShift = useSelector((state: any) => state.userdata.workshift);
  const branchs = useSelector((state: any) => state.userdata.branch);
  const office = branchs.find((office: { id: any }) => office.id === officeId);
  const location = useSelector((state: any) => state.location.coordinates);

  const [successTime, setSuccessTime] = useState(``);
  const [currentDate, setCurrentDate] = useState(``);
  const [currentTime, setCurrentTime] = useState(``);
  const [wsSelected, setWSSelected] = useState<string>(workShift[0].value);

  const [note, setNote] = useState("");
  const [position, setPosition] = useState([0, 0]);

  const [hasSuccess, sethasSuccess] = useState(false);
  const [hasFailure, sethasFailure] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [isCameraVisible, setIsCameraVisible] = useState(true);

  useEffect(() => {
    const formattedDate = getFormattedDate();
    setCurrentDate(formattedDate);

    const interval = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000);
    // Cleanup interval on component unmount
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
        // try {
        //   if (dataPhoto && dataPhoto.base64) {
        //     const fileUri = `${FileSystem.documentDirectory}photoBase64.txt`; // Đường dẫn file
        //     await FileSystem.writeAsStringAsync(fileUri, dataPhoto.base64, {
        //       encoding: FileSystem.EncodingType.UTF8,
        //     });
        //     console.log(`🚀 Dữ liệu base64 đã được ghi vào file: ${fileUri}`);

        //     const fileExists = await FileSystem.getInfoAsync(fileUri);
        //     if (fileExists.exists) {
        //       console.log(`🚀 chia se file`);
        //       await Sharing.shareAsync(fileUri);
        //     } else {
        //       console.log("File không tồn tại");
        //     }
        //   } else {
        //     console.log("Không có dữ liệu base64 để ghi vào file");
        //   }
        // } catch (error) {
        //   console.log("Lỗi khi ghi file:", error);
        // }
        const time = getFormatDateTimeCheckIn();
        setSuccessTime(time);

        await checkInAPI(
          time,
          image,
          officeId,
          wsSelected,
          note,
          location.lat,
          location.lng
        ).then((result) => {
          if (result.code === 201) {
            sethasSuccess(true);
            setMessage("");
            setIsLoading(false);
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
    router.back();
  };

  const FailureCheckIn = () => {
    sethasFailure(false);
  };

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
            {/* <CustomCamera ref={cameraRef} /> */}
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
                lat: office.latitude,
                lng: office.longitude,
              }}
            />
            {/* <CustomMap showCir={checkbox} location_business={{ lat: office.latitude, lng: office.longitude }}  /> */}
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
            <View style={AppStyle.StyleCheckIn.ItemInfo}>
              <Text style={AppStyle.StyleCheckIn.ItemValue}>{office.name}</Text>
            </View>
          </View>
          <View style={AppStyle.StyleCheckIn.boxItem}>
            <Text style={AppStyle.StyleCheckIn.ItemLabel}>Ca làm việc</Text>
            <View style={AppStyle.StyleCheckIn.boxDropdown}>
              <CustomDropdown
                data={workShift}
                firstValue={workShift[0].value}
                onChange={(value: any) => {
                  console.log("🚀 ~ ExpoCheckInDetail ~ value:", value);
                  setWSSelected(value);
                }}
              />
            </View>
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
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={AppStyle.StyleCheckIn.textCheckIn}>Chấm Công</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
        <CustomMessage
          hasVisible={hasSuccess}
          title={"Chấm công thành công"}
          content={"Dữ liệu của bạn đã được ghi nhận vào " + successTime}
          func={SuccessCheckIn}
          textFunc={"OK"}
        />
        <CustomMessage
          hasVisible={hasFailure}
          title={"Chấm công thất bại"}
          content={"Vui lòng thực hiện chấm công lại"}
          func={FailureCheckIn}
          textFunc={"Quay lại"}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default ExpoCheckInDetail;
