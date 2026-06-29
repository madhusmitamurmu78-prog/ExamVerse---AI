import { Search, Flame, Calendar, Bell, Trophy, BookOpen } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: string[];
}

export default function Hero({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}: HeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-700 to-sky-800 text-white p-8 md:p-12 shadow-xl mb-8">
      {/* Absolute Decorative Circles */}
      <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute right-10 top-10 w-24 h-24 bg-blue-400/20 rounded-full border border-white/20" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/25 text-blue-100 text-xs font-semibold uppercase tracking-wider mb-6">
          <Trophy className="w-4 h-4 text-amber-300" />
          The Universe of Exams — Unified Intelligence
        </div>

        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">
          Find Your Career Path with <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-100 via-white to-blue-200">ExamVerse AI</span>
        </h1>
        
        <p className="text-blue-100 text-base md:text-lg mb-8 leading-relaxed max-w-2xl">
          The ultimate single-point hub for syllabus details, notification alerts, mock assessments, and personalized study schedules.
        </p>

        {/* Global Search Bar */}
        <div className="relative flex items-center bg-white/15 backdrop-blur-md rounded-2xl p-2 border border-white/20 focus-within:border-blue-300 focus-within:ring-2 focus-within:ring-white/25 transition-all shadow-lg mb-6">
          <Search className="w-5 h-5 text-blue-100 ml-3 shrink-0" />
          <input
            id="hero-search-input"
            type="text"
            placeholder="Search any exam, e.g., UPSC CSE, SSC CGL, OJEE, CUET UG, CUET PG..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent border-none text-white placeholder-blue-200 px-3 py-3 outline-hidden focus:ring-0 text-base font-medium"
          />
          {searchQuery && (
            <button
              id="clear-search-btn"
              onClick={() => setSearchQuery('')}
              className="text-blue-100 hover:text-white px-3 py-1 text-sm bg-white/10 rounded-lg hover:bg-white/20 transition"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-blue-200 uppercase tracking-widest mr-2">Categories:</span>
          <button
            id="cat-all"
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              selectedCategory === 'All'
                ? 'bg-white text-blue-700 shadow-md'
                : 'bg-white/10 text-blue-100 hover:bg-white/20 border border-white/5'
            }`}
          >
            All Exams
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              id={`cat-${cat.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat
                  ? 'bg-white text-blue-700 shadow-md'
                  : 'bg-white/10 text-blue-100 hover:bg-white/20 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
