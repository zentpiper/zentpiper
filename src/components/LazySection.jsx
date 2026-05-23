import { useState, useEffect, useRef } from 'react';

/**
 * LazySection - Renders children only when the section enters the viewport.
 * This reduces TBT by deferring the rendering of below-the-fold content.
 */
function LazySection({ children, className, rootMargin = '200px' }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IntersectionObserver is not supported, render immediately
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
    <div ref={ref} className={className}>
      {isVisible ? children : null}
    </div>
  );
}

export default LazySection;
