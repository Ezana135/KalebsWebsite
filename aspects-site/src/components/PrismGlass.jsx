import './prism-glass.css';

/**
 * CSS glass pyramid — no image asset.
 * variant:
 *   'plain'     — glass only
 *   'beams'     — opening spectrum (white in + four beams out)
 *   'projector' — full stack; parent CSS vars pick which layers show
 *   'emit'      — single tinted projector beam
 */
export default function PrismGlass({ variant = 'plain', tint, className = '' }) {
  const withSpectrum = variant === 'beams' || variant === 'projector';
  const withProjector = variant === 'emit' || variant === 'projector';

  return (
    <div className={`prism-glass prism-glass--${variant} ${className}`} aria-hidden="true">
      {withProjector && (
        <>
          <span className="prism-glass__incoming" />
          <span className="prism-glass__emit" style={tint ? { '--emit': tint } : undefined} />
        </>
      )}

      <span className="prism-glass__halo" />
      <span className="prism-glass__ground" />

      <div className="prism-glass__crystal">
        <div className="prism-glass__pyramid">
          <span className="prism-glass__face prism-glass__face--left" />
          <span className="prism-glass__face prism-glass__face--right" />
          <span className="prism-glass__face prism-glass__face--front" />
          <span className="prism-glass__ridge prism-glass__ridge--left" />
          <span className="prism-glass__ridge prism-glass__ridge--right" />
          <span className="prism-glass__ridge prism-glass__ridge--center" />
          <span className="prism-glass__caustic" />
          <span className="prism-glass__apex" />
        </div>
        <span className="prism-glass__specular" />
        <span className="prism-glass__sheen" />
      </div>

      {withSpectrum && (
        <div className="prism-glass__beams" role="img" aria-label="White light refracting into four coloured beams">
          <span className="beam beam--white" />
          {/* Spectrum order per Drafts/image.png: yellow, red, blue, green */}
          <span className="beam beam--yellow" />
          <span className="beam beam--red" />
          <span className="beam beam--blue" />
          <span className="beam beam--green" />
        </div>
      )}

      {withFlare && <span className="prism-glass__flare" />}
    </div>
  );
}
