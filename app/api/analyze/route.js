import Anthropic from '@anthropic-ai/sdk';
import {
  DEMO_KEYWORDS,
  DEMO_CATEGORIES,
  DEMO_COMPETITORS,
  DEMO_METADATA,
} from '../../../lib/demo-data';

const DEMO_MODE = !process.env.ANTHROPIC_API_KEY;

export async function POST(request) {
  try {
    const { title, genre, synopsis, retailers, targetReader } = await request.json();

    if (!title || !genre || !synopsis) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Demo mode — return sample data immediately
    if (DEMO_MODE) {
      await new Promise(r => setTimeout(r, 1200)); // Simulate processing
      return Response.json({
        demo: true,
        keywords: DEMO_KEYWORDS,
        categories: DEMO_CATEGORIES,
        competitors: DEMO_COMPETITORS,
        metadata: DEMO_METADATA,
      });
    }

    // Live AI mode
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const prompt = `You are a book publishing metadata expert. Analyse the following book and return a JSON object with keyword and category recommendations.

Book Title: ${title}
Genre: ${genre}
Synopsis: ${synopsis}
Target Reader: ${targetReader || 'General audience'}
Target Retailers: ${retailers.join(', ')}

Return a JSON object with this exact structure:
{
  "keywords": [
    { "keyword": "string (2-5 words)", "score": number 1-100, "competition": "Low|Medium|High", "intent": "string", "kdpSlot": number 1-7 }
  ],
  "categories": [
    { "path": "Amazon category path", "bisac": "BISAC code", "competition": "Low|Medium|High|Very High", "topRank": "e.g. #1,200", "recommended": boolean }
  ],
  "competitors": [
    { "title": "string", "author": "string", "rank": "e.g. #500", "keywords": ["array of 3 keywords"], "overlap": number }
  ],
  "metadata": {
    "blurb": "string — 3 paragraph AI-optimized back cover blurb",
    "subtitle": "string",
    "titleVariants": ["array of 3 alternative title options"],
    "keywordHighlights": ["array of 4 key phrases found in blurb"]
  }
}

Rules:
- Provide exactly 7 keywords (matching KDP's 7 keyword slots)
- Provide 4 category recommendations
- Provide 3 competitor examples (use realistic well-known titles in the genre)
- Make all recommendations specific and actionable
- Return ONLY valid JSON, no explanation text`;

    const message = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });

    const raw = message.content[0].text.trim();
    // Strip markdown code blocks if present
    const jsonStr = raw.replace(/^```json\n?/, '').replace(/\n?```$/, '');
    const results = JSON.parse(jsonStr);

    return Response.json(results);
  } catch (err) {
    console.error('Analyze error:', err);
    return Response.json({ error: err.message || 'Analysis failed' }, { status: 500 });
  }
}
