import React, { useState } from 'react';
import { Search, BookOpen, Sparkles, HelpCircle, ArrowRight, Tag } from 'lucide-react';
import { JARGON_DICTIONARY } from '../data/electionData';
import { JargonTerm } from '../types';

interface JargonBusterProps {
  onAskAI: (term: string) => void;
}

export const JargonBuster: React.FC<JargonBusterProps> = ({ onAskAI }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [customTerm, setCustomTerm] = useState('');

  const categories = ['ALL', 'Integrity', 'Legal', 'Procedure', 'System', 'Voting Rights'];

  const filteredTerms = JARGON_DICTIONARY.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.inSimpleWords.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCustomAsk = (e: React.FormEvent) => {
    e.preventDefault();
    if (customTerm.trim()) {
      onAskAI(`Explain this election term in simple words: "${customTerm}"`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Plain-English Civic Glossary
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900">
              Election Jargon Buster
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Confused by terms like VVPAT, Model Code of Conduct, or Tendered Ballots? We decode legalistic election vocabulary into simple everyday language anyone can understand.
            </p>
          </div>

          {/* Quick AI Term Decoder Box */}
          <form onSubmit={handleCustomAsk} className="flex items-center gap-2 max-w-sm w-full">
            <input
              id="custom-term-input"
              type="text"
              placeholder="Decode any other term (e.g. Quorum)..."
              value={customTerm}
              onChange={(e) => setCustomTerm(e.target.value)}
              className="px-3.5 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl w-full focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              id="submit-custom-term"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Decode
            </button>
          </form>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="jargon-search-input"
              type="text"
              placeholder="Search words (e.g. VVPAT, NOTA, Silence)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(' ', '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Glossary Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTerms.map((item) => (
          <div
            key={item.id}
            id={`jargon-card-${item.id}`}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 transition-all space-y-4"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  {item.category}
                </span>
                <h3 className="text-base font-bold font-heading text-slate-900 mt-1.5">
                  {item.term}
                </h3>
              </div>

              <button
                onClick={() => onAskAI(item.term)}
                className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-100 flex items-center gap-1 shrink-0"
                title="Ask AI more details"
              >
                <Sparkles className="w-3 h-3" />
                Ask AI
              </button>
            </div>

            {/* Official Definition */}
            <p className="text-xs text-slate-600 italic">
              "{item.shortDefinition}"
            </p>

            {/* In Simple Words (Key Innovation) */}
            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200/80">
              <span className="font-bold text-xs text-blue-900 block mb-1">
                💡 In Simple Words:
              </span>
              <p className="text-xs text-blue-800 leading-relaxed">
                {item.inSimpleWords}
              </p>
            </div>

            {/* Real World Example */}
            <div className="text-xs text-slate-700 space-y-1">
              <span className="font-bold text-slate-900">Real-World Scenario: </span>
              <p className="text-slate-600">{item.realWorldExample}</p>
            </div>

            {/* FAQ */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
              <span className="font-semibold text-slate-900 flex items-center gap-1 mb-0.5">
                <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                Common Question:
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">{item.faq}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredTerms.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">No matching jargon terms found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try searching for another term or click below to ask our AI election navigator to explain it.
          </p>
          <button
            onClick={() => onAskAI(searchQuery || 'Election jargon')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-xs inline-flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Ask AI to explain "{searchQuery}"
          </button>
        </div>
      )}
    </div>
  );
};
