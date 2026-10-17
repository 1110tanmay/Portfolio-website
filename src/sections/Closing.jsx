import { useState } from 'react';
import { EDUCATION, FORM, LINKS, NEWS } from '../content';
import { useInView } from '../hooks';
import { Odometer, TypeHeading } from '../components/Motion';
import { GitHubLogo, Icon, LinkedInLogo, MailLogo, YouTubeLogo } from '../components/icons';

export function Education() {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <section id="education" className="wrap section depth">
      <p className="eyebrow" data-reveal="">Education</p>
      <TypeHeading className="h2" data-reveal="" style={{ marginBottom: 56, '--d': '0.08s' }} parts={[{ text: 'Where I learned ' }, { text: 'the fundamentals.', className: 'muted' }]} />
      <div ref={ref} className="edu-grid">
        {EDUCATION.map((e, i) => (
          <article key={e.school} className="card edu" data-reveal="" style={{ '--d': `${0.12 + i * 0.12}s` }}>
            <div aria-hidden="true" className="follow" style={{ right: -160, top: -200 }}>
              <div className="glow-orb" style={{ width: 480, height: 480, background: `radial-gradient(circle, ${e.glow} 0%, transparent 70%)`, filter: 'blur(20px)' }} />
            </div>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              {e.logo
                ? <img src={e.logo} alt={e.school} className="logo" style={{ height: 30 }} />
                : <span className="org-chip" style={{ fontSize: 15 }}><span className="ico" style={{ width: 30, height: 30, color: e.color, background: `${e.color}22`, border: `1px solid ${e.color}5a` }}><Icon name="building" size={16} width={2} /></span>{e.school}</span>}
              <span className="tag" style={{ fontWeight: 400, fontSize: 13 }}>{e.dates}</span>
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ margin: '0 0 6px', fontSize: 15, fontWeight: 600, color: e.color }}>{e.degree}</p>
              <h3>{e.field}</h3>
              <p style={{ margin: '8px 0 0', fontSize: 17, color: 'var(--text-2)' }}>{e.school} · {e.place}</p>
            </div>
            <div className="edu-cgpa">
              <Odometer value={e.cgpa} gradient={e.grad} active={inView} delay={i * 0.2} />
              <small>CGPA</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export function News() {
  const { tv, medium } = NEWS;
  return (
    <section id="news" className="wrap section depth">
      <p className="eyebrow" data-reveal="">In the news</p>
      <TypeHeading className="h2" data-reveal="" style={{ marginBottom: 56, '--d': '0.08s' }} parts={[{ text: 'On air, ' }, { text: 'and on the record.', className: 'muted' }]} />
      <div className="news-grid">
        <a className="card media tv-hero" data-reveal="" style={{ '--d': '0.14s' }} href={tv.href} target="_blank" rel="noopener noreferrer">
          <div aria-hidden="true" className="follow" style={{ left: -200, bottom: -260 }}>
            <div className="glow-orb" style={{ width: 640, height: 640, background: 'radial-gradient(circle, rgba(255,55,95,.3) 0%, rgba(255,159,10,.12) 40%, transparent 70%)', filter: 'blur(30px)' }} />
          </div>
          <span className="thumb">
            <img src={tv.thumb} alt="ABC15 Arizona news segment: a dust storm rolling over the Phoenix area" className="cover" loading="lazy" />
            <span className="shade" aria-hidden="true" />
            <span className="live-badge"><span className="pulse" style={{ width: 7, height: 7, background: '#ff375f', color: '#ff375f' }} aria-hidden="true" />On TV · {tv.outlet}</span>
            <span className="center-overlay"><YouTubeLogo width={104} /></span>
          </span>
          <span className="body">
            <span className="kicker-sm" style={{ fontSize: 13, color: '#ff9f0a' }}>{tv.date} · {tv.topic}</span>
            <span className="title">{tv.title}</span>
            <span style={{ fontSize: 17, lineHeight: 1.5, color: 'var(--text-2)' }}>{tv.note}</span>
            <span style={{ fontSize: 17, color: 'var(--link)', marginTop: 4 }}>Watch on YouTube ›</span>
          </span>
        </a>
        <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: 24, '--d': '0.26s' }}>
          <a className="card media medium-card" href={medium.href} target="_blank" rel="noopener noreferrer">
            <span className="kicker-sm" style={{ fontSize: 13, color: 'var(--text-2)' }}>On Medium · {medium.date}</span>
            <span className="serif" style={{ fontSize: 36, lineHeight: 1.15 }}>{medium.title}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ fontSize: 15, lineHeight: 1.5, color: 'var(--text-2)' }}>{medium.blurb}</span>
              <span style={{ fontSize: 15, color: 'var(--link)' }}>Read the story ›</span>
            </span>
          </a>
          <a className="card media row-link" href={LINKS.medium} target="_blank" rel="noopener noreferrer">
            <span className="stack-col" style={{ gap: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 600 }}>More on Medium</span>
              <span style={{ fontSize: 13, color: 'var(--text-3)' }}>Essays on engineering, belief and history</span>
            </span>
            <span aria-hidden="true" style={{ color: 'var(--link)', fontSize: 20 }}>›</span>
          </a>
        </div>
      </div>
    </section>
  );
}

