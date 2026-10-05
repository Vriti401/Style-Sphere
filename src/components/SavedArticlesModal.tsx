import React from 'react';
import { Article } from '../types/blog';
import { X, Clock, Trash2, ArrowUpRight, BookOpen } from 'lucide-react';

interface SavedArticlesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemoveBookmark: (articleId: string) => void;
  onClearAll: () => void;
}

export const SavedArticlesModal: React.FC<SavedArticlesModalProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-[#FBF9F5] border border-[#E7E2D8] rounded w-full max-w-2xl max-h-[85vh] flex flex-col shadow-xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-[#E7E2D8] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-stone-700" />
            <h3 className="font-serif text-2xl font-medium text-stone-900">
              Personal Reading Archive
            </h3>
            <span className="text-xs font-mono text-stone-400">
              ({savedArticles.length} {savedArticles.length === 1 ? 'essay' : 'essays'})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            aria-label="Close saved modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="py-12 text-center text-stone-500 font-sans">
              <p className="font-serif text-lg text-stone-700 mb-1">Your reading list is empty.</p>
              <p className="text-xs">
                Click the bookmark icon on any essay to curate your personal study syllabus.
              </p>
            </div>
          ) : (
            savedArticles.map((article) => (
              <div
                key={article.id}
                className="p-4 rounded border border-[#E7E2D8] bg-white hover:border-stone-400 transition-colors flex items-center justify-between gap-4 group"
              >
                <div
                  onClick={() => {
                    onSelectArticle(article);
                    onClose();
                  }}
                  className="cursor-pointer flex-1"
                >
                  <div className="flex items-center gap-2 text-xs text-stone-500 uppercase tracking-wider mb-1 font-sans">
                    <span>{article.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>
                  <h4 className="font-serif text-lg font-medium text-stone-900 group-hover:text-stone-700 transition-colors leading-snug">
                    {article.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onSelectArticle(article);
                      onClose();
                    }}
                    className="p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
                    title="Read essay"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveBookmark(article.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                    title="Remove from archive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#E7E2D8] bg-white flex items-center justify-between text-xs text-stone-500 font-sans">
            <span>Archive persisted in local session.</span>
            <button
              onClick={onClearAll}
              className="text-stone-600 hover:text-rose-600 transition-colors cursor-pointer font-medium"
            >
              Clear Entire List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
