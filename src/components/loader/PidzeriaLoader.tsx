import React, { useEffect, useState, useRef } from 'react';

interface PidzeriaLoaderProps {
  onComplete: () => void;
}

export const PidzeriaLoader: React.FC<PidzeriaLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stageText, setStageText] = useState('Allumage du four au feu de bois...');
  const [transitionState, setTransitionState] = useState<'loading' | 'revealing' | 'done'>('loading');
  const isVideoReadyRef = useRef(false);

  useEffect(() => {
    // Pre-check video readiness
    const testVideo = document.createElement('video');
    testVideo.src = '/pizza.mp4';
    testVideo.preload = 'auto';
    testVideo.oncanplay = () => {
      isVideoReadyRef.current = true;
    };
    testVideo.load();

    const startTime = Date.now();
    const minDuration = 3200; // minimum ~3 seconds as requested

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawPct = Math.min(100, (elapsed / minDuration) * 100);
      
      // If assets are still loading after 3s, hold around 95% until ready
      const cappedPct = elapsed >= minDuration && !isVideoReadyRef.current ? 95 : Math.floor(rawPct);
      setProgress(cappedPct);

      if (cappedPct < 30) {
        setStageText('Allumage du four au feu de bois...');
      } else if (cappedPct < 60) {
        setStageText('Fermentation lente du levain naturel...');
      } else if (cappedPct < 90) {
        setStageText('Sélection des produits d’exception...');
      } else {
        setStageText('Bienvenue chez PIDZERIA');
      }

      if (elapsed >= minDuration && (isVideoReadyRef.current || elapsed >= 4500)) {
        clearInterval(interval);
        setProgress(100);
        setTransitionState('revealing');
        setTimeout(() => {
          setTransitionState('done');
          onComplete();
        }, 850);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (transitionState === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#000000] transition-all duration-900 ease-out select-none ${
        transitionState === 'revealing'
          ? 'opacity-0 scale-[1.02] filter blur-[2px] pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* SOFT ATMOSPHERIC ILLUMINATION: Full-screen multi-stop gradient with ultra-smooth falloff into pure black
          Zero visible circular boundary, zero glowing disk, zero hard edges */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(ellipse 90% 70% at 50% 50%, 
            rgba(223, 208, 186, 0.075) 0%, 
            rgba(223, 208, 186, 0.045) 25%, 
            rgba(223, 208, 186, 0.02) 48%, 
            rgba(223, 208, 186, 0.007) 70%, 
            rgba(0, 0, 0, 0) 95%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-lg">
        
        {/* Official PIDZERIA Logo with calm, subtle floating & breathing (no bounce, no spin) */}
        <div className="mb-8 will-change-transform animate-float-subtle">
          <img
            src="/pidzeria.png"
            alt="PIDZERIA"
            className="w-auto h-16 sm:h-20 md:h-24 object-contain drop-shadow-[0_12px_36px_rgba(0,0,0,0.95)]"
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

        {/* Brand Sub-label in warm cream */}
        <p className="text-[#dfd0ba]/90 font-serif italic text-sm sm:text-base tracking-wider mb-8">
          Pizzeria Artisanale • Alger
        </p>

        {/* Minimalist Progress Track in Cream / Warm Beige */}
        <div className="w-48 sm:w-64 bg-[#141210] border border-[#2e2924] rounded-full h-[2.5px] mb-4 overflow-hidden relative">
          <div
            className="h-full rounded-full transition-all duration-150 ease-out shadow-[0_0_8px_rgba(223,208,186,0.4)]"
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
