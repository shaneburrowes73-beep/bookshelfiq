'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import KeywordTab from '../../components/KeywordTab';
import CategoryTab from '../../components/CategoryTab';
import MetadataTab from '../../components/MetadataTab';
import ExportTab from '../../components/ExportTab';
import CompetitorTab from '../../components/CompetitorTab';

const TABS = [
  { id: 'keywords', label: '🔑 Keywords', desc: '7 KDP-ready keywords' },
  { id: 'categories', label: '📂 Categories', desc: 'Amazon & BISAC paths' },
  { id: 'competitors', label: '🔍 Competitors', desc: 'Benchmark analysis' },
  { id: 'metadata', label: '✍️ Metadata', desc: 'AI-generated copy' },
  { id: 'export', label: '📤 Export', desc: 'Download results' },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('keywords');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = sessionStorage.getItem('bookshelfiq_results');
    if (!stored) {
      router.push('/');
      return;
    }
    setData(JSON.parse(stored));
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-900 mx-auto mb-4" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
          </svg>
          <p className="text-gray-500">Loading your results...</p>
        </div>
      </div>
    );
  }

  const { form, results } = data;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl px-8 py-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {results.demo && (
            <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full mr-2">DEMO</span>
          )}
          <h1 className="text-2xl font-bold mt-1">{form.title}</h1>
          <p className="text-blue-200 text-sm mt-1">{form.genre} · {form.retailers?.join(', ')}</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="text-sm bg-white text-blue-900 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors whitespace-nowrap"
        >
          ← Analyse Another Book
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto border-b border-gray-100">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-900 text-blue-900 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
              <span className="hidden md:block text-xs font-normal opacity-60 mt-0.5">{tab.desc}</span>
            </button>
          ))}
        </div>

        <div className="p-6 md:p-8">
          {activeTab === 'keywords' && <KeywordTab keywords={results.keywords} />}
          {activeTab === 'categories' && <CategoryTab categories={results.categories} />}
          {activeTab === 'competitors' && <CompetitorTab competitors={results.competitors} />}
          {activeTab === 'metadata' && <MetadataTab metadata={results.metadata} />}
          {activeTab === 'export' && <ExportTab results={results} form={form} />}
        </div>
      </div>
    </div>
  );
}
