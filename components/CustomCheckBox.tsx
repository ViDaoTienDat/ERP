import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import Color from "../constants/theme/Color";

type DataCheckBox = {
  checked: boolean;
  func: Function;
};

export function CustomCheckBox({
  checked,
  func,
}: DataCheckBox): React.JSX.Element {
  const changeState = () => {
    func();
  };
  return (
    <TouchableOpacity style={styles.container} onPress={changeState}>
      {checked && (
        <Image
          tintColor={Color.color13}
          style={styles.img}
          source={require("../assets/images/check.png")}
        />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: Color.color13,
    borderRadius: 4,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
