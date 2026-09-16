import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PizzaVideoCompositor } from './PizzaVideoCompositor';
import { ArrowDown, ArrowUpRight, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StoryStageData {
  id: string;
  stepNumber: string;
  eyebrow: string;
  headline: string;
  description: string;
  specs: { label: string; value: string }[];
  textAlignment: 'left' | 'right';
  isHero?: boolean;
  isClimax?: boolean;
}

// 7 Distinct Narrative Stages
const CINEMATIC_STAGES: StoryStageData[] = [
  {
    id: 'hero',
    stepNumber: '01',
    eyebrow: '',
    headline: 'L’Italie rencontre l’Algérie.',
    description: 'L’art noble de la pizza napolitaine au levain naturel, sublimé par la générosité et les épices authentiques de notre terroir algérois.',
    specs: [
      { label: 'Farine', value: 'Italienne Tipo 00' },
      { label: 'Levain', value: 'Naturel 48H' },
      { label: 'Cuisson', value: 'Feu de bois 450°C' },
    ],
    textAlignment: 'left', // Video RIGHT
    isHero: true,
  },
  {
    id: 'pate',
    stepNumber: '02',
    eyebrow: 'ÉTAPE 01 • FERMENTATION LENTE',
    headline: 'Tout commence par une bonne pâte.',
    description: '48 heures de maturation lente au levain vivant. Une pâte aérienne, voluptueuse et hautement alvéolée, assurant une digestibilité totale.',
    specs: [
      { label: 'Maturation', value: '48 Heures à froid' },
      { label: 'Hydratation', value: '72% haute teneur' },
      { label: 'Digestion', value: 'Légèreté absolue' },
    ],
    textAlignment: 'left', // Video RIGHT
  },
  {
    id: 'sauce',
    stepNumber: '03',
    eyebrow: 'ÉTAPE 02 • TERROIR VOLCANIQUE',
    headline: 'Une sauce préparée avec caractère.',
    description: 'Tomates San Marzano D.O.P. mûries sur les flancs du Vésuve, concassées à la main avec du basilic frais cueilli et un filet d’huile d’olive extra-vierge.',
    specs: [
      { label: 'Origine', value: 'San Marzano D.O.P.' },
      { label: 'Aromates', value: 'Basilic frais froissé' },
      { label: 'Équilibre', value: 'Acidité douce & solaire' },
    ],
    textAlignment: 'left', // Video RIGHT / Center-Right dominant
  },
  {
    id: 'ingredients',
    stepNumber: '04',
    eyebrow: 'ÉTAPE 03 • LES INGRÉDIENTS NOBLES',
    headline: 'Des produits choisis avec soin.',
    description: 'Mozzarella Fior di Latte fraîche effilochée chaque matin, bœuf artisanal mariné et merguez assaisonnées selon la recette familiale d’Alger.',
    specs: [
      { label: 'Fromage', value: 'Fior di Latte fraîche' },
      { label: 'Viandes', value: 'Recette maison d’Alger' },
      { label: 'Légumes', value: 'Poivrons confits au feu' },
    ],
    textAlignment: 'right', // Video transitions to LEFT, Text to RIGHT
  },
  {
    id: 'cuisson',
    stepNumber: '05',
    eyebrow: 'ÉTAPE 04 • LE FEU & LA CUISSON',
    headline: 'Saisie à 450°C. Léopardage doré.',
    description: '90 secondes chrono sur pierre réfractaire. La croûte gonfle, se tache d’un léopardage doré et croustillant sous l’effet de la flamme vive.',
    specs: [
      { label: 'Four à bois', value: '450°C constant' },
      { label: 'Chrono', value: '90 Secondes' },
      { label: 'Texture', value: 'Croustillante & fondante' },
    ],
    textAlignment: 'right', // Video LEFT, Text RIGHT
  },
  {
    id: 'decoupe',
    stepNumber: '06',
    eyebrow: 'ÉTAPE 05 • LA DÉCOUPE NETTE',
    headline: 'La découpe de précision.',
    description: 'La lame sépare les parts alvéolées, libérant la vapeur embaumée et préparant l’instant sublime de la dégustation.',
    specs: [
      { label: 'Découpe', value: 'Précise & franche' },
      { label: 'Alvéolage', value: 'Corniche soufflée' },
      { label: 'Vapeur', value: 'Arômes décuplés' },
    ],
    textAlignment: 'left', // Video transitions back to RIGHT, Text to LEFT
  },
  {
    id: 'explosion',
    stepNumber: '07',
    eyebrow: 'CLIMAX • L’EXPLOSION DES SAVEURS',
    headline: 'L’explosion des saveurs.',
    description: 'Les parts se détachent en plein vol. L’alliance parfaite entre la tradition napolitaine et la générosité algérienne.',
    specs: [
      { label: 'Parts', value: 'Généreuses & légères' },
      { label: 'Saveurs', value: 'Harmonie absolue' },
      { label: 'Expérience', value: 'Sur place ou à emporter' },
    ],
    textAlignment: 'left', // Large Exploded Pizza on RIGHT, Text on LEFT
    isClimax: true,
  },
];

interface StageCameraConfig {
  x: number; // in vw
  y: number; // in vh
  scale: number;
  rotate: number; // in deg
}

// DESKTOP & LARGE TABLET: Two-zone choreography. Text and Video NEVER collide.
const DESKTOP_KEYFRAMES: StageCameraConfig[] = [
  { x: 21, y: 0, scale: 0.95, rotate: 0 },      // Stage 1: Hero (Video RIGHT, Text LEFT)
  { x: 19, y: -1.5, scale: 1.05, rotate: 1.2 }, // Stage 2: Dough (Video RIGHT)
  { x: 17, y: 1, scale: 1.15, rotate: -1.5 },   // Stage 3: Sauce (Video RIGHT)
  { x: -20, y: 1.5, scale: 1.18, rotate: 1.8 }, // Stage 4: Toppings (Video LEFT, Text RIGHT)
  { x: -20, y: -1.2, scale: 1.24, rotate: -1.2 },// Stage 5: Baking (Video LEFT, Text RIGHT)
  { x: 19, y: 0.5, scale: 1.14, rotate: 0.8 },  // Stage 6: Slicing (Video RIGHT, Text LEFT)
  { x: 21, y: 1.5, scale: 1.06, rotate: 0 },    // Stage 7: Explosion (Video RIGHT, Text LEFT)
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
  const pinnedPanelRef = useRef<HTMLDivElement>(null);
  const pizzaLayerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  // Compute interpolated camera transform based on scroll progress
  const getInterpolatedCamera = (progress: number): StageCameraConfig => {
    const keyframes = DESKTOP_KEYFRAMES;
    const numIntervals = keyframes.length - 1;
    const scaledP = Math.max(0, Math.min(1, progress)) * numIntervals;
    const index = Math.floor(scaledP);
    const fraction = scaledP - index;

    if (index >= numIntervals) {
      return keyframes[numIntervals];
    }

    const k1 = keyframes[index];
    const k2 = keyframes[index + 1];

    // Smooth sinusoidal easing between camera waypoints
    const ease = (1 - Math.cos(fraction * Math.PI)) / 2;

    return {
      x: k1.x + (k2.x - k1.x) * ease,
      y: k1.y + (k2.y - k1.y) * ease,
      scale: k1.scale + (k2.scale - k1.scale) * ease,
      rotate: k1.rotate + (k2.rotate - k1.rotate) * ease,
    };
  };

  useEffect(() => {
    const container = containerRef.current;
    const pinnedPanel = pinnedPanelRef.current;
    if (!container || !pinnedPanel) return;

    // Set initial camera transform immediately on mount to prevent any jump
    const initialCam = DESKTOP_KEYFRAMES[0];
    if (pizzaLayerRef.current) {
      gsap.set(pizzaLayerRef.current, {
        x: `${initialCam.x}vw`,
        y: `${initialCam.y}vh`,
        scale: initialCam.scale,
        rotation: initialCam.rotate,
        force3D: true,
      });
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: '+=550%',
        pin: pinnedPanel,
        pinSpacing: true,
        scrub: 0.5,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setScrollProgress(p);

          // Map progress across the 7 narrative stages
          const stage = Math.min(
            CINEMATIC_STAGES.length - 1,
            Math.floor(p * CINEMATIC_STAGES.length)
          );
          setCurrentStageIdx(stage);

          // Update video layer transform dynamically with GSAP
          if (pizzaLayerRef.current) {
            const cam = getInterpolatedCamera(p);
            gsap.set(pizzaLayerRef.current, {
              x: `${cam.x}vw`,
              y: `${cam.y}vh`,
              scale: cam.scale,
              rotation: cam.rotate,
              force3D: true,
            });
          }
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const stage = CINEMATIC_STAGES[currentStageIdx];
  const initialCam = DESKTOP_KEYFRAMES[0];

  return (
    <div ref={containerRef} className="relative w-full bg-[#000000]">
      <div
        ref={pinnedPanelRef}
        className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none bg-[#000000]"
      >
        {/* Seamless header blend */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-40" />

        {/* TOP NARRATIVE BAR: Step Counter & Subtle Progress */}
        <div 
          className="relative z-40 pt-20 sm:pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto"
        >
          {/* Stage counter badge with sequential entrance */}
          <div 
            key={`badge-${stage.id}`}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#100e0d]/90 border border-[#26211c] backdrop-blur-md shadow-lg shadow-black/40 animate-blur-enter"
            style={{ animationDelay: '0ms' }}
          >
            <span className="flex h-1.5 w-1.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfd0ba] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dfd0ba]"></span>
            </span>
            <span className="text-[11px] font-mono tracking-widest text-[#dfd0ba] uppercase font-semibold">
              {stage.stepNumber} / 07 {stage.eyebrow ? `• ${stage.eyebrow}` : ''}
            </span>
          </div>

          {/* Minimalist Progress Track in Warm Cream */}
          <div className="hidden sm:flex items-center gap-3">
            <span className="text-[11px] font-mono text-[#8c7e6c] uppercase tracking-wider">Scène</span>
            <div className="w-28 bg-[#161412] h-[2px] rounded-full overflow-hidden border border-[#2a241f]">
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

        {/* THE SPATIAL MOVING PIZZA VIDEO LAYER (FULL-VIEWPORT STAGE) */}
        <div
          ref={pizzaLayerRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 will-change-transform bg-transparent"
          style={{
            transform: `translate3d(${initialCam.x}vw, ${initialCam.y}vh, 0px) scale(${initialCam.scale}) rotate(${initialCam.rotate}deg)`,
          }}
        >
          <div className="w-[440px] md:w-[580px] lg:w-[720px] xl:w-[780px] aspect-[16/10] flex items-center justify-center">
            <PizzaVideoCompositor
              scrollProgress={scrollProgress}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* EDITORIAL CONTENT LAYER: Dedicated Safe Zones (TEXT & PIZZA NEVER OVERLAP) */}
        <div className="relative z-30 my-auto px-6 md:px-12 max-w-7xl mx-auto w-full pointer-events-auto">
          
          {/* Dynamic spatial placement container */}
          <div 
            className={`flex flex-col transition-all duration-700 ease-out ${
              stage.textAlignment === 'right'
                ? 'items-start text-left ml-auto max-w-lg lg:max-w-xl pl-4 lg:pl-8'
                : 'items-start text-left mr-auto max-w-lg lg:max-w-xl pr-4 lg:pr-8'
            }`}
          >
            {/* 01 — Eyebrow badge (sequential reveal) */}
            {stage.eyebrow ? (
              <div 
                key={`eyebrow-${stage.id}`}
                className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#dfd0ba]/90 uppercase mb-3 animate-blur-enter"
                style={{ animationDelay: '0ms' }}
              >
                <span className="w-6 h-[1px] bg-[#dfd0ba]/40" />
                <span>{stage.eyebrow}</span>
              </div>
            ) : null}

            {/* 02 — Large Editorial Headline (sequential reveal with blur-up) */}
            <h1 
              key={`headline-${stage.id}`}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#f7f2e7] leading-[1.08] tracking-tight mb-4 animate-blur-enter"
              style={{ animationDelay: '120ms' }}
            >
              {stage.headline}
            </h1>

            {/* 03 — Supporting paragraph (sequential reveal) */}
            <p 
              key={`desc-${stage.id}`}
              className="text-sm sm:text-base md:text-lg text-[#cbb89d] font-light leading-relaxed max-w-xl mb-6 animate-blur-enter"
              style={{ animationDelay: '240ms' }}
            >
              {stage.description}
            </p>

            {/* 04 — Editorial Specs Bar (sequential reveal) */}
            <div 
              key={`specs-${stage.id}`}
              className="grid grid-cols-3 gap-3 pt-4 border-t border-[#26211c] mb-8 w-full max-w-lg animate-blur-enter"
              style={{ animationDelay: '360ms' }}
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

            {/* 05 & 06 — Stage-specific Actions (sequential reveal) */}
            {stage.isHero ? (
              <div 
                key={`cta-hero-${stage.id}`}
                className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto animate-blur-enter"
                style={{ animationDelay: '480ms' }}
              >
                <button
                  onClick={onNavigateToMenu}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-black/80 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Voir le menu</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={onNavigateToReservation}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#12100e]/90 hover:bg-[#1f1b18] text-[#dfd0ba] border border-[#3d3730] font-semibold text-xs sm:text-sm tracking-wider backdrop-blur-xl hover:border-[#dfd0ba] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#cbb89d]" />
                  <span>Réserver une table</span>
                </button>
              </div>
            ) : stage.isClimax ? (
              <div 
                key={`cta-climax-${stage.id}`}
                className="flex items-center gap-4 animate-blur-enter"
                style={{ animationDelay: '480ms' }}
              >
                <button
                  onClick={onNavigateToMenu}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-black/90 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
                >
                  <span>Découvrir la carte complète</span>
                  <ArrowUpRight className="w-4 h-4 text-black" />
                </button>
              </div>
            ) : null}

          </div>

        </div>

        {/* BOTTOM BAR: Scroll prompt & instruction indicator */}
        <div 
          className="relative z-40 pb-6 sm:pb-8 px-6 text-center pointer-events-none animate-blur-enter"
          style={{ animationDelay: '600ms' }}
        >
          <div className="inline-flex flex-col items-center gap-1.5 text-[#8c7e6c]">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-mono">
              {scrollProgress >= 0.92
                ? 'Faites défiler pour explorer la carte'
                : 'Faites défiler pour vivre la cuisson'}
            </span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#dfd0ba]" />
          </div>
        </div>

        {/* Seamless bottom blend into next section */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-40" />
      </div>
    </div>
  );
};
