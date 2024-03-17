import Base from './BaseGrid';
import Item from './Item';
import { LaneConfig, VGridConfig } from './config';

class Lane extends Base {
  laneYPosition: number;
  config: LaneConfig;
  lastFocusedIndex = 0;

  constructor(laneItem: any, laneYPosition: number) {
    const { modal, items } = laneItem;
    const config = VGridConfig[modal];
    const lane = document.createElement('div');
    super(lane, config.scrollBoundary, items);
    this.config = config;
    this.laneYPosition = laneYPosition;
    this.createLane();
    this.handleNavigation();
  }

  private createLane() {
    this.container.classList.add('grid-row');
    this.container.style.height = `${this.config.height}px`;
    this.container.style.transform = `translate(0px, ${this.laneYPosition}px)`;
    this.createItems();
  }

  private createItems() {
    let itemXPosition = 0;
    this.items.forEach((_: any, index) => {
      const item = new Item(_, itemXPosition, this.config);
      this.container.appendChild(item.getItem());
      itemXPosition = item.getNextItemXPos();
      this.itemRefs.push(item);
    });
  }

  private handleNavigation() {
    this.currentIndex.subscribe((selectedIndex) => {
      if (selectedIndex >= 0) {
        const item = this.itemRefs[selectedIndex];
        if (this.itemRefs.length - selectedIndex >= this.config.scrollBoundary) {
          this.container.style.transform = `translate(-${item.iteXPosition}px, ${this.laneYPosition}px)`;
        }
        this.lastFocusedIndex = selectedIndex;
        item.onFocus();
      }
    });
    this.lastIndex.subscribe((prevIndex) => {
      if (prevIndex >= 0) this.itemRefs[prevIndex].onblur();
    });
  }

  public handleKeyDown(event: KeyboardEvent) {
    const currentSelectedIndex = this.currentIndex.value;
    if (event.key === 'ArrowRight') {
      if (currentSelectedIndex < this.itemRefs.length - 1) {
        const lastIndex = currentSelectedIndex;
        const nextIndex = currentSelectedIndex + 1;
        this.currentIndex.value = nextIndex;
        this.lastIndex.value = lastIndex;
      }
    } else if (event.key === 'ArrowLeft') {
      if (currentSelectedIndex >= 0) {
        const lastIndex = currentSelectedIndex;
        const nextIndex = currentSelectedIndex - 1;
        this.currentIndex.value = nextIndex;
        this.lastIndex.value = lastIndex;
      }
    }
  }

  public onFocus() {
    this.currentIndex.value = Math.max(this.currentIndex.value, this.lastFocusedIndex);
    this.lastIndex.value = -1;
  }

  public onBlur() {
    this.lastIndex.value = this.currentIndex.value;
    this.currentIndex.value = -1;
  }

  getNextItemYPos() {
    return this.laneYPosition + this.config.height + 10;
  }
}

export default Lane;
