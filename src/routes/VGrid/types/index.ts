import Observable from './Observable';

export type GridItem = {
  modal: string;
  title: string;
};

export type Config = {
  laneHeight: number;
  itemHeight: number;
  color: string;
  itemWidth: number;
  scrollBoundary: number;
  spaceBetweenLane: number;
};

export { Observable };
