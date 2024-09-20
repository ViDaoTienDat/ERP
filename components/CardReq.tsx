import React from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import AppStyle from "../constants/theme";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

type DataReq = {
  title: string;
  type: string;
  state: number;
  date: Date;
  avt: any;
};

function CardReq({
  title,
  type,
  state,
  date,
  avt,
}: DataReq): React.JSX.Element {
  const handlePress = () => {
    router.navigate("./DetailsReq");
  };
  return (
    <TouchableOpacity
      style={AppStyle.StyleReq.cardContainer}
      onPress={handlePress}
    >
      <View style={AppStyle.StyleReq.boxTitle}>
        <Image
          style={AppStyle.StyleReq.avt}
          source={require("../assets/images/avt.png")}
        />
        <View style={AppStyle.StyleReq.boxTitleCard}>
          <Text style={AppStyle.StyleReq.cardTitle}>{title}</Text>
          <Text style={AppStyle.StyleReq.cardText}>{type}</Text>
        </View>
      </View>
      <View style={AppStyle.StyleCommon.alignCenter}>
        <View
          style={
            state === 0
              ? AppStyle.StyleReq.boxStateBlue
              : state === 1
              ? AppStyle.StyleReq.boxStateGreen
              : AppStyle.StyleReq.boxStateRed
          }
        >
          <Text
            style={
              state === 0
                ? AppStyle.StyleReq.textStateBlue
                : state === 1
                ? AppStyle.StyleReq.textStateGreen
                : AppStyle.StyleReq.textStateRed
            }
          >
            {state === 0
              ? "Chờ duyệt"
              : state === 1
              ? "Đã đồng ý"
              : "Đã từ chối"}
          </Text>
        </View>
        <Text style={AppStyle.StyleReq.cardText}>
          {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default CardReq;
