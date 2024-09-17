import Color from "./Color";
import Dimension from "./Dimension";
import { StyleSheet } from "react-native";

const height = Dimension.window.height;
export const StyleTable = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  content: {
    marginTop: 10,
  },
  boxday: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  boxmonth: {
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    backgroundColor: "#fff",
  },
  icon: {
    width: 15,
    height: 15,
  },
  text_large: {
    fontWeight: "bold",
    color: Color.color3,
    fontSize: 20,
  },
  text_medium: {
    fontSize: 12,
    fontWeight: "500",
    color: Color.color2,
  },
  text_small: {
    fontSize: 12,
    fontWeight: "400",
    color: Color.color2,
    paddingVertical: 10,
  },
  text_check: {
    fontSize: 12,
    fontWeight: "500",
    color: "#44b678",
  },
  calendar: {
    backgroundColor: "#fff",
  },
  dayofweek: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingHorizontal: "5%",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  boxcalendar: {
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    backgroundColor: "#fff",
    height: height - 300,
  },
  rowcalendar: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 110,
  },
  cellcalendar: {
    width: "14.2857%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  boxcheck: {
    paddingVertical: 20,
    alignItems: "center",
  },
  button: {
    width: 40,
    height: "100%",
    justifyContent: "center",
  },
  textValue: {
    color: "gray",
    fontSize: 11,
    fontWeight: "400",
  },
  boxValue: {
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  boxButton: {
    width: 25,
    height: 25,
    backgroundColor: Color.color1,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  imgButton: {
    width: 24,
    height: 24,
  },
  addItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 6,
  },
  addLabel: {},
  addValue: {
    width: "70%",
  },
  addButton: {
    padding: 10,
    borderColor: Color.color1,
    borderWidth: 1,
    borderRadius: 10,
  },
  addTextValue: {
    color: Color.color2,
  },
  addBoxButton: {
    marginTop: 10,
  },
});
