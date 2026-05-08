'use client';

import { useState } from 'react';

export default function MetadataTab({ metadata = {} }) {
  const [copiedField, setCopiedField] = useState('');

  const copy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  const CopyBtn = ({ text, field }) => (
    <button
      onClick={() => copy(text, field)}
      className="text-xs font-semibold text-blue-900 hover:text-blue-700 flex items-center gap-1"
    >
      {copiedField === field ? '✅ Copied' : '📋 Copy'}
    </button>
  );

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-blue-900">AI Metadata Generator</h2>
        <p className="text-gray-500 text-sm mt-1">AI-optimised blurb, subtitle, and title variants — ready to paste into your publishing dashboard.</p>
      </div>

      {/* Blurb */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-gray-800">Back Cover Blurb</h3>
          <CopyBtn text={metadata.blurb} field="blurb" />
        </div>
        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">{metadata.blurb}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {metadata.keywordHighlights?.map((kw, i) => (
            <span key={i} className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Subtitle */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-bold text-gray-800">Recommended Subtitle</h3>
          <CopyBtn text={metadata.subtitle} field="subtitle" />
        </div>
        <p className="text-gray-800 font-semibold">{metadata.subtitle}</p>
      </div>

      {/* Title Variants */}
      <div className="bg-gray-50 rounded-xl border border-gray-100 p-5 mb-6">
        <h3 className="font-bold text-gray-800 mb-3">Alternative Title Options</h3>
        <div className="space-y-2">
          {metadata.titleVariants?.map((t, i) => (
            <div key={i} className="flex justify-between items-center bg-white border border-gray-100 rounded-lg px-4 py-3">
              <p className="text-gray-800 text-sm font-medium">{t}</p>
              <CopyBtn text={t} field={`title-${i}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
        <strong>💡 Tip:</strong> A/B test your subtitle on Amazon — you can update metadata at any time via KDP without affecting your ASIN or reviews.
      </div>
    </div>
  );
}
