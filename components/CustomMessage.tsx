import AppStyle from "@/constants/theme";
import Color from "@/constants/theme/Color";
import * as React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DataMessage = {
  hasVisible: boolean;
  title: string;
  content: string;
  func: Function[];
  textFunc: string[];
};

export default function CustomMessage({
  hasVisible,
  title,
  content,
  func,
  textFunc,
}: DataMessage) {
  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={hasVisible}>
        <View style={AppStyle.StyleCheckIn.overlay}>
          <View style={styles.modalView}>
            <Text style={styles.textTitle}>{title}</Text>
            <Text style={styles.textContent}>{content}</Text>
            {textFunc.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.boxButton}
                onPress={() => {
                  func[index]();
                }}
              >
                <Text style={styles.textButton}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  modalView: {
    width: "70%",
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
    padding: 20,
    paddingBottom: 10,
  },
  textTitle: {
    color: Color.color2,
    fontWeight: "bold",
    fontSize: 18,
    alignSelf: "center",
  },
  textContent: {
    color: Color.color2,
    fontWeight: "400",
    fontSize: 15,
    alignSelf: "center",
    textAlignVertical: "center",
    paddingVertical: 10,
  },
  boxButton: {
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: Color.color1,
    paddingBottom: 10,
  },
  textButton: {
    color: Color.color3,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "center",
    paddingTop: 10,
  },
});
