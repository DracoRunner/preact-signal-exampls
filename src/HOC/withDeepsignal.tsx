import { useMemo } from 'preact/compat';
import { useCustomDeepSignal } from '../hooks/useDeepsignal';
import { Signal } from '@preact/signals';
import { DeepSignal } from 'deepsignal';
import { ComponentType } from 'preact';

export const withDeepsignal = <T extends object>(
  WrappedComponent: ComponentType<{ [K in keyof T]: DeepSignal<T[K]> }>,
) => {
  return (props: { [K in keyof T]: Signal<T[K]> | T[K] }) => {
    const deepSignalProps = useMemo(() => {
      return Object.entries(props).reduce((acc, [key, value]) => {
        if (value instanceof Signal) {
          acc[key] = useCustomDeepSignal(value);
        } else {
          acc[key] = value;
        }
        return acc;
      }, {} as { [K in keyof T]: DeepSignal<T[K]> });
    }, [props]);

    return <WrappedComponent {...deepSignalProps} />;
  };
};
