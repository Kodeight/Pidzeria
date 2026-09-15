import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Helper to check for prefers-reduced-motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// ==========================================
// 1. FADE-UP
// ==========================================
interface FadeUpProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  id?: string;
}

export const FadeUp: React.FC<FadeUpProps> = ({
  children,
  delay = 0,
  duration = 0.9,
  distance = 40,
  className = '',
  id
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y: distance });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, distance]);

  return (
    <div ref={elRef} id={id} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// 2. FADE-LEFT (enters from left)
// ==========================================
interface FadeLeftProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  id?: string;
}

export const FadeLeft: React.FC<FadeLeftProps> = ({
  children,
  delay = 0,
  duration = 0.9,
  distance = -50,
  className = '',
  id
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, x: distance });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, distance]);

  return (
    <div ref={elRef} id={id} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// 3. FADE-RIGHT (enters from right)
// ==========================================
interface FadeRightProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  id?: string;
}

export const FadeRight: React.FC<FadeRightProps> = ({
  children,
  delay = 0,
  duration = 0.9,
  distance = 50,
  className = '',
  id
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, x: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, x: distance });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration,
          delay,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, distance]);

  return (
    <div ref={elRef} id={id} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// 4. SCALE REVEAL
// ==========================================
interface ScaleRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  initialScale?: number;
  distance?: number;
  className?: string;
  id?: string;
}

export const ScaleReveal: React.FC<ScaleRevealProps> = ({
  children,
  delay = 0,
  duration = 1.0,
  initialScale = 0.94,
  distance = 0,
  className = '',
  id
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, scale: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, scale: initialScale, y: distance });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration,
          delay,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay, duration, initialScale, distance]);

  return (
    <div ref={elRef} id={id} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// 5. STAGGER REVEAL
// ==========================================
interface StaggerRevealProps {
  children: React.ReactNode;
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  id?: string;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  staggerDelay = 0.12,
  duration = 0.8,
  distance = 35,
  className = '',
  id
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const childNodes = Array.from(container.children) as HTMLElement[];
    if (childNodes.length === 0) return;

    if (prefersReducedMotion()) {
      childNodes.forEach(c => gsap.set(c, { opacity: 1, y: 0 }));
      return;
    }

    childNodes.forEach(c => gsap.set(c, { opacity: 0, y: distance }));

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(childNodes, {
          opacity: 1,
          y: 0,
          duration,
          stagger: staggerDelay,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [staggerDelay, duration, distance]);

  return (
    <div ref={containerRef} id={id} className={className}>
      {children}
    </div>
  );
};

// ==========================================
// 6. PARALLAX
// ==========================================
interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // -1 to 1 (negative = moves up faster, positive = moves down slower)
  className?: string;
  id?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  speed = 0.15,
  className = '',
  id
}) => {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el || prefersReducedMotion()) return;

    const tween = gsap.fromTo(
      el,
      { y: 0 },
      {
        y: () => speed * 120,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [speed]);

  return (
    <div ref={elRef} id={id} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

// ==========================================
// 7. TEXT REVEAL (Progressive Word / Line Reveal)
// ==========================================
interface TextRevealProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  id?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  as = 'h2',
  className = '',
  delay = 0,
  id
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(' ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wordEls = container.querySelectorAll('.reveal-word');
    if (prefersReducedMotion()) {
      wordEls.forEach(w => gsap.set(w, { opacity: 1, y: 0 }));
      return;
    }

    gsap.set(wordEls, { opacity: 0, y: 22 });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(wordEls, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.04,
          delay,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [delay, text]);

  const Tag = as;

  return (
    <Tag ref={containerRef as any} id={id} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="inline-block overflow-hidden mr-[0.25em] align-top">
          <span className="reveal-word inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
};
