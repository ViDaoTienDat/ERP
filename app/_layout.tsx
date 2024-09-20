import { Stack } from "expo-router";

import { store } from "./state/store";
import { Provider } from "react-redux";
export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
}
