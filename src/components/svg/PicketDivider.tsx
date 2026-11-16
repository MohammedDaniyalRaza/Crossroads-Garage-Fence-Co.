import React from 'react';
import { cn } from '../../lib/helpers';

interface PicketDividerProps {
  topColor?: string;
  bottomColor?: string;
  accentLine?: boolean;
  className?: string;
}

export const PicketDivider: React.FC<PicketDividerProps> = ({
  topColor = 'var(--color-cream)',
  bottomColor = 'var(--color-charcoal)',
  accentLine = true,
  className,
}) => {
  const pickets = Array.from({ length: 48 });

  return (
    <div
      className={cn('w-full overflow-hidden select-none leading-none', className)}
      style={{ backgroundColor: topColor }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 34"
        preserveAspectRatio="none"
        className="w-full h-[22px] sm:h-[28px] md:h-[34px] block"
      >
        <path
          d={
            'M0,34 L0,16 ' +
            pickets
              .map((_, i) => {
                const x = i * 30;
                return `L${x + 4},16 L${x + 15},2 L${x + 26},16 L${x + 30},16`;
              })
              .join(' ') +
            ' L1440,34 Z'
          }
          fill={bottomColor}
        />
        {accentLine && (
          <path
            d={
              'M0,16 ' +
              pickets
                .map((_, i) => {
                  const x = i * 30;
                  return `L${x + 4},16 L${x + 15},2 L${x + 26},16 L${x + 30},16`;
                })
                .join(' ')
            }
            fill="none"
            stroke="var(--color-rust)"
            strokeWidth="1.5"
            strokeOpacity="0.65"
          />
        )}
      </svg>
    </div>
  );
};
