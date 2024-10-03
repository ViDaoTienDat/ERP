import { StyleSheet } from "react-native";
import Color from "./Color";
import Dimension from "./Dimension";
export const StyleReq = StyleSheet.create({
  boxpropose: {
    width: "100%",
    alignSelf: "center",
  },
  itemOption: {
    width: 120,
    paddingVertical: 20,
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  textOption_spec: {
    fontWeight: "500",
    color: Color.color13,
    textAlign: "center",
  },
  textOption: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6d6d6d",
    textAlign: "center",
  },
  container: {
    width: "90%",
    alignSelf: "center",
    // height: Dimension.window.height - 350,
  },
  imgIcon: {
    width: 32,
    height: 32,
  },
  boxOptionIcon: {
    width: "90%",
    alignSelf: "center",
    height: 37,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 4,
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
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  textStateRed: {
    color: "red",
  },
  boxStateGreen: {
    backgroundColor: "#8CE2C8",
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  textStateGreen: {
    color: "#118E69",
  },
  boxStateBlue: {
    backgroundColor: Color.color7,
    borderRadius: 50,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  textStateBlue: {
    color: "#2768E8",
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
    paddingVertical: 10,
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
