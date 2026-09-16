import React from 'react';
import { Flame, Sparkles, Wheat, Timer, Award, ShieldCheck } from 'lucide-react';
import { FadeLeft, FadeRight, FadeUp } from '../motion/MotionSystem';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';

export const PhilosophySection: React.FC = () => {
  return (
    <section 
      id="philosophie" 
      className="scroll-mt-24 py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#050505] relative overflow-hidden border-t border-[#181512]"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#dfd0ba]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Ingredient */}
      <div className="absolute top-16 right-6 md:right-20 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="basil"
          size={100}
          parallaxSpeed={-50}
          rotationSpeed={25}
          opacity={0.75}
          hideOnMobile
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        {/* Section Header: Sequential Stagger */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4">
          <FadeUp distance={20} delay={0.0} duration={0.7}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#141210] border border-[#2a241f] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#dfd0ba]" />
              <span>Savoir-Faire & Philosophie</span>
            </div>
          </FadeUp>

          <FadeUp distance={20} delay={0.1} duration={0.7}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#f7f2e7] tracking-tight leading-tight">
              Le Goût de l'Artisanat Pur.
            </h2>
          </FadeUp>

          <FadeUp distance={20} delay={0.18} duration={0.7}>
            <p className="text-sm sm:text-base md:text-lg text-[#cbb89d] font-light leading-relaxed">
              Chaque geste compte. Du choix des graines de blé ancien à la flamme vive de notre four, nous célébrons le temps long et la précision culinaire.
            </p>
          </FadeUp>
        </div>

        {/* 3 Pillars of Craftsmanship: Sequential Staggered Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {/* Pillar 1 */}
          <FadeUp distance={30} delay={0.1} duration={0.75} className="h-full">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0c0a09] border border-[#241f1a] hover:border-[#dfd0ba]/40 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#161311] border border-[#2e2720] text-[#dfd0ba] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Timer className="w-6 h-6 text-[#dfd0ba]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f7f2e7] mb-3">
                  Maturation 48 Heures
                </h3>
                <p className="text-xs sm:text-sm text-[#a69684] leading-relaxed font-light">
                  Une fermentation lente au levain naturel développant des alvéoles aériennes, une digestibilité incomparable et un croustillant doré inégalé.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1f1a16] flex items-center gap-2 text-[11px] font-mono text-[#dfd0ba]">
                <Wheat className="w-3.5 h-3.5 text-[#dfd0ba]" />
                <span>Farines nobles Tipo 00 & Blé dur</span>
              </div>
            </div>
          </FadeUp>

          {/* Pillar 2 */}
          <FadeUp distance={30} delay={0.2} duration={0.75} className="h-full">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0c0a09] border border-[#241f1a] hover:border-[#dfd0ba]/40 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#161311] border border-[#2e2720] text-[#dfd0ba] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Award className="w-6 h-6 text-[#dfd0ba]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f7f2e7] mb-3">
                  Ingrédients Sans Concession
                </h3>
                <p className="text-xs sm:text-sm text-[#a69684] leading-relaxed font-light">
                  Tomates San Marzano D.O.P., mozzarella Fior di Latte fraîche, merguez maison préparées à la main selon la recette traditionnelle algéroise.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1f1a16] flex items-center gap-2 text-[11px] font-mono text-[#dfd0ba]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfd0ba]" />
                <span>100% Frais • Zéro Surgelé</span>
              </div>
            </div>
          </FadeUp>

          {/* Pillar 3 */}
          <FadeUp distance={30} delay={0.3} duration={0.75} className="h-full">
            <div className="p-7 sm:p-8 rounded-3xl bg-[#0c0a09] border border-[#241f1a] hover:border-[#dfd0ba]/40 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#161311] border border-[#2e2720] text-[#dfd0ba] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  <Flame className="w-6 h-6 text-[#dfd0ba]" />
                </div>
                <h3 className="text-xl font-serif font-bold text-[#f7f2e7] mb-3">
                  Flamme Vive à 450°C
                </h3>
                <p className="text-xs sm:text-sm text-[#a69684] leading-relaxed font-light">
                  Saisie en 90 secondes sur pierre réfractaire pour figer les arômes et préserver l'onctuosité des garnitures sans dessécher la pâte.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-[#1f1a16] flex items-center gap-2 text-[11px] font-mono text-[#dfd0ba]">
                <Flame className="w-3.5 h-3.5 text-[#dfd0ba]" />
                <span>Bois de chêne & cuisson authentique</span>
              </div>
            </div>
          </FadeUp>
        </div>

        {/* Editorial Visual Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <FadeLeft distance={-35} delay={0.1} duration={0.8} className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden border border-[#2e2823] aspect-[16/10] group">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop"
                alt="Four à bois traditionnel PIDZERIA"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs font-mono text-[#dfd0ba]">
                <span>PIDZERIA • Cité d’Alger</span>
                <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#3d3730]">
                  Four au bois traditionnel
                </span>
              </div>
            </div>
          </FadeLeft>

          <FadeRight distance={35} delay={0.2} duration={0.8} className="lg:col-span-5 space-y-5">
            <h4 className="text-2xl sm:text-3xl font-serif font-bold text-[#f7f2e7] leading-snug">
              Une alchimie entre authenticité et passion méditerranéenne
            </h4>
            <p className="text-xs sm:text-sm text-[#cbb89d] leading-relaxed font-light">
              Chez PIDZERIA, nous honorons chaque étape de la panification. De la sélection de l’eau à la température exacte du four, nous garantissons une texture inimitable : une croûte léopardée croustillante à l'extérieur et moelleuse à cœur.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-[#12100e] border border-[#2a241f] text-xs font-serif italic text-[#dfd0ba]">
                <span>"Le respect du produit donne naissance au plaisir absolu."</span>
              </div>
            </div>
          </FadeRight>
        </div>

      </div>
    </section>
  );
};
