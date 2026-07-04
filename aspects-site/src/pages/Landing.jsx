import { Link } from 'react-router-dom';
import PrismGlass from '../components/PrismGlass';
import PortraitFigure from '../components/PortraitFigure';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import RefractionSection from '../components/RefractionSection';
import './landing.css';

export default function Landing() {
  return (
    <div className="landing">
      {/* HERO */}
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
          <div className="landing__portrait">
            <PortraitFigure label="Black-and-white portrait of Kaleb Kavuma" />
          </div>
        </div>

        <a className="landing__scroll-cue" href="#refraction" aria-label="Scroll to the prism">
          <span className="landing__scroll-label">Enter the prism</span>
          <span className="landing__scroll-line" aria-hidden="true" />
        </a>
      </section>

      {/* FIRST SCROLL BREAK: email capture */}
      <div className="container">
        <Reveal>
          <EmailCapture
            heading="Join the journey"
            body="New music, visuals, and essays — straight to your inbox."
            tone="light"
          />
        </Reveal>
      </div>

      {/* REFRACTION SECTION */}
      <RefractionSection id="refraction" />

      {/* CLOSING LINE */}
      <section className="section landing__closing">
        <div className="container">
          <Reveal>
            <p className="landing__closing-line">
              &ldquo;Nothing real is ever just one thing.&rdquo;
            </p>
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
