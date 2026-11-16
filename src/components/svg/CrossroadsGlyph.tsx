import React from 'react';
import { cn } from '../../lib/helpers';

interface CrossroadsGlyphProps {
  size?: number;
  className?: string;
  color?: string;
}

export const CrossroadsGlyph: React.FC<CrossroadsGlyphProps> = ({
  size = 18,
  className,
  color = 'currentColor',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn('shrink-0', className)}
    >
      <circle cx="12" cy="12" r="9.25" stroke={color} strokeWidth="1.35" strokeOpacity="0.45" />
      <line x1="12" y1="2" x2="12" y2="22" stroke={color} strokeWidth="1.5" />
      <line x1="2" y1="12" x2="22" y2="12" stroke={color} strokeWidth="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" fill="var(--color-rust)" />
    </svg>
  );
};
