import { getScaledPx } from '@utils/index';

export type Config = {
  laneHeight: number;
  itemHeight: number;
  color: string;
  itemWidth: number;
  scrollBoundary: number;
  spaceBetweenLane: number;
};

export const VGridConfig: { [key: string]: Config } = {
  movie: {
    laneHeight: getScaledPx(300, true),
    itemHeight: getScaledPx(270, true),
    itemWidth: getScaledPx(150),
    color: 'red',
    scrollBoundary: 9,
    spaceBetweenLane: getScaledPx(10, true),
  },
  show: {
    laneHeight: getScaledPx(400, true),
    itemHeight: getScaledPx(350, true),
    itemWidth: getScaledPx(300),
    scrollBoundary: 5,
    color: 'yellow',
    spaceBetweenLane: getScaledPx(10, true),
  },
  spotlight: {
    laneHeight: getScaledPx(250, true),
    itemHeight: getScaledPx(300, true),
    itemWidth: getScaledPx(250),
    color: 'blue',
    scrollBoundary: 7,
    spaceBetweenLane: getScaledPx(10, true),
  },
};
