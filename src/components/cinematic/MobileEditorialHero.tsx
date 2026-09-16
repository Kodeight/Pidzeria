import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowUpRight, Calendar, Flame, Sparkles, Disc3, RotateCw } from 'lucide-react';
import mobilePizzaImg from '../../assets/images/artisan_mobile_pizza_1789519581472.jpg';

interface MobileEditorialHeroProps {
  onNavigateToMenu: () => void;
  onNavigateToReservation: () => void;
}

export const MobileEditorialHero: React.FC<MobileEditorialHeroProps> = ({
  onNavigateToMenu,
  onNavigateToReservation,
}) => {
  const diskRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState<number>(0);
  const [isInteracting, setIsInteracting] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [rpmDisplay, setRpmDisplay] = useState<number>(33);

  // Drag physics tracking refs
  const isDraggingRef = useRef<boolean>(false);
  const lastAngleRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);
  const currentRotationRef = useRef<number>(0);

  // Sync ref with state
  useEffect(() => {
    currentRotationRef.current = rotation;
  }, [rotation]);

  // Calculate angle between disk center and pointer (x, y)
  const getAngle = useCallback((clientX: number, clientY: number): number => {
    if (!diskRef.current) return 0;
    const rect = diskRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = clientX - centerX;
    const dy = clientY - centerY;
    return Math.atan2(dy, dx) * (180 / Math.PI);
  }, []);

  // Inertial momentum animation loop
  const startMomentumLoop = useCallback(() => {
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    let lastTimestamp = performance.now();

    const step = (now: number) => {
      const dt = Math.min(now - lastTimestamp, 32);
      lastTimestamp = now;

      if (!isDraggingRef.current) {
        // Friction decay
        velocityRef.current *= Math.pow(0.95, dt / 16);

        // Calculate approximate RPM for display
        const currentRpm = Math.round(Math.abs(velocityRef.current * 10));
        setRpmDisplay(Math.max(16, Math.min(78, currentRpm > 2 ? currentRpm : 33)));

        // If speed is very low, maintain a gentle idle ambient turntable rotation
        if (Math.abs(velocityRef.current) < 0.05) {
          velocityRef.current = 0.06; // ~1.5 RPM ambient vinyl spin
        }

        const nextRot = (currentRotationRef.current + velocityRef.current * (dt / 16) * 2) % 360;
        currentRotationRef.current = nextRot;
        setRotation(nextRot);
      }

      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  // Mount ambient turntable spin
  useEffect(() => {
    velocityRef.current = 0.08;
    startMomentumLoop();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [startMomentumLoop]);

  // Pointer/Touch Handlers
  const handleStart = (clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    setIsInteracting(true);
    setHasInteracted(true);
    const angle = getAngle(clientX, clientY);
    lastAngleRef.current = angle;
    lastTimeRef.current = performance.now();
    velocityRef.current = 0;
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const now = performance.now();
    const dt = Math.max(now - lastTimeRef.current, 1);
    const angle = getAngle(clientX, clientY);

    let deltaAngle = angle - lastAngleRef.current;
    // Normalize jump over the -180/180 boundary
    if (deltaAngle > 180) deltaAngle -= 360;
    if (deltaAngle < -180) deltaAngle += 360;

    const newRotation = (currentRotationRef.current + deltaAngle) % 360;
    currentRotationRef.current = newRotation;
    setRotation(newRotation);

    // Compute angular velocity with smoothing
    const instVelocity = deltaAngle / (dt / 16);
    velocityRef.current = velocityRef.current * 0.4 + instVelocity * 0.6;

    lastAngleRef.current = angle;
    lastTimeRef.current = now;
  };

  const handleEnd = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsInteracting(false);
  };

  // Touch event handlers
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  // Mouse event handlers for desktop preview testing
  const onMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggingRef.current) {
      handleMove(e.clientX, e.clientY);
    }
  };

  return (
    <section 
      onMouseMove={onMouseMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      className="relative w-full min-h-[90vh] bg-[#000000] pt-28 pb-14 px-5 sm:px-8 flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[320px] h-[320px] bg-[#dfd0ba]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. EDITORIAL TEXT CONTENT */}
      <div className="relative z-20 max-w-lg mx-auto w-full flex flex-col items-start text-left">
        
        {/* Brand / Category label */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12100e] border border-[#2a241f] text-[#dfd0ba] text-[11px] font-mono tracking-widest uppercase mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-[#dfd0ba] animate-pulse" />
          <span>Pizzeria Artisanale • Alger</span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-[#f7f2e7] leading-[1.12] tracking-tight mb-3">
          L’Italie rencontre l’Algérie.
        </h1>

        {/* Short supporting description */}
        <p className="text-sm sm:text-base text-[#cbb89d] font-light leading-relaxed mb-6 max-w-md">
          L’art noble de la pizza napolitaine au levain naturel, sublimé par la générosité et les épices authentiques de notre terroir algérois.
        </p>

        {/* Clear, High-Contrast Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full mb-6">
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

        {/* Artisanal Feature Badges */}
        <div className="flex items-center gap-2.5 text-[11px] font-mono text-[#8c7e6c] pt-2 pb-1 overflow-x-auto no-scrollbar w-full">
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

      {/* 2. ROTATABLE VINTAGE VINYL PIZZA PLATTER (Touch & Scratch on Mobile) */}
      <div className="relative z-10 w-full max-w-[340px] sm:max-w-md mx-auto aspect-square flex flex-col items-center justify-center mt-6">
        
        {/* Interactive Vinyl disk container */}
        <div
          ref={diskRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={handleEnd}
          onTouchCancel={handleEnd}
          onMouseDown={onMouseDown}
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none group"
          style={{ touchAction: 'none' }}
        >
          {/* Turntable Platter Outer Grooves */}
          <div className="absolute inset-0 rounded-full border border-[#26211b] bg-[#080706] shadow-[0_0_60px_rgba(0,0,0,0.9)] -z-10 pointer-events-none opacity-80" />
          <div className="absolute inset-3 rounded-full border border-[#1b1713] pointer-events-none opacity-60" />
          <div className="absolute inset-6 rounded-full border border-[#14110e] pointer-events-none opacity-40" />

          {/* Rotating Pizza Vinyl Disc */}
          <div
            className="relative w-[92%] h-[92%] rounded-full overflow-hidden flex items-center justify-center transition-transform duration-75 will-change-transform shadow-[0_15px_40px_rgba(0,0,0,0.95)]"
            style={{
              transform: `rotate(${rotation}deg)`,
            }}
          >
            <img
              src={mobilePizzaImg}
              alt="PIDZERIA - Pizza Vinyle rotative"
              loading="eager"
              decoding="async"
              draggable={false}
              className="w-full h-full object-contain rounded-full pointer-events-none select-none"
            />

            {/* Subtle Vinyl Grooves Overlay Reflection */}
            <div className="absolute inset-0 rounded-full pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-60" />

            {/* Center Spindle Core (Vintage Vinyl Label) */}
            <div className="absolute w-12 h-12 rounded-full bg-[#0d0b09] border border-[#3a3229] flex items-center justify-center shadow-lg shadow-black pointer-events-none">
              <div className="w-3.5 h-3.5 rounded-full bg-[#dfd0ba] border border-[#110f0d] flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-black" />
              </div>
            </div>
          </div>
        </div>

        {/* Vinyl Interactive Scratch/Spin Indicator Pill */}
        <div className="mt-4 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#12100e]/95 border border-[#2e2720] text-[11px] font-mono text-[#cbb89d] shadow-lg backdrop-blur-md">
          <Disc3 className={`w-3.5 h-3.5 text-[#dfd0ba] ${isInteracting ? 'animate-spin' : ''}`} />
          <span className="text-[#dfd0ba] font-semibold">
            {isInteracting ? 'Scratch en direct...' : 'Disque Vinyle 💿'}
          </span>
          <span className="text-[#6e6254]">•</span>
          <span className="text-[#8c7e6c]">
            {hasInteracted ? `${rpmDisplay} RPM` : 'Touchez & faites tourner'}
          </span>
          <RotateCw className="w-3 h-3 text-[#8c7e6c] animate-spin" style={{ animationDuration: '6s' }} />
        </div>

      </div>

      {/* Bottom subtle divider line */}
      <div className="w-full max-w-xs mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#26211c] to-transparent mt-8" />

    </section>
  );
};
