/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.scss' {
  interface ClassNames {
    [className: string]: string;
  }
  const classNames: ClassNames;
  export = classNames;
}

declare module '*.css' {
  const mapping: Record<string, string>;
  export default mapping;
}

interface Fastdom {
  catch: null | ((e: unknown) => any);
  clear<T extends () => void>(task: T): boolean;
  extend<T extends object>(props: T): Omit<this, keyof T & keyof this> & T;
  measure<T extends () => void>(task: T, context?: any): T;
  mutate<T extends () => void>(task: T, context?: any): T;
}

interface FastDomPromised {
  clear<T extends Promise<any>>(task: T): void;
  initialize(): void;
  measure<T extends () => any>(task: T, context?: any): Promise<ReturnType<T>>;
  mutate<T extends () => any>(task: T, context?: any): Promise<ReturnType<T>>;
}
