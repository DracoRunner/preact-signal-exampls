import { Component, ComponentChildren } from 'preact';



declare global {
  interface Window {
    fastdom: Fastdom;
    fastdomPromised: FastDomPromised;
    appConfig: string;
  }
}

export interface StoreContext {
  dom: Pick<Fastdom, 'catch' | 'extend'> & FastDomPromised;
}

export type PagePersist = Record<string, any>;
export type LayoutValue = {
  pre: null | string;
  next: null | string;
};

const dom = window.fastdom.extend(window.fastdomPromised);
dom.initialize();

export class StoreProvider extends Component {
  getChildContext(): StoreContext {
    return {
      dom,
    };
  }

  render(): ComponentChildren {
    return this.props.children;
  }
}
