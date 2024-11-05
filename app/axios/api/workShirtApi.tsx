import { getUrl } from "./api";
import { serverAPI } from "./dev_env";

export const getWorkShift = async () => {
  const url = `${serverAPI}/work-shifts`;
  return getUrl(url);
};
export const getWorkShiftByBranch = async (branchId: string, dateTime: string) => {
  const url = `${serverAPI}/work-shifts/branches/${branchId}?dateTime=${dateTime}`;
  return getUrl(url);
}
