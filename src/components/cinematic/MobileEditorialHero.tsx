import React from 'react';
import { ArrowUpRight, Calendar, Flame, Sparkles } from 'lucide-react';
import mobilePizzaImg from '../../assets/images/artisan_mobile_pizza_1789519581472.jpg';

interface MobileEditorialHeroProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export const MobileEditorialHero: React.FC<MobileEditorialHeroProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  return (
    <section className="relative w-full min-h-[90vh] bg-[#000000] pt-28 pb-14 px-5 sm:px-8 flex flex-col justify-between overflow-hidden select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#dfd0ba]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. EDITORIAL TEXT CONTENT (Dedicated Upper Safe Zone — ZERO OVERLAP with pizza) */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-start text-left">
        
        {/* Brand / Category label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100e] border border-[#2a241f] text-[#dfd0ba] text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfd0ba] animate-pulse" />
          <span>Pizzeria Artisanale • Alger</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#f7f2e7] leading-[1.12] tracking-tight mb-3">
          L’Italie rencontre l’Algérie.
        </h1>

        {/* Short supporting description */}
        <p className="text-sm sm:text-base text-[#cbb89d] font-light leading-relaxed mb-6 max-w-md">
          L’art noble de la pizza napolitaine au levain naturel, sublimé par la générosité et les épices authentiques de notre terroir algérois.
        </p>

        {/* Clear, High-Contrast Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mb-6">
          <button
            onClick={onNavigateToMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] active:scale-[0.98] text-[#0a0a0a] font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-black/80 flex items-center justify-center gap-2 cursor-pointer"
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

        {/* Artisanal Feature Badges */}
        <div className="flex items-center gap-2.5 text-[11px] font-mono text-[#8c7e6c] pt-2 pb-1 overflow-x-auto no-scrollbar w-full">
          <span className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-md bg-[#100e0d] border border-[#221d18]">
            <Flame className="w-3 h-3 text-[#dfd0ba]" />
            <span>Feu de bois 450°C</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-md bg-[#100e0d] border border-[#221d18]">
            <Sparkles className="w-3 h-3 text-[#dfd0ba]" />
            <span>Levain 48H</span>
          </span>
          <span className="shrink-0 px-2.5 py-1 rounded-md bg-[#100e0d] border border-[#221d18]">
            Farine Tipo 00
          </span>
        </div>

      </div>

      {/* 2. ARTISANAL WHOLE PIZZA VISUAL
          - Top-down artisan pizza with charred cornicione and fresh basil
          - Seamlessly blended on pure matte black background
          - Preserved proportions with natural warm lighting */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-md mx-auto aspect-square flex items-center justify-center mt-6">
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={mobilePizzaImg}
            alt="PIDZERIA - Pizza artisanale au feu de bois à Alger"
            loading="eager"
            decoding="async"
            className="w-full h-full object-contain rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.95)] pointer-events-none select-none transition-transform duration-700"
          />
        </div>
      </div>

      {/* Bottom subtle divider line */}
      <div className="w-full max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#26211c] to-transparent mt-8" />

    </section>
  );
};
