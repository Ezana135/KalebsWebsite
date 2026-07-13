import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import PrismMark from './PrismMark';
import './nav.css';

const LINKS = [
  { to: '/music', label: 'Music' },
  { to: '/film', label: 'Visuals' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav({ dark = false, journey = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className={`nav ${dark ? 'nav--dark' : ''} ${journey ? 'nav--journey' : ''}`}>
      <div className="container nav__inner">
        <NavLink
          to="/"
          className="nav__brand"
          aria-label="ASPECTS home"
          onClick={(event) => {
            if (journey) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
        >
          <PrismMark size={20} />
          <span>KALEB KAVUMA</span>
        </NavLink>

        <nav className="nav__links" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => `nav__link ${isActive ? 'is-active' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          className="nav__toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nav__drawer" role="dialog" aria-modal="true">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink to="/manifesto" onClick={() => setOpen(false)}>
                Manifesto
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
