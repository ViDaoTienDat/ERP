import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { Stack, useFocusEffect, useRouter } from "expo-router";

export default function _layout() {
  const route = useRouter();

  useFocusEffect(
    useCallback(() => {
      route.navigate("/(tabs)/checkin/checkinTab");
    }, [])
  );
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="checkinTab" />
      <Stack.Screen name="checkinDetailHistory" />
    </Stack>
  );
}
