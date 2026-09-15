import React from 'react';
import { Logo } from '../brand/Logo';
import { ChefHat, HeartHandshake, Compass } from 'lucide-react';
import { FadeLeft, FadeRight, Parallax } from '../motion/MotionSystem';

export const StorySection: React.FC = () => {
  return (
    <section id="histoire" className="py-28 px-6 md:px-12 bg-gradient-to-b from-[#070606] via-[#0d0b0b] to-[#070606] relative overflow-hidden border-y border-stone-800/40">
      {/* Background subtle parallax ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={-0.2} className="absolute -top-32 right-10 w-[550px] h-[550px]">
          <div className="w-full h-full bg-amber-500/5 rounded-full blur-[140px]" />
        </Parallax>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Story Content with FADE-LEFT */}
        <FadeLeft distance={-50} duration={1.0} className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5" />
            <span>Notre Philosophie</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-50 leading-tight">
            L'Alliance de deux Terroirs d'Exception
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Fondée au cœur d’Alger, <strong className="text-amber-400 font-bold">PIDZERIA</strong> est née d’une passion inébranlable : unir le savoir-faire ancestral de la véritable pizza italienne napolitaine et la richesse des saveurs algériennes.
          </p>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Nous sélectionnons rigoureusement nos farines de blé dur, nos tomates San Marzano mûries au soleil et la mozzarella Fior di Latte la plus crémeuse. Chaque merguez est préparée artisanalement par nos maîtres bouchers à Alger, assaisonnée d'épices locales.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3 hover:border-amber-500/30 transition-colors">
              <ChefHat className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-stone-200 uppercase">Pétrissage Artisanal</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Maturation lente 48h</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-stone-900/80 border border-stone-800 flex items-start gap-3 hover:border-emerald-500/30 transition-colors">
              <HeartHandshake className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-stone-200 uppercase">Recettes Généreuses</h4>
                <p className="text-[11px] text-stone-400 mt-0.5">Produits frais du marché</p>
              </div>
            </div>
          </div>
        </FadeLeft>

        {/* Right Column: Visual Showcase with FADE-RIGHT & Subtle Parallax */}
        <FadeRight distance={50} duration={1.0} className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden border border-amber-500/20 shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop"
              alt="Maître pizzaiolo PIDZERIA"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-85" />
            
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel-gold rounded-2xl border border-amber-500/30">
              <Logo size="sm" className="mb-2" />
              <p className="text-xs text-amber-200/90 italic font-serif leading-relaxed">
                "Cuire une pizza n'est pas une simple recette, c'est une promesse de générosité et d'émotion à chaque bouchée."
              </p>
            </div>
          </div>
        </FadeRight>

      </div>
    </section>
  );
};
