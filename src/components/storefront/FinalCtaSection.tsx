import React from 'react';
import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';
import { FadeUp } from '../motion/MotionSystem';

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
      {/* Floating ingredients */}
      <div className="absolute top-8 left-10 md:left-28 z-10">
        <FloatingIngredient ingredient="tomato" size={105} parallaxSpeed={30} rotationSpeed={15} blur={1} opacity={0.7} hideOnMobile />
      </div>
      <div className="absolute bottom-8 right-8 md:right-32 z-10">
        <FloatingIngredient ingredient="pepperoni" size={115} parallaxSpeed={-40} rotationSpeed={-20} blur={0.5} opacity={0.8} hideOnMobile />
      </div>

      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6">
        
        {/* Badge */}
        <FadeUp distance={20} delay={0.0} duration={0.65}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12100e] border border-[#2a241e] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#dfd0ba]" />
            <span>L’expérience artisanale</span>
          </div>
        </FadeUp>

        {/* Big Editorial Heading */}
        <FadeUp distance={20} delay={0.1} duration={0.65}>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-extrabold text-[#f7f2e7] tracking-tight leading-[1.1]">
            Prêt à savourer l’authentique ?
          </h2>
        </FadeUp>

        {/* Subtitle */}
        <FadeUp distance={20} delay={0.18} duration={0.65}>
          <p className="text-base sm:text-lg md:text-xl text-[#cbb89d] font-light max-w-2xl mx-auto leading-relaxed">
            Commandez vos pizzas en ligne pour emporter ou réservez votre table pour un moment d’exception au feu de bois.
          </p>
        </FadeUp>

        {/* Call to Actions */}
        <FadeUp distance={20} delay={0.28} duration={0.65}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onNavigateToMenu}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-black/90 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
            >
              <span>Commander en ligne</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>

            <button
              onClick={onNavigateToReservation}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#12100e]/90 hover:bg-[#1f1b18] text-[#dfd0ba] border border-[#3d3730] hover:border-[#dfd0ba] font-semibold text-xs sm:text-sm tracking-wider backdrop-blur-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#cbb89d]" />
              <span>Réserver une table</span>
            </button>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};
