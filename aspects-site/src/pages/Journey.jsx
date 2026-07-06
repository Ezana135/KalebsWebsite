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

const CHAPTER_THEMES = ['ego', 'love', 'reason', 'art', 'film'];

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

function OpeningScene() {
  const progressRef = useScrollProgress('--opening-p');

  return (
    <section ref={progressRef} className="opening-scene" id="hero" aria-label="ASPECTS">
      <div className="opening-scene__stage">
        <div className="opening-scene__word" aria-hidden="true">
          <span className="opening-scene__aspect-word">ASPECTS</span>
        </div>

        <h1 className="visually-hidden">ASPECTS by Kaleb Kavuma</h1>

        <div className="opening-scene__portrait" aria-hidden="true">
          <img src="/media/landing-portrait.png" alt="" draggable="false" />
        </div>

        <div className="opening-scene__ghost" aria-hidden="true">ASPECTS</div>
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

/**
 * One persistent prism for the whole journey. Opening motion, dock, and projector
 * breaks are driven by the scroll loop — no remounts, no competing prisms.
 */
function JourneyPrism({ prismRef, labelRef }) {
  return (
    <div ref={prismRef} className="journey-prism journey-prism--ego" aria-hidden="true">
      <PrismGlass variant="beams" />
      <span ref={labelRef} className="journey-prism__label" />
    </div>
  );
}

function MusicHub({ projectTo }) {
  const released = useMemo(() => CHAPTERS.filter((chapter) => chapter.status === 'released'), []);
  const [currentId, setCurrentId] = useState('ego');
  const current = CHAPTERS.find((chapter) => chapter.id === currentId) || released[0];
  const tracks = current.listen.tracks;

  return (
    <section className="music-hub" id="music" data-theme={current.id} aria-label="Music">
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

function ProjectorBreak({ id, theme, dark = false }) {
  const progressRef = useScrollProgress('--project-p');

  return (
    <section
      ref={progressRef}
      className={`projector-break projector-break--${theme} ${dark ? 'projector-break--dark' : ''}`}
      data-projector-theme={theme}
      data-projector-label={id}
      aria-hidden="true"
    >
      <div className="projector-break__stage">
        <span className="projector-break__curtain" />
        <div className="projector-break__label">{id}</div>
      </div>
    </section>
  );
}

function EgoChapter({ chapter }) {
  return (
    <section className="chapter-world chapter-world--ego" id="ego" data-theme="ego" aria-label="Ego chapter">
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
    <section className="chapter-world chapter-world--love" id="love" data-theme="love" aria-label="Love chapter">
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
    <section className="chapter-world chapter-world--reason" id="reason" data-theme="reason" aria-label="Reason chapter">
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
    <section className="chapter-world chapter-world--art" id="art" data-theme="art" aria-label="Art chapter">
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
    <section className="film-world" id="film" data-theme="film" aria-label="Film">
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
  const rootRef = useRef(null);
  const prismRef = useRef(null);
  const labelRef = useRef(null);

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

  useEffect(() => {
    const root = rootRef.current;
    const prism = prismRef.current;
    if (!root || !prism) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp01 = (value) => Math.min(1, Math.max(0, value));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOut = (t) => 1 - (1 - t) ** 3;

    const measureOpeningProgress = (opening) => {
      if (!opening) return 1;
      const span = opening.offsetHeight - window.innerHeight;
      if (span <= 0) return 1;
      return clamp01((window.scrollY - opening.offsetTop) / span);
    };

    const measureZoneProgress = (element, scrollCenter) => {
      if (!element) return 0;
      const start = element.offsetTop;
      const end = start + element.offsetHeight;
      if (scrollCenter < start || scrollCenter >= end) return scrollCenter >= end ? 1 : 0;
      return clamp01((scrollCenter - start) / Math.max(end - start, 1));
    };

    const resolveTheme = (scrollCenter, music, activeBreak) => {
      if (activeBreak?.dataset.projectorTheme) return activeBreak.dataset.projectorTheme;
      if (music) {
        const musicStart = music.offsetTop;
        const musicEnd = musicStart + music.offsetHeight;
        if (scrollCenter >= musicStart && scrollCenter < musicEnd) {
          return music.dataset.theme || 'ego';
        }
      }
      for (const theme of CHAPTER_THEMES) {
        const section = root.querySelector(`#${theme}`);
        if (!section) continue;
        const start = section.offsetTop;
        const end = start + section.offsetHeight;
        if (scrollCenter >= start && scrollCenter < end) return theme;
      }
      return 'ego';
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollCenter = window.scrollY + vh * 0.5;
      const mobile = vw <= 720;

      const opening = root.querySelector('.opening-scene');
      const music = root.querySelector('#music');
      const breaks = Array.from(root.querySelectorAll('.projector-break'));

      const openingP = measureOpeningProgress(opening);
      const projectorP = clamp01((openingP - 0.34) / 0.46);
      const beamP = clamp01((openingP - 0.68) / 0.2);
      const colorBeamP = clamp01((openingP - 0.76) / 0.2);

      const activeBreak = breaks.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top < vh * 0.68 && rect.bottom > vh * 0.24;
      });

      const dockMargin = mobile ? 6 : 10;
      const dockW = mobile
        ? Math.min(Math.max(vw * 0.28, 92), 128)
        : Math.min(Math.max(vw * 0.12, 112), 178);
      const dockX = dockW * 0.42 + dockMargin;
      const dockY = vh * 0.5;

      const projectW = mobile
        ? Math.min(Math.max(vw * 0.28, 126), 176)
        : Math.min(Math.max(vw * 0.17, 180), 330);
      const projectX = (mobile ? 16 : Math.min(Math.max(vw * 0.04, 18), 64)) + projectW / 2;

      const openingEndX = vw * 0.5;
      const openingEndY = vh * (mobile ? 0.54 : 0.52) + vh * (mobile ? 0.06 : 0.08) - vh * 0.14;
      const openingEndW = mobile
        ? Math.min(Math.max(vw * 0.43, 230), 230)
        : Math.min(Math.max(vw * 0.25, 150), 410);

      let x = openingEndX;
      let y = openingEndY;
      let w = openingEndW;
      let whiteBeam = 0;
      let spectrumBeam = 0;
      let halo = 0.5;
      let projecting = false;
      let labelText = '';
      let mode = 'docked';

      const inOpening = openingP < 0.995 && projectorP < 1.001;

      if (inOpening && !reduceMotion) {
        const travel = mobile ? 0.33 : 0.35;
        x = vw * 0.5 - vw * travel * (1 - projectorP);
        y = vh * (mobile ? 0.54 : 0.52) + vh * (mobile ? 0.08 : 0.10) * (1 - projectorP) - vh * (mobile ? 0.11 : 0.14) * projectorP;
        w = mobile
          ? Math.min(Math.max(vw * 0.17 + projectorP * vw * 0.26, 86), 230)
          : Math.min(Math.max(vw * 0.11 + projectorP * vw * 0.14, 150), 410);
        whiteBeam = beamP;
        spectrumBeam = colorBeamP * 0.88;
        halo = 0.38 + projectorP * 0.34;
        mode = 'opening';
      } else if (activeBreak && !reduceMotion) {
        x = projectX;
        y = vh * 0.5;
        w = projectW;
        whiteBeam = 0.88;
        spectrumBeam = 0.82;
        halo = 0.72;
        projecting = true;
        labelText = activeBreak.dataset.projectorLabel || '';
        mode = 'projecting';
      } else {
        let handoffT = easeOut(clamp01((openingP - 0.9) / 0.1));
        if (music && scrollCenter >= music.offsetTop) {
          const musicEntry = clamp01((scrollCenter - music.offsetTop) / Math.max(music.offsetHeight * 0.14, 1));
          handoffT = Math.max(handoffT, easeOut(musicEntry));
        }
        x = lerp(openingEndX, dockX, handoffT);
        y = lerp(openingEndY, dockY, handoffT);
        w = lerp(openingEndW, dockW, handoffT);
        halo = 0.42;

        if (music) {
          const musicP = measureZoneProgress(music, scrollCenter);
          const inMusic = scrollCenter >= music.offsetTop && scrollCenter < music.offsetTop + music.offsetHeight;
          if (inMusic) {
            mode = 'music';
            if (musicP <= 0.6) {
              spectrumBeam = 0.42;
            } else {
              const fade = (musicP - 0.6) / 0.4;
              spectrumBeam = lerp(0.42, 0, fade);
              whiteBeam = lerp(0, 0.24, fade);
            }
          }
        }
      }

      const theme = resolveTheme(scrollCenter, music, activeBreak);

      prism.style.setProperty('--prism-x', `${x.toFixed(2)}px`);
      prism.style.setProperty('--prism-y', `${y.toFixed(2)}px`);
      prism.style.setProperty('--prism-w', `${w.toFixed(2)}px`);
      prism.style.setProperty('--white-beam', whiteBeam.toFixed(4));
      prism.style.setProperty('--spectrum-beam', spectrumBeam.toFixed(4));
      prism.style.setProperty('--halo-opacity', halo.toFixed(4));

      prism.classList.toggle('is-opening', mode === 'opening');
      prism.classList.toggle('is-docked', mode === 'docked' || mode === 'music');
      prism.classList.toggle('is-projecting', projecting);

      for (const entry of CHAPTER_THEMES) {
        prism.classList.toggle(`journey-prism--${entry}`, theme === entry);
      }

      const label = labelRef.current;
      if (label) {
        label.textContent = labelText;
        label.style.opacity = projecting ? '0.78' : '0';
      }
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="journey" ref={rootRef}>
      <ProjectionOverlay projection={projection} />
      <JourneyPrism prismRef={prismRef} labelRef={labelRef} />
      <OpeningScene />
      <MusicHub projectTo={projectTo} />
      <ProjectorBreak id="01 / EGO" theme="ego" />
      <EgoChapter chapter={ego} />
      <ProjectorBreak id="02 / LOVE" theme="love" />
      <LoveChapter chapter={love} />
      <ProjectorBreak id="03 / REASON" theme="reason" dark />
      <ReasonChapter chapter={reason} />
      <ProjectorBreak id="04 / ART" theme="art" dark />
      <ArtChapter chapter={art} />
      <ProjectorBreak id="09 / FILM" theme="film" dark />
      <FilmSection />
    </div>
  );
}
