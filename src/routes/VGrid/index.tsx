import { useLayoutEffect, useRef } from 'preact/hooks';
import './style.css';
import { getCarousels } from './services';
import VirtualizedGrid from './baseClasses/VirtualizedGrid';

export default () => {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (gridRef.current) {
      const vGrid = new VirtualizedGrid(gridRef.current, getCarousels);
      window.addEventListener('keydown', vGrid.handleKeyDown);

      return () => {
        window.removeEventListener('keydown', vGrid.handleKeyDown);
      };
    }
  }, []);

  return <div ref={gridRef} className="grid-container"></div>;
};
