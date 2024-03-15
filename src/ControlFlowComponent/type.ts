import type { ReadonlySignal } from '@preact/signals';

export type GetValue<T> = T extends Accessor<infer U> ? U : T extends ReadonlySignal<infer U> ? U : never;

export type Accessor<T> = () => T;

export type Reactive<T> = ReadonlySignal<T> | Accessor<T>;

export type UnknownReactive = Reactive<unknown>;

export type AnyReactive = Reactive<any>;
