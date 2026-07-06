/** Single source of truth for journey zone colors and atmosphere. */
export const JOURNEY_ZONES = [
  {
    id: 'opening',
    color: [255, 255, 255],
    darkness: 0,
    emitAngle: 0,
    selectors: ['#hero', '#prism'],
  },
  {
    id: 'music',
    color: [245, 220, 160],
    darkness: 0,
    emitAngle: 0,
    selectors: ['#music'],
  },
  {
    id: 'ego',
    color: [218, 166, 62],
    darkness: 0,
    emitAngle: 0,
    selectors: ['.projector-break--ego', '#ego'],
  },
  {
    id: 'love',
    color: [80, 140, 255],
    darkness: 0,
    emitAngle: 0,
    selectors: ['.projector-break--love', '#love'],
  },
  {
    id: 'reason',
    color: [210, 50, 48],
    darkness: 0.95,
    emitAngle: 13,
    selectors: ['.projector-break--reason', '#reason'],
  },
  {
    id: 'art',
    color: [150, 80, 230],
    darkness: 0.92,
    emitAngle: 0,
    selectors: ['.projector-break--art', '#art'],
  },
  {
    id: 'film',
    color: [190, 190, 190],
    darkness: 0.95,
    emitAngle: 0,
    selectors: ['.projector-break--film', '#film'],
  },
];

export const ZONE_LABELS = {
  ego: '01 / EGO',
  love: '02 / LOVE',
  reason: '03 / REASON',
  art: '04 / ART',
  film: '09 / FILM',
};

const clamp01 = (value) => Math.min(1, Math.max(0, value));
const lerp = (a, b, t) => a + (b - a) * t;

export function mixRGB(a, b, t) {
  return a.map((channel, index) => Math.round(lerp(channel, b[index], t))).join(' ');
}

export function measureZoneRanges(root) {
  return JOURNEY_ZONES.map((zone) => {
    const elements = zone.selectors.map((selector) => root.querySelector(selector)).filter(Boolean);
    if (!elements.length) return { ...zone, start: 0, end: 0 };

    const start = elements[0].offsetTop;
    const last = elements[elements.length - 1];
    const end = last.offsetTop + last.offsetHeight;
    return { ...zone, start, end };
  }).filter((zone) => zone.end > zone.start);
}

export function resolveZoneState(ranges, scrollCenter) {
  let index = ranges.findIndex((zone) => scrollCenter >= zone.start && scrollCenter < zone.end);
  if (index === -1) {
    index = scrollCenter < ranges[0]?.start ? 0 : ranges.length - 1;
  }

  const zone = ranges[index];
  const span = Math.max(zone.end - zone.start, 1);
  const zoneProgress = clamp01((scrollCenter - zone.start) / span);
  const prev = index > 0 ? ranges[index - 1] : null;
  const next = index < ranges.length - 1 ? ranges[index + 1] : null;

  const edge = 0.18;
  let color = zone.color;
  let darkness = zone.darkness;
  let emitAngle = zone.emitAngle;

  if (zoneProgress < edge && prev) {
    const t = zoneProgress / edge;
    color = mixRGB(prev.color, zone.color, t).split(' ').map(Number);
    darkness = lerp(prev.darkness, zone.darkness, t);
    emitAngle = lerp(prev.emitAngle, zone.emitAngle, t);
  } else if (zoneProgress > 1 - edge && next) {
    const t = (zoneProgress - (1 - edge)) / edge;
    color = mixRGB(zone.color, next.color, t).split(' ').map(Number);
    darkness = lerp(zone.darkness, next.darkness, t);
    emitAngle = lerp(zone.emitAngle, next.emitAngle, t);
  }

  return {
    zone,
    zoneProgress,
    prev,
    next,
    color,
    darkness,
    emitAngle,
  };
}

export function computeLayerOpacities(zoneState, prismProgress) {
  const { zone, zoneProgress, color, darkness, emitAngle } = zoneState;
  let spectrumOpacity = 0;
  let projectorOpacity = 0;
  let incomingOpacity = 0;
  let flareOpacity = 0;
  let zoneColor = color;

  if (zone.id === 'opening') {
    incomingOpacity = clamp01((prismProgress - 0.14) * 4.5);
    spectrumOpacity = clamp01((prismProgress - 0.34) * 4) * 0.92;
    flareOpacity = prismProgress * 0.85;
  } else if (zone.id === 'music') {
    if (zoneProgress <= 0.15) {
      const t = zoneProgress / 0.15;
      spectrumOpacity = lerp(0.92, 0.42, t);
    } else if (zoneProgress <= 0.6) {
      spectrumOpacity = 0.42;
    } else {
      const t = (zoneProgress - 0.6) / 0.4;
      spectrumOpacity = lerp(0.42, 0, t);
      projectorOpacity = lerp(0.05, 0.5, t);
      const ego = JOURNEY_ZONES.find((entry) => entry.id === 'ego');
      if (ego) zoneColor = mixRGB(zone.color, ego.color, t).split(' ').map(Number);
    }
    flareOpacity = 0.2;
  } else {
    spectrumOpacity = 0;
    projectorOpacity = 0.82;
    incomingOpacity = 0.85;
    flareOpacity = 0;
  }

  return {
    spectrumOpacity,
    projectorOpacity,
    incomingOpacity,
    flareOpacity,
    zoneColor,
    bgDarkness: darkness,
    emitAngle,
  };
}
