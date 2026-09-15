import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PizzaVideoCompositor } from './PizzaVideoCompositor';
import { ArrowDown, ArrowUpRight, Calendar, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoryStageData {
  id: string;
  stepNumber: string;
  eyebrow: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  isHero?: boolean;
}

const CINEMATIC_STAGES: StoryStageData[] = [
  {
    id: 'hero',
    stepNumber: '01',
    eyebrow: 'PIZZERIA ARTISANALE • ALGER',
    headline: 'L’Italie rencontre l’Algérie.',
    description: 'L’art noble de la pizza napolitaine au levain naturel, sublimé par la générosité et les épices authentiques de notre terroir algérois.',
    specs: [
      { label: 'Farine', value: 'Italienne Tipo 00' },
      { label: 'Levain', value: 'Naturel 48H' },
      { label: 'Cuisson', value: 'Feu de bois 450°C' },
    ],
    isHero: true,
  },
  {
    id: 'pate',
    stepNumber: '02',
    eyebrow: 'ÉTAPE 01 • FERMENTATION LENTE',
    headline: 'Tout commence par une bonne pâte.',
    description: '48 heures de maturation lente au levain vivant. Une pâte aérienne, voluptueuse et hautement alvéolée, assurant une digestibilité totale et un parfum de blé grillé inimitable.',
    specs: [
      { label: 'Maturation', value: '48 Heures à froid' },
      { label: 'Hydratation', value: '72% haute teneur' },
      { label: 'Digestion', value: 'Légèreté absolue' },
    ],
  },
  {
    id: 'sauce',
    stepNumber: '03',
    eyebrow: 'ÉTAPE 02 • TERROIR VOLCANIQUE',
    headline: 'Une sauce préparée avec caractère.',
    description: 'Tomates San Marzano D.O.P. mûries sur les flancs ensoleillés du Vésuve, concassées à la main avec du basilic frais cueilli à l\'aube et un filet d\'huile d\'olive extra-vierge pressée à froid.',
    specs: [
      { label: 'Origine', value: 'San Marzano D.O.P.' },
      { label: 'Aromates', value: 'Basilic frais froissé' },
      { label: 'Équilibre', value: 'Acidité douce & solaire' },
    ],
  },
  {
    id: 'ingredients',
    stepNumber: '04',
    eyebrow: 'ÉTAPE 03 • LES INGRÉDIENTS NOBLES',
    headline: 'Des produits choisis avec soin.',
    description: 'Mozzarella Fior di Latte fraîche effilochée chaque matin, bœuf artisanal mariné et merguez assaisonnées selon la recette familiale d\'Alger, relevées d\'olives noires et de légumes confits.',
    specs: [
      { label: 'Fromage', value: 'Fior di Latte fraîche' },
      { label: 'Viandes', value: 'Recette maison d’Alger' },
      { label: 'Légumes', value: 'Poivrons rôtis au feu' },
    ],
  },
  {
    id: 'cuisson',
    stepNumber: '05',
    eyebrow: 'ÉTAPE 04 • LA COUPE & LE MOMENT',
    headline: 'Cuisson maîtrisée. L’explosion des saveurs.',
    description: 'Saisie à 450°C en 90 secondes sur pierre réfractaire. La croûte gonfle, se tache d\'un léopardage doré et croustillant. Les parts se détachent : le moment de dégustation commence.',
    specs: [
      { label: 'Température', value: 'Four à 450°C' },
      { label: 'Temps', value: '90 Secondes chrono' },
      { label: 'Texture', value: 'Croustillante & fondante' },
    ],
  },
];

interface CinematicExperienceProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Pin the viewport for 5 stages of continuous cinematic progression
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=450%',
      pin: true,
      scrub: 0.6,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map progress across the 5 narrative stages
        const stage = Math.min(
          CINEMATIC_STAGES.length - 1,
          Math.floor(p * CINEMATIC_STAGES.length)
        );
        setCurrentStageIdx(stage);
      },
    });

    return () => {
      st.kill();
    };
  }, []);

  const stage = CINEMATIC_STAGES[currentStageIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-between select-none"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Seamless top blend into header */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-30" />

      {/* Subtle warm atmospheric lighting (charcoal & warm cream backlight) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div 
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full blur-[160px] opacity-10"
          style={{ background: '#dfd0ba' }}
        />
        <div 
          className="absolute bottom-10 left-10 w-[450px] h-[450px] rounded-full blur-[140px] opacity-10"
          style={{ background: '#cbb89d' }}
        />
      </div>

      {/* TOP BAR: Subtle Narrative Progress Indicator & Live Status */}
      <div className="relative z-30 pt-20 sm:pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Stage counter pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#12100e]/80 border border-[#2d2823] backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfd0ba] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dfd0ba]"></span>
          </span>
          <span className="text-[11px] font-mono tracking-widest text-[#dfd0ba] uppercase font-semibold">
            {stage.stepNumber} / 05 • {stage.eyebrow}
          </span>
        </div>

        {/* Minimalist Progress Track in Warm Cream */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-[11px] font-mono text-[#8c7e6c] uppercase tracking-wider">Chapitre</span>
          <div className="w-28 bg-[#181614] h-[2px] rounded-full overflow-hidden border border-[#2e2924]">
            <div
              className="h-full transition-all duration-150 rounded-full"
              style={{
                width: `${scrollProgress * 100}%`,
                background: 'linear-gradient(90deg, #8c7e6c 0%, #dfd0ba 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* MAIN CINEMATIC STAGE: Editorial Content (Left) + Pizza Video (Right) */}
      <div className="relative z-20 my-auto px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Floating Editorial Typography (NO GIANT CARDS!) */}
        <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 text-left">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#dfd0ba]/80 uppercase mb-3">
            <span className="w-6 h-[1px] bg-[#dfd0ba]/40" />
            <span>{stage.eyebrow}</span>
          </div>

          {/* Large Editorial Headline with smooth keyframe transition */}
          <h1 
            key={`headline-${stage.id}`}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#f7f2e7] leading-[1.08] tracking-tight mb-5 transition-all duration-500 ease-out"
          >
            {stage.headline}
          </h1>

          {/* Supporting paragraph floating directly on dark canvas */}
          <p 
            key={`desc-${stage.id}`}
            className="text-sm sm:text-base md:text-lg text-[#cbb89d] font-light leading-relaxed max-w-xl mb-6 transition-all duration-500 ease-out"
          >
            {stage.description}
          </p>

          {/* Editorial Specs Bar */}
          <div 
            key={`specs-${stage.id}`}
            className="grid grid-cols-3 gap-3 pt-4 border-t border-[#26221d] mb-8 max-w-lg transition-all duration-500"
          >
            {stage.specs.map((s, idx) => (
              <div key={idx} className="space-y-0.5">
                <span className="text-[10px] uppercase font-mono text-[#8c7e6c] tracking-wider block">
                  {s.label}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#f7f2e7] block truncate">
                  {s.value}
                </span>
              </div>
            ))}
          </div>

          {/* Action CTAs tailored for Hero vs Final Stages */}
          {stage.isHero ? (
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onNavigateToMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-black/60 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
              >
                <span>Voir le menu</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>

              <button
                onClick={onNavigateToReservation}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#141210]/90 hover:bg-[#1f1c18] text-[#dfd0ba] border border-[#3d3730] font-semibold text-xs sm:text-sm tracking-wider backdrop-blur-xl hover:border-[#dfd0ba] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#cbb89d]" />
                <span>Réserver une table</span>
              </button>
            </div>
          ) : currentStageIdx >= 3 ? (
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateToMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-black/80 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
              >
                <span>Découvrir toutes les pizzas</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          ) : null}

        </div>

        {/* RIGHT COLUMN: The Continuous Shared Pizza Video Layer */}
        <div className="lg:col-span-6 flex items-center justify-center order-1 lg:order-2 h-[280px] sm:h-[380px] md:h-[460px] lg:h-[520px]">
          <PizzaVideoCompositor
            scrollProgress={scrollProgress}
          />
        </div>

      </div>

      {/* BOTTOM BAR: Scroll prompt & instruction indicator */}
      <div className="relative z-30 pb-6 sm:pb-8 px-6 text-center">
        <div className="inline-flex flex-col items-center gap-1.5 text-[#8c7e6c] hover:text-[#dfd0ba] transition-colors">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-mono">
            {scrollProgress >= 0.92
              ? 'Faites défiler pour explorer la carte et nos histoires'
              : 'Faites défiler pour vivre la cuisson'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#dfd0ba]" />
        </div>
      </div>

      {/* Seamless bottom blend into next sections */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-30" />
    </div>
  );
};
