// Local QA for the continuous-scroll homepage: scrolls through every phase,
// captures screenshots, checks section order, prism motion, projector breaks,
// the music-card projection overlay, and horizontal overflow.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:5173';
mkdirSync('screenshots/qa', { recursive: true });

const browser = await chromium.launch();
let failures = 0;
const check = (ok, label) => {
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}`);
  if (!ok) failures++;
};

// ---------- DESKTOP ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // 1. sections render in order
  const order = await page.$$eval('[data-journey-phase]', (els) =>
    els.map((el) => el.dataset.journeyPhase)
  );
  check(
    order.join(',') === 'hero,prism,music,ego,ego,love,love,reason,reason,art,art,film,film',
    `section order: ${order.join(',')}`
  );

  // 2. exactly one scene prism on the page (nav/cover PrismMark logos aside)
  const prismCount = await page.$$eval('.prism-glass', (i) => i.length);
  check(prismCount === 1, `exactly one scene prism (found ${prismCount})`);

  // 3. prism transition animates: capture prism rect at hero, mid-pin, end-pin
  const prismRect = () =>
    page.$eval('.journey-prism', (el) => {
      const r = el.getBoundingClientRect();
      return { x: Math.round(r.x + r.width / 2), y: Math.round(r.y + r.height / 2), w: Math.round(r.width) };
    });

  const atHero = await prismRect();
  await page.screenshot({ path: 'screenshots/qa/desktop-1-hero.png' });

  const pin = await page.$eval('#prism', (el) => ({
    top: el.offsetTop,
    span: el.offsetHeight - window.innerHeight,
  }));
  await page.evaluate(({ top, span }) => window.scrollTo({ top: top + span * 0.5, behavior: 'instant' }), pin);
  await page.waitForTimeout(400);
  const midPin = await prismRect();
  await page.screenshot({ path: 'screenshots/qa/desktop-2-prism-mid.png' });

  await page.evaluate(({ top, span }) => window.scrollTo({ top: top + span * 0.98, behavior: 'instant' }), pin);
  await page.waitForTimeout(400);
  const endPin = await prismRect();
  const beams = await page.$eval('.journey-prism', (el) => {
    const read = (sel) => {
      const b = el.querySelector(sel);
      const s = getComputedStyle(b);
      return parseFloat(s.opacity);
    };
    return {
      white: read('.beam--white'),
      yellow: read('.beam--yellow'),
      red: read('.beam--red'),
      blue: read('.beam--blue'),
      green: read('.beam--green'),
    };
  });
  await page.screenshot({ path: 'screenshots/qa/desktop-3-prism-end.png' });

  check(atHero.x !== midPin.x || atHero.y !== midPin.y, `prism moved hero->mid (${JSON.stringify(atHero)} -> ${JSON.stringify(midPin)})`);
  check(midPin.w > atHero.w, `prism grew during transition (${atHero.w} -> ${midPin.w})`);
  check(Math.abs(endPin.x - 720) < 30, `prism centred at end of pin (x=${endPin.x})`);
  check(beams.white > 0.9, `white beam visible at pin end (opacity ${beams.white})`);
  check(
    beams.yellow > 0.8 && beams.red > 0.8 && beams.blue > 0.8 && beams.green > 0.8,
    `spectrum beams visible (y=${beams.yellow} r=${beams.red} b=${beams.blue} g=${beams.green})`
  );

  // 4. docked at music, spectrum lingers
  await page.evaluate(() => document.getElementById('music').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(700);
  const atMusic = await prismRect();
  check(atMusic.x < 250, `prism docked left at music (x=${atMusic.x})`);
  await page.screenshot({ path: 'screenshots/qa/desktop-4-music.png' });

  // 5. projector break animates: curtain/label opacity change through the break
  const breakInfo = await page.evaluate(() => {
    const brk = document.querySelectorAll('.projector-break')[2]; // reason (dark)
    return { top: brk.offsetTop, span: brk.offsetHeight - window.innerHeight };
  });
  await page.evaluate(({ top }) => window.scrollTo({ top, behavior: 'instant' }), breakInfo);
  await page.waitForTimeout(300);
  const curtainStart = await page.$$eval('.projector-break--reason .projector-break__curtain', (els) =>
    parseFloat(getComputedStyle(els[0]).opacity)
  );
  await page.evaluate(({ top, span }) => window.scrollTo({ top: top + span * 0.9, behavior: 'instant' }), breakInfo);
  await page.waitForTimeout(1400);
  const curtainEnd = await page.$$eval('.projector-break--reason .projector-break__curtain', (els) =>
    parseFloat(getComputedStyle(els[0]).opacity)
  );
  const emitOpacity = await page.$eval('.journey-prism .prism-glass__emit', (el) =>
    parseFloat(getComputedStyle(el).opacity)
  );
  check(curtainEnd - curtainStart > 0.3, `projector curtain animates (${curtainStart} -> ${curtainEnd})`);
  check(emitOpacity > 0.4, `docked prism emits during reason break (opacity ${emitOpacity})`);
  await page.screenshot({ path: 'screenshots/qa/desktop-5-reason-break.png' });

  // reason chapter: emit rotated down-right
  await page.evaluate(() => document.getElementById('reason').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(900);
  const reasonEmit = await page.$eval('.journey-prism .prism-glass__emit', (el) => {
    const t = getComputedStyle(el).transform;
    return t;
  });
  check(reasonEmit !== 'none', `reason emit beam is rotated (transform=${reasonEmit})`);
  await page.screenshot({ path: 'screenshots/qa/desktop-6-reason-chapter.png' });

  // 6. music card click: overlay runs + scrolls to chapter
  await page.evaluate(() => document.getElementById('music').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(600);
  await page.click('.music-hub__card--love');
  await page.waitForTimeout(250);
  const overlayRunning = await page.$eval('.projection-overlay', (el) =>
    el.classList.contains('is-running')
  );
  const overlayLabel = await page.$eval('.projection-overlay__label', (el) => el.textContent);
  check(overlayRunning, 'projection overlay running after card click');
  check(overlayLabel === '02 / LOVE', `overlay label "${overlayLabel}"`);
  await page.screenshot({ path: 'screenshots/qa/desktop-7-overlay.png' });
  await page.waitForTimeout(1600);
  const loveVisible = await page.evaluate(() => {
    const r = document.getElementById('love').getBoundingClientRect();
    return r.top < window.innerHeight * 0.6 && r.bottom > 0;
  });
  check(loveVisible, 'scrolled to love chapter after card click');
  await page.screenshot({ path: 'screenshots/qa/desktop-8-love-chapter.png' });

  // Phase 1: spectrum beams off in chapter zones
  const readSpectrum = () =>
    page.$eval('.journey-prism', (el) => {
      const read = (sel) => {
        const node = el.querySelector(sel);
        return node ? parseFloat(getComputedStyle(node).opacity) : 0;
      };
      return {
        yellow: read('.beam--yellow'),
        red: read('.beam--red'),
        blue: read('.beam--blue'),
        green: read('.beam--green'),
      };
    });

  await page.evaluate(() => {
    const ego = document.getElementById('ego');
    const mid = ego.offsetTop + ego.offsetHeight * 0.5 - window.innerHeight * 0.5;
    window.scrollTo({ top: mid, behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  const egoSpectrum = await readSpectrum();
  check(
    egoSpectrum.yellow === 0 && egoSpectrum.red === 0 && egoSpectrum.blue === 0 && egoSpectrum.green === 0,
    `ego midpoint: spectrum off (y=${egoSpectrum.yellow} r=${egoSpectrum.red} b=${egoSpectrum.blue} g=${egoSpectrum.green})`
  );

  await page.evaluate(() => {
    const love = document.getElementById('love');
    const mid = love.offsetTop + love.offsetHeight * 0.5 - window.innerHeight * 0.5;
    window.scrollTo({ top: mid, behavior: 'instant' });
  });
  await page.waitForTimeout(500);
  const loveSpectrum = await readSpectrum();
  check(
    loveSpectrum.yellow === 0 && loveSpectrum.red === 0 && loveSpectrum.blue === 0 && loveSpectrum.green === 0,
    `love midpoint: spectrum off (y=${loveSpectrum.yellow} r=${loveSpectrum.red} b=${loveSpectrum.blue} g=${loveSpectrum.green})`
  );

  // film end
  await page.evaluate(() => document.getElementById('film').scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(800);
  await page.screenshot({ path: 'screenshots/qa/desktop-9-film.png' });

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth
  );
  check(overflow <= 1, `desktop horizontal overflow ${overflow}px`);
  check(errors.length === 0, `no console errors (${errors.join(' | ') || 'none'})`);
  await page.close();
}

// ---------- MOBILE ----------
{
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshots/qa/mobile-1-hero.png' });

  const stops = ['prism', 'music', 'ego', 'love', 'reason', 'art', 'film'];
  for (const id of stops) {
    await page.evaluate((sid) => document.getElementById(sid).scrollIntoView({ behavior: 'instant' }), id);
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    check(overflow <= 1, `mobile overflow at ${id}: ${overflow}px`);
    await page.screenshot({ path: `screenshots/qa/mobile-${id}.png` });
  }
  check(errors.length === 0, `mobile: no console errors (${errors.join(' | ') || 'none'})`);
  await page.close();
}

await browser.close();
console.log(failures ? `\n${failures} failure(s)` : '\nAll QA checks passed');
process.exit(failures ? 1 : 0);
