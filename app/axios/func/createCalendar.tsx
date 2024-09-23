export type DayNameOfWeek = "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "CN";

export type HisCheckIn = {
  record_id: string; // ID của bản ghi
  user_id: string; // ID của người dùng
  user_name: string; // Tên người dùng
  image: string; // Đường dẫn đến hình ảnh
  position: string; // Chức vụ
  branch_name: string; // Tên chi nhánh
  branch_id: string; // ID của chi nhánh
  date_time: string; // Thời gian ghi nhận (ngày giờ)
  record_latitude: number; // Vĩ độ ghi nhận
  record_longitude: number; // Kinh độ ghi nhận
  branch_latitude: number; // Vĩ độ của chi nhánh
  branch_longitude: number; // Kinh độ của chi nhánh
  note: string; // Ghi chú
  start_time_of_work_shift: string; // Thời gian bắt đầu ca làm việc
  end_time_of_work_shift: string; // Thời gian kết thúc ca làm việc
  work_units: number; // Đơn vị làm việc (ví dụ: số giờ làm việc)
  department_name: string; // Tên phòng ban
  work_shift_name: string; // Tên ca làm việc
};


type DayData = {
  day: number;
  data: string[];
  start_time_of_work_shift?: string; // Thuộc tính mới
  end_time_of_work_shift?: string; // Thuộc tính mới
};
type DateHisCheckInMonth = {
  month: number;
  datamonth: DayData[];
};
export type DateHisCheckIn = {
  year: number;
  datayear: DateHisCheckInMonth[];
};
type CalendarDayCheckIn = {
  checkin: string;
  checkout: string;
  day: number;
  month: number;
  start_time_of_work_shift: string; // Thêm thuộc tính này
  end_time_of_work_shift: string;     // Thêm thuộc tính này
};
export type CalendarWeekCheckIn = {
  T2: CalendarDayCheckIn;
  T3: CalendarDayCheckIn;
  T4: CalendarDayCheckIn;
  T5: CalendarDayCheckIn;
  T6: CalendarDayCheckIn;
  T7: CalendarDayCheckIn;
  CN: CalendarDayCheckIn;
};

export type CalendarCheckIn = {
  month: number;
  year: number;
  calendar: CalendarWeekCheckIn[];
};
export const handleSplitHisCheckIn = async (
  data: HisCheckIn[]
): Promise<DateHisCheckIn[]> => {
  let result: DateHisCheckIn[] = [];

  data.forEach((item) => {
    const dateTime = item.date_time;
    const [date, time] = dateTime.split(" ");
    const [itemday, itemmonth, itemyear] = date.split("/").map(Number);
    const [hour, minute] = time.split(":");

    let yearData = result.find((y) => y.year === itemyear);
    if (yearData) {
      let monthData = yearData.datayear.find((m) => m.month === itemmonth);
      if (monthData) {
        let dayData = monthData.datamonth.find((d) => d.day === itemday);
        if (dayData) {
          dayData.data.push(`${hour}:${minute}`);
        } else {
          monthData.datamonth.push({
            day: itemday,
            data: [`${hour}:${minute}`],
            start_time_of_work_shift: item.start_time_of_work_shift, // Lưu start_time_of_work_shift
            end_time_of_work_shift: item.end_time_of_work_shift, // Lưu end_time_of_work_shift
          });
        }
      } else {
        yearData.datayear.push({
          month: itemmonth,
          datamonth: [{
            day: itemday,
            data: [`${hour}:${minute}`],
            start_time_of_work_shift: item.start_time_of_work_shift, // Lưu start_time_of_work_shift
            end_time_of_work_shift: item.end_time_of_work_shift, // Lưu end_time_of_work_shift
          }],
        });
      }
    } else {
      result.push({
        year: itemyear,
        datayear: [
          {
            month: itemmonth,
            datamonth: [{
              day: itemday,
              data: [`${hour}:${minute}`],
              start_time_of_work_shift: item.start_time_of_work_shift, // Lưu start_time_of_work_shift
              end_time_of_work_shift: item.end_time_of_work_shift, // Lưu end_time_of_work_shift
            }],
          },
        ],
      });
    }
  });
  return result;
};

const getSunDayOfWeek = (date: Date) => {
  const dayOfWeek = date.getDay();
  let result = new Date(date);
  if (dayOfWeek !== 0) {
    result.setDate(result.getDate() - dayOfWeek);
  }
  return result;
};

export const getCalendarCheckIn = async (
  month: number,
  year: number,
  dateHisCheckIn: DateHisCheckIn[],
) => {
  let data: CalendarCheckIn = { month: month, year: year, calendar: [] };
  const dataYearHis = dateHisCheckIn.find((y) => y.year === year);
  const day = 1;
  let i = 0;
  while (true) {
    const date = new Date(year, month - 1, day + i * 7);
    const SundayofWeek = getSunDayOfWeek(date);

    if (
      (SundayofWeek.getFullYear() > year && date.getFullYear() > year) ||
      (SundayofWeek.getMonth() > month - 1 && date.getMonth() > month - 1)
    ) {
      break;
    }

    const dataweek = await getWeekCheckIn(date, dataYearHis);
    data.calendar.push(dataweek);
    i = i + 1;
  }
  return data;
};
const getWeekCheckIn = (
  date: Date,
  dataYearHis: DateHisCheckIn | undefined
) => {
  let dataweek: CalendarWeekCheckIn = {
    T2: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
    T3: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
    T4: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
    T5: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
    T6: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
    T7: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
    CN: { checkin: "", checkout: "", day: 0, month: 0, start_time_of_work_shift: "", end_time_of_work_shift: "" },
  };
  const days: DayNameOfWeek[] = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

  //const dayOfWeek = date.getDay();
  const startDate = getSunDayOfWeek(date);

  dataweek.CN.day = startDate.getDate();
  dataweek.CN.month = startDate.getMonth() + 1;

  for (let i = 1; i <= 6; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + i);
    const newday = newDate.getDate();
    const newmonth = newDate.getMonth() + 1;
    const dayName = days[i % 7];

    
    dataweek[dayName].day = newDate.getDate();
    dataweek[dayName].month = newDate.getMonth() + 1;

    let monthData = dataYearHis?.datayear.find((m) => m.month === newmonth);
    let dayData = monthData?.datamonth.find((d) => d.day === newday);
    if (dayData) {
      if (dayData.data.length >= 1) {
        dataweek[dayName].checkin = dayData.data[0];
      }
      if (dayData.data.length >= 2) {
        dataweek[dayName].checkout = dayData.data[1];
      }
      dataweek[dayName].start_time_of_work_shift = dayData.start_time_of_work_shift ?? ''; // Thêm
      dataweek[dayName].end_time_of_work_shift = dayData.end_time_of_work_shift ?? '';     
    }
  }

  return dataweek;
};
