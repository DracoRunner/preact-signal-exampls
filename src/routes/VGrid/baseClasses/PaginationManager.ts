import { Observable } from '../types';
import CacheManager from './CacheManager';

export default class PaginationManager extends CacheManager {
  private pageSize: number = 10;
  private totalItems: number = 0;
  private renderCount: number = 7;
  private fetchDataFn: Function;
  private fetchedDataIndex: number = 0;
  private preBufferCount: number = 2;

  cacheId: string = 'default';
  data: any[] = [];
  initRenderCount = new Observable<{ start: number; end: number }>({ start: 0, end: 0 });
  renderStartIndex = new Observable<number>(0);
  renderEndIndex = new Observable<number>(0);
  focusIndex = new Observable<number>(-1);

  constructor(fetchDataFn: Function, renderCount, preBufferCount, cacheId?: string) {
    super();
    this.cacheId = cacheId;
    this.fetchDataFn = fetchDataFn;
    this.renderCount = renderCount;
    this.preBufferCount = preBufferCount;
    this.initialize();
    this.handlePagination();
  }

  private fetchData = async (pageSize = this.pageSize) => {
    return await this.fetchDataFn(this.data.length, pageSize);
  };

  private initialize = async () => {
    this.verifyPageCache()
      .then(() => {
        console.log(this);
      })
      .catch(async () => {
        const { data, total } = await this.fetchData(this.renderCount * 2);
        this.data = data;
        this.totalItems = total;
        const endIndex = Math.min(this.renderCount, this.totalItems - 1);
        this.fetchedDataIndex = data.length;
        this.initRenderCount.setValue({ start: 0, end: endIndex });
        this.focusIndex.setValue(0);
      });
  };

  private handlePagination = () => {
    this.focusIndex.subscribe((_, focusIndex) => {
      const startIndex = Math.max(0, focusIndex - (this.preBufferCount + 1));
      const endIndex = startIndex + this.renderCount;
      if (endIndex < this.totalItems) {
        this.renderStartIndex.setValue(startIndex);
        this.renderEndIndex.setValue(endIndex);
        if (endIndex >= this.fetchedDataIndex - this.preBufferCount && this.fetchedDataIndex < this.totalItems) {
          this.fetchMoreData();
        }
      }
      this.savePageCache();
    });
  };

  fetchMoreData = async (): Promise<void> => {
    const { data } = await this.fetchData();
    this.data = [...this.data, ...data];
    this.fetchedDataIndex = this.data.length;
  };

  handleArrowKeys = (keyCode: string): void => {
    const focusIndex = this.focusIndex.peek();
    if (keyCode === 'ArrowUp' || keyCode === 'ArrowLeft') {
      focusIndex > 0 && this.focusIndex.setValue(Math.max(0, focusIndex - 1));
    } else if (keyCode === 'ArrowDown' || keyCode === 'ArrowRight') {
      focusIndex < this.totalItems - 1 && this.focusIndex.setValue(Math.min(this.totalItems - 1, focusIndex + 1));
    }
  };

  savePageCache = () => {
    this.set(`${this.cacheId}_page`, {
      data: this.data,
      totalItems: this.totalItems,
      start: this.renderStartIndex.peek(),
      end: this.renderEndIndex.peek(),
      focusIndex: this.focusIndex.peek(),
    });
  };

  verifyPageCache = async () => {
    const cache: any = await this.get(`${this.cacheId}_page`);
    if (cache) {
      const { data, totalItems, start, end, focusIndex } = cache;
      this.data = data;
      this.totalItems = totalItems;
      this.renderStartIndex.silentUpdate(start);
      this.renderEndIndex.silentUpdate(end);
      this.initRenderCount.setValue({ start, end });
      this.focusIndex.silentUpdate(focusIndex);
      return Promise.resolve();
    }
    return Promise.reject(new Error('No cache found'));
  };
}
