import { Ref } from 'preact';
import { VGridConfig } from './config';
import { ForwardedRef } from 'preact/compat';
import { MutableRef } from 'preact/hooks';
import Lane from './Lane';

class Grid {
  private laneData: any[] = [];
  gridRef: HTMLDivElement;
  selectedLaneIndex: number = 0;
  lanes: Lane[] = [];
  scrollBoundaries = 2;

  constructor() {}

  setLaneData = (laneData: any) => {
    this.laneData = laneData;
    window.addEventListener('keydown', this.handleKeyDown);
  };

  renderLane = () => {
    let laneYPosition = 0;
    this.laneData.forEach((item: any) => {
      const lane = new Lane(item, laneYPosition);
      this.gridRef.appendChild(lane.getLane());
      laneYPosition = lane.getNextLaneYPos();
      this.lanes.push(lane);
    });
    const selectedLane = this.lanes[this.selectedLaneIndex];
    selectedLane.onFocus();
  };

  private updateGridStyle = (y: number) => {
    this.gridRef.style.transform = `translate3d(0px, -${y}px, 0px)`;
    this.gridRef.style.transition = 'transform 400ms ease 0ms';
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp') {
      const lastIndex = this.selectedLaneIndex;
      const nextIndex = Math.max(lastIndex - 1, 0);
      if (nextIndex < 0) return;
      this.selectedLaneIndex = nextIndex;
      const selectedLane = this.lanes[this.selectedLaneIndex];
      this.updateGridStyle(selectedLane.laneYPosition);
      const lastFocusLane = this.lanes[lastIndex];
      selectedLane.onFocus();
      lastFocusLane.onblur();
    } else if (event.key === 'ArrowDown') {
      const laneCount = this.lanes.length - 1;
      if (laneCount - this.selectedLaneIndex > this.scrollBoundaries) {
        const lastLaneIndex = this.selectedLaneIndex;
        this.selectedLaneIndex = Math.min(lastLaneIndex + 1, laneCount);
        const selectedLane = this.lanes[this.selectedLaneIndex];
        const lastFocusLane = this.lanes[lastLaneIndex];
        this.updateGridStyle(selectedLane.laneYPosition);
        selectedLane.onFocus();
        lastFocusLane.onblur();
      }
    } else if (event.key === 'ArrowRight') {
      const selectedLane = this.lanes[this.selectedLaneIndex];
      selectedLane.handleKeyDown(event);
    } else if (event.key === 'ArrowLeft') {
      const selectedLane = this.lanes[this.selectedLaneIndex];
      selectedLane.handleKeyDown(event);
    }
  };
}

export default Grid;
