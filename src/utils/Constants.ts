export const categoryColors: Record<string, string> = {
  guitarra: "#21c45d",
  contrabaixo: "#5A3D31",
  piano: "#1A73E8",
  bateria: "#FFa100",
  teclado: "#D64E07",
  jazz: "#6A0DAD",
  violão: "#8B4513",
  vocal: "#FF1493",
  rock: "#721121",
  blues: "#0000CD",
};

export const BACKGROUND_IMAGE_PATHS = [
  "/images/background/image1.jpg",
  "/images/background/image2.jpg",
  "/images/background/image3.jpg",
  "/images/background/image5.jpg",
  "/images/background/image6.jpg",
  "/images/background/image7.jpg",
];

export const MAJOR_SCALES = [
  {
    key: "C",
    notes: ["C", "D", "E", "F", "G", "A", "B"],
    sharps: 0,
    flats: 0,
    accidentals: "Nenhum acidente",
  },
  {
    key: "G",
    notes: ["G", "A", "B", "C", "D", "E", "F#"],
    sharps: 1,
    flats: 0,
    accidentals: "F#",
  },
  {
    key: "D",
    notes: ["D", "E", "F#", "G", "A", "B", "C#"],
    sharps: 2,
    flats: 0,
    accidentals: "F#, C#",
  },
  {
    key: "A",
    notes: ["A", "B", "C#", "D", "E", "F#", "G#"],
    sharps: 3,
    flats: 0,
    accidentals: "F#, C#, G#",
  },
  {
    key: "E",
    notes: ["E", "F#", "G#", "A", "B", "C#", "D#"],
    sharps: 4,
    flats: 0,
    accidentals: "F#, C#, G#, D#",
  },
  {
    key: "B",
    notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    sharps: 5,
    flats: 0,
    accidentals: "F#, C#, G#, D#, A#",
  },
  {
    key: "F#",
    notes: ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    sharps: 6,
    flats: 0,
    accidentals: "F#, C#, G#, D#, A#, E#",
  },
  {
    key: "F",
    notes: ["F", "G", "A", "Bb", "C", "D", "E"],
    sharps: 0,
    flats: 1,
    accidentals: "Bb",
  },
  {
    key: "Bb",
    notes: ["Bb", "C", "D", "Eb", "F", "G", "A"],
    sharps: 0,
    flats: 2,
    accidentals: "Bb, Eb",
  },
  {
    key: "Eb",
    notes: ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    sharps: 0,
    flats: 3,
    accidentals: "Bb, Eb, Ab",
  },
  {
    key: "Ab",
    notes: ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
    sharps: 0,
    flats: 4,
    accidentals: "Bb, Eb, Ab, Db",
  },
  {
    key: "Db",
    notes: ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
    sharps: 0,
    flats: 5,
    accidentals: "Bb, Eb, Ab, Db, Gb",
  },
];

export const SCALE_PATTERN = [
  { interval: "T", description: "Tom" },
  { interval: "T", description: "Tom" },
  { interval: "S", description: "Semitom" },
  { interval: "T", description: "Tom" },
  { interval: "T", description: "Tom" },
  { interval: "T", description: "Tom" },
  { interval: "S", description: "Semitom" },
];

export const SCALE_TYPES = [
  {
    type: "natural",
    name: "Menor Natural",
    pattern: ["T", "S", "T", "T", "S", "T", "T"],
    description: "A forma mais básica da escala menor, sem alterações",
  },
  {
    type: "harmonic",
    name: "Menor Harmônica",
    pattern: ["T", "S", "T", "T", "S", "T+S", "S"],
    description: "7º grau elevado em meio tom, criando um intervalo de 1,5 tom",
  },
  {
    type: "melodic",
    name: "Menor Melódica",
    pattern: ["T", "S", "T", "T", "T", "T", "S"],
    description: "6º e 7º graus elevados na subida, natural na descida",
  },
];

