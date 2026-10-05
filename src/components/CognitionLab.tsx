import React, { useState } from 'react';
import { COGNITION_ITEMS } from '../data/cognitionLab';
import { WardrobeCognitionItem, Article } from '../types/blog';
import { Shield, Feather, Anchor, Sun, Minimize2, Layers, ArrowRight, Brain, Sparkles, Activity } from 'lucide-react';

interface CognitionLabProps {
  onSelectArticleBySlug: (slug: string) => void;
  articles: Article[];
}

export const CognitionLab: React.FC<CognitionLabProps> = ({
  onSelectArticleBySlug,
  articles,
}) => {
  const [selectedItem, setSelectedItem] = useState<WardrobeCognitionItem>(COGNITION_ITEMS[0]);
  const [activeSimulationMode, setActiveSimulationMode] = useState<'cognitive' | 'haptic' | 'situational'>('cognitive');

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shield':
        return <Shield className="w-5 h-5" />;
      case 'Feather':
        return <Feather className="w-5 h-5" />;
      case 'Anchor':
        return <Anchor className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Minimize2':
        return <Minimize2 className="w-5 h-5" />;
      case 'Layers':
      default:
        return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Editorial Header */}
      <div className="mb-12 border-b border-[#E7E2D8] pb-8 text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-2">
          LABORATORY DIVISION · INTERACTIVE BIO-MECHANICS
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-[#1C1917] mb-4 text-balance">
          The Enclothed Cognition Laboratory
        </h1>
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans">
          Select a tailored artifact from the specimen shelf to examine how specific weaves, cuts, and structural tensions modulate prefrontal focus, autonomic arousal, and social presence.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Specimen Selector List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between pb-2 text-xs uppercase tracking-wider text-stone-500 font-sans font-semibold border-b border-[#E7E2D8]">
            <span>Curated Garment Specimens</span>
            <span>6 Profiles</span>
          </div>

          <div className="space-y-2.5">
            {COGNITION_ITEMS.map((item) => {
              const isSelected = item.id === selectedItem.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`w-full text-left p-4 rounded border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-white border-[#1C1917] shadow-sm ring-1 ring-[#1C1917]'
                      : 'bg-[#FBF9F5] border-[#E7E2D8] hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center shrink-0 text-white"
                      style={{ backgroundColor: item.primaryColor }}
                    >
                      {getIcon(item.iconName)}
                    </div>
                    <div>
                      <p className="font-serif text-base font-medium text-stone-900 leading-snug">
                        {item.name}
                      </p>
                      <p className="text-xs text-stone-500 font-sans">
                        {item.category}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs font-mono text-stone-400">
                      {isSelected ? 'ACTIVE' : 'INSPECT'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Deep Neurological Diagnostic Panel */}
        <div className="lg:col-span-7 bg-white rounded border border-[#E7E2D8] p-6 sm:p-8 shadow-sm">
          {/* Top Badge & Metric Kicker */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E7E2D8]">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-inner"
                style={{ backgroundColor: selectedItem.primaryColor }}
              >
                {getIcon(selectedItem.iconName)}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400 block">
                  SPECIMEN: {selectedItem.id.toUpperCase()}
                </span>
                <h3 className="font-serif text-2xl font-medium text-stone-900 leading-tight">
                  {selectedItem.name}
                </h3>
              </div>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded text-xs font-medium">
              <button
                onClick={() => setActiveSimulationMode('cognitive')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  activeSimulationMode === 'cognitive' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Cognition
              </button>
              <button
                onClick={() => setActiveSimulationMode('haptic')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  activeSimulationMode === 'haptic' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Haptics
              </button>
              <button
                onClick={() => setActiveSimulationMode('situational')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer ${
                  activeSimulationMode === 'situational' ? 'bg-white text-stone-900 shadow-xs font-semibold' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Application
              </button>
            </div>
          </div>

          {/* Dynamic Content by Mode */}
          <div className="py-6 space-y-6">
            {activeSimulationMode === 'cognitive' && (
              <>
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-stone-500 mb-2 font-semibold">
                    <Brain className="w-4 h-4 text-stone-700" />
                    <span>Neuro-Cognitive Transformation</span>
                  </div>
                  <p className="font-serif text-xl text-stone-900 leading-snug">
                    {selectedItem.psychologicalState}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#FBF9F5] border border-[#E7E2D8]">
                  <span className="text-xs uppercase tracking-wider font-mono text-stone-500 block mb-1">
                    LAB MEASUREMENT & DELTA
                  </span>
                  <p className="text-sm font-semibold text-stone-800 leading-relaxed font-sans">
                    {selectedItem.cognitiveShift}
                  </p>
                </div>

                <div>
                  <span className="text-xs uppercase tracking-wider font-mono text-stone-500 block mb-2">
                    EMPIRICAL LITERATURE FOUNDATION
                  </span>
                  <p className="text-sm text-stone-600 leading-relaxed font-sans">
                    {selectedItem.empiricalEvidence}
                  </p>
                </div>
              </>
            )}

            {activeSimulationMode === 'haptic' && (
              <>
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-stone-500 mb-2 font-semibold">
                    <Activity className="w-4 h-4 text-stone-700" />
                    <span>Somatosensory & Tactile Pathway</span>
                  </div>
                  <p className="font-serif text-lg text-stone-900 leading-relaxed">
                    {selectedItem.hapticFeedback}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#FBF9F5] border border-[#E7E2D8]">
                  <span className="text-xs uppercase tracking-wider font-mono text-stone-500 block mb-1">
                    PRIMARY NERVOUS SYSTEM RECEPTOR
                  </span>
                  <p className="text-sm text-stone-700 font-sans">
                    Non-myelinated cutaneous mechanoreceptors & proprioceptive muscle spindle fibers in the thoracic cavity.
                  </p>
                </div>
              </>
            )}

            {activeSimulationMode === 'situational' && (
              <>
                <div>
                  <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-wider text-stone-500 mb-2 font-semibold">
                    <Sparkles className="w-4 h-4 text-stone-700" />
                    <span>Prescribed Strategic Arena</span>
                  </div>
                  <p className="font-serif text-lg text-stone-900 leading-relaxed">
                    {selectedItem.recommendedSituation}
                  </p>
                </div>

                <div className="p-4 rounded bg-[#FBF9F5] border border-[#E7E2D8]">
                  <span className="text-xs uppercase tracking-wider font-mono text-stone-500 block mb-1">
                    TACTICAL DOSAGE GUIDELINE
                  </span>
                  <p className="text-sm text-stone-700 font-sans">
                    Wear for high-consequence engagements requiring focused state consolidation; remove immediately upon transition to private restorative downtime.
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Related Research Essay Link */}
          <div className="pt-6 border-t border-[#E7E2D8] flex items-center justify-between">
            <span className="text-xs text-stone-500">
              Related Treatise in Collection
            </span>
            <button
              onClick={() => {
                const targetSlug =
                  selectedItem.id === 'lab-blazer'
                    ? 'architecture-of-enclothed-cognition'
                    : selectedItem.id === 'lab-cashmere'
                    ? 'tactile-psyche-fabrics-cortisol-haptics'
                    : selectedItem.id === 'lab-boots'
                    ? 'footwear-grounding-neuromechanics-of-authority'
                    : selectedItem.id === 'lab-silk-dopamine'
                    ? 'dopamine-dressing-neuroaesthetics-of-color'
                    : selectedItem.id === 'lab-minimalist-turtleneck'
                    ? 'the-minimalist-uniform-decision-fatigue-zen'
                    : 'the-armor-effect-emotional-shielding';
                onSelectArticleBySlug(targetSlug);
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:underline cursor-pointer"
            >
              <span>Read Full Curatorial Essay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
