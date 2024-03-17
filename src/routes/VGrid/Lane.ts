import { createRef, hydrate } from 'preact';
import Carousel from './components/Carousel';
import { getLaneConfig } from './utils';
import { getProductByCategory } from './services';
import Item from './Item';
import { Config } from './config';

class Lane {
  laneItem: any;
  container = document.createElement('div');
  laneRef = createRef<HTMLElement>();
  laneData: any[] = [];
  totalItems = 0;
  config: Config;
  yPos = 0;
  xPos = 0;
  items: Item[] = [];

  constructor(laneItem: any, yPos = 0) {
    this.laneItem = laneItem;
    this.yPos = yPos;
    this.config = getLaneConfig(this.laneItem.type);
    this.renderLane();
  }

  renderLane = async () => {
    this.container.className = 'grid-row';
    this.container.style.height = `${this.config.laneHeight}px`;
    this.container.style.transform = `translate(0px, ${this.yPos}px)`;
    hydrate(Carousel({ ...this.laneItem, laneRef: this.laneRef }), this.container);
    this.fetchLaneItems();
  };

  fetchLaneItems = async () => {
    getProductByCategory(this.laneItem.title).then((res: any) => {
      this.laneData = res.products;
      this.totalItems = res.total;
      this.renderItems();
    });
  };

  renderItems = async () => {
    if (this.laneRef.current) {
      this.laneData?.forEach((item: any, index: number) => {
        const laneItem = new Item(item, index, this.laneItem.type);
        this.laneRef.current.appendChild(laneItem.container);
        this.items.push(laneItem);
      });
    } else {
      throw new Error('Lane reference is not available');
    }
  };

  nextItemPos() {
    return this.yPos + this.config.laneHeight + this.config.spaceBetweenLane;
  }
}

export default Lane;
