import { useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '../data/chapters';
import EmailCapture from '../components/EmailCapture';
import MediaFrame from '../components/MediaFrame';
import PrismGlass from '../components/PrismGlass';
import useScrollProgress from '../hooks/useScrollProgress';
import './journey.css';

const RELEASED = CHAPTERS.filter((chapter) => chapter.status === 'released');
const PHASE_ONE_CHAPTERS = RELEASED.filter((chapter) => chapter.id === 'ego' || chapter.id === 'love');

const EMIT_COLORS = {
  ego: 'rgba(218, 176, 80, 0.72)',
  love: 'rgba(90, 150, 220, 0.68)',
  reason: 'rgba(211, 50, 48, 0.72)',
  art: 'rgba(150, 80, 230, 0.7)',
};

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

function OpeningScene({ projectTo }) {
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

        <nav className="opening-scene__appendix" aria-label="Chapter index">
          {PHASE_ONE_CHAPTERS.map((chapter) => (
            <button
              key={chapter.id}
              type="button"
              className={`opening-scene__appendix-item opening-scene__appendix-item--${chapter.id}`}
              onClick={() => projectTo(chapter.id, chapter.id, `${chapter.number} / ${chapter.title}`)}
            >
              <span className="opening-scene__appendix-line" aria-hidden="true" />
              <span className="opening-scene__appendix-num">{chapter.number}</span>
              <strong>{chapter.title}</strong>
              <em>{chapter.subhead}</em>
            </button>
          ))}
        </nav>
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

function JourneyPrism({ prismRef }) {
  return (
    <div ref={prismRef} className="journey-prism journey-prism--ego is-spectrum" aria-hidden="true">
      <PrismGlass variant="projector" />
    </div>
  );
}

/** Empty scroll runway: prism docks left, white light feeds in, theme color arms. */
function ChapterPassage({ id, theme }) {
  const progressRef = useScrollProgress('--passage-p');

  return (
    <section
      ref={progressRef}
      id={id}
      className={`chapter-passage chapter-passage--${theme}`}
      data-passage-theme={theme}
      aria-hidden="true"
    >
      <div className="chapter-passage__stage">
        <div className="chapter-passage__wash" />
      </div>
    </section>
  );
}

function EgoChapter({ chapter }) {
  const progressRef = useScrollProgress('--chapter-p');

  return (
    <section
      ref={progressRef}
      className="chapter-projector chapter-projector--ego"
      id="ego"
      data-theme="ego"
      aria-label="Ego chapter"
    >
      <div className="chapter-projector__wash" aria-hidden="true" />
      <div className="chapter-projector__stage">
        <div className="journey-shell ego-layout">
          <header className="ego-layout__head">
            <p><span>{chapter.number}</span> / {chapter.title}</p>
            <h2>{chapter.title}</h2>
            <em>{chapter.subhead}</em>
          </header>
          <div className="ego-layout__content">
            <MediaFrame scene="ego-mirror" caption={chapter.heroCaption} time={chapter.heroTime} className="ego-layout__film" />
            <TrackPanel chapter={chapter} className="ego-layout__tracks" buttonLabel="Listen to chapter" />
            <EssayPanel chapter={chapter} className="ego-layout__essay" image="ego" eyebrow="The essay" />
            <div className="ego-layout__email">
              <EmailCapture heading="Stay in the loop" body="New music, visuals, and essays: straight to your inbox." tone="dark" compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LoveChapter({ chapter }) {
  const progressRef = useScrollProgress('--chapter-p');

  return (
    <section
      ref={progressRef}
      className="chapter-projector chapter-projector--love"
      id="love"
      data-theme="love"
      aria-label="Love chapter"
    >
      <div className="chapter-projector__wash" aria-hidden="true" />
      <div className="chapter-projector__stage">
        <div className="journey-shell love-layout">
          <header className="love-layout__head">
            <p><span>{chapter.number}</span> / {chapter.title}</p>
            <h2>{chapter.title}</h2>
            <em>{chapter.subhead}</em>
            <strong>{chapter.blurb}</strong>
          </header>
          <div className="love-layout__content">
            <MediaFrame scene="love-lake" caption={chapter.heroCaption} className="love-layout__film" />
            <TrackPanel chapter={chapter} className="love-layout__tracks" compact buttonLabel="Listen" />
            <div className="love-layout__portrait" aria-hidden="true">
              <img src="/media/landing-portrait.png" alt="" draggable="false" />
            </div>
            <EssayPanel chapter={chapter} className="love-layout__essay" eyebrow="Essay" />
            <div className="love-layout__email">
              <EmailCapture heading="Stay close." body="New music, visuals, and reflections." cta="Join the list" tone="sand" />
            </div>
          </div>
        </div>
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
      <button type="button" className="journey-link journey-link--button">
        {buttonLabel} <span aria-hidden="true">-&gt;</span>
      </button>
    </section>
  );
}

function EssayPanel({ chapter, className = '', image, eyebrow = 'Essay' }) {
  return (
    <article className={`essay-panel ${image ? `essay-panel--${image}` : ''} ${className}`}>
      <p className="journey-eyebrow">{eyebrow}</p>
      <h3>{chapter.essay.title}</h3>
      <p>{chapter.essay.dek}</p>
      <button type="button" className="journey-link">
        Read essay <span aria-hidden="true">-&gt;</span>
      </button>
    </article>
  );
}

export default function Journey() {
  const [ego, love] = PHASE_ONE_CHAPTERS;
  const [projection, setProjection] = useState(null);
  const rootRef = useRef(null);
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

  useEffect(() => {
    const root = rootRef.current;
    const prism = prismRef.current;
    if (!root || !prism) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const easeOut = (t) => 1 - (1 - t) ** 3;

    const scrollSpan = (el) => {
      if (!el) return { p: 1, start: 0 };
      const vh = window.innerHeight;
      const start = el.offsetTop;
      const span = el.offsetHeight - vh;
      const p = span > 0 ? clamp01((window.scrollY - start) / span) : 1;
      return { p, start };
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const mobile = vw <= 720;

      const opening = root.querySelector('.opening-scene');
      const egoPassage = root.querySelector('#ego-passage');
      const ego = root.querySelector('#ego');
      const lovePassage = root.querySelector('#love-passage');
      const love = root.querySelector('#love');

      const openingP = scrollSpan(opening).p;
      const projectorP = clamp01((openingP - 0.34) / 0.46);
      const beamP = clamp01((openingP - 0.68) / 0.2);
      const colorBeamP = clamp01((openingP - 0.76) / 0.2);

      const egoPassageP = scrollSpan(egoPassage).p;
      const egoP = scrollSpan(ego).p;
      const lovePassageP = scrollSpan(lovePassage).p;
      const loveP = scrollSpan(love).p;

      const openingEnd = opening ? opening.offsetTop + opening.offsetHeight : 0;
      const egoStart = ego?.offsetTop ?? Infinity;
      const loveStart = love?.offsetTop ?? Infinity;

      let zone = 'opening';
      if (scrollY >= loveStart) zone = 'love';
      else if (scrollY >= (lovePassage?.offsetTop ?? Infinity)) zone = 'love-passage';
      else if (scrollY >= egoStart) zone = 'ego';
      else if (scrollY >= (egoPassage?.offsetTop ?? Infinity)) zone = 'ego-passage';
      else if (scrollY >= openingEnd - vh * 0.5) zone = 'exit-opening';

      let x = vw * 0.5;
      let y = vh * 0.52;
      let w = mobile ? 120 : 180;
      let incoming = 0;
      let emit = 0;
      let whiteBeam = 0;
      let spectrumBeam = 0;
      let emitColor = EMIT_COLORS.ego;
      let theme = 'ego';
      let useSpectrum = true;

      if (zone === 'opening' && !reduceMotion) {
        const travel = mobile ? 0.33 : 0.35;
        x = vw * 0.5 - vw * travel * (1 - projectorP);
        y = vh * 0.52 + vh * 0.10 * (1 - projectorP) - vh * 0.14 * projectorP;
        w = mobile
          ? Math.min(Math.max(vw * 0.17 + projectorP * vw * 0.26, 86), 230)
          : Math.min(Math.max(vw * 0.11 + projectorP * vw * 0.14, 150), 410);
        whiteBeam = beamP;
        spectrumBeam = colorBeamP * 0.88;
        useSpectrum = true;
      } else if (zone === 'exit-opening' && !reduceMotion) {
        const t = easeOut(clamp01((scrollY - (openingEnd - vh)) / (vh * 0.8)));
        x = lerp(vw * 0.5, vw * 0.08, t);
        y = lerp(vh * 0.48, vh * 0.5, t);
        w = lerp(mobile ? 200 : 280, mobile ? 100 : 130, t);
        incoming = t * 0.85;
        whiteBeam = lerp(colorBeamP * 0.5, 0, t);
        spectrumBeam = lerp(0.4, 0, t);
        useSpectrum = spectrumBeam > 0.05;
      } else if (zone === 'ego-passage' && !reduceMotion) {
        const t = easeOut(egoPassageP);
        x = vw * (mobile ? 0.09 : 0.07);
        y = vh * 0.46;
        w = mobile ? 108 : 138;
        incoming = lerp(0.9, 0.15, t);
        emit = lerp(0, 0.55, t);
        emitColor = EMIT_COLORS.ego;
        theme = 'ego';
        useSpectrum = false;
      } else if (zone === 'ego' && !reduceMotion) {
        const revealP = clamp01(egoP / 0.42);
        const contentP = clamp01((egoP - 0.34) / 0.45);
        x = vw * (mobile ? 0.08 : 0.06);
        y = lerp(vh * 0.46, vh * 0.28, easeOut(revealP));
        w = lerp(mobile ? 108 : 138, mobile ? 150 : 198, easeOut(revealP));
        incoming = lerp(0.12, 0, revealP);
        emit = lerp(0.55, 0.92, easeOut(revealP)) * (1 - contentP * 0.08);
        emitColor = EMIT_COLORS.ego;
        theme = 'ego';
        useSpectrum = false;
      } else if (zone === 'love-passage' && !reduceMotion) {
        const t = easeOut(lovePassageP);
        x = vw * (mobile ? 0.1 : 0.08);
        y = vh * 0.42;
        w = mobile ? 118 : 158;
        incoming = lerp(0.75, 0.1, t);
        emit = lerp(0, 0.5, t);
        emitColor = EMIT_COLORS.love;
        theme = 'love';
        useSpectrum = false;
      } else if (zone === 'love' && !reduceMotion) {
        const revealP = clamp01(loveP / 0.4);
        const contentP = clamp01((loveP - 0.32) / 0.45);
        x = vw * (mobile ? 0.09 : 0.07);
        y = lerp(vh * 0.42, vh * 0.34, easeOut(revealP));
        w = lerp(mobile ? 118 : 158, mobile ? 168 : 228, easeOut(revealP));
        incoming = lerp(0.1, 0, revealP);
        emit = lerp(0.5, 0.9, easeOut(revealP)) * (1 - contentP * 0.06);
        emitColor = EMIT_COLORS.love;
        theme = 'love';
        useSpectrum = false;
      }

      prism.style.setProperty('--prism-x', `${x.toFixed(2)}px`);
      prism.style.setProperty('--prism-y', `${y.toFixed(2)}px`);
      prism.style.setProperty('--prism-w', `${w.toFixed(2)}px`);
      prism.style.setProperty('--incoming-opacity', incoming.toFixed(4));
      prism.style.setProperty('--emit-opacity', emit.toFixed(4));
      prism.style.setProperty('--emit-color', emitColor);
      prism.style.setProperty('--white-beam', whiteBeam.toFixed(4));
      prism.style.setProperty('--spectrum-beam', spectrumBeam.toFixed(4));

      prism.classList.toggle('is-spectrum', useSpectrum);
      prism.classList.toggle('is-emitting', emit > 0.04);
      prism.classList.toggle('is-opening', zone === 'opening');
      prism.classList.toggle('journey-prism--ego', theme === 'ego');
      prism.classList.toggle('journey-prism--love', theme === 'love');
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
      <JourneyPrism prismRef={prismRef} />
      <OpeningScene projectTo={projectTo} />
      <ChapterPassage id="ego-passage" theme="ego" />
      <EgoChapter chapter={ego} />
      <ChapterPassage id="love-passage" theme="love" />
      <LoveChapter chapter={love} />
    </div>
  );
}
