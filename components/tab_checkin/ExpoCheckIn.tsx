import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../CustomHeader";
import AppStyle from "@/constants/theme";
import CardCheckIn from "../CardCheckIn";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import hasLocationPermission from "@/app/map/locationPermission";
import { getAllBranch } from "@/app/axios/api/branchApi";
import ExpoCheckInDetail from "./ExpoCheckInDetail";
import { useDispatch } from "react-redux";
import { setOfficeId } from "@/app/state/reducers/officeSlice";
import { useCameraPermissions } from "expo-camera";

import * as Location from "expo-location";
type ExpoCheckInType = {
  showDetailCheckIn: boolean;
  handlePressCheckIn: Function;
  updateNumTab: Function;
};
function ExpoCheckIn({
  showDetailCheckIn,
  handlePressCheckIn,
  updateNumTab,
}: ExpoCheckInType): React.JSX.Element {
  const [officeVisible, setOfficeVisible] = useState(false);
  const [office, setOffice] = useState("");

  const [location, seteLocation] = useState(false);
  const branchs = useSelector((state: any) => state.userdata.branch);

  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useDispatch();
  const handlePressOffice = () => {
    setOfficeVisible(true);
  };
  //Office
  const handleChooseOffice = (label: any, value: any) => {
    setOffice(label);
    setOfficeVisible(false);
    dispatch(setOfficeId(value)); // Cập nhật officeId vào Redux
    setOfficeVisible(false);
  };
  //Camera Permission
  const handlePermissionCamera = async () => {
    if (!permission?.granted) {
      requestPermission();
    }
  };
  //Location Permission
  const getPermissionLocation = async () => {
    try {
      // Kiểm tra nếu đã lưu quyền trong AsyncStorage
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status === "granted") {
        seteLocation(true); // Đã có quyền
        return;
      }
    } catch (error) {
      console.log("Error checking location permission:", error);
    }
  };
  const requestLocation = async () => {
    try {
      // Yêu cầu quyền vị trí nếu chưa lưu
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        seteLocation(true); // Được cấp quyền
      } else {
        seteLocation(false); // Không được cấp quyền
      }
    } catch (error) {
      console.log("Error checking location permission:", error);
    }
  };

  useEffect(() => {
    getPermissionLocation();
  }, []);

  return !showDetailCheckIn ? (
    <View>
      <View style={AppStyle.StyleCheckIn.container}>
        <Text style={AppStyle.StyleCheckIn.textNote}>
          Bạn vui lòng hoàn thành các bước sau để tiến hành chấm công!
        </Text>
        {/* <CardCheckIn
          key={0}
          img={require("../../assets/images/map.png")}
          name="Chọn văn phòng"
          state={office != "" ? true : false}
          stateStr={office != "" ? "Đã chọn" : "Chưa chọn"}
          func={handlePressOffice}
          note={office}
        /> */}
        <CardCheckIn
          key={1}
          img={require("../../assets/images/camera.png")}
          name="Truy cập camera"
          state={permission?.granted ? true : false}
          stateStr={permission?.granted ? "Đã cho phép" : "Chưa cho phép"}
          func={handlePermissionCamera}
          note={""}
        />
        <CardCheckIn
          key={2}
          img={require("../../assets/images/location.png")}
          name="Truy cập vị trí"
          state={location ? true : false}
          stateStr={location ? "Đã cho phép" : "Chưa cho phép"}
          func={requestLocation}
          note={""}
        />
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={officeVisible}
        onRequestClose={() => setOfficeVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOfficeVisible(false)}>
          <View style={AppStyle.StyleCheckIn.overlay}>
            <TouchableWithoutFeedback>
              <View style={AppStyle.StyleCheckIn.modalView}>
                <Text style={AppStyle.StyleCheckIn.textOfficeTitle}>
                  Chọn văn phòng
                </Text>
                {branchs.map((item: any, index: any) => (
                  <TouchableOpacity
                    key={index}
                    style={AppStyle.StyleCheckIn.boxButton}
                    onPress={() => {
                      handleChooseOffice(item.name, item.id);
                    }}
                  >
                    <Text style={AppStyle.StyleCheckIn.textButton}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {permission && location && (
        <TouchableOpacity
          style={AppStyle.StyleCheckIn.buttonCheckIn}
          onPress={() => handlePressCheckIn()}
        >
          <Text style={AppStyle.StyleCheckIn.textCheckIn}>Chấm Công</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <ExpoCheckInDetail updateNumTab={updateNumTab}></ExpoCheckInDetail>
  );
}
export default ExpoCheckIn;
