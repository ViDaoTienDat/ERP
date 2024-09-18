import React, { useState } from "react";
import {
  Button,
  Image,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomDropdown from "./DropDown";
// import DocumentPicker, {
//   DocumentPickerResponse,
// } from "react-native-document-picker";
import * as DocumentPicker from "expo-document-picker";
import AppStyle from "../constants/theme";
import DateTimePicker from "@react-native-community/datetimepicker";
import Color from "@/constants/theme/Color";
import { Picker } from "@react-native-picker/picker";

type DataInfo = {
  label: string;
  value: string;
};
type DataInput = {
  label: string;
  value: string;
  onChangeValue: Function;
};
type DataDateTime = {
  label: string;
  value: Date;
  onChangeValue: Function;
};
type DataDropDown = {
  label: string;
  data: any;
  firstValue: string;
  onChange: Function;
};
type DataButton = {
  label: string;
  value: string;
  func: Function;
};
export function ItemInfo({ label, value }: DataInfo): React.JSX.Element {
  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>
      <View style={AppStyle.StyleRegister.boxValue}>
        <Text style={AppStyle.StyleRegister.textInfo}>{value}</Text>
      </View>
    </View>
  );
}
export function ItemButton({
  label,
  value,
  func,
}: DataButton): React.JSX.Element {
  const handlePress = () => {
    func();
  };
  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>
      <TouchableOpacity
        style={AppStyle.StyleRegister.boxValue}
        onPress={handlePress}
      >
        <Text style={AppStyle.StyleRegister.textValue}>{value}</Text>
      </TouchableOpacity>
    </View>
  );
}
export function ItemDropDown({
  label,
  data,
  firstValue,
  onChange,
}: DataDropDown): React.JSX.Element {
  const [value, setvalue] = useState(data[0].value);
  const onchangeValue = (value: string) => {
    const office = data.find(
      (office: { value: any }) => office.value === value
    );
    const label = office ? office.label : "Không tìm thấy";
    onChange(label);
  };
  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>

      <CustomDropdown
        data={data}
        firstValue={firstValue}
        onChange={(value: string) => {
          onchangeValue(value);
        }}
      />
    </View>
  );
}
export function ItemInput({
  label,
  value,
  onChangeValue,
}: DataInput): React.JSX.Element {
  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>
      <TextInput
        style={AppStyle.StyleRegister.input}
        value={value}
        onChangeText={(text) => {
          onChangeValue(text);
        }}
      />
    </View>
  );
}
export function ItemFile({
  label,
  onChangeValue,
  value,
}: DataInput): React.JSX.Element {
  const [fileName, setFileName] = useState<string | null>(null);
  const handleFileSelect = async () => {
    try {
      const response: DocumentPicker.DocumentPickerResult =
        await DocumentPicker.getDocumentAsync();

      if (response.assets) {
        console.log("ITEM FILE NHẬN DC: " + response.assets[0].name); // Log the file name
        console.log("ITEM FILE NHẬN DC: " + response.assets[0].uri); // Log the file name

        setFileName(response.assets[0].name);
        onChangeValue(response.assets[0].uri);
      } else {
        console.log("không nhận được"); // Log if no file is selected or the name is null
      }
    } catch (err) {
      // if (DocumentPicker.isCancel(err)) {
      //   console.log("User canceled the picker");
      // } else {
      //   throw err;
      // }
      console.log("User canceled the picker");
    }
  };
  const handlePressCancel = () => {
    setFileName(null);
    onChangeValue(null);
  };
  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>
      <TouchableOpacity
        style={[AppStyle.StyleRegister.button, AppStyle.StyleRegister.flexRow]}
        onPress={handleFileSelect}
      >
        <Text style={AppStyle.StyleRegister.textValue}>
          {fileName == null ? "Thêm tệp đính kèm" : fileName}
        </Text>
        {fileName && (
          <TouchableOpacity onPress={handlePressCancel}>
            <Image
              style={AppStyle.StyleRegister.ImgCancel}
              source={require("../assets/images/x.png")}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </View>
  );
}

export const ItemDateTime = ({ label, value, onChangeValue }: DataDateTime) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || value;
    setShow(Platform.OS === "ios");
    onChangeValue(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const showDatetimepicker = () => {
    showMode("datetime"); // Chỉ dành cho iOS
  };

  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>
      <View
        style={[
          AppStyle.StyleRegister.input,
          AppStyle.StyleRegister.dateTimePicker,
        ]}
      >
        <TouchableOpacity onPress={showTimepicker}>
          <Text style={AppStyle.StyleRegister.textInfo}>
            {value.getHours()}:{value.getMinutes()}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={AppStyle.StyleRegister.textInfo}>
            {value.getDate()}/{value.getMonth() + 1}/{value.getFullYear()}
          </Text>
        </TouchableOpacity>
      </View>
      {Platform.OS === "ios" && (
        <TouchableOpacity onPress={showDatetimepicker}>
          <Text style={AppStyle.StyleRegister.textInfo}>
            {value.getHours()}:{value.getMinutes()} {value.getDate()}/
            {value.getMonth()}/{value.getFullYear()}
          </Text>
        </TouchableOpacity>
      )}
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={value}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, item) => {
            onChange(event, item);
          }}
        />
      )}
    </View>
  );
};
export const ItemDate = ({ label }: DataInput) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode: React.SetStateAction<string>) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View style={AppStyle.StyleRegister.boxItem}>
      <Text style={AppStyle.StyleRegister.label}>{label}</Text>
      <View
        style={[
          AppStyle.StyleRegister.input,
          AppStyle.StyleRegister.dateTimePicker,
        ]}
      >
        <TouchableOpacity onPress={showDatepicker}>
          <Text style={AppStyle.StyleRegister.textInfo}>
            {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
          </Text>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={(event, item) => {
            onChange(event, item);
          }}
        />
      )}
    </View>
  );
};
