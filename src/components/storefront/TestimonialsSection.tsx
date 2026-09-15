import React from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, MessageSquareQuote, MapPin, Pizza } from 'lucide-react';
import { FadeUp, StaggerReveal } from '../motion/MotionSystem';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="avis" className="py-24 px-6 md:px-12 max-w-7xl mx-auto w-full">
      <FadeUp distance={30} className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-widest mb-4">
          <MessageSquareQuote className="w-3.5 h-3.5" />
          <span>Avis Clients</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif font-extrabold text-amber-50 mb-4">
          Ils en parlent mieux que nous.
        </h2>
        <p className="text-stone-300 text-sm sm:text-base">
          Découvrez les témoignages authentiques de nos clients passionnés à Alger.
        </p>
      </FadeUp>

      <StaggerReveal staggerDelay={0.15} duration={0.8} distance={35} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {TESTIMONIALS.map(item => (
          <div 
            key={item.id}
            className="glass-panel p-8 rounded-3xl border border-stone-800 hover:border-amber-500/30 transition-all duration-300 flex flex-col justify-between hover:scale-[1.01]"
          >
            <div>
              {/* Rating stars */}
              <div className="flex items-center gap-1 text-amber-400 mb-6">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-stone-200 text-sm leading-relaxed mb-6 font-serif italic">
                "{item.review}"
              </p>
            </div>

            <div className="pt-4 border-t border-stone-800/80 flex items-center gap-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border border-amber-500/30 shrink-0"
              />
              <div>
                <h4 className="text-sm font-bold text-amber-50">{item.name}</h4>
                <div className="flex items-center gap-1 text-xs text-stone-400">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>{item.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400/80 mt-0.5">
                  <Pizza className="w-3 h-3" />
                  <span>Pizza coup de cœur : {item.favoritePizza}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </StaggerReveal>
    </section>
  );
};
