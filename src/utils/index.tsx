export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;

const HORIZONTAL_MULTIPLY_RATIO = SCREEN_WIDTH / 1920;
const VERTICAL_MULTIPLY_RATIO = SCREEN_HEIGHT / 1080;
const MIN_VALUE = 1;

export const getScaledPx = (px: number, vertical = false): number => {
  const multiplyRatio = vertical ? VERTICAL_MULTIPLY_RATIO : HORIZONTAL_MULTIPLY_RATIO;
  const scaledValue = Math.floor(px * multiplyRatio) || MIN_VALUE;
  return scaledValue;
};
