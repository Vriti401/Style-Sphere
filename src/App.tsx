import React, { useState, useEffect } from 'react';
import { ARTICLES } from './data/articles';
import { Article } from './types/blog';
import { Header } from './components/Header';
import { HeroLead } from './components/HeroLead';
import { ArticleCard } from './components/ArticleCard';
import { ArticleDetail } from './components/ArticleDetail';
import { CognitionLab } from './components/CognitionLab';
import { ArchetypeQuiz } from './components/ArchetypeQuiz';
import { SavedArticlesModal } from './components/SavedArticlesModal';
import { ManifestoView } from './components/ManifestoView';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { Search, X, Sparkles, Compass, ArrowRight, Filter } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('sartorial_mind_articles');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ARTICLES;
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sartorial_mind_bookmarks');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return ['art-01', 'art-03'];
  });

  const [currentView, setCurrentView] = useState<'articles' | 'detail' | 'lab' | 'quiz' | 'manifesto'>('articles');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(articles[0]);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sartorial_mind_bookmarks', JSON.stringify(bookmarkedIds));
    } catch {
      // ignore
    }
  }, [bookmarkedIds]);

  // Sync articles updates (comments, likes)
  const handleUpdateArticle = (updated: Article) => {
    const newArticles = articles.map((a) => (a.id === updated.id ? updated : a));
    setArticles(newArticles);
    setSelectedArticle(updated);
    try {
      localStorage.setItem('sartorial_mind_articles', JSON.stringify(newArticles));
    } catch {
      // ignore
    }
  };

  const handleToggleBookmark = (articleId: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(articleId) ? prev.filter((id) => id !== articleId) : [...prev, articleId]
    );
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    setCurrentView('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleBySlug = (slug: string) => {
    const found = articles.find((a) => a.slug === slug);
    if (found) {
      handleSelectArticle(found);
    }
  };

  const handleSelectArticleById = (id: string) => {
    const found = articles.find((a) => a.id === id);
    if (found) {
      handleSelectArticle(found);
    }
  };

  // Filter articles for main feed
  const categories = [
    'All',
    'Cognitive Science',
    'Social Armor',
    'Affective States',
    'Self & Identity',
    'Cultural Habit',
  ];

  const filteredArticles = articles.filter((a) => {
    const matchesCategory = selectedCategory === 'All' || a.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const leadArticle = articles.find((a) => a.leadStory) || articles[0];
  const secondaryFeatures = articles.filter((a) => a.featured && a.id !== leadArticle.id);
  const generalArchive = filteredArticles.filter((a) => a.id !== leadArticle.id);
  const savedArticlesList = articles.filter((a) => bookmarkedIds.includes(a.id));

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#1C1917] flex flex-col font-sans selection:bg-[#EBE3D5] selection:text-[#1C1917]">
      {/* Header (Top Bar Contract Compliant) */}
      <Header
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={bookmarkedIds.length}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Global Search Overlay Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded border border-[#E7E2D8] w-full max-w-2xl shadow-2xl p-6 animate-fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-stone-200">
              <div className="flex items-center gap-3 flex-1">
                <Search className="w-5 h-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search by keyword, psychological theory, or garment..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-base focus:outline-none placeholder:text-stone-400 font-sans"
                />
              </div>
              <button
                onClick={() => setIsSearchOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
              {filteredArticles.length === 0 ? (
                <p className="text-xs text-stone-500 py-6 text-center">
                  No treatises matched "{searchQuery}". Try terms like "tailoring", "armor", "dopamine", or "Goffman".
                </p>
              ) : (
                filteredArticles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      handleSelectArticle(art);
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded hover:bg-[#FBF9F5] cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-[11px] font-mono uppercase text-stone-400 block">
                        {art.category}
                      </span>
                      <h4 className="font-serif text-base font-medium text-stone-900 group-hover:text-stone-700">
                        {art.title}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-stone-400">{art.readTime}</span>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400">
              <span>Press ESC or click outside to dismiss</span>
              <span>Showing {filteredArticles.length} matching essays</span>
            </div>
          </div>
        </div>
      )}

      {/* Main View Router */}
      {currentView === 'detail' && selectedArticle && (
        <ArticleDetail
          article={selectedArticle}
          onBack={() => setCurrentView('articles')}
          onSelectArticle={handleSelectArticle}
          allArticles={articles}
          isBookmarked={bookmarkedIds.includes(selectedArticle.id)}
          onToggleBookmark={handleToggleBookmark}
          onUpdateArticle={handleUpdateArticle}
        />
      )}

      {currentView === 'lab' && (
        <CognitionLab
          onSelectArticleBySlug={handleSelectArticleBySlug}
          articles={articles}
        />
      )}

      {currentView === 'quiz' && (
        <ArchetypeQuiz
          articles={articles}
          onSelectArticleById={handleSelectArticleById}
        />
      )}

      {currentView === 'manifesto' && (
        <ManifestoView onBackToArticles={() => setCurrentView('articles')} />
      )}

      {currentView === 'articles' && (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          {/* Magazine Sub-Header Marquee Banner */}
          <div className="pb-6 border-b border-[#E7E2D8] flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 mb-1">
                JOURNAL OF EMBODIED COGNITION & SARTORIAL PSYCHOLOGY
              </p>
              <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium tracking-tight">
                How What We Wear Shapes Who We Become
              </h2>
            </div>
            <div className="text-xs text-stone-500 font-sans md:text-right">
              <span className="block font-medium text-stone-800">10 Curatorial Treatises in Collection</span>
              <span>Peer-reviewed clinical & somatic frameworks</span>
            </div>
          </div>

          {/* Lead Story Exhibition Hero */}
          <HeroLead
            article={leadArticle}
            onSelect={handleSelectArticle}
            isBookmarked={bookmarkedIds.includes(leadArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Interactive Tools Teaser Banner */}
          <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              onClick={() => {
                setCurrentView('lab');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-6 rounded border border-[#E7E2D8] bg-[#F7F4EE] hover:border-stone-400 transition-all cursor-pointer group flex items-start justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                  <Compass className="w-4 h-4" />
                  <span>Enclothed Cognition Lab</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                  Interactive Garment Specimen Explorer
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-sm">
                  Test how tailoring, high-collar armor, brushed cashmere, and lug boots alter prefrontal attention and salivary cortisol.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
            </div>

            <div
              onClick={() => {
                setCurrentView('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-6 rounded border border-[#E7E2D8] bg-[#F7F4EE] hover:border-stone-400 transition-all cursor-pointer group flex items-start justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                  <Sparkles className="w-4 h-4" />
                  <span>Archetype Diagnostic Tool</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                  Analyze Your Wardrobe Psychology Footprint
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-sm">
                  Take the 5-inquiry diagnostic to determine if you operate as a Fortress Architect, Social Empath, or Chromatic Catalyst.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
            </div>
          </section>

          {/* Curated Secondary Features (Tier 2 Salience) */}
          <section className="mb-14">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E2D8] mb-6">
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500">
                CURATED FEATURE ESSAYS · VOL. VIII
              </span>
              <span className="text-xs text-stone-400 font-mono">TIER II PERSPECTIVES</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {secondaryFeatures.map((art) => (
                <ArticleCard
                  key={art.id}
                  article={art}
                  onSelect={handleSelectArticle}
                  isBookmarked={bookmarkedIds.includes(art.id)}
                  onToggleBookmark={handleToggleBookmark}
                  layoutVariant="standard"
                />
              ))}
            </div>
          </section>

          {/* The Complete 10 Treatises Archive with Category Filtering */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E7E2D8] mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-1">
                  COMPLETE DISCOURSE COMPENDIUM
                </span>
                <h3 className="font-serif text-2xl font-medium text-stone-900">
                  All Treatises on Fashion & Identity
                </h3>
              </div>

              {/* Functional Segmented Filter Tabs (Buttons with click handlers) */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#1C1917] text-white shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {generalArchive.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  onSelect={handleSelectArticle}
                  isBookmarked={bookmarkedIds.includes(article.id)}
                  onToggleBookmark={handleToggleBookmark}
                  layoutVariant="standard"
                />
              ))}
            </div>
          </section>

          {/* Newsletter Dispatch Section */}
          <NewsletterSection />
        </main>
      )}

      {/* Reading List Modal */}
      <SavedArticlesModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemoveBookmark={handleToggleBookmark}
        onClearAll={() => setBookmarkedIds([])}
      />

      {/* Institutional Footer */}
      <Footer
        articles={articles}
        onSelectArticle={handleSelectArticle}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
