import { getUrl } from "./api";
import { serverAPI } from "./dev_env";
export const getAllBranch = async () => {
  const url = `${serverAPI}/branches`;
  return getUrl(url);
};
