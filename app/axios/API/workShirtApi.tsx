import { serverAPI } from './dev_env';
import { getUrl } from './api';

export const getWorkShift = async () => {
  const url = `${serverAPI}/api/v1/work-shifts`;
  return getUrl(url);
};