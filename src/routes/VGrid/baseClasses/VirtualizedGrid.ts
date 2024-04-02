import CacheManager from './CacheManager';
import Carousel from './Carousel';
import PaginationManager from './PaginationManager';

export default class VirtualizedGrid extends PaginationManager {
  private focusedLane: Carousel;
  private carouselList: Carousel[] = [];
  private container: HTMLElement;
  private initYPos = 0;

  constructor(gridRef: HTMLDivElement, fetchFn: Function, cacheManager: CacheManager) {
    super(fetchFn, 5, 1, cacheManager, 'home_grid');
    this.container = gridRef;

    this.initRenderCount.subscribe(this.renderLanes);
    this.handleScroll();
  }

  createCarousel = (item: any, yPos?: number) => {
    let lane = null;
    if (yPos) {
      lane = new Carousel(item, yPos, this.cacheManager);
    } else {
      lane = new Carousel(item, this.initYPos, this.cacheManager);
      this.initYPos = lane.nextItemPos();
    }
    return lane;
  };

  private renderLanes = (_: any, renderLanes: any) => {
    this.verifyGridCache()
      .catch(() => {})
      .finally(() => {
        const { start, end } = renderLanes;
        if (start === 0 && end === 0) return;
        const renderItems = this.data.slice(start, end);
        this.carouselList = renderItems.map((item) => {
          const lane = this.createCarousel(item);
          this.container.appendChild(lane.container);
          return lane;
        });
        const focusIndex = this.focusIndex.peek();
        const focusedLane = this.carouselList[focusIndex - start];
        this.focusedLane = focusedLane;
        this.container.style.transform = `translate(0px, -${focusedLane.yPos}px)`;
        this.updateGrid();
        this.saveGridCache();
      });
  };

  private updateGrid = () => {
    this.renderStartIndex.subscribe((prev, next) => {
      if (prev > next) {
        const newLane = this.data[next];
        const firstLane = this.carouselList[0];
        const newLaneYPos = firstLane.prevItemPos(newLane);
        const lane = this.createCarousel(newLane, newLaneYPos);
        this.container.insertBefore(lane.container, this.container.firstChild);
        this.carouselList.unshift(lane);
      }
      if (prev < next) {
        const topLaneToRemove = this.carouselList.shift();
        this.container.removeChild(topLaneToRemove.container);
      }
    });
    this.renderEndIndex.subscribe(async (prev, next) => {
      if (prev < next) {
        const lastLane = this.carouselList[this.carouselList.length - 1];
        const newLaneYPos = lastLane.nextItemPos();
        const lane = this.createCarousel(this.data[next], newLaneYPos);
        this.container.appendChild(lane.container);
        this.carouselList.push(lane);
      }
      if (prev > next) {
        const bottomLaneToRemove = this.carouselList.pop();
        this.container.removeChild(bottomLaneToRemove.container);
      }
    });
  };

  private handleScroll = () => {
    this.focusIndex.subscribe((_, focusIndex) => {
      const start = this.renderStartIndex.peek();
      const focusedLane = this.carouselList[focusIndex - start];
      if (!focusedLane) return;
      this.focusedLane = focusedLane;
      this.container.style.transform = `translate(0px, -${focusedLane.yPos}px)`;
      this.saveGridCache();
    });
  };

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      this.handleArrowKeys(e.key);
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      this.focusedLane.handleArrowKeys(e.key);
    }
  };

  saveGridCache = () => {
    if (this.carouselList.length) {
      this.cacheManager?.set(this.cacheId, {
        initYPos: this.carouselList[0].yPos,
      });
    }
  };

  verifyGridCache = async () => {
    const cache: any = await this.cacheManager?.get(this.cacheId);
    if (cache) {
      const { initYPos } = cache;
      this.initYPos = initYPos;
      return Promise.resolve();
    }
    return Promise.reject();
  };
}
