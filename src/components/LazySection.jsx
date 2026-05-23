import { useState, useEffect, useRef } from 'react';

/**
 * LazySection - Renders children only when the section enters the viewport.
 * Uses min-height to reserve space and prevent CLS.
 */
function LazySection({ children, minHeight = '400px', rootMargin = '200px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} style={isVisible ? undefined : { minHeight }}>
      {isVisible ? children : null}
    </div>
  );
}

export default LazySection;
