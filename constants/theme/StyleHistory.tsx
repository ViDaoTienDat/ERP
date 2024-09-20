import Color from "./Color";
import Dimension from "./Dimension";
import { StyleSheet } from "react-native";

const height = Dimension.window.height;
export const selfstyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  content: {
    marginTop: 10,
  },
  boxmonth: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  icon: {
    width: 15,
    height: 15,
  },
  text_large: {
    fontWeight: "bold",
    color: Color.color_header_red,
    fontSize: 20,
  },
  text_medium: {
    fontWeight: "500",
  },
  text_small: {
    fontSize: 15,
    fontWeight: "400",
    color: Color.color2,
    paddingVertical: 10,
  },
  text_check: {
    fontSize: 12,
    fontWeight: "400",
    color: "#44b678",
  },
  calendar: {},
  dayofweek: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-around",
    backgroundColor: Color.color1,
  },
  boxcalendar: {
    paddingHorizontal: 10,
    //backgroundColor: '#fff',
  },
  rowcalendar: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 100,
  },
  cellcalendar: {
    width: "14.2857%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  boxcheck: {
    alignItems: "center",
  },
  button: {
    width: 40,
    height: "100%",
    justifyContent: "center",
  },
});
