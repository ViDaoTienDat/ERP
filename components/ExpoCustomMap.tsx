import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import * as Location from "expo-location";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";
console.log("🚀 ~ PROVIDER_GOOGLE:", PROVIDER_GOOGLE);
import { useDispatch } from "react-redux";
import { setLocation } from "@/app/state/reducers/locationSlice";
type Location = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
const ExpoCustomMap = ({ showCir, location_business }: any) => {
  const [location, setLocationState] = useState<Location>();
  const dispatch = useDispatch();
  const getLocation = async () => {
    let loc = await Location.getCurrentPositionAsync({});
    setLocationState({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.001, // Zoom level
      longitudeDelta: 0.001, // Zoom level
    });
    const newLocation = {
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    };
    dispatch(setLocation(newLocation)); // Cập nhật vào Redux
  };
  useEffect(() => {
    getLocation();
    const interval = setInterval(() => {
      getLocation();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  if (!location) {
    return <Text>Getting location...</Text>;
  }

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={{ flex: 1 }}
      initialRegion={location}
    >
      <Marker
        coordinate={{
          latitude: location.latitude,
          longitude: location.longitude,
        }}
        title="You are here"
      >
        <View style={styles.markerContainer}>
          <View style={styles.marker} />
        </View>
      </Marker>
      <Marker
        coordinate={{
          latitude: location_business.lat,
          longitude: location_business.lng,
        }}
        title="Company here"
      ></Marker>
      {showCir && (
        <Circle
          center={{
            latitude: location_business.lat,
            longitude: location_business.lng,
          }}
          radius={50} // Radius in meters
          strokeColor="rgba(0,0,255,0.5)" // Color of the circle's border
          fillColor="rgba(0,0,255,0.1)" // Color of the circle's fill
          strokeWidth={2} // Border width
        />
      )}
    </MapView>
  );
};
const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 3,
  },
  loading: {
    position: "absolute",
    top: "50%",
  },
  loading_background: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default ExpoCustomMap;
