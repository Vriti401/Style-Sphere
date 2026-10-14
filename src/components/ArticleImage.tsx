import React, { useState, useEffect } from 'react';
import { Article } from '../types/blog';
import { HeroPlate } from './HeroPlate';

interface ArticleImageProps {
  article: Article;
  className?: string;
  showOverlayText?: boolean;
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  article,
  className = '',
  showOverlayText = false,
}) => {
  const [currentSrc, setCurrentSrc] = useState(article.imageUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(article.imageUrl);
    setHasError(false);
  }, [article.imageUrl]);

  const handleImageError = () => {
    if (currentSrc !== article.secondaryImageUrl && article.secondaryImageUrl) {
      setCurrentSrc(article.secondaryImageUrl);
    } else {
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return <HeroPlate plate={article.visualPlate} className={className} showOverlayText={showOverlayText} />;
  }

  return (
    <div className={`relative overflow-hidden bg-stone-900 ${className}`}>
      {/* Real High-Resolution Stock Image */}
      <img
        src={currentSrc}
        alt={article.imageAlt || article.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        onError={handleImageError}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Subtle Editorial Vignette Scrim for Contrast & Elegance */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Optional Overlay Category Watermark */}
      {showOverlayText && (
        <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-white/90">
          <span className="text-[10px] tracking-[0.2em] font-sans font-semibold uppercase bg-black/40 px-2 py-0.5 rounded backdrop-blur-xs">
            {article.category}
          </span>
          {article.imageCredit && (
            <span className="text-[10px] text-white/70 font-mono">
              Photo: {article.imageCredit}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
