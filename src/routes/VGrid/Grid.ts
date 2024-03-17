import Lane from './Lane';

class Grid {
  scrollBoundary = 1;
  items: any[];
  lanes: Lane[] = [];
  container: HTMLElement;
  currentLaneIndex = 0;
  lastLaneIndex = 0;

  constructor(gridRef: HTMLDivElement, fetchFn) {
    this.container = gridRef;
    this.generateLane(fetchFn);
    window.addEventListener('keydown', this.handleKeyDown);
  }

  generateLane = async (fetchFn) => {
    fetchFn().then((res) => {
      this.items = res;
      this.renderLane();
    });
  };

  renderLane = () => {
    let laneYPos = 0;
    this.items.forEach((item: any) => {
      const lane = new Lane(item, laneYPos);
      this.container.appendChild(lane.container);
      laneYPos = lane.nextItemPos();
      this.lanes.push(lane);
    });
  };

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        this.moveDown();
        break;
      case 'ArrowUp':
        this.moveUp();
        break;
      default:
        break;
    }
  };
  moveDown() {
    const currentIndex = this.currentLaneIndex;
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.lanes.length - this.scrollBoundary) {
      this.currentLaneIndex = nextIndex;
      this.lastLaneIndex = currentIndex;
      this.container.style.transform = `translate(0px, -${this.lanes[nextIndex].yPos}px)`;
    }
  }
  moveUp() {
    const currentIndex = this.currentLaneIndex;
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      this.currentLaneIndex = nextIndex;
      this.lastLaneIndex = currentIndex;
      this.container.style.transform = `translate(0px, -${this.lanes[nextIndex].yPos}px)`;
    }
  }
}

export default Grid;
