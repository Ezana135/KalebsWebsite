import './portrait-figure.css';

/**
 * Black-and-white portrait placeholder: a clean head-and-shoulders
 * silhouette on a soft studio backdrop, echoing the press portrait in the
 * approved designs.
 *
 * Replace-note: drop the real B&W portrait at
 * /public/media/portrait-hero.jpg (landing) or portrait-about.jpg (about)
 * and swap this component for an <img>.
 */
export default function PortraitFigure({ className = '', label = 'Portrait of Kaleb Kavuma' }) {
  return (
    <div className={`portrait-fig ${className}`} role="img" aria-label={`${label} (placeholder)`}>
      <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <defs>
          <linearGradient id="pfBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e6e3dd" />
            <stop offset="70%" stopColor="#d2cfc8" />
            <stop offset="100%" stopColor="#bab7b0" />
          </linearGradient>
          <linearGradient id="pfBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#26262a" />
            <stop offset="60%" stopColor="#141416" />
            <stop offset="100%" stopColor="#0c0c0e" />
          </linearGradient>
          <radialGradient id="pfRim" cx="0.32" cy="0.18" r="0.5">
            <stop offset="0%" stopColor="#f0eeea" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f0eeea" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="300" height="400" fill="url(#pfBg)" />

        {/* head + neck + shoulders as one silhouette */}
        <path
          d="M150 52
             c 26 0 44 20 44 48
             c 0 18 -7 34 -18 43
             c -2 8 -1 14 2 19
             c 34 10 62 30 74 58
             c 10 24 14 60 14 180
             L 34 400
             c 0 -120 4 -156 14 -180
             c 12 -28 40 -48 74 -58
             c 3 -5 4 -11 2 -19
             c -11 -9 -18 -25 -18 -43
             c 0 -28 18 -48 44 -48 Z"
          fill="url(#pfBody)"
        />

        {/* soft key-light on the face side */}
        <ellipse cx="120" cy="86" rx="34" ry="42" fill="url(#pfRim)" />
      </svg>
      <span className="portrait-fig__grain" aria-hidden="true" />
    </div>
  );
}
