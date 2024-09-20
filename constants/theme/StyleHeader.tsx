import { StyleSheet } from "react-native";
import Color from "./Color";
import Dimension from "./Dimension";
const width = Dimension.window.width - 38; //  paddingHorizontal = 15 in checkin.tsx

const StyleHeader = StyleSheet.create({
  header: {
    justifyContent: "space-evenly",
    width: "100%",
    height: 170,
    // justifyContent: "flex-end",
    backgroundColor: Color.color_header_red,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  text_name: {
    color: Color.color_white,
    fontWeight: "bold",
    fontSize: 16,
  },
  text_position: {
    color: Color.color_white,
    height: 128,
    paddingHorizontal: 15,
    paddingBottom: 5,
    backgroundColor: Color.color3,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
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
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 12,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
  },
  size_avt: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  border_white: {
    borderWidth: 1,
    borderColor: "#fff",
  },
  boxsearch: {
    height: 40,
    flexDirection: "row",
    backgroundColor: Color.color_header_red,
    alignItems: "center",
    borderWidth: 1,
    marginHorizontal: 15,
    marginBottom: 18,
    marginTop: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
    borderColor: "#fff",
  },
  size_iconsearch: {
    width: 28,
    height: 32,
  },
  size_iconnotificaton: {
    width: 32,
    height: 32,
  },
  size_iconBack: {
    width: 20,
    height: 20,
  },
  boxinput: {
    width: "80%",
    paddingLeft: 10,
    color: Color.color_white,
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
