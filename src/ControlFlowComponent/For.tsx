import { Key, isValidElement, createElement, Fragment, cloneElement, VNode } from 'preact';
import { useSignalOfReactive, useSignalOfState, useComputedOnce } from './helper';
import { GetValue, Reactive } from './type';

type GetArrItemValue<T extends Reactive<any[]>> = GetValue<T>[number];

export type KeyExtractor<T> = (item: T, index: number) => Key;
export type ForProps<T extends Reactive<any[]>> = {
  each: T;
  fallback?: VNode;
  children: (accessor: GetArrItemValue<T>, index: number) => VNode;
} & (GetArrItemValue<T> extends Key
  ? { keyExtractor?: KeyExtractor<GetArrItemValue<T>> }
  : { keyExtractor: KeyExtractor<GetArrItemValue<T>> });

const For = <T extends Reactive<any[]>>({ children, each, fallback, keyExtractor }: ForProps<T>): JSX.Element => {
  const eachComputed = useSignalOfReactive(each);
  const fallbackComputed = useSignalOfState(fallback);

  return useComputedOnce(() =>
    eachComputed.value.length === 0
      ? fallbackComputed.value
      : eachComputed.value.map((value: GetValue<T>, index) => {
          const result = children(value, index);
          const key = keyExtractor ? keyExtractor(value, index) : (value as Key);
          if (!isValidElement(result)) {
            return createElement(Fragment, { key }, result);
          }
          return cloneElement(result, { ...result.props, key }, result?.props?.children);
        }),
  ).value as JSX.Element;
};

export default For;
