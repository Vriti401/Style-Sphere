import React from 'react';
import { Bookmark, Search, BookOpen, Compass, Sparkles } from 'lucide-react';

interface HeaderProps {
  currentView: 'articles' | 'detail' | 'lab' | 'quiz' | 'manifesto';
  onNavigate: (view: 'articles' | 'lab' | 'quiz' | 'manifesto') => void;
  savedCount: number;
  onOpenSaved: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  savedCount,
  onOpenSaved,
  onOpenSearch,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E7E2D8] transition-colors">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onNavigate('articles')}
          className="text-left group cursor-pointer focus-visible:outline-none"
        >
          <span className="font-serif text-2xl lg:text-3xl font-medium tracking-tight text-[#1C1917] group-hover:text-stone-700 transition-colors">
            Sartorial Mind
          </span>
        </button>

        {/* Zone 2: 4-6 clean text navigation links with subtle hover underlines */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('articles')}
            className={`cursor-pointer transition-colors relative py-1 ${
              currentView === 'articles' || currentView === 'detail'
                ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1C1917]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            Essays & Archives
          </button>
          <button
            onClick={() => onNavigate('lab')}
            className={`cursor-pointer transition-colors relative py-1 flex items-center gap-1.5 ${
              currentView === 'lab'
                ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1C1917]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            <Compass className="w-3.5 h-3.5 opacity-70" />
            <span>Cognition Lab</span>
          </button>
          <button
            onClick={() => onNavigate('quiz')}
            className={`cursor-pointer transition-colors relative py-1 flex items-center gap-1.5 ${
              currentView === 'quiz'
                ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1C1917]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 opacity-70" />
            <span>Archetype Diagnostic</span>
          </button>
          <button
            onClick={() => onNavigate('manifesto')}
            className={`cursor-pointer transition-colors relative py-1 flex items-center gap-1.5 ${
              currentView === 'manifesto'
                ? 'text-[#1C1917] font-semibold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#1C1917]'
                : 'hover:text-[#1C1917]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 opacity-70" />
            <span>Manifesto</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSearch}
            className="p-2 text-stone-600 hover:text-[#1C1917] transition-colors rounded-md hover:bg-stone-200/50 cursor-pointer"
            title="Search essays by keyword or theory"
            aria-label="Search essays"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenSaved}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-stone-800 bg-[#EFEAE1] hover:bg-[#E5DFD4] transition-colors rounded cursor-pointer whitespace-nowrap"
            title="View bookmarked reading list"
            aria-label="View saved articles"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reading List</span>
            {savedCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#1C1917] text-white text-[10px] flex items-center justify-center font-mono tabular-nums">
                {savedCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
