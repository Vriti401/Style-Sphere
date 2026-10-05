import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="border-t border-b border-[#E7E2D8] py-16 bg-[#F7F4EE]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-xs uppercase tracking-widest font-sans font-semibold text-stone-500 block mb-2">
          THE SARTORIAL DISPATCH · OCCASIONAL MONOGRAPHS
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#1C1917] mb-4 text-balance">
          Bi-Weekly Studies in Embodied Cognition & Dress
        </h2>
        <p className="text-stone-600 text-sm sm:text-base max-w-xl mx-auto mb-8 font-sans leading-relaxed">
          Delivered every second Sunday: peer-reviewed research summaries, historical case studies on signature uniforms, and somatic wardrobe integration protocols.
        </p>

        {subscribed ? (
          <div className="p-4 rounded border border-emerald-300 bg-emerald-50 max-w-md mx-auto flex items-center justify-center gap-2 text-emerald-800 text-sm font-sans animate-fade-in">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>You have been added to the Curatorial Dispatch ledger.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your correspondence email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded border border-[#DCD5C9] bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-600"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1C1917] hover:bg-stone-800 transition-colors rounded cursor-pointer whitespace-nowrap"
            >
              Request Dispatch
            </button>
          </form>
        )}

        <p className="text-[11px] text-stone-400 mt-4 font-sans">
          No commercial promotions. Strictly peer-reviewed cultural essays and psycho-somatic frameworks.
        </p>
      </div>
    </section>
  );
};
