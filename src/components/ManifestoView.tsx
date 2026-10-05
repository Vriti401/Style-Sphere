import React from 'react';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';

interface ManifestoViewProps {
  onBackToArticles: () => void;
}

export const ManifestoView: React.FC<ManifestoViewProps> = ({ onBackToArticles }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={onBackToArticles}
        className="flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors cursor-pointer mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Essays</span>
      </button>

      <div className="bg-white rounded border border-[#E7E2D8] p-8 sm:p-12 shadow-sm space-y-8">
        <header className="border-b border-[#E7E2D8] pb-6">
          <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-400 block mb-2">
            EDITORIAL POSITION · FOUNDATIONAL TREATISE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-medium text-[#1C1917] leading-tight mb-4">
            The Sartorial Mind Manifesto: Dress as Cognitive Architecture
          </h1>
          <p className="font-serif text-xl text-stone-600 italic leading-relaxed">
            "Clothing is not an inert sheath wrapped around a detached mind; it is an active somatic prosthesis through which consciousness perceives, defends, and authors itself."
          </p>
        </header>

        <section className="space-y-6 text-base sm:text-lg text-stone-700 leading-relaxed font-sans">
          <p>
            For two centuries, industrial culture has promoted a false Cartesian dualism: the mind is serious, rational, and primary; the wardrobe is frivolous, superficial, and vain. This intellectual error has blinded us to one of humanity’s oldest technologies of psychological transformation.
          </p>

          <p>
            When you slip your arms into a coat, your peripheral nervous system does not register an abstract concept. It registers mass against your collarbones, restriction around your ribcage, and the crisp temperature of linen against your wrists. Through mechanoreceptors and proprioceptive feedback, your body instructs your brain on what posture to assume toward existence.
          </p>

          <div className="p-6 rounded bg-[#FBF9F5] border border-[#E7E2D8] my-8">
            <h3 className="font-serif text-2xl font-medium text-stone-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-stone-700" />
              <span>The Five Tenets of Sartorial Psychology</span>
            </h3>
            <ul className="space-y-4 text-sm sm:text-base font-sans">
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-stone-400 mt-1">I.</span>
                <span><strong>The Epidermal Boundary:</strong> Clothing is the secondary boundary of the self, standing between internal vulnerability and external scrutiny.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-stone-400 mt-1">II.</span>
                <span><strong>Enclothed Priming:</strong> What an outfit symbolizes to cultural history, it actively invokes in the prefrontal cortex of the wearer.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-stone-400 mt-1">III.</span>
                <span><strong>Sensory Homeostasis:</strong> Fabric texture and weight directly modulate salivary cortisol and the autonomic fight-or-flight threshold.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-stone-400 mt-1">IV.</span>
                <span><strong>Dramaturgical Integrity:</strong> Choosing an outfit is not vanity; it is honoring the social contract of the roles we inhabit.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-mono text-xs text-stone-400 mt-1">V.</span>
                <span><strong>Aesthetic Sovereignty:</strong> Authentic style begins when an individual develops somatic tolerance for the gaze of the tribe without collapsing into apology.</span>
              </li>
            </ul>
          </div>

          <p>
            To dress deliberately is to practice applied neurobiology. It is the conscious decision to sculpt your mood, focus, and social posture through the deliberate tactile choices you make before stepping across the threshold of your sanctuary.
          </p>
        </section>

        <footer className="pt-6 border-t border-[#E7E2D8] flex items-center justify-between text-xs text-stone-500 font-sans">
          <span>Published by the Editorial Board · Autumn 2026</span>
          <button
            onClick={onBackToArticles}
            className="font-semibold text-[#1C1917] hover:underline cursor-pointer"
          >
            Explore the 10 Treatises →
          </button>
        </footer>
      </div>
    </div>
  );
};
