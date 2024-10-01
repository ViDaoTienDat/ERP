import Color from "@/constants/theme/Color";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Category = {
  name: string;
  img: any;
  onPress?: () => void;
};
function RowCategory({ name, img, onPress }: Category): React.JSX.Element {
  return (
    <View style={selfstyle.container}>
      <TouchableOpacity style={selfstyle.container_content} onPress={onPress}>
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
    width: "95%",
    height: 60,
    borderBottomWidth: 1,
    borderColor: Color.color1,
    alignSelf: "center",
  },
  container_content:{
    flexDirection: "row", 
    alignSelf: 'flex-start',
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  box_icon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  text_name: {
    width: "auto",
    fontSize: 13,
    fontWeight: "500",
    color: "black",
    alignSelf: "center",
  },
});
export default RowCategory;
