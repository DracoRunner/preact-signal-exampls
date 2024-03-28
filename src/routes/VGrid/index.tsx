import { useLayoutEffect, useRef } from 'preact/hooks';
import Grid from './Grid';
import './style.css';
import { getCarousels } from './services';

export default () => {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (gridRef.current) {
      const vGrid = new Grid(gridRef.current, getCarousels);
      window.addEventListener('keydown', vGrid.handleKeyDown);

      return () => {
        window.removeEventListener('keydown', vGrid.handleKeyDown);
      };
    }
  }, []);

  return <div ref={gridRef} className="grid-container"></div>;
};
