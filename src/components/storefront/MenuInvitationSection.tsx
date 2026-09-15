import React from 'react';
import { ArrowRight, Utensils, Award, Sparkles } from 'lucide-react';

interface MenuInvitationSectionProps {
  onGoToMenu: () => void;
}

export const MenuInvitationSection: React.FC<MenuInvitationSectionProps> = ({ onGoToMenu }) => {
  return (
    <section className="relative py-20 md:py-28 px-6 md:px-12 bg-black border-t border-[#1f1b18] overflow-hidden">
      {/* Subtle warm ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] opacity-10"
          style={{ background: '#dfd0ba' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161311] border border-[#2e2924] text-[#dfd0ba] text-xs font-mono tracking-widest uppercase mb-6">
          <Award className="w-3.5 h-3.5 text-[#cbb89d]" />
          <span>La Carte Complète PIDZERIA</span>
        </div>

        {/* Large Editorial Heading */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-bold text-[#f7f2e7] tracking-tight mb-5 max-w-3xl leading-[1.15]">
          Découvrez nos créations artisanales.
        </h2>

        {/* Subtitle */}
        <p className="text-[#cbb89d] text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-10">
          De la ronde napolitaine à la généreuse pizza carrée d'Alger, chaque recette est confectionnée à la commande avec des farines nobles, nos sauces mijotées et nos viandes savamment marinées.
        </p>

        {/* Big Prominent CTA leading to /menu */}
        <button
          onClick={onGoToMenu}
          className="px-10 py-5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-extrabold text-sm sm:text-base tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-black/90 hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
        >
          <Utensils className="w-4 h-4 text-black" />
          <span>Voir le menu complet</span>
          <ArrowRight className="w-4 h-4 text-black" />
        </button>

        {/* Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-[#1f1c19] w-full text-left">
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#f7f2e7]">48h</span>
            <p className="text-xs text-[#8c7e6c] leading-relaxed">Fermentation lente au levain naturel</p>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#f7f2e7]">450°C</span>
            <p className="text-xs text-[#8c7e6c] leading-relaxed">Cuisson au feu de bois sur pierre</p>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#f7f2e7]">100%</span>
            <p className="text-xs text-[#8c7e6c] leading-relaxed">San Marzano D.O.P. & Fior di Latte</p>
          </div>
          <div className="space-y-1">
            <span className="text-xl sm:text-2xl font-serif font-bold text-[#f7f2e7]">Alger</span>
            <p className="text-xs text-[#8c7e6c] leading-relaxed">Recettes familiales & épices du terroir</p>
          </div>
        </div>

      </div>
    </section>
  );
};
