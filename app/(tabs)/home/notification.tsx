import { View, FlatList, ImageBackground} from "react-native";
import React from "react";
import TitleHeader from "@/components/TitleHeader";
import AppStyle from "@/constants/theme";
import NotificationItem from "@/components/NotificationItem";
import { SafeAreaView } from "react-native-safe-area-context";

const data = [
  { id: '1', type: "Checkin", time: "10:00 18/09/2024", content: "Chào mừng bạn đến văn phòng, Tính. Chúc bạn một ngày mới tốt lành.", isRead: false },
  { id: '2', type: "Reminder", time: "11:00 18/09/2024", content: "Cuộc họp sẽ bắt đầu trong 10 phút nữa.", isRead: true },
  { id: '3', type: "Warning", time: "12:00 18/09/2024", content: "Vui lòng hoàn thành báo cáo trước 5 giờ chiều.", isRead: false },
  { id: '4', type: "Update", time: "14:00 18/09/2024", content: "Có bản cập nhật mới cho hệ thống.", isRead: true },
  { id: '5', type: "Update", time: "14:00 18/09/2024", content: "Có bản cập nhật mới cho hệ thống.", isRead: true },
  { id: '6', type: "Checkin", time: "10:00 18/09/2024", content: "Chào mừng bạn đến văn phòng, Tính. Chúc bạn một ngày mới tốt lành.", isRead: false },
  { id: '7', type: "Reminder", time: "11:00 18/09/2024", content: "Cuộc họp sẽ bắt đầu trong 10 phút nữa.", isRead: true },
  { id: '8', type: "Warning", time: "12:00 18/09/2024", content: "Vui lòng hoàn thành báo cáo trước 5 giờ chiều.", isRead: false },
  { id: '9', type: "Update", time: "14:00 18/09/2024", content: "Có bản cập nhật mới cho hệ thống.", isRead: true },
  { id: '10', type: "Update", time: "14:00 18/09/2024", content: "Có bản cập nhật mới cho hệ thống.", isRead: true },
];

export default function Notification() {
  const renderItem = ({ item }: any) => (
    <NotificationItem 
      type={item.type} 
      time={item.time} 
      content={item.content} 
      isRead={item.isRead}
      onPress={()=>{}}
    />
  );

  return (
    <SafeAreaView style={AppStyle.StyleCommon.container}>
      <View style={AppStyle.StyleCommon.container}>
        <ImageBackground source={require("../../../assets/images/logo-background.png")} resizeMode="contain" style={AppStyle.StyleHome.background}>
          <TitleHeader title={"Thông báo"} />
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
}
