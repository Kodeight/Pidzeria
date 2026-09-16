import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, MessageSquareQuote, MapPin, Utensils } from 'lucide-react';
import { FadeUp, StaggerReveal } from '../motion/MotionSystem';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="avis" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full relative overflow-hidden">
      {/* FLOATING INGREDIENT: Kalamata Olive hovering top right of testimonials */}
      <div className="absolute -top-6 right-4 md:right-12 pointer-events-none z-0">
        <FloatingIngredient
          ingredient="olive"
          size={85}
          parallaxSpeed={-50}
          rotationSpeed={35}
          opacity={0.7}
        />
      </div>

      <FadeUp distance={30} className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161311] border border-[#2d2823] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest mb-4">
          <MessageSquareQuote className="w-3.5 h-3.5 text-[#cbb89d]" />
          <span>Avis Vérifiés</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#f7f2e7] mb-4">
          Ils en parlent mieux que nous.
        </h2>
        <p className="text-[#a69684] text-sm sm:text-base">
          Découvrez les retours authentiques de nos clients fidèles à Alger.
        </p>
      </FadeUp>

      <StaggerReveal staggerDelay={0.15} duration={0.8} distance={35} className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {TESTIMONIALS.map(item => (
          <div 
            key={item.id}
            className="glass-panel p-8 rounded-3xl border border-[#26221d] hover:border-[#dfd0ba]/40 transition-all duration-300 flex flex-col justify-between hover:scale-[1.01] bg-[#0c0a09]"
          >
            <div>
              {/* Rating stars in warm gold */}
              <div className="flex items-center gap-1 text-[#dfd0ba] mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-[#f7f2e7] text-sm leading-relaxed mb-6 font-serif italic">
                "{item.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#221e1a] flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-[#3d3730] shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-[#f7f2e7]">{item.name}</h4>
                <div className="flex items-center gap-1 text-xs text-[#8c7e6c]">
                  <MapPin className="w-3 h-3 text-[#cbb89d]" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#dfd0ba] mt-0.5">
                  <Utensils className="w-3 h-3 text-[#cbb89d]" />
                  <span>Coup de cœur : {item.favoritePizza}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </section>
  );
};
