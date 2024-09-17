import { StyleSheet } from "react-native";
import Color from "./Color";
import Dimension from "./Dimension";
export const StyleReq = StyleSheet.create({
  boxpropose: {
    width: "90%",
    paddingVertical: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
  itemOption_spec: {
    alignSelf: "flex-start",
    backgroundColor: Color.color5,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
  },
  itemOption: {
    alignSelf: "flex-start",
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginRight: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  textOption: {
    fontWeight: "500",
    color: Color.color2,
  },
  container: {
    width: "90%",
    alignSelf: "center",
    // height: Dimension.window.height - 350,
  },
  imgIcon: {
    width: 20,
    height: 20,
  },
  boxOptionIcon: {
    width: "90%",
    alignSelf: "center",
    height: 37,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  redText: {
    color: "red",
    fontSize: 12,
  },
  cardContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  avt: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  boxTitle: {
    flexDirection: "row",
  },
  boxTitleCard: {
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  cardTitle: {
    color: Color.color2,
    fontSize: 16,
    fontWeight: "500",
  },
  cardText: {
    color: Color.color2,
  },
  boxStateRed: {
    backgroundColor: Color.color6,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  textStateRed: {
    color: "red",
  },
  boxStateGreen: {
    backgroundColor: Color.color8,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  textStateGreen: {
    color: "green",
  },
  boxStateBlue: {
    backgroundColor: Color.color7,
    borderRadius: 10,
    paddingHorizontal: 5,
  },
  textStateBlue: {
    color: "blue",
  },
  modalView: {
    width: "100%",
    borderRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 20,
  },
  filterItem: {
    width: "90%",
    alignSelf: "center",
  },
  filterBoxButton: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterButton: {
    borderRadius: 50,
    paddingHorizontal: 60,
    paddingVertical: 5,
    marginVertical: 10,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "500",
  },
  groupCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boxCard: {
    width: "90%",
  },
  boxScroll: {
    height: Dimension.window.height - 320,
  },
});
