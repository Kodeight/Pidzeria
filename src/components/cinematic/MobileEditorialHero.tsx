import React from 'react';
import { ArrowUpRight, Calendar } from 'lucide-react';

interface MobileEditorialHeroProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export const MobileEditorialHero: React.FC<MobileEditorialHeroProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  return (
    <section className="relative w-full min-h-[85vh] bg-[#000000] pt-28 pb-12 px-6 flex flex-col justify-between overflow-hidden select-none">
      
      {/* 1. EDITORIAL TEXT CONTENT (Dedicated Upper Safe Zone — ZERO OVERLAP with pizza) */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-start text-left">
        
        {/* Brand / Category label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100e] border border-[#2a241f] text-[#dfd0ba] text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfd0ba]" />
          <span>Pizzeria Artisanale • Alger</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#f7f2e7] leading-[1.12] tracking-tight mb-3.5">
          L’Italie rencontre l’Algérie.
        </h1>

        {/* Short supporting description */}
        <p className="text-sm sm:text-base text-[#cbb89d] font-light leading-relaxed mb-6 max-w-md">
          L’art noble de la pizza napolitaine au levain naturel, sublimé par la générosité et les épices authentiques de notre terroir algérois.
        </p>

        {/* Clear, High-Contrast Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mb-8">
          <button
            onClick={onNavigateToMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] active:scale-[0.98] text-[#0a0a0a] font-bold text-xs tracking-wider uppercase transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Voir le menu</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>

          <button
            onClick={onNavigateToReservation}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#12100e] hover:bg-[#1a1714] active:scale-[0.98] text-[#dfd0ba] border border-[#383129] font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#cbb89d]" />
            <span>Réserver une table</span>
          </button>
        </div>

      </div>

      {/* 2. STATIC FINAL EXPLODED PIZZA VISUAL (Extracted directly from original video)
          - No text over the pizza
          - No buttons over the pizza
          - No container boxes or visible borders
          - True black merge into #000000 background
          - Preserved proportions with all slices fully visible */}
      <div className="relative z-10 w-full max-w-md mx-auto aspect-[16/10] flex items-center justify-center mt-2">
        <img
          src="/assets/pizza_final_frame.jpg"
          alt="PIDZERIA - Pizza artisanale au feu de bois"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain pointer-events-none select-none"
          style={{
            mixBlendMode: 'screen',
          }}
        />
      </div>

      {/* Bottom subtle divider line */}
      <div className="w-full max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#26211c] to-transparent mt-8" />

    </section>
  );
};
