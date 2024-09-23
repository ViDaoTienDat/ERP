import { getUrl } from "./api";
import { serverAPI } from "./dev_env";
export const getAllBranch = async () => {
  const url = `${serverAPI}/api/v1/branches`;
  return getUrl(url);
};
