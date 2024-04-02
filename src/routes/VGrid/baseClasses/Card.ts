import { hydrate } from 'preact';
import { getLaneConfig } from '../utils';
import { Config } from '../types';
import { MovieCard } from '../components';

export default class Card {
  itemData: any;
  container = document.createElement('span');
  xPos: number;
  config: Config;

  constructor(itemData: any, xPos: number, type: string, index: number) {
    this.itemData = itemData;
    this.config = getLaneConfig(type);
    this.xPos = xPos;
    this.createItem(index);
  }

  createItem = async (index: number) => {
    this.container.classList.add('grid-col');
    this.container.style.height = `${this.config.itemHeight}px`;
    this.container.style.width = `${this.config.itemWidth}px`;
    this.container.style.transform = `translate(${this.xPos}px,0px)`;
    hydrate(MovieCard({ ...this.itemData, ...this.config, id: index }), this.container);
  };

  onFocus() {
    this.container.style.border = `2px solid blue`;
  }

  onBlur() {
    this.container.style.border = `none`;
  }

  nextItemPos() {
    return this.xPos + this.config.itemWidth + 20;
  }
  prevItemPos() {
    return this.xPos - this.config.itemWidth - 20;
  }
}
