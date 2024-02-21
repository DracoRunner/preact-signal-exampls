
import { useRef } from 'preact/hooks';
import type { UnknownReactive } from './type';
import { ReadonlySignal, computed, useComputed, useSignal } from '@preact/signals';

export const unwrapReactive = (signalOrAccessor: UnknownReactive): unknown =>
  typeof signalOrAccessor === 'function'
    ? signalOrAccessor()
    : signalOrAccessor.value;

export const useComputedOnce = <T>(compute: () => T): ReadonlySignal<T> => {
  const c = useRef<null | ReadonlySignal<T>>(null);

  if (c.current === null) {
    c.current = computed(compute);
  }

  return c.current;
};

export const useSignalOfReactive = (
  reactive: UnknownReactive,
): ReadonlySignal<unknown> => useComputed(() => unwrapReactive(reactive));

export const useSignalOfState = <T>(state: T): ReadonlySignal<T> => {
  const s = useSignal(state);

  if (s.peek() !== state) {
    s.value = state;
  }

  return s;
};
