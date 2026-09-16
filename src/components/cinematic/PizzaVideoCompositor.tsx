import React, { useEffect, useRef, useState } from 'react';

interface PizzaVideoCompositorProps {
  scrollProgress: number; // 0 to 1
  onStageChange?: (stageIndex: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PizzaVideoCompositor: React.FC<PizzaVideoCompositorProps> = ({
  scrollProgress,
  onStageChange,
  className = '',
  style = {},
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
      video.currentTime = 0.01;
      currentTimeRef.current = 0.01;
    };

    const handleCanPlay = () => {
      setIsVideoLoaded(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('canplay', handleCanPlay);

    video.load();

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, []);

  // Sync target time with scroll progress (clamped 0 to 1)
  useEffect(() => {
    const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
    targetTimeRef.current = clampedProgress * duration;

    if (onStageChange) {
      const stage = Math.min(6, Math.floor(clampedProgress * 7));
      onStageChange(stage);
    }
  }, [scrollProgress, duration, onStageChange]);

  // Smooth frame interpolation loop via requestAnimationFrame (buttery smooth scrubbing)
  useEffect(() => {
    let isMounted = true;

    const renderLoop = () => {
      const video = videoRef.current;
      if (video && isVideoLoaded) {
        const target = targetTimeRef.current;
        const current = currentTimeRef.current;
        const diff = target - current;

        // Smooth responsive interpolation
        if (Math.abs(diff) > 0.003) {
          const step = diff * 0.28;
          const nextTime = current + step;
          currentTimeRef.current = nextTime;

          if (isFinite(nextTime) && nextTime >= 0 && nextTime <= duration) {
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
    <div 
      className={`relative flex items-center justify-center select-none bg-black ${className}`}
      style={style}
    >
      {/* Absolute black background match. ZERO gray halos, ZERO container boxes, ZERO artificial glow.
          The video is a pure cinematic visual layer seamlessly blending into the #000000 website canvas */}
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={videoSource}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain pointer-events-none select-none bg-black"
          style={{
            // Keep native colors, cheese highlights, flour specks and natural video lighting intact.
            // Screen blending on #000000 merges true black with 100% mathematical perfection.
            mixBlendMode: 'screen',
            opacity: isVideoLoaded ? 1 : 0,
            transition: 'opacity 0.5s ease-out',
          }}
          onError={(e) => {
            const vid = e.currentTarget;
            if (!vid.src.endsWith('/Pizza.mp4')) {
              vid.src = '/Pizza.mp4';
            }
          }}
        />

        {/* Minimal silent placeholder during initial load */}
        {!isVideoLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-xs font-mono text-[#8c7e6c] uppercase tracking-widest pointer-events-none">
            PIDZERIA CINEMATIC
          </div>
        )}
      </div>
    </div>
  );
};
