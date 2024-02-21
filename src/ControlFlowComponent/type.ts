import type { ReadonlySignal } from '@preact/signals';

export type Accessor<T> = () => T;

export type Reactive<T> = ReadonlySignal<T> | Accessor<T>;

export type UnknownReactive = Reactive<unknown>;
