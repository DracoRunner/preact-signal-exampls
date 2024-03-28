import Pagination from './BaseClasses/Pagination';
import Lane from './Lane';
import { getLaneConfig } from './utils';

class Grid extends Pagination {
  items: any[];
  lanes: any[] = [];
  container: HTMLElement;
  currentLaneIndex = 0;
  lastLaneIndex = 0;
  topYPos = 0;
  bottomYPos = 0;

  constructor(gridRef: HTMLDivElement, fetchFn) {
    super(fetchFn);
    this.container = gridRef;
    this.handleGridUpdate();
    this.render();
  }

  render = () => {
    this.initDataToRender.subscribe((prev, items) => {
      if (items.length) {
        items.forEach((item, index) => {
          const lane = new Lane(item, this.bottomYPos);
          this.container.appendChild(lane.container);
          this.bottomYPos = lane.nextItemPos();
          this.lanes.push(lane);
        });
      }
    });
  };

  handleGridUpdate() {
    this.laneStartIndex.subscribe((prev, next) => {
      if (prev > next) {
        const item = this.dataBuffer[next];
        const lane = new Lane(this.dataBuffer[next], this.topYPos);
        this.container.insertBefore(lane.container, this.container.firstChild);
        this.topYPos = lane.prevItemPos(item);
        this.lanes.unshift(lane);
      }

      if (next > prev) {
        const topLaneToRemove = this.lanes[0];
        this.container.removeChild(topLaneToRemove.container);
        this.topYPos = topLaneToRemove.yPos;
        console.log('topYPost===>', this.topYPos);
        this.lanes.shift();
      }
    });
    this.laneEndIndex.subscribe((prev, next) => {
      if (prev > next) {
        const laneToRemove = this.lanes[this.lanes.length - 1];
        this.container.removeChild(laneToRemove.container);
        this.bottomYPos = laneToRemove.yPos;
        this.lanes.pop();
      }

      if (next > prev) {
        const lane = new Lane(this.dataBuffer[next], this.bottomYPos);
        this.container.appendChild(lane.container);
        this.bottomYPos = lane.nextItemPos();
        this.lanes.push(lane);
      }
    });
  }

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown': {
        this.next();
        break;
      }
      case 'ArrowUp': {
        this.prev();
        break;
      }
      default:
        break;
    }
  };
}

export default Grid;
