import { Ref } from 'preact';
import { VGridConfig } from './config';
import { ForwardedRef } from 'preact/compat';
import { MutableRef } from 'preact/hooks';
export class Lane {
  public laneRef: HTMLDivElement;
  public laneConfig: any;
  public laneYPosition: number;

  constructor(item: any) {
    const { modal, laneYPosition } = item;
    this.laneConfig = VGridConfig[modal];
    this.laneYPosition = laneYPosition;
    this.generateLane();
  }

  private generateLane() {
    const lane = document.createElement('div');
    lane.style.position = 'absolute';
    lane.style.height = `${this.laneConfig.height}px`;
    lane.style.width = `${this.laneConfig.width}px`;
    lane.style.background = this.laneConfig.color;
    lane.style.transform = `translate(0px, ${this.laneYPosition}px)`;
    this.laneRef = lane;
  }

  getLane() {
    return this.laneRef;
  }

  getNextLanePosition() {
    return this.laneYPosition + this.laneConfig.height + 20;
  }
}

type NavMap = {
  selectedLaneIndex: number;
  selectedLane: Lane;
  lanes: Lane[];
};

class Navigation {
  public gridRef: HTMLDivElement;
  selectedLaneIndex: number = 0;
  public lanes: Lane[] = [];
  private scrollBoundaries = 2;

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private updateGridStyle = (y: number) => {
    this.gridRef.style.transform = `translate3d(0px, -${y}px, 0px)`;
    this.gridRef.style.transition = 'transform 400ms ease 0ms';
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      const lastLaneIndex = this.selectedLaneIndex;
      this.selectedLaneIndex = lastLaneIndex > 0 ? lastLaneIndex - 1 : 0;
      const selectedLane = this.lanes[this.selectedLaneIndex];
      this.updateGridStyle(selectedLane.laneYPosition);
      const lastFocusLane = this.lanes[lastLaneIndex];
      selectedLane.laneRef.focus();
      lastFocusLane.laneRef.blur();
    } else if (event.key === 'ArrowDown') {
      const laneCount = this.lanes.length - 1;
      if (laneCount - this.selectedLaneIndex > this.scrollBoundaries) {
        const lastLaneIndex = this.selectedLaneIndex;
        this.selectedLaneIndex = lastLaneIndex < laneCount ? lastLaneIndex + 1 : laneCount;
        const selectedLane = this.lanes[this.selectedLaneIndex];
        const lastFocusLane = this.lanes[lastLaneIndex];
        this.updateGridStyle(selectedLane.laneYPosition);
        selectedLane.laneRef.focus();
        lastFocusLane.laneRef.blur();
      }
    }
  };
}

export default new Navigation();
