'use client';

export default function ExportTab({ results = {}, form = {} }) {
  const downloadCSV = () => {
    const rows = [
      ['Type', 'Field', 'Value', 'Notes'],
      ...((results.keywords || []).map(k => ['Keyword', `Slot ${k.kdpSlot}`, k.keyword, `Score: ${k.score} | Competition: ${k.competition}`])),
      ...((results.categories || []).filter(c => c.recommended).map(c => ['Category', 'Amazon Path', c.path, `BISAC: ${c.bisac} | Top Rank: ${c.topRank}`])),
      ['Metadata', 'Subtitle', results.metadata?.subtitle || '', ''],
      ['Metadata', 'Blurb', (results.metadata?.blurb || '').replace(/\n/g, ' '), 'AI-generated'],
      ...((results.metadata?.titleVariants || []).map((t, i) => ['Metadata', `Title Variant ${i + 1}`, t, ''])),
    ];

    const csv = rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(form.title || 'book').replace(/\s+/g, '-').toLowerCase()}-bookshelfiq.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadJSON = () => {
    const payload = {
      book: form,
      generatedAt: new Date().toISOString(),
      results,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(form.title || 'book').replace(/\s+/g, '-').toLowerCase()}-bookshelfiq.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const kdpText = () => {
    const lines = [
      `BookShelfIQ Export — ${form.title}`,
      `Generated: ${new Date().toLocaleDateString()}`,
      ``,
      `=== KEYWORDS (paste into KDP keyword fields) ===`,
      ...(results.keywords || []).map(k => `Slot ${k.kdpSlot}: ${k.keyword}`),
      ``,
      `=== RECOMMENDED CATEGORIES ===`,
      ...(results.categories || []).filter(c => c.recommended).map(c => `• ${c.path} (BISAC: ${c.bisac})`),
      ``,
      `=== SUBTITLE ===`,
      results.metadata?.subtitle || '',
      ``,
      `=== BACK COVER BLURB ===`,
      results.metadata?.blurb || '',
    ];
    const blob = new Blob([lines.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(form.title || 'book').replace(/\s+/g, '-').toLowerCase()}-kdp-ready.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const EXPORTS = [
    { icon: '📊', label: 'CSV Spreadsheet', desc: 'All keywords, categories, and metadata in a spreadsheet. Best for teams and batch processing.', action: downloadCSV, cta: 'Download CSV' },
    { icon: '📋', label: 'KDP-Ready Text', desc: 'Plain text formatted for easy copy-paste into Amazon KDP. No formatting required.', action: kdpText, cta: 'Download TXT' },
    { icon: '🔗', label: 'JSON (API format)', desc: 'Structured JSON for developers or for importing into other publishing tools.', action: downloadJSON, cta: 'Download JSON' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-900">Export Your Results</h2>
        <p className="text-gray-500 text-sm mt-1">Download in the format that works best for your workflow.</p>
      </div>

      <div className="space-y-4 mb-8">
        {EXPORTS.map((exp, i) => (
          <div key={i} className="bg-gray-50 rounded-xl border border-gray-100 p-5 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{exp.icon}</span>
              <div>
                <p className="font-bold text-gray-800">{exp.label}</p>
                <p className="text-sm text-gray-500 mt-0.5">{exp.desc}</p>
              </div>
            </div>
            <button
              onClick={exp.action}
              className="bg-blue-900 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-800 transition-colors whitespace-nowrap"
            >
              {exp.cta}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h3 className="font-bold text-blue-900 mb-3">📌 What to do next</h3>
        <ol className="space-y-2 text-sm text-blue-900">
          <li><strong>1.</strong> Log in to your KDP dashboard at kdp.amazon.com</li>
          <li><strong>2.</strong> Open your book's metadata page</li>
          <li><strong>3.</strong> Paste each keyword into a separate keyword field (7 total)</li>
          <li><strong>4.</strong> Set your two primary categories from the Category tab</li>
          <li><strong>5.</strong> Update your description with the AI blurb if desired</li>
          <li><strong>6.</strong> Save and allow 24–72 hours for Amazon to update</li>
        </ol>
      </div>
    </div>
  );
}
