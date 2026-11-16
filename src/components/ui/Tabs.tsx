import React from 'react';
import { cn } from '../../lib/helpers';

export interface TabOption {
  id: string;
  label: string;
  count?: number;
}

interface TabsProps {
  tabs: TabOption[];
  activeId: string;
  onChange: (id: string) => void;
  darkSurface?: boolean;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  darkSurface = false,
  className,
}) => {
  return (
    <div
      role="tablist"
      className={cn(
        'flex flex-wrap gap-2 border-b pb-3',
        darkSurface ? 'border-[rgba(243,237,226,0.16)]' : 'border-[rgba(28,27,26,0.16)]',
        className
      )}
    >
      {tabs.map((tab) => {
        const active = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(tab.id)}
            className={cn(
              'min-h-[42px] px-4 py-2 rounded-[var(--radius-xs)] font-mono-spec text-[0.78rem] uppercase tracking-[0.06em] whitespace-nowrap shrink-0 transition-colors cursor-pointer border',
              active
                ? 'bg-[#B4532A] border-[#B4532A] text-[#F3EDE2] font-semibold hover:bg-[#7E3519] hover:border-[#7E3519] hover:text-[#F3EDE2]'
                : darkSurface
                ? 'bg-transparent border-[rgba(243,237,226,0.42)] text-[#F3EDE2] hover:bg-[#F3EDE2] hover:text-[#1C1B1A] hover:border-[#F3EDE2]'
                : 'bg-[#F3EDE2] border-[rgba(28,27,26,0.35)] text-[#1C1B1A] hover:bg-[#1C1B1A] hover:text-[#F3EDE2] hover:border-[#1C1B1A]'
            )}
          >
            <span className="text-current">{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span className="ml-2 opacity-80 text-current">
                ({tab.count})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
