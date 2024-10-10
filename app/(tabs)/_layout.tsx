import { View, Text } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import Color from "@/constants/theme/Color";
import {
  HomeIcon,
  CheckInIcon,
  RegisterIcon,
  ApplicationIcon,
} from "@/components/CustomIcon";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "bold",
          marginBottom: 0,
        },
        // tabBarStyle: {
        //   paddingVertical: 10,
        // },
        tabBarActiveTintColor: Color.color3,
        tabBarInactiveTintColor: Color.color2,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Trang chủ",
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
      <Tabs.Screen
        name="register"
        options={{
          tabBarLabel: "Đăng ký",
          tabBarIcon: ({ focused }) => <RegisterIcon focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="application"
        options={{
          tabBarLabel: "Ứng dụng",
          tabBarIcon: ({ focused }) => <ApplicationIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}
