import { Link } from 'react-router-dom';
import PrismMark from './PrismMark';
import './footer.css';

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com', short: 'IG' },
  { label: 'YouTube', href: 'https://youtube.com', short: 'YT' },
  { label: 'Spotify', href: 'https://spotify.com', short: 'SP' },
  { label: 'Bandcamp', href: 'https://bandcamp.com', short: 'BC' },
  { label: 'Substack', href: 'https://substack.com', short: 'SB' },
];

export default function Footer({ dark = false }) {
  return (
    <footer className={`footer ${dark ? 'footer--dark' : ''}`}>
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" aria-label="ASPECTS home" className="footer__mark">
            <PrismMark size={26} />
          </Link>
          <p className="footer__tag">One self, many aspects.</p>
        </div>

        <nav className="footer__cols" aria-label="Footer">
          <div>
            <p className="footer__col-title">Chapters</p>
            <Link to="/chapters/ego">01 Ego</Link>
            <Link to="/chapters/love">02 Love</Link>
            <Link to="/chapters/reason">03 Reason</Link>
            <Link to="/chapters/art">04 Art</Link>
          </div>
          <div>
            <p className="footer__col-title">Explore</p>
            <Link to="/music">Music</Link>
            <Link to="/journal">Journal</Link>
            <Link to="/film">Film</Link>
            <Link to="/prism">The Prism</Link>
          </div>
          <div>
            <p className="footer__col-title">Kaleb</p>
            <Link to="/about">About</Link>
            <Link to="/manifesto">Manifesto</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </nav>

        <div className="footer__social">
          <p className="footer__col-title">Connect</p>
          <ul>
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  {s.short}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__base">
        <p>&copy; {new Date().getFullYear()} Kaleb Kavuma</p>
        <p className="footer__made">Built with intention. Made to last.</p>
      </div>
    </footer>
  );
}
