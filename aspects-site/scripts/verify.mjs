// Dev-only verification: loads every route at desktop + mobile widths,
// captures screenshots, and reports console errors / overflow issues.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://localhost:5173';
const ROUTES = [
  '/',
  '/prism',
  '/chapters/ego',
  '/chapters/love',
  '/chapters/reason',
  '/chapters/art',
  '/about',
  '/manifesto',
  '/music',
  '/journal',
  '/film',
  '/contact',
];

mkdirSync('screenshots', { recursive: true });

const browser = await chromium.launch();
let failures = 0;

for (const viewport of [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
]) {
  const page = await browser.newPage({ viewport });
  const errors = [];
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  page.on('pageerror', (e) => errors.push(String(e)));

  for (const route of ROUTES) {
    errors.length = 0;
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );

    const name = route === '/' ? 'landing' : route.replace(/\//g, '-').replace(/^-/, '');
    await page.screenshot({
      path: `screenshots/${name}-${viewport.name}.png`,
      fullPage: true,
    });

    const problems = [];
    if (errors.length) problems.push(`console errors: ${errors.join(' | ')}`);
    if (overflow > 1) problems.push(`horizontal overflow: ${overflow}px`);
    if (problems.length) {
      failures++;
      console.log(`FAIL ${viewport.name} ${route} -> ${problems.join('; ')}`);
    } else {
      console.log(`ok   ${viewport.name} ${route}`);
    }
  }
  await page.close();
}

await browser.close();
process.exit(failures ? 1 : 0);
