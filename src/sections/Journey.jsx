import { useState } from 'react';
import { CHAPTERS, GRAD } from '../content';
import { useInView } from '../hooks';
import { Odometer, TypeHeading } from '../components/Motion';
import { AwardsStage, DeviceStage, IconStage, Slideshow } from '../components/Visuals';

function Visual({ chapter: c, tabIndex }) {
  switch (c.visual) {
    case 'awards': return <AwardsStage glow={c.glow} />;
    case 'device': return <DeviceStage glow={c.glow} />;
    case 'slides': return <Slideshow images={c.slides} chrome tabIndex={tabIndex} />;
    default: return <IconStage glow={c.glow} icon={c.icon} caption={c.caption} />;
  }
}

function Chapter({ chapter: c, index, active, rolled, onOpen, onNext, isLast }) {
  const on = index === active;
  const tabIndex = on ? 0 : -1;
  const headline = [{ text: `${c.lead} ` }, { text: c.accent, className: 'grad-text', style: { backgroundImage: c.grad } }];

  return (
    <article
      id={`chapter-${c.key}`}
      role="tabpanel"
      aria-labelledby={`tab-${c.key}`}
      aria-hidden={!on}
      inert={on ? undefined : true}
      className={`card chapter ${index < active ? 'before' : 'after'}`}
    >
      <div aria-hidden="true" className="follow" style={{ right: -260, top: -280 }}>
        <div className="glow-orb" style={{ width: 660, height: 660, background: `radial-gradient(circle, ${c.glow} 0%, transparent 70%)`, filter: 'blur(30px)' }} />
      </div>

      <div className="chapter-head">
        <p className="chapter-kicker" style={{ color: c.color }}>{c.kicker}</p>
        {c.logo && <img src={c.logo} alt={c.logoAlt || c.org} className="logo sm" style={{ height: 24 }} />}
      </div>
      <div className="role-pill">
        <span className="dot" style={{ background: c.color }} />
        <b>{c.role}</b>
        <span style={{ color: 'var(--text-3)' }}>{c.org}</span>
      </div>

      {/* Remount the active headline so it types afresh on every chapter switch. */}
      {on
        ? <TypeHeading key={`h-${active}`} as="h3" parts={headline} speed={36} />
        : <h3>{headline.map((p) => <span key={p.text} className={p.className} style={p.style}>{p.text}</span>)}</h3>}

      <p className="chapter-line">{c.line}</p>

      <div className="stats3">
        {c.stats.map((s, i) => (
          <div key={s.l}>
            <div className="stat-value"><Odometer value={s.v} gradient={i === 0 ? c.grad : GRAD.white} active={on && rolled} delay={i * 0.15} /></div>
            <div className="stat-label">{s.l}</div>
          </div>
        ))}
      </div>

      <Visual chapter={c} tabIndex={tabIndex} />

      <div className="chapter-foot">
        <div className="row-gap">
          {c.actions.map((a) => (a.href
            ? <a key={a.label} className="pill" href={a.href} target="_blank" rel="noopener noreferrer">{a.label}</a>
            : <button key={a.label} type="button" className="pill" onClick={() => onOpen(a.sheet)}>{a.label}</button>))}
        </div>
        <button type="button" className="link-btn" style={{ fontSize: 15 }} onClick={onNext}>
          {isLast ? 'Back to the start ›' : `Next: ${CHAPTERS[index + 1].label} ›`}
        </button>
      </div>
    </article>
  );
}

export default function Journey({ onOpen }) {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView({ threshold: 0.2 });

  return (
    <section id="journey" className="wrap section" style={{ paddingBottom: 140 }}>
      <div className="journey">
        <div className="journey-side">
          <div>
            <p className="eyebrow">The journey</p>
            <TypeHeading className="h2" parts={[{ text: 'From production data to applied AI.' }]} />
          </div>
          <div className="chapters" role="tablist" aria-label="Chapters" aria-orientation="vertical">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.key}
                id={`tab-${c.key}`}
                type="button"
                role="tab"
                className="chap"
                aria-selected={i === active}
                aria-controls={`chapter-${c.key}`}
                style={i === active ? { borderLeftColor: c.color } : undefined}
                onClick={() => setActive(i)}
              >
                <span className="chap-label">{c.label}</span>
                <span className="chap-role">{c.role}</span>
              </button>
            ))}
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--text-4)' }}>Chapter {active + 1} of {CHAPTERS.length}</p>
        </div>

        <div ref={ref} className="chapter-stage">
          {CHAPTERS.map((c, i) => (
            <Chapter
              key={c.key}
              chapter={c}
              index={i}
              active={active}
              rolled={inView}
              onOpen={onOpen}
              onNext={() => setActive((i + 1) % CHAPTERS.length)}
              isLast={i === CHAPTERS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
