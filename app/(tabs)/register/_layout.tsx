import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { router, Stack, useFocusEffect, useRouter } from "expo-router";

export default function _layout() {
  const route = useRouter();

  useFocusEffect(
    useCallback(() => {
      route.navigate('/(tabs)/register/');
    }, [])
  );
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
