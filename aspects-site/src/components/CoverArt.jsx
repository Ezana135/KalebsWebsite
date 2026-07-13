import PrismMark from './PrismMark';
import './cover-art.css';

/**
 * Chapter cover-art placeholder (square). Mirrors the EGO cover in the
 * music-page draft: artist name small, huge chapter word, prism silhouette,
 * subtitle strip.
 *
 * Replace-note: swap with real cover art at
 * /public/media/covers/<chapter>-cover.jpg (1:1, min 1200px) — render an
 * <img> instead of this component when files exist.
 */
const SUBTITLES = {
  ego: 'IMAGE. AMBITION. SELF-MYTHOLOGY.',
  love: 'LONGING. MEMORY. TENDERNESS.',
  reason: 'CONVICTION. CULTURE. ARGUMENT.',
  art: 'EXPRESSION. EXPERIMENT. BECOMING.',
};

export default function CoverArt({ chapter = 'ego', title, size = 'md' }) {
  return (
    <div className={`cover cover--${chapter} cover--${size}`} role="img" aria-label={`${title} cover art placeholder`}>
      <span className="cover__artist">KALEB KAVUMA</span>
      <span className="cover__title">{title}</span>
      <span className="cover__prism">
        <PrismMark size={size === 'lg' ? 44 : 28} tint="rgba(255,255,255,0.75)" />
      </span>
      <span className="cover__subtitle">{SUBTITLES[chapter]}</span>
    </div>
  );
}
