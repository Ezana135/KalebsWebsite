import { useId } from 'react';
import './prism-glass.css';

/**
 * The ASPECTS prism — a vector replica of the approved prism photograph
 * (Drafts/image.png): a glossy 3D glass tetrahedron with near-black edges
 * shaping the letter "A", a white light entry on the left, and rainbow
 * caustics pooling at the base.
 */
export default function PrismGlass({ variant = 'plain', tint, className = '' }) {
  const id = useId().replace(/:/g, '');

  return (
    <div className={`prism-glass prism-glass--${variant} ${className}`} aria-hidden="true">
      {variant === 'emit' && (
        <span className="prism-glass__emit" style={{ '--emit': tint || 'rgba(255,255,255,0.5)' }} />
      )}

      {/* Exhibition floor — grounds the sculpture in space */}
      {(variant === 'beams' || variant === 'flare') && (
        <span className="prism-glass__floor" aria-hidden="true" />
      )}

      <svg viewBox="0 0 360 420" className="prism-glass__svg">
        <defs>
          <linearGradient id={`${id}-left`} x1="0" y1="0" x2="1" y2="0.35">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.96" />
            <stop offset="35%" stopColor="#f4f6f8" stopOpacity="0.72" />
            <stop offset="70%" stopColor="#e8ecf0" stopOpacity="0.48" />
            <stop offset="100%" stopColor="#c9cfd6" stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id={`${id}-right`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eef1f4" stopOpacity="0.58" />
            <stop offset="40%" stopColor="#c8ced6" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#6e7882" stopOpacity="0.48" />
          </linearGradient>
          <linearGradient id={`${id}-base`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.72" />
          </linearGradient>
          <linearGradient id={`${id}-edge`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a3a40" />
            <stop offset="50%" stopColor="#1a1a1e" />
            <stop offset="100%" stopColor="#0a0a0c" />
          </linearGradient>
          <radialGradient id={`${id}-caustic`} cx="0.42" cy="0.55" r="0.65">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
            <stop offset="22%" stopColor="#ffe27a" stopOpacity="0.62" />
            <stop offset="42%" stopColor="#ff6b6b" stopOpacity="0.38" />
            <stop offset="58%" stopColor="#7ac2ff" stopOpacity="0.42" />
            <stop offset="78%" stopColor="#d67aff" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}-spec`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id={`${id}-glow`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ground shadow — soft, diffused */}
        <ellipse cx="182" cy="394" rx="158" ry="18" fill="#0b0b0c" opacity="0.08" />
        <ellipse cx="182" cy="392" rx="120" ry="10" fill="#0b0b0c" opacity="0.06" />

        {/* right facet (darker glass) */}
        <path d="M180 16 L308 384 L180 384 Z" fill={`url(#${id}-right)`} />
        {/* left facet (bright glass) */}
        <path d="M180 16 L180 384 L52 384 Z" fill={`url(#${id}-left)`} />
        {/* visible base face */}
        <path d="M92 384 L268 384 L180 306 Z" fill={`url(#${id}-base)`} />

        {/* internal refraction streaks */}
        <path d="M180 16 L180 306" stroke="#4a4e56" strokeWidth="0.8" opacity="0.35" />
        <path d="M120 280 L180 306 L240 280" fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.18" />

        {/* caustic rainbow pooling inside the base */}
        <ellipse cx="168" cy="368" rx="78" ry="28" fill={`url(#${id}-caustic)`} opacity="0.88" filter={`url(#${id}-glow)`} />

        {/* base-face inner edges */}
        <path d="M92 384 L180 306 L268 384" fill="none" stroke="#2b2d33" strokeWidth="1.8" opacity="0.5" />

        {/* outer black edges shaping the A */}
        <path
          d="M180 16 L308 384 L52 384 Z"
          fill="none"
          stroke={`url(#${id}-edge)`}
          strokeWidth="5.2"
          strokeLinejoin="round"
        />

        {/* chromatic edge glints — expensive glass */}
        <path d="M180 22 L58 382" stroke="#ff6b8a" strokeWidth="0.6" opacity="0.22" />
        <path d="M182 24 L62 380" stroke="#7ac2ff" strokeWidth="0.5" opacity="0.18" />

        {/* bright specular streak along the left edge */}
        <path d="M180 22 L60 380" stroke="#ffffff" strokeWidth="2.6" opacity="0.88" />
        <path d="M180 22 L60 380" stroke="#ffffff" strokeWidth="8" opacity="0.14" />
        <path d="M180 22 L60 380" stroke={`url(#${id}-spec)`} strokeWidth="1.2" opacity="0.6" />

        {/* right facet catch-light */}
        <path d="M180 28 L300 372" stroke="#ffffff" strokeWidth="1" opacity="0.22" />

        {/* apex sparkle */}
        <circle cx="180" cy="18" r="5.5" fill="#fff" opacity="0.92" />
        <circle cx="180" cy="18" r="10" fill="#fff" opacity="0.12" />
      </svg>

      {variant === 'beams' && (
        <div className="prism-glass__beams" role="img" aria-label="White light refracting into four coloured beams">
          <span className="beam beam--white">
            <span className="beam__core" />
            <span className="beam__bloom" />
          </span>
          <span className="beam beam--gold">
            <span className="beam__core" />
            <span className="beam__spill" />
          </span>
          <span className="beam beam--red">
            <span className="beam__core" />
            <span className="beam__spill" />
          </span>
          <span className="beam beam--blue">
            <span className="beam__core" />
            <span className="beam__spill" />
          </span>
          <span className="beam beam--purple">
            <span className="beam__core" />
            <span className="beam__spill" />
          </span>
          <span className="prism-glass__caustics" aria-hidden="true" />
        </div>
      )}

      {variant === 'flare' && <span className="prism-glass__flare" />}
    </div>
  );
}
