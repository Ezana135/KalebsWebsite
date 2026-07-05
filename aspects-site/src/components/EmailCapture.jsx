import { useState } from 'react';
import './email-capture.css';

/**
 * Reusable email capture bar. Appears at natural stopping points across
 * the site. `tone` controls the surface: 'dark' | 'light' | 'sand'.
 *
 * Replace-note: wire `onSubmit` to a real ESP (Mailchimp/Substack/Buttondown)
 * endpoint when available — currently stores state locally and confirms.
 */
export default function EmailCapture({
  heading = 'Stay in the loop',
  body = 'New music, visuals, and essays — straight to your inbox.',
  cta = 'Subscribe',
  tone = 'dark',
  compact = false,
}) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setDone(true);
  };

  return (
    <section className={`ecap ecap--${tone} ${compact ? 'ecap--compact' : ''}`} aria-label="Email signup">
      <div className="ecap__text">
        <p className="ecap__heading">{heading}</p>
        {!compact && <p className="ecap__body">{body}</p>}
      </div>
      {done ? (
        <p className="ecap__done" role="status">
          You&rsquo;re on the list. Welcome to the journey.
        </p>
      ) : (
        <form className="ecap__form" onSubmit={submit}>
          <label className="visually-hidden" htmlFor={`ecap-${heading.replace(/\s/g, '')}`}>
            Email address
          </label>
          <input
            id={`ecap-${heading.replace(/\s/g, '')}`}
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="ecap__btn">
            {cta} <span aria-hidden="true">&rarr;</span>
          </button>
        </form>
      )}
      {!compact && <p className="ecap__note">No spam. Just real updates from Kaleb.</p>}
    </section>
  );
}
