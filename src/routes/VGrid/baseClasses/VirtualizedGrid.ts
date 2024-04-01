import Carousel from './Carousel';
import PaginationManager from './PaginationManager';

export default class VirtualizedGrid extends PaginationManager {
  carouselList: any[] = [];
  container: HTMLElement;
  topYPos = 0;
  bottomYPos = 0;
  private focusedLane: Carousel;

  constructor(gridRef: HTMLDivElement, fetchFn) {
    super(fetchFn, 7, 2);
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
        //Add new lane in the start
        const lane = new Carousel(this.data[next], this.topYPos);
        this.container.insertBefore(lane.container, this.container.firstChild);
        this.topYPos = lane.prevItemPos(this.data[next]);
        this.carouselList.unshift(lane);
      }
      if (prev < next) {
        //remove lane from the start
        const topLaneToRemove = this.carouselList.shift();
        this.container.removeChild(topLaneToRemove.container);
        this.topYPos = topLaneToRemove.yPos;
      }
    });
    this.renderEndIndex.subscribe(async (prev, next) => {
      if (prev < next) {
        //add new lane in the end
        const lane = new Carousel(this.data[next], this.bottomYPos);
        this.container.appendChild(lane.container);
        this.bottomYPos = lane.nextItemPos();
        this.carouselList.push(lane);
      }
      if (prev > next) {
        const bottomLaneToRemove = this.carouselList.pop();
        this.container.removeChild(bottomLaneToRemove.container);
        this.bottomYPos = bottomLaneToRemove.nextItemPos();
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
