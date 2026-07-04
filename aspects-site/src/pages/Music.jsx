import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CHAPTERS } from '../data/chapters';
import CoverArt from '../components/CoverArt';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import PrismGlass from '../components/PrismGlass';
import './music.css';

// Bandcamp carries the catalogue first; wider streaming lands later.
// Replace-note: set `href` per platform as releases go live.
const PLATFORMS = [
  { label: 'Bandcamp', href: 'https://bandcamp.com', live: true },
  { label: 'YouTube', href: 'https://youtube.com', live: true },
  { label: 'Spotify', live: false },
  { label: 'Apple Music', live: false },
];

// Waveform bars for the mock player (deterministic, not random per render).
const WAVE = [4, 9, 14, 8, 16, 11, 18, 7, 13, 17, 9, 15, 6, 12, 18, 10, 14, 8, 16, 11, 7, 15, 12, 17, 9, 13, 6, 14, 10, 16, 8, 12];

// Released chapters only are playable; newest (highest number released) first.
const RELEASED = CHAPTERS.filter((c) => c.status === 'released').reverse();
const CARD_ORDER = CHAPTERS;

export default function Music() {
  const [current, setCurrent] = useState(RELEASED[0]);
  const [trackIdx, setTrackIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  const tracks = current.listen.tracks;
  const track = tracks[trackIdx];

  const loadChapter = (c) => {
    if (c.status !== 'released') return;
    setCurrent(c);
    setTrackIdx(0);
    setPlaying(true);
  };

  const step = (dir) => {
    setTrackIdx((i) => (i + dir + tracks.length) % tracks.length);
    setPlaying(true);
  };

  return (
    <div className="music">
      <div className="container music__grid">
        {/* LEFT: intro + chapter cards */}
        <div className="music__left">
          <div className="music__masthead">
            <div className="music__prism" aria-hidden="true">
              <PrismGlass variant="flare" />
            </div>
            <div>
              <Reveal>
                <h1 className="music__title">Music</h1>
                <p className="music__strap">Four chapters. One self.</p>
              </Reveal>
            </div>
            <Reveal delay={120}>
              <div className="music__lede">
                <p>
                  ASPECTS is a body of work exploring the self as project. Each
                  chapter reveals a different facet&mdash;Ego, Love, Reason, Art. The
                  journey is the music.
                </p>
                <Link to="/prism" className="link-arrow">
                  About ASPECTS <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </Reveal>
          </div>

          <ul className="music__chapters" aria-label="Chapters">
            {CARD_ORDER.map((c, i) => (
              <li key={c.id}>
                <Reveal delay={i * 80}>
                  <button
                    className={`music__chapter-card music__chapter-card--${c.id} ${
                      current.id === c.id ? 'is-current' : ''
                    } ${c.status !== 'released' ? 'is-locked' : ''}`}
                    onClick={() => loadChapter(c)}
                    aria-pressed={current.id === c.id}
                    aria-label={
                      c.status === 'released'
                        ? `Play chapter ${c.number}: ${c.title}`
                        : `${c.title} — coming soon`
                    }
                  >
                    <span className="music__chapter-num">{c.number}</span>
                    <span className="music__chapter-name">{c.title}</span>
                    <span className="music__chapter-dek">{c.subhead}</span>
                    <span className="music__chapter-count">
                      {c.status === 'released' ? (
                        <>
                          <svg viewBox="0 0 24 24" width="9" height="9" fill="currentColor" aria-hidden="true">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          {c.listen.tracks.length} tracks
                        </>
                      ) : (
                        'Coming soon'
                      )}
                    </span>
                  </button>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: now-playing player */}
        <Reveal delay={150} className="music__player-col">
          <section className="music__player" data-theme={current.id} aria-label="Player">
            <header className="music__player-head">
              <div>
                <p className="music__player-label">Previews</p>
                <p className="music__player-chapter">{current.title}</p>
              </div>
              <p className="music__player-index">
                {String(trackIdx + 1).padStart(2, '0')} / {String(tracks.length).padStart(2, '0')}
              </p>
            </header>

            <div className="music__player-main">
              <div className="music__player-cover">
                <CoverArt chapter={current.id} title={current.title} size="sm" />
              </div>
              <div className="music__player-meta">
                <p className="music__player-track">{track.title}</p>
                <p className="music__player-artist">Kaleb Kavuma</p>

                <div className={`music__wave ${playing ? 'is-playing' : ''}`} aria-hidden="true">
                  {WAVE.map((h, i) => (
                    <span key={i} style={{ '--h': `${h}px`, '--i': i }} />
                  ))}
                </div>

                <div className="music__progress" aria-hidden="true">
                  <span>1:37</span>
                  <span className="music__progress-bar">
                    <span className="music__progress-fill" />
                  </span>
                  <span>{track.time}</span>
                </div>

                <div className="music__controls">
                  <button aria-label="Previous track" onClick={() => step(-1)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M6 6h2v12H6zM9.5 12l8.5 6V6z" />
                    </svg>
                  </button>
                  <button
                    className="music__play"
                    aria-label={playing ? 'Pause' : 'Play'}
                    onClick={() => setPlaying((p) => !p)}
                  >
                    {playing ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <rect x="6" y="5" width="4" height="14" />
                        <rect x="14" y="5" width="4" height="14" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    )}
                  </button>
                  <button aria-label="Next track" onClick={() => step(1)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <ol className="music__tracklist">
              {tracks.map((t, i) => (
                <li key={t.n}>
                  <button
                    className={`music__track ${i === trackIdx ? 'is-active' : ''}`}
                    onClick={() => {
                      setTrackIdx(i);
                      setPlaying(true);
                    }}
                    aria-pressed={i === trackIdx}
                  >
                    <span className="music__track-marker" aria-hidden="true">
                      {i === trackIdx && playing ? '▶' : ''}
                    </span>
                    <span className="music__track-num">{t.n}</span>
                    <span className="music__track-title">{t.title}</span>
                    <span className="music__track-time">{t.time}</span>
                  </button>
                </li>
              ))}
            </ol>

            <Link to={`/chapters/${current.slug}`} className="link-arrow music__full-chapter">
              View full chapter <span aria-hidden="true">&rarr;</span>
            </Link>
            {/* Replace-note: preview clips can be wired to real audio files
                dropped in /public/media/audio/ — full releases stay on Bandcamp */}
            <p className="music__player-note">
              Full tracks live on{' '}
              <a href="https://bandcamp.com" target="_blank" rel="noreferrer">
                Bandcamp
              </a>
            </p>
          </section>
        </Reveal>
      </div>

      {/* PLATFORMS + BANDCAMP + EMAIL */}
      <div className="container music__base">
        <Reveal className="music__platforms">
          <p className="eyebrow">Where to listen</p>
          <ul>
            {PLATFORMS.map((p) =>
              p.live ? (
                <li key={p.label}>
                  <a href={p.href} target="_blank" rel="noreferrer">
                    {p.label}
                  </a>
                </li>
              ) : (
                <li key={p.label} className="music__platform-soon">
                  {p.label} <em>soon</em>
                </li>
              )
            )}
          </ul>
        </Reveal>

        <Reveal delay={100} className="music__bandcamp">
          <p className="music__bandcamp-title">Support directly on Bandcamp</p>
          <p className="music__bandcamp-dek">
            Higher quality audio. Direct support. Every purchase fuels the work.
          </p>
          <a href="https://bandcamp.com" target="_blank" rel="noreferrer" className="link-arrow">
            Visit Bandcamp <span aria-hidden="true">&rarr;</span>
          </a>
        </Reveal>

        <Reveal delay={200} className="music__ecap">
          <EmailCapture
            heading="Stay in the loop"
            body="New music, visuals, and reflections. Straight to your inbox."
            tone="light"
            compact
          />
        </Reveal>
      </div>
    </div>
  );
}
