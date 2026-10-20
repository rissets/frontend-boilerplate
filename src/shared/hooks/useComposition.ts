import { useRef, type KeyboardEventHandler, type CompositionEventHandler } from 'react';
export function useComposition<T extends HTMLElement>(handlers: {
  onKeyDown?: KeyboardEventHandler<T>;
  onCompositionStart?: CompositionEventHandler<T>;
  onCompositionEnd?: CompositionEventHandler<T>;
}) {
  const active = useRef(false);
  const endedAt = useRef(0);
  return {
    onCompositionStart: ((event) => {
      active.current = true;
      handlers.onCompositionStart?.(event);
    }) as CompositionEventHandler<T>,
    onCompositionEnd: ((event) => {
      active.current = false;
      endedAt.current = Date.now();
      handlers.onCompositionEnd?.(event);
    }) as CompositionEventHandler<T>,
    onKeyDown: ((event) => {
      if (
        ['Enter', 'Escape'].includes(event.key) &&
        (active.current || event.nativeEvent.isComposing || Date.now() - endedAt.current < 150)
      ) {
        event.preventDefault();
        return;
      }
      handlers.onKeyDown?.(event);
    }) as KeyboardEventHandler<T>,
  };
}
