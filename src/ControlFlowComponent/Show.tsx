
import type { VNode } from 'preact';
import { useSignalOfReactive, useSignalOfState, useComputedOnce } from './helper';
import { UnknownReactive } from './type';

// Check the reference component: https://github.com/XantreGodlike/preact-signals/blob/main/packages/utils/src/components/components/Show.tsx

export type RenderWhenProps = {
  when: UnknownReactive;
  children: VNode;
  fallback?: VNode;
};

/**
 * Conditional rendering component that shows children based on a reactive condition.
 *
 * @param props - RenderWhenProps containing the reactive condition (when) and the children to be rendered.
 * @returns JSX.Element - The rendered component.
 */
const Show = (props: RenderWhenProps): JSX.Element => {
  const when = useSignalOfReactive(props.when);
  const children = useSignalOfState(props.children);
  const fallback = useSignalOfState(props.fallback);

  return useComputedOnce(() => (when.value ? children.value : fallback.value))
    .value as JSX.Element;
};

export default Show;
