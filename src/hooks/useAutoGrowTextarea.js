import { useLayoutEffect, useRef } from 'react';

/**
 * Grows a textarea to fit its content instead of scrolling internally —
 * the fix for the original design's cramped description field. Recomputes
 * on mount and whenever `value` changes.
 */
export function useAutoGrowTextarea(value) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return ref;
}
