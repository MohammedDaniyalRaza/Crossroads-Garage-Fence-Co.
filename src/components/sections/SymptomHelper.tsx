import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle, ArrowRight, Wrench } from 'lucide-react';
import { SYMPTOMS } from '../../data/symptoms.js';
import { buildEstimateUrl } from '../../lib/helpers';
import { ChipToggle } from '../ui/ChipToggle';
import { Button } from '../ui/Button';

export const SymptomHelper: React.FC = () => {
  const [selectedId, setSelectedId] = useState(SYMPTOMS[0].id);
  const active = SYMPTOMS.find((s) => s.id === selectedId) || SYMPTOMS[0];

  return (
    <section className="surface-cream section-pad border-b border-[var(--line-dark)]">
      <div className="container-arch">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left column: Selector */}
          <div className="lg:col-span-6 space-y-5">
            <p className="spec-kicker text-[var(--color-rust)]">
              Interactive Diagnostic Check
            </p>
            <h2 className="h-section text-[var(--color-charcoal)]">
              What&apos;s wrong with your{' '}
              <span className="font-serif-accent font-normal text-[var(--color-rust)]">
                garage door?
              </span>
            </h2>
            <p className="lead-copy text-[var(--color-steel-dark)]">
              Pick the symptom closest to what you see or hear in your bay to see the likely
              mechanical issue and what our truck crew checks first.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2" role="group" aria-label="Door symptoms">
              {SYMPTOMS.map((symptom) => (
                <ChipToggle
                  key={symptom.id}
                  code={symptom.code}
                  label={symptom.label}
                  selected={symptom.id === selectedId}
                  onClick={() => setSelectedId(symptom.id)}
                />
              ))}
            </div>
          </div>

          {/* Right column: Spec readout */}
          <div className="lg:col-span-6">
            <div data-surface="dark" className="reg-frame bg-[var(--color-charcoal)] text-[var(--color-cream)] p-6 sm:p-8 rounded-[var(--radius-xs)] border border-[rgba(28,27,26,0.2)] shadow-[var(--shadow-workshop)] space-y-6">
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-[rgba(243,237,226,0.14)]">
                <div>
                  <span className="font-mono-spec text-[0.72rem] uppercase tracking-[0.1em] text-[var(--color-rust-light)] block">
                    Symptom Readout · {active.code}
                  </span>
                  <h3 className="font-display font-bold text-[1.45rem] text-[var(--color-cream)] mt-1">
                    {active.label}
                  </h3>
                </div>
                <Wrench size={22} className="text-[var(--color-rust-light)] shrink-0" />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="font-mono-spec text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-steel-light)] block mb-1">
                    Likely Mechanical Issue
                  </span>
                  <p className="text-[0.98rem] text-[var(--color-paper)] leading-relaxed">
                    {active.likelyCause}
                  </p>
                </div>

                <div>
                  <span className="font-mono-spec text-[0.7rem] uppercase tracking-[0.08em] text-[var(--color-steel-light)] block mb-1">
                    Typical Repair Scope
                  </span>
                  <Link
                    to={active.serviceRoute}
                    className="inline-flex items-center gap-2 font-semibold text-[1.02rem] text-[var(--color-rust-light)] hover:underline"
                  >
                    <span>{active.recommendedService}</span>
                    <ArrowRight size={15} />
                  </Link>
                </div>

                <div className="p-4 bg-[rgba(180,83,42,0.14)] border border-[rgba(180,83,42,0.38)] rounded-[var(--radius-xs)] flex items-start gap-3">
                  <AlertTriangle size={18} className="text-[var(--color-rust-light)] shrink-0 mt-0.5" />
                  <p className="text-[0.875rem] text-[var(--color-paper)] leading-relaxed">
                    {active.safetyNote}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[rgba(243,237,226,0.14)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <p className="font-mono-spec text-[0.72rem] text-[var(--color-steel-light)]">
                  Final diagnosis and upfront pricing are confirmed on-site.
                </p>
                <Button
                  to={buildEstimateUrl({
                    service: 'garage-door-repair',
                    symptom: active.label,
                  })}
                  variant="primary"
                  size="md"
                >
                  Request Service Visit
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
