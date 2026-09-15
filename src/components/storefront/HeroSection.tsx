import React from 'react';
import { Logo } from '../brand/Logo';
import { Utensils, Calendar, Leaf, Flame, ShieldCheck, Award } from 'lucide-react';
import { FadeUp, Parallax, StaggerReveal, ScaleReveal } from '../motion/MotionSystem';

interface HeroSectionProps {
  onGoToMenu: () => void;
  onGoToReservation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onGoToMenu, onGoToReservation }) => {
  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden bg-[#070907]">
      
      {/* Layer 1: BACKGROUND Parallax Ambient Natural Glows (Organic Olive & Basil) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={-0.2} className="absolute top-1/6 left-1/2 -translate-x-1/2 w-[700px] h-[700px]">
          <div className="w-full h-full bg-[#547734]/10 rounded-full blur-[140px]" />
        </Parallax>
        
        <Parallax speed={0.15} className="absolute -bottom-24 left-1/4 w-[500px] h-[500px]">
          <div className="w-full h-full bg-[#364e22]/12 rounded-full blur-[120px]" />
        </Parallax>
      </div>

      {/* Layer 2: MIDGROUND Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Top Feature Pill - Authentic Leaf / Heritage badge without AI sparkle */}
        <FadeUp delay={0.05} distance={20}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#547734]/15 border border-[#547734]/30 text-[#9bc774] text-xs font-mono tracking-widest uppercase mb-8 shadow-xl backdrop-blur-md">
            <Leaf className="w-3.5 h-3.5 text-[#7db352]" />
            <span>Pizzeria Artisanale • Alger</span>
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-extrabold text-[#fbf7ee] leading-[1.1] mb-6 tracking-tight">
            L’Italie rencontre <span className="text-gradient-leaf">l’Algérie</span>.
          </h1>
        </FadeUp>

        {/* Supporting text */}
        <FadeUp delay={0.32} distance={30}>
          <p className="max-w-2xl text-[#cfc0a7] text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10">
            Des pizzas au levain naturel cuites au feu de bois, des ingrédients frais sélectionnés avec exigence et une générosité authentique.
          </p>
        </FadeUp>

        {/* Action Buttons in Brand Leaf Green & Warm Ivory */}
        <FadeUp delay={0.42} distance={25}>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
            <button
              onClick={onGoToMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-xl shadow-[#547734]/25 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 cursor-pointer"
            >
              <Utensils className="w-4 h-4" />
              <span>Consulter le Menu</span>
            </button>

            <button
              onClick={onGoToReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#121813]/90 hover:bg-[#1a231b] text-[#f2e5ce] border border-[#547734]/35 font-semibold text-sm sm:text-base tracking-wider backdrop-blur-xl hover:border-[#74a148] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
            >
              <Calendar className="w-4 h-4 text-[#8ec062]" />
              <span>Réserver une Table</span>
            </button>
          </div>
        </FadeUp>

        {/* Trust Badges Staggered with Leaf Green accents */}
        <StaggerReveal staggerDelay={0.12} duration={0.8} distance={30} className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          <div className="glass-panel p-4 rounded-2xl border border-[#243326] flex items-center gap-3.5 text-left hover:border-[#547734]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#547734]/15 text-[#9bc774]">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#f2e5ce] uppercase tracking-wider">Cuisson Feu de Bois</h4>
              <p className="text-[12px] text-[#a89c89]">Four à pierre à 450°C</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#243326] flex items-center gap-3.5 text-left hover:border-[#547734]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#547734]/15 text-[#9bc774]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#f2e5ce] uppercase tracking-wider">100% Ingrédients Frais</h4>
              <p className="text-[12px] text-[#a89c89]">Farines & fromages nobles</p>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-[#243326] flex items-center gap-3.5 text-left hover:border-[#547734]/40 transition-colors">
            <div className="p-2.5 rounded-xl bg-[#547734]/15 text-[#9bc774]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#f2e5ce] uppercase tracking-wider">Spécialité Carrée</h4>
              <p className="text-[12px] text-[#a89c89]">Traditionnelle d'Alger</p>
            </div>
          </div>
        </StaggerReveal>

      </div>
    </section>
  );
};
