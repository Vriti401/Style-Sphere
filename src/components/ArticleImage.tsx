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
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setCurrentSrc(article.imageUrl);
    setIsLoaded(false);
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
      {/* Background fallback plate while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 z-0">
          <HeroPlate plate={article.visualPlate} className="w-full h-full" />
        </div>
      )}

      {/* Real High-Resolution Stock Image */}
      <img
        src={currentSrc}
        alt={article.imageAlt || article.title}
        referrerPolicy="no-referrer"
        loading="lazy"
        decoding="async"
        onLoad={() => setIsLoaded(true)}
        onError={handleImageError}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
        }`}
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
