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
      <Stack.Screen name="index" />
      <Stack.Screen name="registerLOA" />
      <Stack.Screen name="registerOnSite" />
      <Stack.Screen name="registerWFH" />
      <Stack.Screen name="registerIntern" />
      <Stack.Screen name="registerForgot" />
    </Stack>
  );
}
