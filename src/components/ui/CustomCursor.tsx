import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    document.body.classList.add('has-custom-cursor');
    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }
      const target = e.target as HTMLElement | null;
      const interactive = Boolean(target?.closest('a, button, [role="button"], input, textarea, select'));
      if (ringRef.current) {
        ringRef.current.dataset.hover = interactive ? 'true' : 'false';
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) {
        const isHover = ringRef.current.dataset.hover === 'true';
        const scale = isHover ? 1.55 : 1;
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${scale})`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      className="hidden lg:block pointer-events-none fixed inset-0"
      style={{ zIndex: 1200 }}
      aria-hidden="true"
    >
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] bg-[var(--color-rust)] rounded-full will-change-transform"
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 -ml-[14px] -mt-[14px] w-[28px] h-[28px] border border-[rgba(180,83,42,0.7)] rounded-full transition-colors duration-150 will-change-transform flex items-center justify-center"
        style={{ transform: 'translate3d(-100px,-100px,0)' }}
      >
        <span className="w-[8px] h-[1px] bg-[rgba(180,83,42,0.55)]" />
      </div>
    </div>
  );
};
