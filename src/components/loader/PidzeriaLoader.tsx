import React, { useEffect, useState } from 'react';

interface PidzeriaLoaderProps {
  onComplete: () => void;
}

export const PidzeriaLoader: React.FC<PidzeriaLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Allumage du four au feu de bois...');
  const [transitionState, setTransitionState] = useState<'loading' | 'revealing' | 'done'>('loading');

  useEffect(() => {
    const startTime = Date.now();
    const minDuration = 3000;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / minDuration) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStageText('Allumage du four au feu de bois...');
      } else if (pct < 70) {
        setStageText('Fermentation lente du levain naturel...');
      } else if (pct < 95) {
        setStageText('Sélection des produits d’exception...');
      } else {
        setStageText('Bienvenue chez PIDZERIA');
      }

      if (elapsed >= minDuration) {
        clearInterval(interval);
        setTransitionState('revealing');
        setTimeout(() => {
          setTransitionState('done');
          onComplete();
        }, 800);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (transitionState === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-all duration-900 ease-out ${
        transitionState === 'revealing'
          ? 'opacity-0 scale-[1.03] backdrop-blur-xl pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle warm amber/cream ambient backlight behind the logo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 opacity-15"
          style={{ background: '#dfd0ba' }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg">
        
        {/* Official PIDZERIA Logo with refined floating and breathing animation */}
        <div
          className="mb-8 transition-transform duration-700 ease-out will-change-transform animate-float-subtle"
        >
          <img
            src="/pidzeria.png"
            alt="PIDZERIA"
            className="w-auto h-16 sm:h-20 md:h-24 object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]"
            loading="eager"
            decoding="sync"
            onError={(e) => {
              const img = e.currentTarget;
              if (!img.src.endsWith('/pidzeria.PNG')) {
                img.src = '/pidzeria.PNG';
              }
            }}
          />
        </div>

        {/* Refined Brand Sub-label in warm cream */}
        <p className="text-[#dfd0ba]/90 font-serif italic text-sm sm:text-base tracking-wider mb-8">
          Pizzeria Artisanale • Alger
        </p>

        {/* Minimalist Progress Track in Cream / Warm Beige */}
        <div className="w-48 sm:w-64 bg-[#141210] border border-[#2e2924] rounded-full h-[2.5px] mb-4 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(223,208,186,0.5)]"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #8c7e6c 0%, #dfd0ba 50%, #f7f2e7 100%)'
            }}
          />
        </div>

        {/* Micro Stage Status Text */}
        <div className="h-5 flex items-center justify-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#9c8e7e]">
            {stageText}
          </span>
        </div>

      </div>
    </div>
  );
};
