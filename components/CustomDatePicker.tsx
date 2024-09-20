import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Color from "../constants/theme/Color";

import AppStyle from "../constants/theme";
import { CustomCheckBox } from "./CustomCheckBox";

type CustomData = {
  date: Date;
  checkedS: boolean;
  checkedC: boolean;
  onDateChange: (date: Date) => void;
  onCheckedSChange: () => void;
  onCheckedCChange: () => void;
  onCancel: () => void;
};
export function CustomDatePicker({
  date,
  checkedS,
  checkedC,
  onCheckedSChange,
  onCheckedCChange,
  onCancel,
  onDateChange,
}: CustomData): React.JSX.Element {
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    onDateChange(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };
  return (
    <View style={styles.container}>
      <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
        <Text>Ngày 1</Text>
        <TouchableOpacity onPress={onCancel}>
          <Image
            style={AppStyle.StyleRegister.ImgDelete}
            source={require("../assets/images/x.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={[styles.flexRow, { justifyContent: "space-between" }]}>
        <Text style={styles.textDate}>{date.toLocaleDateString()}</Text>
        <TouchableOpacity onPress={showDatepicker}>
          <Image
            style={styles.img}
            source={require("../assets/images/calendar.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.flexRow}>
        <CustomCheckBox checked={checkedS} func={onCheckedSChange} />
        <Text style={styles.textTime}>09:00 - 12:00</Text>
      </View>
      <View style={styles.flexRow}>
        <CustomCheckBox checked={checkedC} func={onCheckedCChange} />
        <Text style={styles.textTime}>13:30 - 18:00</Text>
      </View>
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}

type DataDate = {
  date: Date;
  checkedS: boolean;
  checkedC: boolean;
};
interface BoxDatePickerProps {
  data: DataDate[];
  setData: React.Dispatch<React.SetStateAction<DataDate[]>>;
}
export function BoxDatePicker({
  data,
  setData,
}: BoxDatePickerProps): React.JSX.Element {
  const removeDate = (indexToRemove: number) => {
    setData((prevData) =>
      prevData.filter((_, index) => index !== indexToRemove)
    );
  };

  const addDate = () => {
    setData((prevData) => [
      ...prevData,
      { date: new Date(), checkedS: false, checkedC: false },
    ]);
  };

  const updateDate = (index: number, newDate: Date) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, date: newDate } : item
      )
    );
  };

  const toggleCheckedS = (index: number) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, checkedS: !item.checkedS } : item
      )
    );
  };

  const toggleCheckedC = (index: number) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, checkedC: !item.checkedC } : item
      )
    );
  };
  return (
    <View style={styles.boxItem}>
      <Text style={styles.label}>Thời gian</Text>
      {data.map((item, index) => (
        <CustomDatePicker
          key={index}
          date={item.date}
          checkedS={item.checkedS}
          checkedC={item.checkedC}
          onDateChange={(newDate) => updateDate(index, newDate)}
          onCheckedSChange={() => toggleCheckedS(index)}
          onCheckedCChange={() => toggleCheckedC(index)}
          onCancel={() => removeDate(index)}
        />
      ))}
      <TouchableOpacity
        style={[styles.button, styles.flexRow]}
        onPress={addDate}
      >
        <Text style={styles.textValue}>Thêm ngày</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    borderWidth: 1,
    borderColor: Color.color1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    justifyContent: "space-around",
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
  flexRow: {
    flexDirection: "row",
  },
  textDate: {
    color: Color.color2,
    fontSize: 15,
  },
  img: {
    width: 15,
    height: 15,
  },
  textTime: {
    color: Color.color2,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  boxItem: {
    width: "100%",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: Color.color2,
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
    color: Color.color3,
  },
});
