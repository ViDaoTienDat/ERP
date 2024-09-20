import { serverAPI } from './dev_env';
import { getUrl } from './api';

export const getAllBranch = async () => {
  const url = `${serverAPI}/api/v1/branches`;
  return getUrl(url);
};