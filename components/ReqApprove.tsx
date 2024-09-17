import React, { useEffect, useState } from "react";
import { View, Image, TouchableOpacity, ScrollView, Text } from "react-native";

import AppStyle from "@/constants/theme";
import { dataReq } from "@/assets/data/data_test";
import { CustomCheckBox } from "./CustomCheckBox";
import CardReq from "./CardReq";
import Color from "@/constants/theme/Color";

type DataReq = {
  checkAll: boolean;
};
function ReqApprove({ checkAll }: DataReq): React.JSX.Element {
  const [listChecked, setListChecked] = useState<boolean[]>(
    Array(dataReq.length).fill(false)
  );
  const checked = (index: number) => {
    setListChecked((prevData) =>
      prevData.map((item, i) => (i === index ? !item : item))
    );
  };
  useEffect(() => {
    if (checkAll) {
      setListChecked(Array(dataReq.length).fill(true));
    } else {
      setListChecked(Array(dataReq.length).fill(false));
    }
  }, [checkAll]);
  return (
    <View>
      <ScrollView
        style={AppStyle.StyleReq.container}
        showsVerticalScrollIndicator={false}
      >
        {dataReq.map((item, index) => (
          <View key={index} style={AppStyle.StyleReq.groupCard}>
            <CustomCheckBox
              checked={listChecked[index]}
              func={() => {
                checked(index);
              }}
            />
            <View style={AppStyle.StyleReq.boxCard}>
              <CardReq
                title={item.title}
                type={item.type}
                state={item.state}
                date={new Date(item.date)}
                avt={undefined}
              />
            </View>
          </View>
        ))}
      </ScrollView>
      {listChecked.some((item) => item === true) && (
        <View
          style={[
            AppStyle.StyleReq.filterItem,
            AppStyle.StyleReq.filterBoxButton,
          ]}
        >
          <TouchableOpacity
            style={[
              AppStyle.StyleReq.filterButton,
              { backgroundColor: Color.color_blue },
            ]}
          >
            <Text style={[AppStyle.StyleReq.filterText, { color: "#fff" }]}>
              Đồng ý
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              AppStyle.StyleReq.filterButton,
              { backgroundColor: Color.color6 },
            ]}
          >
            <Text style={[AppStyle.StyleReq.filterText, { color: "red" }]}>
              Từ chối
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default ReqApprove;
