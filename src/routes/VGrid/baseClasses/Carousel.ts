import { createRef, hydrate } from 'preact';
import { Carousel as CarouselComponent } from '../components';
import { getProductByCategory } from '../services';
import { Config } from '../types';
import { getLaneConfig } from '../utils';
import Card from './Card';
import PaginationManager from './PaginationManager';

export default class Carousel extends PaginationManager {
  private laneData: any;
  private config: Config;
  private laneRef = createRef<HTMLElement>();
  private cardList: Card[] = [];
  yPos = 0;
  rightXPos = 0;
  leftXPos = 0;
  container = document.createElement('div');
  focusedItem: Card;

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
    hydrate(CarouselComponent({ ...this.laneData, laneRef: this.laneRef }), this.container);
  };

  private renderItems = (_: any, renderLanes: any) => {
    const { start, end } = renderLanes;
    if (start === 0 && end === 0) return;
    const renderItems = this.data.slice(start, end);
    this.cardList = renderItems.map((item, index) => {
      const itemNode = new Card(item, index, this.laneData.model);
      this.laneRef.current.appendChild(itemNode.container);
      return itemNode;
    });
  };

  handleLaneUpdate = () => {
    this.renderStartIndex.subscribe((prev, next) => {
      if (prev > next) {
        //Add new item in the start
        const item = new Card(this.data[next], next, this.laneData.model);
        this.laneRef.current.insertBefore(item.container, this.laneRef.current.firstChild);
        this.cardList.unshift(item);
      }
      if (prev < next) {
        //remove lane from the start
        const topLaneToRemove = this.cardList.shift();
        this.laneRef.current.removeChild(topLaneToRemove.container);
      }
    });
    this.renderEndIndex.subscribe(async (prev, next) => {
      if (prev < next) {
        //add new lane in the end
        const item = new Card(this.data[next], next, this.laneData.model);
        this.laneRef.current.appendChild(item.container);
        this.cardList.push(item);
      }
      if (prev > next) {
        const bottomLaneToRemove = this.cardList.pop();
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
      const focusedItem = this.cardList[focusIndex - start];
      this.focusedItem = focusedItem;
      this.laneRef.current.style.transform = `translate(-${focusedItem.xPos}px, 0px)`;
    });
  };
}
