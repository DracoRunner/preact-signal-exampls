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
    this.onFocus();
  };

  handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        this.moveDown();
        break;
      case 'ArrowUp':
        this.moveUp();
        break;
      case 'ArrowRight':
      case 'ArrowLeft':
        this.lanes[this.currentLaneIndex].handleKeyDown(e);
        break;
      default:
        break;
    }
  };
  moveDown() {
    const currentIndex = this.currentLaneIndex;
    const nextIndex = currentIndex + 1;
    if (nextIndex < this.lanes.length) {
      this.currentLaneIndex = nextIndex;
      this.lastLaneIndex = currentIndex;
      const focusedLane = this.lanes[nextIndex];
      const blurredLane = this.lanes[currentIndex];
      if (nextIndex < this.lanes.length - this.scrollBoundary)
        this.container.style.transform = `translate(0px, -${focusedLane.yPos}px)`;
      blurredLane.onBlur();
      focusedLane.onFocus();
    }
  }
  moveUp() {
    const currentIndex = this.currentLaneIndex;
    const nextIndex = currentIndex - 1;
    if (nextIndex >= 0) {
      this.currentLaneIndex = nextIndex;
      this.lastLaneIndex = currentIndex;
      const focusedLane = this.lanes[nextIndex];
      const blurredLane = this.lanes[currentIndex];
      this.container.style.transform = `translate(0px, -${focusedLane.yPos}px)`;
      blurredLane.onBlur();
      focusedLane.onFocus();
    }
  }

  onFocus() {
    const lane = this.lanes[this.currentLaneIndex];
    this.container.style.transform = `translate(0px, -${lane.yPos}px)`;
    lane.onFocus();
  }
}

export default Grid;
