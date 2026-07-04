import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS } from '../data/chapters';
import Reveal from './Reveal';
import './refraction.css';

const BEAM_COLOURS = {
  ego: '#d9a94a',
  love: '#4d7fb5',
  reason: '#c4362e',
  art: '#8a5fc4',
};

/**
 * The prism/refraction centrepiece. White light enters the glass prism from
 * the left; four coloured beams exit right, each one a live link into its
 * chapter. Hovering/focusing a chapter link lights its beam.
 */
export default function RefractionSection({ id = 'refraction' }) {
  const [active, setActive] = useState(null);

  return (
    <section id={id} className="refraction section" aria-labelledby="refraction-title">
      <span className="refraction__ghost" aria-hidden="true">
        ASPECTS
      </span>

      <div className="container">
        <Reveal>
          <p className="eyebrow refraction__eyebrow">The Prism</p>
          <h2 id="refraction-title" className="refraction__thesis">
            Nothing real is ever just one thing.
          </h2>
        </Reveal>

        <div className="refraction__stage">
          {/* incoming white light */}
          <span className="refraction__white" aria-hidden="true" />

          {/* the glass prism */}
          <div className="refraction__prism" aria-hidden="true">
            <svg viewBox="0 0 220 260">
              <defs>
                <linearGradient id="refrGlass" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="50%" stopColor="#e3e8ec" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#b6c0c9" stopOpacity="0.6" />
                </linearGradient>
              </defs>
              <polygon
                points="110,8 208,250 12,250"
                fill="url(#refrGlass)"
                stroke="#9aa4ad"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <line x1="110" y1="8" x2="110" y2="250" stroke="#fff" strokeWidth="1" opacity="0.5" />
              <line x1="110" y1="8" x2="12" y2="250" stroke="#fff" strokeWidth="1" opacity="0.28" />
            </svg>
          </div>

          {/* outgoing chapter beams */}
          <div className="refraction__beams" aria-hidden="true">
            {CHAPTERS.map((c, i) => (
              <span
                key={c.id}
                className={`refraction__beam refraction__beam--${c.id} ${
                  active === c.id ? 'is-active' : active ? 'is-dim' : ''
                }`}
                style={{
                  '--beam-colour': BEAM_COLOURS[c.id],
                  '--beam-rot': `${(i - 1.5) * 7}deg`,
                  '--beam-top': `${34 + i * 10}%`,
                }}
              />
            ))}
          </div>
        </div>

        <ul className="refraction__chapters" aria-label="The four chapters">
          {CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 90}>
                <Link
                  to={`/chapters/${c.slug}`}
                  className="refraction__chapter"
                  style={{ '--chapter-colour': BEAM_COLOURS[c.id] }}
                  onMouseEnter={() => setActive(c.id)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(c.id)}
                  onBlur={() => setActive(null)}
                >
                  <span className="refraction__chapter-num">{c.number}</span>
                  <span className="refraction__chapter-title">{c.title}</span>
                  <span className="refraction__chapter-sub">{c.subhead}</span>
                  <span className="refraction__chapter-line" aria-hidden="true" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
