import { useLayoutEffect, useRef } from 'preact/hooks';
import Grid from './Grid';
import './style.css';
import { getAllCategory } from './services';

export default () => {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (gridRef.current) {
      const vGrid = new Grid(gridRef.current, getAllCategory);
    }
  }, []);

  return <div ref={gridRef} className="grid-container"></div>;
};
