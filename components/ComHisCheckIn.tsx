import { StyleSheet, Text, View } from "react-native";
import Color from "../constants/theme/Color";
import Dimension from "../constants/theme/Dimension";
import { StyleHistory } from "../constants/theme/StyleHistory";

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
    <View style={StyleHistory.rowcalendar}>
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
    <View style={StyleHistory.cellcalendar}>
      <Text
        style={[
          StyleHistory.text_small,
          data.day == day && data.month == currmonth && year == curryear
            ? { color: Color.color3 }
            : data.month != month
            ? { color: "#ccc" }
            : {},
        ]}
      >
        {data.day}/{data.month}
      </Text>
      <View style={StyleHistory.boxcheck}>
        <Text style={StyleHistory.text_check}>
          {data.checkin ? data.checkin : ""}
        </Text>
        <Text style={StyleHistory.text_check}>
          {data.checkout ? data.checkout : ""}
        </Text>
      </View>
    </View>
  );
}