const PROFILES = [
  { href: LINKS.github, label: 'GitHub', sub: 'github.com/1110tanmay', icon: <GitHubLogo />, external: true },
  { href: LINKS.linkedin, label: 'LinkedIn', sub: 'linkedin.com/in/tanmay-shelar', icon: <LinkedInLogo />, external: true },
  { href: `mailto:${LINKS.email}`, label: 'Email', sub: LINKS.email, icon: <MailLogo />, tile: 'linear-gradient(180deg, #5ac8fa 0%, #0071e3 100%)' },
  { href: LINKS.resume, label: 'Resume', sub: 'Latest version, PDF', icon: <Icon name="doc" size={22} color="#f5f5f7" />, external: true },
];

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [sentTo, setSentTo] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Delivered by Web3Forms straight to Tanmay's inbox; "email" becomes the reply-to.
  const submit = async (e) => {
    e.preventDefault();
    if (e.currentTarget.botcheck.checked) return; // honeypot: only bots tick a hidden box
    setStatus('sending');
    try {
      const res = await fetch(FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM.accessKey,
          subject: `Portfolio: ${form.name} reached out`,
          from_name: 'Tanmay Shelar portfolio',
          ...form,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.success) throw new Error(data.message || `HTTP ${res.status}`);
      setSentTo(form.name.split(' ')[0]);
      setForm({ name: '', email: '', message: '' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="wrap section" style={{ paddingBottom: 140 }}>
      <div className="contact-grid">
        <div data-reveal="" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <p className="eyebrow" style={{ margin: 0 }}>Contact</p>
          <TypeHeading
            className="h2"
            style={{ margin: 0 }}
            parts={[{ text: "Let's build " }, { text: 'something together.', className: 'grad-text', style: { backgroundImage: 'linear-gradient(90deg, #2997ff, #bf5af2)' } }]}
          />
          <p style={{ margin: 0, fontSize: 19, lineHeight: 1.5, color: 'var(--text-2)', maxWidth: 520 }}>Open to full-time Software Engineering and AI roles from December 2026. Worst case, we exchange a few good emails.</p>
          <nav aria-label="Profiles" style={{ display: 'flex', flexDirection: 'column', marginTop: 8, borderTop: '1px solid rgba(255,255,255,.1)' }}>
            {PROFILES.map((p) => (
              <a key={p.label} className="profile-row" href={p.href} {...(p.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span className="app-icon" aria-hidden="true" style={p.tile ? { background: p.tile, border: 0 } : undefined}>{p.icon}</span>
                  <span className="stack-col">
                    <span style={{ fontSize: 17, fontWeight: 600 }}>{p.label}</span>
                    <span style={{ fontSize: 14, color: 'var(--text-3)' }}>{p.sub}</span>
                  </span>
                </span>
                <span aria-hidden="true" style={{ color: 'var(--link)', fontSize: 20 }}>›</span>
              </a>
            ))}
          </nav>
        </div>

        <form className="card form" data-reveal="" style={{ '--d': '0.14s' }} onSubmit={submit} aria-label="Send Tanmay a message">
          <div aria-hidden="true" className="follow" style={{ right: -200, bottom: -240 }}>
            <div className="glow-orb" style={{ width: 520, height: 520, background: 'radial-gradient(circle, rgba(41,151,255,.24) 0%, rgba(191,90,242,.12) 40%, transparent 70%)', filter: 'blur(24px)' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <h3 style={{ margin: '0 0 6px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Send a note</h3>
            <p style={{ margin: 0, fontSize: 15, color: 'var(--text-3)' }}>It lands straight in my inbox. I reply within a day.</p>
          </div>
          <label className="stack-col" style={{ position: 'relative', gap: 8 }}>
            <span className="field-label">Name</span>
            <input className="field" name="name" autoComplete="name" placeholder="Jane Appleseed" required value={form.name} onChange={set('name')} />
          </label>
          <label className="stack-col" style={{ position: 'relative', gap: 8 }}>
            <span className="field-label">Work email</span>
            <input className="field" name="email" type="email" autoComplete="email" placeholder="jane@company.com" required value={form.email} onChange={set('email')} />
          </label>
          <label className="stack-col" style={{ position: 'relative', gap: 8 }}>
            <span className="field-label">Message</span>
            <textarea className="field" name="message" rows={4} placeholder="Tell me about the role or the problem you're solving." required value={form.message} onChange={set('message')} />
          </label>
          <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <button type="submit" className="btn-light" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
            <p role="status" aria-live="polite" style={{ margin: 0, fontSize: 15, color: status === 'error' ? '#ff6961' : '#30d158' }}>
              {status === 'sent' && `Thanks, ${sentTo}. It's in my inbox; I'll reply within a day.`}
              {status === 'error' && <>That didn't go through. Please email me at <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>.</>}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
