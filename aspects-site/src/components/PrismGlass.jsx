import { useId } from 'react';
import './prism-glass.css';

/**
 * The ASPECTS prism — a vector replica of the approved prism photograph
 * (Drafts/image.png): a glossy 3D glass tetrahedron with near-black edges
 * shaping the letter "A", a white light entry on the left, and rainbow
 * caustics pooling at the base.
 *
 * This is the single source of truth for the prism visual across the site
 * (hero "A", refraction stage, chapter sides, about, contact).
 *
 * Replace-note: to swap in the real photographed render later, drop it at
 * /public/media/prism-hero.png with transparent background and replace the
 * <svg> body with an <img> — keep the ~6:7 aspect.
 *
 * variant:
 *  'plain'  — just the glass form
 *  'flare'  — + small rainbow ground flare (landing A, contact)
 *  'beams'  — + white light in / four spectrum beams out (refraction stage)
 *  'emit'   — + incoming light from left, chapter tint flooding out
 *
 * emitAngle:
 *  'right'  — beam floods horizontally right (ego, love, art)
 *  'down'   — beam angles down-right across the page (reason draft)
 *
 * animated — beams draw in with a subtle shimmer (static pages like /prism)
 */
export default function PrismGlass({
  variant = 'plain',
  tint,
  emitAngle = 'right',
  animated = false,
  className = '',
}) {
  const id = useId().replace(/:/g, '');

  return (
    <div
      className={[
        'prism-glass',
        `prism-glass--${variant}`,
        emitAngle === 'down' ? 'prism-glass--emit-down' : '',
        animated ? 'prism-glass--animated' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {variant === 'emit' && (
        <>
          <span className="prism-glass__incoming" />
          <span
            className="prism-glass__emit"
            style={{ '--emit': tint || 'rgba(255,255,255,0.5)' }}
          />
        </>
      )}

      <svg viewBox="0 0 360 420" className="prism-glass__svg">
        <defs>
          <linearGradient id={`${id}-left`} x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="45%" stopColor="#eef0f2" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#c9cfd6" stopOpacity="0.36" />
          </linearGradient>
          <linearGradient id={`${id}-right`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#dfe4e8" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#aeb6bf" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7e8891" stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f4f6f8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#26262a" />
            <stop offset="100%" stopColor="#0d0d10" />
          </linearGradient>
          <radialGradient id={`${id}-caustic`} cx="0.42" cy="0.55" r="0.6">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#ffe27a" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#7ac2ff" stopOpacity="0.4" />
            <stop offset="80%" stopColor="#d67aff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <ellipse cx="182" cy="392" rx="150" ry="16" fill="#0b0b0c" opacity="0.10" />

        <path d="M180 16 L308 384 L180 384 Z" fill={`url(#${id}-right)`} />
        <path d="M180 16 L180 384 L52 384 Z" fill={`url(#${id}-left)`} />
        <path d="M92 384 L268 384 L180 306 Z" fill={`url(#${id}-base)`} />

        <ellipse cx="168" cy="368" rx="72" ry="26" fill={`url(#${id}-caustic)`} opacity="0.85" />

        <path d="M180 16 L180 306" stroke="#3a3d44" strokeWidth="1.4" opacity="0.5" />
        <path d="M92 384 L180 306 L268 384" fill="none" stroke="#2b2d33" strokeWidth="2" opacity="0.55" />

        <path
          d="M180 16 L308 384 L52 384 Z"
          fill="none"
          stroke={`url(#${id}-edge)`}
          strokeWidth="5"
          strokeLinejoin="round"
        />
        <path d="M180 22 L60 380" stroke="#ffffff" strokeWidth="2.4" opacity="0.85" />
        <path d="M180 22 L60 380" stroke="#ffffff" strokeWidth="7" opacity="0.18" />
        <circle cx="180" cy="18" r="5" fill="#fff" opacity="0.9" />
      </svg>

      {variant === 'beams' && (
        <div className="prism-glass__beams" role="img" aria-label="White light refracting into four coloured beams">
          <span className="beam beam--white" />
          {/* Spectrum order per Drafts/image.png: yellow, red, blue, green */}
          <span className="beam beam--yellow" />
          <span className="beam beam--red" />
          <span className="beam beam--blue" />
          <span className="beam beam--green" />
        </div>
      )}

      {variant === 'flare' && <span className="prism-glass__flare" />}
    </div>
  );
}
