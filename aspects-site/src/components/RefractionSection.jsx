import PrismGlass from './PrismGlass';
import ChapterLinks from './ChapterLinks';
import Reveal from './Reveal';
import './refraction.css';

/**
 * The prism/refraction centrepiece for the /prism page. White light enters
 * the glass prism from the left; four coloured beams exit right; the four
 * chapter links sit beneath.
 */
export default function RefractionSection({ id = 'refraction' }) {
  return (
    <section id={id} className="refraction section" aria-labelledby="refraction-title">
      <span className="refraction__ghost" aria-hidden="true">
        ASPECTS
      </span>

      <div className="container">
        <Reveal>
          <p className="eyebrow refraction__eyebrow">The Prism</p>
          <h2 id="refraction-title" className="refraction__thesis">
            Nothing real is ever just one thing.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="refraction__stage">
            <PrismGlass variant="beams" />
          </div>
        </Reveal>

        <ChapterLinks />
      </div>
    </section>
  );
}
