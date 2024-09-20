import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppStyle from "../constants/theme";

type DataCard = {
  img: any;
  name: string;
  note: string;
  state: boolean;
  stateStr: string;
  func: Function;
};
function CardCheckIn({
  img,
  name,
  note,
  stateStr,
  state,
  func,
}: DataCard): React.JSX.Element {
  const handlePress = () => {
    func();
  };
  return (
    <TouchableOpacity style={AppStyle.StyleCheckIn.card} onPress={handlePress}>
      <View style={AppStyle.StyleCheckIn.itemCard}>
        <Image style={AppStyle.StyleCheckIn.imgCard} source={img} />
        <View style={AppStyle.StyleCheckIn.boxTextCard}>
          <Text style={AppStyle.StyleCommon.textBlack15}>{name}</Text>
          {note != "" && <Text>{note}</Text>}
        </View>
      </View>
      <Text
        style={
          state
            ? AppStyle.StyleCommon.textBlue15
            : AppStyle.StyleCommon.textGray15
        }
      >
        {stateStr}
      </Text>
    </TouchableOpacity>
  );
}
export default CardCheckIn;
