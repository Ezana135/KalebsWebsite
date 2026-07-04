import { useId } from 'react';

/**
 * Site logo: miniature of the approved ASPECTS prism (Drafts/image.png) —
 * glossy glass tetrahedron, dark A-shaping edges, rainbow caustic at the base.
 * Edges follow `currentColor` so the mark reads on light and dark surfaces.
 *
 * Replace-note: if a dedicated logo file is produced later, drop it at
 * /public/media/prism-mark.svg and swap this component for an <img>.
 */
export default function PrismMark({ size = 22, tint, className = '' }) {
  const id = useId().replace(/:/g, '');
  const edge = tint || 'currentColor';

  return (
    <svg
      width={size}
      height={size * 1.16}
      viewBox="0 0 40 46"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}l`} x1="0" y1="0" x2="1" y2="0.4">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c9cfd6" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`${id}r`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#dfe4e8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8a929c" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff5c5c" stopOpacity="0.75" />
          <stop offset="30%" stopColor="#ffc83c" stopOpacity="0.75" />
          <stop offset="60%" stopColor="#3c82ff" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#be5aff" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* facets */}
      <path d="M20 3 L20 41 L4 41 Z" fill={`url(#${id}l)`} />
      <path d="M20 3 L36 41 L20 41 Z" fill={`url(#${id}r)`} />
      {/* base caustic */}
      <rect x="10" y="38.6" width="19" height="2.2" rx="1.1" fill={`url(#${id}c)`} />
      {/* internal edge */}
      <path d="M20 3 L20 40" stroke={edge} strokeWidth="0.7" opacity="0.45" />
      {/* black outer edges shaping the A */}
      <path
        d="M20 3 L36 41 L4 41 Z"
        fill="none"
        stroke={edge}
        strokeWidth="1.8"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* specular streak on the light-entry edge */}
      <path d="M19.4 4.5 L4.8 39.5" stroke="#ffffff" strokeWidth="0.9" opacity="0.8" />
    </svg>
  );
}
