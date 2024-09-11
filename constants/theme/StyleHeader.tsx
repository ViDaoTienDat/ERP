import { StyleSheet } from "react-native";
import Color from "./Color";
import Dimension from "./Dimension";
const width = Dimension.window.width - 38; //  paddingHorizontal = 15 in checkin.tsx

const StyleHeader = StyleSheet.create({
  header: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 10,
    borderBottomColor: Color.color1,
    borderBottomWidth: 5,
  },
  header_item: {
    width: "auto",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  size_avt: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  border_white: {
    borderWidth: 1,
    borderColor: "#fff",
  },
  boxsearch: {
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: Color.color1,
    borderRadius: 50,
  },
  size_iconsearch: {
    width: 20,
    height: 20,
  },
  boxinput: {
    width: "60%",
  },
  customHeader: {
    width: "100%",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  customHeaderItem: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    // borderBottomWidth: 0.8,
    // borderBottomColor: Color.color1,
    // paddingVertical: 18,
  },
  customHeaderBox: {
    backgroundColor: Color.color1,
    borderRadius: 18,
  },
  title: {
    color: Color.color2,
    fontWeight: "bold",
    fontSize: 20,
  },
  buttonBack: {
    position: "absolute",
    top: 25,
    left: 10,
  },
  textButton: {
    color: Color.color3,
    fontWeight: "400",
    fontSize: 15,
  },
  list_option: {
    width: "100%",
    padding: 4,
    borderRadius: 15,
    backgroundColor: Color.color10,
  },
  boxTab: {
    width: width / 2,
    borderRadius: 15,
    paddingVertical: 15,
  },
  textTab: {
    color: Color.color11,
    fontWeight: "bold",
  },
  currTextTab: {
    color: Color.color9,
    fontWeight: "bold",
  },
});
export default StyleHeader;
