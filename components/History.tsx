import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import AppStyle from "@/constants/theme";
import { useSelector } from "react-redux";
import {
  CalendarWeekCheckIn,
  getCalendarCheckIn,
} from "@/app/axios/func/createCalendar";
import { RowCalendar } from "./ComHisCheckIn";

export default function History() {
  const currdate = new Date();
  const dateHisCheckIn = useSelector(
    (state: any) => state.userdata.dateHisCheckIn
  );
  const [datamonth, setdatamonth] = useState<CalendarWeekCheckIn[]>([]);
  const [currmonth, setcurrmonth] = useState(1);
  const [curryear, setcurryear] = useState(2024);

  const getNewMonth = async (newmonth: number, year: number) => {
    const calendardata = await getCalendarCheckIn(
      newmonth,
      year,
      dateHisCheckIn
    );
    setcurryear(calendardata.year);
    setcurrmonth(calendardata.month);
    setdatamonth(calendardata.calendar);
  };

  const handlePressBack = () => {
    if (currmonth - 1 <= 0) {
      getNewMonth(12, curryear - 1);
    } else {
      getNewMonth(currmonth - 1, curryear);
    }
  };
  const handlePressNext = () => {
    if (currmonth + 1 > 12) {
      getNewMonth(1, curryear + 1);
    } else {
      getNewMonth(currmonth + 1, curryear);
    }
  };
  useEffect(() => {
    getNewMonth(currdate.getMonth() + 1, currdate.getFullYear());
  }, []);
  const HandlePressTab = (num: Number) => {
    if (num === 0) {
    }
  };
  return (
    <View style={AppStyle.StyleCheckIn.boxContainer}>
      <View style={AppStyle.StyleHistory.boxmonth}>
        <TouchableOpacity
          style={AppStyle.StyleHistory.button}
          onPress={handlePressBack}
        >
          <Image
            style={AppStyle.StyleHistory.icon}
            source={require("../assets/images/backmonth.png")}
          />
        </TouchableOpacity>
        <Text style={AppStyle.StyleHistory.text_large}>
          Tháng {currmonth} {curryear}
        </Text>
        <TouchableOpacity
          style={AppStyle.StyleHistory.button}
          onPress={handlePressNext}
        >
          <Image
            style={AppStyle.StyleHistory.icon}
            source={require("../assets/images/nextmonth.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={AppStyle.StyleHistory.calendar}>
        <View style={AppStyle.StyleHistory.dayofweek}>
          <Text style={AppStyle.StyleHistory.text_medium}>CN</Text>
          <Text style={AppStyle.StyleHistory.text_medium}>T2</Text>
          <Text style={AppStyle.StyleHistory.text_medium}>T3</Text>
          <Text style={AppStyle.StyleHistory.text_medium}>T4</Text>
          <Text style={AppStyle.StyleHistory.text_medium}>T5</Text>
          <Text style={AppStyle.StyleHistory.text_medium}>T6</Text>
          <Text style={AppStyle.StyleHistory.text_medium}>T7</Text>
        </View>
        <ScrollView style={AppStyle.StyleHistory.boxcalendar}>
          {datamonth.map((item: { [key: string]: any }, idx) => (
            <RowCalendar
              key={idx}
              data={item}
              month={currmonth}
              year={curryear}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
