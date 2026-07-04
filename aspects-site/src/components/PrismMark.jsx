// Small glass-prism glyph used as the site's home/brand mark in the nav & footer.
// Replace-note: swap the <svg> below for /public/media/prism-mark.svg if a refined
// vector is produced later — keep the same viewBox (0 0 40 46) for drop-in parity.
export default function PrismMark({ size = 22, tint = 'currentColor', className = '' }) {
  return (
    <svg
      width={size}
      height={size * 1.15}
      viewBox="0 0 40 46"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M20 2 L37 40 L3 40 Z"
        stroke={tint}
        strokeWidth="1.6"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M20 2 L20 40" stroke={tint} strokeWidth="1" opacity="0.55" />
      <path d="M20 2 L3 40" stroke={tint} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}
