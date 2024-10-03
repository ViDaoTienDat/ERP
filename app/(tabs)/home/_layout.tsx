import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="homeTab" />
      <Stack.Screen name="profileTab" />
      <Stack.Screen name="profileDetail"/>
      <Stack.Screen name="notification" />
    </Stack>
  );
}
