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
    <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-black/80 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-[#8c7e6c] via-[#dfd0ba] to-[#f7f2e7] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(223,208,186,0.3)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
