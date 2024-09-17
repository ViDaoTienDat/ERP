import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppStyle from "../constants/theme";
import { nguoitheodoi } from "../assets/data/data_test";
import Color from "../constants/theme/Color";
import AntDesign from "@expo/vector-icons/AntDesign";
type DataFollower = {
  name: string;
  img: any;
  index: number;
};

type CardFollower = {
  name: string;
  img: any;
  state: boolean;
  func: Function;
};

function CardFollower({
  img,
  name,
  state,
  func,
}: CardFollower): React.JSX.Element {
  const handlePressFollower = () => {
    func();
  };
  return (
    <TouchableOpacity
      style={[
        AppStyle.StyleRegister.ButtonChooseFoll,
        state ? { backgroundColor: Color.color1 } : {},
      ]}
      onPress={handlePressFollower}
    >
      <Image style={AppStyle.StyleHeader.size_avt} source={img} />
      <Text style={AppStyle.StyleRegister.textInfo}>{name}</Text>
    </TouchableOpacity>
  );
}
function Follower(): React.JSX.Element {
  const [follower, setFollower] = useState<DataFollower[]>([]);
  const [addVisible, setAddVisible] = useState(false);

  const handlePressAdd = () => {
    setAddVisible(true);
  };
  const handlePressFollower = (index: number, img: any, name: string) => {
    setFollower((prevFollower) => {
      const isFollowed = prevFollower.some((f) => f.index === index);

      if (isFollowed) {
        return prevFollower.filter((f) => f.index !== index);
      } else {
        return [...prevFollower, { name, img, index }];
      }
    });
  };
  const checkState = (index: number) => {
    const isFollowed = follower.some((f) => f.index === index);
    return isFollowed;
  };
  return (
    <View>
      <Text style={AppStyle.StyleRegister.label}>Người theo dõi</Text>
      <View
        style={[
          AppStyle.StyleRegister.flexRow,
          AppStyle.StyleRegister.boxFollower,
        ]}
      >
        <View
          style={[AppStyle.StyleRegister.flexRow, { alignItems: "center" }]}
        >
          {follower.slice(0, 3).map((item, index) => (
            <Image
              key={index}
              style={[AppStyle.StyleHeader.size_avt, AppStyle.StyleRegister.mH]}
              source={item.img}
            />
          ))}
          {follower.length > 3 && (
            <View style={AppStyle.StyleRegister.boxGray}>
              <Text>+{follower.length - 3}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
          onPress={handlePressAdd}
        >
          <AntDesign name="plus" size={16} color={Color.color13} />
          <Text style={AppStyle.StyleRegister.textValue}>Thêm</Text>
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={addVisible}
        onRequestClose={() => setAddVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setAddVisible(false)}>
          <View style={AppStyle.StyleCheckIn.overlay}>
            <TouchableWithoutFeedback>
              <View style={[AppStyle.StyleCheckIn.modalView]}>
                <View style={AppStyle.StyleRegister.boxChooseFoll}>
                  <Text style={[AppStyle.StyleRegister.label]}>
                    Chọn người theo dõi
                  </Text>
                  <ScrollView style={AppStyle.StyleRegister.sizeChooseF}>
                    {nguoitheodoi.map((item, index) => (
                      <CardFollower
                        key={index}
                        img={item.img}
                        name={item.name}
                        state={checkState(index)}
                        func={() => {
                          handlePressFollower(index, item.img, item.name);
                        }}
                      />
                    ))}
                  </ScrollView>
                  <TouchableOpacity
                    style={AppStyle.StyleCheckIn.buttonCheckIn}
                    onPress={() => {
                      setAddVisible(false);
                    }}
                  >
                    <Text style={AppStyle.StyleCheckIn.textCheckIn}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

export default Follower;
