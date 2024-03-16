import { Signal, signal } from '@preact/signals';
import Item from './Item';
import { LaneConfig, VGridConfig } from './config';

class Lane {
  private items: any[];
  private laneRef: HTMLDivElement;
  laneYPosition: number;
  laneConfig: LaneConfig;
  currentIndex = signal<number>(-1);
  lastIndex = signal<number>(-1);
  itemRefs: Item[] = [];
  lastFocusedIndex = 0;

  constructor(laneItem: any, laneYPosition: number) {
    const { modal, items } = laneItem;
    this.items = items;
    const laneConfig = VGridConfig[modal];
    this.laneConfig = laneConfig;
    this.laneYPosition = laneYPosition;
    this.createLane();
    this.handleNavigation();
  }

  private createLane() {
    const lane = document.createElement('div');
    lane.style.position = 'absolute';
    lane.style.height = `${this.laneConfig.height}px`;
    lane.style.width = `100%`;
    lane.style.transform = `translate(0px, ${this.laneYPosition}px)`;
    lane.style.transition = 'transform 400ms ease 0ms';
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

  private handleNavigation() {
    this.currentIndex.subscribe((selectedIndex) => {
      if (selectedIndex >= 0) {
        const item = this.itemRefs[selectedIndex];
        if (this.itemRefs.length - selectedIndex >= this.laneConfig.scrollBoundary) {
          this.laneRef.style.transform = `translate(-${item.iteXPosition}px, ${this.laneYPosition}px)`;
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
    console.log('onFocus', this.laneConfig, this.currentIndex.value);
    this.currentIndex.value = Math.max(this.currentIndex.value, this.lastFocusedIndex);
    this.lastIndex.value = -1;
  }

  public onblur() {
    console.log('onblur', this.laneConfig);
    this.lastIndex.value = this.currentIndex.value;
    this.currentIndex.value = -1;
  }

  public getNextLaneYPos() {
    return this.laneYPosition + this.laneConfig.height + 10;
  }

  public getLane() {
    return this.laneRef;
  }
}

export default Lane;
