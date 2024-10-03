import { getUrl } from "./api";
import { serverAPI } from "./dev_env";

export const getImageUrl = async (id: string) => {
    try {
        const url = `${serverAPI}/api/v1/sign-url/${id}`;
        return getUrl(url);
    } catch (error) {
        console.error(error);
        throw new Error("An unknown error occurred.");
    }
}