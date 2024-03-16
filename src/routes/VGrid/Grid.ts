import { signal } from '@preact/signals';
import Lane from './Lane';

class Grid {
  private lane: any[] = [];
  gridRef: HTMLDivElement;
  currentIndex = signal<number>(-1);
  lastIndex = signal<number>(-1);
  laneRef: Lane[] = [];
  gridScrollBoundary = 3;

  constructor() {
    this.handleNavigation();
  }

  private handleNavigation() {
    this.currentIndex.subscribe((selectedIndex) => {
      if (selectedIndex >= 0) {
        const lane = this.laneRef[selectedIndex];
        if (this.laneRef.length - selectedIndex >= this.gridScrollBoundary) {
          this.gridRef.style.transition = 'transform 400ms ease 0ms';
          this.gridRef.style.transform = `translate3d(0px, -${lane.laneYPosition}px, 0px)`;
        }
        lane.onFocus();
      }
    });
    this.lastIndex.subscribe((prevIndex) => {
      if (prevIndex >= 0) this.laneRef[prevIndex].onblur();
    });
  }

  setLaneData = (laneData: any) => {
    this.lane = laneData;
    window.addEventListener('keydown', this.handleKeyDown);
  };

  renderLane = () => {
    let laneYPosition = 0;
    this.lane.forEach((item: any) => {
      const lane = new Lane(item, laneYPosition);
      this.gridRef.appendChild(lane.getLane());
      laneYPosition = lane.getNextLaneYPos();
      this.laneRef.push(lane);
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const currentSelectedIndex = this.currentIndex.value;
    if (event.key === 'ArrowDown') {
      if (currentSelectedIndex < this.laneRef.length - 1) {
        const lastIndex = currentSelectedIndex;
        const nextIndex = currentSelectedIndex + 1;
        this.currentIndex.value = nextIndex;
        this.lastIndex.value = lastIndex;
      }
    } else if (event.key === 'ArrowUp') {
      if (currentSelectedIndex >= 0) {
        const lastIndex = currentSelectedIndex;
        const nextIndex = currentSelectedIndex - 1;
        this.currentIndex.value = nextIndex;
        this.lastIndex.value = lastIndex;
      }
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const selectedLane = this.laneRef[this.currentIndex.value];
      selectedLane.handleKeyDown(event);
    }
  };

  onFocus = () => {
    this.currentIndex.value = Math.max(this.currentIndex.value, 0);
  };
}

export default Grid;
