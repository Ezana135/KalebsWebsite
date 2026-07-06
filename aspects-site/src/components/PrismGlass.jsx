import './prism-glass.css';

const PRISM_SRC = '/media/aspects-prism-logo-tight.png';

/**
 * Image-backed ASPECTS prism.
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
      <img className="prism-glass__img" src={PRISM_SRC} alt="" draggable="false" />

      {withSpectrum && (
        <div className="prism-glass__beams" role="img" aria-label="White light refracting into four coloured beams">
          <span className="beam beam--white" />
          <span className="beam beam--gold" />
          <span className="beam beam--red" />
          <span className="beam beam--blue" />
          <span className="beam beam--purple" />
        </div>
      )}

      {variant === 'flare' && <span className="prism-glass__flare" />}
    </div>
  );
}
