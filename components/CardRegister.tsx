import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import AppStyle from "../constants/theme";

type DataCard = {
  name: string;
  func: Function;
};
function CardRegister({ name, func }: DataCard): React.JSX.Element {
  const handlePress = () => {
    func();
  };
  return (
    <TouchableOpacity style={AppStyle.StyleCheckIn.card} onPress={handlePress}>
      <View style={AppStyle.StyleCheckIn.itemCard}>
        <View style={AppStyle.StyleCheckIn.boxTextCard}>
          <Text style={AppStyle.StyleCommon.textBlack15}>{name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default CardRegister;
