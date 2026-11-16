import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const firstMount = useRef(true);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
      return;
    }
    if (reducedMotion) return;

    const wrapper = wrapperRef.current;
    const line = lineRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wrapper,
        { opacity: 0.01, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.38,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
        }
      );

      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0, opacity: 1 },
          {
            scaleX: 1,
            opacity: 0,
            duration: 0.38,
            ease: 'power2.out',
          }
        );
      }
    });

    return () => ctx.revert();
  }, [pathname, reducedMotion]);

  return (
    <>
      <div
        ref={lineRef}
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-rust)] origin-left pointer-events-none opacity-0"
        style={{ zIndex: 800 }}
      />
      <div ref={wrapperRef} className="w-full">
        {children}
      </div>
    </>
  );
};
