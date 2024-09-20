import * as SecureStore from "expo-secure-store";
export const storeToken = async (accessToken: string, refreshToken: string) => {
  try {
    await SecureStore.setItemAsync("access", accessToken, {
      keychainService: "access",
    });
    await SecureStore.setItemAsync("refresh", refreshToken, {
      keychainService: "refresh",
    });
  } catch (error) {
    console.error("Failed to save tokens securely", error);
  }
};

export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("access", {
      keychainService: "access",
    });
    const refreshToken = await SecureStore.getItemAsync("refresh", {
      keychainService: "refresh",
    });
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Failed to retrieve tokens securely", error);
    return { accessToken: null, refreshToken: null };
  }
};
