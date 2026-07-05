import { Link } from 'react-router-dom';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import './manifesto.css';

export default function Manifesto() {
  return (
    <div className="manifesto">
      <div className="container">
        <Reveal>
          <h1 className="manifesto__title">Manifesto</h1>
          <span className="manifesto__rule" aria-hidden="true" />
        </Reveal>

        <div className="manifesto__reading">
          <Reveal>
            <p>
              I don&rsquo;t see myself as one thing. I never have.
              <br />
              I&rsquo;m the quiet and the loud. The thinker and the feeler. The
              visionary and the sceptic.
              <br />
              The discipline and the chaos. The past and the becoming.
              <br />
              I hold multitudes&mdash;contradictions, dualities, unfinished
              ideas&mdash;and I see them all as true.
              <br />
              Not always at the same time. But always as part of me.
            </p>
          </Reveal>

          <Reveal>
            <p className="manifesto__thesis">Nothing real is ever just one thing.</p>
          </Reveal>

          <Reveal>
            <p>
              ASPECTS is how I honour that truth.
              <br />
              This is where I build freely. Where sound meets story. Where visuals
              speak.
              <br />
              Where thoughts unfold. Where everything connects&mdash;and nothing has
              to be contained.
            </p>
          </Reveal>

          <Reveal>
            <p>
              I create music that lives between genres.
              <br />
              I make visuals that move between worlds.
              <br />
              I write from the in-between spaces.
              <br />
              I exist in layers&mdash;and I invite you to explore them with me.
              <br />
              Not to figure me out. But to feel something real.
            </p>
          </Reveal>

          <Reveal>
            <p className="manifesto__signoff">One self, many aspects.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="manifesto__paths">
            <Link to="/music" className="manifesto__path">
              Listen
            </Link>
            <span aria-hidden="true">/</span>
            <a href="#manifesto-list" className="manifesto__path manifesto__path--underlined">
              Join the list
            </a>
          </div>
        </Reveal>

        <div id="manifesto-list">
          <EmailCapture
            heading="Quiet updates"
            body="Occasional words, music, and films. Nothing loud."
            tone="light"
            compact
          />
        </div>
      </div>
    </div>
  );
}
