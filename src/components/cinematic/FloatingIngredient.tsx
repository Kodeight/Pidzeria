import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { INGREDIENT_ASSETS, IngredientKey } from '../../data/ingredients';

gsap.registerPlugin(ScrollTrigger);

interface FloatingIngredientProps {
  ingredient: IngredientKey;
  className?: string;
  size?: number; // size in pixels (e.g. 80, 120, 160)
  parallaxSpeed?: number; // Y translation factor relative to scroll (e.g. -60 to 120)
  rotationSpeed?: number; // Rotation in degrees along scroll (e.g. -30 to 45)
  blur?: number; // Depth of field blur in px (e.g. 0 for sharp, 1-3 for foreground/background bokeh)
  opacity?: number; // Default 0.85 - 0.95
  hideOnMobile?: boolean;
  style?: React.CSSProperties;
}

export const FloatingIngredient: React.FC<FloatingIngredientProps> = ({
  ingredient,
  className = '',
  size = 110,
  parallaxSpeed = 60,
  rotationSpeed = 25,
  blur = 0,
  opacity = 0.9,
  hideOnMobile = false,
  style = {},
}) => {
  const elRef = useRef<HTMLDivElement>(null);
  const asset = INGREDIENT_ASSETS[ingredient];

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const effectiveParallax = isMobile ? parallaxSpeed * 0.4 : parallaxSpeed;
    const effectiveRotation = isMobile ? rotationSpeed * 0.5 : rotationSpeed;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress; // 0 to 1
        const yOffset = (p - 0.5) * effectiveParallax;
        const rot = (p - 0.5) * effectiveRotation;

        gsap.set(el, {
          y: yOffset,
          rotation: rot,
          force3D: true,
        });
      },
    });

    return () => {
      st.kill();
    };
  }, [parallaxSpeed, rotationSpeed]);

  if (!asset) return null;

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className={`pointer-events-none select-none will-change-transform ${
        hideOnMobile ? 'hidden md:block' : 'block'
      } ${className}`}
      style={{
        width: size,
        height: size,
        filter: blur > 0 ? `blur(${blur}px)` : undefined,
        opacity,
        ...style,
      }}
    >
      <img
        src={asset.src}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        className="w-full h-full object-contain pointer-events-none"
        style={{
          mixBlendMode: 'screen',
          maskImage: 'radial-gradient(circle at 50% 50%, black 72%, rgba(0,0,0,0.85) 88%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 72%, rgba(0,0,0,0.85) 88%, transparent 100%)',
        }}
      />
    </div>
  );
};
