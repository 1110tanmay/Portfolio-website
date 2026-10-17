import { useState } from 'react';
import { useTick } from '../hooks';
import { AWARDS, PHONE_SHOTS, WATCH_SHOTS } from '../content';
import { Icon } from './icons';

const glowBg = (glow, at = '50% 60%') => ({
  backgroundImage: `radial-gradient(ellipse 70% 80% at ${at}, ${glow} 0%, rgba(14,14,15,0) 70%)`,
});

// Auto-advancing, crossfading screenshots. Dots jump to a slide; the timer keeps going from there.
export function Slideshow({ images, chrome = false, wide = false, tabIndex }) {
  const tick = useTick(3600);
  const [offset, setOffset] = useState(0);
  const current = (tick + offset) % images.length;
  const pick = (i) => setOffset((i - (tick % images.length) + images.length) % images.length);

  const frame = (
    <div className={`slides${wide ? ' wide' : ''}`}>
      {images.map((im, i) => (
        <img key={im.src} src={im.src} alt={im.alt} className={`slide${i === current ? ' on' : ''}`} loading="lazy" />
      ))}
      <div className="dots">
        {images.map((im, i) => (
          <button key={im.src} type="button" tabIndex={tabIndex} aria-label={`Show image ${i + 1} of ${images.length}`} aria-current={i === current} onClick={() => pick(i)}>
            <span />
          </button>
        ))}
      </div>
    </div>
  );
  if (!chrome) return frame;
  return (
    <div className="window">
      <div className="window-bar" aria-hidden="true"><span /><span /><span /></div>
      {frame}
    </div>
  );
}

// iPhone + Apple Watch, each rotating through its own screenshots.
export function DeviceStage({ glow, wide = false }) {
  const tick = useTick(3200);
  return (
    <div className={`stage device-stage${wide ? ' wide' : ''}`} style={glowBg(glow, '50% 65%')}>
      <div className="device phone float">
        {PHONE_SHOTS.map((s, i) => <img key={s.src} src={s.src} alt={s.alt} className={i === tick % PHONE_SHOTS.length ? 'on' : ''} loading="lazy" />)}
      </div>
      <div className="device watch float-2">
        {WATCH_SHOTS.map((s, i) => <img key={s.src} src={s.src} alt={s.alt} className={i === tick % WATCH_SHOTS.length ? 'on' : ''} loading="lazy" />)}
      </div>
    </div>
  );
}

// Zocdoc awards: certificate on the left, the technical excerpt it was given for on the right.
export function AwardsStage({ glow }) {
  const current = useTick(4200) % AWARDS.length;
  return (
    <div className="stage awards-stage" style={glowBg(glow, '30% 55%')}>
      <div className="award-img">
        {AWARDS.map((a, i) => <img key={a.src} src={a.src} alt={a.alt} className={i === current ? 'on' : ''} loading="lazy" />)}
      </div>
      <div className="award-text" aria-live="off">
        {AWARDS.map((a, i) => (
          <div key={a.src} className={i === current ? 'on' : ''} aria-hidden={i !== current}>
            <span className="kicker-sm" style={{ color: '#ffd60a' }}>Engineering recognition · {i + 1} of {AWARDS.length}</span>
            <span className="title">{a.title}</span>
            <span className="code-tag">{a.tag}</span>
            <span className="quote">“{a.quote}”</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function IconStage({ glow, icon, caption }) {
  return (
    <div className="stage icon-stage" style={glowBg(glow)} aria-hidden="true">
      <Icon name={icon} size={96} width={1} color="#f5f5f7" />
      <span>{caption}</span>
    </div>
  );
}
