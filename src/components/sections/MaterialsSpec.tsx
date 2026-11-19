import React from 'react';
import { SmartImage } from '../ui/SmartImage';
import { Button } from '../ui/Button';

const MATERIAL_SPECS = [
  {
    code: 'MAT-01',
    title: 'High-Cycle Oil-Tempered Torsion Springs',
    spec: 'Stocked directly on service trucks for single-visit replacement.',
    detail:
      'Builder-grade springs wear out fast under daily family traffic. We size oil-tempered steel springs to your exact door weight for balanced, smooth counterbalance.',
  },
  {
    code: 'MAT-02',
    title: 'Commercial-Grade Rollers, Cables & Openers',
    spec: 'Nylon ball-bearing rollers · LiftMaster, Chamberlain & Genie',
    detail:
      'Galvanized aircraft lift cables, heavy-gauge numbered hinges, and sealed nylon rollers replace noisy, binding steel hardware.',
  },
  {
    code: 'MAT-03',
    title: 'Ground-Contact Pine & Western Red Cedar',
    spec: 'Concrete post footings set below the Indiana frost line',
    detail:
      'Shallow fence posts heave when Indiana clay freezes and thaws. We pour deep concrete footings and frame with weather-resistant lumber.',
  },
  {
    code: 'MAT-04',
    title: 'Weather-Resistant Steel, Vinyl & Aluminum',
    spec: 'Insulated sandwich steel doors · Powder-coated gates & rails',
    detail:
      'From insulated steel panels and rigid bottom weatherstrips to sag-resistant welded or cross-braced gates built to stay plumb.',
  },
];

export const MaterialsSpec: React.FC = () => {
  return (
    <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
      <div className="container-arch">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Sticky Header + Asymmetric Photos */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="spec-kicker text-[var(--color-rust)] mb-2">
                Built-to-Last Proof
              </p>
              <h2 className="h-section text-[var(--color-charcoal)] mb-4">
                Hardware &amp; lumber that hold up through{' '}
                <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                  Indiana winters.
                </span>
              </h2>
              <p className="body-copy text-[var(--color-steel-dark)]">
                We do not cut corners with thin-gauge brackets, unsealed rollers, or shallow post
                holes. Every replacement part and fence stick is chosen for longevity.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-3 items-stretch">
              <div className="col-span-7">
                <SmartImage
                  imageKey="shopWrenchWall"
                  aspectRatio="4 / 3"
                  className="h-full border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)]"
                />
              </div>
              <div className="col-span-5">
                <SmartImage
                  imageKey="carpentryBench"
                  aspectRatio="3 / 4"
                  className="h-full border border-[rgba(28,27,26,0.2)] rounded-[var(--radius-xs)]"
                />
              </div>
            </div>

            <Button to="/contact" variant="dark" size="md">
              Request On-Site Material Walkthrough
            </Button>
          </div>

          {/* Right Spec Sheet List */}
          <div className="lg:col-span-7 divide-y divide-[var(--line-dark)] border-y border-[var(--line-dark)]">
            {MATERIAL_SPECS.map((item) => (
              <div key={item.code} className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-3">
                  <span className="font-mono-spec text-[0.75rem] font-semibold text-[var(--color-rust)] block">
                    {item.code}
                  </span>
                </div>
                <div className="sm:col-span-9 space-y-2">
                  <h3 className="font-display font-bold text-[1.22rem] text-[var(--color-charcoal)]">
                    {item.title}
                  </h3>
                  <p className="font-mono-spec text-[0.76rem] text-[var(--color-steel-dark)]">
                    {item.spec}
                  </p>
                  <p className="body-copy text-[var(--color-steel-dark)]">
                    {item.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
