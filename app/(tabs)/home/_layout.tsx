import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Stack, useFocusEffect, useRouter } from "expo-router";
export default function _layout() {
  const route = useRouter();

  useFocusEffect(
    useCallback(() => {
      route.navigate("/(tabs)/home/homeTab");
    }, [])
  );

  return (
    <Stack
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="homeTab" />
      <Stack.Screen name="profileTab" />
      <Stack.Screen name="profileDetail"/>
      <Stack.Screen name="notification" />
    </Stack>
  );
}
