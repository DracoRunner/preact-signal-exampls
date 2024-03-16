import { useLayoutEffect, useRef } from 'preact/hooks';
import styles from './style.module.css';
import data from './data';
import Lane from './Lane';
import Grid from './Grid';

export default () => {
  const gridRef = useRef(null);
  const vGrid = new Grid();

  const renderLane = () => {
    if (gridRef.current) {
      vGrid.gridRef = gridRef.current;
      vGrid.setLaneData(data);
      vGrid.renderLane();
    }
  };

  useLayoutEffect(() => {
    renderLane();
  }, []);

  return <div ref={gridRef} className={styles.gridContainer}></div>;
};
