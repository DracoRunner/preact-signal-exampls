import { useLayoutEffect, useRef } from 'preact/hooks';
import Grid from './Grid';
import data from './data';
import './style.css';

export default () => {
  const gridRef = useRef(null);

  const renderLane = () => {
    if (gridRef.current) {
      const vGrid = new Grid(gridRef.current, data);
      vGrid.onFocus();
    }
  };

  useLayoutEffect(() => {
    renderLane();
  }, []);

  return <div ref={gridRef} className="grid-container"></div>;
};
