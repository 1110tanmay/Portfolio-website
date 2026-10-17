import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react';

const REDUCE_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReduce(cb) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener('change', cb);
  return () => mq.removeEventListener('change', cb);
}

export function useReducedMotion() {
  return useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE_QUERY).matches, () => false);
}

// `once`: stay true after the first intersection. Otherwise it flips back so animations replay.
export function useInView({ once = false, threshold = 0.3 } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined');
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (once) obs.disconnect();
      } else if (!once) {
        setInView(false);
      }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold]);
  return [ref, inView];
}

// Monotonic counter for slideshows. Paused when the user prefers reduced motion.
export function useTick(ms = 3600) {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduce) return undefined;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [ms, reduce]);
  return tick;
}

// Apple-style scroll reveal. Every [data-reveal] element fades up into focus the first
// time it enters the viewport; `--d` on the element staggers it. The hiding class is added
// before first paint (layout effect), and only when the reveal can actually run, so content
// is never stuck invisible without JS, without IntersectionObserver or under reduced motion.
export function useRevealOnScroll() {
  const reduce = useReducedMotion();
  useLayoutEffect(() => {
    if (reduce || typeof IntersectionObserver === 'undefined') return undefined;
    const root = document.documentElement;
    root.classList.add('reveal-ready');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        obs.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => obs.observe(el));
    return () => {
      obs.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, [reduce]);
}

// Writes the pointer position (-0.5..0.5) to --mx / --my on <html>, so glows and
// Martha's eyes follow the cursor in pure CSS without re-rendering React.
export function useMouseVars() {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return undefined;
    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e) => {
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        root.style.setProperty('--mx', x.toFixed(3));
        root.style.setProperty('--my', y.toFixed(3));
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);
}
