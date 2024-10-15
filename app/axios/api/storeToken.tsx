import * as SecureStore from "expo-secure-store";
export const storeToken = async (
  accessToken: string,
  refreshToken: string,
  forcePasswordChange: boolean = false
) => {
  try {
    // console.log("storeToken access token: " + accessToken);
    await SecureStore.setItemAsync("access", accessToken);
    await SecureStore.setItemAsync("refresh", refreshToken);
    await SecureStore.setItemAsync(
      "force_password_change",
      forcePasswordChange.toString()
    );
  } catch (error) {
    console.error("Failed to save tokens securely", error);
  }
};

export const getTokens = async () => {
  try {
    const accessToken = await SecureStore.getItemAsync("access");
    const refreshToken = await SecureStore.getItemAsync("refresh");
    const forcePasswordChange = await SecureStore.getItemAsync(
      "force_password_change"
    );
    return { accessToken, refreshToken, forcePasswordChange };
  } catch (error) {
    console.error("Failed to retrieve tokens securely", error);
    return { accessToken: null, refreshToken: null };
  }
};
