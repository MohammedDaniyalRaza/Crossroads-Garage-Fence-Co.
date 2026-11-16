import React from 'react';
import { cn } from '../../lib/helpers';

interface ChipToggleProps {
  label: string;
  code?: string;
  selected: boolean;
  onClick: () => void;
  darkSurface?: boolean;
  className?: string;
}

export const ChipToggle: React.FC<ChipToggleProps> = ({
  label,
  code,
  selected,
  onClick,
  darkSurface = false,
  className,
}) => {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        'min-h-[42px] px-4 py-2 rounded-[var(--radius-xs)] border text-left inline-flex items-center gap-2.5 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer text-[0.875rem]',
        selected
          ? 'bg-[#B4532A] border-[#B4532A] text-[#F3EDE2] font-semibold hover:bg-[#7E3519] hover:border-[#7E3519] hover:text-[#F3EDE2]'
          : darkSurface
          ? 'bg-[#262422] border-[rgba(243,237,226,0.35)] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#1C1B1A] hover:border-[#F3EDE2]'
          : 'bg-[#F3EDE2] border-[rgba(28,27,26,0.38)] text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-[#F3EDE2] hover:border-[#1C1B1A]',
        className
      )}
    >
      {code && (
        <span className="font-mono-spec text-[0.6875rem] opacity-85 text-current">
          {code}
        </span>
      )}
      <span className="text-current">{label}</span>
    </button>
  );
};
