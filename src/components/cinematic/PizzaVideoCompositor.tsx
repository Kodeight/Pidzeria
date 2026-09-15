import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PizzaVideoCompositorProps {
  scrollProgress: number; // 0 to 1
  onStageChange?: (stageIndex: number) => void;
}

export const PizzaVideoCompositor: React.FC<PizzaVideoCompositorProps> = ({ scrollProgress, onStageChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Video source - checking public or asset path
  const videoSrc = '/assets/pizza_animation.mp4';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsVideoReady(true);
      video.currentTime = 0.01;
    };

    const handleError = () => {
      console.warn('Video asset not directly accessible as file, using high quality Canvas Frame Renderer fallback.');
      setVideoError(true);
    };

    video.addEventListener('canplaythrough', handleCanPlay);
    video.addEventListener('loadeddata', handleCanPlay);
    video.addEventListener('error', handleError);

    video.load();

    return () => {
      video.removeEventListener('canplaythrough', handleCanPlay);
      video.removeEventListener('loadeddata', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  // Update currentTime when scrollProgress changes
  useEffect(() => {
    const video = videoRef.current;
    if (video && isVideoReady && video.duration) {
      const targetTime = scrollProgress * video.duration;
      // Smooth lerp or direct seek
      if (Math.abs(video.currentTime - targetTime) > 0.05) {
        video.currentTime = targetTime;
      }
    }

    // Determine stage index based on timeline
    // 0: Dough (0-0.12), 1: Sauce (0.12-0.24), 2: Mozzarella (0.24-0.38), 3: Toppings (0.38-0.58),
    // 4: Finished (0.58-0.70), 5: Baking (0.70-0.80), 6: Slicing (0.80-0.92), 7: Exploded (0.92-1.0)
    let stage = 0;
    if (scrollProgress >= 0.92) stage = 7;
    else if (scrollProgress >= 0.80) stage = 6;
    else if (scrollProgress >= 0.70) stage = 5;
    else if (scrollProgress >= 0.58) stage = 4;
    else if (scrollProgress >= 0.38) stage = 3;
    else if (scrollProgress >= 0.24) stage = 2;
    else if (scrollProgress >= 0.12) stage = 1;
    else stage = 0;

    if (onStageChange) {
      onStageChange(stage);
    }
  }, [scrollProgress, isVideoReady, onStageChange]);

  // Continuous Canvas render loop for compositing (Screen / Lighten blend + radial vignette)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      const video = videoRef.current;
      if (video && isVideoReady && !videoError) {
        // Draw video with SCREEN / LIGHTEN blend mode to extract black background cleanly
        ctx.save();
        ctx.globalCompositeOperation = 'screen';
        ctx.drawImage(video, 0, 0, width, height);
        ctx.restore();

        // Edge vignette blending for seamless transition into #0b0a0a page background
        const grad = ctx.createRadialGradient(
          width / 2, height / 2, Math.min(width, height) * 0.32,
          width / 2, height / 2, Math.min(width, height) * 0.49
        );
        grad.addColorStop(0, 'rgba(11, 10, 10, 0)');
        grad.addColorStop(1, 'rgba(11, 10, 10, 1)');

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      } else {
        // High quality Procedural / Canvas Frame Composite Fallback when video file is not present
        drawProceduralPizzaFrame(ctx, width, height, scrollProgress);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isVideoReady, videoError, scrollProgress]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Hidden Video element for source playback sync */}
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        playsInline
        preload="auto"
        className="hidden"
      />

      {/* Primary Composited Canvas Container */}
      <div className="relative w-full max-w-[700px] aspect-square flex items-center justify-center">
        <canvas
          ref={canvasRef}
          width={800}
          height={800}
          className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(217,119,6,0.2)]"
        />
      </div>
    </div>
  );
};

