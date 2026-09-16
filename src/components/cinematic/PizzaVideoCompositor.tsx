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

  // Official high-definition pizza asset
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

  // Soft cinematic feathering mask: Centered area stays 100% sharp & visible.
  // Outer borders gradually blend into pure #000000 background with NO visible rectangular frame.
  const featheredMaskStyle: React.CSSProperties = {
    WebkitMaskImage:
      'radial-gradient(ellipse 85% 82% at 50% 50%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.25) 92%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)',
    maskImage:
      'radial-gradient(ellipse 85% 82% at 50% 50%, rgba(0,0,0,1) 64%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.25) 92%, rgba(0,0,0,0) 100%), linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%), linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 5%, rgba(0,0,0,1) 95%, rgba(0,0,0,0) 100%)',
    WebkitMaskComposite: 'source-in',
    maskComposite: 'intersect',
  };

  return (
    <div 
      className={`relative flex items-center justify-center select-none bg-black ${className}`}
      style={style}
    >
      {/* Pure black cinematic background integration. Zero container box outlines. */}
      <div 
        className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden"
        style={featheredMaskStyle}
      >
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
            transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
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
