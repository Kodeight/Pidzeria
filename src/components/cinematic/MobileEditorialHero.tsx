import React, { useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, Calendar, Flame, Sparkles } from 'lucide-react';
import mobilePizzaImg from '../../assets/images/artisan_mobile_pizza_1789519581472.jpg';

interface MobileEditorialHeroProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export const MobileEditorialHero: React.FC<MobileEditorialHeroProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pizzaRef = useRef<HTMLDivElement>(null);

  // High-performance physics refs (bypasses React state to ensure 60-120fps fluid rotation)
  const isDraggingRef = useRef<boolean>(false);
  const centerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const lastAngleRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const currentRotationRef = useRef<number>(0);
  const velocityRef = useRef<number>(0.08); // gentle ambient spin
  const animFrameRef = useRef<number | null>(null);

  // Compute pointer angle relative to center of pizza
  const getPointerAngle = useCallback((clientX: number, clientY: number): number => {
    const dx = clientX - centerRef.current.x;
    const dy = clientY - centerRef.current.y;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }, []);

  // Recalculate center coordinates of pizza container
  const updateCenter = useCallback(() => {
    if (pizzaRef.current) {
      const rect = pizzaRef.current.getBoundingClientRect();
      centerRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }, []);

  // Ultra-smooth RAF physics & momentum loop
  useEffect(() => {
    updateCenter();
    window.addEventListener('resize', updateCenter);

    let lastTimestamp = performance.now();

    const loop = (now: number) => {
      const dt = Math.min(now - lastTimestamp, 32);
      lastTimestamp = now;
      const stepFactor = dt / 16.67;

      if (!isDraggingRef.current) {
        // Friction decay on inertial release
        velocityRef.current *= Math.pow(0.96, stepFactor);

        // Ambient gentle drift when resting
        if (Math.abs(velocityRef.current) < 0.05) {
          velocityRef.current = 0.06;
        }

        currentRotationRef.current = (currentRotationRef.current + velocityRef.current * stepFactor) % 360;
        
        if (pizzaRef.current) {
          pizzaRef.current.style.transform = `rotate(${currentRotationRef.current.toFixed(2)}deg)`;
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateCenter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [updateCenter]);

  // Touch & Mouse Event Handlers
  const handlePointerStart = (clientX: number, clientY: number) => {
    updateCenter();
    isDraggingRef.current = true;
    const angle = getPointerAngle(clientX, clientY);
    lastAngleRef.current = angle;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handlePointerMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const angle = getPointerAngle(clientX, clientY);

    let deltaAngle = angle - lastAngleRef.current;
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    currentRotationRef.current = (currentRotationRef.current + deltaAngle) % 360;

    // Apply rotation directly to DOM element for zero-latency, lag-free dragging
    if (pizzaRef.current) {
      pizzaRef.current.style.transform = `rotate(${currentRotationRef.current.toFixed(2)}deg)`;
    }

    // Exponential velocity smoothing
    const instVel = deltaAngle / (dt / 16.67);
    velocityRef.current = velocityRef.current * 0.3 + instVel * 0.7;

    lastAngleRef.current = angle;
    lastTimeRef.current = now;
  };

  const handlePointerEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={(e) => {
        if (isDraggingRef.current) handlePointerMove(e.clientX, e.clientY);
      }}
      onMouseUp={handlePointerEnd}
      onMouseLeave={handlePointerEnd}
      className="relative w-full min-h-[92vh] bg-[#000000] pt-24 pb-14 px-5 sm:px-8 flex flex-col items-center justify-between overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[340px] h-[340px] bg-[#dfd0ba]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. TOP SECTION: ROTATABLE ARTISANAL PIZZA (Touch & Drag in a Circle) */}
      <div 
        className="relative z-10 w-full max-w-[310px] sm:max-w-[360px] aspect-square flex items-center justify-center my-2 animate-blur-enter"
        style={{ animationDelay: '100ms' }}
      >
        <div
          onTouchStart={(e) => {
            if (e.touches.length > 0) {
              handlePointerStart(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchMove={(e) => {
            if (e.touches.length > 0) {
              handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
            }
          }}
          onTouchEnd={handlePointerEnd}
          onTouchCancel={handlePointerEnd}
          onMouseDown={(e) => handlePointerStart(e.clientX, e.clientY)}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none"
          style={{ touchAction: 'none' }}
        >
          {/* Subtle soft dark aura around pizza */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-[#141210]/40 to-transparent blur-xl pointer-events-none -z-10" />

          {/* Pure Artisanal Pizza Element */}
          <div
            ref={pizzaRef}
            className="relative w-full h-full rounded-full flex items-center justify-center will-change-transform drop-shadow-[0_20px_45px_rgba(0,0,0,0.95)] transition-[filter] duration-300 active:scale-[0.99]"
            style={{
              transform: 'rotate(0deg)',
              transformOrigin: 'center center',
            }}
          >
            <img
              src={mobilePizzaImg}
              alt="PIDZERIA - Pizza artisanale au feu de bois"
              loading="eager"
              decoding="async"
              draggable={false}
              className="w-full h-full object-contain rounded-full pointer-events-none select-none"
            />
          </div>
        </div>
      </div>

      {/* 2. BOTTOM SECTION: HERO EDITORIAL CONTENT & ACTIONS */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-start text-left mt-4">

        {/* Big Editorial Headline with Blurry Entrance */}
        <h1 
          className="text-3xl sm:text-4xl font-serif font-extrabold text-[#f7f2e7] leading-[1.12] tracking-tight mb-2.5 animate-blur-enter"
          style={{ animationDelay: '260ms' }}
        >
          L’Italie rencontre l’Algérie.
        </h1>

        {/* Short supporting description with Blurry Entrance */}
        <p 
          className="text-sm sm:text-base text-[#cbb89d] font-light leading-relaxed mb-5 max-w-md animate-blur-enter"
          style={{ animationDelay: '420ms' }}
        >
          L’art noble de la pizza napolitaine au levain naturel, sublimé par la générosité et les épices authentiques de notre terroir algérois.
        </p>

        {/* Action CTAs with Blurry Entrance */}
        <div 
          className="flex flex-col sm:flex-row items-center gap-3 w-full mb-5 animate-blur-enter"
          style={{ animationDelay: '580ms' }}
        >
          <button
            onClick={onNavigateToMenu}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#dfd0ba] hover:bg-[#f3eadc] active:scale-[0.98] text-[#0a0a0a] font-bold text-xs tracking-wider uppercase transition-all shadow-xl shadow-black/80 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Voir le menu</span>
            <ArrowUpRight className="w-4 h-4 text-black" />
          </button>

          <button
            onClick={onNavigateToReservation}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#12100e] hover:bg-[#1a1714] active:scale-[0.98] text-[#dfd0ba] border border-[#383129] font-semibold text-xs tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#cbb89d]" />
            <span>Réserver une table</span>
          </button>
        </div>

        {/* Artisanal Feature Badges with Blurry Entrance */}
        <div 
          className="flex items-center gap-2.5 text-[11px] font-mono text-[#8c7e6c] pt-1 pb-1 overflow-x-auto no-scrollbar w-full animate-blur-enter"
          style={{ animationDelay: '740ms' }}
        >
          <span className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-md bg-[#100e0d] border border-[#221d18]">
            <Flame className="w-3 h-3 text-[#dfd0ba]" />
            <span>Feu de bois 450°C</span>
          </span>
          <span className="inline-flex items-center gap-1 shrink-0 px-2.5 py-1 rounded-md bg-[#100e0d] border border-[#221d18]">
            <Sparkles className="w-3 h-3 text-[#dfd0ba]" />
            <span>Levain 48H</span>
          </span>
          <span className="shrink-0 px-2.5 py-1 rounded-md bg-[#100e0d] border border-[#221d18]">
            Farine Tipo 00
          </span>
        </div>

      </div>

      {/* Bottom subtle divider line */}
      <div className="w-full max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#26211c] to-transparent mt-6" />

    </section>
  );
};
