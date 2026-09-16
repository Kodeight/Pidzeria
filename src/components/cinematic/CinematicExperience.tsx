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
  textAlignment: 'left' | 'right' | 'center';
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
    textAlignment: 'left',
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
    textAlignment: 'left',
  },
  {
    id: 'sauce',
    stepNumber: '03',
    eyebrow: 'ÉTAPE 02 • TERROIR VOLCANIQUE',
    headline: 'Une sauce préparée avec caractère.',
    description: 'Tomates San Marzano D.O.P. mûries sur les flancs du Vésuve, concassées à la main avec du basilic frais cueilli à l\'aube et un filet d\'huile d\'olive extra-vierge.',
    specs: [
      { label: 'Origine', value: 'San Marzano D.O.P.' },
      { label: 'Aromates', value: 'Basilic frais froissé' },
      { label: 'Équilibre', value: 'Acidité douce & solaire' },
    ],
    textAlignment: 'right', // Camera flips composition to opposite side!
  },
  {
    id: 'ingredients',
    stepNumber: '04',
    eyebrow: 'ÉTAPE 03 • LES INGRÉDIENTS NOBLES',
    headline: 'Des produits choisis avec soin.',
    description: 'Mozzarella Fior di Latte fraîche effilochée chaque matin, bœuf artisanal mariné et merguez assaisonnées selon la recette familiale d\'Alger, relevées d\'olives noires.',
    specs: [
      { label: 'Fromage', value: 'Fior di Latte fraîche' },
      { label: 'Viandes', value: 'Recette maison d’Alger' },
      { label: 'Légumes', value: 'Poivrons confits au feu' },
    ],
    textAlignment: 'left',
  },
  {
    id: 'cuisson',
    stepNumber: '05',
    eyebrow: 'ÉTAPE 04 • LE FEU & LA CUISSON',
    headline: 'Saisie à 450°C. Léopardage doré.',
    description: '90 secondes chrono sur pierre réfractaire. La croûte gonfle, se tache d\'un léopardage doré et croustillant sous l’effet de la flamme vive.',
    specs: [
      { label: 'Four à bois', value: '450°C constant' },
      { label: 'Chrono', value: '90 Secondes' },
      { label: 'Texture', value: 'Croustillante & fondante' },
    ],
    textAlignment: 'left',
  },
  {
    id: 'explosion',
    stepNumber: '06',
    eyebrow: 'ÉTAPE 05 • LA COUPE & L’EXPLOSION',
    headline: 'L’explosion des saveurs.',
    description: 'La découpe nette libère la vapeur embaumée et sublime chaque part. La dégustation commence.',
    specs: [
      { label: 'Parts', value: 'Découpe artisanale' },
      { label: 'Saveurs', value: 'Équilibre parfait' },
      { label: 'Dégustation', value: 'À table ou à emporter' },
    ],
    textAlignment: 'center',
  },
];

interface CinematicExperienceProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

// Keyframe compositions across 6 distinct stages for desktop and mobile
interface StageCameraConfig {
  x: number; // in vw
  y: number; // in vh
  scale: number;
  rotate: number; // in deg
}

const DESKTOP_KEYFRAMES: StageCameraConfig[] = [
  { x: 18, y: 0, scale: 0.95, rotate: 0 },    // Stage 1: Hero on right
  { x: 10, y: -2, scale: 1.06, rotate: 1.2 }, // Stage 2: Dough moves center-right
  { x: -16, y: 2, scale: 1.15, rotate: -2 },  // Stage 3: Sauce moves to left! (Text on right)
  { x: 0, y: 4, scale: 1.20, rotate: 0.8 },   // Stage 4: Ingredients center
  { x: 6, y: -1, scale: 1.30, rotate: -1.2 }, // Stage 5: Baking becomes dominant
  { x: 0, y: 0, scale: 1.16, rotate: 0 },     // Stage 6: Explosion centered, slices fully visible
];

