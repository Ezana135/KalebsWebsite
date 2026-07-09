import { useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '../data/chapters';
import EmailCapture from '../components/EmailCapture';
import MediaFrame from '../components/MediaFrame';
import PrismGlass from '../components/PrismGlass';
import useScrollProgress from '../hooks/useScrollProgress';
import './journey.css';

const JOURNEY_CHAPTER_IDS = ['ego', 'love', 'reason', 'art'];
const egoChapter = CHAPTERS.find((chapter) => chapter.id === 'ego');
const loveChapter = CHAPTERS.find((chapter) => chapter.id === 'love');
const reasonChapter = CHAPTERS.find((chapter) => chapter.id === 'reason');
const artChapter = CHAPTERS.find((chapter) => chapter.id === 'art');
const APPENDIX_CHAPTERS = JOURNEY_CHAPTER_IDS.map((id) => CHAPTERS.find((chapter) => chapter.id === id)).filter(Boolean);

const EMIT_COLORS = {
  ego: 'rgba(228, 186, 88, 0.78)',
  love: 'rgba(90, 150, 220, 0.68)',
  reason: 'rgba(211, 50, 48, 0.78)',
  art: 'rgba(150, 80, 230, 0.74)',
  white: 'rgba(255, 255, 255, 0.62)',
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
          <div className="opening-scene__prism-slot" />
          <span className="opening-scene__aspect-word">SPECTS</span>
        </div>

        <h1 className="visually-hidden">ASPECTS by Kaleb Kavuma</h1>

        <div className="opening-scene__portrait" aria-hidden="true">
          <img src="/media/landing-portrait.png" alt="" draggable="false" />
        </div>

        <div className="opening-scene__ghost" aria-hidden="true">ASPECTS</div>

        <nav className="opening-scene__appendix" aria-label="Chapter index">
          {APPENDIX_CHAPTERS.map((chapter) => (
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

/** Lights off — black stage, prism emerges, white beam only. */
function BlackoutPassage({ id, nextTheme }) {
  const progressRef = useScrollProgress('--passage-p');

  return (
    <section
      ref={progressRef}
      id={id}
      className={`chapter-passage chapter-passage--blackout chapter-passage--to-${nextTheme}`}
      data-passage-theme={nextTheme}
      aria-hidden="true"
    >
      <div className="chapter-passage__stage">
        <div className="chapter-passage__blackout" />
        <div className="chapter-passage__wash" />
      </div>
    </section>
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

function ReasonChapter({ chapter }) {
  const progressRef = useScrollProgress('--chapter-p');

  return (
    <section
      ref={progressRef}
      className="chapter-projector chapter-projector--reason chapter-projector--dark"
      id="reason"
      data-theme="reason"
      aria-label="Reason chapter"
    >
      <div className="chapter-projector__wash" aria-hidden="true" />
      <div className="chapter-projector__stage">
        <div className="reason-layout">
          <header className="reason-layout__head">
            <p><span>{chapter.number}</span> / {chapter.title}</p>
            <h2>{chapter.title}</h2>
            <em>{chapter.subhead}</em>
          </header>
          <div className="reason-layout__content">
            <MediaFrame scene="reason-archive" caption={chapter.heroCaption} time={chapter.heroTime} className="reason-layout__film" />
            <TrackPanel chapter={chapter} className="reason-layout__tracks" />
            <EssayPanel chapter={chapter} className="reason-layout__essay" image="reason" eyebrow="Essay" />
            <EmailCapture heading="Stay connected" body="New music, visuals, and essays. Straight to your inbox." tone="dark" compact />
          </div>
        </div>
      </div>
    </section>
  );
}

function ArtChapter({ chapter }) {
  const progressRef = useScrollProgress('--chapter-p');

  return (
    <section
      ref={progressRef}
      className="chapter-projector chapter-projector--art chapter-projector--dark"
      id="art"
      data-theme="art"
      aria-label="Art chapter"
    >
      <div className="chapter-projector__wash" aria-hidden="true" />
      <div className="chapter-projector__stage">
        <div className="journey-shell art-layout">
          <header className="art-layout__head">
            <p><span>{chapter.number}</span> / {chapter.title}</p>
            <h2>{chapter.title}</h2>
            <em>{chapter.subhead}</em>
            <strong>{chapter.blurb}</strong>
          </header>
          <div className="art-layout__content">
            <MediaFrame scene="art-collage" caption={chapter.heroCaption} className="art-layout__film" />
            <TrackPanel chapter={chapter} className="art-layout__tracks" buttonLabel="Play album" />
            <EssayPanel chapter={chapter} className="art-layout__essay" image="art" eyebrow="Essay" />
            <EmailCapture heading="Join the journey" body="New works, process notes, and early releases. Straight to your inbox." tone="dark" />
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
  const [projection, setProjection] = useState(null);
  const rootRef = useRef(null);
  const prismRef = useRef(null);
  const beamRef = useRef(null);

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
    const beam = beamRef.current;
    if (!root || !prism || !beam) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const lerp = (a, b, t) => a + (b - a) * t;
    const smoothstep = (t) => {
      const x = clamp01(t);
      return x * x * (3 - 2 * x);
    };
    const easeOut = (t) => 1 - (1 - clamp01(t)) ** 3;
    const easeInOut = (t) => {
      const x = clamp01(t);
      return x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2;
    };
    const blend = (a, b, t) => ({
      x: lerp(a.x, b.x, t),
      y: lerp(a.y, b.y, t),
      w: lerp(a.w, b.w, t),
      incoming: lerp(a.incoming, b.incoming, t),
      emit: lerp(a.emit, b.emit, t),
      whiteBeam: lerp(a.whiteBeam, b.whiteBeam, t),
      spectrumBeam: lerp(a.spectrumBeam, b.spectrumBeam, t),
      projectionP: lerp(a.projectionP, b.projectionP, t),
      blackOpacity: lerp(a.blackOpacity, b.blackOpacity, t),
      prismOpacity: lerp(a.prismOpacity, b.prismOpacity, t),
      isDocked: t > 0.5 ? b.isDocked : a.isDocked,
      useSpectrum: t > 0.5 ? b.useSpectrum : a.useSpectrum,
      isDark: t > 0.5 ? b.isDark : a.isDark,
      theme: t > 0.5 ? b.theme : a.theme,
      emitColor: t > 0.5 ? b.emitColor : a.emitColor,
    });

    const motion = {
      x: 0,
      y: 0,
      w: 0,
      projectionP: 0,
      emit: 0,
      incoming: 0,
      whiteBeam: 0,
      spectrumBeam: 0,
      blackOpacity: 0,
      prismOpacity: 1,
      projectionEdgeX: 0,
      fanHeight: window.innerHeight * 0.82,
      ready: false,
    };

    const SMOOTH = {
      pos: 0.13,
      size: 0.13,
      light: 0.17,
      projection: 0.15,
      opacity: 0.16,
      fan: 0.12,
    };

    const follow = (current, target, rate) => current + (target - current) * rate;

    const scrollSpan = (el) => {
      if (!el) return { p: 1, start: 0 };
      const vh = window.innerHeight;
      const start = el.offsetTop;
      const span = el.offsetHeight - vh;
      const p = span > 0 ? clamp01((window.scrollY - start) / span) : 1;
      return { p, start };
    };

    const chapterSequence = ({
      scrollY,
      introStart,
      chapterEnd,
      contentStart,
      vh,
      fromX,
      fromY,
      fromW,
      dockX,
      dockY,
      dockW,
      glidePortion = 0.2,
      incomingStart = 0.45,
      projectionMin = 0,
    }) => {
      const span = Math.max(chapterEnd - introStart, vh * 2);
      const p = clamp01((scrollY - introStart) / span);
      const glideT = smoothstep(clamp01(p / glidePortion));
      const incoming = p < 0.34
        ? lerp(incomingStart, 0.05, smoothstep(clamp01((p - 0.02) / 0.3)))
        : Math.max(0, lerp(0.05, 0, smoothstep(clamp01((p - 0.34) / 0.18))));
      const emit = smoothstep(clamp01((p - 0.04) / 0.88)) * 0.92;

      let projectionP;
      if (contentStart && contentStart > introStart) {
        const passageEnd = contentStart;
        if (scrollY < passageEnd) {
          const passageP = smoothstep(clamp01((scrollY - introStart) / Math.max(passageEnd - introStart, vh * 0.8)));
          projectionP = lerp(1, 0.78, passageP);
        } else {
          const chapterP = smoothstep(clamp01((scrollY - passageEnd) / Math.max(chapterEnd - passageEnd, vh * 1.2)));
          projectionP = lerp(0.78, 1, chapterP);
        }
      } else {
        projectionP = projectionMin + (1 - projectionMin) * smoothstep(clamp01((p - 0.02) / 0.92));
      }

      return {
        x: lerp(fromX, dockX, glideT),
        y: lerp(fromY, dockY, glideT),
        w: lerp(fromW, dockW, glideT),
        incoming,
        emit,
        whiteBeam: 0,
        spectrumBeam: 0,
        projectionP,
        isDocked: glideT > 0.06,
        useSpectrum: false,
      };
    };

    const chapterHandoff = ({
      scrollY,
      start,
      end,
      vh,
      vw,
      mobile,
      from: { x: fx, y: fy, w: fw },
      to: { x: tx, y: ty, w: tw, color: toColor },
    }) => {
      const span = Math.max(end - start, vh * 2.6);
      const p = clamp01((scrollY - start) / span);

      const lightsFade = smoothstep(clamp01(p / 0.28));
      const toBlack = smoothstep(clamp01((p - 0.28) / 0.18));
      const whiteRise = smoothstep(clamp01((p - 0.62) / 0.2));
      const dockGlide = smoothstep(clamp01((p - 0.72) / 0.26));
      const themeArm = smoothstep(clamp01((p - 0.82) / 0.16));
      const centerGlide = smoothstep(clamp01((p - 0.3) / 0.34));

      const cx = vw * 0.5;
      const cy = vh * 0.48;
      const midW = lerp(fw, tw, 0.42);

      let blackOpacity = 0;
      if (p < 0.28) blackOpacity = 0;
      else if (p < 0.48) blackOpacity = toBlack;
      else if (p < 0.62) blackOpacity = 1;
      else blackOpacity = Math.max(0, 1 - smoothstep((p - 0.62) / 0.2));

      let prismOpacity = 1;
      if (p < 0.28) prismOpacity = 1;
      else if (p < 0.4) prismOpacity = lerp(1, 0, smoothstep((p - 0.28) / 0.12));
      else if (p < 0.62) prismOpacity = 0;
      else prismOpacity = lerp(0, 1, whiteRise);

      const preCenterX = lerp(fx, cx, centerGlide);
      const preCenterY = lerp(fy, cy, centerGlide);
      const preCenterW = lerp(fw, midW, centerGlide);
      const postDock = p > 0.64 ? dockGlide : 0;

      return {
        x: lerp(preCenterX, tx, postDock),
        y: lerp(preCenterY, ty, postDock),
        w: lerp(preCenterW, tw, postDock),
        emit: p < 0.28
          ? lerp(0.9, 0, lightsFade)
          : p < 0.62
            ? 0
            : lerp(0.06, 0.72, themeArm),
        whiteBeam: p < 0.62 ? 0 : whiteRise * (1 - themeArm * 0.88),
        spectrumBeam: 0,
        projectionP: p < 0.28
          ? lerp(1, 0, lightsFade)
          : p < 0.74
            ? 0
            : lerp(0, 0.3, themeArm),
        incoming: p < 0.62 ? 0 : whiteRise * 0.92 * (1 - themeArm * 0.35),
        prismOpacity,
        blackOpacity,
        isDark: blackOpacity > 0.1,
        isDocked: p < 0.24 || p > 0.76,
        useSpectrum: false,
        emitColor: themeArm > 0.32 ? toColor : EMIT_COLORS.white,
        theme: themeArm > 0.32
          ? (toColor === EMIT_COLORS.reason ? 'reason' : 'art')
          : 'white',
      };
    };

    const egoSequence = ({
      scrollY,
      vh,
      openingEnd,
      openingEndX,
      openingEndY,
      openingEndW,
      dockX,
      dockPassageY,
      dockW,
      ego,
    }) => {
      const egoIntroStart = openingEnd - vh * 0.85;
      const egoEnd = (ego?.offsetTop ?? openingEnd) + (ego?.offsetHeight ?? vh * 3) - vh;
      const span = Math.max(egoEnd - egoIntroStart, vh * 2.2);
      const p = clamp01((scrollY - egoIntroStart) / span);

      const glideT = smoothstep(clamp01(p / 0.24));
      const x = lerp(openingEndX, dockX, glideT);
      const y = lerp(openingEndY, dockPassageY, glideT);
      const w = lerp(openingEndW, dockW, glideT);

      const spectrumBeam = p < 0.2
        ? lerp(0.88, 0.2, smoothstep(p / 0.2))
        : Math.max(0, lerp(0.2, 0, smoothstep((p - 0.2) / 0.16)));
      const whiteBeam = p < 0.24 ? lerp(0.48, 0, smoothstep(p / 0.24)) : 0;
      const incoming = p < 0.4
        ? lerp(0.58, 0.06, smoothstep(clamp01((p - 0.08) / 0.32)))
        : Math.max(0, lerp(0.06, 0, smoothstep(clamp01((p - 0.4) / 0.2))));
      const emit = smoothstep(clamp01((p - 0.06) / 0.94)) * 0.92;
      const projectionP = smoothstep(clamp01((p - 0.04) / 0.96));

      return {
        x,
        y,
        w,
        incoming,
        emit,
        whiteBeam,
        spectrumBeam,
        projectionP,
        isDocked: glideT > 0.08,
        useSpectrum: spectrumBeam > 0.05 && p < 0.34,
      };
    };

    const update = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const scrollY = window.scrollY;
      const mobile = vw <= 720;

      const opening = root.querySelector('.opening-scene');
      const egoPassage = root.querySelector('#ego-passage');
      const ego = root.querySelector('#ego');
      const lovePassage = root.querySelector('#love-passage');
      const love = root.querySelector('#love');
      const reasonBlackout = root.querySelector('#reason-blackout');
      const reasonEl = root.querySelector('#reason');
      const artBlackout = root.querySelector('#art-blackout');
      const artEl = root.querySelector('#art');

      const openingP = scrollSpan(opening).p;
      const projectorP = clamp01((openingP - 0.34) / 0.46);
      const beamP = clamp01((openingP - 0.68) / 0.2);
      const colorBeamP = clamp01((openingP - 0.76) / 0.2);

      const egoPassageP = scrollSpan(egoPassage).p;
      const egoP = scrollSpan(ego).p;
      const lovePassageP = scrollSpan(lovePassage).p;
      const loveP = scrollSpan(love).p;
      const reasonBlackoutP = scrollSpan(reasonBlackout).p;
      const reasonP = scrollSpan(reasonEl).p;
      const artBlackoutP = scrollSpan(artBlackout).p;
      const artP = scrollSpan(artEl).p;

      const openingEnd = opening ? opening.offsetTop + opening.offsetHeight : 0;
      const egoPassageStart = egoPassage?.offsetTop ?? openingEnd;
      const egoStart = ego?.offsetTop ?? Infinity;
      const loveStart = love?.offsetTop ?? Infinity;
      const lovePassageStart = lovePassage?.offsetTop ?? loveStart;
      const reasonBlackoutStart = reasonBlackout?.offsetTop ?? Infinity;
      const reasonStart = reasonEl?.offsetTop ?? Infinity;
      const artBlackoutStart = artBlackout?.offsetTop ?? Infinity;
      const artStart = artEl?.offsetTop ?? Infinity;

      const loveEnd = love ? loveStart + love.offsetHeight - vh : loveStart;
      const reasonEnd = reasonEl ? reasonStart + reasonEl.offsetHeight - vh : reasonStart;
      const artEnd = artEl ? artStart + artEl.offsetHeight - vh : artStart;

      let zone = 'opening';
      if (scrollY >= artStart) zone = 'art';
      else if (scrollY >= artBlackoutStart) zone = 'art-blackout';
      else if (scrollY >= reasonStart) zone = 'reason';
      else if (scrollY >= reasonBlackoutStart) zone = 'reason-blackout';
      else if (scrollY >= loveStart) zone = 'love';
      else if (scrollY >= (lovePassage?.offsetTop ?? Infinity)) zone = 'love-passage';
      else if (scrollY >= egoStart) zone = 'ego';
      else if (scrollY >= egoPassageStart) zone = 'ego-passage';
      else if (scrollY >= openingEnd - vh * 0.85) zone = 'exit-opening';

      const loveLightsOutStart = loveEnd - vh * 0.55;
      const reasonLightsOutStart = reasonEnd - vh * 0.55;

      const inEgoSequence = scrollY >= openingEnd - vh * 0.85 && scrollY < lovePassageStart;
      const inLoveSequence = scrollY >= lovePassageStart && scrollY < loveLightsOutStart;
      const inLoveReasonHandoff = scrollY >= loveLightsOutStart && scrollY < reasonStart;
      const inReasonSequence = scrollY >= reasonStart && scrollY < reasonLightsOutStart;
      const inReasonArtHandoff = scrollY >= reasonLightsOutStart && scrollY < artStart;
      const inArtSequence = scrollY >= artStart;

      const loveDockX = vw * (mobile ? 0.078 : 0.062);
      const loveDockY = vh * (mobile ? 0.41 : 0.4);
      const loveDockW = mobile ? 128 : 168;
      const reasonDockX = vw * (mobile ? 0.08 : 0.06);
      const reasonDockY = vh * (mobile ? 0.42 : 0.4);
      const reasonDockW = mobile ? 128 : 168;
      const artDockX = vw * (mobile ? 0.09 : 0.08);
      const artDockY = vh * (mobile ? 0.4 : 0.38);
      const artDockW = mobile ? 132 : 176;

      let x = vw * 0.42;
      let y = vh * 0.46;
      let w = mobile ? 148 : 212;
      let incoming = 0;
      let emit = 0;
      let whiteBeam = 0;
      let spectrumBeam = 0;
      let emitColor = EMIT_COLORS.ego;
      let theme = 'ego';
      let useSpectrum = false;
      let prismOpacity = 1;
      let isDark = false;
      let isDocked = false;
      let projectionP = 0;
      let blackOpacity = 0;

      const openingSlot = root.querySelector('.opening-scene__prism-slot');
      const slotRect = openingSlot?.getBoundingClientRect();
      const slotX = slotRect ? slotRect.left + slotRect.width / 2 : vw * 0.13;
      const slotY = slotRect ? slotRect.top + slotRect.height * 0.5 : vh * 0.53;
      const slotW = slotRect?.width ?? (mobile ? 118 : 168);

      const openingCenterX = slotX;
      const openingCenterY = slotY;
      const openingEndX = vw * (mobile ? 0.3 : 0.28);
      const openingEndY = vh * (mobile ? 0.44 : 0.42);
      const openingEndW = mobile
        ? Math.min(Math.max(vw * 0.22, 148), 240)
        : Math.min(Math.max(vw * 0.18, 188), 320);
      const dockX = vw * (mobile ? 0.072 : 0.058);
      const dockPassageY = vh * (mobile ? 0.43 : 0.41);
      const dockW = mobile ? 124 : 162;

      if (zone === 'opening' && !reduceMotion) {
        const proj = smoothstep(projectorP);
        x = lerp(openingCenterX, openingEndX, proj);
        y = lerp(openingCenterY, openingEndY, smoothstep(projectorP * 0.9));
        w = lerp(slotW, openingEndW, proj);
        whiteBeam = smoothstep(beamP);
        spectrumBeam = smoothstep(colorBeamP);
        useSpectrum = spectrumBeam > 0.03 || whiteBeam > 0.08;
      } else if (inEgoSequence && !reduceMotion) {
        const egoState = egoSequence({
          scrollY,
          vh,
          openingEnd,
          openingEndX,
          openingEndY,
          openingEndW,
          dockX,
          dockPassageY,
          dockW,
          ego,
        });
        x = egoState.x;
        y = egoState.y;
        w = egoState.w;
        incoming = egoState.incoming;
        emit = egoState.emit;
        whiteBeam = egoState.whiteBeam;
        spectrumBeam = egoState.spectrumBeam;
        projectionP = egoState.projectionP;
        isDocked = egoState.isDocked;
        useSpectrum = egoState.useSpectrum;
        emitColor = EMIT_COLORS.ego;
        theme = 'ego';
      } else if (inLoveSequence && !reduceMotion) {
        const loveState = chapterSequence({
          scrollY,
          introStart: lovePassageStart,
          contentStart: loveStart,
          chapterEnd: loveLightsOutStart,
          vh,
          fromX: dockX,
          fromY: dockPassageY,
          fromW: dockW,
          dockX: loveDockX,
          dockY: loveDockY,
          dockW: loveDockW,
          glidePortion: 0.3,
          incomingStart: 0.52,
        });
        x = loveState.x;
        y = loveState.y;
        w = loveState.w;
        incoming = loveState.incoming;
        emit = loveState.emit;
        whiteBeam = loveState.whiteBeam;
        spectrumBeam = loveState.spectrumBeam;
        projectionP = loveState.projectionP;
        isDocked = loveState.isDocked;
        useSpectrum = loveState.useSpectrum;
        emitColor = EMIT_COLORS.love;
        theme = 'love';
      } else if (inLoveReasonHandoff && !reduceMotion) {
        const handoff = chapterHandoff({
          scrollY,
          start: loveLightsOutStart,
          end: reasonStart,
          vh,
          vw,
          mobile,
          from: { x: loveDockX, y: loveDockY, w: loveDockW },
          to: { x: reasonDockX, y: reasonDockY, w: reasonDockW, color: EMIT_COLORS.reason },
        });
        x = handoff.x;
        y = handoff.y;
        w = handoff.w;
        incoming = handoff.incoming;
        emit = handoff.emit;
        whiteBeam = handoff.whiteBeam;
        spectrumBeam = handoff.spectrumBeam;
        projectionP = handoff.projectionP;
        isDocked = handoff.isDocked;
        useSpectrum = handoff.useSpectrum;
        prismOpacity = handoff.prismOpacity;
        blackOpacity = handoff.blackOpacity;
        isDark = handoff.isDark;
        emitColor = handoff.emitColor;
        theme = handoff.theme;
      } else if (inReasonSequence && !reduceMotion) {
        const reasonState = chapterSequence({
          scrollY,
          introStart: reasonStart,
          chapterEnd: reasonLightsOutStart,
          vh,
          fromX: reasonDockX,
          fromY: reasonDockY,
          fromW: reasonDockW,
          dockX: reasonDockX,
          dockY: reasonDockY,
          dockW: reasonDockW,
          glidePortion: 0.08,
          incomingStart: 0.1,
          projectionMin: 0.28,
        });
        x = reasonState.x;
        y = reasonState.y;
        w = reasonState.w;
        incoming = reasonState.incoming;
        emit = reasonState.emit;
        whiteBeam = 0;
        spectrumBeam = 0;
        projectionP = reasonState.projectionP;
        isDocked = true;
        useSpectrum = false;
        isDark = true;
        emitColor = EMIT_COLORS.reason;
        theme = 'reason';
      } else if (inReasonArtHandoff && !reduceMotion) {
        const handoff = chapterHandoff({
          scrollY,
          start: reasonLightsOutStart,
          end: artStart,
          vh,
          vw,
          mobile,
          from: { x: reasonDockX, y: reasonDockY, w: reasonDockW },
          to: { x: artDockX, y: artDockY, w: artDockW, color: EMIT_COLORS.art },
        });
        x = handoff.x;
        y = handoff.y;
        w = handoff.w;
        incoming = handoff.incoming;
        emit = handoff.emit;
        whiteBeam = handoff.whiteBeam;
        spectrumBeam = handoff.spectrumBeam;
        projectionP = handoff.projectionP;
        isDocked = handoff.isDocked;
        useSpectrum = handoff.useSpectrum;
        prismOpacity = handoff.prismOpacity;
        blackOpacity = handoff.blackOpacity;
        isDark = handoff.isDark;
        emitColor = handoff.emitColor;
        theme = handoff.theme;
      } else if (inArtSequence && !reduceMotion) {
        const artState = chapterSequence({
          scrollY,
          introStart: artStart,
          chapterEnd: artEnd,
          vh,
          fromX: artDockX,
          fromY: artDockY,
          fromW: artDockW,
          dockX: artDockX,
          dockY: artDockY,
          dockW: artDockW,
          glidePortion: 0.08,
          incomingStart: 0.1,
          projectionMin: 0.28,
        });
        x = artState.x;
        y = artState.y;
        w = artState.w;
        incoming = artState.incoming;
        emit = artState.emit;
        whiteBeam = 0;
        spectrumBeam = 0;
        projectionP = artState.projectionP;
        isDocked = true;
        useSpectrum = false;
        isDark = true;
        emitColor = EMIT_COLORS.art;
        theme = 'art';
      }

      const blendWindow = vh * 0.14;
      const blendAt = (boundary, before, after) => {
        if (scrollY <= boundary - blendWindow) return before();
        if (scrollY >= boundary + blendWindow) return after();
        const t = smoothstep((scrollY - (boundary - blendWindow)) / (blendWindow * 2));
        return blend(before(), after(), t);
      };

      const packState = (values) => ({
        x,
        y,
        w,
        incoming,
        emit,
        whiteBeam,
        spectrumBeam,
        projectionP,
        blackOpacity,
        prismOpacity,
        isDocked,
        useSpectrum,
        isDark,
        theme,
        emitColor,
        ...values,
      });

      if (!reduceMotion) {
        const egoStateAt = (yPos = scrollY) => {
          const egoState = egoSequence({
            scrollY: yPos,
            vh,
            openingEnd,
            openingEndX,
            openingEndY,
            openingEndW,
            dockX,
            dockPassageY,
            dockW,
            ego,
          });
          return packState({
            x: egoState.x,
            y: egoState.y,
            w: egoState.w,
            incoming: egoState.incoming,
            emit: egoState.emit,
            whiteBeam: egoState.whiteBeam,
            spectrumBeam: egoState.spectrumBeam,
            projectionP: egoState.projectionP,
            isDocked: egoState.isDocked,
            useSpectrum: egoState.useSpectrum,
            theme: 'ego',
            emitColor: EMIT_COLORS.ego,
            blackOpacity: 0,
            prismOpacity: 1,
            isDark: false,
          });
        };

        const loveStateAt = (yPos = scrollY) => {
          const loveState = chapterSequence({
            scrollY: yPos,
            introStart: lovePassageStart,
            contentStart: loveStart,
            chapterEnd: loveLightsOutStart,
            vh,
            fromX: dockX,
            fromY: dockPassageY,
            fromW: dockW,
            dockX: loveDockX,
            dockY: loveDockY,
            dockW: loveDockW,
            glidePortion: 0.3,
            incomingStart: 0.52,
          });
          return packState({
            x: loveState.x,
            y: loveState.y,
            w: loveState.w,
            incoming: loveState.incoming,
            emit: loveState.emit,
            projectionP: loveState.projectionP,
            isDocked: loveState.isDocked,
            theme: 'love',
            emitColor: EMIT_COLORS.love,
            blackOpacity: 0,
            prismOpacity: 1,
            isDark: false,
            whiteBeam: 0,
            spectrumBeam: 0,
            useSpectrum: false,
          });
        };

        const loveHandoffAt = (yPos = scrollY) => {
          const handoff = chapterHandoff({
            scrollY: yPos,
            start: loveLightsOutStart,
            end: reasonStart,
            vh,
            vw,
            mobile,
            from: { x: loveDockX, y: loveDockY, w: loveDockW },
            to: { x: reasonDockX, y: reasonDockY, w: reasonDockW, color: EMIT_COLORS.reason },
          });
          return packState({
            x: handoff.x,
            y: handoff.y,
            w: handoff.w,
            incoming: handoff.incoming,
            emit: handoff.emit,
            whiteBeam: handoff.whiteBeam,
            spectrumBeam: handoff.spectrumBeam,
            projectionP: handoff.projectionP,
            isDocked: handoff.isDocked,
            useSpectrum: handoff.useSpectrum,
            prismOpacity: handoff.prismOpacity,
            blackOpacity: handoff.blackOpacity,
            isDark: handoff.isDark,
            emitColor: handoff.emitColor,
            theme: handoff.theme,
          });
        };

        const reasonStateAt = (yPos = scrollY) => {
          const reasonState = chapterSequence({
            scrollY: yPos,
            introStart: reasonStart,
            chapterEnd: reasonLightsOutStart,
            vh,
            fromX: reasonDockX,
            fromY: reasonDockY,
            fromW: reasonDockW,
            dockX: reasonDockX,
            dockY: reasonDockY,
            dockW: reasonDockW,
            glidePortion: 0.12,
            incomingStart: 0.1,
            projectionMin: 0.28,
          });
          return packState({
            x: reasonState.x,
            y: reasonState.y,
            w: reasonState.w,
            incoming: reasonState.incoming,
            emit: reasonState.emit,
            projectionP: reasonState.projectionP,
            isDocked: true,
            theme: 'reason',
            emitColor: EMIT_COLORS.reason,
            blackOpacity: 0,
            prismOpacity: 1,
            isDark: true,
            whiteBeam: 0,
            spectrumBeam: 0,
            useSpectrum: false,
          });
        };

        const artHandoffAt = (yPos = scrollY) => {
          const handoff = chapterHandoff({
            scrollY: yPos,
            start: reasonLightsOutStart,
            end: artStart,
            vh,
            vw,
            mobile,
            from: { x: reasonDockX, y: reasonDockY, w: reasonDockW },
            to: { x: artDockX, y: artDockY, w: artDockW, color: EMIT_COLORS.art },
          });
          return packState({
            x: handoff.x,
            y: handoff.y,
            w: handoff.w,
            incoming: handoff.incoming,
            emit: handoff.emit,
            whiteBeam: handoff.whiteBeam,
            spectrumBeam: handoff.spectrumBeam,
            projectionP: handoff.projectionP,
            isDocked: handoff.isDocked,
            useSpectrum: handoff.useSpectrum,
            prismOpacity: handoff.prismOpacity,
            blackOpacity: handoff.blackOpacity,
            isDark: handoff.isDark,
            emitColor: handoff.emitColor,
            theme: handoff.theme,
          });
        };

        let blended = null;
        if (scrollY > lovePassageStart - blendWindow && scrollY < lovePassageStart + blendWindow) {
          blended = blendAt(lovePassageStart, egoStateAt, loveStateAt);
        } else if (scrollY > loveLightsOutStart - blendWindow && scrollY < loveLightsOutStart + blendWindow) {
          blended = blendAt(loveLightsOutStart, loveStateAt, loveHandoffAt);
        } else if (scrollY > reasonStart - blendWindow && scrollY < reasonStart + blendWindow) {
          blended = blendAt(reasonStart, loveHandoffAt, reasonStateAt);
        } else if (scrollY > reasonLightsOutStart - blendWindow && scrollY < reasonLightsOutStart + blendWindow) {
          blended = blendAt(reasonLightsOutStart, reasonStateAt, artHandoffAt);
        } else if (scrollY > artStart - blendWindow && scrollY < artStart + blendWindow) {
          blended = blendAt(artStart, artHandoffAt, () => packState({
            x: artDockX,
            y: artDockY,
            w: artDockW,
            projectionP: 0.28,
            emit: 0.5,
            isDocked: true,
            theme: 'art',
            emitColor: EMIT_COLORS.art,
            isDark: true,
          }));
        }

        if (blended) {
          ({
            x,
            y,
            w,
            incoming,
            emit,
            whiteBeam,
            spectrumBeam,
            projectionP,
            blackOpacity,
            prismOpacity,
            isDocked,
            useSpectrum,
            isDark,
            theme,
            emitColor,
          } = blended);
        }
      }

      root.dataset.dark = isDark ? 'true' : 'false';

      let chapterId = 'opening';
      if (inArtSequence) chapterId = 'art';
      else if (inReasonArtHandoff || zone === 'art-blackout') chapterId = 'art-handoff';
      else if (inReasonSequence) chapterId = 'reason';
      else if (inLoveReasonHandoff || zone === 'reason-blackout') chapterId = 'reason-handoff';
      else if (inLoveSequence) chapterId = scrollY < loveStart ? 'love-passage' : 'love';
      else if (inEgoSequence) chapterId = scrollY < egoStart ? 'ego-passage' : 'ego';
      else if (zone === 'exit-opening') chapterId = 'exit-opening';
      root.dataset.chapter = chapterId;
      document.body.dataset.journeyDark = isDark ? 'true' : 'false';

      const prismH = w / 0.68;
      const emitX = x + w * 0.01;
      const emitY = y - prismH * 0.03;
      let fanHeightPx = vh * 0.82;

      const stageByTheme = {
        ego: '#ego .chapter-projector__stage',
        love: '#love .chapter-projector__stage',
        reason: '#reason .chapter-projector__stage',
        art: '#art .chapter-projector__stage',
        white: '#reason .chapter-projector__stage',
      };
      const activeStage = stageByTheme[theme] ? root.querySelector(stageByTheme[theme]) : null;

      if (isDocked && activeStage) {
        const stageRect = activeStage.getBoundingClientRect();
        if (stageRect.height > 0) {
          const coverTop = Math.abs(stageRect.top - emitY);
          const coverBottom = Math.abs(stageRect.bottom - emitY);
          fanHeightPx = Math.max((coverTop + coverBottom) * 1.08, vh * 0.76);
        }
      } else if (chapterId === 'love-passage' || chapterId === 'ego-passage') {
        fanHeightPx = vh * 0.9;
      }

      const projectionOriginX = emitX;
      const projectionSpan = Math.max(vw - projectionOriginX, vw * 0.52);
      const projectionEdgeX = projectionOriginX + projectionP * projectionSpan;

      const motionTarget = {
        x,
        y,
        w,
        projectionP,
        emit,
        incoming,
        whiteBeam,
        spectrumBeam,
        blackOpacity,
        prismOpacity,
        projectionEdgeX,
        fanHeight: fanHeightPx,
      };

      if (!motion.ready) {
        Object.assign(motion, motionTarget);
        motion.ready = true;
      } else if (reduceMotion) {
        Object.assign(motion, motionTarget);
      } else {
        motion.x = follow(motion.x, motionTarget.x, SMOOTH.pos);
        motion.y = follow(motion.y, motionTarget.y, SMOOTH.pos);
        motion.w = follow(motion.w, motionTarget.w, SMOOTH.size);
        motion.projectionP = follow(motion.projectionP, motionTarget.projectionP, SMOOTH.projection);
        motion.emit = follow(motion.emit, motionTarget.emit, SMOOTH.light);
        motion.incoming = follow(motion.incoming, motionTarget.incoming, SMOOTH.light);
        motion.whiteBeam = follow(motion.whiteBeam, motionTarget.whiteBeam, SMOOTH.light);
        motion.spectrumBeam = follow(motion.spectrumBeam, motionTarget.spectrumBeam, SMOOTH.light);
        motion.blackOpacity = follow(motion.blackOpacity, motionTarget.blackOpacity, SMOOTH.opacity);
        motion.prismOpacity = follow(motion.prismOpacity, motionTarget.prismOpacity, SMOOTH.opacity);
        motion.projectionEdgeX = follow(motion.projectionEdgeX, motionTarget.projectionEdgeX, SMOOTH.projection);
        motion.fanHeight = follow(motion.fanHeight, motionTarget.fanHeight, SMOOTH.fan);
      }

      const renderX = motion.x;
      const renderY = motion.y;
      const renderW = motion.w;
      const renderProjectionP = motion.projectionP;
      const renderEmit = motion.emit;
      const renderIncoming = motion.incoming;
      const renderWhiteBeam = motion.whiteBeam;
      const renderSpectrumBeam = motion.spectrumBeam;
      const renderBlackOpacity = motion.blackOpacity;
      const renderPrismOpacity = motion.prismOpacity;
      const renderFanHeight = motion.fanHeight;

      const renderPrismH = renderW / 0.68;
      const renderEmitX = renderX + renderW * 0.01;
      const renderEmitY = renderY - renderPrismH * 0.03;
      const renderProjectionEdgeX = motion.projectionEdgeX;
      const renderBeamReach = Math.max(0, renderProjectionEdgeX - renderEmitX);

      root.style.setProperty('--projection-p', renderProjectionP.toFixed(4));
      root.style.setProperty('--prism-clearance', `${Math.round(renderW * 1.08 + (mobile ? 20 : 28))}px`);
      root.style.setProperty('--blackout-opacity', renderBlackOpacity.toFixed(4));
      root.style.setProperty('--fan-height', `${renderFanHeight.toFixed(1)}px`);
      root.style.setProperty('--projection-origin-x', `${renderEmitX.toFixed(2)}px`);
      root.style.setProperty('--projection-edge-x', `${renderProjectionEdgeX.toFixed(2)}px`);
      root.style.setProperty('--beam-reach', `${renderBeamReach.toFixed(2)}px`);

      const aimBeamAt = (selector, cssVar) => {
        const el = root.querySelector(selector);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const targetX = rect.left + 8;
        const targetY = rect.top + rect.height * 0.58;
        const angle = Math.atan2(targetY - renderEmitY, targetX - renderEmitX) * (180 / Math.PI);
        prism.style.setProperty(cssVar, `${angle.toFixed(2)}deg`);
      };

      if (useSpectrum && (zone === 'opening' || zone === 'exit-opening')) {
        aimBeamAt('.opening-scene__appendix-item--ego', '--beam-tilt-gold');
        aimBeamAt('.opening-scene__appendix-item--love', '--beam-tilt-blue');
        aimBeamAt('.opening-scene__appendix-item--reason', '--beam-tilt-red');
        aimBeamAt('.opening-scene__appendix-item--art', '--beam-tilt-purple');
      }

      root.classList.toggle('is-spectrum-active', useSpectrum && (zone === 'opening' || zone === 'exit-opening'));

      prism.style.setProperty('--prism-x', `${renderX.toFixed(2)}px`);
      prism.style.setProperty('--prism-y', `${renderY.toFixed(2)}px`);
      prism.style.setProperty('--prism-w', `${renderW.toFixed(2)}px`);
      prism.style.setProperty('--prism-opacity', renderPrismOpacity.toFixed(4));
      prism.style.setProperty('--projection-p', renderProjectionP.toFixed(4));
      prism.style.setProperty('--incoming-opacity', renderIncoming.toFixed(4));
      prism.style.setProperty('--emit-opacity', renderEmit.toFixed(4));
      prism.style.setProperty('--emit-color', emitColor);
      prism.style.setProperty('--white-beam', renderWhiteBeam.toFixed(4));
      prism.style.setProperty('--spectrum-beam', renderSpectrumBeam.toFixed(4));

      beam.style.left = `${renderEmitX.toFixed(2)}px`;
      beam.style.top = `${renderEmitY.toFixed(2)}px`;
      beam.style.setProperty('--fan-height', `${renderFanHeight.toFixed(1)}px`);
      beam.style.setProperty('--beam-reach', `${renderBeamReach.toFixed(2)}px`);
      beam.style.setProperty('--projection-p', renderProjectionP.toFixed(4));
      beam.style.setProperty('--emit-opacity', renderEmit.toFixed(4));
      beam.dataset.theme = theme;
      beam.classList.toggle('is-active', ['ego', 'love', 'reason', 'art', 'white'].includes(theme) && renderProjectionP > 0.06 && (renderEmit > 0.05 || renderWhiteBeam > 0.08));

      prism.classList.toggle('is-spectrum', useSpectrum);
      prism.classList.toggle('is-emitting', renderEmit > 0.04 || renderWhiteBeam > 0.12 || renderProjectionP > 0.06);
      prism.classList.toggle('is-docked', isDocked);
      prism.classList.toggle('is-opening', zone === 'opening' || (inEgoSequence && renderProjectionP < 0.28));
      prism.classList.toggle('is-blackout', inLoveReasonHandoff || inReasonArtHandoff || zone === 'reason-blackout' || zone === 'art-blackout');
      prism.classList.toggle('journey-prism--ego', theme === 'ego');
      prism.classList.toggle('journey-prism--love', theme === 'love');
      prism.classList.toggle('journey-prism--reason', theme === 'reason');
      prism.classList.toggle('journey-prism--art', theme === 'art');
    };

    let raf = 0;
    const tick = () => {
      update();
      raf = requestAnimationFrame(tick);
    };

    tick();
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('resize', update);
      if (raf) cancelAnimationFrame(raf);
      document.body.dataset.journeyDark = '';
      root.style.setProperty('--projection-p', '0');
      root.style.setProperty('--projection-origin-x', '0px');
      root.style.setProperty('--projection-edge-x', '0px');
      root.style.setProperty('--beam-reach', '0px');
      root.style.setProperty('--fan-height', '0px');
      root.dataset.chapter = '';
      root.style.setProperty('--blackout-opacity', '0');
    };
  }, []);

  return (
    <div className="journey" ref={rootRef}>
      <div className="journey__blackout" aria-hidden="true" />
      <ProjectionOverlay projection={projection} />
      <div ref={beamRef} className="journey-beam" aria-hidden="true">
        <span className="journey-beam__wash" />
        <span className="journey-beam__fan" />
        <span className="journey-beam__core" />
      </div>
      <JourneyPrism prismRef={prismRef} />
      <OpeningScene projectTo={projectTo} />
      <ChapterPassage id="ego-passage" theme="ego" />
      <EgoChapter chapter={egoChapter} />
      <ChapterPassage id="love-passage" theme="love" />
      <LoveChapter chapter={loveChapter} />
      <BlackoutPassage id="reason-blackout" nextTheme="reason" />
      <ReasonChapter chapter={reasonChapter} />
      <BlackoutPassage id="art-blackout" nextTheme="art" />
      <ArtChapter chapter={artChapter} />
    </div>
  );
}
