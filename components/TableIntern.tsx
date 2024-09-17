import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import React, { useEffect, useState } from "react";
import Dimension from "@/constants/theme/Dimension";
import AppStyle from "@/constants/theme";
import Color from "@/constants/theme/Color";
import { getSunDayOfWeek } from "@/app/axios/func/createInternSchedule";
import { ModalResIntern } from "./ModalRegisterIntern";
import { Colors } from "react-native/Libraries/NewAppScreen";

const height = Dimension.window.height;

type DataJson = {
  month: Number;
  year: Number;
  data: { [key: string]: any };
};
type DataCellIntern = {
  month: Number;
  curr: boolean;
  data: { [key: string]: any };
};
export function RowResIntern({
  data,
  month,
  year,
}: DataJson): React.JSX.Element {
  const [currweek, setCurrWeek] = useState(false);
  useEffect(() => {
    const newdate = getSunDayOfWeek(new Date());
    if (
      data.CN.register_day === newdate.getDate() &&
      data.CN.register_month === newdate.getMonth() + 1 &&
      data.CN.register_year === newdate.getFullYear()
    ) {
      setCurrWeek(true);
    }
  });
  return (
    <View style={AppStyle.StyleTable.rowcalendar}>
      <CellResInternDayOff data={data.CN} month={month} curr={currweek} />
      <CellResIntern data={data.T2} month={month} curr={currweek} />
      <CellResIntern data={data.T3} month={month} curr={currweek} />
      <CellResIntern data={data.T4} month={month} curr={currweek} />
      <CellResIntern data={data.T5} month={month} curr={currweek} />
      <CellResIntern data={data.T6} month={month} curr={currweek} />
      <CellResInternDayOff data={data.T7} month={month} curr={currweek} />
    </View>
  );
}
function CellResIntern({
  data,
  month,
  curr,
}: DataCellIntern): React.JSX.Element {
  const [addVisible, setAddVisible] = useState(false);
  const [add, setAdd] = useState(data.add);
  const today = new Date();

  const isToday = () => {
    return (
      today.getDate() == data.register_day &&
      today.getMonth() + 1 == data.register_month &&
      today.getFullYear() == data.register_year
    );
  };
  useEffect(() => {
    setAdd(data.add);
    if (data.register_shift) {
      setAdd(false);
    }
  }, [data]);
  return (
    <View style={AppStyle.StyleTable.cellcalendar}>
      <View
        style={[
          AppStyle.StyleTable.boxday,
          {
            borderRadius: 5,
            backgroundColor: isToday() ? Color.color3 : "#fff",
          },
        ]}
      >
        <Text
          style={[
            AppStyle.StyleTable.text_medium,
            {
              fontSize: 16,
              color: isToday()
                ? "#fff"
                : month == data.register_month
                ? "#000"
                : "#ccc",
            },
          ]}
        >
          {data.register_day}
        </Text>
      </View>
      <View style={AppStyle.StyleTable.boxValue}>
        {data.register_shift != "" && data.add ? (
          <TouchableOpacity
            style={AppStyle.StyleTable.boxValue}
            onPress={() => {
              setAddVisible(true);
            }}
          >
            {/*<Text style={[AppStyle.StyleTable.textValue, data.curr ? { color: Color.color3 } : {}]}>
                {data.location ? data.location : ''}
              </Text> */}
            <Text
              style={[
                AppStyle.StyleTable.textValue,
                curr ? { color: Color.color3 } : {},
              ]}
            >
              {data.start_time ? data.start_time : "--/--"}
            </Text>
            <Text
              style={[
                AppStyle.StyleTable.textValue,
                curr ? { color: Color.color3 } : {},
              ]}
            >
              {data.end_time ? data.end_time : "--/--"}
            </Text>
          </TouchableOpacity>
        ) : data.register_shift != "" ? (
          <View style={AppStyle.StyleTable.boxValue}>
            {/*<Text style={[AppStyle.StyleTable.textValue, data.curr ? { color: Color.color3 } : {}]}>
                  {data.location ? data.location : ''}
                </Text> */}
            <Text
              style={[
                AppStyle.StyleTable.textValue,
                curr ? { color: Color.color12 } : {},
              ]}
            >
              {data.start_time ? data.start_time : "--/--"}
            </Text>
            <Text
              style={[
                AppStyle.StyleTable.textValue,
                curr ? { color: Color.color12 } : {},
              ]}
            >
              {data.end_time ? data.end_time : "--/--"}
            </Text>
          </View>
        ) : data.add && month == data.register_month ? (
          <TouchableOpacity
            style={[AppStyle.StyleTable.boxButton, { backgroundColor: "#fff" }]}
            onPress={() => {
              setAddVisible(true);
            }}
          >
            <Image
              style={AppStyle.StyleTable.imgButton}
              source={require("../assets/images/plus.png")}
            />
          </TouchableOpacity>
        ) : (
          <View style={AppStyle.StyleTable.boxValue}>
            <Text style={[AppStyle.StyleTable.textValue]}>
              {data.start_time ? data.start_time : ""}
            </Text>
            <Text style={[AppStyle.StyleTable.textValue]}>
              {data.end_time ? data.end_time : ""}
            </Text>
          </View>
        )}
      </View>

      <ModalResIntern
        visiable={addVisible}
        add={add}
        defaultDate={
          new Date(
            data.register_year,
            data.register_month - 1,
            data.register_day
          )
        }
        funcHide={() => {
          setAddVisible(false);
        }}
        onChangeSchedule={() => {}}
      />
    </View>
  );
}
function CellResInternDayOff({
  data,
  month,
  curr,
}: DataCellIntern): React.JSX.Element {
  const [addVisible, setAddVisible] = useState(false);
  const [add, setAdd] = useState(true);
  const today = new Date();
  useEffect(() => {
    if (data.register_shift) {
      setAdd(false);
    }
  }, []);
  const isToday = () => {
    return (
      today.getDate() == data.register_day &&
      today.getMonth() + 1 == data.register_month &&
      today.getFullYear() == data.register_year
    );
  };
  return (
    <View style={AppStyle.StyleTable.cellcalendar}>
      <View
        style={[
          AppStyle.StyleTable.boxday,
          {
            borderRadius: 5,
            backgroundColor: isToday() ? Color.color3 : "#fff",
          },
        ]}
      >
        <Text
          style={[
            AppStyle.StyleTable.text_medium,
            {
              fontSize: 16,
              color: isToday()
                ? "#fff"
                : month == data.register_month
                ? "#000"
                : "#ccc",
            },
          ]}
        >
          {data.register_day}
        </Text>
      </View>
      <View style={AppStyle.StyleTable.boxValue}></View>
      {/* <ModalResIntern
        visiable={addVisible}
        add={add}
        defaultDate={
          new Date(
            data.register_year,
            data.register_month - 1,
            data.register_day
          )
        }
        funcHide={() => {
          setAddVisible(false);
        }}
      /> */}
    </View>
  );
}
