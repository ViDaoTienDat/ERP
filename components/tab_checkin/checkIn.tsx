import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import React, { useState } from "react";
import CustomHeader from "../CustomHeader";
import AppStyle from "@/constants/theme";
import CardCheckIn from "../CardCheckIn";
import { useSelector } from "react-redux";
import { useCameraPermission } from 'react-native-vision-camera';
import hasLocationPermission from "@/app/map/locationPermission";
import { getAllBranch } from "@/app/axios/api/branchApi";
import CheckInDetail from "./checkInDetail";
import { useDispatch } from 'react-redux';
import { setOfficeId } from '@/app/state/reducers/officeSlice'; 
export default function CheckIn() {
  const [officeVisible, setOfficeVisible] = useState(false);
  const [checkInVisible, setCheckInVisible] = useState(false);
  const [office, setOffice] = useState("");
  const [officeValue, setOfficeValue] = useState("");
  const [location, seteLocation] = useState(false);
  const branchs = useSelector((state: any) => state.userdata.branch);
  const {hasPermission, requestPermission} = useCameraPermission();
  const dispatch = useDispatch();
  const handlePressOffice = () => {
    setOfficeVisible(true);
  };
  //Office
  const handleChooseOffice = (label: any, value: any) => {
    setOffice(label);
    setOfficeValue(value);
    setOfficeVisible(false);

    dispatch(setOfficeId(value));  // Cập nhật officeId vào Redux
    setOfficeVisible(false);
  };
  //Camera Permission

  const handlePermissionCamera = async() => {
    if (!hasPermission) {
      requestPermission();
    }
  };
  //Location Permission
  const getPermissionLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      seteLocation(false);
    } else {
      seteLocation(true);
    }
  };
  const handlePressCheckIn = () => {
    setCheckInVisible(true);
  };
  
  return !checkInVisible ? (
    <View>
      <View style={AppStyle.StyleCheckIn.container}>
        <Text style={AppStyle.StyleCheckIn.textNote}>
          Bạn vui lòng hoàn thành các bước sau để tiến hành chấm công!
        </Text>
        <CardCheckIn
          key={0}
          img={require("../../assets/images/map.png")}
          name="Chọn văn phòng"
          state={office != "" ? true : false}
          stateStr={office != "" ? "Đã chọn" : "Chưa chọn"}
          func={handlePressOffice}
          note={office}
        />
        <CardCheckIn
          key={1}
          img={require("../../assets/images/camera.png")}
          name="Truy cập camera"
          state={hasPermission ? true : false}
          stateStr={hasPermission ? "Đã cho phép" : "Chưa cho phép"}
          func={handlePermissionCamera}
          note={""}
        />
        <CardCheckIn
          key={2}
          img={require("../../assets/images/location.png")}
          name="Truy cập vị trí"
          state={location ? true : false}
          stateStr={location ? "Đã cho phép" : "Chưa cho phép"}
          func={getPermissionLocation}
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
  
      {office != "" && hasPermission && location && (
        <TouchableOpacity
          style={AppStyle.StyleCheckIn.buttonCheckIn}
          onPress={handlePressCheckIn}
        >
          <Text style={AppStyle.StyleCheckIn.textCheckIn}>Chấm Công</Text>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <CheckInDetail></CheckInDetail>
  );  
}
