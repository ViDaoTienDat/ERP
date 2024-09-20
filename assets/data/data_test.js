export const login = { email: "", password: "" };

export const caLamViec = [
  { label: "15/07/2024 08:30 - 12:00, GT - HCM", value: "0" },
];

export const data_cardbasic = [
  {
    id: 1,
    title: "Lịch sử làm việc",
    time: "Thứ 4, 26/06/2024",
    content: "289 ngày làm việc",
  },
  {
    id: 2,
    title: "Hồ sơ công việc",
    time: "Thứ 4, 26/06/2024",
    content: "Cập nhật hồ sơ mới",
  },
  {
    id: 3,
    title: "Thông báo nghỉ lễ",
    time: "Thứ 4, 26/06/2024",
    content: "Nghĩ tết Nguyên Đán",
  },
];

export const timeWork = [
  { label: "Ca sáng", value: "0" },
  { label: "Ca chiều", value: "1" },
  { label: "Cả ngày", value: "2" },
];

export const datahischeck = {
  2024: {
    5: {
      27: { checkin: "8:30", checkout: "18:00" },
      28: { checkin: "8:30", checkout: "18:00" },
      29: { checkin: "8:30", checkout: "18:00" },
      30: { checkin: "8:30", checkout: "18:00" },
      31: { checkin: "8:30", checkout: "18:00" },
    },
    6: {
      3: { checkin: "8:30", checkout: "18:00" },
      4: { checkin: "8:30", checkout: "18:00" },
      5: { checkin: "8:30", checkout: "18:00" },
      6: { checkin: "8:30", checkout: "18:00" },
      7: { checkin: "8:30", checkout: "18:00" },

      10: { checkin: "8:30", checkout: "18:00" },
      11: { checkin: "8:30", checkout: "18:00" },
      12: { checkin: "8:30", checkout: "18:00" },
      13: { checkin: "8:30", checkout: "18:00" },
      14: { checkin: "8:30", checkout: "18:00" },

      17: { checkin: "8:30", checkout: "18:00" },
      18: { checkin: "8:30", checkout: "18:00" },
      19: { checkin: "8:30", checkout: "18:00" },
      20: { checkin: "8:30", checkout: "18:00" },
      21: { checkin: "8:30", checkout: "18:00" },

      24: { checkin: "8:30", checkout: "18:00" },
      25: { checkin: "8:30", checkout: "18:00" },
      26: { checkin: "8:30", checkout: "18:00" },
      27: { checkin: "8:30", checkout: "18:00" },
      28: { checkin: "8:30", checkout: "18:00" },
    },
    7: {
      1: { checkin: "8:30", checkout: "18:00" },
      2: { checkin: "8:30", checkout: "18:00" },
      3: { checkin: "8:30", checkout: "18:00" },
      4: { checkin: "8:30", checkout: "18:00" },
      5: { checkin: "8:30", checkout: "18:00" },

      8: { checkin: "8:30", checkout: "18:00" },
      9: { checkin: "8:30" },
    },
  },
};

export const nguoitheodoi = [
  { name: "Nagi Bui", img: require("../images/avt.png") },
  { name: "Quan", img: require("../images/calendar.png") },
  { name: "Hung", img: require("../images/bell.png") },
  { name: "Viet", img: require("../images/x.png") },
  { name: "Quoc", img: require("../images/clock.png") },
  { name: "Truong", img: require("../images/user.png") },
  { name: "anh1", img: require("../images/camera.png") },
  { name: "B2", img: require("../images/rule.png") },
  { name: "F2", img: require("../images/home.png") },
  { name: "G2", img: require("../images/map.png") },
];

export const typeCheckIn = [{ label: "Chấm công", value: "0" }];
export const DDCC = [
  { label: "Văn phòng Hồ Bá Kiện", value: "0" },
  { label: "Văn phòng Gtel HCM", value: "1" },
];

export const datainternRes = {
  2024: {
    7: {
      15: { location: "GT-HCM", timeS: "8:30", timeE: "12:00" },
      16: { location: "HBK", timeS: "13:30", timeE: "18:00" },
      18: { location: "GT-HCM", timeS: "8:30", timeE: "12:00" },
      19: { location: "HBK", timeS: "13:30", timeE: "18:00" },

      22: { location: "HBK", timeS: "13:30", timeE: "18:00" },
      23: { location: "GT-HCM", timeS: "13:30", timeE: "17:30" },
      24: { location: "HBK", timeS: "9:00", timeE: "12:00" },
      26: { location: "GT-HCM", timeS: "8:30", timeE: "17:30" },

      29: { location: "HBK", timeS: "9:00", timeE: "12:00" },
      30: { location: "GT-HCM", timeS: "8:30", timeE: "17:30" },
    },
    8: {
      1: { location: "HBK", timeS: "9:00", timeE: "12:00" },
      5: { location: "HBK", timeS: "9:00", timeE: "12:00" },
    },
  },
};

export const dataReq = [
  { title: "Xin nghỉ 1 ngày", type: "Nghỉ phép", state: 1, date: "2024-07-23" },
  { title: "Xin làm việc ở nhà", type: "WFH", state: 2, date: "2024-07-23" },
  { title: "Onsite 1 ngày", type: "Onsite", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 2 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 3 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
  { title: "Xin làm việc ở nhà", type: "WFH", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 1 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 1 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 1 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 1 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
  { title: "Xin nghỉ 1 ngày", type: "Nghỉ phép", state: 0, date: "2024-07-23" },
];
