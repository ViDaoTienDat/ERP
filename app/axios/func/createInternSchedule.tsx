import { DayNameOfWeek } from "./createCalendar";

export type InternScheduleData = {
  branch_name: string;
  register_date: string;
  register_shift: string;
  start_time: string;
  end_time: string;
};

type InternScheduleDay = {
  branch_name: string;
  register_day: number;
  register_month: number;
  register_year: number;
  register_shift: string;
  start_time: string;
  end_time: string;
  add: boolean;
};
export type InternScheduleWeek = {
  T2: InternScheduleDay;
  T3: InternScheduleDay;
  T4: InternScheduleDay;
  T5: InternScheduleDay;
  T6: InternScheduleDay;
  T7: InternScheduleDay;
  CN: InternScheduleDay;
};

export type InternSchedule = {
  month: number;
  year: number;
  schedule: InternScheduleWeek[];
};

export const getSunDayOfWeek = (date: Date) => {
  const dayOfWeek = date.getDay();
  let result = new Date(date);
  if (dayOfWeek !== 0) {
    result.setDate(result.getDate() - dayOfWeek);
  }
  return result;
};
const formatBranchName = (name: string) => {
  if (name.includes("Gtel")) {
    return "Gtel";
  } else if (name.includes("Hồ Bá Kiện")) {
    return "HBK";
  } else {
    return name;
  }
};
const splitDateIntern = (data: InternScheduleData[]) => {
  let result: InternScheduleDay[] = [];
  data.map((item) => {
    const branchName = formatBranchName(item.branch_name);
    const [itemday, itemmonth, itemyear] = item.register_date
      .split("-")
      .map(Number);
    result.push({
      branch_name: branchName,
      register_day: itemday,
      register_month: itemmonth,
      register_year: itemyear,
      register_shift: item.register_shift,
      start_time: item.start_time,
      end_time: item.end_time,
      add: false,
    });
  });
  return result;
};

export const getInternSchedule = async (
  month: number,
  year: number,
  dataInternAPI: InternScheduleData[]
) => {
  let data: InternSchedule = { month: month, year: year, schedule: [] };
  const dataIntern = splitDateIntern(dataInternAPI);

  const dataInternMonth = dataIntern.filter(
    (y) => y.register_year === year && y.register_month === month
  );

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

    const dataweek = await getInternScheduleWeek(SundayofWeek, dataInternMonth);

    data.schedule.push(dataweek);
    i = i + 1;
  }
  return data;
};
const getInternScheduleWeek = (startDate: Date, data: InternScheduleDay[]) => {
  let dataweek: InternScheduleWeek = {
    T2: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
    T3: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
    T4: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
    T5: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
    T6: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
    T7: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
    CN: {
      branch_name: "",
      register_day: 0,
      register_month: 0,
      register_year: 0,
      register_shift: "",
      start_time: "",
      end_time: "",
      add: false,
    },
  };
  const days: DayNameOfWeek[] = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
  let add = false;
  const currdate = new Date();
  const sunofweek = getSunDayOfWeek(currdate);
  if (sunofweek < startDate) {
    add = true;
  }

  for (let i = 0; i < 7; i++) {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + i);
    const newday = newDate.getDate();
    const newmonth = newDate.getMonth() + 1;
    const dayName = days[i % 7];

    const internDay = data.filter(
      (y) => y.register_day === newday && y.register_month === newmonth
    );

    if (internDay.length > 0) {
      dataweek[dayName] = getCellDataIntern(internDay);
    } else {
      dataweek[dayName].register_day = newDate.getDate();
      dataweek[dayName].register_month = newDate.getMonth() + 1;
      dataweek[dayName].register_year = newDate.getFullYear();
    }
    dataweek[dayName].add = add;
  }

  return dataweek;
};

const getCellDataIntern = (internDay: InternScheduleDay[]) => {
  let result = internDay[0];

  let [hourStart, minuteStart] = internDay[0].start_time.split(":");
  let [hourEnd, minuteEnd] = internDay[0].end_time.split(":");
  internDay.map((item) => {
    const [hourS, minuteS] = item.start_time.split(":");
    const [hourE, minuteE] = item.end_time.split(":");

    if (hourS < hourStart || (hourS === hourStart && minuteS < minuteStart)) {
      hourStart = hourS;
      minuteStart = minuteS;
    }

    if (hourE > hourEnd || (hourE === hourEnd && minuteE > minuteEnd)) {
      hourEnd = hourE;
      minuteEnd = minuteE;
    }
  });

  result.start_time = `${hourStart}:${minuteStart}`;
  result.end_time = `${hourEnd}:${minuteEnd}`;
  return result;
};
