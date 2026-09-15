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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#070907] transition-all duration-900 ease-out ${
        transitionState === 'revealing'
          ? 'opacity-0 scale-[1.03] backdrop-blur-xl pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle brand leaf green glow behind the logo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-opacity duration-1000 opacity-20"
          style={{ background: '#547734' }}
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
            className="w-auto h-16 sm:h-20 md:h-24 object-contain drop-shadow-[0_8px_30px_rgba(0,0,0,0.9)]"
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
        <p className="text-[#f2e5ce]/80 font-serif italic text-sm sm:text-base tracking-wider mb-8">
          Pizzeria Artisanale • Alger
        </p>

        {/* Minimalist Progress Track in Brand Leaf Green */}
        <div className="w-48 sm:w-64 bg-[#121813] border border-[#243326] rounded-full h-[3px] mb-4 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-150 ease-out shadow-[0_0_10px_rgba(84,119,52,0.6)]"
            style={{ 
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #547734 0%, #7db352 50%, #9bc774 100%)'
            }}
          />
        </div>

        {/* Micro Stage Status Text */}
        <div className="h-5 flex items-center justify-center">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#8a988c]">
            {stageText}
          </span>
        </div>

      </div>
    </div>
  );
};
