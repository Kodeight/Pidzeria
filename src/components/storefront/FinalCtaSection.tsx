import React from 'react';
import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';
import { FadeUp, Parallax } from '../motion/MotionSystem';

interface FinalCtaSectionProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  return (
    <section className="relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#050505] overflow-hidden border-t border-[#1a1714]">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={-0.15} className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px]">
          <div className="w-full h-full bg-[#dfd0ba]/5 rounded-full blur-[150px]" />
        </Parallax>
      </div>

      {/* Sequential Background Floating Ingredients */}
      <div className="absolute top-8 left-10 md:left-28 z-10 pointer-events-none">
        <FloatingIngredient ingredient="tomato" size={105} parallaxSpeed={30} rotationSpeed={15} blur={0.5} opacity={0.7} hideOnMobile />
      </div>
      <div className="absolute top-1/2 right-6 md:right-16 z-10 pointer-events-none -translate-y-1/2">
        <FloatingIngredient ingredient="basil" size={90} parallaxSpeed={-25} rotationSpeed={25} blur={0.5} opacity={0.75} hideOnMobile />
      </div>
      <div className="absolute bottom-8 right-8 md:right-32 z-10 pointer-events-none">
        <FloatingIngredient ingredient="pepperoni" size={115} parallaxSpeed={-40} rotationSpeed={-20} blur={0.5} opacity={0.8} hideOnMobile />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6">
        
        {/* 01 — Small Eyebrow Badge */}
        <FadeUp distance={20} delay={0.0} duration={0.65}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12100e] border border-[#2a241e] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#dfd0ba]" />
            <span>L’expérience artisanale</span>
          </div>
        </FadeUp>

        {/* 02 — Main Headline */}
        <FadeUp distance={20} delay={0.1} duration={0.65}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#f7f2e7] tracking-tight leading-[1.1]">
            Prêt à savourer l’authentique ?
          </h2>
        </FadeUp>

        {/* 03 — Supporting Sentence */}
        <FadeUp distance={20} delay={0.18} duration={0.65}>
          <p className="text-base sm:text-lg md:text-xl text-[#cbb89d] font-light max-w-2xl mx-auto leading-relaxed">
            Commandez vos pizzas en ligne pour emporter ou réservez votre table pour un moment d’exception au feu de bois.
          </p>
        </FadeUp>

        {/* 04 & 05 — Sequential Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <FadeUp distance={20} delay={0.28} duration={0.65} className="w-full sm:w-auto">
            <button
              onClick={onNavigateToMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-black/90 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
            >
              <span>Commander en ligne</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </FadeUp>

          <FadeUp distance={20} delay={0.36} duration={0.65} className="w-full sm:w-auto">
            <button
              onClick={onNavigateToReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#12100e]/90 hover:bg-[#1f1b18] text-[#dfd0ba] border border-[#3d3730] hover:border-[#dfd0ba] font-semibold text-xs sm:text-sm tracking-wider backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#cbb89d]" />
              <span>Réserver une table</span>
            </button>
          </FadeUp>
        </div>

      </div>
    </section>
  );
};
