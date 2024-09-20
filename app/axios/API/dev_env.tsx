import { JwtPayload } from "jwt-decode";

export const serverAPI = process.env.EXPO_PUBLIC_API_URL;
export const apiKey = process.env.EXPO_PUBLIC_API_KEY;
export interface CustomJwtPayload extends JwtPayload {
    user_id: string;
}