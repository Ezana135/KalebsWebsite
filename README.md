# ASPECTS — Kaleb Kavuma

An interactive album-world website built around the ASPECTS project:
one self, refracted through a prism into four chapters — **Ego** (gold),
**Love** (blue), **Reason** (red), and **Art** (violet).

The working site lives in `[aspects-site/](aspects-site/)`. The approved
design references live in `[Drafts/](Drafts/)`.

## Run locally

```bash
cd aspects-site
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173).

Production build:

```bash
npm run build && npm run preview
```

## Pages


| Route              | Page                                                             |
| ------------------ | ---------------------------------------------------------------- |
| `/`                | Landing (ASPECTS title, prism "A", portrait, refraction section) |
| `/prism`           | Prism / refraction page                                          |
| `/chapters/ego`    | Chapter 01 — Ego (gold)                                          |
| `/chapters/love`   | Chapter 02 — Love (blue)                                         |
| `/chapters/reason` | Chapter 03 — Reason (red)                                        |
| `/chapters/art`    | Chapter 04 — Art (violet, coming-soon state)                     |
| `/about`           | About / artist page                                              |
| `/manifesto`       | Manifesto reading room                                           |
| `/music`           | Music / listen page with mock player                             |
| `/journal`         | Journal / essays hub                                             |
| `/film`            | Film — Patience Please documentary                               |
| `/contact`         | Contact / enquiry form                                           |


## Swapping in real assets

All imagery is currently art-directed CSS/SVG placeholders. See
`[aspects-site/public/media/README.md](aspects-site/public/media/README.md)`
for exact file names, crops, and the components that consume them.