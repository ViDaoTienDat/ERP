import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TitleHeader from "@/components/TitleHeader";
import RowContentCheckIn from "@/components/RowContentCheckIn";
import AppStyle from "@/constants/theme";
import { useSelector } from "react-redux";
import MapView from "@/components/MapView";
import { CustomCheckBox } from "@/components/CustomCheckBox";
import { useLocalSearchParams } from "expo-router";
import { getImageUrl } from "@/app/axios/api/imageApi";

export default function checkinDetailHistory() {
  const {
    time,
    image,
    branch_name,
    work_shift_name,
    note,
    record_latitude,
    record_longitude,
    branch_latitude,
    branch_longitude,
  } = useLocalSearchParams();
  const [imageUrl, setImageUrl] = useState(image);
  const latRecord = parseFloat(record_latitude as string);
  const lngRecord = parseFloat(record_longitude as string);
  const latBranch = parseFloat(branch_latitude as string);
  const lngBranch = parseFloat(branch_longitude as string);

  useEffect(() => {
    getImageUrl(image as string).then((res) => {
      setImageUrl(res.data.url);
    });
  }, []);

  const [checkbox, setCheckbox] = useState(false);
  const userInfo = useSelector((state: any) => state.userdata.user);
  return (
    <SafeAreaView style={AppStyle.StyleCommon.container}>
      <View style={[AppStyle.StyleCommon.container]}>
        <ImageBackground
          source={require("../../../assets/images/logo-background.png")}
          resizeMode="contain"
          style={AppStyle.StyleHome.background}
        >
          <TitleHeader title={"Chi tiết lịch sử chấm công"} />
          <ScrollView>
            <View style={{ paddingHorizontal: 20, flex: 1 }}>
              <RowContentCheckIn
                title={"Nhân viên"}
                content={userInfo?.full_name}
              />
              <RowContentCheckIn title={"Thời gian"} content={time} />

              <Text style={AppStyle.StyleCheckIn.textCamera}>
                Hình ảnh gương mặt
              </Text>
              <View style={AppStyle.StyleCheckIn.boxCamera}>
                <Image
                  resizeMode="stretch"
                  source={
                    imageUrl
                      ? { uri: imageUrl }
                      : require("../../../assets/images/image_sample.png")
                  }
                  style={{ width: "100%", height: "100%" }}
                />
              </View>

              <RowContentCheckIn title={"Văn phòng"} content={branch_name} />
              <RowContentCheckIn
                title={"Ca làm việc"}
                content={work_shift_name}
              />
              <RowContentCheckIn title={"Ghi chú"} content={note} />

              <Text style={AppStyle.StyleCheckIn.textCamera}>Vị trí</Text>
              <View style={AppStyle.StyleCheckIn.boxMap}>
                <MapView
                  showCir={checkbox}
                  location_business={{
                    lat: latBranch,
                    lng: lngBranch,
                  }}
                  location={{
                    lat: latRecord,
                    lng: lngRecord,
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
                <Text
                  style={[AppStyle.StyleCheckIn.textNote, { paddingLeft: 5 }]}
                >
                  Hiển thị bán kính và vị trí văn phòng
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
