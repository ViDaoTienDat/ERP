import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import MapView, { Circle, Marker, PROVIDER_GOOGLE } from "react-native-maps";

const ExpoCustomMap = ({ showCir, location_business, location }: any) => {

    if (!location && !location_business) {
        return <Text>Getting location...</Text>;
    }
    return (
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            initialRegion={{
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001,
            }}
            >
            <Marker
                coordinate={{
                latitude: location.lat,
                longitude: location.lng,
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
