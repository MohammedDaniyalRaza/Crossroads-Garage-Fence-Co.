import React, { useId, useState } from 'react';
import { cn } from '../../lib/helpers';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children, className }) => {
  const [visible, setVisible] = useState(false);
  const tipId = useId();

  return (
    <span
      className={cn('relative inline-flex items-center', className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      <span aria-describedby={visible ? tipId : undefined}>{children}</span>
      {visible && (
        <span
          id={tipId}
          role="tooltip"
          className="absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 w-max max-w-[240px] bg-[var(--color-charcoal-deep)] text-[var(--color-cream)] border border-[rgba(243,237,226,0.2)] rounded-[var(--radius-xs)] font-mono-spec text-[0.72rem] leading-snug shadow-[var(--shadow-card)] pointer-events-none"
        >
          {text}
        </span>
      )}
    </span>
  );
};
