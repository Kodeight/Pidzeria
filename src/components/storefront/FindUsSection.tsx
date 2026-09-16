import React from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { FloatingIngredient } from '../cinematic/FloatingIngredient';
import { FadeUp, FadeLeft, FadeRight } from '../motion/MotionSystem';

export const FindUsSection: React.FC = () => {
  return (
    <section id="nous-trouver" data-section="contact" className="scroll-mt-24 relative py-24 sm:py-32 px-5 sm:px-8 md:px-12 bg-[#000000] overflow-hidden border-t border-[#181512]">
      {/* Scroll anchor for #contact */}
      <div id="contact" className="absolute -top-24 left-0" />
      
      {/* Subtle floating ingredient depth */}
      <div className="absolute top-10 right-8 md:right-24 z-10">
        <FloatingIngredient ingredient="basil" size={120} parallaxSpeed={40} rotationSpeed={20} blur={0.5} opacity={0.8} hideOnMobile />
      </div>
      <div className="absolute bottom-12 left-6 md:left-20 z-10">
        <FloatingIngredient ingredient="olive" size={90} parallaxSpeed={-35} rotationSpeed={-15} blur={1} opacity={0.75} hideOnMobile />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* Header Sequential Stagger */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <FadeUp distance={18} delay={0.0} duration={0.65}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141210] border border-[#2a241e] text-[#dfd0ba] text-xs font-mono uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-[#dfd0ba]" />
              <span>Nous trouver</span>
            </div>
          </FadeUp>

          <FadeUp distance={18} delay={0.1} duration={0.65}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#f7f2e7] tracking-tight">
              Au cœur d'Alger Centre.
            </h2>
          </FadeUp>

          <FadeUp distance={18} delay={0.18} duration={0.65}>
            <p className="text-sm sm:text-base text-[#a69684] leading-relaxed font-light">
              Une adresse chaleureuse et raffinée pour déguster notre pizza napolitaine au feu de bois dans la pure tradition artisanale.
            </p>
          </FadeUp>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Information Cards */}
          <FadeLeft distance={-35} delay={0.1} duration={0.8} className="lg:col-span-5 flex flex-col justify-between gap-4">
            
            {/* Address */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0a09] border border-[#241f1a] hover:border-[#3d352c] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1a1613] text-[#dfd0ba] border border-[#2e2720] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c7e6c]">Adresse</span>
                  <h3 className="text-base font-bold text-[#f7f2e7]">14 Rue Didouche Mourad</h3>
                  <p className="text-xs text-[#a69684] leading-relaxed">
                    Alger Centre (à 2 minutes de la Grande Poste), Alger, Algérie
                  </p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0a09] border border-[#241f1a] hover:border-[#3d352c] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1a1613] text-[#dfd0ba] border border-[#2e2720] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c7e6c]">Horaires d’ouverture</span>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-[#f7f2e7]">Ouvert 7 jours / 7</h3>
                    <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#1b2518] text-[#8fd17d] border border-[#294223]">
                      En continu
                    </span>
                  </div>
                  <p className="text-xs text-[#a69684] leading-relaxed">
                    De 11h30 à 23h30 sans interruption.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Contact & Service */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0c0a09] border border-[#241f1a] hover:border-[#3d352c] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#1a1613] text-[#dfd0ba] border border-[#2e2720] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#8c7e6c]">Contact & Commandes</span>
                  <h3 className="text-base font-mono font-bold text-[#dfd0ba]">+213 (0)21 65 43 21</h3>
                  <p className="text-xs text-[#a69684]">
                    Réservations, commandes à emporter et renseignements.
                  </p>
                </div>
              </div>
            </div>

          </FadeLeft>

          {/* Stylized Visual Map Representation */}
          <FadeRight distance={35} delay={0.2} duration={0.8} className="lg:col-span-7 rounded-2xl bg-[#0c0a09] border border-[#241f1a] p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
            {/* Map background grid aesthetics */}
            <div 
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#dfd0ba 1px, transparent 1px), radial-gradient(#dfd0ba 1px, #0c0a09 1px)`,
                backgroundSize: '24px 24px',
                backgroundPosition: '0 0, 12px 12px',
              }}
            />

            {/* Top info overlay */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#dfd0ba] animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#dfd0ba]">
                  Four au feu de bois actif
                </span>
              </div>
              <div className="text-xs text-[#8c7e6c] font-mono">
                36.7753° N, 3.0588° E
              </div>
            </div>

            {/* Center Pin Artwork */}
            <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center py-8">
              <div className="w-16 h-16 rounded-full bg-[#181512] border-2 border-[#dfd0ba] flex items-center justify-center text-[#dfd0ba] shadow-[0_0_30px_rgba(223,208,186,0.25)] mb-4">
                <MapPin className="w-8 h-8 text-[#dfd0ba]" />
              </div>
              <h4 className="text-lg font-bold font-serif text-[#f7f2e7] mb-1">PIDZERIA ALGER</h4>
              <p className="text-xs text-[#cbb89d] max-w-sm">
                14 Rue Didouche Mourad • Salle climatisée & Terrasse conviviale
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#1f1a16]">
              <div className="text-xs text-[#8c7e6c] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#dfd0ba]" />
                <span>Stationnement & Métro à proximité immédiate</span>
              </div>
              <a
                href="https://maps.google.com/?q=Didouche+Mourad+Alger"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-[#181512] hover:bg-[#dfd0ba] hover:text-[#0a0a0a] text-[#dfd0ba] border border-[#3d3730] font-mono text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2"
              >
                <span>Ouvrir sur Google Maps</span>
              </a>
            </div>
          </FadeRight>

        </div>
      </div>
    </section>
  );
};
