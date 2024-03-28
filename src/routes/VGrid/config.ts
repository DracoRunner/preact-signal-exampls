import { getScaledPx } from '@utils/index';

export type Config = {
  laneHeight: number;
  ItemHeight: number;
  color: string;
  width: number;
  scrollBoundary: number;
  spaceBetweenLane: number;
};

export const VGridConfig: { [key: string]: Config } = {
  showMovieHybrid: {
    laneHeight: getScaledPx(300, true),
    ItemHeight: getScaledPx(300, true),
    width: getScaledPx(200),
    color: 'red',
    scrollBoundary: 9,
    spaceBetweenLane: getScaledPx(10, true),
  },
  show: {
    laneHeight: getScaledPx(400, true),
    ItemHeight: getScaledPx(300, true),
    width: getScaledPx(250),
    scrollBoundary: 5,
    color: 'yellow',
    spaceBetweenLane: getScaledPx(10, true),
  },
  spotlight: {
    laneHeight: getScaledPx(250, true),
    ItemHeight: getScaledPx(300, true),
    width: getScaledPx(250),
    color: 'blue',
    scrollBoundary: 7,
    spaceBetweenLane: getScaledPx(10, true),
  },
};
