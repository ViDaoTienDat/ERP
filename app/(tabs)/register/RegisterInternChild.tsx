import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

import { useSelector } from "react-redux";
import AppStyle from "@/constants/theme";
import { RowResIntern } from "@/components/TableIntern";
import {
  getInternSchedule,
  InternScheduleWeek,
} from "@/app/axios/func/createInternSchedule";

const currdate = new Date();

function RegisterInternChild(): React.JSX.Element {
  const dataIntern = useSelector((state: any) => state.userdata.dataIntern);
  const [datamonth, setdatamonth] = useState<InternScheduleWeek[]>([]);
  const [currmonth, setcurrmonth] = useState(currdate.getMonth() + 1);
  const [curryear, setcurryear] = useState(currdate.getFullYear());

  const getNewMonth = async (newmonth: any, year: any) => {
    const calendardata = await getInternSchedule(newmonth, year, dataIntern);

    setdatamonth(calendardata.schedule);
    setcurryear(calendardata.year);
    setcurrmonth(calendardata.month);
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
    getNewMonth(currmonth, curryear);
  }, [dataIntern]);
  return (
    <View style={{ flex: 1 }}>
      <View style={AppStyle.StyleHistory.boxmonth}>
        <TouchableOpacity
          style={AppStyle.StyleHistory.button}
          onPress={handlePressBack}
        >
          <Image
            style={AppStyle.StyleHistory.icon}
            source={require("../../../assets/images/arrow-sm-left.png")}
          />
        </TouchableOpacity>
        <Text style={AppStyle.StyleHistory.text_large}>
          Tháng {currmonth}, {curryear}
        </Text>
        <TouchableOpacity
          style={[AppStyle.StyleHistory.button, {justifyContent: "flex-end", flexDirection: "row", alignItems: "center"}]}
          onPress={handlePressNext}
        >
          <Image
            style={AppStyle.StyleHistory.icon}
            source={require("../../../assets/images/arrow-sm-right.png")}
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
        <ScrollView
          style={AppStyle.StyleHistory.boxcalendar}
          showsVerticalScrollIndicator={false}
        >
          {datamonth.map((item: { [key: string]: any }, idx) => {
            return (
              <RowResIntern
                key={idx}
                data={item}
                month={currmonth}
                year={curryear}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

export default RegisterInternChild;
