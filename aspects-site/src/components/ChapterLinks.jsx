import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS } from '../data/chapters';
import Reveal from './Reveal';
import './chapter-links.css';

const BEAM_COLOURS = {
  ego: '#d9a94a',
  love: '#4d7fb5',
  reason: '#c4362e',
  art: '#8a5fc4',
};

/**
 * The four chapter links. Hover/focus lights up the row; `onActive` lets a
 * parent (e.g. the refraction stage) light the matching beam.
 */
export default function ChapterLinks({ onActive }) {
  const [, setActive] = useState(null);

  const set = (id) => {
    setActive(id);
    onActive?.(id);
  };

  return (
    <ul className="chlinks" aria-label="The four chapters">
      {CHAPTERS.map((c, i) => (
        <li key={c.id}>
          <Reveal delay={i * 90}>
            <Link
              to={`/chapters/${c.slug}`}
              className="chlinks__item"
              style={{ '--chapter-colour': BEAM_COLOURS[c.id] }}
              onMouseEnter={() => set(c.id)}
              onMouseLeave={() => set(null)}
              onFocus={() => set(c.id)}
              onBlur={() => set(null)}
            >
              <span className="chlinks__num">{c.number}</span>
              <span className="chlinks__title">{c.title}</span>
              <span className="chlinks__sub">{c.subhead}</span>
              <span className="chlinks__line" aria-hidden="true" />
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
