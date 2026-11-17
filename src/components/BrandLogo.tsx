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
  const heights = {
    sm: 36,
    md: 44,
    lg: 54,
  }[size];

  // The logo PNG has a black background — wrap it in a dark rounded container
  // so it looks clean on both the ivory navbar and the navy footer.
  return (
    <div className="inline-flex items-center select-none">
      <div
        className="rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
        style={{
          background: '#000000',
          height: heights,
          width: heights,
          padding: 2,
        }}
      >
        <img
          src="/logo.png"
          alt="DistriSight logo"
          style={{ height: heights - 4, width: heights - 4, objectFit: 'contain' }}
          draggable={false}
        />
      </div>

      {!iconOnly && (
        <div className="ml-2.5 flex flex-col justify-center">
          <div
            className={`font-display font-bold tracking-tight leading-none ${
              size === 'sm' ? 'text-base' : size === 'lg' ? 'text-xl' : 'text-lg'
            }`}
          >
            <span className={variant === 'light' ? 'text-ivory' : 'text-navy'}>Distri</span>
            <span className={variant === 'light' ? 'text-teal' : 'text-teal'}>Sight</span>
          </div>
          {showTagline && (
            <span
              className={`font-mono uppercase tracking-widest mt-1 ${
                size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px]'
              } ${variant === 'light' ? 'text-ivory/60' : 'text-slate'}`}
            >
              Distribution Intelligence
            </span>
          )}
        </div>
      )}
    </div>
  );
};
