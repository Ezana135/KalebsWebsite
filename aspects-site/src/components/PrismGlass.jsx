import './prism-glass.css';

const PRISM_SRC = '/media/aspects-prism-logo.png';

/**
 * Image-backed ASPECTS prism. The supplied logo render is the source of truth;
 * variants only add projector light, flares, or refraction beams around it.
 *
 * variant:
 *  'plain'   — just the glass render
 *  'flare'   — + small rainbow ground flare (contact, music library)
 *  'beams'   — + white light in from the left / four spectrum beams out
 *  'emit'    — + incoming white light and a chapter-tinted beam flooding out
 *  'journey' — every light layer stacked; the homepage journey CSS decides
 *              which layer is visible for the current scroll phase
 *
 * emitAngle:
 *  'right'   — emit beam floods horizontally right (ego, love, art)
 *  'down'    — emit beam angles down-right across the page (Reason draft)
 */
export default function PrismGlass({ variant = 'plain', tint, emitAngle = 'right', className = '' }) {
  const withEmit = variant === 'emit' || variant === 'journey';
  const withBeams = variant === 'beams' || variant === 'journey';
  const withFlare = variant === 'flare' || variant === 'journey';

  return (
    <div
      className={[
        'prism-glass',
        `prism-glass--${variant}`,
        emitAngle === 'down' ? 'prism-glass--emit-down' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden="true"
    >
      {withEmit && (
        <>
          <span className="prism-glass__incoming" />
          <span className="prism-glass__emit" style={tint ? { '--emit': tint } : undefined} />
        </>
      )}

      <span className="prism-glass__halo" />
      <img className="prism-glass__img" src={PRISM_SRC} alt="" draggable="false" />

      {withBeams && (
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