// Procedural high-detail canvas rendering helper for fallback/interactive stages
function drawProceduralPizzaFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  progress: number
) {
  const cx = w / 2;
  const cy = h / 2;
  const radius = Math.min(w, h) * 0.32;

  ctx.save();

  // Glow halo
  const ambientGlow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.4);
  ambientGlow.addColorStop(0, 'rgba(217, 119, 6, 0.15)');
  ambientGlow.addColorStop(0.7, 'rgba(239, 68, 68, 0.05)');
  ambientGlow.addColorStop(1, 'rgba(11, 10, 10, 0)');
  ctx.fillStyle = ambientGlow;
  ctx.fillRect(0, 0, w, h);

  // Stage 0: Dough
  if (progress < 0.15) {
    const doughP = Math.min(1, progress / 0.15);
    const doughR = radius * (0.6 + doughP * 0.4);
    
    ctx.beginPath();
    ctx.arc(cx, cy, doughR, 0, Math.PI * 2);
    const doughGrad = ctx.createRadialGradient(cx, cy, doughR * 0.2, cx, cy, doughR);
    doughGrad.addColorStop(0, '#fef3c7');
    doughGrad.addColorStop(0.8, '#fde68a');
    doughGrad.addColorStop(1, '#d97706');
    ctx.fillStyle = doughGrad;
    ctx.fill();

    // Flour dust particles
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2 + progress * 5;
      const dist = doughR * 0.8 + Math.sin(i * 3) * 20;
      ctx.beginPath();
      ctx.arc(cx + Math.cos(angle) * dist, cy + Math.sin(angle) * dist, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  } 
  // Stage 1: Sauce
  else if (progress < 0.28) {
    // Crust
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fde68a';
    ctx.fill();

    // Spiral Sauce pouring effect
    const sauceP = (progress - 0.15) / 0.13;
    const sauceR = radius * 0.85 * sauceP;
    
    ctx.beginPath();
    ctx.arc(cx, cy, sauceR, 0, Math.PI * 2);
    const sauceGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sauceR);
    sauceGrad.addColorStop(0, '#dc2626');
    sauceGrad.addColorStop(0.8, '#b91c1c');
    sauceGrad.addColorStop(1, '#991b1b');
    ctx.fillStyle = sauceGrad;
    ctx.fill();
  }
  // Stage 2: Cheese / Mozzarella
  else if (progress < 0.42) {
    // Crust & Sauce
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fde68a';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.85, 0, Math.PI * 2);
    ctx.fillStyle = '#b91c1c';
    ctx.fill();

    // Falling mozzarella shreds
    const cheeseP = (progress - 0.28) / 0.14;
    const shredCount = Math.floor(60 * cheeseP);
    ctx.fillStyle = '#fffbeb';
    
    for (let i = 0; i < shredCount; i++) {
      const angle = (i * 137.5) * (Math.PI / 180);
      const r = (Math.sqrt(i) / Math.sqrt(60)) * (radius * 0.8);
      const px = cx + Math.cos(angle) * r;
      const py = cy + Math.sin(angle) * r;
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(angle);
      ctx.fillRect(-6, -2, 12, 4);
      ctx.restore();
    }
  }
  // Stage 3 & 4: Toppings & Baked Pizza
  else if (progress < 0.80) {
    const isBaked = progress >= 0.60;
    
    // Crust
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    const crustGrad = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius);
    crustGrad.addColorStop(0, '#fde68a');
    crustGrad.addColorStop(1, isBaked ? '#92400e' : '#d97706');
    ctx.fillStyle = crustGrad;
    ctx.fill();

    // Base Cheese + Sauce
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 0.88, 0, Math.PI * 2);
    const baseGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.88);
    baseGrad.addColorStop(0, isBaked ? '#fef3c7' : '#fef08a');
    baseGrad.addColorStop(0.7, isBaked ? '#f59e0b' : '#ef4444');
    baseGrad.addColorStop(1, '#b91c1c');
    ctx.fillStyle = baseGrad;
    ctx.fill();

    // Pepperoni slices
    const pepperoniCoords = [
      { x: -0.4, y: -0.3 }, { x: 0.3, y: -0.4 }, { x: -0.2, y: 0.3 },
      { x: 0.4, y: 0.2 }, { x: 0.0, y: -0.1 }, { x: -0.5, y: 0.1 }
    ];

    pepperoniCoords.forEach(pos => {
      const px = cx + pos.x * radius * 0.8;
      const py = cy + pos.y * radius * 0.8;
      ctx.beginPath();
      ctx.arc(px, py, radius * 0.14, 0, Math.PI * 2);
      ctx.fillStyle = isBaked ? '#991b1b' : '#dc2626';
      ctx.fill();
      ctx.strokeStyle = '#7f1d1d';
      ctx.lineWidth = 3;
      ctx.stroke();
    });

    // Olives & Basil
    const oliveCoords = [
      { x: 0.1, y: -0.5 }, { x: -0.3, y: -0.1 }, { x: 0.2, y: 0.4 }, { x: -0.1, y: 0.5 }
    ];

    oliveCoords.forEach(pos => {
      const px = cx + pos.x * radius * 0.8;
      const py = cy + pos.y * radius * 0.8;
      ctx.beginPath();
      ctx.arc(px, py, radius * 0.05, 0, Math.PI * 2);
      ctx.fillStyle = '#0c0a09';
      ctx.fill();
    });
  }
  // Stage 6 & 7: Slicing & Exploded Floating Pizza Slices
  else {
    const explodeP = (progress - 0.80) / 0.20;
    const sliceCount = 8;

    for (let i = 0; i < sliceCount; i++) {
      const angleStart = (i / sliceCount) * Math.PI * 2 - Math.PI / 2;
      const angleEnd = ((i + 1) / sliceCount) * Math.PI * 2 - Math.PI / 2;
      const midAngle = (angleStart + angleEnd) / 2;

      const offsetDist = explodeP * radius * 0.45;
      const sx = cx + Math.cos(midAngle) * offsetDist;
      const sy = cy + Math.sin(midAngle) * offsetDist;

      ctx.save();
      ctx.translate(sx, sy);
      ctx.rotate(midAngle + Math.PI / 2);

      // Slice Path
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, -Math.PI / 8, Math.PI / 8);
      ctx.closePath();

      const sliceGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
      sliceGrad.addColorStop(0, '#fef3c7');
      sliceGrad.addColorStop(0.6, '#f59e0b');
      sliceGrad.addColorStop(0.9, '#b91c1c');
      sliceGrad.addColorStop(1, '#78350f');
      ctx.fillStyle = sliceGrad;
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Cheese stretch effect between slices
      if (explodeP < 0.6) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-offsetDist * 0.5, offsetDist * 0.2);
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();
    }
  }

  ctx.restore();
}
