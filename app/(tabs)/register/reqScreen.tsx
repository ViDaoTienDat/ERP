import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

import AppStyle from "@/constants/theme";
import { CustomCheckBox } from "../../../components/CustomCheckBox";
import { ModalReqFilter } from "../../../components/ModalReqFilter";
import ReqView from "../../../components/ReqView";
import ReqApprove from "../../../components/ReqApprove";

const data_option = ["Của tôi", "Gửi đến tôi", "Đang theo dõi"];
function reqScreen(): React.JSX.Element {
  const [option, setoption] = useState(0);
  const [visiable, setVisiable] = useState(false);
  const [checkAllVisiable, setCheckAllVisiable] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const handlePressOption = (num: React.SetStateAction<number>) => {
    setoption(num);
    if (num === 1) {
      setCheckAllVisiable(true);
    } else {
      setCheckAllVisiable(false);
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={AppStyle.StyleReq.boxpropose}>
        <FlatList
          scrollEnabled={false}
          data={data_option}
          horizontal
          contentContainerStyle={{
            justifyContent: "space-around", // Căn đều các item
            flexGrow: 1, // Đảm bảo danh sách chiếm hết chiều rộng
          }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={AppStyle.StyleReq.itemOption}
              onPress={() => handlePressOption(index)}
            >
              <Text
                style={
                  option == index
                    ? AppStyle.StyleReq.textOption_spec
                    : AppStyle.StyleReq.textOption
                }
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={AppStyle.StyleReq.boxOptionIcon}>
        <View>
          {checkAllVisiable && (
            <View>
              <Text style={AppStyle.StyleReq.redText}>
                Để duyệt/từ chối hàng loạt
              </Text>
              <CustomCheckBox
                checked={checkAll}
                func={() => {
                  setCheckAll(!checkAll);
                }}
              />
            </View>
          )}
        </View>
        <TouchableOpacity
          onPress={() => {
            setVisiable(true);
          }}
        >
          <Image
            resizeMode="cover"
            style={AppStyle.StyleReq.imgIcon}
            source={require("../../../assets/images/filter.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        {option === 1 ? <ReqApprove checkAll={checkAll} /> : <ReqView />}
      </View>
      <ModalReqFilter
        visiable={visiable}
        funcHide={() => {
          setVisiable(false);
        }}
      />
    </View>
  );
}

export default reqScreen;
