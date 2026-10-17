import { useEffect, useState } from 'react';
import { useInView, useReducedMotion } from '../hooks';

const DIGITS = '01234567890123456789'.split('');

// Odometer: every digit spins through 0-9 at least once before landing on its value.
// Each strip carries its own clipped gradient, since background-clip: text doesn't reach
// into transformed children.
export function Odometer({ value, gradient, active, delay = 0 }) {
  const reduce = useReducedMotion();
  const live = active || reduce;
  const chars = String(value).split('');
  const isDigit = (ch) => ch >= '0' && ch <= '9';
  return (
    <>
      <span className="sr-only">{value}</span>
      <span className="odo" aria-hidden="true">
        {chars.map((ch, i) => {
          const bg = { backgroundImage: gradient };
          if (!isDigit(ch)) return <span key={i} className="odo-ch" style={bg}>{ch}</span>;
          // Stagger by position among digits only, so "5h → 30m" rolls 5, 3, 0 in sequence.
          const d = delay + chars.slice(0, i).filter(isDigit).length * 0.11;
          const style = {
            ...bg,
            transform: `translateY(${live ? -(10 + Number(ch)) * 1.1 : 0}em)`,
            transition: live && !reduce ? `transform 2.2s cubic-bezier(.16,1,.3,1) ${d.toFixed(2)}s` : 'none',
          };
          return (
            <span key={i} className="odo-dg">
              <span className="odo-strip" style={style}>{DIGITS.map((n, j) => <span key={j}>{n}</span>)}</span>
            </span>
          );
        })}
      </span>
    </>
  );
}

// Types its parts out once the heading scrolls into view. An invisible copy of the full
// text reserves the final layout so nothing shifts while typing.
// parts: [{ text, className?, style? }]
export function TypeHeading({ as = 'h2', parts, className = '', style, speed = 42, delay = 0 }) {
  const Tag = as;
  const reduce = useReducedMotion();
  const [ref, inView] = useInView({ once: true, threshold: 0.4 });
  const total = parts.reduce((n, p) => n + p.text.length, 0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return undefined;
    let n = 0;
    let interval;
    const start = setTimeout(() => {
      interval = setInterval(() => {
        n += 1;
        setCount(n);
        if (n >= total) clearInterval(interval);
      }, speed);
    }, delay);
    return () => { clearTimeout(start); clearInterval(interval); };
  }, [inView, reduce, total, speed, delay]);

  const shown = reduce ? total : count;
  const live = parts.map((p, i) => {
    const before = parts.slice(0, i).reduce((n, q) => n + q.text.length, 0);
    return <span key={i} className={p.className} style={p.style}>{p.text.slice(0, Math.max(0, shown - before))}</span>;
  });

  return (
    <Tag ref={ref} className={`type ${className}`} style={style} aria-label={parts.map((p) => p.text).join('')}>
      <span className="type-ghost" aria-hidden="true">
        {parts.map((p, i) => <span key={i} className={p.className}>{p.text}</span>)}
      </span>
      <span className="type-live" aria-hidden="true">
        {live}
        {inView && shown < total && <span className="caret" />}
      </span>
    </Tag>
  );
}
