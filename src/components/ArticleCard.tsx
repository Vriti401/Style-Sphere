import React from 'react';
import { Article } from '../types/blog';
import { ArticleImage } from './ArticleImage';
import { Bookmark, Clock, ArrowUpRight } from 'lucide-react';

interface ArticleCardProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  layoutVariant?: 'standard' | 'horizontal';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
  layoutVariant = 'standard',
}) => {
  if (layoutVariant === 'horizontal') {
    return (
      <article
        onClick={() => onSelect(article)}
        className="group cursor-pointer border-b border-[#E7E2D8] pb-6 last:border-b-0 grid grid-cols-1 sm:grid-cols-12 gap-5 items-center transition-colors"
      >
        <div className="sm:col-span-4 aspect-[4/3] rounded overflow-hidden border border-stone-800/10">
          <ArticleImage article={article} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="sm:col-span-8 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 font-sans uppercase tracking-wider mb-1.5">
              <span className="font-semibold text-stone-700">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1 font-mono tabular-nums">
                <Clock className="w-3 h-3 inline" />
                {article.readTime}
              </span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-[#1C1917] group-hover:text-stone-700 transition-colors leading-snug mb-2 text-balance">
              {article.title}
            </h3>
            <p className="text-sm text-stone-600 line-clamp-2 font-sans mb-3">
              {article.subtitle}
            </p>
          </div>
          <div className="flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200/60">
            <span>By {article.author.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(article.id);
                }}
                className={`p-1.5 rounded hover:bg-stone-200/60 transition-colors cursor-pointer ${
                  isBookmarked ? 'text-[#1C1917]' : 'text-stone-400 hover:text-stone-700'
                }`}
                title={isBookmarked ? 'Saved' : 'Save essay'}
                aria-label="Bookmark essay"
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>
              <span className="font-medium text-[#1C1917] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                Read Essay <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      onClick={() => onSelect(article)}
      className="group cursor-pointer flex flex-col justify-between border border-[#E7E2D8] bg-[#FBF9F5] rounded p-5 hover:border-stone-400 transition-all hover:shadow-[0_4px_20px_-8px_rgba(0,0,0,0.06)]"
    >
      <div>
        <div className="aspect-[4/3] rounded overflow-hidden border border-stone-800/10 mb-4">
          <ArticleImage article={article} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-500 font-sans uppercase tracking-wider mb-2">
          <span className="font-semibold text-stone-700">{article.category}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 font-mono tabular-nums">
            <Clock className="w-3 h-3 inline" />
            {article.readTime}
          </span>
        </div>

        <h3 className="font-serif text-xl font-medium text-[#1C1917] group-hover:text-stone-700 transition-colors leading-snug mb-2 text-balance">
          {article.title}
        </h3>

        <p className="text-sm text-stone-600 line-clamp-3 font-sans mb-4 leading-relaxed">
          {article.subtitle}
        </p>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-[#E7E2D8] text-xs text-stone-500">
        <div>
          <span className="font-medium text-stone-800 block">{article.author.name}</span>
          <span className="text-[11px] text-stone-400">{article.publishedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(article.id);
            }}
            className={`p-1.5 rounded hover:bg-stone-200/60 transition-colors cursor-pointer ${
              isBookmarked ? 'text-[#1C1917]' : 'text-stone-400 hover:text-stone-700'
            }`}
            title={isBookmarked ? 'Saved' : 'Save essay'}
            aria-label="Bookmark essay"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
          <span className="font-medium text-[#1C1917] flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
            Read <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </article>
  );
};
