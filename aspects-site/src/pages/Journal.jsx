import MediaFrame from '../components/MediaFrame';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import PrismMark from '../components/PrismMark';
import './journal.css';

const CHAPTER_COLOURS = {
  ego: 'var(--ego-accent)',
  love: 'var(--love-accent)',
  reason: 'var(--reason-accent)',
  art: 'var(--art-accent)',
};

// Replace-note: wire these to real Substack posts when published.
const FEATURED = {
  label: 'Featured essay',
  title: 'The Four Aspects of a Whole Life',
  dek: 'On ego, love, reason, and art — and how they shape the way we live, create, and leave something behind.',
};

const ESSAYS = [
  {
    chapter: 'ego',
    num: '01',
    title: 'The Cost of Being Seen',
    dek: 'Ego builds the stage before the music. It demands everything, then asks for more.',
    read: '8 min read',
  },
  {
    chapter: 'love',
    num: '02',
    title: 'On Loving From A Distance',
    dek: 'Love is not always proximity. Sometimes it is a postcard you never send.',
    read: '7 min read',
  },
  {
    chapter: 'reason',
    num: '03',
    title: 'The Case for Conscious Art',
    dek: 'On responsibility, memory, and the rhythms that refuse to be forgotten.',
    read: '9 min read',
  },
  {
    chapter: 'art',
    num: '04',
    title: 'On Making Without a Map',
    dek: 'Thoughts on process, surrender, and the beauty of not knowing.',
    read: '6 min read',
  },
];

export default function Journal() {
  return (
    <div className="journal">
      <div className="container journal__top">
        <div className="journal__masthead">
          <Reveal>
            <h1 className="journal__title">Journal</h1>
            <span className="journal__rule" aria-hidden="true" />
            <p className="journal__strap">the thinking underneath the music.</p>
            <p className="journal__lede">
              Essays on identity, creativity, memory, and meaning. Notes from the
              work. Reflections from the process. Ideas that shape the
              music&mdash;and the man behind it.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="journal__featured-wrap">
          <a href="https://substack.com" target="_blank" rel="noreferrer" className="journal__featured">
            <MediaFrame
              scene="journal-feature"
              playable={false}
              ratio="16/8"
              assetName="journal-featured.jpg"
            />
            <div className="journal__featured-copy">
              <p className="journal__featured-label">{FEATURED.label}</p>
              <h2 className="journal__featured-title">{FEATURED.title}</h2>
              <p className="journal__featured-dek">{FEATURED.dek}</p>
              <span className="link-arrow journal__featured-cta">
                Read essay <span aria-hidden="true">&rarr;</span>
              </span>
            </div>
          </a>
        </Reveal>
      </div>

      <div className="container journal__body">
        <ol className="journal__list" aria-label="Essays by chapter">
          {ESSAYS.map((e, i) => (
            <li key={e.title}>
              <Reveal delay={i * 70}>
                <a
                  href="https://substack.com"
                  target="_blank"
                  rel="noreferrer"
                  className="journal__row"
                  style={{ '--chapter-colour': CHAPTER_COLOURS[e.chapter] }}
                >
                  <span className="journal__row-chapter">
                    {e.num} / {e.chapter.toUpperCase()}
                  </span>
                  <span className="journal__row-prism" aria-hidden="true">
                    <PrismMark size={18} tint={CHAPTER_COLOURS[e.chapter]} />
                  </span>
                  <span className="journal__row-title">{e.title}</span>
                  <span className="journal__row-dek">{e.dek}</span>
                  <span className="journal__row-meta">
                    <em>{e.read}</em>
                    <span className="link-arrow">
                      Read <span aria-hidden="true">&rarr;</span>
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={150} className="journal__subscribe">
          <div className="journal__subscribe-inner">
            <p className="journal__subscribe-title">
              Essays.
              <br />
              Notes.
              <br />
              Works in Progress.
            </p>
            <p className="journal__subscribe-dek">
              Unfinished thoughts. Early ideas. Process before it becomes release.
            </p>
            <EmailCapture heading="Subscribe" body="" tone="dark" compact cta="Subscribe" />
            <a href="https://substack.com" target="_blank" rel="noreferrer" className="link-arrow">
              Or read on Substack <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
          <span className="journal__subscribe-prism" aria-hidden="true">
            <PrismMark size={110} tint="rgba(255,255,255,0.35)" />
          </span>
        </Reveal>
      </div>
    </div>
  );
}
