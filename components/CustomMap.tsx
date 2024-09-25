import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "@/app/state/reducers/locationSlice";

const DEFAULT_COORDINATE = {
  lat: 10.781271,
  lng: 106.668863,
};

const CustomMap = ({ showCir, location_business }: any) => {
  const [location, setLocationState] = useState(DEFAULT_COORDINATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const coordinates = useSelector((state: any) => state.location.coordinates);
  const dispatch = useDispatch();

  // Hàm lấy vị trí hiện tại
  const getLocation = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== 'granted') {
    //   Alert.alert("Permission denied", "Vui lòng cấp quyền truy cập vị trí để tiếp tục.");
    //   setIsLoading(false);
    //   return;
    // }

    let location = await Location.getCurrentPositionAsync({});
    const newLocation = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };
    setLocationState(newLocation);
    dispatch(setLocation(newLocation)); // Cập nhật vào Redux
    setIsLoading(false);
  };

  useEffect(() => {
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Tạo mã HTML cho bản đồ Leaflet
  const leafletHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <style>
        #map { width: 100%; height: 100vh; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        var map = L.map('map').setView([${location.lat}, ${location.lng}], 18);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Đánh dấu vị trí người dùng
        L.marker([${location.lat}, ${location.lng}]).addTo(map)
          .bindPopup('Your Location')
          .openPopup();

        // Đánh dấu vị trí doanh nghiệp
        L.marker([${location_business.lat}, ${location_business.lng}]).addTo(map)
          .bindPopup('Business Location')
          .openPopup();
        
        // Vẽ hình tròn nếu showCir là true
        ${showCir ? `
          var circle = L.circle([${location_business.lat}, ${location_business.lng}], {
            color: 'rgba(0, 122, 255, 0.5)',
            fillColor: 'rgba(0, 122, 255, 0.2)',
            fillOpacity: 0.5,
            radius: 50 // Bán kính hình tròn (mét)
          }).addTo(map);
        ` : ''}
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: leafletHtml }}
        style={styles.map}
        scalesPageToFit={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default CustomMap;
// import React, { useEffect, useState } from "react";
// import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
// import { LeafletView, LatLng, MapShapeType } from "react-native-leaflet-view";
// import Geolocation from "@react-native-community/geolocation";
// import hasLocationPermission from "@/app/map/locationPermission";
// import generateCircleCoordinates from "@/app/map/circle";
// import { useDispatch, useSelector } from "react-redux";
// import { setLocation } from "@/app/state/reducers/locationSlice";
// import * as Location from "expo-location";
// const DEFAULT_COORDINATE: LatLng = {
//   lat: 10.781271,
//   lng: 106.668863,
// };

// const CustomMap = ({ showCir, location_business }: any) => {
//   const [location, setLocationState] = useState<LatLng>(DEFAULT_COORDINATE);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const coordinates = useSelector((state: any) => state.location.coordinates);
//   const radius = 50; // Bán kính hình tròn (mét)
//   const numPoints = 256; // Số điểm để vẽ hình tròn

//   const businessLocation = [
//     location_business.lng, // Longitude
//     location_business.lat, // Latitude
//   ];

//   const circleCoordinates = generateCircleCoordinates(
//     businessLocation,
//     radius,
//     numPoints
//   );
//   const dispatch = useDispatch();

//   //Sử dụng thư viện geolocation

//   // const getLocation = async () => {
//   //   const hasPermission = await hasLocationPermission();
//   //   if (!hasPermission) {
//   //     Alert.alert(
//   //       "Permission denied",
//   //       "Vui lòng cấp quyền truy cập vị trí để tiếp tục."
//   //     );
//   //     setIsLoading(false);
//   //     return;
//   //   }

//   //   Geolocation.getCurrentPosition(
//   //     (position) => {
//   //       const newLocation = {
//   //         lat: position.coords.latitude,
//   //         lng: position.coords.longitude,
//   //       };
//   //       setLocationState(newLocation);
//   //       dispatch(setLocation(newLocation)); // Cập nhật vào Redux
//   //       setIsLoading(false);
//   //     },
//   //     (error) => {
//   //       switch (error.code) {
//   //         case 1:
//   //           console.log(
//   //             "Permission denied: Vui lòng cấp quyền truy cập vị trí."
//   //           );
//   //           break;
//   //         case 2:
//   //           console.log("Position unavailable: Không thể xác định vị trí.");
//   //           break;
//   //         case 3:
//   //           console.log("Timeout: Quá thời gian yêu cầu vị trí.");
//   //           break;
//   //         default:
//   //           console.log("Lỗi không xác định:", error.message);
//   //       }
//   //     },
//   //     { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
//   //   );
//   // };

//   //Sử dụng expo-location

//   const getLocation = async () =>{
//     let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         //setErrorMsg('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       const newLocation = {
//         lat: location.coords.latitude,
//         lng: location.coords.longitude,
//       };
//       setLocationState(newLocation);
//       setIsLoading(false);
//       dispatch(setLocation(newLocation)); // Cập nhật vào Redux
//   }

//   useEffect(() => {
//     const interval = setInterval(() => {
//       getLocation();
//     }, 10000);

//     return () => clearInterval(interval);
//   }, []);

//   if (isLoading) {
//     return <Text>Loading...</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       <LeafletView
//         mapCenterPosition={coordinates || location}
//         zoom={17}
//         mapMarkers={[
//           {
//             position: coordinates || location,
//             icon: "📍",
//             id: "user_marker",
//           },
//           {
//             position: location_business,
//             icon: "🏢",
//             id: "business_marker",
//           },
//         ]}
//         mapShapes={
//           showCir
//             ? [
//                 {
//                   shapeType: MapShapeType.POLYGON,
//                   positions: circleCoordinates,
//                   color: "rgba(0, 122, 255, 0.2)",
//                 },
//               ]
//             : []
//         }
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   map: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//   },
// });

// export default CustomMap;

