import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AppStyle from "../constants/theme";
import { useNavigation } from "@react-navigation/native";

type DataTitleHeader = {
  title: string;
};

function TitleHeader({ title }: DataTitleHeader): React.JSX.Element {
  const navigation = useNavigation();
  return (
    <View
      style={[AppStyle.StyleHeader.customHeaderItem, { paddingVertical: 18 }]}
    >
      <Text style={AppStyle.StyleHeader.title}>{title}</Text>
      <TouchableOpacity
        style={AppStyle.StyleHeader.buttonBack}
        onPress={() => navigation.goBack()}
      >
        <Text style={AppStyle.StyleHeader.textButton}>Trở về</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TitleHeader;
