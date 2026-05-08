'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const GENRES = [
  'Romance', 'Mystery & Thriller', 'Fantasy', 'Science Fiction', 'Horror',
  'Historical Fiction', 'Literary Fiction', 'Young Adult', 'Children\'s',
  'Self-Help', 'Business & Finance', 'Biography & Memoir', 'True Crime',
  'Health & Wellness', 'Cookbooks', 'Travel', 'Religion & Spirituality', 'Other',
];

const RETAILERS = [
  { id: 'kdp', label: 'Amazon KDP', logo: '🔶' },
  { id: 'kobo', label: 'Kobo Writing Life', logo: '📖' },
  { id: 'ingram', label: 'IngramSpark', logo: '🏭' },
  { id: 'apple', label: 'Apple Books', logo: '🍎' },
];

export default function HomePage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    genre: '',
    synopsis: '',
    retailers: ['kdp'],
    targetReader: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const toggleRetailer = (id) => {
    setForm(prev => ({
      ...prev,
      retailers: prev.retailers.includes(id)
        ? prev.retailers.filter(r => r !== id)
        : [...prev.retailers, id],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.genre || !form.synopsis) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      // Store results in sessionStorage and navigate
      sessionStorage.setItem('bookshelfiq_results', JSON.stringify({ form, results: data }));
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
            Beta — Free to Try
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Stop guessing your book's keywords.<br />
            <span className="text-amber-400">Start publishing strategically.</span>
          </h1>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            BookShelfIQ uses AI and real marketplace data to find the best keywords and categories for your book on Amazon, Kobo, IngramSpark, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-blue-200">
            <span>✅ 7 KDP-ready keywords</span>
            <span>✅ Amazon & BISAC categories</span>
            <span>✅ AI-generated metadata</span>
            <span>✅ Competitor insights</span>
          </div>
        </div>
      </section>

      {/* Input Form */}
      <section className="max-w-2xl mx-auto px-6 -mt-10 relative z-10 mb-20">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-blue-900 mb-6">Analyse Your Book</h2>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 mb-5 text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. The Thornwick Affair"
                value={form.title}
                onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Genre <span className="text-red-500">*</span>
              </label>
              <select
                value={form.genre}
                onChange={e => setForm(p => ({ ...p, genre: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800"
              >
                <option value="">Select genre...</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Synopsis / Description <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Paste your book description or a brief synopsis (the more detail, the better the results)..."
                value={form.synopsis}
                onChange={e => setForm(p => ({ ...p, synopsis: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{form.synopsis.length} characters — aim for 200+ for best results</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Target Retailers
              </label>
              <div className="grid grid-cols-2 gap-2">
                {RETAILERS.map(r => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => toggleRetailer(r.id)}
                    className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                      form.retailers.includes(r.id)
                        ? 'border-blue-900 bg-blue-50 text-blue-900'
                        : 'border-gray-200 text-gray-500 hover:border-gray-300'
                    }`}
                  >
                    <span>{r.logo}</span>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Target Reader <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Fans of Richard Osman, cozy mystery lovers, 40+ women"
                value={form.targetReader}
                onChange={e => setForm(p => ({ ...p, targetReader: e.target.value }))}
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 disabled:opacity-60 text-white py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                  </svg>
                  Analysing your book...
                </>
              ) : (
                <>🔍 Analyse My Book — Free</>
              )}
            </button>
            <p className="text-center text-xs text-gray-400">No account required. Results in under 10 seconds.</p>
          </form>
        </div>
      </section>

      {/* Social Proof */}
      <section className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <p className="text-gray-500 text-sm mb-8">Trusted by indie authors and publishers across Amazon KDP, Kobo, and IngramSpark</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { quote: '"Finally found the right categories after months of guessing. Sales up 40% in 3 weeks."', author: 'Sarah M., Cozy Mystery Author' },
            { quote: '"The competitor insights alone are worth it. I had no idea what keywords my rivals were using."', author: 'James T., Self-Help Author' },
            { quote: '"We use it for every launch. Our metadata is sharper and we rank faster."', author: 'Emma K., Small Publisher' },
          ].map((t, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left">
              <p className="text-gray-700 text-sm italic mb-3">{t.quote}</p>
              <p className="text-blue-900 font-semibold text-xs">{t.author}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-bold text-blue-900 text-center mb-10">Simple, Transparent Pricing</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Free', price: '$0', period: 'forever', features: ['5 analyses/month', '7 keywords per book', 'Amazon KDP categories', 'Basic export (CSV)'], cta: 'Start Free', highlight: false },
            { name: 'Pro', price: '$19', period: '/month', features: ['Unlimited analyses', 'All 5 modules', 'Multi-retailer coverage', 'AI metadata generation', 'Competitor analysis', 'PDF & JSON export'], cta: 'Start Pro Trial', highlight: true },
            { name: 'Publisher', price: '$99', period: '/month', features: ['Everything in Pro', 'Multi-user (5 seats)', 'Batch processing (50+ titles)', 'API access', 'White-label option', 'Priority support'], cta: 'Contact Sales', highlight: false },
          ].map((plan, i) => (
            <div key={i} className={`rounded-2xl p-7 border ${plan.highlight ? 'bg-blue-900 text-white border-blue-700 shadow-xl scale-105' : 'bg-white border-gray-200 shadow-sm'}`}>
              {plan.highlight && <div className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">Most Popular</div>}
              <h3 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-blue-900'}`}>{plan.name}</h3>
              <div className="flex items-end gap-1 mb-5">
                <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-blue-900'}`}>{plan.price}</span>
                <span className={`text-sm mb-1 ${plan.highlight ? 'text-blue-200' : 'text-gray-500'}`}>{plan.period}</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f, j) => (
                  <li key={j} className={`text-sm flex items-start gap-2 ${plan.highlight ? 'text-blue-100' : 'text-gray-600'}`}>
                    <span className={plan.highlight ? 'text-amber-400' : 'text-green-500'}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-lg font-semibold transition-colors text-sm ${
                plan.highlight
                  ? 'bg-amber-500 hover:bg-amber-400 text-white'
                  : 'border-2 border-blue-900 text-blue-900 hover:bg-blue-50'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
