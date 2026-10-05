import React from 'react';
import { Article } from '../types/blog';

interface FooterProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onNavigate: (view: 'articles' | 'lab' | 'quiz' | 'manifesto') => void;
}

export const Footer: React.FC<FooterProps> = ({
  articles,
  onSelectArticle,
  onNavigate,
}) => {
  return (
    <footer className="border-t border-[#E7E2D8] bg-[#F3EFE6] pt-16 pb-12 text-stone-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E0D9CC]">
          {/* Brand & Editorial Column */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-serif text-2xl font-medium text-[#1C1917]">
              Sartorial Mind
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed font-sans max-w-sm">
              An independent scholarly journal examining the neuro-cognitive, sociological, and psycho-somatic reverberations of human dress and adornment.
            </p>
            <p className="text-xs text-stone-400 font-mono">
              ISSN 2831-9042 · VOLUME VIII · 2026 EDITION
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              Journal Sections
            </h4>
            <ul className="space-y-2 text-sm text-stone-600">
              <li>
                <button
                  onClick={() => onNavigate('articles')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  All 10 Essays & Treatises
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('lab')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Enclothed Cognition Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('quiz')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  Archetype Diagnostic Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('manifesto')}
                  className="hover:text-stone-900 transition-colors cursor-pointer"
                >
                  The Sartorial Manifesto
                </button>
              </li>
            </ul>
          </div>

          {/* Article Index Column */}
          <div className="md:col-span-5 space-y-3 font-sans">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-900">
              The Ten Treatises Index
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-600">
              {articles.map((art, idx) => (
                <button
                  key={art.id}
                  onClick={() => onSelectArticle(art)}
                  className="text-left hover:text-stone-900 transition-colors cursor-pointer truncate"
                  title={art.title}
                >
                  <span className="font-mono text-stone-400 mr-1.5">{idx + 1}.</span>
                  {art.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-sans">
          <p>© 2026 Sartorial Mind Journal. Grounded in empirical cognitive science and cultural anthropology.</p>
          <div className="flex items-center gap-6">
            <span>Peer-Reviewed Literature</span>
            <span>Zero Advertising</span>
            <span>Open Access</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
