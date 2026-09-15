import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const current = window.scrollY;
      const p = Math.min(100, Math.max(0, (current / totalHeight) * 100));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-[2.5px] bg-[#121813]/60 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#547734] via-[#7db352] to-[#9bc774] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(84,119,52,0.5)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
