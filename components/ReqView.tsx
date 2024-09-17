import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import AppStyle from "../constants/theme";

import { dataReq } from "@/assets/data/data_test";
import CardReq from "./CardReq";

function ReqView(): React.JSX.Element {
  return (
    <View style={AppStyle.StyleReq.container}>
      <FlatList
        data={dataReq}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CardReq
            key={index}
            title={item.title}
            type={item.type}
            state={item.state}
            date={new Date(item.date)}
            avt={undefined}
          />
        )}
      />
      {/* {dataReq.map((item, index) => (
        <CardReq
          key={index}
          title={item.title}
          type={item.type}
          state={item.state}
          date={new Date(item.date)}
          avt={undefined}
        />
      ))} */}
    </View>
  );
}

export default ReqView;
