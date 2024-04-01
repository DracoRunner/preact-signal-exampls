import { useLayoutEffect, useRef, useState } from 'preact/hooks';
import './style.css';
import { getCarousels } from './services';
import VirtualizedGrid from './baseClasses/VirtualizedGrid';
import CacheManager from './baseClasses/CacheManager';
import DBUtils from './baseClasses/DBUtils';

export default () => {
  const gridRef = useRef(null);
  const [vGrid, setVGrid] = useState<VirtualizedGrid | null>(null);

  const createGrid = async () => {
    await DBUtils.initialize();
    const cacheManager = new CacheManager();
    const vGrid = new VirtualizedGrid(gridRef.current, getCarousels, cacheManager);
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
