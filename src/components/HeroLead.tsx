import React from 'react';
import { Article } from '../types/blog';
import { ArticleImage } from './ArticleImage';
import { Bookmark, ArrowRight, Clock } from 'lucide-react';

interface HeroLeadProps {
  article: Article;
  onSelect: (article: Article) => void;
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
}

export const HeroLead: React.FC<HeroLeadProps> = ({
  article,
  onSelect,
  isBookmarked,
  onToggleBookmark,
}) => {
  return (
    <section className="border-b border-[#E7E2D8] pb-12 pt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Visual Stock Image with Fallback Plate */}
        <div className="lg:col-span-7 cursor-pointer group" onClick={() => onSelect(article)}>
          <div className="aspect-[16/10] w-full rounded border border-stone-800/10 shadow-sm overflow-hidden transition-transform duration-300 group-hover:scale-[1.008]">
            <ArticleImage article={article} className="w-full h-full" showOverlayText />
          </div>
        </div>

        {/* Right Column: Editorial Copy */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          {/* Zero-Pill Unboxed Metadata */}
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-stone-500 font-sans mb-3">
            <span>{article.issueNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-stone-700">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 inline" />
              {article.readTime}
            </span>
          </div>

          <h1
            onClick={() => onSelect(article)}
            className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-medium leading-[1.18] tracking-tight text-[#1C1917] hover:text-stone-700 transition-colors cursor-pointer mb-4 text-balance"
          >
            {article.title}
          </h1>

          <p className="text-stone-600 text-base lg:text-lg leading-relaxed mb-6 font-sans">
            {article.subtitle}
          </p>

          <div className="border-l-2 border-[#1C1917] pl-4 py-1 mb-6 text-sm text-stone-700 italic font-serif leading-relaxed">
            "{article.abstract}"
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-[#E7E2D8]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1C1917] text-white flex items-center justify-center text-xs font-serif font-bold">
                {article.author.avatarInitials}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900 leading-tight">
                  {article.author.name}
                </p>
                <p className="text-xs text-stone-500 leading-tight">
                  {article.author.role}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBookmark(article.id);
                }}
                className={`p-2 rounded hover:bg-stone-200/60 transition-colors cursor-pointer ${
                  isBookmarked ? 'text-[#1C1917]' : 'text-stone-400 hover:text-stone-700'
                }`}
                title={isBookmarked ? 'Saved' : 'Save for later'}
                aria-label="Bookmark lead essay"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => onSelect(article)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-[#1C1917] hover:bg-stone-800 transition-colors rounded cursor-pointer whitespace-nowrap"
              >
                <span>Read Lead Essay</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
