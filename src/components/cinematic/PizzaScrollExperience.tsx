import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PizzaVideoCompositor } from './PizzaVideoCompositor';
import { Ingredient3DCanvas } from './Ingredient3DCanvas';
import { ArrowDown, Sparkles, ChefHat, Flame, Utensils } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STORY_STAGES = [
  {
    step: '01',
    title: 'LA PÂTE',
    headline: 'Tout commence par une bonne pâte.',
    description: 'Levée lente pendant 48 heures, pétrie à la main avec une farine sélectionnée et de l\'huile d\'olive extra-vierge.',
    icon: ChefHat,
    accent: 'from-amber-500 to-amber-700'
  },
  {
    step: '02',
    title: 'LA SAUCE',
    headline: 'Une sauce préparée avec caractère.',
    description: 'Tomates San Marzano mûries au soleil, cuites à feu doux avec de l\'ail frais, du basilic et nos épices parfumées.',
    icon: Sparkles,
    accent: 'from-red-500 to-red-700'
  },
  {
    step: '03',
    title: 'LA MOZZARELLA',
    headline: 'Du fromage fondant & généreux.',
    description: 'Mozzarella Fior di Latte d\'exception râpée le matin même pour un filant parfait et une texture crémeuse.',
    icon: Utensils,
    accent: 'from-amber-200 to-amber-400'
  },
  {
    step: '04',
    title: 'LES INGRÉDIENTS',
    headline: 'Des produits choisis avec soin.',
    description: 'Merguez artisanales d\'Alger, poulet mariné aux épices, légumes frais coupés au couteau et olives noires savoureuses.',
    icon: Sparkles,
    accent: 'from-emerald-500 to-emerald-700'
  },
  {
    step: '05',
    title: 'LA CUISSON',
    headline: 'Une cuisson maîtrisée au feu de bois.',
    description: 'Cuite à plus de 450°C sur pierre réfractaire pour obtenir cette croûte alvéolée, al dente et délicieusement dorée.',
    icon: Flame,
    accent: 'from-orange-500 to-red-600'
  },
  {
    step: '06',
    title: 'LA COUPE',
    headline: 'Chaque part raconte une histoire.',
    description: 'Découpée avec précision pour libérer les arômes et garantir une répartition parfaite des saveurs.',
    icon: Utensils,
    accent: 'from-amber-400 to-orange-500'
  },
  {
    step: '07',
    title: 'LE MOMENT PIDZERIA',
    headline: 'L’art de la vraie pizza à votre table.',
    description: 'L\'alliance inégalée du savoir-faire italien et de la générosité algérienne. Prête à être dégustée.',
    icon: Sparkles,
    accent: 'from-amber-400 via-amber-300 to-amber-500'
  }
];

interface PizzaScrollExperienceProps {
  onScrollToMenu: () => void;
}

export const PizzaScrollExperience: React.FC<PizzaScrollExperienceProps> = ({ onScrollToMenu }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStageIdx, setCurrentStageIdx] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=450%', // Scroll length factor
      pin: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

        // Map 0-1 to stage index
        const idx = Math.min(
          STORY_STAGES.length - 1,
          Math.floor(p * STORY_STAGES.length)
        );
        setCurrentStageIdx(idx);
      }
    });

    return () => {
      st.kill();
    };
  }, []);

  const currentStage = STORY_STAGES[currentStageIdx];
  const IconComp = currentStage.icon;

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-[#0b0a0a] overflow-hidden flex flex-col justify-between">
      {/* Background 3D floating ingredient field */}
      <Ingredient3DCanvas />

      {/* Decorative ambient background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Top Header info indicator */}
      <div className="relative z-20 pt-24 px-6 md:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-stone-900/80 border border-stone-800 backdrop-blur-md px-4 py-1.5 rounded-full">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-xs font-mono tracking-widest text-amber-200 uppercase">
            L'Expérience Culinaire — {currentStage.step} / 07
          </span>
        </div>

        {/* Scroll Progress Bar indicator */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-xs text-stone-400 font-mono">Déroulement</span>
          <div className="w-32 bg-stone-800 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-amber-500 to-red-500 h-full transition-all duration-150"
              style={{ width: `${scrollProgress * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Viewport Layout */}
      <div className="relative z-20 my-auto px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Storytelling Card */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-amber-500/15 backdrop-blur-xl relative overflow-hidden transition-all duration-500">
            {/* Step badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-4">
              <IconComp className="w-3.5 h-3.5 text-amber-400" />
              <span>ÉTAPE {currentStage.step}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-amber-50 mb-3 tracking-wide">
              {currentStage.title}
            </h2>

            <p className="text-lg font-semibold text-amber-400/90 mb-3 font-serif italic">
              "{currentStage.headline}"
            </p>

            <p className="text-stone-300 text-sm md:text-base leading-relaxed mb-6 font-sans">
              {currentStage.description}
            </p>

            {/* Quick Action Button on Final Stage */}
            {currentStageIdx >= 5 && (
              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 via-amber-600 to-red-600 text-stone-950 font-bold text-sm tracking-wide shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Découvrir le Menu Complêt</span>
                <ArrowDown className="w-4 h-4 transform -rotate-90" />
              </button>
            )}
          </div>
        </div>

        {/* Center/Right Column: Composited Pizza Video */}
        <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 h-[380px] sm:h-[450px] md:h-[520px]">
          <PizzaVideoCompositor 
            scrollProgress={scrollProgress} 
          />
        </div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-20 pb-8 px-6 text-center">
        <div className="inline-flex flex-col items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors">
          <span className="text-xs uppercase tracking-widest font-mono">
            {scrollProgress > 0.9 ? 'Faites défiler pour le menu' : 'Faites défiler pour composer la pizza'}
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-amber-500" />
        </div>
      </div>
    </section>
  );
};
