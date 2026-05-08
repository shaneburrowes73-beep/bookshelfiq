/**
 * Demo data used when ANTHROPIC_API_KEY is not set.
 * Swap in real API responses by setting the env var in Vercel.
 */
export const DEMO_KEYWORDS = [
  { keyword: 'cozy mystery series', score: 94, competition: 'Medium', intent: 'Reader discovery', kdpSlot: 1 },
  { keyword: 'small town detective fiction', score: 88, competition: 'Low', intent: 'Genre browse', kdpSlot: 2 },
  { keyword: 'amateur sleuth novels', score: 85, competition: 'Medium', intent: 'Series starter', kdpSlot: 3 },
  { keyword: 'female detective mystery book', score: 82, competition: 'High', intent: 'Character search', kdpSlot: 4 },
  { keyword: 'British village murder mystery', score: 79, competition: 'Low', intent: 'Setting preference', kdpSlot: 5 },
  { keyword: 'cozy mystery with recipes', score: 75, competition: 'Low', intent: 'Niche appeal', kdpSlot: 6 },
  { keyword: 'whodunit page turner', score: 71, competition: 'Medium', intent: 'Impulse buy', kdpSlot: 7 },
];

export const DEMO_CATEGORIES = [
  { path: 'Books > Mystery, Thriller & Suspense > Mystery > Cozy', bisac: 'FIC022040', competition: 'Medium', topRank: '#1,240', recommended: true },
  { path: 'Books > Mystery, Thriller & Suspense > Mystery > Amateur Sleuth', bisac: 'FIC022000', competition: 'High', topRank: '#890', recommended: true },
  { path: 'Books > Literature & Fiction > Genre Fiction > Mystery', bisac: 'FIC022060', competition: 'Very High', topRank: '#420', recommended: false },
  { path: 'Books > Mystery, Thriller & Suspense > Mystery > Women Sleuths', bisac: 'FIC022070', competition: 'Low', topRank: '#3,100', recommended: true },
];

export const DEMO_COMPETITORS = [
  { title: 'The Thursday Murder Club', author: 'Richard Osman', rank: '#112', keywords: ['cozy mystery', 'British', 'retirement village'], overlap: 3 },
  { title: 'Hamish Macbeth series', author: 'M.C. Beaton', rank: '#445', keywords: ['Scottish mystery', 'small town', 'amateur detective'], overlap: 2 },
  { title: 'A Great Deliverance', author: 'Elizabeth George', rank: '#780', keywords: ['British detective', 'psychological', 'whodunit'], overlap: 2 },
];

export const DEMO_METADATA = {
  blurb: `In the sleepy village of Thornwick, nothing ever happens — until it does.\n\nWhen retired librarian Agnes Hartley stumbles upon a body in the local tea shop, the police are baffled. But Agnes has read every Agatha Christie novel twice, and she knows a clue when she sees one.\n\nPerfect for fans of Richard Osman and M.C. Beaton, this charming cozy mystery will keep you guessing until the very last page.`,
  subtitle: 'A Thornwick Village Cozy Mystery — Book 1',
  titleVariants: [
    'Death by Darjeeling: A Thornwick Mystery',
    'The Thornwick Affair: A Cozy Mystery',
    'Murder in the Tea Shop: An Agnes Hartley Mystery',
  ],
  keywordHighlights: ['cozy mystery', 'British village', 'amateur sleuth', 'retired detective'],
};
