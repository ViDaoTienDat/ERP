import Color from "@/constants/theme/Color";
import AppStyle from "@/constants/theme";
import { View, Text } from "react-native";

type DataJson = {
  month: Number;
  year: Number;
  data: { [key: string]: any };
};
const today = new Date();
const day = today.getDate();
const currmonth = today.getMonth() + 1;
const curryear = today.getFullYear();

export function RowCalendar({
  data,
  month,
  year,
}: DataJson): React.JSX.Element {
  return (
    <View style={AppStyle.StyleHistory.rowcalendar}>
      <CellCalendar data={data.CN} month={month} year={year} />
      <CellCalendar data={data.T2} month={month} year={year} />
      <CellCalendar data={data.T3} month={month} year={year} />
      <CellCalendar data={data.T4} month={month} year={year} />
      <CellCalendar data={data.T5} month={month} year={year} />
      <CellCalendar data={data.T6} month={month} year={year} />
      <CellCalendar data={data.T7} month={month} year={year} />
    </View>
  );
}
function CellCalendar({ data, month, year }: DataJson): React.JSX.Element {
  const isToday = data.day == day && data.month == currmonth && year == curryear;
  const isDifferentMonth = data.month != month;
 
  // So sánh với ca làm việc
  const isLateForWorkShift = data.checkin > data.start_time_of_work_shift;
  const isEarlyForWorkShift = data.checkout < data.end_time_of_work_shift;
  return (
    <View style={AppStyle.StyleHistory.cellcalendar}>
      <Text
        style={[
          AppStyle.StyleHistory.text_small,
          isToday
          ? { backgroundColor: Color.color_header_red, color: "white", paddingHorizontal: 5, paddingVertical: 5, borderRadius: 4 }
          : isDifferentMonth
          ? { color: "#ccc" }
          : {}
        ]}
      >
        {data.day}
      </Text>
      <View style={AppStyle.StyleHistory.boxcheck}>
        <Text style={isLateForWorkShift ? AppStyle.StyleHistory.text_check_late : AppStyle.StyleHistory.text_check  }>
          {data.checkin ? data.checkin : ""}
        </Text>
        <Text style={isEarlyForWorkShift ? AppStyle.StyleHistory.text_check_late : AppStyle.StyleHistory.text_check  }>
          {data.checkout ? data.checkout : ""}
        </Text>
      </View>
    </View>
  );
}
