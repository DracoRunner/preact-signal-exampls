import { VNode } from 'preact';
import { ForwardedRef } from 'preact/compat';
import './style.css';

export type Props = {
  title: string;
  laneRef: ForwardedRef<HTMLDivElement>;
};

export default ({ title, laneRef }: Props): VNode => {
  return (
    <>
      <label className="carousel-title">{title}</label>
      <div className="carousel-item-container" ref={laneRef}></div>
    </>
  );
};
