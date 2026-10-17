import { useEffect, useRef, useState } from 'react';
import { GRAD, LINKS, NEWS } from '../content';
import { Odometer } from './Motion';
import { DeviceStage, Slideshow } from './Visuals';
import { GitHubLogo, Icon, YouTubeLogo } from './icons';

// Native <dialog> gives focus trapping, Esc to close and focus return for free.
export default function StorySheet({ sheet, onClose, onAsk }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (sheet && !dialog.open) dialog.showModal();
    if (!sheet && dialog.open) dialog.close();
  }, [sheet]);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby="sheet-title"
      onClose={onClose}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      {sheet && <SheetBody key={sheet.title} sheet={sheet} onClose={onClose} onAsk={onAsk} />}
    </dialog>
  );
}

function SheetBody({ sheet: s, onClose, onAsk }) {
  // Roll the stats a beat after the sheet opens.
  const [rolled, setRolled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setRolled(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="sheet-panel">
      <div aria-hidden="true" className="glow-orb" style={{ position: 'absolute', width: 640, height: 640, right: -260, top: -320, background: `radial-gradient(circle, ${s.glow} 0%, transparent 70%)`, filter: 'blur(30px)', pointerEvents: 'none' }} />
      <button type="button" className="pill sheet-close" aria-label="Close" onClick={onClose}><Icon name="close" size={16} width={2.5} /></button>

      <div className="sheet-pad" style={{ paddingTop: 52, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {s.logo
          ? <img src={s.logo} alt={s.org} className="logo lg" style={{ alignSelf: 'flex-start', marginBottom: 6 }} />
          : <span className="role-pill" style={{ marginBottom: 6, fontSize: 14 }}><span className="dot" style={{ background: s.color, width: 8, height: 8 }} /><b>{s.org}</b></span>}
        <p className="chapter-kicker" style={{ color: s.color }}>{s.kicker}</p>
        <h2 id="sheet-title">{s.title}</h2>
        <p className="sheet-sub">{s.subtitle}</p>
      </div>

      {s.slides && <div className="sheet-pad" style={{ paddingTop: 32 }}><Slideshow images={s.slides} wide /></div>}
      {s.device && <div className="sheet-pad" style={{ paddingTop: 32 }}><DeviceStage glow={s.glow} wide /></div>}

      <div className="sheet-pad sheet-stats" style={{ paddingTop: 32 }}>
        {s.stats.map((st, i) => (
          <div key={st.l} className="sheet-stat">
            <div className="stat-value"><Odometer value={st.v} gradient={i === 0 ? s.grad : GRAD.white} active={rolled} delay={i * 0.15} /></div>
            <div className="stat-label" style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 6 }}>{st.l}</div>
          </div>
        ))}
      </div>

      <div className="sheet-pad sheet-grid" style={{ paddingTop: 36 }}>
        <div>
          <h3 className="sheet-label">What I did</h3>
          <ul className="bullets">
            {s.bullets.map((b) => <li key={b}><span className="dot" style={{ background: s.color }} />{b}</li>)}
          </ul>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          {s.note && (
            <div>
              <h3 className="sheet-label" style={{ marginBottom: 10 }}>Why it exists</h3>
              <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: '#d2d2d7' }}>{s.note}</p>
            </div>
          )}
          <div>
            <h3 className="sheet-label" style={{ marginBottom: 12 }}>Built with</h3>
            <div className="row-gap" style={{ gap: 8 }}>{s.stack.map((t) => <span key={t} className="chip">{t}</span>)}</div>
          </div>
        </div>
      </div>

      {s.arch && (
        <div className="sheet-pad" style={{ paddingTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 14 }}>
            <h3 className="sheet-label" style={{ margin: 0 }}>System design</h3>
            <a href={s.arch.src} target="_blank" rel="noopener noreferrer" style={{ fontSize: 14 }}>Open full size ›</a>
          </div>
          <p style={{ margin: '0 0 16px', fontSize: 16, lineHeight: 1.55, color: 'var(--text-2)', maxWidth: 760 }}>{s.arch.note}</p>
          <div style={{ borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(255,255,255,.1)', background: s.arch.bg, display: 'flex', justifyContent: 'center' }}>
            <img src={s.arch.src} alt={s.arch.alt} loading="lazy" style={{ display: 'block', width: '100%', maxHeight: 720, objectFit: 'contain' }} />
          </div>
        </div>
      )}

      {s.awards && (
        <div className="sheet-pad" style={{ paddingTop: 40 }}>
          <h3 className="sheet-label">Engineering recognition</h3>
          <div className="two-col">
            {s.awards.map((a) => (
              <a key={a.src} className="media mini" href={a.src} target="_blank" rel="noopener noreferrer">
                <span style={{ display: 'block', aspectRatio: '16 / 9', background: '#0b0b0c', overflow: 'hidden' }}><img src={a.src} alt={a.alt} className="cover" loading="lazy" /></span>
                <span className="body">
                  <span style={{ fontSize: 15, fontWeight: 700 }}>{a.title}</span>
                  <span className="code-tag" style={{ padding: '3px 8px' }}>{a.tag}</span>
                  <span className="quote" style={{ fontSize: 14, color: 'var(--text-2)' }}>“{a.quote}”</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      )}

      {s.media && (
        <div className="sheet-pad" style={{ paddingTop: 40 }}>
          <h3 className="sheet-label">More of the story</h3>
          <div className="media-grid">
            <a className="media mini feature" href={NEWS.tv.href} target="_blank" rel="noopener noreferrer">
              <span style={{ position: 'relative', display: 'block', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                <img src={NEWS.tv.thumb} alt="ABC15 Arizona news segment thumbnail" className="cover" />
                <span className="live-badge" style={{ left: 16, top: 14, fontSize: 12, padding: '6px 12px' }}><span className="dot" style={{ background: '#ff375f' }} />On TV · {NEWS.tv.outlet}</span>
                <span className="center-overlay"><YouTubeLogo width={76} /></span>
              </span>
              <span className="body" style={{ padding: '18px 20px 20px' }}>
                <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>{NEWS.tv.title}</span>
                <span style={{ fontSize: 14, color: 'var(--text-2)' }}>{NEWS.tv.note}</span>
                <span style={{ fontSize: 14, color: 'var(--link)' }}>Watch on YouTube ›</span>
              </span>
            </a>
            <a className="media mini" href={NEWS.medium.href} target="_blank" rel="noopener noreferrer" style={{ padding: 20, gap: 10, justifyContent: 'space-between' }}>
              <span className="kicker-sm" style={{ color: 'var(--text-2)' }}>On Medium</span>
              <span className="serif" style={{ fontSize: 22 }}>{NEWS.medium.title}</span>
              <span style={{ fontSize: 13, color: 'var(--text-2)' }}>The hospital stay behind Clinavis.</span>
              <span style={{ fontSize: 14, color: 'var(--link)' }}>Read the story ›</span>
            </a>
            <a className="media mini" href={LINKS.clinavisRepo} target="_blank" rel="noopener noreferrer" style={{ padding: 20, gap: 10, justifyContent: 'space-between' }}>
              <span className="kicker-sm" style={{ color: 'var(--text-2)', display: 'inline-flex', alignItems: 'center', gap: 8 }}><GitHubLogo size={16} />On GitHub</span>
              <span style={{ fontSize: 17, fontWeight: 600 }}>Clinavis.ai repository</span>
              <span style={{ fontSize: 14, color: 'var(--link)' }}>View the code ›</span>
            </a>
          </div>
        </div>
      )}

      <div className="sheet-pad sheet-actions">
        {s.links.map((l) => <a key={l.href} className="pill" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>)}
        <button type="button" className="pill accent" onClick={onAsk}>{s.ask}</button>
      </div>
    </div>
  );
}