export const MINOR_SCALES = [
  {
    key: "A",
    natural: ["A", "B", "C", "D", "E", "F", "G"],
    harmonic: ["A", "B", "C", "D", "E", "F", "G#"],
    melodic: ["A", "B", "C", "D", "E", "F#", "G#"],
  },
  {
    key: "E",
    natural: ["E", "F#", "G", "A", "B", "C", "D"],
    harmonic: ["E", "F#", "G", "A", "B", "C", "D#"],
    melodic: ["E", "F#", "G", "A", "B", "C#", "D#"],
  },
  {
    key: "B",
    natural: ["B", "C#", "D", "E", "F#", "G", "A"],
    harmonic: ["B", "C#", "D", "E", "F#", "G", "A#"],
    melodic: ["B", "C#", "D", "E", "F#", "G#", "A#"],
  },
  {
    key: "F#",
    natural: ["F#", "G#", "A", "B", "C#", "D", "E"],
    harmonic: ["F#", "G#", "A", "B", "C#", "D", "E#"],
    melodic: ["F#", "G#", "A", "B", "C#", "D#", "E#"],
  },
  {
    key: "D",
    natural: ["D", "E", "F", "G", "A", "Bb", "C"],
    harmonic: ["D", "E", "F", "G", "A", "Bb", "C#"],
    melodic: ["D", "E", "F", "G", "A", "B", "C#"],
  },
  {
    key: "G",
    natural: ["G", "A", "Bb", "C", "D", "Eb", "F"],
    harmonic: ["G", "A", "Bb", "C", "D", "Eb", "F#"],
    melodic: ["G", "A", "Bb", "C", "D", "E", "F#"],
  },
  {
    key: "C",
    natural: ["C", "D", "Eb", "F", "G", "Ab", "Bb"],
    harmonic: ["C", "D", "Eb", "F", "G", "Ab", "B"],
    melodic: ["C", "D", "Eb", "F", "G", "A", "B"],
  },
  {
    key: "F",
    natural: ["F", "G", "Ab", "Bb", "C", "Db", "Eb"],
    harmonic: ["F", "G", "Ab", "Bb", "C", "Db", "E"],
    melodic: ["F", "G", "Ab", "Bb", "C", "D", "E"],
  },
];

export const CHORDS_TYPES = {
  triads: [
    {
      name: "Maior",
      symbol: "",
      formula: "1-3-5",
      example: "C",
      notes: ["C", "E", "G"],
    },
    {
      name: "Menor",
      symbol: "m",
      formula: "1-♭3-5",
      example: "Cm",
      notes: ["C", "E♭", "G"],
    },
    {
      name: "Diminuto",
      symbol: "°",
      formula: "1-♭3-♭5",
      example: "C°",
      notes: ["C", "E♭", "G♭"],
    },
    {
      name: "Aumentado",
      symbol: "+",
      formula: "1-3-#5",
      example: "C+",
      notes: ["C", "E", "G#"],
    },
  ],
  sevenths: [
    {
      name: "Maior com 7ª",
      symbol: "M7",
      formula: "1-3-5-7",
      example: "CM7",
      notes: ["C", "E", "G", "B"],
    },
    {
      name: "Dominante",
      symbol: "7",
      formula: "1-3-5-♭7",
      example: "C7",
      notes: ["C", "E", "G", "B♭"],
    },
    {
      name: "Menor com 7ª",
      symbol: "m7",
      formula: "1-♭3-5-♭7",
      example: "Cm7",
      notes: ["C", "E♭", "G", "B♭"],
    },
    {
      name: "Meio-diminuto",
      symbol: "m7♭5",
      formula: "1-♭3-♭5-♭7",
      example: "Cm7♭5",
      notes: ["C", "E♭", "G♭", "B♭"],
    },
    {
      name: "Diminuto com 7ª",
      symbol: "°7",
      formula: "1-♭3-♭5-♭♭7",
      example: "C°7",
      notes: ["C", "E♭", "G♭", "A"],
    },
  ],
  extensions: [
    {
      name: "Nona",
      symbol: "9",
      formula: "1-3-5-♭7-9",
      example: "C9",
      notes: ["C", "E", "G", "B♭", "D"],
    },
    {
      name: "Décima primeira",
      symbol: "11",
      formula: "1-3-5-♭7-9-11",
      example: "C11",
      notes: ["C", "E", "G", "B♭", "D", "F"],
    },
    {
      name: "Décima terceira",
      symbol: "13",
      formula: "1-3-5-♭7-9-11-13",
      example: "C13",
      notes: ["C", "E", "G", "B♭", "D", "F", "A"],
    },
    {
      name: "Suspenso 2",
      symbol: "sus2",
      formula: "1-2-5",
      example: "Csus2",
      notes: ["C", "D", "G"],
    },
    {
      name: "Suspenso 4",
      symbol: "sus4",
      formula: "1-4-5",
      example: "Csus4",
      notes: ["C", "F", "G"],
    },
  ],
};

export const CHORDS_PROGRESSION = [
  {
    name: "I-V-vi-IV",
    chords: ["C", "G", "Am", "F"],
    key: "C",
    description: "Progressão pop mais comum",
  },
  {
    name: "ii-V-I",
    chords: ["Dm7", "G7", "CM7"],
    key: "C",
    description: "Progressão jazz fundamental",
  },
  {
    name: "vi-IV-I-V",
    chords: ["Am", "F", "C", "G"],
    key: "C",
    description: "Variação popular",
  },
  {
    name: "I-vi-ii-V",
    chords: ["C", "Am", "Dm", "G"],
    key: "C",
    description: "Círculo harmônico",
  },
  {
    name: "I-IV-V-IV",
    chords: ["C", "F", "G", "F"],
    key: "C",
    description: "Rock clássico",
  },
];

export const ALL_NOTES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];
