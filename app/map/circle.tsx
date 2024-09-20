const generateCircleCoordinates = (center: number[], radius: number, numPoints: number) => {
  const coordinates = [];
  const earthRadius = 6371000; // Bán kính Trái Đất (mét)
  const latRad = (center[1] * Math.PI) / 180; // Chuyển đổi vĩ độ sang radian

  for (let i = 0; i < numPoints; i++) {
    const angle = (i * 360) / numPoints; // Tính góc cho mỗi điểm
    const radians = (angle * Math.PI) / 180; // Chuyển đổi góc từ độ sang radian

    // Tính toán tọa độ vĩ độ và kinh độ
    const latOffset = (radius / earthRadius) * Math.sin(radians);
    const lngOffset = (radius / (earthRadius * Math.cos(latRad))) * Math.cos(radians);

    const lat = center[1] + (latOffset * 180) / Math.PI;
    const lng = center[0] + (lngOffset * 180) / Math.PI;

    coordinates.push({ lat, lng }); // Thêm tọa độ vào mảng
  }

  coordinates.push(coordinates[0]); // Đóng vòng tròn bằng cách thêm điểm đầu tiên vào cuối mảng
  return coordinates; // Trả về mảng tọa độ
};

export default generateCircleCoordinates;
