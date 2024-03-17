import { VGridConfig } from './config';

export const getLaneConfig = (type: string) => {
  return VGridConfig[type];
};
