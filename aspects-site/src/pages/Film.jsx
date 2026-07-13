import MediaFrame from '../components/MediaFrame';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import PrismGlass from '../components/PrismGlass';
import './film.css';

const SCENES = {
  ego: 'ego-mirror',
  love: 'love-lake',
  reason: 'reason-archive',
  art: 'art-collage',
};

const FILM_CHAPTERS = [
  { id: 'ego', num: '01', title: 'EGO', dek: 'The self we build. The stories we believe.' },
  { id: 'love', num: '02', title: 'LOVE', dek: 'The distance. The devotion. The return.' },
  { id: 'reason', num: '03', title: 'REASON', dek: 'The search. The questions. The why.' },
  { id: 'art', num: '04', title: 'ART', dek: 'The expression. The process. The becoming.' },
  { id: 'soon', num: '05', title: 'COMING SOON', dek: 'The final chapter. Coming soon.' },
];

export default function Film() {
  return (
    <div className="film" data-theme="ego">
      <div className="film__prism" aria-hidden="true">
        <PrismGlass variant="flare" />
      </div>

      <div className="container film__hero">
        <div className="film__hero-copy">
          <Reveal>
            <p className="film__eyebrow">
              <span>09</span> / FILM
            </p>
            <h1 className="film__title">Film</h1>
            <p className="film__strap">Stories. Realities. Human truths.</p>
            <p className="film__lede">
              <strong>Patience Please</strong> is a documentary series that explores
              the many dimensions of being human. Five films. Five lenses. One
              journey.
            </p>
            <div className="film__ctas">
              <button className="btn btn-on-dark btn-solid">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch trailer
              </button>
              <button className="btn btn-on-dark" disabled aria-disabled="true">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 1 1 6 0v3H9z" />
                </svg>
                Full film soon
              </button>
            </div>
            <p className="film__follow">Follow for release updates.</p>
          </Reveal>
        </div>

        <Reveal delay={140} className="film__hero-media">
          <MediaFrame
            scene="london-street"
            caption="Patience Please — Official Trailer"
            time="02:31"
            label="Patience Please documentary trailer"
            assetName="patience-please-trailer.mp4"
          />
        </Reveal>
      </div>

      <section className="container film__chapters-section" aria-labelledby="film-chapters-title">
        <Reveal>
          <p id="film-chapters-title" className="eyebrow film__chapters-label">
            The ASPECTS chapters
          </p>
        </Reveal>
        <ul className="film__cards">
          {FILM_CHAPTERS.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 80}>
                <article className={`film__card film__card--${c.id}`}>
                  {c.id !== 'soon' ? (
                    <MediaFrame
                      scene={SCENES[c.id]}
                      ratio="3/2.6"
                      label={`${c.title} chapter documentary`}
                      assetName={`film-${c.id}-doc.mp4`}
                    />
                  ) : (
                    <div className="film__card-soon" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M12 2a5 5 0 0 0-5 5v3H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm-3 8V7a3 3 0 1 1 6 0v3H9z" />
                      </svg>
                    </div>
                  )}
                  <p className="film__card-num">{c.num}</p>
                  <h2 className="film__card-title">{c.title}</h2>
                  <p className="film__card-dek">{c.dek}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <div className="container film__base">
        <EmailCapture
          heading="Join the journey"
          body="Be the first to know when the full film and chapters are released."
          cta="Get updates"
          tone="dark"
        />
        <div className="film__watch-links">
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn btn-on-dark">
            YouTube
          </a>
          <a href="https://bandcamp.com" target="_blank" rel="noreferrer" className="btn btn-on-dark">
            Bandcamp
          </a>
        </div>
      </div>
    </div>
  );
}
