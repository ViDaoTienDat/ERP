import { StyleSheet } from "react-native";
import Color from "./Color";
import Dimension from "./Dimension";
const width = Dimension.window.width - 38; //  paddingHorizontal = 15 in checkin.tsx

const StyleHeader = StyleSheet.create({
  header: {
    justifyContent: "space-evenly",
    width: "100%",
    height: 128,
    paddingHorizontal: 15,
    paddingBottom: 5,
    backgroundColor: Color.color3,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  header_item: {
    width: "auto",
    height: "100%",
    justifyContent: "flex-start",
    gap: 15,
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
    alignItems: "center",
    gap: 5,
    height: 40,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  size_iconsearch: {
    width: 28,
    height: 32,
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
    borderRadius: 16,
    backgroundColor: Color.color10,
  },
  boxTab: {
    width: width / 2,
    borderRadius: 12,
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
  size_iconBack:{
    width: 20,
    height: 20,
  },
});
export default StyleHeader;
