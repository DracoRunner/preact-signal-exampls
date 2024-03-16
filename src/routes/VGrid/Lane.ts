import Item from './Item';
import { LaneConfig, VGridConfig } from './config';

class Lane {
  laneRef: HTMLDivElement;
  laneYPosition: number;
  laneConfig: LaneConfig;
  selectedItemIndex: number = 0;
  items: any[];
  itemRefs: Item[] = [];
  isFocused: boolean;

  constructor(laneItem: any, laneYPosition: number) {
    const { modal, items } = laneItem;
    this.items = items;
    const laneConfig = VGridConfig[modal];
    this.laneConfig = laneConfig;
    this.laneYPosition = laneYPosition;
    this.createLane();
  }

  private keyEventListener(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.selectedItemIndex = this.selectedItemIndex + 1;
    } else if (event.key === 'ArrowLeft') {
      this.selectedItemIndex = this.selectedItemIndex - 1;
    }
  }

  private createLane() {
    const lane = document.createElement('div');
    lane.style.position = 'absolute';
    lane.style.height = `${this.laneConfig.height}px`;
    lane.style.width = `100%`;
    lane.style.transform = `translate(0px, ${this.laneYPosition}px)`;
    lane.style.transition = 'transform 400ms ease 0ms';
    lane.addEventListener('keydown', this.keyEventListener);
    this.laneRef = lane;
    this.createItems();
  }

  private createItems() {
    let itemXPosition = 0;
    this.items.forEach((_: any, index) => {
      const item = new Item(_, itemXPosition, this.laneConfig);
      this.laneRef.appendChild(item.getItem());
      itemXPosition = item.getNextItemXPos();
      this.itemRefs.push(item);
    });
  }

  getLane() {
    return this.laneRef;
  }

  onFocus() {
    this.isFocused = true;
    console.log('onFocus', this.laneConfig);
  }

  onblur() {
    console.log('onblur', this.laneConfig);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      if (this.selectedItemIndex >= this.items.length - this.laneConfig.scrollBoundary) return;
      const lastIndex = this.selectedItemIndex;
      this.selectedItemIndex = this.selectedItemIndex + 1;
      const item = this.itemRefs[this.selectedItemIndex];
      this.laneRef.style.transform = `translate(-${item.iteXPosition}px, ${this.laneYPosition}px)`;
      this.itemRefs[this.selectedItemIndex].onFocus();
      this.itemRefs[lastIndex].onblur();
    } else if (event.key === 'ArrowLeft') {
      if (this.selectedItemIndex <= 0) return;
      const lastIndex = this.selectedItemIndex;
      this.selectedItemIndex = this.selectedItemIndex - 1;
      const item = this.itemRefs[this.selectedItemIndex];
      this.laneRef.style.transform = `translate(-${item.iteXPosition}px, ${this.laneYPosition}px)`;
      this.itemRefs[this.selectedItemIndex].onFocus();
      this.itemRefs[lastIndex].onblur();
    }
  }

  getNextLaneYPos() {
    return this.laneYPosition + this.laneConfig.height + 10;
  }
}

export default Lane;
