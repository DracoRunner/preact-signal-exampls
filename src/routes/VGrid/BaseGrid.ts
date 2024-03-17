import { signal } from '@preact/signals';

class Base {
  container: HTMLElement;
  items: any[] = [];
  currentIndex = signal<number>(-1);
  lastIndex = signal<number>(-1);
  itemRefs: any[] = [];
  scrollBoundary!: number;

  constructor(container: HTMLElement, scrollBoundary: number, items: any[]) {
    this.container = container;
    this.scrollBoundary = scrollBoundary;
    this.items = items;
  }

  getContainer() {
    return this.container;
  }

  onFocus() {
    this.itemRefs[this.currentIndex.value].onFocus();
  }

  onblur() {
    this.itemRefs[this.lastIndex.value].onblur();
  }
}

export default Base;
