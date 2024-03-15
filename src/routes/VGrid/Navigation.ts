import { Ref } from 'preact';
import { VGridConfig } from './config';
import { ForwardedRef } from 'preact/compat';
import { MutableRef } from 'preact/hooks';
export class Lane {
  public laneRef: HTMLDivElement;
  laneConfig: any;
  laneYPosition: number;
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

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  private updateGridStyle = (y: number) => {
    this.gridRef.style.transform = `translate3d(0px, -${y}px, 0px)`;
    this.gridRef.style.transition = 'transform 400ms ease 0ms';
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      if (this.selectedLaneIndex > 0) {
        const selectedLane = this.lanes[this.selectedLaneIndex];
        this.updateGridStyle(selectedLane.laneYPosition);
        this.selectedLaneIndex--;
      }
    } else if (event.key === 'ArrowDown') {
      if (this.selectedLaneIndex + 1 > 0 && this.selectedLaneIndex < this.lanes.length) {
        const selectedLane = this.lanes[this.selectedLaneIndex];
        this.updateGridStyle(selectedLane.laneYPosition);
        this.selectedLaneIndex++;
      }
    }
  };
}

export default new Navigation();
