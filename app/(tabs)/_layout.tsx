import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Color from "@/constants/theme/Color";
import { HomeIcon, CheckInIcon } from "@/components/CustomIcon";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
          marginBottom: 0,
        },
        tabBarActiveTintColor: Color.color3,
        tabBarInactiveTintColor: Color.color2,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Trang Chủ",
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="checkin"
        options={{
          tabBarLabel: "Chấm công",
          tabBarIcon: ({ focused }) => <CheckInIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
