import { Link } from 'react-router-dom';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import PrismGlass from '../components/PrismGlass';
import PortraitFigure from '../components/PortraitFigure';
import './about.css';

const ROLES = [
  { title: 'Musician', dek: 'Songwriter and vocalist' },
  { title: 'Producer', dek: 'Self-produced, world-building' },
  { title: 'Writer', dek: 'Words for the in-between' },
  { title: 'Performer', dek: 'Live shows. Real connection.' },
];

// Replace-note: swap with real press-feature names/links as they land.
const PRESS = ['NATIVE', 'NOTION', 'EARMILK', 'CLASH', 'Wonderland.', 'THE LINE OF BEST FIT'];

export default function About() {
  return (
    <div className="about" data-theme="ego">
      <div className="container about__grid">
        <div className="about__content">
          <Reveal>
            <p className="about__num">05</p>
            <h1 className="about__title">About</h1>
            <span className="about__rule" aria-hidden="true" />
          </Reveal>

          <Reveal delay={100}>
            <div className="about__bio">
              <p>
                I&rsquo;m Kaleb Kavuma &mdash; musician, producer, writer, performer.
                ASPECTS is how I make sense of the many sides of me. Each song, each
                visual, each story is a different angle on the same truth: we&rsquo;re
                all made of more than one thing.
              </p>
              <p>
                Born in Kampala. Raised on church, hip hop, and home recordings. Now
                based in London, I build worlds where sound, image and words meet. My
                work lives somewhere between alternative R&amp;B, hip hop, and
                cinematic soul &mdash; honest, textured, and intentional.
              </p>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <blockquote className="about__quote">
              <span className="about__quote-mark" aria-hidden="true">
                &ldquo;
              </span>
              <p>
                for anyone who&rsquo;s ever been
                <br />
                too many things for one room.
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={200}>
            <ul className="about__roles" aria-label="Roles">
              {ROLES.map((r) => (
                <li key={r.title}>
                  <p className="about__role-title">{r.title}</p>
                  <p className="about__role-dek">{r.dek}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={250}>
            <p className="eyebrow about__press-label">Selected features</p>
            <ul className="about__press" aria-label="Selected press features">
              {PRESS.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={300}>
            <div className="about__ctas">
              <Link to="/manifesto" className="btn">
                Read the manifesto <span aria-hidden="true">&rarr;</span>
              </Link>
              <Link to="/music" className="btn">
                Listen to the music <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </Reveal>

          <EmailCapture heading="Stay in the loop" body="New music, visuals, and words." tone="light" compact />
        </div>

        {/*
          Replace-note: this column hosts the press-quality B&W portrait.
          Drop the real file at /public/media/portrait-about.jpg (2:3) and
          replace the placeholder div below.
        */}
        <div className="about__portrait-col">
          <div className="about__portrait">
            <PortraitFigure label="Press portrait of Kaleb Kavuma" />
          </div>
          <div className="about__prism" aria-hidden="true">
            <PrismGlass variant="plain" />
          </div>
        </div>
      </div>

      <div className="container about__index" aria-hidden="true">
        <span>05</span>
        <span className="about__index-line" />
        <span>07</span>
      </div>
    </div>
  );
}
