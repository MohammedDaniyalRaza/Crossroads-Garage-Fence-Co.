import React, { useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  onPrev,
  onNext,
}) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const prevFocus = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prevFocus?.focus?.();
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      data-surface="dark"
      style={{ zIndex: 1000 }}
      className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 bg-[rgba(18,17,16,0.88)] backdrop-blur-[2px]"
      onClick={onClose}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 55 && onPrev) onPrev();
        if (delta < -55 && onNext) onNext();
        touchStartX.current = null;
      }}
    >
      <div
        className="relative w-full max-w-[960px] max-h-[90vh] overflow-y-auto bg-[var(--color-charcoal)] text-[var(--color-cream)] border border-[rgba(243,237,226,0.22)] shadow-[var(--shadow-workshop)] rounded-[var(--radius-xs)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[rgba(243,237,226,0.14)]">
          <span className="font-mono-spec text-[0.78rem] uppercase tracking-[0.08em] text-[var(--color-paper)] truncate">
            {title}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {onPrev && (
              <button
                type="button"
                aria-label="Previous item"
                onClick={onPrev}
                className="btn btn--outline-on-dark btn--sm !min-w-[40px] !p-0"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {onNext && (
              <button
                type="button"
                aria-label="Next item"
                onClick={onNext}
                className="btn btn--outline-on-dark btn--sm !min-w-[40px] !p-0"
              >
                <ChevronRight size={18} />
              </button>
            )}
            <button
              ref={closeBtnRef}
              type="button"
              aria-label="Close modal"
              onClick={onClose}
              className="btn btn--primary btn--sm !min-w-[40px] !p-0"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="p-5 sm:p-7">{children}</div>
      </div>
    </div>
  );
};
