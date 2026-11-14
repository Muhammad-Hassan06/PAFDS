import React from 'react';

interface BrandLogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  iconOnly?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false,
  iconOnly = false,
}) => {
  const dimensions = {
    sm: { box: 28, text: 'text-base', sub: 'text-[10px]' },
    md: { box: 34, text: 'text-lg', sub: 'text-[11px]' },
    lg: { box: 40, text: 'text-xl', sub: 'text-xs' },
  }[size];

  const isLight = variant === 'light';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      {/* Geometric Isometric Network + Sight Aperture Mark */}
      <svg
        width={dimensions.box}
        height={dimensions.box}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect
          width="36"
          height="36"
          rx="6"
          fill={isLight ? '#16273A' : '#101D2B'}
          stroke={isLight ? '#233446' : '#101D2B'}
          strokeWidth="1"
        />
        {/* Hexagonal distribution perimeter */}
        <path
          d="M18 6.2L28.8 12.3V23.7L18 29.8L7.2 23.7V12.3L18 6.2Z"
          stroke="#176B62"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Internal sight vectors converging on verified center */}
        <path
          d="M7.2 12.3L18 18.4L28.8 12.3"
          stroke="#F5F4EF"
          strokeWidth="1.5"
          strokeOpacity="0.88"
          strokeLinejoin="round"
        />
        <path
          d="M18 18.4V29.8"
          stroke="#F5F4EF"
          strokeWidth="1.5"
          strokeOpacity="0.88"
          strokeLinecap="round"
        />
        {/* Verified core node (Muted Amber) */}
        <circle
          cx="18"
          cy="18.4"
          r="3.1"
          fill="#D9A441"
          stroke="#101D2B"
          strokeWidth="1.2"
        />
        {/* Peripheral supply nodes */}
        <circle cx="18" cy="6.2" r="1.7" fill="#176B62" />
        <circle cx="28.8" cy="12.3" r="1.7" fill="#176B62" />
        <circle cx="7.2" cy="12.3" r="1.7" fill="#176B62" />
      </svg>

      {!iconOnly && (
        <div className="flex flex-col">
          <div className={`font-display font-bold tracking-tight leading-none ${dimensions.text}`}>
            <span className={isLight ? 'text-ivory' : 'text-navy'}>Distri</span>
            <span className={isLight ? 'text-amber' : 'text-teal'}>Sight</span>
          </div>
          {showTagline && (
            <span
              className={`font-mono uppercase tracking-widest mt-1 ${dimensions.sub} ${
                isLight ? 'text-ivory/60' : 'text-slate'
              }`}
            >
              Distribution Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
