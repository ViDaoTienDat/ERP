import { getUrl } from "./api";
import { serverAPI } from "./dev_env";

export const getWorkShift = async () => {
  const url = `${serverAPI}/work-shifts`;
  return getUrl(url);
};
