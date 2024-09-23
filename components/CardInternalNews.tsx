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
    <Image
      resizeMode="stretch"
      source={require("../assets/images/news_sample.png")}
      style={selfstyle.container}
    ></Image>
  );
}

const selfstyle = StyleSheet.create({
  container: {
    width: width - 30,
    height: 140,

    borderRadius: 10,
    flexDirection: "row",
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
export default CardInternalNews;
