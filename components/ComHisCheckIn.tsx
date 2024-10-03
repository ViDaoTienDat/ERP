import Color from "@/constants/theme/Color";
import AppStyle from "@/constants/theme";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

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
  const router = useRouter();
  const isToday = data.day == day && data.month == currmonth && year == curryear;
  const isDifferentMonth = data.month != month;

  // So sánh với ca làm việc
  const isLateForWorkShift = data.checkin.time > data.start_time_of_work_shift;
  const isEarlyForWorkShift = data.checkout.time < data.end_time_of_work_shift;

  // Function to navigate to checkinDetailHistory with necessary data
  const goToCheckinDetailHistory = (type: string) => {
    const detail = type === "checkin" ? data.checkin : data.checkout;

    router.push({
      pathname: '/(tabs)/checkin/checkinDetailHistory',
      params: {
        time: data.day + "/" + data.month + "/" + year + " " +   detail.time,
        image: detail.image,
        branch_name: data.branch_name,
        work_shift_name: data.work_shift_name,
        note: detail.note,
        record_latitude: detail.record_latitude,
        record_longitude: detail.record_longitude,
        branch_latitude: detail.branch_latitude,
        branch_longitude: detail.branch_longitude,
      },
    });
  };

  return (
    <View style={AppStyle.StyleHistory.cellcalendar}>
      <Text
        style={[
          AppStyle.StyleHistory.text_small,
          isToday
            ? { backgroundColor: Color.color_header_red, color: "white", borderRadius: 4 }
            : isDifferentMonth
            ? { color: "#ccc" }
            : {}
        ]}
      >
        {data.day}
      </Text>
      <View style={AppStyle.StyleHistory.boxcheck}>
        {/* Check-in Touchable */}
        <TouchableOpacity onPress={() => goToCheckinDetailHistory("checkin")}>
          <Text
            style={
              isLateForWorkShift
                ? AppStyle.StyleHistory.text_check_late
                : AppStyle.StyleHistory.text_check
            }
          >
            {data.checkin.time ? formatTime(data.checkin.time) :  ""}
          </Text>
        </TouchableOpacity>

        {/* Check-out Touchable */}
        <TouchableOpacity onPress={() => goToCheckinDetailHistory("checkout")}>
          <Text
            style={
              isEarlyForWorkShift
                ? AppStyle.StyleHistory.text_check_late
                : AppStyle.StyleHistory.text_check
            }
          >
            {data.checkout.time ? formatTime(data.checkout.time) : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":");
  return `${hours}:${minutes}`;
};
