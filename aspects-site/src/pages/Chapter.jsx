import { useState } from 'react';
import { Link } from 'react-router-dom';
import { nextChapter } from '../data/chapters';
import MediaFrame from '../components/MediaFrame';
import CoverArt from '../components/CoverArt';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import PrismGlass from '../components/PrismGlass';
import './chapter.css';

// Beam colour each chapter's prism emits across the hero (Love-draft scale).
const EMIT = {
  ego: 'rgba(217, 169, 74, 0.6)',
  love: 'rgba(111, 151, 189, 0.55)',
  reason: 'rgba(196, 54, 46, 0.5)',
  art: 'rgba(138, 95, 196, 0.55)',
};

const SCENES = {
  ego: 'ego-mirror',
  love: 'love-lake',
  reason: 'reason-archive',
  art: 'art-collage',
};

// Ego and Love live on light paper; Reason and Art live in the dark.
const DARK_CHAPTERS = ['reason', 'art'];

// Music lives on Bandcamp first; wider streaming lands later.
// Replace-note: point at the real Bandcamp release URL per chapter.
const BANDCAMP_URL = 'https://bandcamp.com';

export default function Chapter({ chapter }) {
  const next = nextChapter(chapter.slug);
  const dark = DARK_CHAPTERS.includes(chapter.id);
  const locked = chapter.status === 'coming-soon';
  const [activeTrack, setActiveTrack] = useState(null);

  return (
    <article
      className={`chapter ${dark ? 'chapter--dark' : 'chapter--light'} chapter--${chapter.id}`}
      data-theme={chapter.id}
    >
      {/* HERO — large prism on the left edge floods the page with the
          chapter's light, as in the approved Love draft */}
      <header className="chapter__hero">
        <div className="chapter__prism" aria-hidden="true">
          <PrismGlass
            variant="emit"
            tint={EMIT[chapter.id]}
            emitAngle={chapter.id === 'reason' ? 'down' : 'right'}
          />
        </div>

        <div className="container chapter__hero-grid">
          <div className="chapter__hero-copy">
            <Reveal>
              <p className="chapter__eyebrow">
                <span className="chapter__eyebrow-num">{chapter.number}</span> / {chapter.title}
              </p>
              <h1 className="chapter__title">{chapter.title}</h1>
              <p className="chapter__subhead">{chapter.subhead}</p>
              <p className="chapter__blurb">{chapter.blurb}</p>
              {locked && (
                <p className="chapter__locked-badge" role="status">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 1 1 6 0v3H9z" />
                  </svg>
                  Chapter unlocking soon
                </p>
              )}
            </Reveal>
          </div>

          <Reveal delay={150} className="chapter__hero-media">
            <MediaFrame
              scene={SCENES[chapter.id]}
              caption={chapter.heroCaption}
              time={chapter.heroTime}
              label={`${chapter.title} chapter film`}
              assetName={`${chapter.id}-chapter-intro.mp4`}
            />
          </Reveal>
        </div>
      </header>

      {/* LISTEN / TRACKLIST / ESSAY */}
      <section className="container chapter__modules" aria-label={`${chapter.title} — listen and read`}>
        <Reveal className="chapter__listen-card">
          <div className="chapter__cover">
            <CoverArt chapter={chapter.id} title={chapter.title} size="sm" />
          </div>
          <div className="chapter__listen-body">
            <p className="chapter__module-label">Listen</p>
            <h2 className="chapter__album">{chapter.listen.album}</h2>
            {chapter.listen.albumDek && <p className="chapter__album-dek">{chapter.listen.albumDek}</p>}
            {locked ? (
              <button className="btn chapter__listen-btn" disabled aria-disabled="true">
                Coming soon
              </button>
            ) : (
              <a
                href={BANDCAMP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent chapter__listen-btn"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Listen on Bandcamp
              </a>
            )}
            <p className="chapter__streaming-note">
              Spotify &middot; Apple Music &middot; YouTube &mdash; streaming soon
            </p>
          </div>
        </Reveal>

        <Reveal delay={100} className="chapter__tracklist-card">
          <p className="chapter__module-label">Tracklist</p>
          <ol className="chapter__tracks">
            {chapter.listen.tracks.map((t) => (
              <li key={t.n}>
                <button
                  className={`chapter__track ${activeTrack === t.n ? 'is-active' : ''}`}
                  onClick={() => setActiveTrack(activeTrack === t.n ? null : t.n)}
                  disabled={locked}
                  aria-pressed={activeTrack === t.n}
                >
                  <span className="chapter__track-num">{t.n}</span>
                  <span className="chapter__track-title">{t.title}</span>
                  <span className="chapter__track-time">{t.time}</span>
                </button>
              </li>
            ))}
          </ol>
          <Link to="/music" className="link-arrow chapter__tracks-more">
            View in music library <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>

        <Reveal delay={200} className="chapter__essay-card">
          <p className="chapter__module-label">The Essay</p>
          <h2 className="chapter__essay-title">{chapter.essay.title}</h2>
          <p className="chapter__essay-dek">{chapter.essay.dek}</p>
          <Link to="/journal" className="link-arrow">
            Read essay <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
      </section>

      {/* EMAIL CAPTURE */}
      <div className="container">
        <EmailCapture
          heading="Stay in the loop"
          body="New music, visuals, and essays — straight to your inbox."
          tone={dark ? 'dark' : chapter.id === 'love' ? 'sand' : 'dark'}
        />
      </div>

      {/* NEXT CHAPTER TRANSITION */}
      <Link
        to={`/chapters/${next.slug}`}
        className="chapter__next"
        data-theme={next.id}
        aria-label={`Next chapter: ${next.title}`}
      >
        <div className="container chapter__next-inner">
          <span className="chapter__next-label">Next chapter</span>
          <span className="chapter__next-title">
            {next.number} / {next.title}
          </span>
          <span className="chapter__next-arrow" aria-hidden="true">
            &rarr;
          </span>
        </div>
        <span className="chapter__next-beam" aria-hidden="true" />
      </Link>
    </article>
  );
}
