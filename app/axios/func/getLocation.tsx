// import hasLocationPermission from "@/app/map/locationPermission";
// import Geolocation, { GeolocationResponse } from "@react-native-community/geolocation";

// export const getLocation = async (): Promise<[number, number] | null> => {
//   const hasPermission = await hasLocationPermission();
//   if (!hasPermission) {
//     return null; // Trả về null nếu không có quyền truy cập vị trí
//   }
//   try {
//     const position: GeolocationResponse = await new Promise((resolve, reject) => {
//       Geolocation.getCurrentPosition(
//         resolve,
//         reject,
//         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//       );
//     });
//     // Trả về tọa độ (kinh độ, vĩ độ)
//     return [position.coords.longitude, position.coords.latitude];
//   } catch (error) {
//     console.log(error);
//     return null; // Trả về null nếu có lỗi xảy ra
//   }
// };
