import React, { useId, useState } from 'react';
import { cn } from '../../lib/helpers';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  className,
  value,
  onFocus,
  onBlur,
  required,
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
              ? 'top-1.5 text-[0.65rem] tracking-[0.09em] text-[var(--color-rust)]'
              : 'top-1/2 -translate-y-1/2 text-[0.75rem] tracking-[0.06em] text-[var(--color-steel-dark)]'
          )}
        >
          {label}
          {required ? ' *' : ''}
        </label>
        <input
          id={id}
          value={value}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : hint ? `${id}-hint` : undefined}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          className="w-full bg-transparent px-3.5 pt-6 pb-2 text-[0.95rem] text-[var(--color-charcoal)] focus:outline-none min-h-[54px]"
          {...rest}
        />
        <span
          className={cn(
            'absolute bottom-0 left-0 h-[2px] bg-[var(--color-rust)] transition-transform duration-250 origin-left w-full',
            focused ? 'scale-x-100' : 'scale-x-0'
          )}
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-[0.8rem] text-[#9B2C1E] font-medium">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.78rem] text-[var(--color-steel-dark)]">
          {hint}
        </p>
      )}
    </div>
  );
};
