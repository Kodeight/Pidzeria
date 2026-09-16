import React from 'react';
import { Logo } from '../brand/Logo';
import { ChefHat, HeartHandshake, Compass } from 'lucide-react';
import { FadeLeft, FadeRight, Parallax } from '../motion/MotionSystem';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';

export const StorySection: React.FC = () => {
  return (
    <section id="histoire" className="py-28 px-6 md:px-12 bg-black relative overflow-hidden border-y border-[#1c1916]">
      {/* Background subtle parallax ambient warm glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Parallax speed={-0.2} className="absolute -top-32 right-10 w-[550px] h-[550px]">
          <div className="w-full h-full bg-[#dfd0ba]/5 rounded-full blur-[140px]" />
        </Parallax>
      </div>

      {/* FLOATING INGREDIENTS */}
      {/* 1. Fresh Cremini Mushroom slice hovering near right frame */}
      <div className="absolute top-16 right-6 md:right-16 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="mushroom"
          size={115}
          parallaxSpeed={-65}
          rotationSpeed={20}
          opacity={0.8}
        />
      </div>

      {/* 2. Italian Basil leaf drifting along the lower story boundary */}
      <div className="absolute bottom-12 left-6 md:left-20 pointer-events-none z-10">
        <FloatingIngredient
          ingredient="basil"
          size={95}
          parallaxSpeed={70}
          rotationSpeed={-30}
          opacity={0.75}
          hideOnMobile
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-20">
        
        {/* Left Column: Story Content with FADE-LEFT */}
        <FadeLeft distance={-50} duration={1.0} className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161311] border border-[#2d2823] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest">
            <Compass className="w-3.5 h-3.5 text-[#cbb89d]" />
            <span>Notre Philosophie</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#f7f2e7] leading-tight">
            L'Alliance de deux Terroirs d'Exception
          </h2>

          <p className="text-[#cbb89d] text-sm sm:text-base leading-relaxed">
            Fondée au cœur d’Alger, <strong className="text-[#f7f2e7] font-bold">PIDZERIA</strong> est née d’une passion inébranlable : unir le savoir-faire séculaire de la véritable pizza napolitaine au levain et la générosité vibrante des saveurs algériennes.
          </p>

          <p className="text-[#cbb89d] text-sm sm:text-base leading-relaxed">
            Nous sélectionnons rigoureusement nos farines de blé dur de haute qualité, nos tomates San Marzano mûries au soleil et la mozzarella Fior di Latte la plus fondante. Chaque garniture est préparée artisanalement avec des produits frais du terroir.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-[#0f0d0c] border border-[#26221d] flex items-start gap-3 hover:border-[#dfd0ba]/40 transition-colors">
              <ChefHat className="w-5 h-5 text-[#dfd0ba] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-[#f7f2e7] uppercase">Pétrissage Artisanal</h4>
                <p className="text-[11px] text-[#8c7e6c] mt-0.5">Maturation lente 48h</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0f0d0c] border border-[#26221d] flex items-start gap-3 hover:border-[#dfd0ba]/40 transition-colors">
              <HeartHandshake className="w-5 h-5 text-[#dfd0ba] shrink-0 mt-1" />
              <div>
                <h4 className="text-xs font-bold text-[#f7f2e7] uppercase">Recettes Nobles</h4>
                <p className="text-[11px] text-[#8c7e6c] mt-0.5">Produits frais du marché</p>
              </div>
            </div>
          </div>
        </FadeLeft>

        {/* Right Column: Visual Showcase with FADE-RIGHT & Subtle Parallax */}
        <FadeRight distance={50} duration={1.0} className="lg:col-span-6 relative">
          <div className="relative mx-auto max-w-md aspect-square rounded-3xl overflow-hidden border border-[#2e2823] shadow-2xl group">
            <img
              src="https://images.unsplash.com/photo-1579751626657-72bc17010498?q=80&w=800&auto=format&fit=crop"
              alt="Maître pizzaiolo PIDZERIA"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
            
            <div className="absolute bottom-6 left-6 right-6 p-6 glass-panel rounded-2xl border border-[#3d3730]">
              <Logo size="sm" className="mb-2" />
              <p className="text-xs text-[#dfd0ba] italic font-serif leading-relaxed">
                "Cuire une pizza n'est pas une simple recette, c'est une promesse de générosité et d'émotion à chaque bouchée."
              </p>
            </div>
          </div>
        </FadeRight>

      </div>
    </section>
  );
};
