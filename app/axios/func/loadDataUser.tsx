type DataWorkShift = {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  work_units: number;
  description: string;
  DaysOfSchedules: string | null;
};

export const splitWorkShift = (data: DataWorkShift[]) => {
  let result = data.map((item) => ({
    label: item.name,
    value: item.id,
    start_time: item.start_time,
    end_time: item.end_time,
    work_units: item.work_units,
    description: item.description,
    DaysOfSchedules: item.DaysOfSchedules,
  }));
  // result.push({
  //   label: 'Cả ngày',
  //   value: 'all',
  //   start_time: '',
  //   end_time: '',
  //   work_units: 0,
  //   description: '',
  //   DaysOfSchedules: null
  // })
  return result;
};
