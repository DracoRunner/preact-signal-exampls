import { hydrate } from 'preact';
import { Config } from './config';
import { getLaneConfig } from './utils';
import MovieCard from './components/MovieCard';

class Item {
  itemData: any;
  container = document.createElement('span');
  xPos: number;
  config: Config;

  constructor(itemData: any, index: number, type: string) {
    this.itemData = itemData;
    this.config = getLaneConfig(type);
    this.setItemXPos(index);
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

  setItemXPos(index) {
    this.xPos = index * this.config.itemWidth + index * 20;
  }
}

export default Item;
