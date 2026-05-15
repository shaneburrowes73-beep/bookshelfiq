// app/feedback/page.js
//
// BookShelfIQ — public feedback form.
//
// Posts to https://ai-solutions.vercel.app/api/feedback-submit with the
// table name and column names included in the body. The hub endpoint validates
// them against its allow-list, then writes via service_role.

'use client';

import { useState } from 'react';
import Link from 'next/link';

const QUESTIONS = [
  {
    key: 'q1',
    column: 'q1_delivered_4_modules',
    dimension: 'Compliance',
    text: 'Did BookShelfIQ produce the four things it promised — keywords, category paths, competitor analysis, and metadata — in a usable format?',
    lowLabel: 'Got nothing useful',
    highLabel: 'Ready to paste into KDP'
  },
  {
    key: 'q2',
    column: 'q2_easy_to_understand',
    dimension: 'Usability',
    text: 'How easy was it to go from typing in your book details to getting a result you understood?',
    lowLabel: 'Lost / confused',
    highLabel: 'Effortless'
  },
  {
    key: 'q3',
    column: 'q3_would_use_for_real_book',
    dimension: 'Value Add',
    text: 'If you were publishing a book tomorrow, would you actually use BookShelfIQ to choose keywords and categories — or stick with your current method?',
    lowLabel: 'Would not use',
    highLabel: 'Would absolutely use'
  }
];

const FEEDBACK_TABLE = 'bookshelfiq_feedback';

const FEEDBACK_API_URL =
  process.env.NEXT_PUBLIC_FEEDBACK_API_URL ||
  'https://ai-solutions.vercel.app/api/feedback-submit';

export default function FeedbackPage() {
  const [email, setEmail] = useState('');
  const [scores, setScores] = useState({ q1: 5, q2: 5, q3: 5 });
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState(null);

  const handleScoreChange = (key, val) => {
    setScores((prev) => ({ ...prev, [key]: parseInt(val, 10) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setResult({ error: 'Please enter your email so we can credit your feedback.' });
      return;
    }
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch(FEEDBACK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          table: FEEDBACK_TABLE,
          tester_email: email.trim(),
          q1_col: QUESTIONS[0].column,
          q2_col: QUESTIONS[1].column,
          q3_col: QUESTIONS[2].column,
          q1: scores.q1,
          q2: scores.q2,
          q3: scores.q3,
          general_feedback: generalFeedback.trim() || undefined
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setResult({ error: data.error || `Submission failed (HTTP ${res.status})` });
      } else {
        setResult({ ok: true, rag_score: data.rag_score, overall_score: data.overall_score });
      }
    } catch (err) {
      setResult({ error: err.message || 'Network error — please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  // Success state
  if (result?.ok) {
    const ragColor =
      result.rag_score === 'green' ? 'bg-green-100 text-green-900 border-green-300' :
      result.rag_score === 'amber' ? 'bg-amber-100 text-amber-900 border-amber-300' :
      'bg-red-100 text-red-900 border-red-300';

    return (
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className={`rounded-2xl border-2 p-8 text-center ${ragColor}`}>
          <h1 className="text-3xl font-bold mb-3">Thank you!</h1>
          <p className="text-lg mb-6">Your feedback has been recorded.</p>
          <p className="text-sm opacity-75 mb-2">Your overall score</p>
          <p className="text-5xl font-bold mb-2">{result.overall_score}</p>
          <p className="text-sm uppercase tracking-wide font-semibold">{result.rag_score}</p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="text-blue-900 underline hover:text-blue-700 text-sm"
          >
            ← Back to BookShelfIQ
          </Link>
        </div>
      </div>
    );
  }

  // Form
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <div className="bg-blue-900 text-white rounded-2xl px-8 py-6 mb-8">
        <h1 className="text-2xl font-bold">Share your feedback</h1>
        <p className="text-blue-200 text-sm mt-1">
          Three quick questions. Takes about two minutes.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 space-y-8">
        {/* Email */}
        <div>
          <label htmlFor="tester-email" className="block text-sm font-medium text-gray-700 mb-2">
            Your email
          </label>
          <input
            type="email"
            id="tester-email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            Used to credit your feedback. Not shared.
          </p>
        </div>

        {/* The three questions */}
        {QUESTIONS.map((q) => (
          <div key={q.key} className="border-t border-gray-100 pt-6">
            <p className="text-xs uppercase tracking-wide text-blue-900 font-semibold mb-2">
              {q.dimension}
            </p>
            <label htmlFor={`score-${q.key}`} className="block text-base text-gray-900 mb-4">
              {q.text}
            </label>
            <input
              type="range"
              id={`score-${q.key}`}
              min="1"
              max="10"
              step="1"
              value={scores[q.key]}
              onChange={(e) => handleScoreChange(q.key, e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>1 — {q.lowLabel}</span>
              <span className="text-lg font-bold text-blue-900">{scores[q.key]}</span>
              <span>10 — {q.highLabel}</span>
            </div>
          </div>
        ))}

        {/* General feedback */}
        <div className="border-t border-gray-100 pt-6">
          <label htmlFor="general-feedback" className="block text-sm font-medium text-gray-700 mb-2">
            Anything else? (optional)
          </label>
          <textarea
            id="general-feedback"
            value={generalFeedback}
            onChange={(e) => setGeneralFeedback(e.target.value)}
            placeholder="What worked, what didn't, what would make you score higher?"
            rows={4}
            maxLength={5000}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
          />
          <p className="text-xs text-gray-500 mt-1">
            {generalFeedback.length} / 5000
          </p>
        </div>

        {/* Error message */}
        {result?.error && (
          <div className="bg-red-50 border border-red-200 text-red-900 rounded-lg px-4 py-3 text-sm">
            {result.error}
          </div>
        )}

        {/* Submit */}
        <div className="border-t border-gray-100 pt-6 flex items-center justify-between">
          <Link
            href="/"
            className="text-gray-500 text-sm hover:text-gray-700"
          >
            ← Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting…' : 'Submit feedback'}
          </button>
        </div>
      </form>
    </div>
  );
}