import { HERO, LINKS, NEWS, PORTRAIT } from '../content';
import { useInView, useTick } from '../hooks';
import { Odometer, TypeHeading } from '../components/Motion';
import { YouTubeLogo } from '../components/icons';

const AURAS = [
  { left: '48%', top: -160, size: 820, fx: '180px', fy: '120px', cls: 'drift', bg: 'radial-gradient(circle, rgba(48,209,88,.32) 0%, rgba(100,210,255,.2) 35%, transparent 68%)', blur: 40 },
  { left: '2%', top: 240, size: 700, fx: '-140px', fy: '-110px', cls: 'drift-2', bg: 'radial-gradient(circle, rgba(191,90,242,.3) 0%, rgba(41,151,255,.16) 40%, transparent 70%)', blur: 50 },
  { left: '72%', top: 440, size: 460, fx: '90px', fy: '-140px', cls: 'drift', bg: 'radial-gradient(circle, rgba(255,159,10,.22) 0%, transparent 70%)', blur: 40 },
];

const GLANCE_GRADS = [
  'linear-gradient(135deg, #2997ff, #5ac8fa)',
  'linear-gradient(135deg, #bf5af2, #ff375f)',
  'linear-gradient(135deg, #ffd60a, #ff9f0a)',
  'linear-gradient(135deg, #64d2ff, #30d158)',
];

// Cycles through job titles; the grid cell sizes itself to the longest one, so nothing jumps.
function RoleRotator() {
  const tick = useTick(2400);
  const n = HERO.roles.length;
  const current = tick % n;
  return (
    <p className="role-line" data-reveal="" style={{ '--d': '0.08s' }}>
      <span>Tanmay Shelar</span>
      <span className="sep" aria-hidden="true">/</span>
      <span className="sr-only">{HERO.roles.join(', ')}</span>
      <span className="rotator" aria-hidden="true">
        {HERO.roles.map((r, i) => (
          <span key={r} className={i === current ? 'on' : i === (current - 1 + n) % n ? 'prev' : ''}>{r}</span>
        ))}
      </span>
    </p>
  );
}

function Glance() {
  const [ref, inView] = useInView({ threshold: 0.4 });
  return (
    <div ref={ref} className="glance" aria-label="At a glance" data-reveal="" style={{ '--d': '0.1s' }}>
      {HERO.glance.map((g, i) => (
        <div key={g.l}>
          <span className="glance-v">
            <Odometer value={g.v} gradient={GLANCE_GRADS[i]} active={inView} delay={i * 0.12} />
            {g.unit && <small>{g.unit}</small>}
          </span>
          <span className="glance-l">{g.l}</span>
          <span className="glance-sub">{g.sub}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero({ onAsk }) {
  return (
    <section id="top" className="hero hero-depth">
      <div aria-hidden="true">
        {AURAS.map((a) => (
          <div key={a.left} className="follow" style={{ left: a.left, top: a.top, '--fx': a.fx, '--fy': a.fy }}>
            <div className={`glow-orb ${a.cls}`} style={{ width: a.size, height: a.size, background: a.bg, filter: `blur(${a.blur}px)` }} />
          </div>
        ))}
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="avail" data-reveal="">
            <span className="pulse" style={{ background: '#30d158', color: '#30d158' }} aria-hidden="true" />
            <strong>Available December 2026</strong>
            <span aria-hidden="true" style={{ color: '#48484a' }}>·</span>
            <span>OPT, STEM extension eligible</span>
          </div>

          <RoleRotator />

          <TypeHeading
            as="h1"
            className="h1"
            data-reveal=""
            style={{ '--d': '0.16s' }}
            delay={300}
            parts={[
              { text: 'Software built to be ' },
              { text: 'trusted.', className: 'grad-text', style: { backgroundImage: 'linear-gradient(90deg, #64d2ff 0%, #30d158 100%)' } },
            ]}
          />

          <p className="hero-sub" data-reveal="" style={{ '--d': '0.26s' }}>Full-stack, iOS and applied-AI engineer. I learned in healthcare, where privacy, uptime and accuracy aren't optional, and I bring that standard to every product.</p>

          <div className="hero-ctas" data-reveal="" style={{ '--d': '0.34s' }}>
            <a className="ghost" href={LINKS.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
            <button type="button" className="link-btn" onClick={onAsk}>Ask Martha, my AI agent ›</button>
          </div>

          <a className="tv-chip" data-reveal="" style={{ '--d': '0.42s' }} href={NEWS.tv.href} target="_blank" rel="noopener noreferrer">
            <span className="tv-thumb">
              <img src={NEWS.tv.thumb} alt="" />
              <span className="center-overlay" style={{ background: 'rgba(0,0,0,.2)' }}><YouTubeLogo width={34} /></span>
            </span>
            <span className="stack-col">
              <span className="kicker-sm" style={{ color: '#ff9f0a' }}>Featured on {NEWS.tv.outlet}</span>
              <span style={{ fontSize: 15, fontWeight: 600 }}>{NEWS.tv.topic} interview</span>
              <span style={{ fontSize: 13, color: 'var(--link)' }}>Watch on YouTube ›</span>
            </span>
          </a>
        </div>

        <div className="portrait-wrap" data-reveal="" style={{ '--d': '0.2s', '--ry': '24px' }}>
          <div aria-hidden="true" className="follow" style={{ inset: -28, borderRadius: 52, background: 'conic-gradient(from 210deg, #2997ff, #64d2ff, #30d158, #ff9f0a, #bf5af2, #2997ff)', filter: 'blur(40px)', opacity: 0.45, '--fx': '40px', '--fy': '30px' }} />
          <img src={PORTRAIT} alt="Portrait of Tanmay Shelar" width="470" height="470" />
        </div>
      </div>

      <div className="wrap" style={{ position: 'relative', paddingBottom: 110 }}>
        <Glance />
      </div>
    </section>
  );
}
