import { useEffect, useRef, useState } from 'react';

type InViewOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
};

export function useInView(options: InViewOptions = {}) {
  const { root = null, rootMargin = '0px', threshold = 0.2, once = true } = options;
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setInView(false);
        }
      },
      { root, rootMargin, threshold }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [root, rootMargin, threshold, once]);

  return { ref, inView } as const;
}


