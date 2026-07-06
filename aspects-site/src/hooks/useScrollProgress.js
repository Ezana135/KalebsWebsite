import { useEffect, useRef } from 'react';

/**
 * Drives a scroll-linked animation: sets a CSS custom property (default --p,
 * 0 → 1) on the returned element as the user scrolls through it. The element
 * is expected to be a tall wrapper containing a position:sticky stage.
 * Respects prefers-reduced-motion by pinning the property to 1.
 */
export default function useScrollProgress(varName = '--p') {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty(varName, '1');
      return undefined;
    }

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 1;
      el.style.setProperty(varName, p.toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Catch layout shifts and anchor jumps that don't always fire scroll.
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    ro.observe(document.documentElement);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [varName]);

  return ref;
}
