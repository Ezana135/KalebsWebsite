import './prism-glass.css';

/**
 * Large decorative glass prism used on the landing hero, the prism/refraction
 * page, and as a side accent on chapter pages.
 *
 * Replace-note: this is a CSS/SVG placeholder standing in for a photographed
 * or 3D-rendered glass prism. Swap in a real render at
 * /public/media/prism-hero.png (keep ~1:1.2 aspect) and drop this component's
 * <svg> body for an <img> if/when that asset exists.
 *
 * variant: 'beams' shows the four chapter beams exiting the prism (prism page).
 *          'flare' shows the small ground-level rainbow flare (landing page).
 *          'plain' is just the glass form (chapter side accents).
 */
export default function PrismGlass({ variant = 'plain', className = '' }) {
  return (
    <div className={`prism-glass prism-glass--${variant} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 220 320" className="prism-glass__svg">
        <defs>
          <linearGradient id="glassBody" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="45%" stopColor="#dfe6ea" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#b9c3cc" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="glassEdge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#8b96a1" />
          </linearGradient>
        </defs>
        <polygon
          points="110,10 205,300 15,300"
          fill="url(#glassBody)"
          stroke="url(#glassEdge)"
          strokeWidth="2"
        />
        <polygon points="110,10 205,300 110,300" fill="#ffffff" opacity="0.08" />
        <line x1="110" y1="10" x2="110" y2="300" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
        <line x1="110" y1="10" x2="15" y2="300" stroke="#ffffff" strokeWidth="1" opacity="0.25" />
      </svg>

      {variant === 'beams' && (
        <div className="prism-glass__beams" role="img" aria-label="White light refracting into four coloured beams">
          <span className="beam beam--white" />
          <span className="beam beam--gold" />
          <span className="beam beam--blue" />
          <span className="beam beam--red" />
          <span className="beam beam--purple" />
        </div>
      )}

      {variant === 'flare' && <span className="prism-glass__flare" />}
    </div>
  );
}
