import { getScaledPx } from '@utils/index';

export type LaneConfig = {
  height: number;
  color: string;
  width: number;
  scrollBoundary: number;
};

export const VGridConfig: { [key: string]: LaneConfig } = {
  movie: {
    height: getScaledPx(300, true),
    width: getScaledPx(200),
    color: 'red',
    scrollBoundary: 10,
  },
  show: {
    height: getScaledPx(400, true),
    width: getScaledPx(250),
    scrollBoundary: 7,
    color: 'yellow',
  },
  spotlight: {
    height: getScaledPx(250, true),
    width: getScaledPx(250),
    color: 'blue',
    scrollBoundary: 5,
  },
};
