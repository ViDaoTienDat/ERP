import * as SecureStore from "expo-secure-store";
export const storeToken = async (accessToken: string, refreshToken: string) => {
  try {
    // console.log("storeToken access token: " + accessToken);
    await SecureStore.setItemAsync("access", accessToken);
    await SecureStore.setItemAsync("refresh", refreshToken);
  } catch (error) {
    console.error("Failed to save tokens securely", error);
  }
};

export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("access");
    // console.log("getTokens access token: " + accessToken);
    const refreshToken = await SecureStore.getItemAsync("refresh");
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Failed to retrieve tokens securely", error);
    return { accessToken: null, refreshToken: null };
  }
};
