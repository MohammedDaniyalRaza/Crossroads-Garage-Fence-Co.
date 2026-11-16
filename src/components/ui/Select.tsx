import React, { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../lib/helpers';

export interface SelectGroup {
  label: string;
  options: string[];
}

interface SelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  groups?: SelectGroup[];
  options?: string[];
  placeholder?: string;
  error?: string;
  required?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  groups,
  options,
  placeholder = 'Select an option',
  error,
  required,
}) => {
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonId = useId();
  const listboxId = useId();

  const flatOptions = groups
    ? groups.flatMap((g) => g.options)
    : options || [];

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
        return;
      }
      setHighlightedIndex((i) => Math.min(flatOptions.length - 1, i + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => Math.max(0, i - 1));
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!open) {
        setOpen(true);
      } else if (flatOptions[highlightedIndex]) {
        onChange(flatOptions[highlightedIndex]);
        setOpen(false);
      }
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        id={buttonId}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full text-left border bg-[var(--color-cream)] px-3.5 pt-5 pb-2 min-h-[54px] rounded-[var(--radius-xs)] flex items-center justify-between gap-3 transition-colors duration-200 cursor-pointer',
          error
            ? 'border-[#9B2C1E]'
            : open
            ? 'border-[var(--color-rust)]'
            : 'border-[rgba(28,27,26,0.24)] hover:border-[rgba(28,27,26,0.45)]'
        )}
      >
        <div className="min-w-0 flex-1">
          <span className="block font-mono-spec text-[0.65rem] uppercase tracking-[0.09em] text-[var(--color-rust)]">
            {label}
            {required ? ' *' : ''}
          </span>
          <span
            className={cn(
              'block text-[0.95rem] truncate',
              value ? 'text-[var(--color-charcoal)] font-medium' : 'text-[var(--color-steel-dark)]'
            )}
          >
            {value || placeholder}
          </span>
        </div>
        <ChevronDown
          size={18}
          className={cn(
            'text-[var(--color-steel-dark)] transition-transform duration-200 shrink-0',
            open && 'rotate-180 text-[var(--color-rust)]'
          )}
        />
      </button>

      {open && (
        <div
          id={listboxId}
          role="listbox"
          aria-labelledby={buttonId}
          className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-[290px] overflow-y-auto bg-[var(--color-charcoal)] text-[var(--color-cream)] border border-[rgba(243,237,226,0.18)] shadow-[var(--shadow-workshop)] rounded-[var(--radius-xs)] py-1.5"
        >
          {groups
            ? groups.map((group) => (
                <div key={group.label}>
                  <div className="px-3.5 py-2 font-mono-spec text-[0.68rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] border-b border-[rgba(243,237,226,0.08)]">
                    {group.label}
                  </div>
                  {group.options.map((opt) => {
                    const selected = value === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        role="option"
                        aria-selected={selected}
                        onClick={() => {
                          onChange(opt);
                          setOpen(false);
                        }}
                        className={cn(
                          'w-full text-left px-3.5 py-2.5 text-[0.9rem] flex items-center justify-between gap-2 transition-colors cursor-pointer',
                          selected
                            ? 'bg-[var(--color-rust)] text-[var(--color-cream)] font-medium'
                            : 'hover:bg-[rgba(243,237,226,0.08)] text-[var(--color-cream)]'
                        )}
                      >
                        <span>{opt}</span>
                        {selected && <Check size={15} />}
                      </button>
                    );
                  })}
                </div>
              ))
            : flatOptions.map((opt, idx) => {
                const selected = value === opt;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => {
                      onChange(opt);
                      setOpen(false);
                    }}
                    className={cn(
                      'w-full text-left px-3.5 py-2.5 text-[0.9rem] flex items-center justify-between gap-2 transition-colors cursor-pointer',
                      selected
                        ? 'bg-[var(--color-rust)] text-[var(--color-cream)] font-medium'
                        : idx === highlightedIndex
                        ? 'bg-[rgba(243,237,226,0.12)]'
                        : 'hover:bg-[rgba(243,237,226,0.08)]'
                    )}
                  >
                    <span>{opt}</span>
                    {selected && <Check size={15} />}
                  </button>
                );
              })}
        </div>
      )}

      {error && <p className="mt-1.5 text-[0.8rem] text-[#9B2C1E] font-medium">{error}</p>}
    </div>
  );
};
