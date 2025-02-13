import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Category = {
  name: string;
  img: any;
  onPress?: () => void;
};
function CardCategory({ name, img, onPress }: Category): React.JSX.Element {
  return (
    <View style={selfstyle.container}>
      <TouchableOpacity style={selfstyle.container} onPress={onPress}>
        <View style={[selfstyle.box_icon]}>
          <Image style={selfstyle.icon} source={img} />
        </View>
        <Text style={selfstyle.text_name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const selfstyle = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
  },
  box_icon: {
    width: "60%",
    height: "60%",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: "50%",
    height: "50%",
  },
  text_name: {
    width: "auto",
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    alignSelf: "center",
  },
});
export default CardCategory;
