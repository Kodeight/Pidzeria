import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PizzaVideoCompositor } from './PizzaVideoCompositor';
import { ArrowDown, ChefHat, Flame, Utensils, Leaf, Clock, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STORY_STAGES = [
  {
    step: '01',
    title: 'LA PÂTE AU LEVAIN',
    headline: 'Tout commence par la fermentation lente.',
    description: 'Levée pendant 48 heures au levain naturel. Pétrie avec de la farine italienne sélectionnée et de l\'huile d\'olive extra-vierge pour une digestibilité absolue.',
    icon: Clock,
  },
  {
    step: '02',
    title: 'LA SAUCE SAN MARZANO',
    headline: 'Le goût solaire et authentique de l\'Italie.',
    description: 'Tomates San Marzano mûries au soleil volcanique, mijotées avec du basilic frais du potager et une pincée de sel marin.',
    icon: Leaf,
  },
  {
    step: '03',
    title: 'LA MOZZARELLA FIOR DI LATTE',
    headline: 'Fondante, crémeuse et généreuse.',
    description: 'Mozzarella fraîche effilochée à la main chaque matin pour garantir une texture crémeuse et un filant inimitable.',
    icon: Utensils,
  },
  {
    step: '04',
    title: 'TERROIR ALGÉROIS & ÉPICES',
    headline: 'L\'âme de notre terre dans chaque bouchée.',
    description: 'Merguez de bœuf artisanales préparées selon notre recette familiale d\'Alger, poivrons rôtis et herbes aromatiques fraîches.',
    icon: Heart,
  },
  {
    step: '05',
    title: 'LA CUISSON AU FEU DE BOIS',
    headline: 'Saisie à 450°C en 90 secondes.',
    description: 'Cuite sur pierre volcanique réfractaire. Une croûte alvéolée gonflée à la perfection, croustillante à l\'extérieur et moelleuse à cœur.',
    icon: Flame,
  },
  {
    step: '06',
    title: 'L\'HUILE D\'OLIVE & BASILIC',
    headline: 'La touche finale des maîtres pizzaiolos.',
    description: 'Un filet d\'huile d\'olive vierge pressée à froid et quelques feuilles de basilic frais cueillies à la minute.',
    icon: Leaf,
  },
  {
    step: '07',
    title: 'LA DÉGUSTATION PIDZERIA',
    headline: 'L’Italie rencontre l’Algérie à votre table.',
    description: 'Une harmonie gustative d\'exception partagée dans une ambiance chaleureuse et raffinée.',
    icon: ChefHat,
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
      end: '+=400%',
      pin: true,
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;
        setScrollProgress(p);

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
    <section 
      ref={containerRef} 
      className="relative w-full h-screen bg-black overflow-hidden flex flex-col justify-between"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Top transition gradient from dark page background into black video stage */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#070907] to-transparent pointer-events-none z-10" />

      {/* Subtle brand green ambient glow in background - strictly natural, no orange */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15"
          style={{ background: '#547734' }}
        />
      </div>

      {/* Top Header info indicator */}
      <div className="relative z-20 pt-24 px-6 md:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3 bg-[#111612]/90 border border-[#547734]/30 backdrop-blur-md px-4 py-1.5 rounded-full">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#74a148] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#547734]"></span>
          </span>
          <span className="text-xs font-mono tracking-widest text-[#d4e4c2] uppercase font-semibold">
            Fabrication Artisanale — {currentStage.step} / 07
          </span>
        </div>

        {/* Scroll Progress Bar indicator */}
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-xs text-[#b8ab96] font-mono">Progression</span>
          <div className="w-32 bg-[#1a211b] h-1.5 rounded-full overflow-hidden border border-[#2b392d]">
            <div 
              className="h-full transition-all duration-150 rounded-full"
              style={{ 
                width: `${scrollProgress * 100}%`,
                background: 'linear-gradient(90deg, #547734 0%, #7db352 100%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Interactive Viewport Layout */}
      <div className="relative z-20 my-auto px-6 md:px-12 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Storytelling Card */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          <div className="bg-[#0b100c]/85 p-6 md:p-8 rounded-3xl border border-[#547734]/25 backdrop-blur-2xl relative overflow-hidden transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
            {/* Step badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#547734]/15 border border-[#547734]/30 text-[#8ec062] text-xs font-semibold mb-4">
              <IconComp className="w-3.5 h-3.5 text-[#7db352]" />
              <span className="tracking-wider uppercase">ÉTAPE {currentStage.step}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#fbf7ee] mb-3 tracking-wide">
              {currentStage.title}
            </h2>

            <p className="text-base sm:text-lg font-medium text-[#d4e4c2] mb-3 font-serif italic">
              "{currentStage.headline}"
            </p>

            <p className="text-[#c7baa4] text-sm md:text-base leading-relaxed mb-6 font-sans">
              {currentStage.description}
            </p>

            {/* Quick Action Button on Final Stages */}
            {currentStageIdx >= 5 && (
              <button
                onClick={onScrollToMenu}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#547734] hover:bg-[#628b3d] text-[#fbf7ee] font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-[0_10px_25px_rgba(84,119,52,0.35)] flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              >
                <span>Découvrir la carte</span>
                <ArrowDown className="w-4 h-4 transform -rotate-90" />
              </button>
            )}
          </div>
        </div>

        {/* Center/Right Column: Composited Real Pizza Video from pizza.mp4 */}
        <div className="lg:col-span-7 flex items-center justify-center order-1 lg:order-2 h-[340px] sm:h-[440px] md:h-[500px]">
          <PizzaVideoCompositor 
            scrollProgress={scrollProgress} 
          />
        </div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="relative z-20 pb-8 px-6 text-center">
        <div className="inline-flex flex-col items-center gap-2 text-[#b8ab96] hover:text-[#7db352] transition-colors">
          <span className="text-xs uppercase tracking-widest font-mono">
            {scrollProgress > 0.9 ? 'Faites défiler pour voir le menu' : 'Faites défiler pour explorer la cuisson'}
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce text-[#7db352]" />
        </div>
      </div>

      {/* Bottom transition gradient into the next section */}
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#070907] to-transparent pointer-events-none z-10" />
    </section>
  );
};
