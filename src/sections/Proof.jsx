import { PILLARS, TILES } from '../content';
import { useInView } from '../hooks';
import { Odometer, TypeHeading } from '../components/Motion';
import { Icon } from '../components/icons';

const GLOW_SPOT = {
  big: { size: 580, right: -180, bottom: -220 },
  wide: { size: 400, left: -120, bottom: -200 },
  small: { size: 280, right: -90, top: -100 },
};

function Tile({ tile, index, active, onOpen }) {
  const size = tile.size || 'small';
  const { size: glowSize, ...spot } = GLOW_SPOT[size];
  const Tag = tile.href ? 'a' : 'button';
  const props = tile.href ? { href: tile.href } : { type: 'button', onClick: () => onOpen(tile.sheet) };

  return (
    <Tag className={`card tile ${size === 'small' ? '' : size}`} aria-label={tile.label} {...props}>
      <div aria-hidden="true" className="follow" style={spot}>
        <div className="glow-orb" style={{ width: glowSize, height: glowSize, background: `radial-gradient(circle, ${tile.glow} 0%, transparent 70%)`, filter: `blur(${size === 'small' ? 10 : 18}px)` }} />
      </div>

      <div className="tile-top">
        {tile.org && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
            <img src={tile.org.logo} alt={tile.org.alt} className={`logo${size === 'big' ? ' lg' : tile.org.sub ? ' sm' : ''}`} />
            {tile.org.sub && <span style={{ fontSize: size === 'big' ? 15 : 13, color: 'var(--text-3)' }}>{tile.org.sub}</span>}
          </span>
        )}
        {tile.chip && (
          <span className="org-chip">
            <span className="ico" style={{ color: tile.chip.color, background: `${tile.chip.color}22`, border: `1px solid ${tile.chip.color}66` }}><Icon name={tile.chip.icon} size={14} width={2} /></span>
            {tile.chip.label}
          </span>
        )}
        {tile.pill && <span className="tag" style={tile.pill.color ? { color: tile.pill.color, borderColor: `${tile.pill.color}66` } : undefined}>{tile.pill.text}</span>}
        {size === 'big' && <span className="plus" aria-hidden="true"><Icon name="plus" size={15} width={2.5} /></span>}
      </div>

      <div style={{ position: 'relative' }}>
        <div className="tile-value"><Odometer value={tile.value} gradient={tile.grad} active={active} delay={index * 0.1} /></div>
        {tile.headline && <p className="tile-headline">{tile.headline}</p>}
        <p className="tile-caption">{tile.caption}</p>
        {tile.badge && <span className="award-badge"><Icon name="medal" size={14} width={2} />{tile.badge}</span>}
      </div>
    </Tag>
  );
}

export function Proof({ onOpen }) {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <section id="proof" className="wrap section">
      <p className="eyebrow">The proof</p>
      <TypeHeading className="h2" style={{ marginBottom: 16 }} parts={[{ text: 'Results, not adjectives.' }]} />
      <p className="lede" style={{ fontSize: 19, color: 'var(--text-3)' }}>Tap any number for the story behind it.</p>
      <div ref={ref} className="bento">
        {TILES.map((t, i) => <Tile key={t.id} tile={t} index={i} active={inView} onOpen={onOpen} />)}
      </div>
    </section>
  );
}

export function HowIWork() {
  return (
    <section id="why" className="wrap section">
      <p className="eyebrow">How I work</p>
      <TypeHeading className="h2" style={{ maxWidth: 980 }} parts={[{ text: 'Healthcare taught me ' }, { text: 'the hard version first.', className: 'muted' }]} />
      <p className="lede">Patient data, compliance audits, clinicians who can't afford a wrong answer. Building there set my bar for everything else.</p>
      <div className="pillars">
        {PILLARS.map((p) => (
          <div key={p.title} className="card pillar">
            <Icon name={p.icon} size={34} color={p.color} />
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
