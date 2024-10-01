import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import AppStyle from "../constants/theme";
import { useRouter } from "expo-router";

type DataTitleHeader = {
  title: string;
};

function TitleHeader({ title }: DataTitleHeader): React.JSX.Element {
  const router = useRouter();
  return (
    <View
      style={[AppStyle.StyleHeader.customHeaderItem, { paddingVertical: 18}]}
    >
      <Text style={AppStyle.StyleHeader.title}>{title}</Text>
      <TouchableOpacity
        style={AppStyle.StyleHeader.buttonBack}
        onPress={() => router.back()}
      >
        <Image source={require("../assets/images/arrow-left.png")} style={AppStyle.StyleHeader.size_iconBack} />
      </TouchableOpacity>
    </View>
  );
}

export default TitleHeader;
