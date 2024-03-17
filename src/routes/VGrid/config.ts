import { getScaledPx } from '@utils/index';

export type LaneConfig = {
  height: number;
  color: string;
  width: number;
  scrollBoundary: number;
  spaceBetweenLane: number;
};

export const VGridConfig: { [key: string]: LaneConfig } = {
  movie: {
    height: getScaledPx(300, true),
    width: getScaledPx(200),
    color: 'red',
    scrollBoundary: 9,
    spaceBetweenLane: getScaledPx(10, true),
  },
  show: {
    height: getScaledPx(400, true),
    width: getScaledPx(250),
    scrollBoundary: 7,
    color: 'yellow',
    spaceBetweenLane: getScaledPx(10, true),
  },
  spotlight: {
    height: getScaledPx(250, true),
    width: getScaledPx(250),
    color: 'blue',
    scrollBoundary: 7,
    spaceBetweenLane: getScaledPx(10, true),
  },
};
