import { Buffer } from "buffer";
export const getUserIdFromAccessToken = (accessToken: string) => {
  const parts = accessToken
    .split(".")
    .map((part) =>
      Buffer.from(
        part.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

  const payload = JSON.parse(parts[1]);
  return payload.user_id;
};
export const getExpiredTimeFromAccessToken = (accessToken: string) => {
  const parts = accessToken
    .split(".")
    .map((part) =>
      Buffer.from(
        part.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

  const payload = JSON.parse(parts[1]);
  return payload.expired_at;
};
export const getRoleIdFromAccessToken = (accessToken: string) => {
  const parts = accessToken
    .split(".")
    .map((part) =>
      Buffer.from(
        part.replace(/-/g, "+").replace(/_/g, "/"),
        "base64"
      ).toString()
    );

  const payload = JSON.parse(parts[1]);
  return payload.roles[0].id;
};
