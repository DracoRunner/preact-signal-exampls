import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import DBUtils from './baseClasses/DBUtils';
import VirtualizedGrid from './baseClasses/VirtualizedGrid';
import { getCarousels } from './services';
import './style.css';

export default () => {
  const gridRef = useRef(null);
  const [vGrid, setVGrid] = useState<VirtualizedGrid | null>(null);

  const createGrid = async () => {
    await DBUtils.initialize();
    const vGrid = new VirtualizedGrid(gridRef.current, getCarousels);
    setVGrid(vGrid);
  };

  useLayoutEffect(() => {
    if (gridRef.current && !vGrid) {
      createGrid();
    }
    if (vGrid) {
      window.addEventListener('keydown', vGrid.handleKeyDown);
      return () => {
        window.removeEventListener('keydown', vGrid.handleKeyDown);
      };
    }
  }, [vGrid]);

  return (
    <div className="container">
      <div ref={gridRef} className="grid-container"></div>
      <div className="grid-overlay"></div>
    </div>
  );
};
