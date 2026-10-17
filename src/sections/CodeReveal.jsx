import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks';

// Apple "M5"-style moment: a full-screen live-coding scene collapses into giant letters
// that keep the scene playing inside them, then a paragraph lights up phrase by phrase.
// Scroll progress is written to --p (0..1) on the section, and all choreography lives in CSS.

const CODE = [
  ['k', 'func'], ' estimateCoreTemp(hr: ', ['t', 'Double'], ') -> ', ['t', 'Double'], ' {', '\n',
  '    kalman.', ['f', 'predict'], '()', '\n',
  '    ', ['k', 'return'], ' kalman.', ['f', 'update'], '(with: hr)  ', ['c', '// on-device, no cloud'], '\n', '}', '\n\n',
  ['d', '@app.post'], '(', ['s', '"/summaries/{role}"'], ')', '\n',
  ['k', 'async def'], ' ', ['f', 'summarize'], '(note_id: ', ['t', 'str'], ', role: ', ['t', 'Role'], '):', '\n',
  '    chunks = ', ['k', 'await'], ' ', ['f', 'retrieve'], '(note_id, k=', ['n', '12'], ')', '\n',
  '    ranked = ', ['f', 'rerank'], '(chunks, role=role)  ', ['c', '# SOAP-aware'], '\n',
  '    ', ['k', 'return await'], ' llm.', ['f', 'complete'], '(', ['f', 'prompt_for'], '(role), ranked)', '\n\n',
  ['k', 'SELECT'], ' provider_id, ', ['f', 'COUNT'], '(*) ', ['k', 'AS'], ' failed_syncs', '\n',
  ['k', 'FROM'], ' appointment_sync', '\n',
  ['k', 'WHERE'], ' status = ', ['s', "'FAILED'"], ' ', ['k', 'AND'], ' synced_at > ', ['f', 'now'], '() - ', ['k', 'interval'], ' ', ['s', "'1 day'"], '\n',
  ['k', 'GROUP BY'], ' provider_id;', '\n\n',
  ['k', 'export const'], ' ', ['f', 'validateEntry'], ' = (text: ', ['t', 'string'], ') =>', '\n',
  '  text.', ['f', 'trim'], '().length > ', ['n', '0'], ' && text.length <= ', ['t', 'MAX_ENTRY'], ';', '\n\n',
];

const STORY = [
  ['3.9 years', ' of turning messy problems into software people rely on: '],
  ['calendar sync for 30+ practice-management systems', ' at Zocdoc, '],
  ['a health app that runs entirely on a wrist', ', '],
  ["an AI that knows who's reading", ', and '],
  ['a forensic research platform', ' built with a team of 15+. '],
  ['All of it built to be trusted.', ''],
];

function CodeBlock() {
  return (
    <pre className="cr-code">
      {CODE.map((tok, i) => (typeof tok === 'string' ? tok : <span key={i} className={`tok-${tok[0]}`}>{tok[1]}</span>))}
    </pre>
  );
}

export default function CodeReveal() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return undefined;
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / travel));
      el.style.setProperty('--p', p.toFixed(4));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduce]);

  return (
    <section ref={ref} className={`code-reveal${reduce ? ' still' : ''}`} aria-labelledby="cr-title">
      <div className="cr-stage">
        <div className="cr-live" aria-hidden="true">
          <div className="cr-scroll"><CodeBlock /><CodeBlock /></div>
        </div>
        <div className="cr-mask">
          <h2 id="cr-title" className="cr-word">Code that ships.</h2>
        </div>
        <p className="cr-story">
          {STORY.map(([bold, rest], i) => (
            <span key={bold} style={{ '--i': i }}>
              <b>{bold}</b>{rest}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
