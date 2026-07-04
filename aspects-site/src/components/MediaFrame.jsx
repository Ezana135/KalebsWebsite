import { useState } from 'react';
import './media-frame.css';

/**
 * Art-directed video/image placeholder frame.
 *
 * Replace-note: each frame maps to a final asset. Drop real files into
 * /public/media/videos/ using the `assetName` shown on hover in dev
 * (e.g. ego-chapter-intro.mp4) and replace the inner div with a <video>.
 *
 * scene: which atmospheric CSS scene to draw. One of:
 *  'ego-mirror' | 'love-lake' | 'reason-archive' | 'art-collage'
 *  'london-street' | 'portrait' | 'doc-trailer' | 'journal-feature'
 */
export default function MediaFrame({
  scene = 'portrait',
  caption,
  time,
  playable = true,
  assetName,
  ratio = '16/9',
  className = '',
  label,
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure
      className={`mframe mframe--${scene} ${className}`}
      style={{ aspectRatio: ratio }}
      data-asset={assetName}
    >
      <div className="mframe__scene" aria-hidden="true">
        <span className="mframe__layer l1" />
        <span className="mframe__layer l2" />
        <span className="mframe__layer l3" />
        <span className="mframe__grain" />
      </div>

      {playable && (
        <button
          className={`mframe__play ${playing ? 'is-playing' : ''}`}
          aria-label={playing ? `Pause ${label || caption || 'video'}` : `Play ${label || caption || 'video'}`}
          onClick={() => setPlaying((p) => !p)}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" />
              <rect x="14" y="5" width="4" height="14" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      )}

      {(caption || time) && (
        <figcaption className="mframe__meta">
          {caption && <span className="mframe__caption">{caption}</span>}
          {time && <span className="mframe__time">{time}</span>}
        </figcaption>
      )}

      {playing && (
        <div className="mframe__playing-note" role="status">
          Final film drops here &mdash; placeholder frame
        </div>
      )}
    </figure>
  );
}
