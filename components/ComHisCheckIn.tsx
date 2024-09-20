import Color from "@/constants/theme/Color";
import { selfstyle } from "@/constants/theme/StyleHistory";
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
    <View style={selfstyle.rowcalendar}>
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
  return (
    <View style={selfstyle.cellcalendar}>
      <Text
        style={[
          selfstyle.text_small,
          data.day == day && data.month == currmonth && year == curryear
            ? { color: Color.color3 }
            : data.month != month
            ? { color: "#ccc" }
            : {},
        ]}
      >
        {data.day}
      </Text>
      <View style={selfstyle.boxcheck}>
        <Text style={selfstyle.text_check}>
          {data.checkin ? data.checkin : ""}
        </Text>
        <Text style={selfstyle.text_check}>
          {data.checkout ? data.checkout : ""}
        </Text>
      </View>
    </View>
  );
}
