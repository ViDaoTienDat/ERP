const getDayOfWeek = (date: Date) => {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  return days[date.getDay()];
};

// Hàm để định dạng ngày hiện tại
export const getFormattedDate = () => {
  const today = new Date();
  const dayOfWeek = getDayOfWeek(today);
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = today.getFullYear();

  return `${dayOfWeek}, ${day}/${month}/${year}`;
};
export const getCurrentTime = () => {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};
export const getFormatDateTimeCheckIn = () => {
  const today = new Date();

  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = today.getFullYear();

  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
export const formatDateToLocal = (date: Date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
};
