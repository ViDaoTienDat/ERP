// CustomIcons.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
type DataCustomIcon = {
  focused: boolean;
  img: any;
};
type DataIcon = {
  focused: boolean;
};
const CustomIcon = ({ focused, img }: DataCustomIcon) => (
  <View style={{ ...styles.iconContainer }}>
    <Image style={styles.iconImg} source={img} />
  </View>
);
export const HomeIcon = ({ focused }: DataIcon) => (
  <CustomIcon
    focused={focused}
    img={
      focused
        ? require("../assets/images/house-fill.png")
        : require("../assets/images/house.png")
    }
  />
);

export const CheckInIcon = ({ focused }: DataIcon) => (
  <CustomIcon
    focused={focused}
    img={
      focused
        ? require("../assets/images/person-bounding-box-fill.png")
        : require("../assets/images/person-bounding-box.png")
    }
  />
);

export const RegisterIcon = ({ focused }: DataIcon) => (
  <CustomIcon
    focused={focused}
    img={
      focused
        ? require("../assets/images/new-document_007aff.png")
        : require("../assets/images/new-document.png")
    }
  />
);

export const ApplicationIcon = ({ focused }: DataIcon) => (
  <CustomIcon
    focused={focused}
    img={
      focused
        ? require("../assets/images/application_007aff.png")
        : require("../assets/images/application.png")
    }
  />
);

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  iconImg: {
    width: 30,
    height: 30,
  },
});
