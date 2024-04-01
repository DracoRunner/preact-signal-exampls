import { VGridConfig } from '../config/config';

export const getLaneConfig = (type: string) => {
  return VGridConfig[type];
};
