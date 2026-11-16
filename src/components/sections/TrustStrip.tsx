import React from 'react';
import { BUSINESS } from '../../data/business.js';
import { ALL_TOWNS } from '../../data/areas.js';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { CrossroadsGlyph } from '../svg/CrossroadsGlyph';

export const TrustStrip: React.FC = () => {
  const ref = useGsapContext<HTMLElement>((_, el) => {
    gsap.from('.trust-cell', {
      y: 20,
      opacity: 0,
      duration: 0.55,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'transform,opacity',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });
  });

  const marqueeItems = [
    ...ALL_TOWNS,
    'Broken Springs',
    'Smart Openers',
    'Carriage Doors',
    'Cedar Privacy',
    'Drive Gates',
  ];

  return (
    <section ref={ref} className="surface-cream border-b border-[var(--line-dark)]">
      <div className="container-arch py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {BUSINESS.valuePoints.map((vp) => (
            <div
              key={vp.index}
              className="trust-cell pt-4 border-t border-[rgba(28,27,26,0.22)] flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono-spec text-[0.74rem] text-[var(--color-rust)] font-semibold">
                  SPEC {vp.index}
                </span>
                <CrossroadsGlyph size={14} color="var(--color-steel)" />
              </div>
              <h2 className="font-display font-bold text-[1.2rem] text-[var(--color-charcoal)]">
                {vp.title}
              </h2>
              <p className="text-[0.94rem] text-[var(--color-steel-dark)] leading-relaxed">
                {vp.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Town & Trade Marquee */}
      <div className="bg-[var(--color-paper)] border-t border-[var(--line-dark)] py-3 overflow-hidden">
        <div className="marquee-track items-center gap-8 px-4">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-4 font-mono-spec text-[0.75rem] uppercase tracking-[0.09em] text-[var(--color-charcoal)] whitespace-nowrap"
            >
              <span className="text-[var(--color-rust)]">+</span>
              <span>{item}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
