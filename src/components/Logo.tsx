import React from 'react';

interface LogoProps {
  variant?: 'full' | 'compact' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'light' | 'dark';
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  theme = 'light',
  className = '',
  onClick,
}) => {
  // Dimension tokens
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-11 h-11',
    xl: 'w-14 h-14',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl sm:text-4xl',
  };

  const badgeSizes = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
    xl: 'text-sm px-2.5 py-1',
  };

  const subtitleSizes = {
    sm: 'text-[9px]',
    md: 'text-[10px]',
    lg: 'text-xs',
    xl: 'text-sm',
  };

  const isDark = theme === 'dark';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none ${
        onClick ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Crafted Architectural Space Vector Emblem */}
      <div
        className={`${iconSizes[size]} relative shrink-0 rounded-2xl bg-gradient-to-br from-[#2F3626] via-[#3B4330] to-[#1E2318] p-1.5 shadow-[0_4px_12px_rgba(47,54,38,0.25)] border border-[#8B9A6E]/50 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:shadow-[0_6px_18px_rgba(139,154,110,0.35)]`}
      >
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Subtle background glow */}
          <circle cx="18" cy="18" r="14" fill="#8B9A6E" fillOpacity="0.18" />

          {/* Isometric Space Structure: Combines a modern architectural portal, storefront canopy, and room geometry */}
          {/* Base foundation platform */}
          <path
            d="M6 24L18 30L30 24L18 18L6 24Z"
            fill="#8B9A6E"
            fillOpacity="0.3"
          />

          {/* Left wall / shop pillar */}
          <path
            d="M6 24L18 18V9L6 15V24Z"
            fill="url(#leftWallGradient)"
            stroke="#8B9A6E"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Right wall / facade */}
          <path
            d="M30 24L18 18V9L30 15V24Z"
            fill="url(#rightWallGradient)"
            stroke="#A7B68B"
            strokeWidth="0.75"
            strokeLinejoin="round"
          />

          {/* Dynamic Arched Roof / Canopy (Modern African Architecture inspired by Ibom Hall / Tropicana arches) */}
          <path
            d="M10 13C10 8 26 8 26 13L18 9L10 13Z"
            fill="#F3CD6D"
            fillOpacity="0.85"
          />

          {/* Central Beacon of Truth & Open Direct Access (Radiant Diamond Star) */}
          <path
            d="M18 12L20.5 16.5L25 18L20.5 19.5L18 24L15.5 19.5L11 18L15.5 16.5L18 12Z"
            fill="#F7F2EB"
            filter="drop-shadow(0 0 4px #8B9A6E)"
          />

          {/* Inner Checkmark Emblem (Verified Truth) */}
          <path
            d="M15.5 18.2L17.2 20L21 16"
            stroke="#2F3626"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Definitions */}
          <defs>
            <linearGradient
              id="leftWallGradient"
              x1="6"
              y1="9"
              x2="18"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#8B9A6E" />
              <stop offset="1" stopColor="#5E6C47" />
            </linearGradient>
            <linearGradient
              id="rightWallGradient"
              x1="30"
              y1="9"
              x2="18"
              y2="24"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#A7B68B" />
              <stop offset="1" stopColor="#7E8D62" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Brand Typography & Tagline */}
      {variant !== 'icon-only' && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-none">
            <span
              className={`font-heading font-extrabold tracking-tight ${titleSizes[size]} ${
                isDark ? 'text-white' : 'text-[#2F3626]'
              }`}
            >
              Rent<span className="text-[#8B9A6E]">Space</span>
            </span>

            <span
              className={`font-mono font-bold rounded-md bg-[#8B9A6E] text-white tracking-wider uppercase shadow-2xs ${badgeSizes[size]}`}
            >
              AKS
            </span>
          </div>

          {variant === 'full' && (
            <p
              className={`font-medium tracking-tight mt-0.5 leading-none ${subtitleSizes[size]} ${
                isDark ? 'text-[#EAE2D6]/70' : 'text-[#2F3626]/60'
              }`}
            >
              Houses • Stores • Event Spaces • Uyo
            </p>
          )}
        </div>
      )}
    </div>
  );
};
