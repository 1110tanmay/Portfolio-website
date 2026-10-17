import { LINKS } from '../content';

const NAV = [
  ['#proof', 'Proof'],
  ['#journey', 'Journey'],
  ['#education', 'Education'],
  ['#news', 'In the news'],
  ['#contact', 'Contact'],
];

export function Nav() {
  return (
    <nav className="nav" aria-label="Primary">
      <div className="wrap nav-inner">
        <a href="#top" className="wordmark">Tanmay <span>Shelar</span></a>
        <div className="nav-links">
          {NAV.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </div>
        <a className="ghost sm" href={LINKS.resume} target="_blank" rel="noopener noreferrer">Resume</a>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="wrap footer">
      <span>© 2026 Tanmay Shelar</span>
      <span>Designed and built with care in Tempe, Arizona.</span>
    </footer>
  );
}
