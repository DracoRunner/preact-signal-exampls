import { createRef, hydrate } from 'preact';
import { Carousel as CarouselComponent } from '../components';
import { getProductByCategory } from '../services';
import { Config } from '../types';
import { getLaneConfig } from '../utils';
import Card from './Card';
import PaginationManager from './PaginationManager';
import CacheManager from './CacheManager';

export default class Carousel extends PaginationManager {
  private laneData: any;
  private config: Config;
  private laneRef = createRef<HTMLElement>();
  private cardList: Card[] = [];
  yPos = 0;
  initXPos = 0;
  container = document.createElement('div');
  focusedCard: Card;

  constructor(laneData: any, yPos = 0, cacheManager?: CacheManager, cacheId?: string) {
    super(getProductByCategory, 9, 2, cacheManager, laneData.carouselId);
    this.laneData = laneData;
    this.yPos = yPos;
    this.config = getLaneConfig(this.laneData.model);
    this.renderLane();
    this.handleScroll();

    this.initRenderCount.subscribe(this.renderCards);
  }

  private createCard = (item: any, index: number, xPos?: number) => {
    if (!xPos) {
      const card = new Card(item, this.initXPos, this.laneData.model, index);
      this.initXPos = card.nextItemPos();
      return card;
    }
    return new Card(item, xPos, this.laneData.model, index);
  };

  renderLane = () => {
    this.container.className = 'grid-row';
    this.container.style.height = `${this.config.laneHeight}px`;
    this.container.style.transform = `translate(0px, ${this.yPos}px)`;
    hydrate(CarouselComponent({ ...this.laneData, laneRef: this.laneRef }), this.container);
  };

  private renderCards = (_: any, renderLanes: any) => {
    this.verifyCache()
      .catch(() => {})
      .finally(() => {
        const { start, end } = renderLanes;
        if (start === 0 && end === 0) return;
        const cardsToRender = this.data.slice(start, end);
        this.cardList = cardsToRender.map((card, index) => {
          const cardNode = this.createCard(card, index);
          this.laneRef.current.appendChild(cardNode.container);
          return cardNode;
        });
        const focusIndex = this.focusIndex.peek();
        const focusedCard = this.cardList[focusIndex - start];
        this.laneRef.current.style.transform = `translate(-${focusedCard.xPos}px, 0px)`;
        this.handleLaneUpdate();
        this.saveCache();
      });
  };

  handleLaneUpdate = () => {
    this.renderStartIndex.subscribe((prev, next) => {
      if (prev > next) {
        const firstCard = this.cardList[0];
        const newCardPos = firstCard.prevItemPos();
        const item = this.createCard(this.data[next], next, newCardPos);
        this.laneRef.current.insertBefore(item.container, this.laneRef.current.firstChild);
        this.cardList.unshift(item);
      }
      if (prev < next) {
        const topLaneToRemove = this.cardList.shift();
        this.laneRef.current.removeChild(topLaneToRemove.container);
      }
    });
    this.renderEndIndex.subscribe(async (prev, next) => {
      if (prev < next) {
        const lastCard = this.cardList[this.cardList.length - 1];
        const newLastCardPos = lastCard.nextItemPos();
        const item = this.createCard(this.data[next], next, newLastCardPos);
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
      const focusedCard = this.cardList[focusIndex - start];
      if (!focusedCard) return;
      this.focusedCard = focusedCard;
      this.laneRef.current.style.transform = `translate(-${focusedCard.xPos}px, 0px)`;
      this.saveCache();
    });
  };

  saveCache = () => {
    if (this.cardList.length) {
      this.cacheManager?.set(this.cacheId, {
        initXPos: this.cardList[0].xPos,
      });
    }
  };

  verifyCache = async () => {
    const cache: any = await this.cacheManager?.get(this.cacheId);
    if (cache) {
      const { initXPos } = cache;
      this.initXPos = initXPos ?? 0;
      return Promise.resolve();
    }
    return Promise.reject();
  };
}
