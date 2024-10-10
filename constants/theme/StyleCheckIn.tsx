import { StyleSheet } from "react-native";
import Color from "./Color";
const StyleCheckIn = StyleSheet.create({
  boxContainer: {
    flex: 1,
  },
  container: {
    width: "100%",
    alignSelf: "center",
  },
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.color1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginVertical: 5,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxTextCard: {
    height: 30,
    justifyContent: "center",
  },
  imgCard: {
    width: 20,
    height: 20,
    marginHorizontal: 10,
  },
  textNote: {
    color: Color.color2,
    fontSize: 13,
    marginVertical: 15,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textOfficeTitle: {
    color: Color.color2,
    fontWeight: "bold",
    fontSize: 20,
    padding: 20,
  },
  boxButton: {
    paddingVertical: 10,
    paddingLeft: 20,
  },
  textButton: {
    fontWeight: "400",
    fontSize: 15,
    color: Color.color2,
  },
  buttonCheckIn: {
    width: "50%",
    height: 40,
    backgroundColor: Color.color3,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    marginVertical: 15,
    borderRadius: 10,
  },
  textCheckIn: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  boxContent: {
    width: "90%",
    alignSelf: "center",
  },
  boxCamera: {
    width: "100%",
    height: 350,
    marginVertical: 10,
    justifyContent: "center",
  },
  boxMap: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    borderRadius: 10
  },
  textCamera: {
    color: Color.color2,
    fontWeight: "bold",
    fontSize: 20,
    paddingVertical: 10,
  },
  boxItem: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  ItemLabel: {
    width: "30%",
    color: Color.color2,
    fontWeight: "700",
    fontSize: 15,
  },
  ItemValue: {
    color: Color.color2,
    fontWeight: "400",
    fontSize: 15,
  },
  ItemInput: {
    borderWidth: 1,
    borderColor: Color.color4,
    width: "70%",
    height: 40,
    padding: 10,
    borderRadius: 10,
  },
  ItemInfo: {
    borderWidth: 1,
    borderColor: Color.color4,
    width: "70%",
    borderRadius: 10,
    padding: 10,
  },
  boxDropdown: {
    width: "70%",
  },
});
export default StyleCheckIn;
