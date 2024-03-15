import { useLayoutEffect, useRef } from 'preact/hooks';
import styles from './style.module.css';
import Navigation, { Lane } from './Navigation';
import data from './data';

const createLane = (item: any) => {
  const lane = new Lane(item);
  return lane;
};

export default () => {
  const gridRef = useRef(null);

  const renderLane = () => {
    if (gridRef.current) {
      Navigation.gridRef = gridRef.current;
      let laneYPosition = 0;
      data.forEach((item: any, index: number) => {
        const lane = createLane({ ...item, laneYPosition });
        gridRef.current.appendChild(lane.getLane());
        laneYPosition = lane.getNextLanePosition();
        Navigation.lanes.push(lane);
      });
    }
  };
  useLayoutEffect(() => {
    renderLane();
  }, []);

  return <div ref={gridRef} className={styles.gridContainer}></div>;
};
