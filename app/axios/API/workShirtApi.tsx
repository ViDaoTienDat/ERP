import { serverAPI } from "./dev_env";
import { getUrl } from "./API";

export const getWorkShift = async () => {
  const url = `${serverAPI}/api/v1/work-shifts`;
  return getUrl(url);
};
