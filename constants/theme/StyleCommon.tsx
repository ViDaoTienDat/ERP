import { StyleSheet } from "react-native";
import Color from "./Color";
const StyleCommon = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  flexRowCenter: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  alignCenter: {
    justifyContent: "center",
    alignItems: "center",
  },
  textBlack15: {
    fontSize: 16,
    color: Color.color2,
    fontWeight: "500",
  },
  textBlue15: {
    fontSize: 16,
    color: Color.color3,
    fontWeight: "500",
  },
  textGray15: {
    fontSize: 16,
    color: Color.color1,
    fontWeight: "500",
  },
  textWhite15: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
});
export default StyleCommon;
