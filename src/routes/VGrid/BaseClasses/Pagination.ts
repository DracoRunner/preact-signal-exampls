import Observable from './Observable';

export default class Carousel {
  private readonly pageSize = 10;
  private readonly bufferItems = 3;
  public dataBuffer = [];
  public scrollBoundary = 7;
  public totalItems = 0;
  private fetchDataFn: Function;
  public laneStartIndex = new Observable<number>();
  public laneEndIndex = new Observable<number>();
  public focusIndex = 0;
  public initDataToRender = new Observable<any[]>([]);

  constructor(fetchDataFn: Function) {
    this.fetchDataFn = fetchDataFn;
    this.fetchInitialPage();
    this.checkAndLoadNextData();
  }

  private fetchInitialPage = async () => {
    const { data, total } = await this.fetchPage(0, this.pageSize * 2);
    this.dataBuffer = data;
    this.totalItems = total;
    this.laneStartIndex.setValue(0);
    this.laneEndIndex.setValue(Math.min(this.pageSize, this.totalItems));
    this.initDataToRender.setValue(this.dataBuffer.slice(this.laneStartIndex.peek(), this.laneEndIndex.peek()));
  };

  private fetchPage = async (start: number, pageSize = this.pageSize) => {
    return await this.fetchDataFn(start, pageSize);
  };

  private checkAndLoadNextData = async () => {
    this.laneEndIndex.subscribe(async (_, nextEndIndex) => {
      if (nextEndIndex >= this.dataBuffer.length - this.scrollBoundary && this.dataBuffer.length < this.totalItems) {
        const { data } = await this.fetchPage(this.dataBuffer.length);
        this.dataBuffer.push(...data);
      }
    });
  };

  next() {
    if (this.focusIndex < this.totalItems) {
      this.focusIndex++;
      if (this.focusIndex < this.totalItems - this.scrollBoundary - this.bufferItems) {
        const startIndex = Math.max(0, this.focusIndex - this.bufferItems);
        this.laneStartIndex.setValue(startIndex);
        this.laneEndIndex.setValue(startIndex + this.scrollBoundary + this.bufferItems);
      }
      this.checkAndLoadNextData();
    }
  }

  prev() {
    if (this.focusIndex > 0) {
      this.focusIndex--;
      if (this.focusIndex < this.totalItems - this.scrollBoundary) {
        const startIndex = Math.max(0, this.focusIndex - this.bufferItems);
        this.laneStartIndex.setValue(startIndex);
        this.laneEndIndex.setValue(startIndex + this.scrollBoundary + this.bufferItems);
      }
    }
  }
}
