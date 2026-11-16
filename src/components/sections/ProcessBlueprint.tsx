import React from 'react';
import { gsap } from '../../lib/gsap';
import { useGsapContext } from '../../hooks/useGsapContext';
import { Stepper } from '../ui/Stepper';

const STEPS = [
  {
    step: '01',
    title: 'Reach Out',
    detail:
      'Share your town and what you need—emergency door repair, a new residential bay, or a backyard perimeter fence.',
  },
  {
    step: '02',
    title: 'On-Site Measure & Itemized Quote',
    detail:
      'We inspect hardware or walk your property lines, take exact measurements, and write up a clear itemized quote.',
  },
  {
    step: '03',
    title: 'Build or Repair Right',
    detail:
      'Truck-stocked spring swaps or deep concrete fence footings below the Indiana frost line—installed cleanly.',
  },
  {
    step: '04',
    title: 'Clean-Up & Walkthrough',
    detail:
      'Old doors or debris are hauled off-site, balance and gate latches are tested with you, and we stand behind the job.',
  },
];

export const ProcessBlueprint: React.FC = () => {
  const ref = useGsapContext<HTMLElement>((_, el) => {
    const line = el.querySelector('.bp-line');
    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
            once: true,
          },
        }
      );
    }
  });

  return (
    <section ref={ref} className="surface-dark section-pad blueprint-grid-dark">
      <div className="container-arch">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="spec-kicker text-[var(--color-rust-light)] mb-2">
              Field Process · Free On-Site Measurements
            </p>
            <h2 className="h-section text-[var(--color-cream)] max-w-[20ch]">
              How every Crossroads job runs.
            </h2>
          </div>
          <span className="font-mono-spec text-[0.75rem] text-[var(--color-steel-light)]">
            NO GUESSWORK QUOTES · NO SURPRISE ADD-ONS
          </span>
        </div>

        {/* Animated Blueprint Dimension Line */}
        <div className="relative h-6 mb-8 flex items-center" aria-hidden="true">
          <span className="w-2 h-2 border-l border-y border-[var(--color-rust-light)]" />
          <div className="bp-line flex-1 h-[1.5px] bg-[var(--color-rust)] origin-left" />
          <span className="w-2 h-2 border-r border-y border-[var(--color-rust-light)]" />
        </div>

        <Stepper steps={STEPS} darkSurface />
      </div>
    </section>
  );
};
