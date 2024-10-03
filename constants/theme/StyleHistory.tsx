import Color from "./Color";
import Dimension from "./Dimension";
import { StyleSheet } from "react-native";

const height = Dimension.window.height;
export const StyleHistory = StyleSheet.create({
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
    paddingHorizontal: 10,
  },
  icon: {
    width: 12,
    height: 12,
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
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  text_check: {
    fontSize: 12,
    fontWeight: "400",
    color: "#44b678",
  },
  text_check_late: {
    fontSize: 12,
    fontWeight: "400",
    color: Color.color_header_red,
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
    gap: 10,
    marginTop: 5
  },
  button: {
    width: 40,
    height: "100%",
    justifyContent: "center",
  },
});
