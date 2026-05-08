'use client';

export default function CompetitorTab({ competitors = [] }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-900">Competitor Analysis</h2>
        <p className="text-gray-500 text-sm mt-1">Leading titles in your target categories — see their keyword overlap and sales rank.</p>
      </div>

      <div className="space-y-4 mb-8">
        {competitors.map((comp, i) => (
          <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
              <div>
                <p className="font-bold text-gray-800">{comp.title}</p>
                <p className="text-sm text-gray-500">by {comp.author}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">Amazon BSR</p>
                <p className="text-xl font-bold text-blue-900">{comp.rank}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Their keywords</p>
              <div className="flex flex-wrap gap-2 mb-3">
                {comp.keywords.map((kw, j) => (
                  <span key={j} className="bg-white border border-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
                    {kw}
                  </span>
                ))}
              </div>
              <div className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${
                comp.overlap >= 3 ? 'bg-green-100 text-green-700' :
                comp.overlap >= 2 ? 'bg-amber-100 text-amber-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                <span>{comp.overlap >= 3 ? '🔥' : comp.overlap >= 2 ? '✅' : '⚠️'}</span>
                {comp.overlap} keyword overlap with your book
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-900">
        <strong>📊 What this means:</strong> High keyword overlap (3+) means you're directly competing with these titles. Use the gap keywords they <em>don't</em> use to carve out your own discoverability lane.
      </div>
    </div>
  );
}
