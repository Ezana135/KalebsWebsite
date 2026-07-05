import { Link } from 'react-router-dom';
import PrismGlass from '../components/PrismGlass';
import PortraitFigure from '../components/PortraitFigure';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import ChapterLinks from '../components/ChapterLinks';
import useScrollProgress from '../hooks/useScrollProgress';
import './landing.css';

export default function Landing() {
  const prismSeq = useScrollProgress('--p');
  const takeover = useScrollProgress('--t');

  return (
    <div className="landing">
      {/* ============ HERO — vertically centred title, portrait right ============ */}
      <section className="landing__hero" aria-label="ASPECTS — Kaleb Kavuma">
        <div className="container landing__hero-grid">
          <div className="landing__title-wrap">
            <h1 className="landing__title">
              <span className="landing__prism-a" aria-hidden="true">
                <PrismGlass variant="flare" />
              </span>
              <span className="landing__title-text" data-text="SPECTS">
                SPECTS
              </span>
              <span className="visually-hidden">ASPECTS</span>
            </h1>
            <Reveal delay={250}>
              <p className="landing__tagline">One self, many aspects.</p>
            </Reveal>
          </div>

          {/*
            Replace-note: swap this placeholder for the real black-and-white
            press portrait at /public/media/portrait-hero.jpg (3:4 crop).
          */}
          <div className="landing__side">
            <div className="landing__portrait">
              <PortraitFigure label="Black-and-white portrait of Kaleb Kavuma" />
            </div>
            <EmailCapture
              heading="Join the journey"
              body=""
              tone="light"
              compact
            />
          </div>
        </div>

        <a className="landing__scroll-cue" href="#refraction" aria-label="Scroll to the prism">
          <span className="landing__scroll-label">Enter the prism</span>
          <span className="landing__scroll-line" aria-hidden="true" />
        </a>
      </section>

      {/* ============ PRISM SEQUENCE — the A takes the whole screen ============
          No text, no separation: scrolling pulls the A to centre stage, white
          light enters, four beams refract out, then the thesis line lands. */}
      <section id="refraction" ref={prismSeq} className="landing__seq" aria-label="The prism">
        <div className="landing__stage">
          <span className="landing__ghost" aria-hidden="true">
            ASPECTS
          </span>
          <div className="landing__stage-prism">
            <PrismGlass variant="beams" className="landing__stage-beams" />
          </div>
          <p className="landing__thesis">Nothing real is ever just one thing.</p>
        </div>
      </section>

      {/* ============ CHAPTERS ============ */}
      <section className="landing__chapters section" aria-label="The four chapters">
        <div className="container">
          <ChapterLinks />
        </div>
      </section>

      {/* ============ EGO TAKEOVER — gold floods the page left to right ============ */}
      <section ref={takeover} className="landing__takeover" aria-label="Enter chapter one: Ego">
        <div className="landing__tk-stage">
          <span className="landing__tk-wash" aria-hidden="true" />
          <div className="landing__tk-prism" aria-hidden="true">
            <PrismGlass variant="emit" tint="rgba(217, 169, 74, 0.55)" />
          </div>
          <div className="landing__tk-copy">
            <p className="landing__tk-eyebrow">
              <span>01</span> / EGO
            </p>
            <p className="landing__tk-title">EGO</p>
            <p className="landing__tk-sub">image, ambition, reflection.</p>
            <Link to="/chapters/ego" className="btn landing__tk-enter">
              Enter the chapter <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CLOSING ============ */}
      <section className="section landing__closing">
        <div className="container">
          <Reveal>
            <div className="landing__closing-links">
              <Link to="/manifesto" className="link-arrow">
                Read the manifesto <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link to="/music" className="link-arrow">
                Listen to the music <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
