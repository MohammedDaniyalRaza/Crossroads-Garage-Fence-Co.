import React from 'react';
import { cn } from '../../lib/helpers';

export interface StepItem {
  step: string;
  title: string;
  detail: string;
}

interface StepperProps {
  steps: StepItem[];
  darkSurface?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({ steps, darkSurface = false }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5">
      {steps.map((item, idx) => (
        <div
          key={item.step}
          className={cn(
            'relative pt-5 border-t',
            darkSurface ? 'border-[rgba(243,237,226,0.2)]' : 'border-[rgba(28,27,26,0.2)]'
          )}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono-spec text-[0.78rem] font-semibold text-[var(--color-rust)]">
              STEP {item.step}
            </span>
            {idx < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  'hidden lg:inline-block font-mono-spec text-[0.7rem]',
                  darkSurface ? 'text-[var(--color-steel)]' : 'text-[var(--color-steel-dark)]'
                )}
              >
                ──→
              </span>
            )}
          </div>
          <h3
            className={cn(
              'font-display font-bold text-[1.125rem] leading-snug mb-2',
              darkSurface ? 'text-[var(--color-cream)]' : 'text-[var(--color-charcoal)]'
            )}
          >
            {item.title}
          </h3>
          <p
            className={cn(
              'text-[0.94rem] leading-relaxed',
              darkSurface ? 'text-[var(--color-paper)]' : 'text-[var(--color-steel-dark)]'
            )}
          >
            {item.detail}
          </p>
        </div>
      ))}
    </div>
  );
};
