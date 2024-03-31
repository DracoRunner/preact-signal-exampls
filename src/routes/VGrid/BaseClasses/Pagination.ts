import Observable from './Observable';

export default class PaginationManager {
  private pageSize: number = 10;
  private totalItems: number = 0;
  private renderCount: number = 7;
  private fetchDataFn: Function;
  private fetchedDataIndex: number = 0;
  private preBufferCount: number = 2;

  data: any[] = [];
  initRenderCount = new Observable<{ start: number; end: number }>({ start: 0, end: 0 });
  renderStartIndex = new Observable<number>(0);
  renderEndIndex = new Observable<number>(0);
  focusIndex = new Observable<number>(0);

  constructor(fetchDataFn: Function) {
    this.fetchDataFn = fetchDataFn;
    this.initialize();
    this.handlePagination();
  }

  private fetchData = async (pageSize = this.pageSize) => {
    return await this.fetchDataFn(this.data.length, pageSize);
  };

  private initialize = async () => {
    const { data, total } = await this.fetchData();
    this.data = data;
    this.totalItems = total;
    const endIndex = Math.min(this.renderCount, this.totalItems - 1);
    this.fetchedDataIndex = data.length;
    this.initRenderCount.setValue({ start: 0, end: endIndex });
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
}
