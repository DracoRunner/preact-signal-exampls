import CacheManager from './CacheManager';
import Carousel from './Carousel';
import PaginationManager from './PaginationManager';

export default class VirtualizedGrid extends PaginationManager {
  private focusedLane: Carousel;
  private carouselList: Carousel[] = [];
  private container: HTMLElement;
  private topYPos = 0;
  private bottomYPos = 0;

  constructor(gridRef: HTMLDivElement, fetchFn: Function, cacheManager: CacheManager) {
    super(fetchFn, 7, 2, cacheManager);
    this.container = gridRef;
    this.initRenderCount.subscribe(this.renderLanes);
    this.updateGrid();
    this.handleScroll();
  }

  private renderLanes = (_: any, renderLanes: any) => {
    const { start, end } = renderLanes;
    if (start === 0 && end === 0) return;
    const renderItems = this.data.slice(start, end);
    this.carouselList = renderItems.map((item) => {
      const lane = new Carousel(item, this.bottomYPos);
      this.container.appendChild(lane.container);
      this.bottomYPos = lane.nextItemPos();
      return lane;
    });
  };

  private updateGrid = () => {
    this.renderStartIndex.subscribe((prev, next) => {
      if (prev > next) {
        const firstLane = this.carouselList[0];
        const newLaneYPos = firstLane.prevItemPos(this.data[next]);
        console.log('newLaneYPos', newLaneYPos);
        const lane = new Carousel(this.data[next], newLaneYPos);
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
        const lane = new Carousel(this.data[next], newLaneYPos);
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
      this.focusedLane = focusedLane;
      this.container.style.transform = `translate(0px, -${focusedLane.yPos}px)`;
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
}
