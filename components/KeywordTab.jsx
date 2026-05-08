'use client';

import { useState } from 'react';

const COMPETITION_COLOR = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-amber-100 text-amber-700',
  High: 'bg-red-100 text-red-700',
};

export default function KeywordTab({ keywords = [] }) {
  const [copied, setCopied] = useState(false);

  const kdpString = keywords.map(k => k.keyword).join(', ');

  const copyAll = () => {
    navigator.clipboard.writeText(kdpString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Keyword Recommendations</h2>
          <p className="text-gray-500 text-sm mt-1">7 optimised keywords for Amazon KDP — ranked by opportunity score.</p>
        </div>
        <button onClick={copyAll} className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap">
          {copied ? '✅ Copied!' : '📋 Copy All for KDP'}
        </button>
      </div>

      <div className="space-y-3 mb-8">
        {keywords.map((k, i) => (
          <div key={i} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
            <div className="w-7 h-7 rounded-full bg-blue-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
              {k.kdpSlot}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800">{k.keyword}</p>
              <p className="text-xs text-gray-500 mt-0.5">Intent: {k.intent}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${COMPETITION_COLOR[k.competition] || 'bg-gray-100 text-gray-600'}`}>
                {k.competition}
              </span>
              <div className="text-right">
                <p className="text-sm font-bold text-blue-900">{k.score}</p>
                <p className="text-xs text-gray-400">score</p>
              </div>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-900 rounded-full" style={{ width: `${k.score}%` }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* KDP Paste Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <p className="text-xs font-bold text-blue-900 uppercase tracking-widest mb-2">KDP Paste-Ready (copy into each keyword field)</p>
        <p className="text-sm text-gray-700 font-mono leading-relaxed">{kdpString}</p>
      </div>

      <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
        <strong>💡 Tip:</strong> Use each keyword as a phrase in a separate KDP field (not comma-separated in one box). Amazon treats each field independently.
      </div>
    </div>
  );
}
