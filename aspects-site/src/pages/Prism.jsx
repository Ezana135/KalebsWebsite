import { Link } from 'react-router-dom';
import RefractionSection from '../components/RefractionSection';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import './prism.css';

export default function Prism() {
  return (
    <div className="prism-page">
      <section className="prism-page__intro section" aria-label="Introduction">
        <div className="container">
          <Reveal>
            <p className="eyebrow">ASPECTS</p>
            <h1 className="prism-page__title">
              White light walks in.
              <br />
              Four selves walk out.
            </h1>
            <p className="prism-page__lede">
              The letter A becomes a prism. One life enters; four aspects leave — 
              <em> Ego</em>, <em>Love</em>, <em>Reason</em>, and <em>Art</em>. Follow a beam.
            </p>
          </Reveal>
        </div>
      </section>

      <RefractionSection id="the-prism" />

      <section className="container section prism-page__outro">
        <Reveal>
          <p className="prism-page__outro-line">
            The same self, split into four emotional worlds. Start anywhere. It all
            refracts back to one.
          </p>
          <Link to="/music" className="link-arrow">
            Or hear the whole spectrum <span aria-hidden="true">&rarr;</span>
          </Link>
        </Reveal>
        <EmailCapture
          heading="Follow the light"
          body="Be first through the prism — releases, films, and essays as they land."
          tone="light"
        />
      </section>
    </div>
  );
}
