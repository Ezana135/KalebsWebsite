const PRISM_SRC = '/media/aspects-prism-logo.png';

export default function PrismMark({ size = 22, className = '' }) {
  return (
    <span
      className={`prism-mark ${className}`}
      style={{ '--mark-size': `${size}px` }}
      aria-hidden="true"
    >
      <img src={PRISM_SRC} alt="" draggable="false" />
    </span>
  );
}
