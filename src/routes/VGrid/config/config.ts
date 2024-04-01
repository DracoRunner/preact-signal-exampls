import { getScaledPx } from '@utils/index';
import { Config } from '../types';

export const VGridConfig: { [key: string]: Config } = {
  movie: {
    laneHeight: getScaledPx(380, true),
    itemHeight: getScaledPx(340, true),
    itemWidth: getScaledPx(270),
    color: 'red',
    scrollBoundary: 9,
    spaceBetweenLane: getScaledPx(40, true),
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
