import React, { useEffect, useRef, useState } from 'react';
import { BUSINESS } from '../../data/business.js';
import { gsap, ScrollTrigger } from '../../lib/gsap';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useLoader } from '../../app/LoaderContext';

export const Loader: React.FC = () => {
  const { showLoader, completeLoader } = useLoader();
  const [exiting, setExiting] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const finishedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!showLoader) return;

    finishedRef.current = false;

    const finalize = () => {
      if (finishedRef.current) return;
      finishedRef.current = true;
      const el = rootRef.current;
      if (el) {
        el.style.pointerEvents = 'none';
        el.style.zIndex = '-1';
      }
      try {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      } catch {
        // ignore
      }
      completeLoader();
      requestAnimationFrame(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      });
    };

    // Hard 3-second failsafe timeout so loader can never get stuck
    const hardFailsafe = window.setTimeout(finalize, 3000);

    try {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } catch {
      // ignore
    }

    if (reducedMotion) {
      const el = rootRef.current;
      if (el) {
        el.style.pointerEvents = 'none';
        el.style.transition = 'opacity 300ms ease';
        requestAnimationFrame(() => {
          if (el) el.style.opacity = '0';
        });
      }
      const rmTimer = window.setTimeout(finalize, 310);
      return () => {
        window.clearTimeout(hardFailsafe);
        window.clearTimeout(rmTimer);
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }

    let cancelled = false;
    let ctx: gsap.Context | null = null;

    const runSequence = async () => {
      try {
        const el = rootRef.current;
        if (!el) {
          finalize();
          return;
        }

        const initialProgressDone = new Promise<void>((resolve) => {
          ctx = gsap.context(() => {
            gsap.fromTo(
              '.cr-loader-progress',
              { scaleX: 0 },
              {
                scaleX: 0.78,
                duration: 0.55,
                ease: 'power2.out',
                onComplete: resolve,
              }
            );
          }, el);
        });

        // Gate only on document.fonts.ready OR 900ms max timeout, whichever comes first
        const fontsReady =
          typeof document !== 'undefined' && document.fonts?.ready
            ? document.fonts.ready.catch(() => undefined)
            : Promise.resolve();
        const maxGate = new Promise<void>((res) => window.setTimeout(res, 900));

        await Promise.all([initialProgressDone, Promise.race([fontsReady, maxGate])]);
        if (cancelled || finishedRef.current) return;

        const exitCtx = gsap.context(() => {
          const tl = gsap.timeline({
            onStart: () => {
              setExiting(true);
            },
            onComplete: () => {
              finalize();
            },
          });

          tl.to('.cr-loader-progress', {
            scaleX: 1,
            duration: 0.22,
            ease: 'power2.inOut',
          })
            .to(
              '.cr-loader-brand',
              {
                opacity: 0,
                y: -14,
                duration: 0.18,
                ease: 'power2.in',
              },
              '-=0.04'
            )
            .to(
              '.cr-loader-panel',
              {
                yPercent: -104,
                duration: 0.48,
                stagger: 0.045,
                ease: 'power3.inOut',
              },
              '-=0.08'
            );
        }, el);

        const prevCtx = ctx;
        ctx = {
          revert: () => {
            try {
              prevCtx?.revert();
            } catch {
              // ignore
            }
            try {
              exitCtx.revert();
            } catch {
              // ignore
            }
          },
        } as gsap.Context;
      } catch {
        finalize();
      }
    };

    runSequence();

    return () => {
      cancelled = true;
      window.clearTimeout(hardFailsafe);
      try {
        ctx?.revert();
      } catch {
        // ignore
      }
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showLoader, reducedMotion, completeLoader]);

  if (!showLoader) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="fixed inset-0 flex flex-col"
      style={{
        zIndex: exiting ? 1050 : 1100,
        pointerEvents: exiting ? 'none' : 'auto',
      }}
    >
      {/* 4 Sectional Garage Door Panels */}
      {[0, 1, 2, 3].map((idx) => (
        <div
          key={idx}
          className="cr-loader-panel flex-1 w-full bg-[var(--color-charcoal-deep)] border-b border-[rgba(180,83,42,0.34)]"
        />
      ))}

      {/* Centered Logo + Thin Rust Progress Line */}
      <div className="cr-loader-brand absolute inset-0 flex flex-col items-center justify-center px-6">
        <img
          src={BUSINESS.logo}
          alt={BUSINESS.name}
          className="w-24 h-24 rounded-full object-contain mb-5"
        />
        <div className="w-44 h-[2px] bg-[rgba(243,237,226,0.16)] overflow-hidden">
          <div className="cr-loader-progress w-full h-full bg-[var(--color-rust)] origin-left scale-x-0" />
        </div>
        <span className="mt-3 font-mono-spec text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-paper)]">
          Lafayette · Avon · Indiana
        </span>
      </div>
    </div>
  );
};
