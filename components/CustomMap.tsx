import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Alert } from 'react-native';
import { LeafletView, LatLng, MapShapeType } from 'react-native-leaflet-view';
import Geolocation from '@react-native-community/geolocation';
import hasLocationPermission from '@/app/map/locationPermission';
import generateCircleCoordinates from '@/app/map/circle';
import { useDispatch, useSelector } from 'react-redux';
import { setLocation } from '@/app/state/reducers/locationSlice';

const DEFAULT_COORDINATE: LatLng = {
  lat: 10.781271,
  lng: 106.668863,
};

const CustomMap = ({ showCir, location_business }: any) => {
  const [location, setLocationState] = useState<LatLng>(DEFAULT_COORDINATE);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const coordinates = useSelector((state: any) => state.location.coordinates);
  const radius = 50; // Bán kính hình tròn (mét)
  const numPoints = 256; // Số điểm để vẽ hình tròn

  const businessLocation = [
    location_business.lng, // Longitude
    location_business.lat, // Latitude
  ];

  const circleCoordinates = generateCircleCoordinates(businessLocation, radius, numPoints);
  const dispatch = useDispatch();
  

  const getLocation = async () => {
    const hasPermission = await hasLocationPermission();
    if (!hasPermission) {
      Alert.alert("Permission denied", "Vui lòng cấp quyền truy cập vị trí để tiếp tục.");
      setIsLoading(false);
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setLocationState(newLocation);
        dispatch(setLocation(newLocation)); // Cập nhật vào Redux
        setIsLoading(false);
      },
      (error) => {
        switch (error.code) {
          case 1:
            console.log("Permission denied: Vui lòng cấp quyền truy cập vị trí.");
            break;
          case 2:
            console.log("Position unavailable: Không thể xác định vị trí.");
            break;
          case 3:
            console.log("Timeout: Quá thời gian yêu cầu vị trí.");
            break;
          default:
            console.log("Lỗi không xác định:", error.message);
        }
      },
      { enableHighAccuracy: false, timeout: 30000, maximumAge: 10000 }
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLocation();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <LeafletView
        mapCenterPosition={coordinates || location}
        zoom={17}
        mapMarkers={[
          {
            position: coordinates || location,
            icon: '📍',
            id: 'user_marker',
          },
          {
            position: location_business,
            icon: '🏢',
            id: 'business_marker',
          },
        ]}
        mapShapes={
          showCir
            ? [
                {
                  shapeType: MapShapeType.POLYGON,
                  positions: circleCoordinates,
                  color: 'rgba(0, 122, 255, 0.2)',
                },
              ]
            : []
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default CustomMap;
