import React, { useId, useState } from 'react';
import { cn } from '../../lib/helpers';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className,
  value,
  onFocus,
  onBlur,
  ...rest
}) => {
  const id = useId();
  const [focused, setFocused] = useState(false);
  const hasValue = Boolean(value && String(value).length > 0);
  const active = focused || hasValue;

  return (
    <div className={cn('relative w-full', className)}>
      <div
        className={cn(
          'relative border bg-[var(--color-cream)] transition-colors duration-200 rounded-[var(--radius-xs)]',
          error
            ? 'border-[#9B2C1E]'
            : focused
            ? 'border-[var(--color-rust)]'
            : 'border-[rgba(28,27,26,0.24)] hover:border-[rgba(28,27,26,0.45)]'
        )}
      >
        <label
          htmlFor={id}
          className={cn(
            'absolute left-3.5 pointer-events-none transition-all duration-200 ease-[var(--ease-out-expo)] font-mono-spec uppercase',
            active
              ? 'top-2 text-[0.65rem] tracking-[0.09em] text-[var(--color-rust)]'
              : 'top-4 text-[0.75rem] tracking-[0.06em] text-[var(--color-steel-dark)]'
          )}
        >
          {label}
        </label>
        <textarea
          id={id}
          value={value}
          aria-invalid={Boolean(error)}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="w-full bg-transparent px-3.5 pt-7 pb-3 text-[0.95rem] text-[var(--color-charcoal)] focus:outline-none min-h-[120px] resize-y"
          {...rest}
        />
      </div>
      {error && <p className="mt-1.5 text-[0.8rem] text-[#9B2C1E] font-medium">{error}</p>}
    </div>
  );
};
