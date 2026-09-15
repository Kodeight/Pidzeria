import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, MessageSquareQuote, MapPin, Pizza } from 'lucide-react';
import { FadeUp, StaggerReveal } from '../motion/MotionSystem';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="avis" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeUp distance={30} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#547734]/15 border border-[#547734]/30 text-[#9bc774] text-xs font-mono uppercase tracking-widest mb-4">
          <MessageSquareQuote className="w-3.5 h-3.5 text-[#7db352]" />
          <span>Avis Clients</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-[#fbf7ee] mb-4">
          Ils en parlent mieux que nous.
        </h2>
        <p className="text-[#a89c89] text-sm sm:text-base">
          Découvrez les retours authentiques de nos clients fidèles à Alger.
        </p>
      </FadeUp>

      <StaggerReveal staggerDelay={0.15} duration={0.8} distance={35} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map(item => (
          <div 
            key={item.id}
            className="glass-panel p-8 rounded-3xl border border-[#243326] hover:border-[#547734]/40 transition-all duration-300 flex flex-col justify-between hover:scale-[1.01]"
          >
            <div>
              {/* Rating stars */}
              <div className="flex items-center gap-1 text-[#d4b067] mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-[#f2e5ce] text-sm leading-relaxed mb-6 font-serif italic">
                "{item.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-[#243326] flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-[#547734]/40 shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-[#fbf7ee]">{item.name}</h4>
                <div className="flex items-center gap-1 text-xs text-[#8a988c]">
                  <MapPin className="w-3 h-3 text-[#7db352]" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#9bc774] mt-0.5">
                  <Pizza className="w-3 h-3" />
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
