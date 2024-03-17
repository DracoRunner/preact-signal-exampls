import Base from './BaseGrid';
import Lane from './Lane';

class Grid extends Base {
  constructor(gridRef: HTMLDivElement, itemsToRender: any[]) {
    super(gridRef, 3, itemsToRender);
    this.renderLane();
    this.watchChanges();
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private watchChanges() {
    this.currentIndex.subscribe((selectedIndex) => {
      if (selectedIndex >= 0) {
        const lane = this.itemRefs[selectedIndex];
        if (this.itemRefs.length - selectedIndex >= this.scrollBoundary) {
          this.container.style.transform = `translate3d(0px, -${lane.laneYPosition}px, 0px)`;
        }
        lane.onFocus();
      }
    });
    this.lastIndex.subscribe((prevIndex) => {
      if (prevIndex >= 0) this.itemRefs[prevIndex].onBlur();
    });
  }

  private renderLane = () => {
    let laneYPosition = 0;
    this.items.forEach((item: any, index: number) => {
      const lane = new Lane(item, laneYPosition);
      laneYPosition = lane.getNextItemYPos();
      this.container.appendChild(lane.getContainer());
      this.itemRefs.push(lane);
    });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    const currentSelectedIndex = this.currentIndex.value;
    if (event.key === 'ArrowDown') {
      if (currentSelectedIndex < this.itemRefs.length - 1) {
        const lastIndex = currentSelectedIndex;
        const nextIndex = currentSelectedIndex + 1;
        this.currentIndex.value = nextIndex;
        this.lastIndex.value = lastIndex;
      }
    } else if (event.key === 'ArrowUp') {
      if (currentSelectedIndex >= 0) {
        const lastIndex = currentSelectedIndex;
        const nextIndex = Math.max(currentSelectedIndex - 1, 0);
        this.currentIndex.value = nextIndex;
        this.lastIndex.value = lastIndex;
      }
    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      const selectedLane = this.itemRefs[this.currentIndex.value];
      selectedLane.handleKeyDown(event);
    }
  };

  onFocus = () => {
    this.currentIndex.value = Math.max(this.currentIndex.value, 0);
  };
}

export default Grid;
