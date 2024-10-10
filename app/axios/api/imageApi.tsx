import axios from "axios";
import { apiKey, serverAPI } from "./dev_env";

export const getImageUrl = async (id: string) => {
  try {
    const url = `${serverAPI}/api/v1/images/${id}`;

    const response = await axios.get(url, {
      headers: {
        "x-api-key": apiKey,
      },
      responseType: "blob",
    });
    
    const base64String = await convertBlobToBase64(response.data);
    return base64String; // Trả về chuỗi Base64
  } catch (error) {
    console.log("Error fetching image:", error);
    throw new Error("An unknown error occurred.");
  }
};


const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReaderInstance = new FileReader();
    
    fileReaderInstance.onloadend = () => {
      const base64data = fileReaderInstance.result as string;
      resolve(base64data);
    };

    fileReaderInstance.onerror = (error) => {
      console.error("Error reading blob:", error);
      reject(new Error("Failed to convert blob to Base64."));
    };

    fileReaderInstance.readAsDataURL(blob);
  });
};
