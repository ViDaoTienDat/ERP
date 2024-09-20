import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Color from "../constants/theme/Color";
import dimension from "../constants/theme/Dimension";
const width = dimension.window.width;

// interface CardInternalNewsProps {
//   id: number;
//   title: string;
//   time: string;
//   content: string;
// }
function CardInternalNews({ item }: any) {
  return (
    <View style={selfstyle.container}>
    </View>
  );
}

const selfstyle = StyleSheet.create({
  container: {
    width: width - 30,
    height: 140,
    backgroundColor: Color.color1,
    borderRadius: 10,
    flexDirection: "row",
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
export default CardInternalNews;
