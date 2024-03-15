import { ReadonlySignal, computed, useComputed, useSignal } from '@preact/signals';
import { useRef } from 'preact/hooks';
import type { AnyReactive, GetValue } from './type';

export const unwrapReactive = <T extends AnyReactive>(signalOrAccessor: T): GetValue<T> =>
  typeof signalOrAccessor === 'function' ? signalOrAccessor() : signalOrAccessor.value;

export const useComputedOnce = <T>(compute: () => T): ReadonlySignal<T> => {
  const c = useRef<null | ReadonlySignal<T>>(null);

  if (c.current === null) {
    c.current = computed(compute);
  }

  return c.current;
};

export const useSignalOfState = <T>(state: T): ReadonlySignal<T> => {
  const s = useSignal(state);

  if (s.peek() !== state) {
    s.value = state;
  }

  return s;
};

export const useSignalOfReactive = <T extends AnyReactive>(reactive: T): ReadonlySignal<GetValue<T>> =>
  useComputed(() => unwrapReactive(reactive));
