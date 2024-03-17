import { LaneConfig } from './config';

class Item {
  item: any;
  itemRef: HTMLSpanElement;
  iteXPosition: number;
  config: LaneConfig;

  constructor(item: any, itemXPosition: number, config: LaneConfig) {
    this.item = item;
    this.iteXPosition = itemXPosition;
    this.config = config;
    this.createItem();
  }

  createItem = () => {
    const item = document.createElement('span');
    item.style.position = 'absolute';
    item.style.height = `${this.config.height}px`;
    item.style.width = `${this.config.width}px`;
    item.style.transform = `translate(${this.iteXPosition}px,0px)`;
    item.style.background = this.config.color;
    item.innerText = this.item.title;
    this.itemRef = item;
  };

  getItem() {
    return this.itemRef;
  }

  onFocus() {
    this.itemRef.style.background = 'pink';
  }

  onblur() {
    this.itemRef.style.background = this.config.color;
  }

  getNextItemXPos() {
    return this.iteXPosition + this.config.width + 10;
  }
}

export default Item;
