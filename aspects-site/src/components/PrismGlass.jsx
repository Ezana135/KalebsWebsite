import './prism-glass.css';

const PRISM_SRC = '/media/aspects-prism-logo-tight.png';

/**
 * Image-backed ASPECTS prism. The supplied logo render is the source of truth;
 * variants only add projector light, flares, or refraction beams.
 */
export default function PrismGlass({ variant = 'plain', tint, className = '' }) {
  return (
    <div className={`prism-glass prism-glass--${variant} ${className}`} aria-hidden="true">
      {variant === 'emit' && (
        <span className="prism-glass__emit" style={{ '--emit': tint || 'rgba(255,255,255,0.5)' }} />
      )}

      <span className="prism-glass__halo" />
      <img className="prism-glass__img" src={PRISM_SRC} alt="" draggable="false" />

      {variant === 'beams' && (
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
