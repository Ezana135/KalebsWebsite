import { useEffect, useMemo, useRef, useState } from 'react';
import { CHAPTERS } from '../data/chapters';
import CoverArt from '../components/CoverArt';
import EmailCapture from '../components/EmailCapture';
import MediaFrame from '../components/MediaFrame';
import PrismGlass from '../components/PrismGlass';
import useScrollProgress from '../hooks/useScrollProgress';
import './journey.css';

const FEATURE_SCENES = {
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

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// The chapter light each phase makes the travelling prism emit,
// and the projector label shown beside it once it docks.
const PRISM_TINTS = {
  ego: 'var(--ego-beam)',
  love: 'var(--love-beam)',
  reason: 'var(--reason-beam)',
  art: 'var(--art-beam)',
  film: 'var(--film-beam)',
};

const PRISM_LABELS = {
  ego: '01 / EGO',
  love: '02 / LOVE',
  reason: '03 / REASON',
  art: '04 / ART',
  film: '09 / FILM',
};

/**
 * The single prism that travels the whole journey. It starts as the "A" of
 * ASPECTS in the hero, glides to centre stage for the refraction transition,
 * then docks on the left as the projector that lights every chapter.
 * Position/size come from --prism-x/y/w set by the scroll loop in Journey.
 */
function JourneyPrism({ phase, projecting, prismRef }) {
  return (
    <div
      ref={prismRef}
      className={`journey-prism journey-prism--${phase} ${projecting ? 'is-projecting' : ''}`}
      aria-hidden="true"
    >
      {/* key restarts the light animations whenever the prism enters a new phase */}
      <PrismGlass
        key={phase}
        variant="journey"
        tint={PRISM_TINTS[phase]}
        emitAngle={phase === 'reason' ? 'down' : 'right'}
      />
      {PRISM_LABELS[phase] && <span className="journey-prism__label">{PRISM_LABELS[phase]}</span>}
    </div>
  );
}

function Hero({ anchorRef }) {
  return (
    <section className="journey-hero" id="hero" data-journey-phase="hero" aria-label="ASPECTS">
      <div className="journey-hero__word" aria-hidden="true">
        <span className="journey-hero__a" ref={anchorRef} />
        <span className="journey-hero__spect">SPECTS</span>
      </div>
      <h1 className="visually-hidden">ASPECTS by Kaleb Kavuma</h1>
      <div className="journey-hero__portrait" aria-hidden="true">
        <img src="/media/landing-portrait.png" alt="" draggable="false" />
      </div>
    </section>
  );
}

function PrismTransition() {
  const progressRef = useScrollProgress('--prism-p');

  return (
    <section
      ref={progressRef}
      className="prism-transition"
      id="prism"
      data-journey-phase="prism"
      aria-label="The prism projector"
    >
      <div className="prism-transition__stage">
        <div className="prism-transition__ghost" aria-hidden="true">ASPECTS</div>
      </div>
    </section>
  );
}

function ProjectionOverlay({ projection }) {
  return (
    <div
      className={`projection-overlay ${projection ? 'is-running' : ''} projection-overlay--${projection?.theme || 'ego'}`}
      aria-hidden="true"
    >
      <span className="projection-overlay__label">{projection?.label}</span>
    </div>
  );
}

function MusicHub({ projectTo }) {
  const released = useMemo(() => CHAPTERS.filter((chapter) => chapter.status === 'released'), []);
  const [currentId, setCurrentId] = useState('ego');
  const current = CHAPTERS.find((chapter) => chapter.id === currentId) || released[0];
  const tracks = current.listen.tracks;

  return (
    <section className="music-hub" id="music" data-journey-phase="music" data-theme={current.id} aria-label="Music">
      <div className="journey-shell music-hub__grid">
        <div className="music-hub__left">
          <div className="music-hub__mast">
            <div>
              <h2>MUSIC</h2>
              <p>Four chapters. One self.</p>
            </div>
            <div className="music-hub__copy">
              <p>
                ASPECTS is a body of work exploring the self as project. Each chapter reveals a different
                facet: Ego, Love, Reason, Art. The journey is the music.
              </p>
              <button type="button" onClick={() => projectTo('ego', 'ego', '01 / EGO')} className="journey-link">
                About ASPECTS <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </div>

          <ul className="music-hub__cards" aria-label="ASPECTS chapters">
            {CHAPTERS.map((chapter) => (
              <li key={chapter.id}>
                <button
                  type="button"
                  className={`music-hub__card music-hub__card--${chapter.id} ${current.id === chapter.id ? 'is-current' : ''}`}
                  onClick={() => {
                    setCurrentId(chapter.id);
                    projectTo(chapter.id, chapter.id, `${chapter.number} / ${chapter.title}`);
                  }}
                >
                  <span>{chapter.number}</span>
                  <strong>{chapter.title}</strong>
                  <em>{chapter.subhead}</em>
                  <small>
                    <PlayIcon />
                    {chapter.listen.tracks.length} tracks
                  </small>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <aside className="music-player" aria-label={`${current.title} player`}>
          <header>
            <div>
              <span>Now playing</span>
              <strong>{current.title}</strong>
            </div>
            <p>01 / {String(tracks.length).padStart(2, '0')}</p>
          </header>

          <div className="music-player__main">
            <CoverArt chapter={current.id} title={current.title} size="sm" />
            <div>
              <h3>{tracks[0].title}</h3>
              <p>Kaleb Kavuma</p>
              <div className="music-player__wave" aria-hidden="true">
                {Array.from({ length: 30 }, (_, index) => (
                  <span key={index} style={{ '--bar': `${7 + ((index * 7) % 18)}px` }} />
                ))}
              </div>
              <div className="music-player__controls">
                <button type="button" aria-label="Previous track">&lt;</button>
                <button type="button" className="music-player__pause" aria-label="Pause">II</button>
                <button type="button" aria-label="Next track">&gt;</button>
              </div>
            </div>
          </div>

          <ol className="music-player__tracks">
            {tracks.map((track, index) => (
              <li key={track.n}>
                <button type="button">
                  <span>{track.n}</span>
                  <strong>{track.title}</strong>
                  <em>{track.time}</em>
                  {index === 0 && <small aria-hidden="true">▶</small>}
                </button>
              </li>
            ))}
          </ol>
          <button type="button" onClick={() => projectTo(current.id, current.id, `${current.number} / ${current.title}`)} className="journey-link">
            View full chapter <span aria-hidden="true">-&gt;</span>
          </button>
        </aside>
      </div>

      <div className="journey-shell music-hub__base">
        <div>
          <p className="journey-eyebrow">Listen everywhere</p>
          <span>Spotify</span>
          <span>Apple Music</span>
          <span>Bandcamp</span>
          <span>YouTube</span>
        </div>
        <div className="music-hub__bandcamp">
          <strong>Support directly on Bandcamp</strong>
          <p>Higher quality audio. Direct support. Every purchase fuels the work.</p>
        </div>
        <EmailCapture heading="Stay in the loop" body="New music, visuals, and reflections." tone="light" compact />
      </div>
    </section>
  );
}

function ProjectorBreak({ label, theme, dark = false }) {
  const progressRef = useScrollProgress('--project-p');

  return (
    <section
      ref={progressRef}
      className={`projector-break projector-break--${theme} ${dark ? 'projector-break--dark' : ''}`}
      data-journey-phase={theme}
      aria-hidden="true"
    >
      <div className="projector-break__stage">
        <span className="projector-break__curtain" />
        <div className="projector-break__label">{label}</div>
      </div>
    </section>
  );
}

function EgoChapter({ chapter }) {
  return (
    <section className="chapter-world chapter-world--ego" id="ego" data-journey-phase="ego" data-theme="ego" aria-label="Ego chapter">
      <div className="journey-shell ego-layout">
        <header className="ego-layout__head">
          <p><span>{chapter.number}</span> / {chapter.title}</p>
          <h2>{chapter.title}</h2>
          <em>{chapter.subhead}</em>
        </header>
        <MediaFrame scene="ego-mirror" caption="Watch chapter intro" time={chapter.heroTime} className="ego-layout__film" />
        <TrackPanel chapter={chapter} className="ego-layout__tracks" buttonLabel="Listen to chapter" />
        <EssayPanel chapter={chapter} className="ego-layout__essay" image="ego" />
        <div className="ego-layout__email">
          <EmailCapture heading="Stay in the loop" body="New music, visuals, and essays: straight to your inbox." tone="dark" compact />
        </div>
      </div>
    </section>
  );
}

function LoveChapter({ chapter }) {
  return (
    <section className="chapter-world chapter-world--love" id="love" data-journey-phase="love" data-theme="love" aria-label="Love chapter">
      <div className="journey-shell love-layout">
        <header className="love-layout__head">
          <p><span>{chapter.number}</span> / {chapter.title}</p>
          <h2>{chapter.title}</h2>
          <em>{chapter.subhead}</em>
          <strong>{chapter.blurb}</strong>
        </header>
        <MediaFrame scene="love-lake" caption="Watch film still" className="love-layout__film" />
        <TrackPanel chapter={chapter} className="love-layout__tracks" compact />
        <div className="love-layout__portrait" aria-hidden="true" />
        <EssayPanel chapter={chapter} className="love-layout__essay" />
        <div className="love-layout__email">
          <EmailCapture heading="Stay close." body="New music, visuals, and reflections." cta="Join the list" tone="sand" />
        </div>
      </div>
    </section>
  );
}

function ReasonChapter({ chapter }) {
  return (
    <section className="chapter-world chapter-world--reason" id="reason" data-journey-phase="reason" data-theme="reason" aria-label="Reason chapter">
      <div className="reason-layout">
        <div className="reason-layout__left">
          <header>
            <p><span>{chapter.number}</span> / {chapter.title}</p>
            <h2>{chapter.title}</h2>
            <em>{chapter.subhead}</em>
          </header>
        </div>
        <div className="reason-layout__right">
          <MediaFrame scene="reason-archive" caption={chapter.heroCaption} time={chapter.heroTime} className="reason-layout__film" />
          <TrackPanel chapter={chapter} className="reason-layout__tracks" />
          <EssayPanel chapter={chapter} className="reason-layout__essay" image="reason" />
          <EmailCapture heading="Stay connected" body="New music, visuals, and essays. Straight to your inbox." tone="dark" compact />
        </div>
      </div>
    </section>
  );
}

function ArtChapter({ chapter }) {
  return (
    <section className="chapter-world chapter-world--art" id="art" data-journey-phase="art" data-theme="art" aria-label="Art chapter">
      <div className="journey-shell art-layout">
        <header className="art-layout__head">
          <p><span>{chapter.number}</span> / {chapter.title}</p>
          <h2>{chapter.title}</h2>
          <em>{chapter.subhead}</em>
          <strong>{chapter.blurb}</strong>
        </header>
        <MediaFrame scene="art-collage" caption={chapter.heroCaption} className="art-layout__film" />
        <TrackPanel chapter={chapter} className="art-layout__tracks" buttonLabel="Play album" />
        <EssayPanel chapter={chapter} className="art-layout__essay" image="art" />
        <EmailCapture heading="Join the journey" body="New works, process notes, and early releases. Straight to your inbox." tone="dark" />
      </div>
    </section>
  );
}

function TrackPanel({ chapter, className = '', buttonLabel = 'View full project', compact = false }) {
  return (
    <section className={`track-panel ${compact ? 'track-panel--compact' : ''} ${className}`} aria-label={`${chapter.title} tracks`}>
      <p className="journey-eyebrow">{chapter.listen.chapterLabel}</p>
      {!compact && <h3>{chapter.listen.album}</h3>}
      <ol>
        {chapter.listen.tracks.map((track, index) => (
          <li key={track.n} className={index === 1 ? 'is-active' : ''}>
            <span>{track.n}</span>
            <strong>{track.title}</strong>
            <em>{track.time}</em>
            <PlayIcon />
          </li>
        ))}
      </ol>
      <button type="button" className="journey-link">
        {buttonLabel} <span aria-hidden="true">-&gt;</span>
      </button>
    </section>
  );
}

function EssayPanel({ chapter, className = '', image }) {
  return (
    <article className={`essay-panel ${image ? `essay-panel--${image}` : ''} ${className}`}>
      <p className="journey-eyebrow">Essay</p>
      <h3>{chapter.essay.title}</h3>
      <p>{chapter.essay.dek}</p>
      <button type="button" className="journey-link">
        Read essay <span aria-hidden="true">-&gt;</span>
      </button>
    </article>
  );
}

function FilmSection() {
  return (
    <section className="film-world" id="film" data-journey-phase="film" aria-label="Film">
      <div className="journey-shell film-world__grid">
        <header className="film-world__head">
          <p><span>09</span> / FILM</p>
          <h2>FILM</h2>
          <em>Stories. Realities. Human truths.</em>
          <strong>ASPECTS is a documentary series that explores the many dimensions of being human. Five films. Five lenses. One journey.</strong>
          <div>
            <button type="button" className="film-world__primary"><PlayIcon /> Watch trailer</button>
            <button type="button" className="film-world__secondary">Full film soon</button>
          </div>
        </header>
        <MediaFrame scene="london-street" caption="Patience Please - Official Trailer" time="02:31" className="film-world__trailer" />
        <div className="film-world__chapters">
          <p className="journey-eyebrow">The ASPECTS chapters</p>
          <ul>
            {FILM_CHAPTERS.map((chapter) => (
              <li key={chapter.id} className={`film-world__card film-world__card--${chapter.id}`}>
                {chapter.id !== 'soon' && <MediaFrame scene={FEATURE_SCENES[chapter.id]} playable={false} />}
                <span>{chapter.num}</span>
                <strong>{chapter.title}</strong>
                <em>{chapter.dek}</em>
              </li>
            ))}
          </ul>
        </div>
        <div className="film-world__email">
          <EmailCapture heading="Join the journey" body="Be the first to know when the full film and chapters are released." cta="Get updates" tone="dark" compact />
          <div className="film-world__links">
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://bandcamp.com" target="_blank" rel="noreferrer">Bandcamp</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Journey() {
  const [ego, love, reason, art] = CHAPTERS;
  const [projection, setProjection] = useState(null);
  const [phase, setPhase] = useState('hero');
  const rootRef = useRef(null);
  const heroAnchorRef = useRef(null);
  const prismRef = useRef(null);

  const projectTo = (id, theme, label) => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !theme) {
      scrollToSection(id);
      return;
    }
    setProjection({ theme, label });
    window.setTimeout(() => scrollToSection(id), 180);
    window.setTimeout(() => setProjection(null), 1050);
  };

  // Drives the single travelling prism: hero "A" -> centre stage during the
  // pinned refraction transition -> left projector dock for the chapters.
  useEffect(() => {
    const root = rootRef.current;
    const prism = prismRef.current;
    const heroAnchor = heroAnchorRef.current;
    const pinSection = root?.querySelector('#prism');
    if (!root || !prism || !heroAnchor || !pinSection) return undefined;

    const phaseSections = Array.from(root.querySelectorAll('[data-journey-phase]'));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const easeOut = (t) => 1 - (1 - t) ** 3;
    const lerp = (a, b, t) => a + (b - a) * t;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // The section owning the prism = last one whose top passed viewport centre.
      let active = 'hero';
      for (const section of phaseSections) {
        if (section.getBoundingClientRect().top <= vh * 0.5) active = section.dataset.journeyPhase;
      }
      setPhase(active);

      // The three stations the prism travels between (viewport coordinates).
      const heroRect = heroAnchor.getBoundingClientRect();
      const hero = {
        x: heroRect.left + heroRect.width / 2,
        y: heroRect.top + heroRect.height / 2,
        w: heroRect.width,
      };
      const centre = { x: vw / 2, y: vh / 2, w: Math.min(Math.max(vw * 0.34, 290), 520) };
      const dockW = vw <= 720 ? Math.min(Math.max(vw * 0.3, 96), 150) : Math.min(Math.max(vw * 0.18, 180), 300);
      const dock = {
        x: (vw <= 720 ? 8 : Math.min(Math.max(vw * 0.035, 16), 56)) + dockW / 2,
        y: vh / 2,
        w: dockW,
      };

      const rect = pinSection.getBoundingClientRect();
      const span = rect.height - vh;
      const p = span > 0 ? clamp01(-rect.top / span) : 1;
      // How far the pinned stage has scrolled off the top once the pin ends.
      const exit = span > 0 ? clamp01((-rect.top - span) / (vh * 0.9)) : 1;

      // Approach: distance the transition section has entered the viewport,
      // normalised so the prism leaves the hero "A" as the section arrives
      // and reaches centre stage just past halfway through the pin.
      const approach = clamp01((vh - rect.top) / (vh + span * 0.55));

      let x;
      let y;
      let w;
      if (reduceMotion) {
        ({ x, y, w } = rect.top > 0 ? hero : dock);
      } else if (p < 1) {
        const t = easeOut(approach); // glued to the "A", then glides to centre
        x = lerp(hero.x, centre.x, t);
        y = lerp(hero.y, centre.y, t);
        w = lerp(hero.w, centre.w, t);
      } else {
        const t = easeOut(exit); // hands off from centre stage to the dock
        x = lerp(centre.x, dock.x, t);
        y = lerp(centre.y, dock.y, t);
        w = lerp(centre.w, dock.w, t);
      }

      prism.style.setProperty('--prism-x', `${x.toFixed(2)}px`);
      prism.style.setProperty('--prism-y', `${y.toFixed(2)}px`);
      prism.style.setProperty('--prism-w', `${w.toFixed(2)}px`);
      prism.style.setProperty('--prism-p', reduceMotion ? '1' : p.toFixed(4));
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(root);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="journey" ref={rootRef}>
      <ProjectionOverlay projection={projection} />
      <JourneyPrism phase={phase} projecting={Boolean(projection)} prismRef={prismRef} />
      <Hero anchorRef={heroAnchorRef} />
      <PrismTransition />
      <MusicHub projectTo={projectTo} />
      <ProjectorBreak label="01 / EGO" theme="ego" />
      <EgoChapter chapter={ego} />
      <ProjectorBreak label="02 / LOVE" theme="love" />
      <LoveChapter chapter={love} />
      <ProjectorBreak label="03 / REASON" theme="reason" dark />
      <ReasonChapter chapter={reason} />
      <ProjectorBreak label="04 / ART" theme="art" dark />
      <ArtChapter chapter={art} />
      <ProjectorBreak label="09 / FILM" theme="film" dark />
      <FilmSection />
    </div>
  );
}
