import React, { useState } from 'react';
import { QUIZ_QUESTIONS, ARCHETYPE_RESULTS } from '../data/quiz';
import { ArchetypeResult, Article } from '../types/blog';
import { Sparkles, Check, ArrowRight, RotateCcw, BookOpen, Shield } from 'lucide-react';

interface ArchetypeQuizProps {
  articles: Article[];
  onSelectArticleById: (id: string) => void;
}

export const ArchetypeQuiz: React.FC<ArchetypeQuizProps> = ({
  articles,
  onSelectArticleById,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<ArchetypeResult | null>(null);

  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (archetype: string) => {
    const updated = { ...selectedAnswers, [currentQ.id]: archetype };
    setSelectedAnswers(updated);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate dominant archetype
      const counts: Record<string, number> = {
        armor: 0,
        chameleon: 0,
        dopamine: 0,
        minimalist: 0,
        alchemist: 0,
      };

      Object.values(updated).forEach((arch) => {
        counts[arch] = (counts[arch] || 0) + 1;
      });

      let highestArch = 'armor';
      let maxCount = -1;
      Object.entries(counts).forEach(([arch, count]) => {
        if (count > maxCount) {
          maxCount = count;
          highestArch = arch;
        }
      });

      setResult(ARCHETYPE_RESULTS[highestArch] || ARCHETYPE_RESULTS.armor);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {!result ? (
        <div className="bg-white rounded border border-[#E7E2D8] p-6 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="border-b border-[#E7E2D8] pb-6 mb-8 text-center">
            <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-2">
              DIAGNOSTIC PROTOCOL · 5 EVALUATIVE INQUIRIES
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mb-2 text-balance">
              Sartorial Archetype & Psychological Footprint
            </h2>
            <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-sans">
              Discover whether your closet functions primarily as armor, camouflage, an emotional catalyst, cognitive preservation, or poetic truth.
            </p>

            {/* Stepper indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {QUIZ_QUESTIONS.map((q, idx) => (
                <div
                  key={q.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentQuestionIndex
                      ? 'w-8 bg-[#1C1917]'
                      : idx < currentQuestionIndex
                      ? 'w-3 bg-stone-400'
                      : 'w-3 bg-stone-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Current Question */}
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block mb-2">
              INQUIRY 0{currentQ.id} OF 05
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-medium text-stone-900 leading-snug mb-2">
              {currentQ.question}
            </h3>
            <p className="text-xs text-stone-500 font-sans italic">
              Context: {currentQ.context}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelectOption(option.archetype)}
                className="w-full text-left p-4 rounded border border-[#E7E2D8] bg-[#FBF9F5] hover:bg-stone-50 hover:border-stone-400 transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-sm sm:text-base font-medium text-stone-800 group-hover:text-stone-900 leading-relaxed">
                    {option.text}
                  </p>
                  <ArrowRight className="w-4 h-4 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                </div>
                <span className="text-[11px] text-stone-500 font-sans mt-2 block opacity-80">
                  {option.annotation}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-[#E7E2D8] flex items-center justify-between text-xs text-stone-400">
            <span>Answers remain strictly client-side and unrecorded.</span>
            {currentQuestionIndex > 0 && (
              <button
                onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                className="text-stone-700 hover:underline cursor-pointer"
              >
                ← Previous question
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Result Card */
        <div className="bg-white rounded border border-[#E7E2D8] p-6 sm:p-10 shadow-sm animate-fade-in">
          <div className="border-b border-[#E7E2D8] pb-6 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-stone-400 block mb-1">
                DIAGNOSTIC SYNTHESIS COMPLETE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917]">
                {result.title}
              </h2>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded border border-stone-300 hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </div>

          <p className="font-serif text-xl sm:text-2xl text-stone-700 italic leading-relaxed mb-6">
            "{result.tagline}"
          </p>

          <div className="space-y-6 text-sm sm:text-base text-stone-700 leading-relaxed font-sans mb-8">
            <p>{result.psychologicalProfile}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded bg-[#FBF9F5] border border-[#E7E2D8]">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-1">
                  CORE PSYCHOLOGICAL MOTIVATION
                </span>
                <p className="text-sm font-semibold text-stone-900">{result.coreMotivation}</p>
              </div>

              <div className="p-4 rounded bg-[#FBF9F5] border border-[#E7E2D8]">
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 block mb-1">
                  POTENTIAL SHADOW VULNERABILITY
                </span>
                <p className="text-sm font-semibold text-stone-900">{result.potentialShadow}</p>
              </div>
            </div>

            <div className="p-4 rounded bg-[#F7F4EE] border border-[#E5DFD4]">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Cognitive Balance Recommendation</span>
              </div>
              <p className="text-sm text-stone-800">{result.cognitiveRecommendation}</p>
            </div>

            <div className="p-4 rounded border border-stone-800 bg-[#1C1917] text-white">
              <span className="text-xs uppercase tracking-widest font-mono text-stone-400 block mb-1">
                SIGNATURE POWER ARTIFACT
              </span>
              <p className="font-serif text-base text-stone-200">{result.powerGarment}</p>
            </div>
          </div>

          {/* Curated Recommended Articles */}
          <div className="pt-6 border-t border-[#E7E2D8]">
            <h4 className="font-serif text-xl font-medium mb-4 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-stone-600" />
              <span>Recommended Curatorial Reading for Your Archetype</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {result.suggestedArticles.map((artId) => {
                const article = articles.find((a) => a.id === artId);
                if (!article) return null;
                return (
                  <div
                    key={article.id}
                    onClick={() => onSelectArticleById(article.id)}
                    className="p-4 rounded border border-[#E7E2D8] bg-[#FBF9F5] hover:border-stone-500 transition-colors cursor-pointer group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[11px] font-sans uppercase tracking-wider text-stone-500 block mb-1">
                        {article.category}
                      </span>
                      <h5 className="font-serif text-base font-medium group-hover:text-stone-700 transition-colors line-clamp-2 leading-snug mb-2">
                        {article.title}
                      </h5>
                    </div>
                    <span className="text-xs font-semibold text-[#1C1917] flex items-center gap-1 mt-2">
                      Read Essay <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
