import React, { createContext, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../lib/helpers';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export type ButtonSurface = 'light' | 'dark';
export type ButtonVariant =
  | 'primary'
  | 'dark'
  | 'light'
  | 'cream'
  | 'outline-on-dark'
  | 'outline-on-light'
  | 'outline'
  | 'outline-light'
  | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const SurfaceContext = createContext<ButtonSurface>('light');

export const SurfaceProvider: React.FC<{
  surface: ButtonSurface;
  children: React.ReactNode;
}> = ({ surface, children }) => (
  <SurfaceContext.Provider value={surface}>
    <div data-surface={surface}>{children}</div>
  </SurfaceContext.Provider>
);

function resolveVariantClass(variant: ButtonVariant | undefined, surface: ButtonSurface): string {
  switch (variant) {
    case 'primary':
      return 'btn--primary';
    case 'dark':
      return 'btn--dark';
    case 'light':
    case 'cream':
      return 'btn--light';
    case 'outline-on-dark':
    case 'outline-light':
      return 'btn--outline-on-dark';
    case 'outline-on-light':
    case 'outline':
      return surface === 'dark' ? 'btn--outline-on-dark' : 'btn--outline-on-light';
    case 'ghost':
      return surface === 'dark' ? 'btn--ghost btn--ghost-dark' : 'btn--ghost btn--ghost-light';
    default:
      return surface === 'dark' ? 'btn--light' : 'btn--primary';
  }
}

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'btn--sm',
  md: 'btn--md',
  lg: 'btn--lg',
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  surface?: ButtonSurface;
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
}

type ButtonAsButton = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: never;
    href?: never;
  };

type ButtonAsLink = BaseProps & {
  to: string;
  href?: never;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  'aria-label'?: string;
};

type ButtonAsAnchor = BaseProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    to?: never;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  surface,
  className,
  children,
  magnetic = true,
  ...rest
}) => {
  const ctxSurface = useContext(SurfaceContext);
  const resolvedSurface = surface || ctxSurface;
  const elRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!magnetic || reducedMotion) return;
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) return;
    const node = elRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.14;
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.18;
    node.style.transform = `translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  };

  const handleMouseLeave = () => {
    const node = elRef.current;
    if (!node) return;
    node.style.transform = 'translate3d(0, 0, 0)';
  };

  const baseClass = cn(
    'btn',
    resolveVariantClass(variant, resolvedSurface),
    SIZE_CLASSES[size],
    className
  );

  if ('to' in rest && rest.to) {
    const { to, onClick, ...anchorProps } = rest;
    return (
      <Link
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        to={to}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={baseClass}
        {...anchorProps}
      >
        {children}
      </Link>
    );
  }

  if ('href' in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <a
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={baseClass}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type={buttonProps.type || 'button'}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={baseClass}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export const LinkButton: React.FC<ButtonAsLink | ButtonAsAnchor> = (props) => {
  return <Button {...props} />;
};
