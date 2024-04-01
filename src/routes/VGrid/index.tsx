import { useLayoutEffect, useRef } from 'preact/hooks';
import './style.css';
import { getCarousels } from './services';
import VirtualizedGrid from './baseClasses/VirtualizedGrid';
import CacheManager from './baseClasses/CacheManager';

export default () => {
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    if (gridRef.current) {
      const cacheManager = new CacheManager('Home', 'vGridCache');
      const vGrid = new VirtualizedGrid(gridRef.current, getCarousels, cacheManager);
      window.addEventListener('keydown', vGrid.handleKeyDown);

      return () => {
        window.removeEventListener('keydown', vGrid.handleKeyDown);
      };
    }
  }, []);

  return (
    <div className="container">
      <div ref={gridRef} className="grid-container"></div>
      <div className="grid-overlay"></div>
    </div>
  );
};
