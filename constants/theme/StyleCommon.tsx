import { StyleSheet } from "react-native";
import Color from "./Color";
const StyleCommon = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  size_avt_large: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  size_avt_small: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  size_avt_medium: {
    width: 60,
    height: 60,
    borderRadius: 30,
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
  textBlack15:{
    fontSize: 15,
    color: Color.color2,
    fontWeight: "500",
  },
  textBlack18: {
    fontSize: 18,
    color: Color.color2,
    fontWeight: "500",
  },
  textBlack14w400:{
    fontSize: 14,
    color: Color.color2,
    fontWeight: "400",
  },
  textBlack18w400:{
    fontSize: 18,
    color: Color.color2,
    fontWeight: "400",
  },
  textBlack16w400:{
    fontSize: 16,
    color: Color.color2,
    fontWeight: "400",
  },
  textBlack16w500:{
    fontSize: 16,
    color: Color.color2,
    fontWeight: "500",
  },
  textBlack14:{
    fontSize: 14,
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
  textSecondary13: {
    fontSize: 13,
    color: Color.color_secondary
  }
});
export default StyleCommon;