const MOBILE_KEYFRAMES: StageCameraConfig[] = [
  { x: 2, y: 16, scale: 0.95, rotate: 0 },    // Stage 1: Hero lower portion
  { x: 0, y: 6, scale: 1.05, rotate: 1 },     // Stage 2: Dough moves upward
  { x: -5, y: 3, scale: 1.12, rotate: -1.5 }, // Stage 3: Sauce shifts left
  { x: 0, y: 5, scale: 1.18, rotate: 0.5 },   // Stage 4: Ingredients centered
  { x: 0, y: 0, scale: 1.25, rotate: -0.8 },  // Stage 5: Baking very large
  { x: 0, y: 0, scale: 1.02, rotate: 0 },     // Stage 6: Explosion centered, slices stay within bounds
];

export const CinematicExperience: React.FC<CinematicExperienceProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pizzaLayerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile vs desktop
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Compute interpolated camera transform based on scroll progress
  const getInterpolatedCamera = (progress: number, mobile: boolean): StageCameraConfig => {
    const keyframes = mobile ? MOBILE_KEYFRAMES : DESKTOP_KEYFRAMES;
    const numIntervals = keyframes.length - 1;
    const scaledP = Math.max(0, Math.min(1, progress)) * numIntervals;
    const index = Math.floor(scaledP);
    const fraction = scaledP - index;

    if (index >= numIntervals) {
      return keyframes[numIntervals];
    }

    const k1 = keyframes[index];
    const k2 = keyframes[index + 1];

    // Smooth sinusoidal easing between keyframe waypoints
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
    if (!container) return;

    // Pin viewport for rich continuous 6-stage progression
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=500%',
      pin: true,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map progress across the 6 narrative stages
        const stage = Math.min(
          CINEMATIC_STAGES.length - 1,
          Math.floor(p * CINEMATIC_STAGES.length)
        );
        setCurrentStageIdx(stage);

        // Update video layer transform dynamically with GSAP
        if (pizzaLayerRef.current) {
          const cam = getInterpolatedCamera(p, window.innerWidth < 1024);
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

    return () => {
      st.kill();
    };
  }, []);

  const stage = CINEMATIC_STAGES[currentStageIdx];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between select-none"
      style={{
        // Strict requirement: pure black #000000 matching video background
        backgroundColor: '#000000',
      }}
    >
      {/* Seamless header gradient blend */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none z-40" />

      {/* DEPTH LAYER 1: Subtle drifting flour/ash specks in deep background (Parallax) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-25">
        <div 
          className="absolute top-1/4 left-1/5 w-1.5 h-1.5 rounded-full bg-[#dfd0ba]/40 blur-[0.5px]"
          style={{ transform: `translateY(${scrollProgress * -80}px)` }}
        />
        <div 
          className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-[#cbb89d]/30 blur-[0.5px]"
          style={{ transform: `translateY(${scrollProgress * -140}px)` }}
        />
        <div 
          className="absolute bottom-1/3 left-1/3 w-1 h-1 rounded-full bg-[#dfd0ba]/50"
          style={{ transform: `translateY(${scrollProgress * -60}px)` }}
        />
      </div>

      {/* TOP BAR: Subtle Narrative Progress Indicator & Live Status */}
      <div className="relative z-40 pt-20 sm:pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-auto">
        {/* Stage counter pill */}
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#100e0d]/90 border border-[#26211c] backdrop-blur-md">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#dfd0ba] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#dfd0ba]"></span>
          </span>
          <span className="text-[11px] font-mono tracking-widest text-[#dfd0ba] uppercase font-semibold">
            {stage.stepNumber} / 06 • {stage.eyebrow}
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

      {/* DEPTH LAYER 2: THE SPATIAL MOVING PIZZA VIDEO LAYER (FULL-VIEWPORT STAGE)
          Controlled smoothly by GSAP ScrollTrigger timeline */}
      <div
        ref={pizzaLayerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 will-change-transform"
        style={{
          // Initial camera position for Stage 1 (Hero)
          transform: isMobile 
            ? 'translate(2vw, 16vh) scale(0.95)' 
            : 'translate(18vw, 0vh) scale(0.95)',
        }}
      >
        <div className="w-[340px] sm:w-[480px] md:w-[620px] lg:w-[780px] aspect-[16/10] flex items-center justify-center">
          <PizzaVideoCompositor
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </div>
      </div>

      {/* DEPTH LAYER 3: FOREGROUND ACCENTS (Subtle drifting fresh basil leaf passing with depth) */}
      <div 
        className="absolute top-1/3 left-10 md:left-24 pointer-events-none z-30 opacity-40 transition-transform duration-700 ease-out hidden sm:block"
        style={{
          transform: `translate(${scrollProgress * 40}px, ${scrollProgress * -90}px) rotate(${scrollProgress * 45}deg)`,
        }}
      >
        <div className="w-10 h-10 rounded-full border border-[#3d3730]/40 flex items-center justify-center text-[10px] font-mono text-[#8c7e6c] backdrop-blur-sm">
          🍃
        </div>
      </div>

      {/* DEPTH LAYER 4: CHOREOGRAPHED EDITORIAL CONTENT
          Positions adjust dynamically: Left, Right, or Center depending on the cinematic stage */}
      <div className="relative z-30 my-auto px-6 md:px-12 max-w-7xl mx-auto w-full pointer-events-auto">
        
        {/* Dynamic spatial placement container */}
        <div 
          className={`flex flex-col transition-all duration-700 ease-out ${
            stage.textAlignment === 'right' && !isMobile
              ? 'items-end text-left ml-auto max-w-lg lg:max-w-xl pr-4 lg:pr-8'
              : stage.textAlignment === 'center'
              ? 'items-center text-center mx-auto max-w-2xl'
              : isMobile
              ? 'items-start text-left max-w-md'
              : 'items-start text-left mr-auto max-w-lg lg:max-w-xl'
          }`}
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#dfd0ba]/90 uppercase mb-3">
            <span className="w-6 h-[1px] bg-[#dfd0ba]/40" />
            <span>{stage.eyebrow}</span>
          </div>

          {/* Large Editorial Headline */}
          <h1 
            key={`headline-${stage.id}`}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold text-[#f7f2e7] leading-[1.08] tracking-tight mb-4 transition-all duration-500 ease-out"
          >
            {stage.headline}
          </h1>

          {/* Supporting paragraph floating directly on the dark canvas */}
          <p 
            key={`desc-${stage.id}`}
            className="text-sm sm:text-base md:text-lg text-[#cbb89d] font-light leading-relaxed max-w-xl mb-6 transition-all duration-500 ease-out"
          >
            {stage.description}
          </p>

          {/* Editorial Specs Bar */}
          <div 
            key={`specs-${stage.id}`}
            className="grid grid-cols-3 gap-3 pt-4 border-t border-[#26211c] mb-8 w-full max-w-lg transition-all duration-500"
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

          {/* Stage-specific Actions */}
          {stage.isHero ? (
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
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
          ) : currentStageIdx >= 4 ? (
            <div className="flex items-center gap-4">
              <button
                onClick={onNavigateToMenu}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] text-[#0a0a0a] font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-2xl shadow-black/90 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.02]"
              >
                <span>Découvrir la carte complète</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
            </div>
          ) : null}

        </div>

      </div>

      {/* BOTTOM BAR: Scroll prompt & instruction indicator */}
      <div className="relative z-40 pb-6 sm:pb-8 px-6 text-center pointer-events-none">
        <div className="inline-flex flex-col items-center gap-1.5 text-[#8c7e6c]">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-widest font-mono">
            {scrollProgress >= 0.92
              ? 'Faites défiler pour explorer nos créations'
              : 'Faites défiler pour vivre la cuisson'}
          </span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#dfd0ba]" />
        </div>
      </div>

      {/* Seamless bottom blend into next sections */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-40" />
    </div>
  );
};
