import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/helpers';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (isoDate: string) => void;
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange }) => {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const [open, setOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    if (value) return new Date(`${value}T12:00:00`);
    return new Date(today.getFullYear(), today.getMonth(), 1);
  });
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: Array<number | null> = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const displayLabel = value
    ? new Date(`${value}T12:00:00`).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Pick a preferred day (optional)';

  return (
    <div ref={wrapRef} className="relative w-full">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'w-full text-left border bg-[var(--color-cream)] px-3.5 pt-5 pb-2 min-h-[54px] rounded-[var(--radius-xs)] flex items-center justify-between gap-3 transition-colors duration-200 cursor-pointer',
          open
            ? 'border-[var(--color-rust)]'
            : 'border-[rgba(28,27,26,0.24)] hover:border-[rgba(28,27,26,0.45)]'
        )}
      >
        <div className="min-w-0 flex-1">
          <span className="block font-mono-spec text-[0.65rem] uppercase tracking-[0.09em] text-[var(--color-rust)]">
            {label}
          </span>
          <span
            className={cn(
              'block text-[0.95rem] truncate',
              value ? 'text-[var(--color-charcoal)] font-medium' : 'text-[var(--color-steel-dark)]'
            )}
          >
            {displayLabel}
          </span>
        </div>
        <Calendar size={18} className="text-[var(--color-rust)] shrink-0" />
      </button>

      {open && (
        <div
          data-surface="dark"
          style={{ zIndex: 100 }}
          className="absolute left-0 right-0 sm:right-auto sm:w-[310px] top-[calc(100%+4px)] bg-[var(--color-charcoal)] text-[var(--color-cream)] border border-[rgba(243,237,226,0.2)] shadow-[var(--shadow-workshop)] rounded-[var(--radius-xs)] p-3.5"
        >
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              aria-label="Previous month"
              onClick={() => setViewDate(new Date(year, month - 1, 1))}
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-xs)] text-[#F3EDE2] bg-transparent hover:bg-[#F3EDE2] hover:text-[#1C1B1A] transition-colors cursor-pointer"
            >
              <ChevronLeft size={17} />
            </button>
            <span className="font-mono-spec text-[0.8rem] uppercase tracking-[0.08em] text-[#F3EDE2]">
              {MONTHS[month]} {year}
            </span>
            <button
              type="button"
              aria-label="Next month"
              onClick={() => setViewDate(new Date(year, month + 1, 1))}
              className="w-9 h-9 flex items-center justify-center rounded-[var(--radius-xs)] text-[#F3EDE2] bg-transparent hover:bg-[#F3EDE2] hover:text-[#1C1B1A] transition-colors cursor-pointer"
            >
              <ChevronRight size={17} />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-1">
            {WEEKDAYS.map((wd) => (
              <div
                key={wd}
                className="text-center font-mono-spec text-[0.68rem] text-[var(--color-steel-light)] py-1"
              >
                {wd}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              const cellDate = new Date(year, month, day);
              const iso = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isPast = cellDate < today;
              const isSelected = value === iso;
              return (
                <button
                  key={iso}
                  type="button"
                  disabled={isPast}
                  onClick={() => {
                    onChange(iso);
                    setOpen(false);
                  }}
                  className={cn(
                    'h-9 rounded-[var(--radius-xs)] font-mono-spec text-[0.8rem] transition-colors',
                    isPast
                      ? 'text-[rgba(243,237,226,0.28)] cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#B4532A] text-[#F3EDE2] font-semibold cursor-pointer hover:bg-[#7E3519]'
                      : 'hover:bg-[#F3EDE2] hover:text-[#1C1B1A] text-[#F3EDE2] cursor-pointer'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {value && (
            <div className="mt-3 pt-2.5 border-t border-[rgba(243,237,226,0.12)] flex justify-between items-center">
              <span className="font-mono-spec text-[0.7rem] text-[var(--color-steel-light)]">
                Selected: {value}
              </span>
              <button
                type="button"
                onClick={() => {
                  onChange('');
                  setOpen(false);
                }}
                className="font-mono-spec text-[0.7rem] text-[#D07A4B] hover:text-[#F3EDE2] hover:underline cursor-pointer"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
