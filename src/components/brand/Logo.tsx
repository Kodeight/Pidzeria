import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', onClick }) => {
  const heightClasses = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-14',
    xl: 'h-16 sm:h-20 md:h-24'
  };

  return (
    <div 
      onClick={onClick}
      className={`inline-flex items-center select-none ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      <img
        src="/pidzeria.png"
        alt="PIDZERIA"
        className={`w-auto object-contain ${heightClasses[size]} drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]`}
        loading="eager"
        decoding="sync"
        onError={(e) => {
          const img = e.currentTarget;
          if (!img.src.endsWith('/pidzeria.PNG')) {
            img.src = '/pidzeria.PNG';
          }
        }}
      />
    </div>
  );
};
