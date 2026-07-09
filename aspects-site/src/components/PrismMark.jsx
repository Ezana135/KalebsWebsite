import PrismGlass from './PrismGlass';

export default function PrismMark({ size = 22, className = '' }) {
  return (
    <span
      className={`prism-mark ${className}`}
      style={{ '--mark-size': `${size}px` }}
      aria-hidden="true"
    >
      <PrismGlass variant="plain" />
    </span>
  );
}
