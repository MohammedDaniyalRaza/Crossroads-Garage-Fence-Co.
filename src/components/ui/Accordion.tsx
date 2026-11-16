import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { cn } from '../../lib/helpers';

export interface AccordionItem {
  id: string;
  question: string;
  answer: string;
  meta?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  darkSurface?: boolean;
  defaultOpenId?: string | null;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  darkSurface = false,
  defaultOpenId = null,
}) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  return (
    <div
      className={cn(
        'divide-y',
        darkSurface
          ? 'divide-[rgba(243,237,226,0.14)] border-y border-[rgba(243,237,226,0.14)]'
          : 'divide-[rgba(28,27,26,0.14)] border-y border-[rgba(28,27,26,0.14)]'
      )}
    >
      {items.map((item, idx) => {
        const isOpen = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full py-5 sm:py-6 flex items-start justify-between gap-5 text-left group cursor-pointer"
            >
              <div className="flex items-baseline gap-4 min-w-0">
                <span className="font-mono-spec text-[0.75rem] text-[var(--color-rust)] shrink-0">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <div>
                  <span
                    className={cn(
                      'block text-[1.0625rem] sm:text-[1.15rem] font-semibold leading-snug transition-colors',
                      isOpen
                        ? 'text-[var(--color-rust)]'
                        : darkSurface
                        ? 'text-[var(--color-cream)] group-hover:text-[var(--color-rust-light)]'
                        : 'text-[var(--color-charcoal)] group-hover:text-[var(--color-rust)]'
                    )}
                  >
                    {item.question}
                  </span>
                  {item.meta && (
                    <span
                      className={cn(
                        'block font-mono-spec text-[0.7rem] mt-1',
                        darkSurface ? 'text-[var(--color-steel-light)]' : 'text-[var(--color-steel-dark)]'
                      )}
                    >
                      {item.meta}
                    </span>
                  )}
                </div>
              </div>
              <span
                className={cn(
                  'w-9 h-9 shrink-0 flex items-center justify-center border rounded-[var(--radius-xs)] transition-colors',
                  isOpen
                    ? 'bg-[var(--color-rust)] border-[var(--color-rust)] text-[var(--color-cream)]'
                    : darkSurface
                    ? 'border-[rgba(243,237,226,0.22)] text-[var(--color-cream)]'
                    : 'border-[rgba(28,27,26,0.22)] text-[var(--color-charcoal)]'
                )}
                aria-hidden="true"
              >
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </span>
            </button>
            <div
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-300 ease-[var(--ease-out-expo)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p
                  className={cn(
                    'pb-6 pl-9 sm:pl-10 pr-4 max-w-[68ch] text-[0.98rem] leading-relaxed',
                    darkSurface ? 'text-[var(--color-paper)]' : 'text-[var(--color-steel-dark)]'
                  )}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
