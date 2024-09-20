import { serverAPI } from "./dev_env";
import { getUrl } from "./API";

export const getAllBranch = async () => {
  const url = `${serverAPI}/api/v1/branches`;
  return getUrl(url);
};
