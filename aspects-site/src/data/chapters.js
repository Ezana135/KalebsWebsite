// Central source of truth for the four ASPECTS chapters.
// Swap `cover`, `heroVideo`, etc. with real asset paths once available.
export const CHAPTERS = [
  {
    id: 'ego',
    number: '01',
    slug: 'ego',
    title: 'EGO',
    subhead: 'image, ambition, reflection.',
    theme: 'gold',
    blurb:
      "This is where I build the stage before I ever walk on it. Ego is image, drive, and the mask that becomes the man — the part of me that wants to be seen, and has to reckon with why.",
    essay: {
      title: 'The Architecture of Self',
      dek: 'On image, identity, and the quiet construction of a self that outlives applause.',
      slug: 'the-architecture-of-self',
    },
    listen: {
      chapterLabel: 'LISTEN TO CHAPTER',
      album: 'EGO',
      tracks: [
        { n: '01', title: 'Mirror Talk', time: '03:21' },
        { n: '02', title: 'Crown Weight', time: '03:48' },
        { n: '03', title: 'Self Made', time: '04:05' },
        { n: '04', title: 'Photograph', time: '03:12' },
        { n: '05', title: 'Bigger Room', time: '03:59' },
        { n: '06', title: 'Legacy Games', time: '04:22' },
      ],
    },
    heroCaption: 'WATCH CHAPTER INTRO',
    heroTime: '02:14',
    status: 'released',
  },
  {
    id: 'love',
    number: '02',
    slug: 'love',
    title: 'LOVE',
    subhead: 'longing, memory, tenderness.',
    theme: 'blue',
    blurb:
      'An exploration of the heart\u2019s quiet realities — distance, devotion, and the beauty of being seen and remembered.',
    essay: {
      title: 'On Loving From A Distance',
      dek: 'Love is not always proximity. Sometimes it is a postcard you never send, a song you play on repeat, a place that still knows your name.',
      slug: 'on-loving-from-a-distance',
    },
    listen: {
      chapterLabel: 'LISTEN',
      album: 'LOVE',
      tracks: [
        { n: '01', title: 'Evenings', time: '3:42' },
        { n: '02', title: 'Lily Pads', time: '3:21' },
        { n: '03', title: 'Blueview', time: '3:56' },
        { n: '04', title: 'Almost Home', time: '4:01' },
        { n: '05', title: 'Remember Me', time: '3:47' },
      ],
    },
    heroCaption: 'WATCH FILM STILL',
    heroTime: '18:47',
    status: 'released',
  },
  {
    id: 'reason',
    number: '03',
    slug: 'reason',
    title: 'REASON',
    subhead: 'conviction, culture, argument.',
    theme: 'red',
    blurb:
      'Reason is conviction set to rhythm — culture, resistance, and the arguments worth making out loud. History pressed into the present tense.',
    essay: {
      title: 'The Case for Conscious Art',
      dek: 'On responsibility, memory, and the rhythms that refuse to be forgotten.',
      slug: 'the-case-for-conscious-art',
    },
    listen: {
      chapterLabel: 'LISTEN',
      album: 'REASON',
      tracks: [
        { n: '01', title: 'Wake the Sun', time: '03:41' },
        { n: '02', title: 'Roar in the Night', time: '04:22' },
        { n: '03', title: 'Footsteps Forward', time: '03:33' },
        { n: '04', title: 'Question the Silence', time: '04:05' },
        { n: '05', title: 'Inherited Fire', time: '04:47' },
      ],
    },
    heroCaption: 'ROOTS OF RESISTANCE \u2014 DOCUMENTARY SHORT',
    heroTime: '12:48',
    status: 'released',
  },
  {
    id: 'art',
    number: '04',
    slug: 'art',
    title: 'ART',
    subhead: 'expression, experiment, becoming.',
    theme: 'purple',
    blurb:
      'This is where I explore freely. Paint, movement, collage, sound, and story \u2014 each piece a trace of what I\u2019m learning to say without words.',
    essay: {
      title: 'On Making Without A Map',
      dek: 'Thoughts on process, surrender, and the beauty of not knowing.',
      slug: 'on-making-without-a-map',
    },
    listen: {
      chapterLabel: 'LISTEN',
      album: 'ART: FIELD NOTES',
      albumDek: 'A sonic journal of the process.',
      tracks: [
        { n: '01', title: 'First Gesture', time: '02:12' },
        { n: '02', title: 'Unlearn', time: '03:41' },
        { n: '03', title: 'In Between', time: '03:18' },
        { n: '04', title: 'Becoming', time: '03:57' },
      ],
    },
    heroCaption: 'WATCH PROCESS FILM',
    heroTime: '05:36',
    status: 'coming-soon',
  },
];

export const getChapter = (slug) => CHAPTERS.find((c) => c.slug === slug);
export const nextChapter = (slug) => {
  const i = CHAPTERS.findIndex((c) => c.slug === slug);
  return CHAPTERS[(i + 1) % CHAPTERS.length];
};
