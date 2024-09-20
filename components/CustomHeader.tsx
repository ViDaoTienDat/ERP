import React, { useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import AppStyle from "../constants/theme";
import TitleHeader from "./TitleHeader";
import { SafeAreaView } from "react-native-safe-area-context";

type DataHeader = {
  title: string;
  tabs: string[];
  func: Function;
  state: Number;
  onchangeTab: boolean;
};

function CustomHeader({
  title,
  tabs,
  func,
  state,
  onchangeTab,
}: DataHeader): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={AppStyle.StyleHeader.customHeader}>
        <TitleHeader title={title} />
        <View style={[AppStyle.StyleHeader.customHeaderItem]}>
          <FlatList
            style={AppStyle.StyleHeader.list_option}
            data={tabs}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  AppStyle.StyleHeader.boxTab,
                  AppStyle.StyleCommon.alignCenter,
                  ,
                  index == state
                    ? { backgroundColor: "#c22621" }
                    : { backgroundColor: "#ececec" },
                ]}
                onPress={() => func(index)}
              >
                <Text
                  style={
                    index == state
                      ? AppStyle.StyleHeader.currTextTab
                      : AppStyle.StyleHeader.textTab
                  }
                >
                  {item}
                </Text>
              </TouchableOpacity>
            )}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default CustomHeader;
