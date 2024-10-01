import { StyleSheet } from "react-native";
import colors from "./Color";
const StyleLogin = StyleSheet.create({
  flexLogo: {
    flex: 4,
    marginBottom: 50,
    justifyContent: "flex-end",
  },
  flexLogin: {
    flex: 5,
    width: "100%",
  },
  flexVer: {
    flex: 1,
  },
  logo: {
    width: 167,
    height: 85,
  },
  appName: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.color2,
    marginTop: 10,
    marginBottom: "10%",
  },
  boxLogin: {
    width: "90%",
    alignSelf: "center",
    borderColor: colors.color1,
    borderWidth: 1,
    borderRadius: 10,
  },
  boxItem: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 15,
  },
  inputLogin: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.color1,
    paddingHorizontal: 15,
    marginVertical: 5,
    height: 50,
  },
  button: {
    height: 40,
    backgroundColor: colors.color3,
    borderRadius: 10,
  },
  mini_button: {
    width: 120,
  },
  boxHref: {
    width: 105,
  },
  textHref: {
    color: colors.color3,
    textDecorationLine: "underline",
  },
  buttonImg: {
    position: "absolute",
    right: 15,
    top: "50%",
  },
  img: {
    width: 20,
    height: 20,
  },
  boxButton: {
    marginBottom: 20,
  },
  spaceButton: {
    paddingHorizontal: 20,
  },
  wrongPass: {
    color: "red",
  },
  rememberMe: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: "##EF9F48",
  },
  showPassResetPass: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textShowPass: {
    paddingHorizontal: 10,
    color: colors.color2,
  },
});
export default StyleLogin;
