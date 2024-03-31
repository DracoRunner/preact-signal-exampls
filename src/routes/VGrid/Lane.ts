import { createRef, hydrate } from 'preact';
import Carousel from './components/Carousel';
import { getLaneConfig } from './utils';
import { getProductByCategory } from './services';
import Item from './Item';
import { Config } from './config';
import PaginationManager from './BaseClasses/Pagination';
import e from 'express';

class Lane extends PaginationManager {
  private laneData: any;
  private config: Config;
  private laneRef = createRef<HTMLElement>();
  private items: Item[] = [];
  yPos = 0;
  rightXPos = 0;
  leftXPos = 0;
  container = document.createElement('div');
  focusedItem: Item;

  constructor(laneData: any, yPos = 0) {
    super(getProductByCategory, 8, 1);
    this.laneData = laneData;
    this.yPos = yPos;
    this.config = getLaneConfig(this.laneData.model);
    this.renderLane();
    this.handleScroll();
    this.handleLaneUpdate();
    this.initRenderCount.subscribe(this.renderItems);
  }

  renderLane = () => {
    this.container.className = 'grid-row';
    this.container.style.height = `${this.config.itemHeight}px`;
    this.container.style.transform = `translate(0px, ${this.yPos}px)`;
    hydrate(Carousel({ ...this.laneData, laneRef: this.laneRef }), this.container);
  };

  private renderItems = (_: any, renderLanes: any) => {
    const { start, end } = renderLanes;
    if (start === 0 && end === 0) return;
    const renderItems = this.data.slice(start, end);
    this.items = renderItems.map((item, index) => {
      const itemNode = new Item(item, index, this.laneData.model);
      this.laneRef.current.appendChild(itemNode.container);
      return itemNode;
    });
  };

  handleLaneUpdate = () => {
    this.renderStartIndex.subscribe((prev, next) => {
      if (prev > next) {
        //Add new item in the start
        const item = new Item(this.data[next], next, this.laneData.model);
        this.laneRef.current.insertBefore(item.container, this.laneRef.current.firstChild);
        this.items.unshift(item);
      }
      if (prev < next) {
        //remove lane from the start
        const topLaneToRemove = this.items.shift();
        this.laneRef.current.removeChild(topLaneToRemove.container);
      }
    });
    this.renderEndIndex.subscribe(async (prev, next) => {
      if (prev < next) {
        //add new lane in the end
        const item = new Item(this.data[next], next, this.laneData.model);
        this.laneRef.current.appendChild(item.container);
        this.items.push(item);
      }
      if (prev > next) {
        const bottomLaneToRemove = this.items.pop();
        this.laneRef.current.removeChild(bottomLaneToRemove.container);
      }
    });
  };

  nextItemPos() {
    return this.yPos + this.config.laneHeight + this.config.spaceBetweenLane;
  }

  prevItemPos(nextItem: any) {
    const config = getLaneConfig(nextItem.model);
    return this.yPos - config.laneHeight - config.spaceBetweenLane;
  }

  handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      this.handleArrowKeys(e.key);
    }
  };

  handleScroll = () => {
    this.focusIndex.subscribe((_, focusIndex) => {
      const start = this.renderStartIndex.peek();
      const focusedItem = this.items[focusIndex - start];
      this.focusedItem = focusedItem;
      this.laneRef.current.style.transform = `translate(-${focusedItem.xPos}px, 0px)`;
    });
  };
}

export default Lane;
