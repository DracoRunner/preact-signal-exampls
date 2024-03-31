interface Observe<T> {
  subscribe(observer: (value: T) => void): void;
  unsubscribe(observer: (value: T) => void): void;
}

export default class Observable<T> implements Observe<T> {
  private value: T | undefined;
  private observers: Set<(prev: T, next: T) => void> = new Set();

  constructor(value?: T) {
    this.setValue(value);
  }

  peek() {
    return this.value;
  }

  setValue(newValue: T) {
    if (this.value === newValue) return;
    const prevValue = this.value;
    this.value = newValue;
    this.notifyObservers(prevValue, this.value);
  }

  subscribe(observer: (prev: T, next: T) => void) {
    this.observers.add(observer);
  }

  unsubscribe(observer: (value: T) => void) {
    this.observers.delete(observer);
  }

  private notifyObservers(prev: T, next: T) {
    for (const observer of this.observers) {
      observer(prev, next);
    }
  }
}
