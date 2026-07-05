import { useState } from 'react';
import EmailCapture from '../components/EmailCapture';
import Reveal from '../components/Reveal';
import PrismGlass from '../components/PrismGlass';
import './contact.css';

const ENQUIRY_TYPES = ['Sync / Licensing', 'Press', 'Booking / Live', 'General'];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'Spotify', href: 'https://spotify.com' },
  { label: 'Bandcamp', href: 'https://bandcamp.com' },
  { label: 'Substack', href: 'https://substack.com' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    // Replace-note: point this at a real form backend (Formspree/own API)
    // and/or mailto fallback to hello@kalebkavuma.com when going live.
    setSent(true);
  };

  return (
    <div className="contact" data-theme="ego">
      <div className="container contact__grid">
        {/* LEFT: heading, email, socials */}
        <div className="contact__left">
          <Reveal>
            <h1 className="contact__title">Contact</h1>
            <p className="contact__strap">For sync, press, booking, or the work itself.</p>
          </Reveal>

          <Reveal delay={120}>
            <div className="contact__prism" aria-hidden="true">
              <PrismGlass variant="flare" />
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="contact__details">
              <p className="contact__details-label">For all enquiries</p>
              <a href="mailto:hello@kalebkavuma.com" className="contact__email">
                hello@kalebkavuma.com
              </a>
              <p className="contact__mgmt">
                <strong>Management &amp; Representation</strong>
                <br />
                All enquiries are handled by the team.
              </p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p className="contact__details-label">Connect</p>
            <ul className="contact__socials" aria-label="Social links">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* RIGHT: form */}
        <Reveal delay={120} className="contact__form-col">
          {sent ? (
            <div className="contact__sent" role="status">
              <p className="contact__sent-title">Received.</p>
              <p>
                Thank you for reaching out &mdash; the team aims to respond within
                2&ndash;3 business days.
              </p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={submit}>
              <div className="contact__row">
                <div className="contact__field">
                  <label htmlFor="c-name">Name</label>
                  <input
                    id="c-name"
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={update('name')}
                  />
                </div>
                <div className="contact__field">
                  <label htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={update('email')}
                  />
                </div>
              </div>

              <div className="contact__field">
                <label htmlFor="c-type">Enquiry type</label>
                <select id="c-type" required value={form.type} onChange={update('type')}>
                  <option value="" disabled>
                    Select an option
                  </option>
                  {ENQUIRY_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <div className="contact__field">
                <label htmlFor="c-message">Message</label>
                <textarea
                  id="c-message"
                  rows={7}
                  required
                  placeholder="Your message"
                  value={form.message}
                  onChange={update('message')}
                />
              </div>

              <button type="submit" className="contact__submit">
                Send enquiry <span aria-hidden="true">&rarr;</span>
              </button>
              <p className="contact__note">We aim to respond within 2&ndash;3 business days.</p>
            </form>
          )}
        </Reveal>
      </div>

      <div className="container">
        <EmailCapture
          heading="Join the list"
          body="Notes, drops, and chapters from the process."
          tone="dark"
        />
      </div>
    </div>
  );
}
