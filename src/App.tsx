import React, { useState, useEffect, useCallback } from 'react';
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
import { applySeoMetadata, getSeoForPath } from './utils/seo';
import { SEO_PAGE_MAP } from './data/seoConfig';
import { Search, X, Sparkles, Compass, ArrowRight } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('sartorial_mind_articles');
      if (saved) {
        const parsed: Article[] = JSON.parse(saved);
        return ARTICLES.map((base) => {
          const matched = parsed.find((p) => p.id === base.id);
          if (matched) {
            return {
              ...base,
              imageUrl: base.imageUrl,
              secondaryImageUrl: base.secondaryImageUrl,
              imageAlt: base.imageAlt,
              comments: matched.comments || base.comments,
              likesCount: matched.likesCount ?? base.likesCount,
            };
          }
          return base;
        });
      }
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

  // Sync route and metadata from current window location
  const syncRouteFromLocation = useCallback(() => {
    const rawPath = window.location.pathname || '/';
    const cleanPath = rawPath.replace(/\/$/, '') || '/';
    const slug = cleanPath.replace(/^\//, '');

    if (cleanPath === '/' || cleanPath === '') {
      setCurrentView('articles');
      applySeoMetadata(SEO_PAGE_MAP['/']);
      return;
    }

    if (cleanPath === '/cognition-lab') {
      setCurrentView('lab');
      applySeoMetadata(SEO_PAGE_MAP['/cognition-lab']);
      return;
    }

    if (cleanPath === '/archetype-quiz') {
      setCurrentView('quiz');
      applySeoMetadata(SEO_PAGE_MAP['/archetype-quiz']);
      return;
    }

    if (cleanPath === '/manifesto') {
      setCurrentView('manifesto');
      applySeoMetadata(SEO_PAGE_MAP['/manifesto']);
      return;
    }

    // Support both /dressing-for-confidence and previous /clothing-as-emotional-armor route
    const targetSlug = slug === 'clothing-as-emotional-armor' ? 'dressing-for-confidence' : slug;

    // Check if it matches any article slug
    const matchedArticle = articles.find((a) => a.slug === targetSlug || a.slug === cleanPath.replace(/^\//, ''));
    if (matchedArticle) {
      setSelectedArticle(matchedArticle);
      setCurrentView('detail');
      if (matchedArticle.seo) {
        applySeoMetadata({
          title: matchedArticle.seo.metaTitle,
          metaDescription: matchedArticle.seo.metaDescription,
          mainKeyword: matchedArticle.seo.mainKeyword,
          relatedKeywords: matchedArticle.seo.relatedKeywords,
          canonicalPath: `/${matchedArticle.slug}`,
          ogType: 'article',
          h1: matchedArticle.title,
        });
      } else {
        applySeoMetadata(getSeoForPath(cleanPath));
      }
      return;
    }

    // Default fallback to homepage
    setCurrentView('articles');
    applySeoMetadata(SEO_PAGE_MAP['/']);
  }, [articles]);

  // Initial mount route sync and popstate listener
  useEffect(() => {
    syncRouteFromLocation();
    const handlePopState = () => {
      syncRouteFromLocation();
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [syncRouteFromLocation]);

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
    const path = `/${article.slug}`;
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    if (article.seo) {
      applySeoMetadata({
        title: article.seo.metaTitle,
        metaDescription: article.seo.metaDescription,
        mainKeyword: article.seo.mainKeyword,
        relatedKeywords: article.seo.relatedKeywords,
        canonicalPath: path,
        ogType: 'article',
        h1: article.title,
      });
    } else {
      applySeoMetadata(getSeoForPath(path));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateView = (view: 'articles' | 'lab' | 'quiz' | 'manifesto') => {
    let path = '/';
    if (view === 'lab') path = '/cognition-lab';
    if (view === 'quiz') path = '/archetype-quiz';
    if (view === 'manifesto') path = '/manifesto';

    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    setCurrentView(view);
    applySeoMetadata(getSeoForPath(path));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToArticles = () => {
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    setCurrentView('articles');
    applySeoMetadata(SEO_PAGE_MAP['/']);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleBySlug = (slug: string) => {
    const targetSlug = slug === 'clothing-as-emotional-armor' ? 'dressing-for-confidence' : slug;
    const found = articles.find((a) => a.slug === targetSlug);
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
      {/* Header (Top Bar Contract Compliant with Real URLs and Descriptive Labels) */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigateView}
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
                aria-label="Dismiss search modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 max-h-80 overflow-y-auto space-y-2">
              {filteredArticles.length === 0 ? (
                <p className="text-xs text-stone-500 py-6 text-center">
                  No treatises matched "{searchQuery}". Try terms like "dressing for confidence", "dopamine dressing", or "shoes".
                </p>
              ) : (
                filteredArticles.map((art) => (
                  <a
                    key={art.id}
                    href={`/${art.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSelectArticle(art);
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded hover:bg-[#FBF9F5] cursor-pointer transition-colors flex items-center justify-between group block"
                    aria-label={`Read: ${art.title}`}
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
                  </a>
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
          onBack={handleBackToArticles}
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
        <ManifestoView onBackToArticles={handleBackToArticles} />
      )}

      {currentView === 'articles' && (
        <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
          {/* Magazine Hero Section with Main Keyword in H1, First Paragraph, and Related Keywords in Body */}
          <section className="pb-8 border-b border-[#E7E2D8]">
            <p className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500 mb-2">
              JOURNAL OF EMBODIED COGNITION & SARTORIAL PSYCHOLOGY
            </p>
            {/* Main Keyword in H1 */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-stone-900 font-medium tracking-tight mb-4 text-balance">
              Psychology of Fashion: Clothes & Mood
            </h1>
            {/* Main Keyword naturally in first paragraph */}
            <p className="text-stone-700 text-base sm:text-lg leading-relaxed font-sans max-w-3xl mb-3">
              Explore the <strong>psychology of fashion</strong>: how what you wear shapes your mood, confidence and identity. Read our research-led psychology of dress articles exploring the deep cognitive and emotional connections between clothing and the human mind.
            </p>
            {/* Related Keywords naturally in the body */}
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-sans max-w-3xl">
              Grounded in empirical research in the <strong>psychology of dress</strong> and tactile neurobiology, our curators analyze <strong>how clothes affect mood</strong>, decision-making velocity, and interpersonal presence across 10 peer-reviewed curatorial treatises.
            </p>
          </section>

          {/* Lead Story Exhibition Hero */}
          <HeroLead
            article={leadArticle}
            onSelect={handleSelectArticle}
            isBookmarked={bookmarkedIds.includes(leadArticle.id)}
            onToggleBookmark={handleToggleBookmark}
          />

          {/* Interactive Tools Teaser Banner with Descriptive Semantic Anchor Text */}
          <section className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <a
              href="/cognition-lab"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateView('lab');
              }}
              className="p-6 rounded border border-[#E7E2D8] bg-[#F7F4EE] hover:border-stone-400 transition-all cursor-pointer group flex items-start justify-between block"
              aria-label="Explore: Enclothed Cognition Lab Interactive Specimen Explorer"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                  <Compass className="w-4 h-4" />
                  <span>Explore: Enclothed Cognition Lab</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                  Interactive Garment Specimen Explorer
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-sm">
                  Test how tailoring, high-collar armor, brushed cashmere, and lug boots alter prefrontal attention and salivary cortisol.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
            </a>

            <a
              href="/archetype-quiz"
              onClick={(e) => {
                e.preventDefault();
                handleNavigateView('quiz');
              }}
              className="p-6 rounded border border-[#E7E2D8] bg-[#F7F4EE] hover:border-stone-400 transition-all cursor-pointer group flex items-start justify-between block"
              aria-label="Launch: Archetype Diagnostic Tool"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700">
                  <Sparkles className="w-4 h-4" />
                  <span>Launch: Archetype Diagnostic Tool</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-stone-900 group-hover:text-stone-700 transition-colors">
                  Analyze Your Wardrobe Psychology Footprint
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans max-w-sm">
                  Take the 5-inquiry diagnostic to determine if you operate as a Fortress Architect, Social Empath, or Chromatic Catalyst.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all mt-1 shrink-0" />
            </a>
          </section>

          {/* Curated Secondary Features with Q&A Heading and Direct Answer Opening */}
          <section className="mb-14">
            <div className="pb-3 border-b border-[#E7E2D8] mb-6">
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-1">
                CURATED FEATURE ESSAYS · VOL. VIII
              </span>
              {/* Question Heading 1 for Homepage */}
              <h2 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 mb-2">
                How do clothing choices shape emotional armor and mood?
              </h2>
              {/* Direct 1-2 sentence answer opening */}
              <p className="text-sm text-stone-600 font-sans max-w-3xl leading-relaxed">
                Clothing choices shape emotional armor and mood by acting as physical sensory barriers that down-regulate stress and activate neural reward pathways. Weighty structured textiles insulate the body against social anxiety, while saturated chromatic wavelengths stimulate dopamine synthesis.
              </p>
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

          {/* The Complete 10 Treatises Archive with Q&A Heading, Direct Answer Opening, and Category Filtering */}
          <section className="mb-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-[#E7E2D8] mb-8">
              <div>
                <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-1">
                  COMPLETE DISCOURSE COMPENDIUM
                </span>
                {/* Question Heading 2 for Homepage */}
                <h2 className="font-serif text-2xl font-medium text-stone-900 mb-2">
                  Which curatorial treatises explore the psychology of dress?
                </h2>
                {/* Direct 1-2 sentence answer opening */}
                <p className="text-sm text-stone-600 font-sans max-w-2xl leading-relaxed">
                  Our compendium features 10 peer-reviewed investigations examining how garments, textiles, and footwear shape cognitive focus and personal identity. Browse the complete collection below or filter by psychological category.
                </p>
              </div>

              {/* Functional Segmented Filter Tabs with Accessible Labels */}
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
                    aria-label={`Filter treatises by category: ${cat}`}
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
        onNavigate={handleNavigateView}
      />
    </div>
  );
}
