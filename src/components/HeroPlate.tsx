import React from 'react';
import { VisualPlate } from '../types/blog';

interface HeroPlateProps {
  plate: VisualPlate;
  className?: string;
  showOverlayText?: boolean;
}

export const HeroPlate: React.FC<HeroPlateProps> = ({
  plate,
  className = '',
  showOverlayText = false,
}) => {
  const { motif, primaryHex, secondaryHex, symbolLabel } = plate;

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center select-none bg-[#111827] ${className}`}
      style={{
        background: `radial-gradient(ellipse at 70% 30%, ${secondaryHex}22 0%, ${primaryHex} 100%)`,
      }}
    >
      <svg
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id={`grid-${motif}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="#ffffff"
              strokeWidth="0.75"
              strokeDasharray={motif === 'zen' ? '2 4' : 'none'}
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${motif})`} />
      </svg>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-8 text-white">
        {motif === 'tailoring' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-stone-200/90 fill-none" strokeWidth="1">
              <polygon points="50,15 25,45 35,48 50,28 65,48 75,45" stroke="#CBD5E1" strokeWidth="1.2" />
              <line x1="50" y1="28" x2="50" y2="90" stroke="#94A3B8" strokeDasharray="3 3" />
              <line x1="30" y1="55" x2="45" y2="55" stroke="#CBD5E1" />
              <line x1="55" y1="55" x2="70" y2="55" stroke="#CBD5E1" />
              <circle cx="50" cy="62" r="1.5" fill="#E2E8F0" />
              <circle cx="50" cy="74" r="1.5" fill="#E2E8F0" />
              <circle cx="50" cy="86" r="1.5" fill="#E2E8F0" />
              <circle cx="50" cy="50" r="44" stroke="#94A3B8" strokeWidth="0.5" strokeDasharray="1 4" />
            </svg>
          </div>
        )}

        {motif === 'armor' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-stone-200/90 fill-none" strokeWidth="1">
              <path d="M 50 15 Q 85 20 80 55 Q 75 85 50 95 Q 25 85 20 55 Q 15 20 50 15 Z" stroke="#E2E8F0" strokeWidth="1.5" />
              <path d="M 50 25 Q 75 30 70 55 Q 65 78 50 85 Q 35 78 30 55 Q 25 30 50 25 Z" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="2 2" />
              <line x1="50" y1="20" x2="50" y2="88" stroke="#CBD5E1" strokeWidth="1" />
              <line x1="30" y1="45" x2="70" y2="45" stroke="#CBD5E1" strokeWidth="1" />
            </svg>
          </div>
        )}

        {motif === 'spectrum' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 fill-none">
              <circle cx="50" cy="50" r="40" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 3" />
              <circle cx="50" cy="50" r="30" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="50" cy="50" r="20" stroke="#EF4444" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="6" fill="#FBBF24" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="#E2E8F0" strokeWidth="0.75" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#E2E8F0" strokeWidth="0.75" />
            </svg>
          </div>
        )}

        {motif === 'theatre' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-stone-200 fill-none" strokeWidth="1">
              <path d="M 15 20 Q 50 40 85 20 L 85 85 Q 50 65 15 85 Z" stroke="#E2E8F0" strokeWidth="1.2" />
              <path d="M 30 25 Q 50 35 70 25 L 70 78 Q 50 68 30 78 Z" stroke="#94A3B8" strokeWidth="0.75" strokeDasharray="3 3" />
              <circle cx="50" cy="52" r="10" stroke="#CBD5E1" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="#64748B" strokeWidth="0.5" />
            </svg>
          </div>
        )}

        {motif === 'chameleon' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-emerald-200 fill-none" strokeWidth="1">
              <path d="M 20 60 C 20 30, 45 20, 65 25 C 80 30, 85 45, 80 60 C 75 75, 55 85, 35 80 C 25 75, 35 55, 50 55 C 65 55, 65 65, 55 70" stroke="#34D399" strokeWidth="1.5" />
              <circle cx="68" cy="35" r="3" fill="#6EE7B7" />
              <circle cx="50" cy="50" r="42" stroke="#059669" strokeWidth="0.5" strokeDasharray="2 4" />
            </svg>
          </div>
        )}

        {motif === 'tactile' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-amber-200 fill-none" strokeWidth="1">
              <line x1="20" y1="20" x2="80" y2="80" stroke="#FDE68A" strokeWidth="2" />
              <line x1="30" y1="15" x2="85" y2="70" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="15" y1="30" x2="70" y2="85" stroke="#FDE68A" strokeWidth="1.5" />
              <line x1="80" y1="20" x2="20" y2="80" stroke="#FBBF24" strokeWidth="2" />
              <line x1="70" y1="15" x2="15" y2="70" stroke="#FBBF24" strokeWidth="1.5" />
              <line x1="85" y1="30" x2="30" y2="85" stroke="#FBBF24" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="42" stroke="#D97706" strokeWidth="0.5" strokeDasharray="1 3" />
            </svg>
          </div>
        )}

        {motif === 'zen' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-stone-300 fill-none" strokeWidth="1">
              <circle cx="50" cy="50" r="38" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="50" cy="50" r="24" stroke="#94A3B8" strokeWidth="1" strokeDasharray="4 4" />
              <circle cx="50" cy="50" r="4" fill="#F8FAFC" />
              <line x1="12" y1="50" x2="88" y2="50" stroke="#64748B" strokeWidth="0.75" />
              <line x1="50" y1="12" x2="50" y2="88" stroke="#64748B" strokeWidth="0.75" />
            </svg>
          </div>
        )}

        {motif === 'footwear' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-amber-200 fill-none" strokeWidth="1">
              <path d="M 15 65 L 35 65 L 45 45 L 75 48 L 85 65 L 85 75 L 15 75 Z" stroke="#FCD34D" strokeWidth="1.5" />
              <line x1="15" y1="75" x2="85" y2="75" stroke="#F59E0B" strokeWidth="3" />
              <line x1="25" y1="78" x2="35" y2="78" stroke="#D97706" strokeWidth="2" />
              <line x1="60" y1="78" x2="80" y2="78" stroke="#D97706" strokeWidth="2" />
              <circle cx="50" cy="50" r="42" stroke="#78350F" strokeWidth="0.5" strokeDasharray="3 3" />
            </svg>
          </div>
        )}

        {motif === 'evolution' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-violet-200 fill-none" strokeWidth="1">
              <path d="M 50 15 A 35 35 0 0 1 85 50 A 25 25 0 0 1 60 75 A 15 15 0 0 1 45 60 A 8 8 0 0 1 50 52" stroke="#DDD6FE" strokeWidth="1.5" />
              <circle cx="50" cy="52" r="2" fill="#FFFFFF" />
              <circle cx="50" cy="50" r="42" stroke="#8B5CF6" strokeWidth="0.5" strokeDasharray="2 3" />
            </svg>
          </div>
        )}

        {motif === 'sustainable' && (
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-36 h-36 stroke-emerald-200 fill-none" strokeWidth="1">
              <path d="M 50 20 Q 80 40 50 85 Q 20 40 50 20 Z" stroke="#A7F3D0" strokeWidth="1.5" />
              <line x1="50" y1="25" x2="50" y2="80" stroke="#6EE7B7" strokeWidth="1" />
              <line x1="50" y1="40" x2="68" y2="35" stroke="#6EE7B7" strokeWidth="0.75" />
              <line x1="50" y1="55" x2="32" y2="50" stroke="#6EE7B7" strokeWidth="0.75" />
              <line x1="50" y1="65" x2="65" y2="60" stroke="#6EE7B7" strokeWidth="0.75" />
              <circle cx="50" cy="50" r="42" stroke="#047857" strokeWidth="0.5" strokeDasharray="2 4" />
            </svg>
          </div>
        )}

        {showOverlayText && (
          <div className="mt-2 text-center">
            <span className="text-[10px] tracking-[0.25em] font-sans font-semibold uppercase text-stone-300">
              {symbolLabel}
            </span>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
};
