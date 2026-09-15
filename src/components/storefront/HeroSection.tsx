import React from 'react';
import { Logo } from '../brand/Logo';
import { Utensils, Calendar, Sparkles, Flame, ShieldCheck, Award } from 'lucide-react';
import { FadeUp, Parallax, StaggerReveal, ScaleReveal } from '../motion/MotionSystem';

interface HeroSectionProps {
  onGoToMenu: () => void;
  onGoToReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGoToMenu, onGoToReservation }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden bg-[#070606]">
      
      {/* Layer 1: BACKGROUND Parallax Ambient Glows & Atmosphere */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={-0.25} className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[800px] h-[800px]">
          <div className="w-full h-full bg-gradient-to-br from-amber-600/15 via-red-600/10 to-transparent rounded-full blur-[150px]" />
        </Parallax>
        
        <Parallax speed={0.15} className="absolute -bottom-24 left-1/5 w-[600px] h-[600px]">
          <div className="w-full h-full bg-emerald-600/5 rounded-full blur-[130px]" />
        </Parallax>
      </div>

      {/* Layer 2: MIDGROUND Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Feature Pill */}
        <FadeUp delay={0.05} distance={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/20 text-amber-300 text-xs font-mono tracking-widest uppercase mb-8 shadow-xl backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>L'Artisanat de la Pizza à Alger</span>
          </div>
        </FadeUp>

        {/* Large Official PIDZERIA Logo */}
        <ScaleReveal delay={0.12} duration={1.1} initialScale={0.92} className="mb-8">
          <div className="scale-95 sm:scale-100 transform transition-transform hover:scale-[1.02] duration-500">
            <Logo size="xl" />
          </div>
        </ScaleReveal>

        {/* Headline */}
        <FadeUp delay={0.22} distance={35}>
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-amber-50 leading-[1.1] mb-6 tracking-tight">
            L’Italie rencontre <span className="text-gradient-gold">l’Algérie</span>.
          </h1>
        </FadeUp>

        {/* Supporting text */}
        <FadeUp delay={0.32} distance={30}>
          <p className="max-w-2xl text-stone-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10">
            Des pizzas authentiques, des recettes généreuses et une passion dévorante pour le goût. Découvrez nos créations napolitaines et nos fameuses carrées algéroises.
          </p>
        </FadeUp>

        {/* Action Buttons */}
        <FadeUp delay={0.42} distance={25}>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <button
              onClick={onGoToMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-stone-950 font-extrabold text-base tracking-wide shadow-2xl shadow-amber-500/30 hover:scale-[1.03] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Utensils className="w-5 h-5" />
              <span>Voir le Menu</span>
            </button>

            <button
              onClick={onGoToReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-stone-900/90 hover:bg-stone-800 text-amber-200 border border-amber-500/30 font-semibold text-base tracking-wide backdrop-blur-xl hover:border-amber-400 transition-all flex items-center justify-center gap-3 cursor-pointer shadow-xl"
            >
              <Calendar className="w-5 h-5 text-amber-400" />
              <span>Réserver une Table</span>
            </button>
          </div>
        </FadeUp>

        {/* Trust Badges Staggered */}
        <StaggerReveal staggerDelay={0.12} duration={0.8} distance={30} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left hover:border-amber-500/30 transition-colors">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">Cuisson Feu de Bois</h4>
              <p className="text-[12px] text-stone-400">Four à pierre à 450°C</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left hover:border-emerald-500/30 transition-colors">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">100% Ingrédients Frais</h4>
              <p className="text-[12px] text-stone-400">Farines & Fromages d'exception</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center gap-3.5 text-left hover:border-red-500/30 transition-colors">
            <div className="p-2.5 rounded-xl bg-red-500/10 text-red-400">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-stone-200 uppercase tracking-wider">Spécialité Carrée</h4>
              <p className="text-[12px] text-stone-400">Recette traditionnelle d'Alger</p>
            </div>
          </div>
        </StaggerReveal>

      </div>
    </section>
  );
};
