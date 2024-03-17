import Lane from './Lane';

class Grid {
  scrollBoundary = 5;
  items: any[];
  lanes: Lane[] = [];
  container: HTMLElement;

  constructor(gridRef: HTMLDivElement, fetchFn) {
    this.container = gridRef;
    this.scrollBoundary = 5;
    this.generateLane(fetchFn);
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
}

export default Grid;
