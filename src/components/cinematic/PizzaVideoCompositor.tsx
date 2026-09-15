import React, { useEffect, useRef, useState } from 'react';

interface PizzaVideoCompositorProps {
  scrollProgress: number; // 0 to 1
  onStageChange?: (stageIndex: number) => void;
}

export const PizzaVideoCompositor: React.FC<PizzaVideoCompositorProps> = ({
  scrollProgress,
  onStageChange
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const animFrameIdRef = useRef<number | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [duration, setDuration] = useState(10);

  // Use the official pizza.mp4 asset
  const videoSource = '/pizza.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      if (video.duration && isFinite(video.duration)) {
        setDuration(video.duration);
      }
      setIsVideoLoaded(true);
      // Cue first frame
      video.currentTime = 0.01;
      currentTimeRef.current = 0.01;
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);

    // Initial load
    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Update target time smoothly based on scroll progress
  useEffect(() => {
    // Clamp progress between 0 and 1
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    targetTimeRef.current = clampedProgress * duration;

    // Notify parent of stage index (0 to 6)
    if (onStageChange) {
      const stage = Math.min(6, Math.floor(clampedProgress * 7));
      onStageChange(stage);
    }
  }, [scrollProgress, duration, onStageChange]);

  // Smooth frame interpolation loop via requestAnimationFrame
  useEffect(() => {
    let isMounted = true;

    const renderLoop = () => {
      const video = videoRef.current;
      if (video && isVideoLoaded) {
        const target = targetTimeRef.current;
        const current = currentTimeRef.current;
        const diff = target - current;

        // Smooth interpolation (lerp)
        if (Math.abs(diff) > 0.005) {
          // Adjust lerp speed for responsive yet smooth transitions
          const step = diff * 0.18;
          const nextTime = current + step;
          currentTimeRef.current = nextTime;

          if (isFinite(nextTime) && nextTime >= 0 && nextTime <= duration) {
            // fast seek to the exact interpolated frame
            video.currentTime = nextTime;
          }
        }
      }

      if (isMounted) {
        animFrameIdRef.current = requestAnimationFrame(renderLoop);
      }
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      isMounted = false;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isVideoLoaded, duration]);

  return (
    <div className="relative w-full h-full flex items-center justify-center select-none bg-black overflow-hidden">
      {/* Ambient background matching pure black background of pizza.mp4 */}
      <div className="absolute inset-0 bg-black pointer-events-none" />

      {/* Subtle organic backlight behind the pizza using authentic brand leaf green */}
      <div 
        className="absolute w-[360px] sm:w-[500px] md:w-[600px] aspect-square rounded-full pointer-events-none opacity-20 blur-[100px] -z-0"
        style={{
          background: 'radial-gradient(circle, #547734 0%, #2b3d1b 45%, transparent 70%)'
        }}
      />

      {/* Video Container with radial edge feathering for 100% seamless boundary blend */}
      <div className="relative w-full max-w-[850px] aspect-[16/9] sm:aspect-[16/10] flex items-center justify-center z-10">
        <video
          ref={videoRef}
          src={videoSource}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain pointer-events-none select-none transition-opacity duration-700"
          style={{
            // Radial vignette mask softens the 1280x720 video edges directly into #000000
            maskImage: 'radial-gradient(ellipse 75% 72% at 50% 50%, black 55%, rgba(0,0,0,0.6) 82%, transparent 100%)',
            WebkitMaskImage: 'radial-gradient(ellipse 75% 72% at 50% 50%, black 55%, rgba(0,0,0,0.6) 82%, transparent 100%)',
            opacity: isVideoLoaded ? 1 : 0.4
          }}
          onError={(e) => {
            const vid = e.currentTarget;
            if (!vid.src.endsWith('/Pizza.mp4')) {
              vid.src = '/Pizza.mp4';
            }
          }}
        />

        {/* Loading placeholder while video loads */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-[#547734] uppercase tracking-widest">
            Chargement de la pizza artisanale...
          </div>
        )}
      </div>
    </div>
  );
};
