import { Signal, effect } from "@preact/signals";
import { DeepSignal, useDeepSignal } from "deepsignal";

export const useCustomDeepSignal = <T extends object>(signal: Signal<T>): DeepSignal<T> => {
    const signalValue = useDeepSignal({ update: (newObject: T) => Object.assign(signalValue, newObject) });

    effect(() => {
        signalValue.update(signal.value)
    });

    return signalValue as DeepSignal<T>;
};
