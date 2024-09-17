import { StyleSheet } from "react-native";
import Color from "./Color";
const StyleRegister = StyleSheet.create({
  boxcontent: {
    width: "100%",
    paddingHorizontal: 15,
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Color.color2,
    paddingVertical: 10,
  },
  boxInfo: {
    flexDirection: "row",
    backgroundColor: Color.color1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
  },
  textInfo: {
    color: Color.color2,
    fontSize: 13,
    padding: 7,
  },
  boxContent: {
    width: "100%",
    borderBottomColor: Color.color1,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  boxItem: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: Color.color2,
  },
  input: {
    padding: 10,
    borderColor: Color.color4,
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    width: "100%",
    height: 50,
    borderColor: Color.color4,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textValue: {
    fontSize: 15,
    color: Color.color13,
  },
  flexRow: {
    flexDirection: "row",
  },
  ImgCancel: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
  },
  boxValue: {
    borderColor: Color.color4,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  boxFollower: {
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },
  boxGray: {
    backgroundColor: Color.color1,
    borderRadius: 50,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  mH: {
    marginHorizontal: 1,
  },
  mV: {
    marginVertical: 50,
  },
  boxChooseFoll: {
    padding: 20,
  },
  ButtonChooseFoll: {
    flexDirection: "row",
    marginVertical: 5,
  },
  sizeChooseF: {
    height: 400,
  },
  ImgDelete: {
    width: 15,
    height: 15,
  },
  dateTimePicker: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  container: {
    width: "100%",
    height: 2,
  },
});
export default StyleRegister;
