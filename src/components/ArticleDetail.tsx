import React, { useState, useEffect } from 'react';
import { Article, Comment } from '../types/blog';
import { HeroPlate } from './HeroPlate';
import {
  ArrowLeft,
  Bookmark,
  Heart,
  Share2,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Check,
  MessageSquare,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
  isBookmarked: boolean;
  onToggleBookmark: (articleId: string) => void;
  onUpdateArticle: (updated: Article) => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles,
  isBookmarked,
  onToggleBookmark,
  onUpdateArticle,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'medium' | 'large'>('medium');
  const [readingTheme, setReadingTheme] = useState<'parchment' | 'ivory' | 'obsidian'>('parchment');
  const [fontFamily, setFontFamily] = useState<'serif' | 'sans'>('serif');
  const [copiedShare, setCopiedShare] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  // Audio player state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);

  // Scroll reading progress
  const [scrollProgress, setScrollProgress] = useState(0);

  // Comment form state
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentRole, setNewCommentRole] = useState('');
  const [newCommentContent, setNewCommentContent] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  useEffect(() => {
    let interval: number | undefined;
    if (isPlayingAudio) {
      interval = window.setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingAudio(false);
            return 0;
          }
          return prev + 0.6 * playbackSpeed;
        });
      }, 500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingAudio, playbackSpeed]);

  const toggleAudio = () => {
    setIsPlayingAudio(!isPlayingAudio);
  };

  const handleLike = () => {
    if (hasLiked) {
      setHasLiked(false);
      onUpdateArticle({ ...article, likesCount: article.likesCount - 1 });
    } else {
      setHasLiked(true);
      onUpdateArticle({ ...article, likesCount: article.likesCount + 1 });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentContent.trim() || !newCommentName.trim()) return;

    const newComment: Comment = {
      id: `c-user-${Date.now()}`,
      author: newCommentName.trim(),
      role: newCommentRole.trim() || 'Practicing Observer',
      date: 'Just now',
      content: newCommentContent.trim(),
      reactions: { resonates: 1, insightful: 0 },
    };

    onUpdateArticle({
      ...article,
      comments: [newComment, ...article.comments],
    });

    setNewCommentName('');
    setNewCommentRole('');
    setNewCommentContent('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 3000);
  };

  const handleReactComment = (commentId: string, type: 'resonates' | 'insightful') => {
    const updated = article.comments.map((c) => {
      if (c.id === commentId) {
        const alreadyReacted = c.userReacted === type;
        return {
          ...c,
          userReacted: alreadyReacted ? undefined : type,
          reactions: {
            ...c.reactions,
            [type]: alreadyReacted ? c.reactions[type] - 1 : c.reactions[type] + 1,
          },
        };
      }
      return c;
    });
    onUpdateArticle({ ...article, comments: updated });
  };

  const currentIndex = allArticles.findIndex((a) => a.id === article.id);
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : allArticles[0];
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : allArticles[allArticles.length - 1];

  const themeClasses = {
    parchment: 'bg-[#FBF9F5] text-[#1C1917]',
    ivory: 'bg-[#FFFFFF] text-[#111827]',
    obsidian: 'bg-[#18181B] text-[#F4F4F5]',
  }[readingTheme];

  const borderClass = readingTheme === 'obsidian' ? 'border-zinc-800' : 'border-[#E7E2D8]';
  const mutedTextClass = readingTheme === 'obsidian' ? 'text-zinc-400' : 'text-stone-500';
  const subSurfaceClass = readingTheme === 'obsidian' ? 'bg-zinc-900 border-zinc-800' : 'bg-[#F3EFE6] border-[#E2DDD3]';

  const fontStyleClass = fontFamily === 'serif' ? 'font-serif' : 'font-sans';
  const bodySizeClass = {
    normal: 'text-[16px] leading-[1.78]',
    medium: 'text-[18px] leading-[1.82]',
    large: 'text-[20px] leading-[1.86]',
  }[fontSize];

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200`}>
      {/* Reading Depth Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-stone-300/30">
        <div
          className="h-full bg-[#1C1917] dark:bg-white transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Reader Control Strip */}
      <div className={`sticky top-18 z-30 ${borderClass} border-b backdrop-blur-md px-6 py-2.5 ${readingTheme === 'obsidian' ? 'bg-zinc-900/90' : 'bg-[#FBF9F5]/90'}`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 font-medium hover:opacity-70 transition-opacity cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>All Essays</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontFamily === 'serif' ? 'font-bold underline' : 'opacity-60'}`}
              >
                Serif
              </button>
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2 py-0.5 rounded cursor-pointer ${fontFamily === 'sans' ? 'font-bold underline' : 'opacity-60'}`}
              >
                Sans
              </button>
            </div>

            <div className="h-3 w-[1px] bg-stone-300 dark:bg-zinc-700" />

            <div className="flex items-center gap-1">
              {(['normal', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  className={`px-1.5 py-0.5 rounded cursor-pointer ${fontSize === size ? 'font-bold bg-stone-200/50 dark:bg-zinc-800' : 'opacity-60'}`}
                >
                  {size === 'normal' ? 'A' : size === 'medium' ? 'A+' : 'A++'}
                </button>
              ))}
            </div>

            <div className="h-3 w-[1px] bg-stone-300 dark:bg-zinc-700" />

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setReadingTheme('parchment')}
                className={`w-4 h-4 rounded-full border border-stone-400 bg-[#FBF9F5] cursor-pointer ${readingTheme === 'parchment' ? 'ring-2 ring-stone-800' : ''}`}
                title="Parchment"
              />
              <button
                onClick={() => setReadingTheme('ivory')}
                className={`w-4 h-4 rounded-full border border-stone-300 bg-white cursor-pointer ${readingTheme === 'ivory' ? 'ring-2 ring-stone-800' : ''}`}
                title="Pure White"
              />
              <button
                onClick={() => setReadingTheme('obsidian')}
                className={`w-4 h-4 rounded-full border border-zinc-700 bg-[#18181B] cursor-pointer ${readingTheme === 'obsidian' ? 'ring-2 ring-zinc-400' : ''}`}
                title="Obsidian Dark"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        <header className="mb-10 text-center md:text-left">
          <div className={`flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs uppercase tracking-widest font-sans mb-4 ${mutedTextClass}`}>
            <span>{article.issueNumber}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1 font-mono tabular-nums">
              <Clock className="w-3 h-3 inline" />
              {article.readTime}
            </span>
            <span aria-hidden="true">·</span>
            <span>{article.publishedDate}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.1rem] font-medium leading-[1.16] tracking-tight mb-6 text-balance">
            {article.title}
          </h1>

          <p className={`text-lg sm:text-xl leading-relaxed mb-8 max-w-3xl font-sans ${readingTheme === 'obsidian' ? 'text-zinc-300' : 'text-stone-600'}`}>
            {article.subtitle}
          </p>

          <div className={`flex flex-wrap items-center justify-between gap-4 py-4 border-y ${borderClass}`}>
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-sm font-bold shadow-sm">
                {article.author.avatarInitials}
              </div>
              <div>
                <p className="font-semibold text-sm leading-tight">{article.author.name}</p>
                <p className={`text-xs ${mutedTextClass} leading-tight`}>
                  {article.author.role} · {article.author.affiliation}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer border ${borderClass} ${
                  hasLiked ? 'text-rose-600 font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-current' : ''}`} />
                <span className="font-mono tabular-nums">{article.likesCount}</span>
              </button>

              <button
                onClick={() => onToggleBookmark(article.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer border ${borderClass} ${
                  isBookmarked ? 'text-[#1C1917] dark:text-white font-semibold' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={handleShare}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors cursor-pointer border ${borderClass} opacity-70 hover:opacity-100`}
                title="Copy essay link"
              >
                {copiedShare ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Visual Plate Exhibition Banner */}
        <div className="mb-10 aspect-[16/9] w-full rounded overflow-hidden border border-stone-800/10 shadow-sm">
          <HeroPlate plate={article.visualPlate} className="w-full h-full" showOverlayText />
        </div>

        {/* Audio Narration Bar */}
        <div className={`mb-12 p-4 rounded border ${borderClass} ${subSurfaceClass}`}>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={toggleAudio}
                className="w-10 h-10 rounded-full bg-[#1C1917] text-white flex items-center justify-center hover:bg-stone-800 transition-colors cursor-pointer shrink-0"
                aria-label={isPlayingAudio ? 'Pause Narration' : 'Play Narration'}
              >
                {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Curatorial Audio Narration</span>
                </p>
                <p className={`text-[11px] ${mutedTextClass}`}>
                  Narrated by {article.author.name} ({article.readTime})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="w-36 sm:w-48 bg-stone-300/60 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#1C1917] dark:bg-white h-full transition-all duration-300"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextSpeed = playbackSpeed === 1.0 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1.0;
                    setPlaybackSpeed(nextSpeed);
                  }}
                  className={`text-[11px] font-mono px-2 py-0.5 rounded border ${borderClass} hover:opacity-100 opacity-80 cursor-pointer`}
                >
                  {playbackSpeed}x
                </button>
                <button
                  onClick={() => setAudioProgress(0)}
                  className="p-1 hover:opacity-80 transition-opacity cursor-pointer opacity-60"
                  title="Restart audio"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Curatorial Key Takeaways Box */}
        <div className={`mb-12 p-6 rounded border ${borderClass} ${readingTheme === 'obsidian' ? 'bg-zinc-900/60' : 'bg-[#F7F4EE]'}`}>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-stone-600 dark:text-stone-300" />
            <span className="text-xs uppercase tracking-widest font-sans font-semibold">
              Essential Curatorial Tenets
            </span>
          </div>
          <ul className="space-y-2.5">
            {article.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm leading-relaxed">
                <span className="font-mono text-xs opacity-50 mt-1">0{idx + 1}.</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Long-Form Reading Body Prose */}
        <article className="space-y-12">
          {article.sections.map((section, sIndex) => (
            <section key={section.id} className="relative">
              <h2 className="font-serif text-2xl sm:text-3xl font-medium mb-6 pt-4 border-t border-stone-200/60 dark:border-zinc-800">
                {section.heading}
              </h2>

              <div className={`space-y-6 ${fontStyleClass} ${bodySizeClass}`}>
                {section.paragraphs.map((p, pIndex) => (
                  <p
                    key={pIndex}
                    className={
                      sIndex === 0 && pIndex === 0
                        ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                        : ''
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {section.pullQuote && (
                <div className="my-10 py-6 px-6 sm:px-10 border-y border-[#E7E2D8] dark:border-zinc-800 text-center">
                  <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-[1.65rem] leading-relaxed max-w-2xl mx-auto">
                    "{section.pullQuote}"
                  </blockquote>
                </div>
              )}

              {section.marginNote && (
                <aside className={`mt-4 p-3 rounded text-xs font-sans italic border ${borderClass} opacity-80`}>
                  <span className="font-semibold not-italic">Curatorial Citation: </span>
                  {section.marginNote}
                </aside>
              )}

              {section.figure && (
                <figure className="my-8">
                  <div className={`aspect-[21/9] rounded flex items-center justify-center p-6 border ${borderClass} ${subSurfaceClass}`}>
                    <div className="text-center font-serif text-sm opacity-75">
                      [ Schematic Representation: {section.figure.caption} ]
                    </div>
                  </div>
                  <figcaption className={`text-xs ${mutedTextClass} mt-2 text-center font-sans`}>
                    {section.figure.caption} · <span className="opacity-75">{section.figure.credit}</span>
                  </figcaption>
                </figure>
              )}
            </section>
          ))}
        </article>

        {/* Psychological Action Protocol */}
        <section className={`mt-16 p-8 rounded border-2 border-stone-800 dark:border-stone-200 ${readingTheme === 'obsidian' ? 'bg-zinc-900' : 'bg-white'}`}>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold mb-2 text-stone-600 dark:text-stone-300">
            <BookOpen className="w-4 h-4" />
            <span>Somatic Integration Protocol</span>
          </div>
          <h3 className="font-serif text-2xl font-medium mb-3">
            {article.psychologicalExercise.title}
          </h3>
          <p className="text-sm leading-relaxed mb-4 opacity-80">
            {article.psychologicalExercise.description}
          </p>
          <div className={`p-4 rounded text-sm leading-relaxed font-serif italic ${subSurfaceClass}`}>
            "{article.psychologicalExercise.actionPrompt}"
          </div>
        </section>

        {/* Author Detailed Bio */}
        <div className={`mt-14 p-6 rounded border ${borderClass} ${subSurfaceClass} flex flex-col sm:flex-row items-center sm:items-start gap-5`}>
          <div className="w-16 h-16 rounded-full bg-[#1C1917] text-white flex items-center justify-center font-serif text-xl font-bold shrink-0">
            {article.author.avatarInitials}
          </div>
          <div>
            <h4 className="font-serif text-lg font-semibold">{article.author.name}</h4>
            <p className={`text-xs ${mutedTextClass} mb-2`}>
              {article.author.role} · {article.author.affiliation}
            </p>
            <p className="text-sm leading-relaxed opacity-90">{article.author.bio}</p>
          </div>
        </div>

        {/* Reader Reflections Section */}
        <section className="mt-16 pt-10 border-t border-[#E7E2D8] dark:border-zinc-800">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 opacity-70" />
              <h3 className="font-serif text-2xl font-medium">Reader Reflections</h3>
              <span className="text-xs font-mono opacity-60">({article.comments.length})</span>
            </div>
            <span className={`text-xs ${mutedTextClass}`}>Academic & Clinical Discourse</span>
          </div>

          <form onSubmit={handleAddComment} className={`p-6 rounded border ${borderClass} ${subSurfaceClass} mb-10`}>
            <h4 className="text-sm font-semibold mb-4">Contribute a Reflection or Somatic Observation</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your Name (e.g. Maya Thorne)"
                value={newCommentName}
                onChange={(e) => setNewCommentName(e.target.value)}
                required
                className={`px-3 py-2 text-sm rounded border ${borderClass} bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-stone-600`}
              />
              <input
                type="text"
                placeholder="Discipline / Role (Optional)"
                value={newCommentRole}
                onChange={(e) => setNewCommentRole(e.target.value)}
                className={`px-3 py-2 text-sm rounded border ${borderClass} bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-stone-600`}
              />
            </div>
            <textarea
              placeholder="How has this sartorial mechanism manifested in your personal psychology or behavior?"
              value={newCommentContent}
              onChange={(e) => setNewCommentContent(e.target.value)}
              required
              rows={3}
              className={`w-full px-3 py-2 text-sm rounded border ${borderClass} bg-white dark:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-stone-600 mb-4`}
            />
            <div className="flex items-center justify-between">
              {commentSuccess && (
                <span className="text-xs text-emerald-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Reflection recorded
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-medium text-white bg-[#1C1917] hover:bg-stone-800 transition-colors rounded cursor-pointer"
                >
                  Publish Reflection
                </button>
              </div>
            </div>
          </form>

          <div className="space-y-6">
            {article.comments.map((comment) => (
              <div key={comment.id} className={`p-5 rounded border ${borderClass} bg-white/40 dark:bg-zinc-900/40`}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-semibold text-sm">{comment.author}</span>
                    {comment.role && (
                      <span className={`text-xs ${mutedTextClass} ml-2 font-normal`}>
                        · {comment.role}
                      </span>
                    )}
                  </div>
                  <span className={`text-xs ${mutedTextClass}`}>{comment.date}</span>
                </div>
                <p className="text-sm leading-relaxed mb-3 opacity-90">{comment.content}</p>
                <div className="flex items-center gap-3 text-xs">
                  <button
                    onClick={() => handleReactComment(comment.id, 'resonates')}
                    className={`px-2.5 py-1 rounded border ${borderClass} hover:opacity-100 transition-opacity cursor-pointer ${
                      comment.userReacted === 'resonates' ? 'font-bold bg-stone-200 dark:bg-zinc-700' : 'opacity-70'
                    }`}
                  >
                    Resonates ({comment.reactions.resonates})
                  </button>
                  <button
                    onClick={() => handleReactComment(comment.id, 'insightful')}
                    className={`px-2.5 py-1 rounded border ${borderClass} hover:opacity-100 transition-opacity cursor-pointer ${
                      comment.userReacted === 'insightful' ? 'font-bold bg-stone-200 dark:bg-zinc-700' : 'opacity-70'
                    }`}
                  >
                    Insightful ({comment.reactions.insightful})
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Previous & Next Article Navigation */}
        <nav className={`mt-16 pt-8 border-t ${borderClass} grid grid-cols-1 sm:grid-cols-2 gap-6`}>
          <div
            onClick={() => onSelectArticle(prevArticle)}
            className={`p-4 rounded border ${borderClass} hover:border-stone-400 transition-colors cursor-pointer group`}
          >
            <span className={`text-[11px] uppercase tracking-wider font-sans ${mutedTextClass} block mb-1`}>
              ← Previous Essay
            </span>
            <h5 className="font-serif text-base font-medium group-hover:text-stone-700 transition-colors line-clamp-1">
              {prevArticle.title}
            </h5>
          </div>

          <div
            onClick={() => onSelectArticle(nextArticle)}
            className={`p-4 rounded border ${borderClass} hover:border-stone-400 transition-colors cursor-pointer text-right group`}
          >
            <span className={`text-[11px] uppercase tracking-wider font-sans ${mutedTextClass} block mb-1`}>
              Next Essay →
            </span>
            <h5 className="font-serif text-base font-medium group-hover:text-stone-700 transition-colors line-clamp-1">
              {nextArticle.title}
            </h5>
          </div>
        </nav>
      </main>
    </div>
  );
};
