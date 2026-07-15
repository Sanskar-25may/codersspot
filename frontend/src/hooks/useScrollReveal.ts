import { useEffect, useRef, useState } from 'react';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-x'
  | 'flip-y'
  | 'slide-up'
  | 'rotate-in';

interface UseScrollRevealOptions {
  variant?: RevealVariant;
  delay?: number;          // ms
  threshold?: number;      // 0-1
  once?: boolean;
}

/**
 * Returns a ref to attach to any element, plus a boolean `isVisible`.
 * When the element enters the viewport, `isVisible` flips to true,
 * triggering the CSS transition defined on the element via `reveal-*` classes.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>({
  variant = 'fade-up',
  delay = 0,
  threshold = 0.12,
  once = true,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small artificial delay for staggered groups
          setTimeout(() => setIsVisible(true), delay);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold, once]);

  return { ref, isVisible, variant };
}

/**
 * Hook that returns reveal props for a list of items.
 * Automatically staggers delays by `staggerMs` per item.
 */
export function useStaggerReveal(
  count: number,
  {
    variant = 'fade-up',
    baseDelay = 0,
    staggerMs = 80,
    threshold = 0.1,
  }: {
    variant?: RevealVariant;
    baseDelay?: number;
    staggerMs?: number;
    threshold?: number;
  } = {}
) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = parentRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const items = Array.from({ length: count }, (_, i) => ({
    visible: isVisible,
    delay: baseDelay + i * staggerMs,
    variant,
  }));

  return { parentRef, items };
}

/**
 * Build the className string for a reveal element.
 * Always apply `reveal-base` plus the variant class, then `reveal-visible` when visible.
 */
export function revealClass(
  variant: RevealVariant,
  visible: boolean,
  extra = ''
): string {
  return `reveal-base reveal-${variant} ${visible ? 'reveal-visible' : ''} ${extra}`.trim();
}

/**
 * Build inline style with transition delay.
 */
export function revealStyle(
  delay: number,
  extra: React.CSSProperties = {}
): React.CSSProperties {
  return { transitionDelay: `${delay}ms`, ...extra };
}
