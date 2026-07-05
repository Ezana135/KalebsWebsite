# Media assets — swap-in guide

Every visual on the site is currently an art-directed CSS/SVG placeholder.
Drop the real files here using these exact names, then follow the
"Replace-note" comments in the matching components.

## Portraits
| File | Used on | Spec | Component |
| --- | --- | --- | --- |
| `portrait-hero.jpg` | Landing (right column) | B&W, 3:4, min 1200px wide | `src/pages/Landing.jsx` |
| `portrait-about.jpg` | About | B&W press portrait, 2:3 | `src/pages/About.jsx` |

## Prism
| File | Used on | Spec | Component |
| --- | --- | --- | --- |
| `prism-hero.png` | Landing "A", Prism page, chapter accents | transparent bg render, ~1:1.2 | `src/components/PrismGlass.jsx` |
| `prism-mark.svg` | Nav/footer glyph | vector, viewBox 0 0 40 46 | `src/components/PrismMark.jsx` |

## Videos (`/videos`)
| File | Used on |
| --- | --- |
| `landing-letters-loop.mp4` | Texture inside the ASPECTS letters (landing) |
| `ego-chapter-intro.mp4` | Ego chapter hero |
| `love-chapter-intro.mp4` | Love chapter hero |
| `reason-chapter-intro.mp4` | Reason chapter hero ("Roots of Resistance") |
| `art-chapter-intro.mp4` | Art chapter hero |
| `patience-please-trailer.mp4` | Film page main trailer |
| `film-ego-doc.mp4` … `film-art-doc.mp4` | Film page chapter cards |

## Covers (`/covers`)
`ego-cover.jpg`, `love-cover.jpg`, `reason-cover.jpg`, `art-cover.jpg`
— 1:1, min 1200px. Replace `src/components/CoverArt.jsx` renders.

## Journal (`/journal`)
`journal-featured.jpg` (16:8) plus one image per essay if desired.

## Film stills (`/film`)
Any stills for the documentary cards, 3:2.6 crop.

Keep the moody, cinematic, low-saturation art direction — no stock-photo
energy. Everything renders fine without these files; they are progressive
upgrades.
