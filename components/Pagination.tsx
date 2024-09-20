import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import Color from "../constants/theme/Color";

const { width } = Dimensions.get("screen");
type Data = {
  data: any;
  scrollX: any;
};
function Pagination({ data, scrollX }: Data): React.JSX.Element {
  return (
    <View style={selfstyle.container}>
      {data.map((_: any, idx: any) => {
        const colorDot = scrollX.interpolate({
          inputRange: [(idx - 1) * width, idx * width, (idx + 1) * width],
          outputRange: ["#d9d9d9", "#B51B01", "#d9d9d9"],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            key={idx}
            style={[selfstyle.dot, { backgroundColor: colorDot }]}
          />
        );
      })}
    </View>
  );
}
const selfstyle = StyleSheet.create({
  dot: {
    width: 5,
    height: 5,
    borderRadius: 50,
    backgroundColor: Color.color1,
    marginHorizontal: 3,
  },
  container: {
    width: "100%",
    height: 40,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Pagination;
