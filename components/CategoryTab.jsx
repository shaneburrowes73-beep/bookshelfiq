'use client';

const COMP_COLOR = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
  'Very High': 'bg-red-200 text-red-800',
};

export default function CategoryTab({ categories = [] }) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-900">Category Recommendations</h2>
        <p className="text-gray-500 text-sm mt-1">Best-fit categories across Amazon, BISAC, and Kobo — ranked by opportunity.</p>
      </div>

      <div className="space-y-4 mb-8">
        {categories.map((cat, i) => (
          <div key={i} className={`rounded-xl border p-5 ${cat.recommended ? 'border-blue-200 bg-blue-50' : 'border-gray-100 bg-gray-50'}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  {cat.recommended && (
                    <span className="text-xs bg-blue-900 text-white px-2 py-0.5 rounded-full font-semibold">Recommended</span>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${COMP_COLOR[cat.competition] || 'bg-gray-100 text-gray-600'}`}>
                    {cat.competition} competition
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800 font-mono mt-1">{cat.path}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-xs text-gray-500">Top rank in category</p>
                <p className="text-lg font-bold text-blue-900">{cat.topRank}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 flex items-center gap-4 text-xs text-gray-600">
              <span><strong>BISAC:</strong> {cat.bisac}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>💡 How to use:</strong> Amazon KDP allows 2 categories at publish time, but you can request up to 10 by contacting KDP support. Start with the two marked "Recommended" above.
      </div>
    </div>
  );
}
