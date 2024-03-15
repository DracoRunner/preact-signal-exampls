import { getScaledPx } from '@utils/index';

export const VGridConfig = {
  movie: {
    height: getScaledPx(300, true),
    width: getScaledPx(200),
    color: 'red',
    scrollBoundary: 5,
  },
  show: {
    height: getScaledPx(400, true),
    width: getScaledPx(250),
    scrollBoundary: 5,
    color: 'yellow',
  },
  spotlight: {
    height: getScaledPx(250, true),
    width: getScaledPx(200),
    color: 'blue',
    scrollBoundary: 5,
  },
};
