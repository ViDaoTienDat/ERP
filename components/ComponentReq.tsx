import AppStyle from "@/constants/theme";
import Color from "@/constants/theme/Color";
import StyleComponentReq from "@/constants/theme/StyleComponentReq";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

type DataApprove = {
  name: string;
  dateCreate: Date;
  state: number;
  handlePressAccept: () => void;
  handlePressDeny: () => void;
};
export function CardApprove({
  name,
  dateCreate,
  state,
  handlePressAccept,
  handlePressDeny,
}: DataApprove): React.JSX.Element {
  return (
    <View style={StyleComponentReq.card}>
      <Text style={StyleComponentReq.titleCard}>{name}</Text>
      <View style={StyleComponentReq.cardItem}>
        <Text style={StyleComponentReq.cardLabel}>Thời gian tạo</Text>
        <Text style={StyleComponentReq.cardValue}>
          {dateCreate.getHours()}:{dateCreate.getMinutes()}{" "}
          {dateCreate.getDate()}/{dateCreate.getMonth() + 1}/
          {dateCreate.getFullYear()}
        </Text>
      </View>
      <View style={StyleComponentReq.cardItem}>
        <Text style={StyleComponentReq.cardLabel}>Trạng thái</Text>
        <Text
          style={
            state === 0
              ? AppStyle.StyleReq.textStateBlue
              : state === 1
              ? AppStyle.StyleReq.textStateGreen
              : AppStyle.StyleReq.textStateRed
          }
        >
          {state === 0 ? "Chờ duyệt" : state === 1 ? "Đã đồng ý" : "Đã từ chối"}
        </Text>
      </View>
      <View
        style={[
          AppStyle.StyleReq.filterItem,
          AppStyle.StyleReq.filterBoxButton,
        ]}
      >
        <TouchableOpacity
          style={[
            AppStyle.StyleReq.filterButton,
            { backgroundColor: Color.color6 },
          ]}
          onPress={handlePressDeny}
        >
          <Text style={[AppStyle.StyleReq.filterText, { color: "red" }]}>
            Từ chối
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            AppStyle.StyleReq.filterButton,
            { backgroundColor: Color.color3 },
          ]}
          onPress={handlePressAccept}
        >
          <Text style={[AppStyle.StyleReq.filterText, { color: "#fff" }]}>
            Đồng ý
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function BasicInfo(): React.JSX.Element {
  return (
    <View style={StyleComponentReq.card}>
      <Text style={StyleComponentReq.titleCard}>Thông Tin Cơ Bản</Text>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>ID Yêu cầu</Text>
        <Text style={StyleComponentReq.infoValue}>329661</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Người tạo</Text>
        <Text style={StyleComponentReq.infoValue}>Nguyễn Phạm Hoàng Thi</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Loại</Text>
        <Text style={StyleComponentReq.infoValue}>Onsite - Đột xuất</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Nhóm</Text>
        <Text style={StyleComponentReq.infoValue}>Ngoài văn phòng</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Luồng duyệt</Text>
        <Text style={StyleComponentReq.infoValue}>Duyệt lần lượt</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Ghi nhận công</Text>
        <Text style={StyleComponentReq.infoValue}>Có tính công</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Người phê duyệt</Text>
        <Text style={StyleComponentReq.infoValue}>Nguyễn Văn A</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Người theo dõi</Text>
        <Text style={StyleComponentReq.infoValue}>
          Nguyễn Văn A, Nguyễn Văn B
        </Text>
      </View>
    </View>
  );
}
export function OnsiteInfo(): React.JSX.Element {
  return (
    <View style={StyleComponentReq.card}>
      <Text style={StyleComponentReq.titleCard}>Thông Tin Yêu Cầu</Text>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Dự án Onsite</Text>
        <Text style={StyleComponentReq.infoValue}>HSC</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Địa điểm Onsite</Text>
        <Text style={StyleComponentReq.infoValue}>HSC</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Lý do</Text>
        <Text style={StyleComponentReq.infoValue}>Khảo sát hệ thống</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Tệp đính kèm</Text>
        <Text
          style={[StyleComponentReq.infoValue, { color: Color.color_blue }]}
        >
          img.png
        </Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Thời gian</Text>
        <Text style={StyleComponentReq.infoValue}>
          Ngày 1: 15/07/2024 09:00 18:00
        </Text>
      </View>
    </View>
  );
}
export function LOAInfo(): React.JSX.Element {
  return (
    <View style={StyleComponentReq.card}>
      <Text style={StyleComponentReq.titleCard}>Thông Tin Yêu Cầu</Text>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Lý do</Text>
        <Text style={StyleComponentReq.infoValue}>Khảo sát hệ thống</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Tệp đính kèm</Text>
        <Text style={StyleComponentReq.infoValue}>img.png</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Thời gian</Text>
        <Text style={StyleComponentReq.infoValue}>
          Ngày 1: 15/07/2024 09:00 18:00
        </Text>
      </View>
    </View>
  );
}
export function WFHInfo(): React.JSX.Element {
  return (
    <View style={StyleComponentReq.card}>
      <Text style={StyleComponentReq.titleCard}>Thông Tin Yêu Cầu</Text>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Lý do</Text>
        <Text style={StyleComponentReq.infoValue}>Khảo sát hệ thống</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Tệp đính kèm</Text>
        <Text style={[StyleComponentReq.infoValue]}>img.png</Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Thời gian</Text>
        <Text style={StyleComponentReq.infoValue}>
          Ngày 1: 15/07/2024 09:00 18:00
        </Text>
      </View>
    </View>
  );
}
export function InternInfo(): React.JSX.Element {
  return (
    <View style={StyleComponentReq.card}>
      <Text style={StyleComponentReq.titleCard}>Thông Tin Yêu Cầu</Text>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>
          Ca làm việc cần thay đổi
        </Text>
        <Text style={StyleComponentReq.infoValue}>
          Ngày 1: 15/07/2024 9:00 18:00
        </Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Thao tác</Text>
        <Text style={StyleComponentReq.infoValue}>
          Đổi sang ca làm việc mới
        </Text>
      </View>
      <View style={StyleComponentReq.infoItem}>
        <Text style={StyleComponentReq.infoLabel}>Ca làm việc mới</Text>
        <Text style={StyleComponentReq.infoValue}>
          Ngày 1: 15/07/2024 9:00 18:00
        </Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Lý do</Text>
        <Text style={StyleComponentReq.infoValue}>Khảo sát hệ thống</Text>
      </View>
      <View style={[StyleComponentReq.infoItem, StyleComponentReq.infoSpec]}>
        <Text style={StyleComponentReq.infoLabel}>Tệp đính kèm</Text>
        <Text style={StyleComponentReq.infoValue}>img.png</Text>
      </View>
    </View>
  );
}
